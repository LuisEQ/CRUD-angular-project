<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    exit("Solo acepto peticiones PUT");
}
$jsonUser = json_decode(file_get_contents("php://input"));
if (!$jsonUser) {
    exit("No hay datos");
}
$bd = include_once "bd.php";
$sentencia = $bd->prepare("UPDATE users SET name = ?, email = ?, password = ?, pin = ? WHERE id = ?");
$resultado = $sentencia->execute([$jsonUser->name, $jsonUser->email, $jsonUser->password, $jsonUser->pin, $jsonUser->id]);
echo json_encode($resultado);