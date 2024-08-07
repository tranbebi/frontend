"use client"
import { useDispatch, useSelector } from "react-redux";
import Product from "../component/product";
import { removeCart, removeItem, updateItem } from "@/redux/slices/cartSlicer";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";


export default function Cart() {
    let cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const total = cart.reduce((total, item) =>
    total+item.price*item.quantity,
    0
    );
    const router = useRouter();
    const [fullname,setfullname]=useState("");
    const [phone,setphone]=useState("");
    const [address,setaddress]=useState("");
    const closeBtn=useRef();

    const submit=(e)=>{
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user:{
                    fullname,
                    phone,
                    address,
                },
                detail:cart,
                total_money:total,
            })
        }).then(res=>{
            alert("đặt hàng thành công ")
            dispatch(removeCart()),
            closeBtn.current.click();
            router.push("/");

        })
    }
    // const [price,setprice] = useState(cart.price)
    return (
        <div className="container mt-5">
            <h1>Giỏ Hàng</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>size</th>
                        <th>Giá Bán</th>
                        <th>Số Lượng</th>
                        <th>Đơn Giá</th>
                        <th>Thao tác</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => {
                        return (
                            <tr key={product._id} className="align-middle">
                                <td >
                                    <img className="img-thumbnail me-3"
                                        style={{ width: 48 + "px" }} src={`${process.env.NEXT_PUBLIC_IMA_URL}${product.image}`} alt="..." />
                                    <strong>{product.name}</strong>
                                </td>
                                <td>{product.size}</td>
                                <td>{product.price.toLocaleString()}đ</td>
                                <td><input type="number" className="form-control m-auto" defaultValue={product.quantity} onChange={(e) =>
                                    dispatch(updateItem({
                                        product,
                                        quantity: e.target.value,
                                        size: product.size
                                    }))}
                                    style={{ width: 100 + "px" }}>
                                </input></td>
                                <td>{product.size === 'l' ? (product.price * product.quantity + (product.quantity * 10000)).toLocaleString()
                                    : product.size === 'm' ? (product.price * product.quantity + 15000).toLocaleString()
                                        : (product.price * product.quantity).toLocaleString()}</td>
                                <td><button onClick={() => dispatch(removeItem({ product, size: product.size }))} className="btn"><i className="fa-solid fa-trash"></i>Xóa</button></td>
                            </tr>
                        )
                    })}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-end">tổng tiềng:</td>
                        <td>{cart.reduce((total, product) => total + product.quantity * product.price, 0).toLocaleString()}đ</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Đặt Hàng
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form className="modal-dialog" onSubmit={submit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thông Tin Giao Hàng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ref={closeBtn}
                            ></button>
                        </div>
                        <div className="modal-body">
                                <div class="mb-3">
                                    <label for="fullname" class="form-label">Họ Tên</label>
                                    <input
                                     type="text" 
                                     class="form-control" 
                                     id="fullname"
                                     onChange={(e)=>{
                                        setfullname(e.target.value);
                                     }}
                                     />
                                    
                                </div>
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Số Điện Thoại</label>
                                    <input
                                     type="text" 
                                     class="form-control" 
                                     id="phone"
                                     onChange={(e)=>{
                                        setphone(e.target.value);
                                     }} 
                                     />
                                    
                                </div>
                                <div class="mb-3">
                                    <label for="diachi" class="form-label">Địa Chỉ</label>
                                    <input
                                     type="text" 
                                     class="form-control" 
                                     id="diachi" 
                                     onChange={(e)=>{
                                        setaddress(e.target.value);
                                     }}
                                     />
                                    
                                </div>
                           
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="submit" className="btn btn-success" >Xác Nhận Thanh Toán</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}