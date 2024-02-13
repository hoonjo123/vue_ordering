<template>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto" v-if="userRole ==='ADMIN'">
            <li class="nav-item" >
                <a class="nav-link" href="/members">회원관리</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/items/manage">상품관리</a></li>
            <li class="nav-item"><a class="nav-link" href="/orders">주문관리</a></li>
            <!--  doLogout을 통해 로그아웃 버튼을 누르면 로그인이 풀려, 회원관리, 게시글목록에 대한 접근이 불가능 해짐-->
        </ul>
    </div>
    <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="/"><h2>java shop</h2></a>
    </div>
    <div class="navbar-collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item" ><a class="nav-link" href="/items">상품목록</a></li>
            <!-- getter함수임을 명시 -->
            <li class="nav-item" v-if="isLogin"><a class="nav-link" href="/ordercart">장바구니 ({{ getTotalQuantity }})</a></li>
            <li class="nav-item" v-if="isLogin"><a class="nav-link" href="/mypage">마이페이지</a></li>
            <li class="nav-item" v-if="!isLogin"><a class="nav-link" href="/member/create">회원가입</a></li>
            <li class="nav-item" v-if="!isLogin">
                <a class="nav-link"  href="/login">로그인</a>
            </li>
            <li class="nav-item" v-if="isLogin">
                <a class="nav-link"  href=# @click="doLogout">로그아웃</a>
            </li>
            <!--  doLogout을 통해 로그아웃 버튼을 누르면 로그인이 풀려, 회원관리, 게시글목록에 대한 접근이 불가능 해짐-->
        </ul>
    </div>
    </nav>
</template>

<script>
//store에 getters함수를 사용하기위한 import
import {mapGetters}from 'vuex';

export default {
    computed:{
        //...연산자를통해 getter로 반환되는 객체의 속성들을 현재 객체내에 풀어서(spread) 넣기위함.
        ...mapGetters(['getTotalQuantity'])
    },

    data(){
        return{
            isLogin: false,
            userRole: null
        }
    },
    created(){
        if(localStorage.getItem("token")){
            this.isLogin = true;
            this.userRole = localStorage.getItem("Role");
            
        }
        
    },
    methods: {
        doLogout(){
            localStorage.clear();
            window.location.reload();
        }   
    }
}
</script>