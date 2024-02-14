import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemsList: [],
    totalQuantity: 0,
    showCart: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state, action)=> {
            const newItem = action.payload;
            //to check if the item is already available
            const existingItem  = state.itemsList.find((item)=>item.id === newItem.id);

            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice+= newItem.price;
            }else{
                state.itemsList.push({
                    id:newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice : newItem.price,
                    name:newItem.name
                })
            }
            state.totalQuantity++;

        },
        removeFromCart:(state, action)=> {
            const id = action.payload;
            console.log(id)
            const existingItem = state.itemsList.find(item => item.id === id)
            console.log("existing item",existingItem)

            if (+existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalQuantity--;

        },
        setShowCart:(state)=> {
            state.itemsList = [];
            state.totalQuantity = 0;
            state.showCart = false;
        },
        emptyCart: (state) =>{
            state.itemsList=[];
            state.totalQuantity = 0;
            state.showCart = false;
           
        }


    }
})

export const { addToCart, removeFromCart, setShowCart,emptyCart } = cartSlice.actions;
export default cartSlice.reducer;