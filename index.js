import express, { json } from "express";
import {
  obtenerTodasLasPizzasAsync,
  obtenerPizzaPorIdAsync,
  agregarPizzaAsync,
  actualizarPizzaAsync,
  borrarPizzaAsync,
} from "./repositorios/pizza.repositorios.js";

const app = express();
const PORT = 3000; // Puerto en el que escuchará el servidor

app.use(express.json()); // para poder leer req.body en POST/PUT

// aquí definiríamos las rutas
app.get("/", (req, res) => {
  const saludo = { mensaje: "Bienvenido a la Api Fes Aragon V1" };
  return res.json(saludo);
});

app.get("/api/v1/saludos", (req, res) => {
  const saludo = { mensaje: "Hola mundo, desde nodejs" };
  return res.json(saludo);
});

app.get("/api/v1/error", (req, res) => {
  const respuesta = { mensaje: "Oops ocurrio un error" };
  return res.status(500).json(respuesta);
});

app.get("/api/v1/respuesta", (req, res) => {
  const respuesta = { mensaje: "Ok" };
  return res.status(200).json(respuesta);
});

app.get("/api/v1/creacion", (req, res) => {
  const respuesta = { mensaje: "Creado con éxito" };
  return res.status(201).json(respuesta);
});

app.get("/api/v1/aceptacion", (req, res) => {
  const respuesta = { mensaje: "Aceptado con éxito" };
  return res.status(202).json(respuesta);
});

app.get("/api/v1/mala_respuesta", (req, res) => {
  const respuesta = { mensaje: "Mala respuesta" };
  return res.status(400).json(respuesta);
});

app.get("/api/v1/no_autorizado", (req, res) => {
  const respuesta = { mensaje: "No autorizado" };
  return res.status(401).json(respuesta);
});

app.get("/api/v1/no_encontrado", (req, res) => {
  const respuesta = { mensaje: "No encontrado" };
  return res.status(404).json(respuesta);
});

// ---------- Rutas del CRUD de pizzas conectadas al repositorio ----------

// Listar todas las pizzas
app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync()
  return res.json(pizzas)
});

// Obtener una pizza por id
app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = Number(req.params.id)
  const pizza = await obtenerPizzaPorIdAsync(id)

  if (!pizza) {
    return res.status(404).json({ mensaje: "Pizza no encontrada" })
  }

  return res.json(pizza)
});

// Agregar una nueva pizza
app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body
  await agregarPizzaAsync(pizza)

  const idDto = { id: id, fecha:new Date()}
  return res.status(201).json(idDto)
});

// Actualizar una pizza existente
app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)
  if (pizza == undefined){
    const mensaje = {mensaje: "No existe la pizza con ese id"}
    return res.status(404).json(mensaje);
  }

  const pizzaActualizada = req.body
  await actualizarPizzaAsync(id, pizzaActualizada)

  const mensaje = {mensaje: "Datos actualizados"}
  return res.status(202).json(mensaje)
});

// Borrar una pizza
app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  await borrarPizzaAsync(id)

  const mensaje = {mensaje: "Datos eliminados"}

  return res.status(202).json(mensaje)
});

// -------------------------------------------------------------------------

app.get("/api/v1/tamanios", (req, res) => {
  const tamanios = [
    {tamanio1: "Individual" },
    {tamanio2: "Chica"},
    {tamanio3: "Mediana"},
    {tamanio4: "Grande"},
    {tamanio5: "Familiar"}
  ];
  return res.json(tamanios);
});

app.get("/api/v1/bebidas", (req, res) => {
  const bebidas = [
    {bebida1: "Coca-Cola" },
    {bebida2: "Mundet"},
    {bebida3: "Sprite"},
    {bebida4: "Limonada"},
    {bebida5: "Agua de Sandía"},
    {bebida6: "Agua de Fresa"},
    {bebida7: "Michelada"}
  ];
  return res.json(bebidas);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});