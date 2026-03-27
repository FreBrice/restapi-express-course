import express from "express";
import morgan from "morgan";
import routes from "./routes/products.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/products", routes);

app.listen(3000);
console.log(`server en puerto ${3000}`);
