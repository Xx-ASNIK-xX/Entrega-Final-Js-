let intentosFallidos = 0; // Variable para contar los intentos fallidos de inicio de sesión

// Función para validar el inicio de sesión
function validarLogin(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Obtener el usuario almacenado en localStorage
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
        const usuario = JSON.parse(storedUser);
        if (usuario.username === loginUsername && usuario.password === loginPassword) {
            alert('¡Inicio de sesión exitoso!');
            // Redirigir a la página de perfil o cualquier otra página después del login exitoso
            window.location.href = '../pages/carrito.html';
        } else {
            intentosFallidos++; // Incrementar el contador de intentos fallidos
            if (intentosFallidos >= 3) {
                alert('Inicio de sesión incorrecto. Ha superado el número máximo de intentos.');
                // Redirigir a otra página después de superar el número máximo de intentos
                window.location.href = '../index.html';
            } else {
                alert('Nombre de usuario o contraseña incorrectos. Intento ' + intentosFallidos + ' de 3.');
            }
        }
    } else {
        alert('No hay ningún usuario registrado. Por favor, regístrate primero.');
        // Redirigir a la página de registro si no hay usuarios registrados
        window.location.href = '../index.html';
    }

    // Limpiar el formulario de login
    document.getElementById('loginForm').reset();
}

// Agregar evento submit al formulario
document.getElementById('loginForm').addEventListener('submit', validarLogin);