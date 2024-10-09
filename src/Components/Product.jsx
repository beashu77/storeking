import React from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = ({ data, i, products, setProducts }) => {
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
      product.id === data.id
        ? {
            ...product,
            name: updatedData.name,
            skucode: updatedData.skucode,
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
    <>
      <tr>
        <td className="p-2">{data.name}</td>
        <td className="p-2">{data.skucode}</td>
        <td className="p-2">₹ {data.price}</td>
        <td className="p-2">₹ {data.mrp}</td>
        <td className="p-2">
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
        <td className="p-2">
          <button
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Modal Component */}
      <div
        className="modal fade"
        id={`editModal-${data.id}`}
        tabIndex="-1"
        aria-labelledby={`editModalLabel-${data.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editModalLabel-${data.id}`}>
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
                <div className="mb-3 text-start fw-semibold d-flex ">
                  <label className="form-label w-50" >Name</label>
                  <input 
                    style={{backgroundColor:'lightgray'}}
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

                <div className="mb-3 text-start fw-semibold d-flex ">
                  <label className="form-label w-50" >SKU Code</label>
                  <input 
                    style={{backgroundColor:'lightgray'}}
                    type="text"
                    className={`form-control ${
                      errors.sku ? "is-invalid" : ""
                    }`}
                    {...register("skucode", {
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

                <div className="mb-3 text-start fw-semibold d-flex ">
                  <label className="form-label w-50" >Price</label>
                  <input 
                    style={{backgroundColor:'lightgray'}}
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

                <div className="mb-3 text-start fw-semibold d-flex ">
                  <label className="form-label w-50" >MRP</label>
                  <input 
                    style={{backgroundColor:'lightgray'}}
                    type="number"
                    className={`form-control ${
                      errors.mrp ? "is-invalid" : ""
                    }`}
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
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
