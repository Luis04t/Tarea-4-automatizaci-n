// Seleccionar elementos del DOM
const visitaForm = document.getElementById('visitaForm');
const visitaIdInput = document.getElementById('visitaId');
const nombreInput = document.getElementById('nombre');
const empresaInput = document.getElementById('empresa');
const visitasTablaBody = document.querySelector('#visitasTabla tbody');
const btnGuardar = document.getElementById('btnGuardar');

// Array para almacenar las visitas
let visitas = JSON.parse(localStorage.getItem('visitas')) || [];

// Función para renderizar las visitas en la tabla
function renderVisitas() {
    visitasTablaBody.innerHTML = '';
    visitas.forEach(visita => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${visita.nombre}</td>
            <td>${visita.empresa}</td>
            <td>${visita.fecha}</td>
            <td class="acciones">
                <button onclick="editarVisita('${visita.id}')">Editar</button>
                <button onclick="eliminarVisita('${visita.id}')">Eliminar</button>
            </td>
        `;
        visitasTablaBody.appendChild(tr);
    });
}

// Función para agregar o actualizar una visita
visitaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const empresa = empresaInput.value.trim();
    const id = visitaIdInput.value;

    if (nombre === '') {
        alert('El nombre del visitante es obligatorio.');
        return;
    }

    if (id) {
        // Actualizar visita (Update)
        const index = visitas.findIndex(visita => visita.id === id);
        if (index !== -1) {
            visitas[index].nombre = nombre;
            visitas[index].empresa = empresa;
        }
    } else {
        // Crear nueva visita (Create)
        const nuevaVisita = {
            id: Date.now().toString(), // ID único
            nombre,
            empresa,
            fecha: new Date().toLocaleString()
        };
        visitas.push(nuevaVisita);
    }

    // Guardar en localStorage
    localStorage.setItem('visitas', JSON.stringify(visitas));
    
    // Limpiar formulario y renderizar
    visitaForm.reset();
    visitaIdInput.value = '';
    btnGuardar.textContent = 'Guardar Visita';
    renderVisitas();
});

// Función para editar una visita (Read para poblar el formulario)
function editarVisita(id) {
    const visita = visitas.find(v => v.id === id);
    if (visita) {
        visitaIdInput.value = visita.id;
        nombreInput.value = visita.nombre;
        empresaInput.value = visita.empresa;
        btnGuardar.textContent = 'Actualizar Visita';
    }
}

// Función para eliminar una visita (Delete)
function eliminarVisita(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta visita?')) {
        visitas = visitas.filter(visita => visita.id !== id);
        localStorage.setItem('visitas', JSON.stringify(visitas));
        renderVisitas();
    }
}

// Inicializar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', renderVisitas);

//file:///C:/Users/HP/Desktop/Tarea4/index.html