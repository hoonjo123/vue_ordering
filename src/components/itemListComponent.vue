<template>
    <div class="container">
      <div class="page-header text-center" style="margin-top: 20px">
        <h1>{{ pageTitle }}</h1>
      </div>
      <div class="d-flex justify-content-between" style="margin-top: 20px">
        <!--prevent : 동작 후 화면을 reload해줘서 변경 사항이 반영됨-->
        <form @submit.prevent="searchItems()">
          <select
            v-model="searchType"
            class="form-control"
            style="display: inline-block; width: auto; margin-right: 5px"
          >
            <option value="optional">선택</option>
            <option value="name">상품명</option>
            <option value="category">카테고리</option>
          </select>
          <input
            v-model="searchValue"
            type="text"
            placeholder="검색"
            style="margin-right: 5px"
          />
          <button>검색</button>
        </form>
        <div v-if="!isAdmin">
            <!-- 장바구니 버튼을 누르는 순간 addCart가 나오도록 -->
          <button @click="addCart" class="btn btn-secondary">장바구니</button>
          <button
            @click="placeOrder"
            class="btn btn-success"
            style="margin-left: 5px"
          >
            주문하기
          </button>
        </div>
        <div v-if="isAdmin">
          <a href="/item/create">
            <button class="btn btn-success">상품등록</button>
          </a>
        </div>
      </div>
      <table class="table" style="margin-top: 20px">
        <thead>
          <tr>
            <th>#</th>
            <th v-if="!isAdmin"></th>
            <th>제품사진</th>
            <th>제품명</th>
            <th>가격</th>
            <th>재고수량</th>
            <th v-if="!isAdmin">주문수량</th>
            <th v-if="isAdmin">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in itemList" :key="item.id">
            <td>{{ item.id }}</td>
            <!-- 체크박스를 선택하면 value가 true가 담기게 됨-->
            <td v-if="!isAdmin">
              <input type="checkbox" v-model="selectedItems[item.id]" />
            </td>
            <td>
              <!--웹 페이지에서 직접 파일 시스템 접근이 불가능하기 때문에 함수(내부에서API) 처리를 통해 해결-->
              <img
                :src="getImage(item.id)"
                alt=""
                style="height: 100px; width: auto"
              />testimage
            </td>
            <!--s3쓰면 imagePath(http~) 그냥 사용-->
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stockQuantity }}</td>
            <td v-if="!isAdmin">
              <input
                type="number"
                min="1"
                v-model="item.quantity"
                style="width: 60px"
              />
            </td>
            <td v-if="isAdmin">
              <button @click="deleteItem(item.id)" class="btn btn-secondary">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    props: ["isAdmin", "pageTitle"],
    data() {
      return {
        itemList: [],
        pageSize: 10,
        currentPage: 0,
        searchType: "name",
        searchValue: "",
        isLastPage: false,
        isLoading: false,
        selectedItems: {}, //체크박스의 값들이 {"1":"true", ... 객체 형식으로 들어옴}
        };
    },
    created() {
        this.loadItems();
    },
    // mounted : window dom 객체가 생성된 이후에 실행되는 hook 함수
    mounted() {
      // scroll 동작이 발생할 때마다 scrollPagination 함수 호출된다는 의미
        window.addEventListener("scroll", this.scrollPagination);
    },
    methods: {
        addCart(){
            this.$store.commit('addToCart',null);
        },
        async placeOrder() {
        console.log(this.selectedItems);
        //   {
        //     "1": true,
        //     "2": false,
        // }
        // Object.keys : 위의 데이터 구조에서 1, 2 등 key 값 추출하는 메서드
        // [ {itemId:1, count:10}, {}, ... ] 형식(OrderReqItemDto)으로 담김
        const orderItems = Object.keys(this.selectedItems)
            .filter((key) => this.selectedItems[key] === true)
            .map((key) => {
            //ture로 체크한 key
            const item = this.itemList.find((item) => item.id == key);
            return { itemId: item.id, count: item.quantity };
            });
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
            await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/order/create`,
            orderItems,
            { headers }
          );
          console.log(orderItems);
          alert("주문완료되었습니다.");
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },
      scrollPagination() {
        // innerHeight : 뷰포트 높이를 픽셀단위로 변환
        // scrollY : 스크롤를 통해 Y축을 이동한 거리
        // offsetHeight : 전체 브라우저 창의 높이
        const nearBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
        if (!this.isLoading && !this.isLastPage && nearBottom) {
          this.currentPage++;
          this.loadItems();
        }
      },
      getImage(id) {
        return `${process.env.VUE_APP_API_BASE_URL}/item/${id}/image`;
      },
      async deleteItem(id) {
        if (confirm("정말로 삭제하시겠습니까?")) {
          const token = localStorage.getItem("token");
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          try {
            await axios.delete(
              `${process.env.VUE_APP_API_BASE_URL}/item/${id}/delete`,
              {
                headers,
              }
            );
            alert("상품 삭제 성공!");
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
        }
      },
      searchItems() {
        this.itemList = [];
        this.currentPage = 0;
        this.isLastPage = false;
        this.loadItems();
      },
      async loadItems() {
        this.isLoading = true;
        try {
          // params 키워드를 사용해야 파라미터 방식으로 axios 요청 가능
          const params = {
            page: this.currentPage,
            size: this.pageSize,
            [this.searchType]: this.searchValue, // [] : 값을 꺼내겠다! 아래 if문과 의미 동일
          };
          // if (this.searchType === "name") {
          //   params.name = this.searchValue;
          // } else if (this.searchType === "category") {
          //   params.category = this.searchValue;
          // }
          console.log("data 호출");
          const response = await axios.get(
            `${process.env.VUE_APP_API_BASE_URL}/items`,
            { params } //GET 요청에서 파라미터 방식(?=)으로 매개변수 넘길 때 사용
          );
          const addItemList = response.data.map((item) => ({
            //주문 수량을 1로 선택. 역바인딩 : data을 페이지에 밀어넣음
            ...item,
            quantity: 1,
          }));
          if (addItemList.length < this.pageSize) {
            this.isLastPage = true;
          }
          this.itemList = [...this.itemList, ...addItemList];
        } catch (error) {
          console.log(error);
        }
        this.isLoading = false;
      },
    },
  };
  </script>
  
  
  
  
  
  
  
  
  
  