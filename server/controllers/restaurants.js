import pool from "../db.js";

//get all restaurants
export const getRestaurants = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    // const allRestaurants = await pool.query(
    //   "SELECT * FROM restaurants ORDER BY id"
    // );

    const restaurantRatingsData = await pool.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );

    res.status(200).json({
      status: "success",
      // results: allRestaurants.rows.length,
      results: restaurantRatingsData.rows.length,
      data: { restaurants: restaurantRatingsData.rows },
    });
  } catch (error) {
    console.log({ error });
    res.json({ error: error.detail });
  }
};

//get a single restaurant
export const getRestaurant = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const restaurant = await pool.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [id]
    );

    const reviews = await pool.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [id]
    );

    res.json({
      status: "success",
      results: restaurant.rows.length,
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log({ error });
    res.json({ error: error.detail });
  }
};

//add a new restaurant
export const postRestaurant = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { name, location, price_range } = req.body;
    const newRestaurant = await pool.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );
    res.json({
      status: "success",
      data: {
        restaurant: newRestaurant.rows[0],
      },
    });
  } catch (error) {
    console.log({ error });
    res.json({ error: error.detail });
  }
};

//update a restaurant
export const putRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const { id } = req.params;
    const updatedRestaurant = await pool.query(
      "UPDATE restaurants SET name = ($1), location = ($2), price_range =($3) WHERE id = ($4)",
      [name, location, price_range, id]
    );
    res.json({
      method: updatedRestaurant.command,
      message: "The restaurant has been updated",
    });
  } catch (error) {
    console.log({ error });
    res.json({ error: error.detail });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await pool.query(
      "DELETE FROM restaurants WHERE id = $1",
      [id]
    );
    if (deleteRestaurant.rowCount === 1) {
      res.json({
        message: "Restaurant was successfully deleted",
        restaurant: deletedRestaurant,
      });
    } else {
      res.json({
        message: "Restaurant with the ID does not exist",
      });
    }
  } catch (error) {
    console.log({ error });
    res.json({ error: error.detail });
  }
};

export const postReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating } = req.body;
    const newReview = await pool.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [id, name, review, rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
};
