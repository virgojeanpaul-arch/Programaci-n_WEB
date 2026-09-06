class Estudiante {
  constructor(nombre, codigo, promedio) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.promedio = Number(promedio);
  }

  mostrarInformacion() {
    return `Nombre: ${this.nombre}\nCódigo: ${this.codigo}\nPromedio: ${this.promedio}`;
  }

  estaAprobado() {
    return this.promedio >= 11;
  }
}

// Datos iniciales basados en el script adjunto.
const estudiantes = [
  new Estudiante("Ana", "2026001", 16),
  new Estudiante("Carlos", "2026002", 9)
];

// Genera los datos de salida a partir de la información ingresada.
function generarEstudiante(nombre, codigo, promedio) {
  const estudiante = new Estudiante(nombre, codigo, promedio);
  estudiantes.push(estudiante);
  return estudiante;
}

function obtenerEstado(estudiante) {
  return estudiante.estaAprobado() ? "APROBADO" : "DESAPROBADO";
}

function renderizarTabla() {
  const cuerpo = document.getElementById("tablaEstudiantes");
  cuerpo.innerHTML = "";

  estudiantes.forEach((estudiante, indice) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${indice + 1}</td>
      <td>${escapeHtml(estudiante.nombre)}</td>
      <td>${escapeHtml(estudiante.codigo)}</td>
      <td>${estudiante.promedio}</td>
      <td>
        <span class="estado ${estudiante.estaAprobado() ? "aprobado" : "desaprobado"}">
          ${obtenerEstado(estudiante)}
        </span>
      </td>
    `;
    cuerpo.appendChild(fila);
  });
}

function escapeHtml(texto) {
  return String(texto).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[caracter]));
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarTabla();

  const formulario = document.getElementById("formEstudiante");
  const mensaje = document.getElementById("mensaje");
  const salida = document.getElementById("salida");

  formulario.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const codigo = document.getElementById("codigo").value.trim();
    const promedio = Number(document.getElementById("promedio").value);

    if (!nombre || !codigo || Number.isNaN(promedio) || promedio < 0 || promedio > 20) {
      mensaje.textContent = "Complete correctamente todos los campos. El promedio debe estar entre 0 y 20.";
      mensaje.className = "mensaje error";
      return;
    }

    const estudiante = generarEstudiante(nombre, codigo, promedio);

    salida.innerHTML = `
      <div class="resultado">
        <h3>Datos generados</h3>
        <p><strong>Nombre:</strong> ${escapeHtml(estudiante.nombre)}</p>
        <p><strong>Código:</strong> ${escapeHtml(estudiante.codigo)}</p>
        <p><strong>Promedio:</strong> ${estudiante.promedio}</p>
        <p><strong>Estado:</strong>
          <span class="estado ${estudiante.estaAprobado() ? "aprobado" : "desaprobado"}">
            ${obtenerEstado(estudiante)}
          </span>
        </p>
      </div>
    `;

    mensaje.textContent = "Estudiante generado correctamente.";
    mensaje.className = "mensaje exito";
    renderizarTabla();
    formulario.reset();
    document.getElementById("nombre").focus();
  });
});
