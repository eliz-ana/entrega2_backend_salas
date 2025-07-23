const socket = io();
console.log("🟢 Cliente conectado a WebSocket");

// Escucha productos actualizados
socket.on("productosActualizados", (productos) => {
  console.log("📥 Productos actualizados recibidos:", productos);
  const lista = document.getElementById("product-list");
  lista.innerHTML = "";
  productos.forEach((prod) => {
    const li = document.createElement("li");
    li.innerText = `${prod.title} - $${prod.price}`;
    lista.appendChild(li);
  });
});

// Formulario de nuevo producto
const form = document.getElementById("product-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("📝 Submit capturado");

  const title = document.getElementById("title").value.trim();
  const price = parseFloat(document.getElementById("price").value);

  console.log("📤 Enviando producto vía socket:", { title, price });

  if (title && !isNaN(price)) {
    socket.emit("nuevoProducto", { title, price });
    form.reset();
  } else {
    console.warn("⚠️ Datos inválidos");
  }
});
