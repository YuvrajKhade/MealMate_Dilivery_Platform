import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartQuantity,
} from "../../action/cartAction";

const FoodItems = ({ fooditem, restaurant }) => {
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const [showButton, setShowButton] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems || []); // Ensure cartItems is always an array

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const cartItem = cartItems.find(
        (item) => item.foodItem._id === fooditem._id
      );
      if (cartItem) {
        setQuantity(cartItem.quantity);
        setShowButton(true);
      } else {
        setQuantity(1);
        setShowButton(false);
      }
    }
  }, [cartItems, fooditem]);

  const incrementQty = () => {
    if (quantity < fooditem.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    } else {
      alert.show("Exceed stock limit", { type: "error" });
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    } else {
      setQuantity(0);
      setShowButton(false);
      dispatch(removeItemFromCart(fooditem._id, alert));
    }
  };

  const addToCartHandler = () => {
    if (!isAuthenticated && !user) {
      return navigate("/users/login");
    }
    if (fooditem && fooditem._id) {
      dispatch(addItemToCart(fooditem._id, restaurant, quantity, alert));
      setShowButton(true);
    } else {
      alert.show("Food item ID is not defined", { type: "error" });
    }
  };

  return (
    <div className="col-sm-12 col-md col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          src={fooditem.images[0].url}
          alt={fooditem.name}
          className="card-img-top mx-auto"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{fooditem.name} </h5>
          <p className="fooditem_des">{fooditem.description} </p>
          <p className="card-text">
            <FaIndianRupeeSign />
            {fooditem.price}
            <br />
          </p>

          {!showButton ? (
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          ) : (
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decrementQty}>
                -
              </span>
              <input
                type="number"
                className="form-control count d-inline"
                value={quantity}
                readOnly
              />
              <span className="btn btn-primary plus" onClick={incrementQty}>
                +
              </span>
            </div>
          )}
          <br />
          <p>
            Status:
            <span
              id="stock_status"
              className={fooditem.stock ? "greenColor" : "redColor"}
            >
              {fooditem.stock ? "In Stock" : "Out of Stock"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
