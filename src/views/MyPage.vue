<template>
       <div class="container">
        <div class="page-header text-center" style="margin-top:20px;"><h1>회원 정보</h1></div>
        <table class="table">
            <thead>
            <tr>
                <th>id</th>
                <th>이름</th>
                <th>주소</th>
                <th>email</th>
                <th>주문수량</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </div>
    <orderListComponent
    :isAdmin="false"
    apiUrl="http://localhost:8080/member/myorders"
    />

</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue'
export default {
    components:{
        OrderListComponent
    }
        
}
</script>
