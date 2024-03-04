// login.js

import { buscarUsuario } from './usuariosRegistrados.js';

let intentosFallidos = 0; // Variable para contar los intentos fallidos de inicio de sesión

function validarLogin(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Buscar el usuario utilizando la función del módulo
    const usuario = buscarUsuario(loginUsername, loginPassword);

    if (usuario) {
        alert('¡Inicio de sesión exitoso!');
        // Redirigir a la página de perfil o cualquier otra página después del login exitoso
        window.location.href = '../pages/carrito.html';
    } else {
        intentosFallidos++; // Incrementar el contador de intentos fallidos
        if (intentosFallidos >= 3) {
            alert('Inicio de sesión incorrecto. Ha superado el número máximo de intentos.');
            // Redirigir a otra página después de superar el número máximo de intentos
            window.location.href = '/index.html';
        } else {
            alert('Nombre de usuario o contraseña incorrectos. Intento ' + intentosFallidos + ' de 3.');
        }
    
    // Buscar el usuario utilizando la función
    const usuario = buscarUsuario(loginUsername, loginPassword);
    }
    
    // Limpiar el formulario de login
    document.getElementById('loginForm').reset();
}

// Agregar evento submit al formulario
document.getElementById('loginForm').addEventListener('submit', validarLogin);