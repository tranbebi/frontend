"use client"
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useSWR from "swr";


export default function Productadd(){
  const fetcher=(...args) =>fetch(...args).then((res) =>res.json());
  const {data:categorylist,error:errorcategory,isLoading:isLoadingcategory} =useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`,fetcher)
  const [formValue,setformValue]=useState();
  const formik = useFormik({
    initialValues: {
      name:"",
      description:"",
      categoryId:"",
      price:0,
      image:null,
      rating:0,
      
    },
    onSubmit: async (values) => {
      setformValue(values);
      const formData = new FormData();
      formData.append("name",values.name);
      formData.append("description",values.description);
      formData.append("categoryId",values.categoryId);
      formData.append("price",values.price);
      formData.append("image",values.image);

     try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`,{
        method:"POST",
        body:formData,
      }).then((response) =>{ 
      });
     } catch (error) {
      console.log(error);
     }
    }
  });
  const router=useRouter();
  if(isLoadingcategory) return <div>Loading...</div>
  if(errorcategory) return <div>Error: {errorcategory.message}</div>
  
    return (
       <>
        <div class="d-flex justify-content-between">
          <h3 class="mb-4">Add Product</h3>
          <div>
            <Link href="/admin/product" class="btn btn-outline-secondary rounded-0">
              <i class="far fa-long-arrow-left"></i> Back
            </Link>
          </div>
        </div>
        <form class="row" action="" method="POST" enctype="multipart/form-data" onSubmit={formik.handleSubmit}>
          <div class="col-md-8 mb-4">
            <div class="card rounded-0 border-0 shadow-sm mb-4">
              <div class="card-body">
                <h6 class="pb-3 border-bottom">Basic Info</h6>
                <div class="mb-3">
                  <label for="name" class="form-label">Name *</label>
                  <input type="text" class="form-control rounded-0" id="name"
                  required   name="name" onChange={formik.handleChange}
                   />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control rounded-0" id="description" rows="6"
                  name="description"
                  onChange={formik.handleChange}
                  ></textarea>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="category" class="form-label">Category *</label>
                    <div class="input-group">
                      <select class="form-select rounded-0" id="categoryId" required
                      name="categoryId"
                      onChange={formik.handleChange}
                      
                      >
                        <option selected>Bạn chọn Danh Mục</option>
                        
                        {categorylist.map(item=>{
                          return <option key={item._id} value={item._id}>{item.name}</option>
                        })}
                      </select>
                      <button type="button" class="btn btn-outline-primary rounded-0">
                        <i class="fal fa-boxes"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card rounded-0 border-0 shadow-sm">
              <div class="card-body">
                <h6 class="pb-3 border-bottom">Price</h6>
                <div class="row">
                  <div class="col mb-3">
                    <label for="price" class="form-label">Price *</label>
                    <input type="number" class="form-control rounded-0" id="price" min="0" required
                     name="price"
                     onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card rounded-0 border-0 shadow-sm">
              <div class="card-body">
                <h6 class="pb-3 border-bottom">Image</h6>
                <div class="mb-3">
                  <label for="image" class="form-label">Product Image *</label>
                  <input class="form-control rounded-0" type="file" id="image"
                  name="image"
                  onChange={(event)=>{
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  
                  />
                  <div class="bg-secondary-subtle mb-3 p-2 text-center">
                    <img src="assets/img/products/iphone.webp" class="w-50"/>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="images" class="form-label">More Product Image</label>
                  <input class="form-control rounded-0" type="file" id="images" multiple/>
                  <div class="bg-secondary-subtle mb-3 p-2 text-center d-flex">
                    <img src="assets/img/products/iphone.webp" class="w-25"/>
                    <img src="assets/img/products/iphone.webp" class="w-25"/>
                    <img src="assets/img/products/iphone.webp" class="w-25"/>
                    <img src="assets/img/products/iphone.webp" class="w-25"/>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg rounded-0 mt-4 w-100">Create Product</button>
          </div>
        </form>
   
       </>
    )
}