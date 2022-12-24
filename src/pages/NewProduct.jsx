import React, { useState } from 'react';
import { addNewProduct, writeUserData } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
// import Upload from '../api/upload';

export default function NewProduct() {
  const { user } = useAuthContext();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [url, setURL] = useState();

  // 제품,file 저장
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => setURL(url));
    addNewProduct(product, url);
    //Firebase에 제품과, url정보 업로드 해주기
  };

  return (
    <section className='flex items-center flex-col'>
      {file && <img src={URL.createObjectURL(file)} alt='local file' />}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col space-y-4 border-black w-full'
      >
        <input
          className='p-5'
          type='file'
          name='file'
          accept='image/*'
          required
          onChange={handleChange}
        />
        <input
          className='p-5'
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          className='p-5'
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          className='p-5'
          type='text'
          name='category'
          value={product.category} // 왜 안되는지 알기.
          required
          placeholder='카테고리'
        />
        <input
          className='p-5'
          type='text'
          name='description'
          value={product.description ?? ''}
          required
          placeholder='제품 설명'
          onChange={handleChange}
        />
        <input
          className='p-5'
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button text={'제품 등록하기'} />
      </form>
    </section>
  );
}
