import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { ALL_PRODUCTS } from "../../utils";
import "./HomePage.css";
import AppBarComponent from "../AppBar/AppBar";

function HomePage({ cartItemCount }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(ALL_PRODUCTS);
        setProducts(response.data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <AppBarComponent
        handleSearch={handleSearch}
        cartItemCount={cartItemCount} // Pass the cartItemCount as a prop
      />
      <div className="container">
        <h1>Welcome to the Home Page!</h1>
        <div className="card-container">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
