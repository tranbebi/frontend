const { createSlice } = require("@reduxjs/toolkit");

export const filterSlices=createSlice({
    name: 'filter',
    initialState: {min: 0, max:99999999},
    reducers: {
        setMin: (state,actions)=>{
            state.min=actions.payload
            return state;
        }, // tăng đần
        setMax: (state,actions)=>{
            state.max=actions.payload
            return state;
        }, // giảm dần
      

        
}})
export const {setMin,setMax }=filterSlices.actions;
export default filterSlices.reducer;