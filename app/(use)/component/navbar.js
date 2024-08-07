"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
export default function Navbar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
          const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
          if (token) {
              setIsLoggedIn(true);
          }
      }, []);
  const patname=usePathname();
  const cart =useSelector((state)=>state.cart)
  const totalitem= useMemo(()=>{ return cart.reduce((total,item)=>total+item.quantity,0);
},[cart]);
 


    return (<>

    <nav className="navbar navbar-expand-sm navbar-dark sticky-top" style={{backgroundColor:"#91d0f3"}}>
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between fs-5" id="mynavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                         <Link className={`nav-link oswald ${patname=="/"?"active":" "}`} href="/">Trang Chủ</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link oswald" href="/menu">Sản Phẩm</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link oswald" href="/dangky">Đăng kí</Link>
                    </li>
                    <li id="account"  className="nav-item">
                        <Link className="nav-link oswald" href={isLoggedIn ? '/info' : '/dangnhap'}>
                               đăng nhập
                            <i class={isLoggedIn ? "bi bi-person fs-5  fw-bolder text-dark" : "bi bi-box-arrow-in-right fs-5  fw-bolder text-dark"} />
                        </Link>
                    </li>

                </ul>
                <div className="logo fs-1 kalnia-glaze" style={{marginLeft:90+"px"}}>
                    Boa bi
                </div>
               
                
            <div className="d-flex">
            <ul className="navbar-nav">
                <Link className="nav-link oswald" href="/cart">Giỏ hàng <span className="badge bg-danger">{totalitem}</span></Link>
                </ul>
                <form className="d-flex">                  
                    <input className="form-control me-2" type="text" placeholder="Search"/>
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                </form>
            </div>
                
            </div>
        </div>
    </nav>
     </>)
}