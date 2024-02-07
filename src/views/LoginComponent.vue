<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top:20px;">
            <h1>로그인</h1>
        </div>
        <!-- submit은 기본적으로 폼 제출시 브라우저가 페이지를 새로고침하므로 해당동작을 막기위해
        prevent를 사용한다. -->
    <form @submit.prevent="doLogin">
    <div class="form-group">
        <label for="email">email</label>
        <input type="text" v-model = "email" class="form-control">
    </div>
    <div class="form-group">
        <label for="password">password</label>
        <input type="password" v-model="password" class="form-control" >
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary mt-3">로그인</button>
    </div>
    <div th:if="${errorMessage != null}">
        <input type="hidden" id="error" th:value="${errorMessage}"/>
    </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';

//jwt-decode에서 export시에 중괄호 넣어서 export하였으므로, import할때도 {}넣어서 import
import {jwtDecode} from 'jwt-decode';

export default {
    data(){
        return{
                email :"",
                password :""
        }
    },
    methods:{
        async doLogin(){
            /*2가지 예외 킹능성 : 
            1. 200번대상태값이면서 token이 비어있는 경우
            2. 200번대 상태값이 아닌경우*/
            try{
                const loginData = {email: this.email , password:this.password};
                const response = await axios.post("http://localhost:8080/doLogin", loginData)
                const token = response.data.result.token;
                if(token){
                    const decoded = jwtDecode(token);
                    console.log(decoded);
                    localStorage.setItem("token", token);
                    localStorage.setItem("Role", decoded.role);
                    // this.$router.push("/");
                    // created함수는 reload될 때 1번만 실행되는 hook함수이다.
                    // 그런데, router.push를 통한 화면전환은 reload를 실행하지 않으므로, created함수 호출이 되지 않음.
                    window.location.href = "/";
                }else{
                    console.log("200ok but not token");
                    alert("Login Failed");
                }
            }catch(error){
                const error_message = error.response?.data.error_message;
                if(error_message){
                    console.log(error_message);
                    alert(error_message)
                }else{
                    console.log(error);
                    alert("Login Failed");
                }
            
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style> 