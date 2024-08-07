import { useSelector } from "react-redux";
import Product from "./product";
import { useRef } from "react";

export default function Productlist(props){
    let data =props.data;
    const sortType= useSelector((state)=>state.sort);
    let defaultData=useRef([...props.data]);
    const {min,max}=useSelector((state)=>state.filter);
    data = data.filter((item)=>min<=item.price && item.price<=max);
    if(sortType==='ASC'){
        data.sort((a,b)=>a.price-b.price);
    }else if(sortType==='DESC'){
        data.sort((a,b)=>b.price-a.price);
    }else{
        data=defaultData.current;
    }
    return (
    <>
            {data.map((item)=>{
                 const {  _id ,name, image, price} = item;
                return (
                    <div key={item._id} className="col">
                    <Product data={item}/>
                    </div>
                );
            })}
        </>
    );
}