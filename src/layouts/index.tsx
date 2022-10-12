import { useEffect, useState } from 'react';
import HStack from '../components/HStack';
import {
  getProductsRequest,
  deleteProductRequest,
  createProductRequest,
} from '../globals/fetch';

interface Product {
  _id: string;
  title: string;
  description?: string;
  price: string;
  image: string;
}

export default function Layout() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log('Layout mounted');
    getProductsRequest().then((data) => {
      if (data !== 'error') {
        setProducts(data);
      }
    });
  }, []);

  const deleteProduct = (id: string) => {
    deleteProductRequest(id).then((data) => {
      if (data !== 'error') {
        setProducts(products.filter((product) => product._id !== id));
      }
    });
  };

  const createProduct = () => {
    createProductRequest().then((data) => {
      if (data !== 'error') {
        setProducts([...products, data]);
      }
    });
  };

  return (
    <div style={{ height: '100vh' }}>
      <div>
        <HStack>
          <h1>All products</h1>
          <button onClick={() => createProduct()}>Create</button>
        </HStack>

        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <img src={product.image} alt={product.title} />

            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
