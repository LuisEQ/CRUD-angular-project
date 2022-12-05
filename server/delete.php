<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
$metodo = $_SERVER["REQUEST_METHOD"];
if ($metodo != "DELETE" && $metodo != "OPTIONS") {
    exit("Solo se permite método DELETE");
}

if (empty($_GET["idUser"])) {
    exit("No hay id de usuario para eliminar");
}
$idUser = $_GET["idUser"];
$bd = include_once "bd.php";
$sentencia = $bd->prepare("DELETE FROM users WHERE id = ?");
$resultado = $sentencia->execute([$idUser]);
echo json_encode($resultado);