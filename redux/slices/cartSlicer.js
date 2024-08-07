const { createSlice } = require("@reduxjs/toolkit");

export const cartSlice=createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            const { product, quantity, size} = action.payload;
            const cart= state;
            const index=cart.findIndex(item=> item._id == product._id && item.size == size);
            if (index==-1) {
                cart.push({...product,quantity,size});
                state=cart;
            } else {
                cart[index].quantity=Number(cart[index].quantity)+Number(quantity);
            }
            state=cart;
            return state;
           
        },
        removeItem: (state, action) => {
            const { product, size} = action.payload;
            const cart= state;
            const index=cart.findIndex((item)=> item._id == product._id && item.size == size
        );  
            cart.splice(index,1); 
            return state;
        },
        removeCart: (state) => (state = []),
        updateItem: (state, action) => {
            const { product, quantity, size} = action.payload;
            const cart= state;
            const index=cart.findIndex(item=> item._id == product._id && item.size == size

            );
            cart[index].quantity=Math.max(1,quantity);
           return cart;
        },
        decreaseItem: (state, action) =>{}
}})
export const {addItem, removeItem, updateItem, decreaseItem,removeCart}=cartSlice.actions;
export default cartSlice.reducer;