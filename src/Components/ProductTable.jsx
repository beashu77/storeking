import React from 'react';
import Product from './Product';

const ProductTable = ({ products, setProducts }) => {
  return (
    <table className="table table-info table-striped w-100 rounded ">
      <thead>
        <tr>
          <th>Name</th>
          <th>SKU Code</th>
          <th>Price</th>
          <th>MRP</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} data={product} products={products} setProducts={setProducts} />
          ))
        ) : (
          <tr>
            <td colSpan="6">No products available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
