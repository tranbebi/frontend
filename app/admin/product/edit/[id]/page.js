'use client'; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function EditProduct({ params }) {
  const router = useRouter();
  const  id  = params.id;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
	
	//Lay danh muc tu backend vao bien categories
  useEffect(() => {
	  //Khai bao ham lay danh muc
    const getCategories = async () => {
      const res = await fetch('http://localhost:3000/categories');
      const data = await res.json();
      setCategories(data);
    };
    //goi ham lay danh muc
    getCategories();
		
		//Lay du lieu cua chi tiet san pham can sua 
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3000/productdetail/${id}`);
      const data = await res.json();
      setProduct(data);
      //Du lieu chi tiet san pham show ra form
      // Đặt giá trị ban đầu cho form
      setValue('name', data.name);
      setValue('price', data.price);
      setValue('description', data.description);
      setValue('categoryId', data.categoryId);
    };
    //Goi ham 
    if (id) {
      getProduct();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    const res = await fetch(`http://localhost:3000/products/updateproduct/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const result = await res.json();
    if (!result.error) {
      router.push('/admin/product');
    } else {
      // Xử lý hiển thị lỗi
      console.error(result.error);
    }
  };

  return (
    <div className="m-3">
      <h2>Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
        <div className="form-group my-2">
          <label className='form-label'>Tên sản phẩm</label>
          <input type="text" className="form-control" {...register('name', { required: 'Tên sản phẩm là bắt buộc' })} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Giá</label>
          <input type="number" className="form-control" {...register('price', { required: 'Giá là bắt buộc', valueAsNumber: true })} />
          {errors.price && <div className="text-danger">{errors.price.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Mô tả</label>
          <textarea className="form-control" {...register('description', { required: 'Mô tả là bắt buộc' })} />
          {errors.description && <div className="text-danger">{errors.description.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Hình ảnh</label>
          <br />
          <img src={`http://localhost:3000/img/${product?.image}`} width='200px' />
          <input type="file" className="form-control" {...register('image')} />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Danh mục</label>
          <select className='form-control' {...register('categoryId', { required: 'Chọn một danh mục' })}>
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <div className="text-danger">{errors.categoryId.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary my-3">Cập nhật sản phẩm</button>
</form>
    </div>
  );
}