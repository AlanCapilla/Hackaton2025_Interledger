   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NÜBÜK</title>

    <!-- Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Tu CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-options-us"> 
                <label>Hola, Usuario</label>
                <button class="profile-btn" aria-label="Perfil de usuario"></button>
            </div>
            <div class="content">
                <h1>NÜBÜK</h1>
            </div>
            <div class="header-options-noti">
                <button id="notiBtn" class="notifications-btn has-notifications" aria-label="Notificaciones">
                    <i class="fas fa-bell"></i>
                    <span class="notification-badge">3</span>
                </button>
            </div>
        </div>
    </div>

    <div class="body">
        <!-- Flex container botones -->
        <div class="flex-container">
            <button id="cobrarBtn" class="checkout-btn">
                <img src="img/contract_2695317.png" alt="cobrar.png" class="icon" style="width: 120px;">
                Cobrar
            </button>
            <button id="pagarBtn" class="pay-btn">
                <img src="img/money_2418524.png" alt="" class="icon" style="width: 120px;">
                Pagar
            </button>
        </div>

        <!-- Formulario dinámico -->
        <div id="formContainer" style="margin-top: 20px; display: none; flex-direction: column; align-items: center; gap: 10px;">
            <input type="number" id="fromId" placeholder="Tu ID" style="padding:10px; border-radius:8px; border:none; width:80%;">
            <input type="number" id="toId" placeholder="ID destinatario" style="padding:10px; border-radius:8px; border:none; width:80%;">
            <input type="number" id="amount" placeholder="Monto" style="padding:10px; border-radius:8px; border:none; width:80%;">
            <button id="sendBtn" style="width: 50%; padding: 10px; border-radius:8px; cursor:pointer;">Enviar</button>
            <div id="msg" style="color:white; margin-top:10px;"></div>
        </div>

        <!-- Contenedor de balances -->
        <div id="usersContainer" style="margin-top:30px; text-align:center; color:white; font-size:1.2rem;"></div>
    </div>

    <div class="foot">
        <div class="contenedor"></div>
    </div>

    <!-- Script para notificaciones y botones -->
    <script>
        // Notificaciones
        document.getElementById('notiBtn').addEventListener('click', function() {
            this.classList.remove('has-notifications');
            document.querySelector('.notification-badge').textContent = '0';
        });

        // Formulario dinámico
        const cobrarBtn = document.getElementById('cobrarBtn');
        const pagarBtn = document.getElementById('pagarBtn');
        const formContainer = document.getElementById('formContainer');
        const sendBtn = document.getElementById('sendBtn');
        const msg = document.getElementById('msg');
        let currentAction = ''; // "cobrar" o "pagar"

        cobrarBtn.addEventListener('click', () => {
            formContainer.style.display = 'flex';
            currentAction = 'cobrar';
        });

        pagarBtn.addEventListener('click', () => {
            formContainer.style.display = 'flex';
            currentAction = 'pagar';
        });

        sendBtn.addEventListener('click', async () => {
            const fromId = parseInt(document.getElementById('fromId').value);
            const toId = parseInt(document.getElementById('toId').value);
            const amount = parseFloat(document.getElementById('amount').value);

            if(isNaN(fromId) || isNaN(toId) || isNaN(amount)) {
                msg.textContent = 'Por favor completa todos los campos';
                return;
            }

            try {
                const res = await fetch('http://localhost:3000/pay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fromId, toId, amount })
                });
                const data = await res.json();
                msg.textContent = data.success ? `${currentAction.toUpperCase()} exitoso: ${amount}` : data.error;
            } catch(err) {
                msg.textContent = 'Error al conectar con el servidor';
                console.error(err);
            }
        });
    </script>
</body>
</html>
