"use client"
import useSWR from "swr";
import Productlist from "../component/productlist";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { sortASC, sortDefault, sortDESC } from "@/redux/slices/sortSlide";
import { setMax, setMin } from "@/redux/slices/filterSlicer";
import Navbar from "../component/navbar";

export default function Layout({children}) {
   const fetcher = (...args) =>fetch(...args).then((res) =>res.json())
   const {data:category,error:errorcategory,isLoading:isLoadingcategory} =useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`,fetcher);
   const pathname= usePathname();
   const dispatch=useDispatch();
   const sortType= useSelector((state)=>state.sort);

   if(  errorcategory ) return <strong>đã có lỗi</strong>;
   if(  isLoadingcategory) return(<p>Loading...</p>);
    return (
        <>
        <Navbar></Navbar>
            <div className="container mt-5">
                <h2>Menu</h2>
                <div className="row">
                    <div className="col-sm-3 position-sticky top-0">
                        <div class="card " >
                            <div class="card-header">
                                <h5 className="mb-0"> Danh Mục</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <Link class={`list-group-item list-group-item-action ${pathname=="/menu"?"text-bg-dark":" "}`} href="/menu">Tất cả</Link>

                                {category.map((item)=>{
                                    return (
                                        <Link key={item._id} class={`list-group-item list-group-item-action ${pathname=="/menu/"+item._id ?"bg-dark":" "}`} href={`/menu/${item._id}`}>{item.name}</Link>
                                    )
                                })}
                            </ul>
                        </div>
                        <div class="card mt-3" >
                            <div class="card-header">
                                <h5 className="mb-0"> Sắp Xếp</h5>
                            </div>
                            <div className="card-body">
                                <div className="input-group ">
                                    <button className={`btn btn-${sortType==null ?'':'outline-'}dark`}  onClick={()=>dispatch(sortDefault())}>MặcĐịnh</button>
                                    <button className={`btn btn-${sortType=="ASC" ?'':'outline-'}dark`} onClick={()=>dispatch(sortASC())}>Giá tăng</button>
                                    <button className={`btn btn-${sortType=="DESC" ?'':'outline-'}dark`} onClick={()=>dispatch(sortDESC())}>Giá giảm</button>
                                </div>

                            </div>

                        </div>
                        <div class="card mt-3" >
                            <div class="card-header">
                                <h5 className="mb-0"> Khoản Giá</h5>
                            </div>
                            <div className="card-body">
                                <div className="input-group">
                                    <div className="input-group-text">từ</div>
                                    <input className="form-control" type="number"  min={10000} max={100000} step={5000} defaultValue={10000} onChange={(e)=>dispatch(setMin(e.target.value))} />
                                    <div className="input-group-text">đến</div>
                                    <input className="form-control" type="number" min={10000} max={100000} step={5000} defaultValue={999999999} onChange={(e)=>dispatch(setMax(e.target.value))}/>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col-sm-9 bg-light">
                        {children}
                    </div>


                </div>
            </div>
        </>
    )
}