¿Cuál es el problema?
El aislamiento financiero de los vendedores artesanales, quienes no cuentan con acceso fácil a medios de pago digitales. Esto les genera pérdidas monetarias y limita sus oportunidades de venta, especialmente con compradores extranjeros.

📌 ¿Qué tecnología usarán?
Lenguajes: JavaScript, HTML, CSS
Backend: Node.js
API principal: Open Payments (Interledger)
Posibles mejoras futuras: React para mejorar la experiencia de usuario.

📌 ¿Cuál es la solución?

La creación de una app sencilla y fácil de usar, donde los vendedores podrán:

Ingresar el monto total de su venta en su moneda local.

La app realizará la conversión automática a la moneda del comprador.

Se generará un link de pago seguro, que los compradores introducirán en su dispositivo móvil, dentro de la misma app, para concretar la transacción.

📌 ¿Cuáles son los beneficios?

Escalabilidad: la app puede crecer y añadir nuevas funciones con el tiempo.

Inclusión financiera: abre las puertas a comunidades artesanales, ayudando a superar el aislamiento financiero.

Sencillez y usabilidad: pensada para que cualquier vendedor pueda usarla sin conocimientos técnicos.

Seguridad: basada en el estándar abierto de Interledger para transacciones confiables.

📌 ¿Cuál es su arquitectura / stack simple?

Frontend: jQuery Mobile + HTML + CSS (interfaz de usuario).

Backend: Node.js + JavaScript, comunicación mediante JSON.

Base de datos: SQL (para usuarios, wallets y registros de pagos).

API usada: Interledger/Open Payments para la gestión de transacciones.

📌 ¿Qué funciones son indispensables?

Creación de la URL única de cobro para el vendedor.

Registro y vinculación de la wallet del vendedor.

Ejecución del pago seguro por parte del comprador.

📌 ¿Quién será responsable de construir cada parte?

Nuestro equipo consta de 4 integrantes:

Alan (líder): Product Manager.

Atzin: Desarrollador Backend.

Martin: Desarrollador Frontend.

Maritza: Encargada de la documentación y tareas de coordinación.
