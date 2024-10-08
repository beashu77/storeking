import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";


const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const product = {
      name: data.name,
      skucode: data.sku,
      price: data.price,
      mrp: data.mrp,
      id: uuidv4(),
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    localStorage.setItem(
      "products",
      JSON.stringify([...existingProducts, product])
    );

    alert("Product added successfully!");
    reset();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-blue-background-with-geometric-forms-image_280879.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "30px",
      }}
    >
      <div
        className="container rounded p-5 opacity-75"
        style={{
          width: "70%",
          maxWidth: "600px",
          backgroundColor: "white",
        }}
      >
        <h2>Add Product</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 border border-secondary rounded "
          style={{
            padding: "10px",
            maxWidth: "600px",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label text-start d-block">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              style={{ borderColor: "grey" }}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="invalid-feedback">Name is required</div>
            )}
          </div>

          {/* SKU Code Field */}
          <div className="mb-3">
            <label className="form-label text-start d-block">SKU Code</label>
            <input
              type="text"
              className={`form-control ${errors.sku ? "is-invalid" : ""}`}
              style={{ borderColor: "grey" }}
              {...register("sku", {
                required: true,
                pattern: /^[a-zA-Z0-9]+$/,
              })}
            />
            {errors.sku && (
              <div className="invalid-feedback">
                SKU Code must be alphanumeric
              </div>
            )}
          </div>

          {/* Price Field */}
          <div className="mb-3">
            <label className="form-label text-start d-block">Price</label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              style={{ borderColor: "grey" }}
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price.message}</div>
            )}
          </div>

          {/* MRP Field */}
          <div className="mb-3">
            <label className="form-label text-start d-block">MRP</label>
            <input
              type="number"
              className={`form-control ${errors.mrp ? "is-invalid" : ""}`}
              style={{ borderColor: "grey" }}
              {...register("mrp", {
                required: "MRP is required",
                valueAsNumber: true,
              })}
            />
            {errors.mrp && (
              <div className="invalid-feedback">{errors.mrp.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary rounded-0 ">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
