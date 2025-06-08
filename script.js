// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

// Configuración
const firebaseConfig = {
  apiKey: "AIzaSyCs6Pw9oRaSqXy24csq4XWYeONK8bgMh4E",
  authDomain: "pruebaexamen-4fac9.firebaseapp.com",
  projectId: "pruebaexamen-4fac9",
  storageBucket: "pruebaexamen-4fac9.firebasestorage.app",
  messagingSenderId: "378182395740",
  appId: "1:378182395740:web:8b55e6f303b7374eaa4399"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Captura de elementos
const inputNombre = document.getElementById("nombreform");
const inputApellidos = document.getElementById("apellidosform");
const inputDNI = document.getElementById("dniform");
const inputTelefono = document.getElementById("telefoniform");
const btnAgregar = document.getElementById("agregarAlumno");
const tablaAlumnos = document.querySelector(".id_alumnos");

// Evento: agregar alumno
btnAgregar.addEventListener("click", async () => {
  const nombre = inputNombre.value.trim();
  const apellidos = inputApellidos.value.trim();
  const dni = inputDNI.value.trim();
  const telefono = inputTelefono.value.trim();

  if (!nombre || !apellidos || !dni || !telefono) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "alumnos"), {
      nombre,
      apellidos,
      dni,
      telefono
    });

    console.log("Alumno guardado con ID:", docRef.id);

    // Crear y añadir fila a la tabla
    insertarFila(nombre, apellidos, dni, telefono, docRef.id);

    // Limpiar formulario
    inputNombre.value = "";
    inputApellidos.value = "";
    inputDNI.value = "";
    inputTelefono.value = "";

  } catch (error) {
    console.error("Error al guardar:", error);
  }
});

// Función para insertar una fila con botones
function insertarFila(nombre, apellidos, dni, telefono, id) {
  const fila = document.createElement("tr");
  fila.setAttribute("data-id", id);

  const avatarHTML = `<img src="https://randomuser.me/api/portraits/lego/1.jpg" class="avatar-img"/>`;

  const tdAvatar = document.createElement("td");
  tdAvatar.innerHTML = avatarHTML;
  tdAvatar.classList.add("align-middle");

  const tdNombre = document.createElement("td");
  tdNombre.textContent = nombre;
  tdNombre.classList.add("align-middle");

  const tdApellidos = document.createElement("td");
  tdApellidos.textContent = apellidos;
  tdApellidos.classList.add("align-middle");

  const tdDNI = document.createElement("td");
  tdDNI.textContent = dni;
  tdDNI.classList.add("align-middle");

  const tdTelefono = document.createElement("td");
  tdTelefono.textContent = telefono;
  tdTelefono.classList.add("align-middle");

  const tdAsistencia = document.createElement("td");
  tdAsistencia.classList.add("align-middle");

  const btnPresente = document.createElement("button");
  btnPresente.innerHTML = `<i class="bi bi-check"></i>`;
  btnPresente.classList.add("btn", "btn-outline-primary", "btn-sm");
  btnPresente.setAttribute("type", "button");
  btnPresente.addEventListener("click", function () {
    this.textContent = "Presente";
    this.classList.remove("btn-outline-primary");
    this.classList.add("btn-success", "fw-bold");
    this.disabled = true;
  });

  const btnEliminar = document.createElement("button");
  btnEliminar.innerHTML = `<i class="bi bi-trash"></i>`;
  btnEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
  btnEliminar.setAttribute("type", "button");
  btnEliminar.addEventListener("click", async function () {
    if (confirm("¿Seguro que quieres eliminar este alumno?")) {
      try {
        await deleteDoc(doc(db, "alumnos", id));
        fila.remove();
        console.log("Alumno eliminado.");
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  });

  tdAsistencia.appendChild(btnPresente);
  tdAsistencia.appendChild(btnEliminar);

  fila.appendChild(tdAvatar);
  fila.appendChild(tdNombre);
  fila.appendChild(tdApellidos);
  fila.appendChild(tdDNI);
  fila.appendChild(tdTelefono);
  fila.appendChild(tdAsistencia);

  tablaAlumnos.appendChild(fila);
}
