document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        // Validación simple: usuario 'admin', contraseña '1234'
        if (usuario === 'admin' && contrasena === '1234') {
            // Guardar token en localStorage para simular sesión iniciada
            localStorage.setItem('isAuthenticated', 'true');
            // Redirigir a la página principal
            window.location.href = 'index.html';
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });
});