// Array para almacenar los usuarios registrados
const usuariosRegistrados = [];

// Función para validar el registro de un usuario
function validarRegistro(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar el correo electrónico
    const emailError = document.getElementById('emailError');
    if (!email || !email.includes('@')) {
        emailError.textContent = 'Por favor, introduce un correo electrónico válido.';
        return;
    } else {
        emailError.textContent = '';
    }

    // Validar el nombre de usuario
    const usernameError = document.getElementById('usernameError');
    if (!username) {
        usernameError.textContent = 'Por favor, introduce un nombre de usuario.';
        return;
    } else {
        usernameError.textContent = '';
    }

    // Validar la contraseña
    const passwordError = document.getElementById('passwordError');
    if (!password || password.length < 6) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        return;
    } else {
        passwordError.textContent = '';
    }

    // Verificar si el usuario ya está registrado
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.username === username);
    if (usuarioExistente) {
        Swal.fire('Error', 'El nombre de usuario ya está en uso. Por favor, elige otro.', 'error');
        return;
    }

    // Crear un objeto usuario con los datos del formulario
    const nuevoUsuario = {
        email: email,
        username: username,
        password: password
    };

    // Almacenar el nuevo usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));

    // Mostrar mensaje de éxito
    Swal.fire('¡Registro exitoso!', 'Ahora puedes iniciar sesión.', 'success').then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            // Limpiar el formulario de registro
            document.getElementById('registroForm').reset();

            // Redirigir a la página de login
            window.location.href = '../index.html';
        }
    });
}
// Agregar evento submit al formulario
document.getElementById('registroForm').addEventListener('submit', validarRegistro);