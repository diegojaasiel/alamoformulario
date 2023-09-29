<?php
require 'vendor/autoload.php';

// Configura la API Key de SendGrid
$apiKey = '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';

// Función para enviar el correo
function enviarCorreo() {
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    $nombreEmpresa = $_POST['NombreEmpresa'];
    $idCliente = $_POST['IdCode'];
    $ciudadDestino = $_POST['CiudadDestino'];
    $oficinaDestino = $_POST['OficinaDestino'];
    $fechaHoraEntrega = $_POST['FechaHoraEntrega'];
    $fechaHoraDevolucion = $_POST['FechaHoraDevolucion'];
    $nombreConductor = $_POST['NombreConductor'];
    $conductorAdicional = isset($_POST['ConductorAdicional']) ? "Sí" : "No";
    $categoriaAuto = $_POST['CategoriaAuto'];
    $metodoPago = $_POST['MetodoPago'];
    $garantia = $_POST['Garantia'];

    // Construye el cuerpo del correo
    $mensaje = "
    NOMBRE DE LA EMPRESA: $nombreEmpresa
    ID CLIENTE: $idCliente
    CIUDAD: $ciudadDestino
    OFICINA: $oficinaDestino
    FECHA Y HORA DE ENTREGA: $fechaHoraEntrega
    FECHA Y HORA DE DEVOLUCIÓN: $fechaHoraDevolucion
    NOMBRE DEL CONDUCTOR: $nombreConductor
    CONDUCTOR ADICIONAL: $conductorAdicional
    CATEGORÍA DE AUTO: $categoriaAuto
    MÉTODO DE PAGO: $metodoPago
    GARANTÍA: $garantia
    ";

    // Configura el objeto de correo
    $email = new \SendGrid\Mail\Mail();
    $email->setFrom("diego.grajeda@alamo.com.mx", "Tu Nombre");
    $email->setSubject("Reserva para $nombreEmpresa");
    $email->addTo("diego.jaasiel.grajeda.garcia@gmail.com", "Destinatario");
    $email->addCc("diego.grajeda@alamo.com.mx", "Copia a");

    // Establece el contenido del correo como texto
    $email->addContent(
        "text/plain",
        $mensaje
    );

    // Envía el correo
    $sendgrid = new \SendGrid($apiKey);
    try {
        $response = $sendgrid->send($email);
        if ($response->statusCode() == 202) {
            echo 'Correo enviado con éxito';
        } else {
            echo 'Error al enviar el correo';
        }
    } catch (Exception $e) {
        echo 'Error al enviar el correo: ' . $e->getMessage();
    }
}

// Escucha el envío del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    enviarCorreo();
}
?>