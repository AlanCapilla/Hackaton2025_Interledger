document.addEventListener('DOMContentLoaded', () => {
    const cobrarBtn = document.getElementById('cobrarBtn');
    const pagarBtn = document.getElementById('pagarBtn');
    const usersContainer = document.getElementById('usersContainer');
    const notiBtn = document.getElementById('notiBtn');
    const notificationBadge = document.querySelector('.notification-badge');

    const API_URL = 'http://localhost:3000'; // Asegúrate que coincide con tu backend

    // Función para mostrar los usuarios y balances
    async function mostrarUsuarios() {
        try {
            const res = await fetch(`${API_URL}/users`);
            const users = await res.json();

            usersContainer.innerHTML = '';
            users.forEach(u => {
                usersContainer.innerHTML += `<div>${u.id} - ${u.name}: $${u.balance}</div>`;
            });
        } catch (err) {
            usersContainer.innerHTML = 'No se pudo conectar al servidor';
            console.error(err);
        }
    }

    mostrarUsuarios(); // Mostrar al cargar

    // Función para realizar pagos
    async function realizarPago(fromId, toId, amount) {
        try {
            const res = await fetch(`${API_URL}/pay`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fromId, toId, amount })
            });
            const data = await res.json();

            if (data.success) {
                alert(data.message);
                notificationBadge.textContent = parseInt(notificationBadge.textContent) + 1;
                notiBtn.classList.add('has-notifications');
                mostrarUsuarios();
            } else {
                alert(data.error || 'Error en el pago');
            }
        } catch (err) {
            alert('No se pudo conectar al servidor');
            console.error(err);
        }
    }

    // Cobrar botón
    cobrarBtn.addEventListener('click', () => {
        const fromId = parseInt(prompt('ID de quien cobra'));
        const toId = parseInt(prompt('ID de quien paga'));
        const amount = parseFloat(prompt('Monto a cobrar'));

        if (isNaN(fromId) || isNaN(toId) || isNaN(amount)) return alert('Datos inválidos');
        if (fromId === toId) return alert('No puedes enviarte dinero a ti mismo');

        realizarPago(fromId, toId, amount);
    });

    // Pagar botón
    pagarBtn.addEventListener('click', () => {
        const fromId = parseInt(prompt('ID de quien paga'));
        const toId = parseInt(prompt('ID de quien recibe'));
        const amount = parseFloat(prompt('Monto a pagar'));

        if (isNaN(fromId) || isNaN(toId) || isNaN(amount)) return alert('Datos inválidos');
        if (fromId === toId) return alert('No puedes enviarte dinero a ti mismo');

        realizarPago(fromId, toId, amount);
    });

    // Notificaciones
    notiBtn.addEventListener('click', () => {
        alert('¡Tienes nuevas notificaciones!');
        notificationBadge.textContent = '0';
        notiBtn.classList.remove('has-notifications');
    });
});
