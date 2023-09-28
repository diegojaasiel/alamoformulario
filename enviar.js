// Importar la biblioteca de SendGrid
const sgMail = require('@sendgrid/mail');

// Configurar la API Key de SendGrid
sgMail.setApiKey('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');

// Obtener el formulario
const formulario = document.getElementById('formularioContacto');

// Manejar la presentación del formulario
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Crear el objeto de correo
    const msg = {
        to: 'diego.jaasiel.grajeda.garcia@gmail.com', // Reemplaza con tu dirección de correo
        from: email,
        subject: 'RESERVA',
        text: `Nombre: ${nombre}\nCorreo Electrónico: ${email}\nMensaje: ${mensaje}`,
    };

    // Enviar el correo
    sgMail.send(msg)
        .then(() => {
            alert('Mensaje enviado con éxito');
            formulario.reset(); // Limpiar el formulario
        })
        .catch((error) => {
            console.error(error);
            alert('Error al enviar el mensaje');
        });
});
