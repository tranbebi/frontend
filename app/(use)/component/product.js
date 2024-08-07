import Link from "next/link";
import AddCardbutton from "./addcardbuton";

export default function Product(props) {
  const product = props.data;
  return (<>
    <div className="card mb-2" style={{ width: 18 + "rem" }}>
      <img src={`${process.env.NEXT_PUBLIC_IMA_URL}${product.image}`} className="card-img-top" alt="..." />

      <div className="card-body">
      <Link className="text-dark text-decoration-none " href={`/product/${product._id}`}><h5 className="card-title">{product.name}</h5></Link>
         { product.rating> 0 && (
          <small className="text-warning fw-bold me-1">
              {product.rating}<i class="fa-solid fa-star"></i>
          </small>
          )}
        <p className="card-text">{product.price}đ</p>
  
        <AddCardbutton className="btn-lg mb-3"
          product={product}
          quantity={1}
          size="s"
        >Đặt Mua</AddCardbutton>

      </div>
    </div>
  </>)
}