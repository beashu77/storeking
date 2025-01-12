import React from "react";

const Modal = ({
  modalId,
  title,
  defaultValues,
  onSubmit,
  errors,
  register,
}) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>
              {title}
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
              onSubmit={onSubmit}
              className="p-3 shadow-lg rounded bg-primary-subtle"
            >
              <div className="mb-3 d-flex">
                <label className="form-label text-start w-50 fw-semibold">Name</label>
                <input
                  type="text"
                  className={`form-control border-dark shadow-sm ${errors.name ? "is-invalid" : ""}`}
                  style={{ backgroundColor: "#f8f9fa" }} 
                  defaultValue={defaultValues.name}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div className="invalid-feedback">Name is required</div>
                )}
              </div>

              <div className="mb-3 d-flex">
                <label className="form-label text-start w-50 fw-semibold">SKU Code</label>
                <input
                  type="text"
                  className={`form-control border-dark shadow-sm ${errors.skucode ? "is-invalid" : ""}`}
                  style={{ backgroundColor: "#f8f9fa" }} 
                  defaultValue={defaultValues.skucode}
                  {...register("skucode", {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+$/,
                  })}
                />
                {errors.skucode && (
                  <div className="invalid-feedback">
                    SKU Code must be alphanumeric
                  </div>
                )}
              </div>

              <div className="mb-3 d-flex">
                <label className="form-label text-start w-50 fw-semibold">Price</label>
                <input
                  type="number"
                  className={`form-control border-dark shadow-sm ${errors.price ? "is-invalid" : ""}`}
                  style={{ backgroundColor: "#f8f9fa" }} 
                  defaultValue={defaultValues.price}
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price.message}</div>
                )}
              </div>

              <div className="mb-3 d-flex">
                <label className="form-label text-start w-50 fw-semibold">MRP</label>
                <input
                  type="number"
                  className={`form-control border-dark shadow-sm ${errors.mrp ? "is-invalid" : ""}`}
                  style={{ backgroundColor: "#f8f9fa" }} 
                  defaultValue={defaultValues.mrp}
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
  );
};

export default Modal;
