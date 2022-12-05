<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
$jsonUser = json_decode(file_get_contents("php://input"));
if (!$jsonUser) {
    exit("No hay datos");
}
$bd = include_once "bd.php";
$sentencia = $bd->prepare("insert into users(name, email, password, pin) values (?,?,?,?)");
$resultado = $sentencia->execute([$jsonUser->name, $jsonUser->email, $jsonUser->password, $jsonUser->pin]);
echo json_encode([
    "resultado" => $resultado,
]);