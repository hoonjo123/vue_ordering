<template>
        <order-list-component
    :isAdmin="true"
    :apiUrl="`http://localhost:8080/member/${id}/orders`"
    />
</template>

<script>

import OrderListComponent from '@/components/OrderListComponent.vue'

export default {
    props:['id'],
    components:{
        OrderListComponent
    },
    //매개변수로 데이터 넘겨받을 때에 props를 사용한다.
    
}
</script>
