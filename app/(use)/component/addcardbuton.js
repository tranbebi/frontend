import { addItem } from "@/redux/slices/cartSlicer";
import { useDispatch } from "react-redux";

export default function AddCardbutton(props){
    const dispatch = useDispatch();
    const {product,quantity,size ,className } =props 
        return (<>
          <button onClick={()=>dispatch(addItem({product,quantity,size}))} className={`btn btn-dark w-100 ${className}`}>đặt mua</button>
          
        </>)
}