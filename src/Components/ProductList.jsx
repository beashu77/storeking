import React, { useEffect, useState } from "react";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(existingProducts);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm(""); // Reset search term
    setMinPrice(""); // Reset min price
    setMaxPrice(""); // Reset max price
  };

  const filteredProducts = products.filter((product) => {
    const isWithinPriceRange =
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice));
    return (
      product.name.toLowerCase().includes(searchTerm) && // Case-insensitive search
      isWithinPriceRange
    );
  });

  return (
    <div className="container-md d-flex shadow-lg p-3">
      <div
        className="container-sm border border-secondary ms-2 shadow-lg"
        style={{ width: "30%", marginLeft: "20px", height: "100vh" }}
      >
        <h2>Sidebar</h2>
        <hr />
        <ul className="list-group">
          <li
            className="list-group-item active"
            aria-current="true"
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-home"></i>
            <i className="bi bi-house-door-fill"></i> Home
          </li>
          <li className="list-group-item" style={{ cursor: "pointer" }}>
            Add Products
          </li>
          <li className="list-group-item" style={{ cursor: "pointer" }}>
            Products
          </li>
          <li className="list-group-item" style={{ cursor: "pointer" }}>
            Overview
          </li>
        </ul>
      </div>

      <div className="container-lg border border-secondary shadow-lg">
        <h2>Product List</h2>
        <hr />

        <div className="d-flex justify-content-between">
          <div>
            <input
              type="text"
              placeholder="Search product ..."
              className="icon-link icon-link-hover"
              style={{ width: "150px" }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Min Price"
              style={{ width: "100px" }}
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type="number"
              placeholder="Max Price"
              style={{ width: "100px", marginLeft: "10px" }}
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
            <div style={{ display: "inline-block", marginLeft: "10px" }}>
              <button
                type="button"
                className="rounded bg-primary text-white border border-0 icon-link icon-link-hover"
                style={{ padding: "4px 10px" }}
                onClick={clearFilters}
              >
                Remove all filter
              </button>
            </div>
          </div>
        </div>

        <div
          className="container-lg p-4 mt-5 row"
          style={{ backgroundColor: "lightgrey" }}
        >
          <div className="row" style={{ margin: "auto" }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((elem) => (
                <Product
                  key={elem.id}
                  data={elem}
                  products={products}
                  setProducts={setProducts}
                />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
