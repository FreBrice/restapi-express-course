import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
//app.use(express.json());
//app.disable("x-powered-by");

app.get("/tasks", (req, res) => {
  res.send("Lista de tareas");
});

//HTTP request
//indica a express que debe procesar un texto en la petición
app.use(express.text());
app.post("/tasks", (req, res) => {
  console.log(req.body);
  res.send("Creando tareas");
});

app.get("/add/:x/:y", (req, res) => {
  const { x, y } = req.params;
  res.send(`Result: ${parseInt(x) + parseInt(y)}`);
});

app.get("users/:username/photo", (req, res) => {
  if (req.params.username === "fre") {
    return res.sendFile("./error.jpg", {
      root: __dirname,
    });
  }

  res.send("el usuario no tiene acceso");
});

//Querys
app.get("/search", (req, res) => {
  if (req.query.q === "javascrip books") {
    res.send("lista de libros de javascript");
  } else {
    res.send("pagina normal");
  }
});
app.get("/hello/:username", (req, res) => {
  console.log(req.query);
  res.send(`Hello ${req.params.username.toUpperCase()}`);
});

//método all
app.all("/info", (req, res) => {
  res.send("server info");
});

//middlewares
app.use((req, res, next) => {
  if (req.query.login === "fre@gmail.com") {
    next();
  } else {
    res.send("No autorizado");
  }
});

app.get("/dashboard", (req, res) => {
  res.send("dashboard page");
});

//.
app.put("/tasks", (req, res) => {
  res.send("Actualizando tareas");
});

app.patch("/tasks", (req, res) => {
  res.send("Actualizando una parte de la tarea");
});

app.delete("/tasks", (req, res) => {
  res.send("Eliminando tareas");
});

//lectura de archivos
app.get("/miarchivo", (req, res) => {
  res.sendFile("./error.jpg", {
    root: __dirname,
  });
});

//respuesta en JSON
app.get("/user", (req, res) => {
  res.json({ name: "fredy" });
});

app.use((req, res) => {
  res.status(404).send("Error 404, No se encontró tu página");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto http://localhost:${PORT}`);
});
