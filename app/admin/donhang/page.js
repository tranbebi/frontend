"use client"
import Link from "next/link";
import useSWR from "swr";

export default function Donhang() {
    const fetcher=(...args) =>fetch(...args).then((res) =>res.json());
    const {data:productlist,error:errorproduct,isLoading:isLoadingproduct} =useSWR(`${process.env.NEXT_PUBLIC_API_URL}/orders`,fetcher)
    
    if(isLoadingproduct) return <div>Loading...</div>
    if(errorproduct) return <div>Error: {errorproduct.message}</div>
    return (<>  
        <div className="card rounded-0 border-0 shadow-sm">
            <div className="card-body">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="text-start" colspan="2">ID</th>
                            <th>Tên Khách Hàng</th>
                            <th>Số Điện Thoại</th>
                            <th>Địa Chỉ</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">

                        {productlist.map(product =>{
                            return(<>
                            <tr key={product._id}>
                                <td style={{width:64 +"px"}}>

                                </td>
                                <td className="text-start">
                                  
                                    <small>
                                        Id: <strong>{product._id}</strong> |
                                    </small>

                                </td>
                                <td>
                                    {product.user.fullname}
                                </td>  <td>
                                    {product.user.phone}
                                </td>  <td>
                                    {product.user.address}
                                </td>
                                
                            <td>
                            </td>
                            <td>
                                <a href="#" target="_blank" className="btn btn-primary btn-sm">
                                    <i className="fas fa-eye fa-fw"></i>
                                </a>
                                <a href="#" className="btn btn-outline-warning btn-sm">
                                    <i className="fas fa-pencil fa-fw"></i>
                                </a>
                                <a href="#" className="btn btn-outline-danger btn-sm">
                                    <i className="fas fa-times fa-fw"></i>
                                </a>
                            </td>
                            </tr>
                            </>)
                        })}
                        
                    </tbody>
                </table>
            </div>  
            
      </div>
    </>)
}