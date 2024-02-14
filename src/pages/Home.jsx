import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cart/cartSlice.js";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  let total = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { itemsList, totalQuantity } = useSelector((state) => state.cart);
  // console.log(itemsList);
  const [fetchedProducts, setFetchedProducts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      // console.log(data.products);
      setFetchedProducts(data);
      setFilteredProducts(data.products);
    };
    fetchProduct();
    searchParams.delete("name");
    setSearchParams(searchParams);
  }, []);

  // console.log(fetchedProducts);
  itemsList.map((item) => (total += item.totalPrice));

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        name: product.title,
        id: product.id,
        price: product.price,
      })
    );
    // console.log(product)
  };
  // console.log(fetchedProducts);

  const handleFilterProduct = () => {
    const searchQuery = searchParams.get("name")?.toLowerCase();
    console.log(searchQuery);
    const filtered = fetchedProducts?.products?.filter(
      (item) =>
        (!minPrice || item.price >= parseInt(minPrice)) &&
        (!maxPrice || item.price <= parseInt(maxPrice)) &&
        (!searchQuery || item.title?.toLowerCase().includes(searchQuery))
    );

    setFilteredProducts(filtered);
  };
  useEffect(() => {
    handleFilterProduct();
  }, [searchParams, minPrice, maxPrice]);

  // console.log("filter", filteredProducts);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="filterDiv">
          <h3>Filter:</h3>
          <div className="filterByPrice">
            <h4>By Price:</h4>
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        <div className="cardsandtitleWrapper">
          <h2 style={{ margin: "1rem 2rem" }}>Product List :</h2>
          <div className="cardsWrapper">
            {filteredProducts?.length
              ? filteredProducts.map((product) => (
                  <div key={product.id} className="ProductCard">
                    <img src={product.thumbnail} alt="" />
                    <div className="productInfo">
                      <p className="productTitle">{product.title}</p>
                      <p className="productPrice">$ {product.price}</p>
                      <p className="productDiscount">
                        {product.discountPercentage}% OFF
                      </p>
                      <button
                        className="addTOcartbtn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))
              : "No Product Found"}
          </div>
        </div>
        {itemsList.length ? (
          <div className="cartDetails">
            <p>Total Quantity : {totalQuantity}</p>
            <p>Total Price : $ {total}</p>

            <button onClick={() => navigate("/cart")}>Go To Cart</button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
