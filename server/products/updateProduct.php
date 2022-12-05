<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    exit("Solo acepto peticiones PUT");
}
$jsonProduct = json_decode(file_get_contents("php://input"));
if (!$jsonProduct) {
    exit("No hay datos");
}
$bd = include_once "bd.php";
$sentencia = $bd->prepare("UPDATE products SET name = ?, baseprice = ?, publicprice = ?, stock = ? WHERE id = ?");
$resultado = $sentencia->execute([$jsonProduct->name, $jsonProduct->baseprice, $jsonProduct->publicprice, $jsonProduct->stock, $jsonProduct->id]);
echo json_encode($resultado);