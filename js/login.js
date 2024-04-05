let intentosFallidos = 0; // Variable para contar los intentos fallidos de inicio de sesión

// Función para validar el inicio de sesión
function validarLogin(event) {
    event.preventDefault();
    console.log('La función validarLogin se está ejecutando correctamente.');

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Obtener el usuario almacenado en localStorage
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
        const usuario = JSON.parse(storedUser);
        if (usuario.username === loginUsername && usuario.password === loginPassword) {
            // Mostrar alerta de inicio de sesión exitoso

            Swal.fire({
                title: "Perfecto!",
                text: "¡Inicio de sesión exitoso!",
                icon: "success"
              }).then(() => {

                // Redirigir a la página de perfil a la pagina carrito después del inicio de sesión exitoso
                window.location.href = './pages/carrito.html';
            });
        } else {
            intentosFallidos++; // Incrementar el contador de intentos fallidos
            if (intentosFallidos >= 3) {
                // Mostrar alerta de intentos fallidos
                Swal.fire('Inicio de sesión incorrecto. Ha superado el número máximo de intentos.').then(() => {
                    // Redirigir a otra página después de superar el número máximo de intentos
                    window.location.href = './pages/registro.html';
                });
            } else {
                // Mostrar alerta de nombre de usuario o contraseña incorrectos
                Swal.fire('Nombre de usuario o contraseña incorrectos. Intento ' + intentosFallidos + ' de 3.');
            }
        }
    } else {
        // Mostrar alerta de usuario no registrado
        Swal.fire('No hay ningún usuario registrado. Por favor, regístrate primero.').then(() => {
            // Redirigir a la página de registro si no hay usuarios registrados
            window.location.href = '../pages/registro.html';
        });
    }

    // Limpiar el formulario de login
    document.getElementById('loginForm').reset();
}

// Agregar evento submit al formulario
document.getElementById('loginForm').addEventListener('submit', validarLogin);