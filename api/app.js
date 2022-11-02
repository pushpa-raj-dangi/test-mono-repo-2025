const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const cors = require("cors");
require("dotenv/config");
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(errorHandler);

const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-db",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000" + api);
});
