import React from 'react';
import useProduct from '../hooks/useProduct';
import ProductCard from './ProductCard';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProduct();

  console.log(products);
  return (
    <>
      {isLoading && <p>isLoading...</p>}
      {error && <p>{error}</p>}
      <ul className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
