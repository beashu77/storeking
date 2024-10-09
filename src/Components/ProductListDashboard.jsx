import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import Navbar from "./Navbar";
import ProductTable from "./ProductTable";

const ProductListDashboard = () => {
  const [products, setProducts] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddClick = () => {
    reset({ name: "", skucode: "", price: "", mrp: "" });
  };

  const onSubmit = (data) => {
    const product = { ...data, id: uuidv4() };
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, product];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    alert("Product added successfully!");
    reset();
  };

  useEffect(() => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(existingProducts);
  }, []);

  return (
    <div className="container-lg shadow-lg p-3 bg-light">
      <Navbar onAddClick={handleAddClick} />
      <Modal
        modalId="addProductModal"
        title="Add Product"
        defaultValues={{ name: "", skucode: "", price: "", mrp: "" }}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />

      <div className="container-lg shadow-lg" style={{ minHeight: "max-content" }}>
        <h2>Product List</h2>
        <hr />
        <ProductTable products={products} setProducts={setProducts} />
      </div>
    </div>
  );
};

export default ProductListDashboard;
