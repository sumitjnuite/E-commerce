import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import searchIcon from "../assests/searchIcon.png";
import addToCart from "../assests/addToCart.png";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../Redux/user/userSlice.js";
import { emptyCart } from "../Redux/cart/cartSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogOut = () => {
    dispatch(emptyCart());
    dispatch(signOutSuccess());
    localStorage.removeItem("dummy_token");
  };

  const handleSearchChange = (e) => {
    setSearchParams({ name: e.target.value });
  };

  return (
    <nav className="navbar">
      <div>
        <h1>
          <Link to={"/home"}>E-COMM</Link>
        </h1>
      </div>
      {currentUser && (
        <>
          <div className="searchDiv">
            <input
              type="text"
              placeholder="search"
              value={searchParams.name}
              onChange={handleSearchChange}
            />
            <img src={searchIcon} alt="" className="searchIcon" />
          </div>
          <div className="navigationBarDiv">
            <Link to={"/home"}>Home</Link>
            <Link to={"/cart"}>
              <img src={addToCart} alt="" style={{ height: "1.9rem" }} />
              <span className="cartCount">{totalQuantity}</span>
            </Link>
            <button className="logoutBtn" onClick={handleLogOut}>
              LOGOUT
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
