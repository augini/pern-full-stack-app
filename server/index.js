import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import todosRoutes from "./routes/todos.js";
import restaurantRoutes from "./routes/restaurants.js";
//dotenv config
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todosRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server is ready to serve",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
