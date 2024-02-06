<template>
    <div class="container">
        <div class="page-header"><h1>회원 목록</h1></div>
        <table class="table">
            <thead>
            <tr>
                <th>id</th>
                <th>이름</th>
                <th>email</th>
                <th>주문수량</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="member in memberList" :key="member.id">
                <td>{{ member.id }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.orderCount }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            memberList: [],
        }
    },
    async created() {
        try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:8080/members", { headers });
        this.memberList = response.data;
        } catch (error) {
            console.error("There was an error fetching the member list:", error);
            // Handle error appropriately
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
