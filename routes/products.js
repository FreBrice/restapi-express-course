import { Router } from "express";

const router = Router();
let products = [
  {
    id: 1,
    name: "teclado",
    precio: 150,
  },
];

router.get("/", (req, res) => {
  res.send("obteniendo productos");
});

router.post("/", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

router.put("/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id),
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product not found ",
    });
  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p,
  );

  res.json({
    message: "Producto actualizado",
  });
});

router.delete("/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id),
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product not found ",
    });
  products = products.filter(
    (product) => product.id !== parseInt(req.params.id),
  );
  res.sendStatus(204);
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id),
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product not found ",
    });
  console.log(productFound);
  res.send(productFound);
});

export default router;
