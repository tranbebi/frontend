const { createSlice } = require("@reduxjs/toolkit");

export const sortSlide=createSlice({
    name: 'cart',
    initialState: null,
    reducers: {
        sortASC: (state)=>(state="ASC"), // tăng đần
        sortDESC: (state)=>(state="DESC"), // giảm dần
        sortDefault: (state)=>(state=null), // mặc định

        
}})
export const {sortASC,sortDESC ,sortDefault}=sortSlide.actions;
export default sortSlide.reducer;