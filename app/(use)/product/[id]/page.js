"use client"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "@/redux/slices/cartSlicer";
import useSWR from "swr"
import { Children, useState } from "react";
import AddCardbutton from "../../component/addcardbuton";

export default function Productdetail({ params }) {
   
    const fetcher=(...agrs) =>fetch(...agrs).then((res)=>res.json());
        const {data:product,error,isLoading:isLoadingproduct}=useSWR(`${process.env.NEXT_PUBLIC_API_URL}/products/id/${params.id}`,fetcher);
        const dispatch = useDispatch();
        const [quantity,setquantity]=useState(1);
        const [size,setsize]=useState("s");

    if(error) return (console.log('có lỗi xảy ra'))
    if(isLoadingproduct) return (<div>Loading...</div>)
    return (

        <>
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-5 ">
                    <img src={`${process.env.NEXT_PUBLIC_IMA_URL}${product.image}`} alt={params.name} className="w-100" />
                </div>
                <div className="col-md-7">
                    <h1>{product.name}</h1>
                  
                    <Link className="text-decoration-none" href={`/categpry/${product.categoryID}`}>
                        Doanh Mục: {product.category.name}  <img style={{width:40}}src={`${process.env.NEXT_PUBLIC_IMA_URL}${product.category.image}`} alt={params.name} className="w-10" />

                    </Link>
                    <br />
                    <div className="text-warning">{product.rating}
                        {
                            [...Array(Math.floor(product.rating))].map(i=>{
                                return <i class="fa-solid fa-star"></i>
                            })
                        }
                         {
                            [...Array(5-Math.floor(product.rating))].map(i=>{
                                return <i class="fa-regular fa-star"></i>
                            })
                        }
                       </div>
                    <div className="display-1">{product.price.toLocaleString()}đ</div>
                    <div className="row">
                        <div className="col-6">
                        size:
                    <select onChange={(e)=>setsize(e.target.value)} className="form-select">
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                    </select>
                        </div>
                        <div className="col-6" >
                           Số Lượng :
                           <input  onChange={(e)=>setquantity(e.target.value)} type="number" className="form-control" defaultValue={1}/>
                        </div>
                    </div>
                    <AddCardbutton className="btn btn-dark w-100 mt-3 " 
                    product={product}
                    quantity={quantity}
                    size={size}
                    > thêm vào giỏ hàng</AddCardbutton>
                    <button onClick={()=>dispatch(addItem({product,quantity,size}))} className="btn btn-dark w-100 mt-3 ">Thêm Vào Giỏ Hàng</button>
                    <p className="mt-3">{product.description}</p>
                   
                </div>
            </div>
            </div>
        </>

    )
}