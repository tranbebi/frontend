"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";

export default function Product() {
  const [data, setData] = useState([]);
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      const res = await fetch(`http://localhost:3000/products/deleteproduct/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.message) {
        // Update the local state instead of refetching the entire list
        setData(data.filter(product => product._id !== id));
      }
    }
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: categories, error: errorcategories, isLoading: isLoadingcategories } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetcher);

  if (isLoadingcategories ) {
    return <div>Loading...</div>;
  }

  if ( errorcategories) {
    return <div>Error: { errorcategories?.message}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h3>Products</h3>
        <div className="d-flex">
          <a href="#" className="btn btn-outline-success rounded-0 me-2">Manage Categories</a>
          <Link href="/admin/product/add" className="btn btn-primary rounded-0">Add Product</Link>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-box"></i>
                {data.length}
              </div>
              SỐ LƯỢNG SẢN PHẨM
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-success-subtle text-success">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-boxes"></i>
                {categories.length}
              </div>
              Danh Mục
            </div>
          </div>
        </div>
      </div>

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center table-responsive">
            <thead>
              <tr>
                <th className="text-start" colSpan="2">Product</th>
                <th>Price</th>
                <th>Instock</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {data.map(product => (
                <tr key={product._id}>
                  <td style={{ width: 64 + "px" }}>
                    <img src={`${process.env.NEXT_PUBLIC_IMA_URL}${product.image}`} className="w-100" alt={product.name} />
                  </td>
                  <td className="text-start">
                    <strong>{product.name}</strong><br />
                    <small>
                      Id: <strong>{product._id}</strong> |
                      Category: <a href="#" className="text-decoration-none fw-bold">{product.category.name}</a>
                    </small>
                  </td>
                  <td>{product.price.toLocaleString()}đ</td>
                  <td>50</td>
                  <td>
                    <div className="text-warning">{product.rating}
                      {[...Array(Math.floor(product.rating))].map((_, index) => (
                        <i className="fas fa-star fa-xs text-warning" key={index}></i>
                      ))}
                      {[...Array(5 - Math.floor(product.rating))].map((_, index) => (
                        <i className="far fa-star fa-xs text-warning" key={index}></i>
                      ))}
                    </div>
                  </td>
                  <td>
                    <a href="#" target="_blank" className="btn btn-primary btn-sm">
                      <i className="fas fa-eye fa-fw"></i>
                    </a>
                    <Link href={`/admin/product/edit/${product._id}`} className="btn btn-outline-warning btn-sm">
                      <i className="fas fa-pencil fa-fw"></i>
                    </Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteProduct(product._id)}>
                      <i className="fas fa-times fa-fw"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}