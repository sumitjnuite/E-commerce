import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/cart/cartSlice.js";

const Cart = () => {
  let total = 0;
  const dispatch = useDispatch();
  const { itemsList } = useSelector((state) => state.cart);
//   console.log(itemsList);
  itemsList.map((item) => (total += item.totalPrice));


  function incrementCartItem(item) {
    dispatch(addToCart({
      name:item.title,
      id:item.id,
      price:item.price
    }))
  }
  function decrementCartItem(id) {
    dispatch(removeFromCart(id))

  }
  return (
    <div>
      <div className="cartItemCont">
        <h2>Your Cart:</h2>
        <table className="cartItemTable">
          <tbody>
            {itemsList?.map((item, index) => (
              <tr key={item.id} className="cartItemDetails">
                <td>{index+1}</td>
                <td> {item.name}</td>
                <td>${item.price} /-</td>
                <td>x{item.quantity}</td>
                <td>Total ${item.totalPrice}</td>
                <td><button className="cartActionBtn" onClick={()=>incrementCartItem(item)}>+</button></td>
                <td><button className="cartActionBtn" onClick={()=>decrementCartItem((item.id))}>-</button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="PlaceOrderCont">
        <p>Total: $ {total}</p>
        <button>Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
