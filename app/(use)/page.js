"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Navbar from "./component/navbar";
import useSWR from "swr";
import Productlist from "./component/productlist";

export default function Home() {
    const fetcher = (...agrs) => fetch(...agrs).then((res) => res.json());
  const { data: productList,
    error,
    isLoading
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/products`, fetcher)
  if (error) return <strong>lỗi r</strong>
  if (isLoading) return <strong>Loading...</strong>
  return (
    
   <>
    <header>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active img_size">
                    <img src="./img/backgroud1.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item img_size ">
                    <img src="./img/backgroud2.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item  img_size_child2">
                    <img src="./img/backgrout3.jpg" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </header>
    <Navbar></Navbar>
    <div className="blog_chaner mt-5">
        <h1 className="oswald1 text-center">
            TIN TỨC
        </h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 d-flex justify-content-center gap-2">
            <div className="card">
                <img src="img/tintuc1.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title oswald">THE HIEN TINH CACH TU TIN CA TINH</h5>
                    <p className="card-text oswald">HAY LÀ ĐIỂN SÁNG NHẤT GIỮA BẦU TRỜI ĐÊM</p>
                    <a href="#" className="btn btn-primary">Read More</a>
                </div>
            </div>
            <div className="card">
                <img src="img/tintuc2.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title oswald">HAY LAM NHUNG DIEU BAN THICH THEO CACH BAN NGHI</h5>
                    <p className="card-text">CHÚNG TA HÃY SỐNG HẾT MINH HAY LÀM NHƯNG ĐIỀU ĐẸP</p>
                </div>
            </div>
        </div>
    </div>
    <div className="danh_muc mt-5 d-flex justify-content-center">
        <h1 className="oswald1">
            SẢN PHẨM HOT
        </h1>
    </div>
    <div className="container mt-5">

        <div className="row row-cols-md-4 row-cols-sm-1 row-cols-xs-3 pro-loop row-cols-1 product-hover">
        <Productlist data={productList}></Productlist>

        </div>
    </div>
    <div className="containerr mt-5 ">
        <img className="w-100" src="img/tbody2.jpg" alt=""/>
    </div>
    <div className="text-center mt-5 oswald1">
        <h2>
            AI SỢ THÌ ĐI VỀ PHONG CÁCH
        </h2>
    </div>
    <footer className="bg-dark mt-5">
  <div className="container">
    <div className="row pt-3">
      <div className="col-md-4 text-light">
        <h3>follow</h3>
        <div className="d-flex gap-3 mt-1">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-tiktok"></i>
          <i className="fa-brands fa-youtube"></i>
        </div>
        <div>
          <p className="oswald">HỘ KINH DOANH</p>
          <p className="oswald">57 NGUYỄN GIA TRÍ, PHƯỜNG 25, QUẬN BÌNH THẠNH</p>
          <p className="oswald">MÃ SỐ THUẾ: 4108046202 - NGÀY CẤP: 08/11/2022</p>
          <p className="oswald">NGƯỜI ĐẠI DIỆN: TRẦN BÉ BI</p>
        </div>
      </div>
      <div className="col-md-4 text-light">
        <p className="oswald">CHI NHÁNH CỬA HÀNG: SÀI GÒN</p>
        <p className="oswald">1. 93 Rạch Bùng Binh, Phường 9, Quận 3. Hotline:0583.270.206</p>
        <p className="oswald">2. 117 Trần Đình Xu, phường Nguyễn Cư Trinh, Quận 1. Hotline: 0909.379.802</p>
        <p className="oswald">3. 57 Nguyễn Gia Trí phường 25, quận Bình Thạnh. Hotline: 0769.829.984</p>
        <p className="oswald">4. 26 Lý Tự Trọng, Phường Bến Nghé, Quận 1. Hotline: 034.7437.362</p>
        <p className="oswald">HÀ NỘI</p>
        <p className="oswald">5. 21B Phố Lò Đúc, Phường Ngô Thì Nhậm, Quận Hai Bà Trưng, Hà Nội. Hotline: 0325.933.661</p>
        <p className="oswald">CẦN THƠ</p>
        <p className="oswald">6. 7 Trần Văn Hoài, Phường Xuân Khánh, Quận Ninh Kiều, Cần Thơ. Hotline: 076.3352.853.</p>
        <p className="oswald">© 2024 BAD HABITS OFFICIAL STORE ALL RIGHT RESERVED.</p>
      </div>
      <div className="col-md-4 text-light text-center">
        <p className="oswald">ĐỔI TRẢ SẢN PHẨM</p>
        <p className="oswald">CHÍNH SÁCH DỔI TRẢ</p>
        <p className="oswald">THÔNG TIN LIÊN HỆ</p>
        <p className="oswald">CHÍNH SÁCH BẢO MẬT</p>
        <p className="oswald">THÔNG TIN THANH TOÁN</p>
        <p className="oswald">ĐIỀU KHOẢN GIAO DỊCH CHUNG</p>
        <p className="oswald">CHINH SÁCH VÂN CHUYỂN GIAO HÀNG</p>
      </div>
    </div>
  </div>
</footer>
   </>  
  );
}
