// Simula la obtención de datos de usuarios con una Promise
async function fetchUsers() {
  document.getElementById('errorMessage').textContent='';
  document.getElementById('errorMessage').textContent='Cargando...';

    // Simulamos una operación asíncrona con setTimeout
    try{
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
      const usuarios = await respuesta.json();
      //return usuarios;
      document.getElementById('errorMessage').textContent='Consulta exitosa';

      displayUsers(usuarios); // Muestra los usuarios si la Promise se resuelve

    }
    catch(error){
      console.log("Sucedio un error con la API"+ error) ;
    }
}

async function fetchUsers22() {
  document.getElementById('errorMessage').textContent='Cargando...';

  try {
    const users = await fetchUsers2(); // Espera a que se resuelva la Promise
    document.getElementById('errorMessage').textContent='Consulta exitosa';

    displayUsers2(users); // Muestra los usuarios si la Promise se resuelve
  } catch (error) {
    showError(error); // Muestra el error si la Promise es rechazada
  }
  
}

// Función para mostrar los usuarios en la página
function displayUsers(users) {
  const userSelect = document.getElementById('userSelect');
  userSelect.innerHTML = ''; // Limpia la lista antes de agregar los usuarios
  const defaulOption=document.createElement('option');
  defaulOption.textContent='Selecciona un usuario';
  defaulOption.value='';
  defaulOption.disabled=true;
  defaulOption.selected=true;
  userSelect.appendChild(defaulOption);
  users.forEach(user => {
    const option=document.createElement('option');
    option.value=user.id;
    option.textContent=user.name;
    userSelect.appendChild(option);
  });
}

function displayUsers2(users){
  userSelect.innerHTML = ''; // Limpia la lista antes de agregar los usuarios
  const salida2=document.getElementById('salida2');
  users.forEach(user => {
    const option=document.createElement('option');
    option.value=user.id;
    option.textContent=user.name;
    userSelect.appendChild(option);
  });
  salida2.textContent='Concluyo tarea';
}

// Función para mostrar el mensaje de error
function showError(error) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = error;
}

function fetchUsers2() {
  return new Promise((resolve, reject) => {
    // Simulamos una operación asíncrona con setTimeout
    
    setTimeout(() => {
      const success = true; // Cambia a false para simular un error
      if (success) {
        resolve([
          { id: 1, name: 'Juan Pérez', correo:"c1" },
          { id: 2, name: 'María López', correo:"c2" },
          { id: 3, name: 'Carlos García' , correo:"c3"},
          { id: 4, name: 'Sergio Aguilar', correo:"c4" }
        ]);
        } else {
                reject('Error al cargar los usuarios');
              }
            }, 10000); // Simulamos un retraso de 2 segundos
        
            
          });
        }

// Función asíncrona para cargar los usuarios

// Evento del botón para cargar usuarios
document.getElementById('loadButton').addEventListener('click', fetchUsers);
document.getElementById('loadButton2').addEventListener('click', fetchUsers22);
