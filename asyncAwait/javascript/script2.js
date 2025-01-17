// Simula la obtención de usuarios con una Promise
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('No se pudo obtener los usuarios');
        }
        const data = await response.json();
        return data;  // Retorna la lista de usuarios
    } catch (error) {
        throw new Error(error.message); // Captura errores de la API
    }
}

// Función para mostrar los usuarios en el select
function displayUsers(users) {
    const userSelect = document.getElementById('userSelect');
    userSelect.innerHTML = '<option value="">Selecciona un usuario</option>'; // Limpiar y agregar la opción predeterminada

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });

    userSelect.disabled = false; // Habilitar el select después de cargar los usuarios
}

// Función para mostrar el mensaje de error
function showError(error) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = error;
}

// Función para mostrar la tarjeta de un usuario
async function displayUserCard(userId) {
    try {
        // Obtener los datos del usuario desde la API
        const response = await fetch (`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
h
        // Obtener el contenedor de tarjetas
        const userCardsContainer = document.getElementById('userCards');
        
        // Limpiar cualquier tarjeta existente antes de agregar la nueva
        userCardsContainer.innerHTML = ''; // Elimina cualquier tarjeta anterior

        // Crear la tarjeta con los datos del usuario
        const userCard = document.createElement('div');
        userCard.classList.add('card');

        userCard.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Ciudad:</strong> ${data.address.city}</p>
        `;

        // Agregar la tarjeta al contenedor
        userCardsContainer.appendChild(userCard);
    } catch (error) {
        showError('Error al cargar los datos del usuario');
    }
}

// Función asíncrona para cargar los usuarios
async function loadUsers() {
    const userSelect = document.getElementById('userSelect');
    userSelect.disabled = true; // Deshabilitar el select mientras se cargan los usuarios
    userSelect.innerHTML = '<option value="">Cargando usuarios...</option>';
    document.getElementById('errorMessage').textContent = '';

    try {
        const users = await fetchUsers(); // Espera a que se resuelva la Promise
        displayUsers(users); // Muestra los usuarios si la Promise se resuelve
    } catch (error) {
        showError(error.message); // Muestra el error si la Promise es rechazada
    }
}

// Evento del botón para cargar usuarios
document.getElementById('loadButton').addEventListener('click', loadUsers);

// Evento del select para mostrar la tarjeta del usuario seleccionado
document.getElementById('userSelect').addEventListener('change', function() {
    const selectedUserId = this.value;
    if (selectedUserId) {
        displayUserCard(selectedUserId); // Muestra la tarjeta del usuario seleccionado
    }
});