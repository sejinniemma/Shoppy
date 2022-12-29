import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ key, product }) {
  const { category, description, id, image, options, price, title } = product;
  const navigate = useNavigate();

  const goToDetail = () => {
    // 해당 카드를 선택하면 해당 카드의 정보를 가지고 ProductDetail 페이지로 이동한다.
    navigate(`/products/${id}`, {
      state: { product },
    });
  };

  return (
    <li
      key={key}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
      onClick={goToDetail}
    >
      <img className='w-full' src={image} alt={title} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`$${price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-400'>{category}</p>
    </li>
  );
}
