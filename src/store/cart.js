import { createStore } from "vuex";

//중간매개체로써 지나간다는걸 중점으로 생각해보자.

//initState,와 updateLocalStorage와 같은 함수는 스토어 정의 바깥에 위치한다.
//책임과 권한을 분리하는 개념적인 의도도 있지만 다른 스토어나 상황에서 재사용성을 높이기 위한 아키텍쳐이다.
function initState(){
    return{
        cartItems: JSON.parse(localStorage.getItem('cartItems'))||[],
        totalQuantity: localStorage.getItem('totalQuantity') || 0
    }
}

function updateLocalStorage(cartItems,totalQuantity){
    //cartItems라는 키값을 가지고 업데이트 시키겠다.
    //직렬화 필수
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    localStorage.setItem('totalQuantity',totalQuantity);
}

export default createStore({
    //state: 상태를 의미하는 객체로서 initstate를 통해 상태초기화를 하고있다.
    state:initState,

    //mutations는 상태를 변경하는 함수들의 집합
    mutations:{
        //cart에다가 add하는 함수 
        //addToCart함수는 외부 컴포넌트(action)에서 호출 될 예정이다.
        //vuex에서 커밋이라는 용어는 상태변경을 위해 mutation을 호출하는 과정을 의미한다.
        addToCart(state,item){
            const existItem = state.cartItems.find(i => i.id === item.id);
            if(existItem){
                existItem.count ==item.count;
            }else{
                state.cartItems.push(item);
            }

            //totalcount
            state.totalQuantity = state.cartItems + item.count;
            updateLocalStorage(state.cartItems, state.totalQuantity);
        }
    },
    //getters의 경우 상태를 반환하는 함수들의 집합이다.
    getters:{
        getCartItems: state => state.cartItems,
        getTotalQuantity: state => state.totalQuantity
    }
});