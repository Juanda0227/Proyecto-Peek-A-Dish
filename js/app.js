console.log("Formulario activo");
const errorForm = document.getElementById("error-formulario");
fetch('data/platos.json')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('dish-list');

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    contenedor.innerHTML = "";

    data.forEach(plato => {
      contenedor.innerHTML += `
        <div class="dish-card">
          <img src="${plato.imagen || 'https://via.placeholder.com/300'}" alt="${plato.nombre}" />
          <div class="dish-card-body">
            <h3>${plato.nombre}</h3>
            <p>${plato.descripcion}</p>
            <div class="dish-footer">
              <span class="dish-price">$${plato.precio}</span>
              <button class="btn-fav ${favoritos.includes(String(plato.id)) ? 'active' : ''}" data-id="${plato.id}">🤍</button>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => console.error("Error:", error));


document.addEventListener("click", (e) => {
  const boton = e.target.closest(".btn-fav");

  if (boton) {
    const id = String(boton.dataset.id);

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(f => f !== id);
      boton.classList.remove("active");
      boton.textContent = "🤍";
    } else {
      favoritos.push(id);
      boton.classList.add("active");
      boton.textContent = "❤️";
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
});
document.getElementById("enviar").addEventListener("click", () => {
  console.log("CLICK FORMULARIO"); // prueba

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");

  let valido = true;
  errorForm.style.display = "none";

  if (nombre.value.trim() === "") {
    nombre.parentElement.classList.add("invalid");
    valido = false;
  } else {
    nombre.parentElement.classList.remove("invalid");
  }

  if (!email.value.includes("@")) {
    email.parentElement.classList.add("invalid");
    valido = false;
  } else {
    email.parentElement.classList.remove("invalid");
  }
  if (!valido) {
  errorForm.style.display = "block";
}
  if (valido) {
  const mensaje = document.getElementById("mensaje");
  mensaje.style.display = "block"; 

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 10000);
}
});