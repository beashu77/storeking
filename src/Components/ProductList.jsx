import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddClick = () => {
    reset({
      name: "",
      skucode: "",
      price: "",
      mrp: "",
    });
  };

  const onSubmit = (data) => {
    const product = {
      name: data.name,
      skucode: data.skucode,
      price: data.price,
      mrp: data.mrp,
      id: uuidv4(),
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = [...existingProducts, product];

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Update the state with the newly added product
    setProducts(updatedProducts);

    alert("Product added successfully!");
    reset();
  };

  useEffect(() => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(existingProducts);
  }, []);

  // Filtering logic remains the same
  const filteredProducts = products.filter((product) => {
    const isWithinPriceRange =
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice));
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      isWithinPriceRange
    );
  });

  return (
    <div className="container-md shadow-lg p-3">
      <div
        className="container-lg mb-3"
        style={{ backgroundColor: "lightblue" }}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Store King
            </a>
            <button
              className="btn btn-outline-dark"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addProductModal"
              onClick={handleAddClick}
            >
              Add Products
            </button>

            {/* Add Product Modal */}
            <div
              className="modal fade"
              id="addProductModal"
              tabIndex="-1"
              aria-labelledby="addProductModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addProductModalLabel">
                      Add Product
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
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            Name is required
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">SKU Code</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.skucode ? "is-invalid" : ""
                          }`}
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

                      <div className="mb-3">
                        <label className="form-label">Price</label>
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
                        <label className="form-label">MRP</label>
                        <input
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
                          <div className="invalid-feedback">
                            {errors.mrp.message}
                          </div>
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
          </div>
        </nav>
      </div>

      {/* Product List Table */}
      <div className="container-lg shadow-lg">
        <h2>Product List</h2>
        <hr />
        <div className="d-flex justify-content-around mb-3">
          {/* Search and Filter Inputs */}
          <input
            type="text"
            placeholder="Search product ..."
            className="icon-link icon-link-hover"
            style={{ width: "150px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         <div>
         <input
            type="number"
            placeholder="Min Price"
            style={{ width: "100px" }}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            style={{ width: "100px", marginLeft: "10px" }}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
         </div>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setSearchTerm("");
              setMinPrice("");
              setMaxPrice("");
            }}
          >
            Clear Filters
          </button>
        </div>

        {/* Table for Product List */}
        <table className="table table-info table-striped w-100">
          <thead>
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">SKU Code</th>
              <th className="p-3">Price</th>
              <th className="p-3">MRP</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                  products={products}
                  setProducts={setProducts}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <h2>No products available</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
