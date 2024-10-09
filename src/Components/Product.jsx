import React from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

const Product = ({ data, products, setProducts }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEditClick = () => {
    reset({
      name: data.name,
      skucode: data.skucode,
      price: data.price,
      mrp: data.mrp,
    });
  };

  const onSubmit = (updatedData) => {
    const updatedProducts = products.map((product) =>
      product.id === data.id ? { ...product, ...updatedData } : product
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    alert("Product updated successfully!");
  };

  const handleDelete = () => {
    const filteredProducts = products.filter(
      (product) => product.id !== data.id
    );
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    setProducts(filteredProducts);
    alert("Product deleted successfully!");
  };

  return (
    <>
      <tr >
        <td className="table-responsive-text ">{data.name}</td>
        <td className="table-responsive-text ">{data.skucode}</td>
        <td className="table-responsive-text ">₹ {data.price}</td>
        <td className="table-responsive-text ">₹ {data.mrp}</td>
        <td className="table-responsive-text ">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target={`#editModal-${data.id}`}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </td>
        <td className="table-responsive-text ">
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            Delete
          </button>
        </td>
      </tr>

      <Modal
        modalId={`editModal-${data.id}`}
        title="Edit Product"
        defaultValues={data}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default Product;
