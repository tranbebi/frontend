import Link from "next/link";

export default function Navbar(){
    return(
        <>
                              
                              <li class="btn btn-outline-dark text-decoration-none"><Link href="/admin" class="text-decoration-none text-warning">  Trang chủ</Link></li>
                              <li class="btn btn-outline-dark"> <Link href="/admin/product" class="text-decoration-none">Quản Lý Sản Phẩm</Link></li>
                              <li class="btn btn-outline-dark"> <Link href="/admin/donhang" class="text-decoration-none">Quản Lý Đơn Hàng</Link></li>
                                    <li class="btn btn-outline-dark"><a href="#" class="text-decoration-none">Quản lý đơn hàng</a></li>
                                    <li class="btn btn-outline-dark"><a href="#" class="text-decoration-none">Quản lý người dùng</a></li>
                                    <li class="btn btn-outline-dark"><a href="#" class="text-decoration-none">Thống kê</a></li>
                                    <li class="btn btn-outline-dark"><a href="#" class="text-decoration-none">Cài đặt</a></li>
                                    <li class="btn btn-outline-dark mt-5"><a href="#" class="text-decoration-none">Đăng xuất</a></li>

                             
                            
                          
        </>
    )
}