// Importar la biblioteca de SendGrid
const sgMail = require('@sendgrid/mail');

// Configurar la API Key de SendGrid
sgMail.setApiKey('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');

// Función para enviar el correo
function enviarCorreo() {
    const nombreEmpresa = document.getElementById('NombreEmpresa').value;
    const idCliente = document.getElementById('IdCode').value;
    const ciudadDestino = document.getElementById('CiudadDestino').value;
    const oficinaDestino = document.getElementById('OficinaDestino').value;
    const fechaHoraEntrega = document.getElementById('FechaHoraEntrega').value;
    const fechaHoraDevolucion = document.getElementById('FechaHoraDevolucion').value;
    const nombreConductor = document.getElementById('NombreConductor').value;
    const conductorAdicional = document.getElementById('ConductorAdicional').checked ? "Sí" : "No";
    const categoriaAuto = document.getElementById('CategoriaAuto').value;
    const metodoPago = document.getElementById('MetodoPago').value;
    const garantia = document.getElementById('Garantia').value;


    // Construye el cuerpo del correo
    const mensaje = `
    NOMBRE DE LA EMPRESA: ${nombreEmpresa}
    ID CLIENTE: ${idCliente}
    CIUDAD: ${ciudadDestino}
    OFICINA: ${oficinaDestino}
    FECHA Y HORA DE ENTREGA: ${fechaHoraEntrega}
    FECHA Y HORA DE DEVOLUCIÓN: ${fechaHoraDevolucion}
    NOMBRE DEL CONDUCTOR: ${nombreConductor}
    CONDUCTOR ADICIONAL: ${conductorAdicional}
    CATEGORÍA DE AUTO: ${categoriaAuto}
    MÉTODO DE PAGO: ${metodoPago}
    GARANTÍA: ${garantia}
    `;

    // Configura el objeto de correo
    const msg = {
        to: 'diego.jaasiel.grajeda.garcia@gmail.com', // Dirección de correo de destino
        cc: 'diego.grajeda@alamo.com.mx', // Copia a la dirección de correo
        from: 'diego.grajeda@alamo.com.mx', // Cambia esto a tu dirección de correo
        subject: `Reserva para ${nombreEmpresa}`,
        text: mensaje,
    };

    // Envía el correo
    sgMail.send(msg)
        .then(() => {
            alert('Correo enviado con éxito');
        })
        .catch((error) => {
            console.error(error);
            alert('Error al enviar el correo');
        });
}

// Escucha el envío del formulario
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formularioAlquiler');
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        enviarCorreo(formulario);
    });
});
