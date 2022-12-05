<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
$metodo = $_SERVER["REQUEST_METHOD"];
if ($metodo != "DELETE" && $metodo != "OPTIONS") {
    exit("Solo se permite método DELETE");
}

if (empty($_GET["idProduct"])) {
    exit("No hay id de producto para eliminar");
}
$idProduct = $_GET["idProduct"];
$bd = include_once "bd.php";
$sentencia = $bd->prepare("DELETE FROM products WHERE id = ?");
$resultado = $sentencia->execute([$idProduct]);
echo json_encode($resultado);