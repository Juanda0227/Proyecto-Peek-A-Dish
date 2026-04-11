fetch('data/platos.json')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('dish-list');

    data.forEach(plato => {
      contenedor.innerHTML += `
        <div class="dish-card">
          <img src="${plato.imagen}" alt="${plato.nombre}" />
          <div class="dish-card-body">
            <h3>${plato.nombre}</h3>
            <p>${plato.descripcion}</p>
            <div class="dish-footer">
              <span class="dish-price">$${plato.precio}</span>
              <button class="btn-fav" data-id="${plato.id}">🤍</button>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => console.error("Error:", error));