"use clinet"
import Navbar from "./component/navbar";
import Leftbar from "./component/leftbar";
export const metadata = {
    title: 'shop',
    description: 'shop bán quần áo phụ kiện thời trang khuyến mãi cực hot nhất hôm nay',
}
export default function RootLayout({ children }) {
    return (
        <html lang="en">

            <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"/>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Kalnia+Glaze:wght@100..700&family=Oswald:wght@200..700&display=swap"
                    rel="stylesheet" />
            </head>

            <body>
                <div style={{ margin: "20px", padding: "0px", width: "1457px" }}>
                    <div class="containerr" style={{ height: "70px", backgroundColor: "aliceblue" }}>
                        <div class="row width: 100%; h-100 d-flex align-items-center">
                            <div class="col-md-2 " style={{ height: "70px" }}>
                                <div class="d-flex align-items-center gap-4 justify-content-center  fs-4">

                                    <i class="fas fa-bars"></i>
                                    <h3 style={{ margin: "0px" }}>ADMIN</h3>

                                </div>
                            </div>
                            <div class="col-md-10" style={{ padding: "0px" }}>
                                <div class="bg-danger d-flex gap-2 align-items-center justify-content-end" style={{ height: "70px" }}>
                                    <div class="fs-2 me-3">
                                        <i class="fa-solid fa-envelope"></i>
                                    </div>
                                    <div>
                                        <img class="rounded-circle" style={{ width: "40px", height: "40px" }} src="img/backgrout3.jpg" alt="" />
                                    </div>
                                    <div class="me-3">
                                        <strong>Trần Bé Bi</strong>
                                    </div>
                                </div>
                                <div class="bg-light oswald pt-2 fs-6 ps-5" style={{ height: "35px" }}>QUẢN LÝ SẢN PHẨM</div>
                            </div>
                        </div>
                    </div>
                    <div class="containerr mt-5">
                        <div class="row">
                            <div class="col-2" style={{ padding: "0px" }}>
                                <ul class="list-unstyled d-flex flex-column gap-3">
                                    <Navbar></Navbar>
                                </ul>
                            </div>
                            <div class="col-9 ms-5 bg-light   rounded" style={{ padding: "0px" }}>
                                {children}
                            </div>
                        </div>
                    </div>

                </div>
                <script src="https://kit.fontawesome.com/7b8b40ab0a.js" crossorigin="anonymous"></script>
                
            </body>

        </html>
    )
}