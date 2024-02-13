<template>
    <div class="container">
      <div class="page-header text-center" style="margin-top: 20px">
        <h1>상품등록</h1>
      </div>
      <form @submit.prevent="itemCreate">
        <div class="form-group">
          <label >상품명</label>
          <input type="text" v-model="name" class="form-control" />
        </div>
        <div class="form-group">
            <label >카테고리</label>
            <input type="text" v-model="category" class="form-control" />
        </div>
        <div class="form-group">
          <label >가격</label>
          <input type="number" v-model="price" class="form-control" />
        </div>
        <div class="form-group">
          <label >재고수량</label>
          <input type="number" v-model="stockQuantity" class="form-control" />
        </div>
        <!-- change와 @click의 비교
        click은 요소가 클릭될때마다 이벤트 함수실행
        change는 해당 태그의 값이 변할 때 함수실행-->
        <div class="form-group">
          <label>상품이미지</label>
          <input type="file"  class="form-control" accept="image/*" @change="fileUpload"/>
        </div>
        
        <div class="form-group">
          <label for="role">역할</label>
          <select name="role" class="form-control" id="role">
            <option value="">== 선택 ==</option>
            <option value="admin">관리자</option>
            <option value="user">일반유저</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary mt-3">가입완료</button>
        </div>
      </form>
    </div>
  </template>
  <script>
  export default {
    data(){
        return{
            name:"",
            category:"",
            price:null,
            stockQuantity:null,
            itemImage:null,
        }
    },
    methods:{
        fileUpload(event){
            //event.target은 event가 발생한 dom요소를 가르키는 객체다.
            this.itemImage = event.target.files[0];
        },
        async itemCreate(){
            
            
            //multi-part formdata형식의 경우 new FormData를 통해 객체 생성.
            const resisterData = new FormData();
            resisterData.append("name", this.name);
            resisterData.append("price", this.name);
            resisterData.append("category", this.name);
            resisterData.append("stockQuantity", this.name);
            resisterData.append("itemImage", this.name);
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: token ? `Bearer ${token}` : {},
            }
            try{
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/item/create`,registerData, {headers});
            this.$router.push("/items/manage");}
            catch(error){
                console.error("아이템을 만드는데 에러가 발생했습니다.",error);
            }
        }
    }
    };
  </script>
  <style lang=""></style>