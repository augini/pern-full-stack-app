import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import todosRoutes from "./routes/todos.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todosRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server is ready to serve",
  });
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
