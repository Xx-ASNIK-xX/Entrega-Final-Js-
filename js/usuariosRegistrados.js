// usuarios.js
let usuariosRegistrados = [];

function agregarUsuario(usuario) {
    usuariosRegistrados.push(usuario);
}

function buscarUsuario(username, password) {
    return usuariosRegistrados.find(u => u.username === username && u.password === password);
}

export { usuariosRegistrados, agregarUsuario, buscarUsuario };