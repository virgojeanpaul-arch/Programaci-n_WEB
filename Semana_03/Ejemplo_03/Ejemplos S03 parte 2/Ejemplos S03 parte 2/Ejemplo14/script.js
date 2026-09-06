document.addEventListener("DOMContentLoaded", () => {
  const btnMostrar = document.getElementById("btnMostrar");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const btnCreditos = document.getElementById("btnCreditos");
  const salida = document.getElementById("salida");

  function valorRadio(nombre) {
    const seleccionado = document.querySelector(`input[name="${nombre}"]:checked`);
    return seleccionado ? seleccionado.value : "No seleccionado";
  }

  function valoresIntereses() {
    return [...document.querySelectorAll('input[name="intereses"]:checked')]
      .map(input => input.value);
  }

  function mostrarDatos() {
    const nombre = document.getElementById("nombre").value.trim() || "No ingresado";
    const direccion = document.getElementById("direccion").value.trim() || "No ingresada";
    const correo = document.getElementById("correo").value.trim() || "No ingresado";
    const intereses = valoresIntereses();
    const estadoCivil = valorRadio("estadoCivil");
    const genero = valorRadio("genero");

    salida.innerHTML = `
      <ul class="output-list">
        <li><strong>Nombre:</strong> ${escapeHtml(nombre)}</li>
        <li><strong>Dirección:</strong> ${escapeHtml(direccion)}</li>
        <li><strong>Correo:</strong> ${escapeHtml(correo)}</li>
        <li><strong>Intereses:</strong> ${intereses.length ? intereses.map(escapeHtml).join(", ") : "Ninguno seleccionado"}</li>
        <li><strong>Estado civil:</strong> ${escapeHtml(estadoCivil)}</li>
        <li><strong>Género:</strong> ${escapeHtml(genero)}</li>
      </ul>
    `;
  }

  function limpiarCasillas() {
    document.querySelectorAll('input[type="text"], input[type="email"]').forEach(input => {
      input.value = "";
    });

    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
      input.checked = false;
    });

    salida.innerHTML = '<span class="output-placeholder">Los datos ingresados aparecerán aquí.</span>';
  }

  function verCreditos() {
    const ventana = window.open("", "_blank");

    if (!ventana) {
      alert("El navegador bloqueó la nueva pestaña. Permite ventanas emergentes para ver los créditos.");
      return;
    }

    ventana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Créditos</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #111;
            color: #ddd;
            font-family: Arial, sans-serif;
          }
          .card {
            width: min(520px, 85%);
            border: 1px solid #555;
            padding: 35px;
            text-align: center;
            background: #181818;
            box-shadow: 0 10px 35px #000;
          }
          h1 { color: #269cf2; }
          p { color: #aaa; line-height: 1.7; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Créditos</h1>
          <p><strong>Mi formulario de datos</strong></p>
          <p>Autor: <strong>Tu nombre aquí</strong></p>
          <p>Proyecto desarrollado con HTML, CSS y JavaScript.</p>
          <p>© 2026 - Todos los derechos reservados.</p>
        </div>
      </body>
      </html>
    `);

    ventana.document.close();
  }

  function escapeHtml(texto) {
    return String(texto).replace(/[&<>"']/g, caracter => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[caracter]));
  }

  btnMostrar.addEventListener("click", mostrarDatos);
  btnLimpiar.addEventListener("click", limpiarCasillas);
  btnCreditos.addEventListener("click", verCreditos);
});
