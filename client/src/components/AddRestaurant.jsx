import React, { useState, useContext } from "react";
// import RestaurantFinder from "../apis/RestaurantFinder";
// import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  // const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await RestaurantFinder.post("/", {
    //     name,
    //     location,
    //     price_range: priceRange,
    //   });
    //   console.log(response.data.data);
    //   addRestaurants(response.data.data.restaurant);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="First name"
          aria-label="First name"
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Last name"
          aria-label="Last name"
        />
      </div>
    </div>
  );
};

export default AddRestaurant;
