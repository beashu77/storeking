import React from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

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
      sku: data.skucode,
      price: data.price,
      mrp: data.mrp,
    });
  };

  const onSubmit = (updatedData) => {
    const updatedProducts = products.map((product) =>
      product.id === data.id
        ? {
            ...product,
            name: updatedData.name,
            skucode: updatedData.sku,
            price: updatedData.price,
            mrp: updatedData.mrp,
          }
        : product
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
    <div
      className="card col-lg-4 col-md-6 col-sm-12 mb-3 mx-3"
      style={{ width: "250px" }}
    >
      <img
        src="https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg"
        className="card-img-top"
        style={{ height: "150px", width: "200px", margin: "auto" }}
        alt="product_image"
      />
      <div className="card-body">
        <h3 className="card-title mb-1" style={{ lineHeight: "1px" }}>
          {data.name}
        </h3>
        <br />
        <hr />
        <p
          className="card-text text-body-secondary text-start"
          style={{ lineHeight: "1px", fontSize: "12px" }}
        >
          Shipped in 7-8 days
        </p>
        <p
          className="card-text text-body-secondary text-start"
          style={{ lineHeight: "1px", fontSize: "12px" }}
        >
          ₹ {data.mrp}
        </p>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            href="#"
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 border border-secondary rounded"
              >
                <div className="mb-3">
                  <label className="form-label text-start d-block">Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">Name is required</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label text-start d-block">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.sku ? "is-invalid" : ""}`}
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

                <div className="mb-3">
                  <label className="form-label text-start d-block">Price</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">
                      {errors.price.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label text-start d-block">MRP</label>
                  <input
                    type="number"
                    className={`form-control ${errors.mrp ? "is-invalid" : ""}`}
                    {...register("mrp", {
                      required: "MRP is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.mrp && (
                    <div className="invalid-feedback">{errors.mrp.message}</div>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
