<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
$jsonProduct = json_decode(file_get_contents("php://input"));
if (!$jsonProduct) {
    exit("No hay datos");
}
$bd = include_once "bd.php";
$sentencia = $bd->prepare("insert into products(name, baseprice, publicprice, stock) values (?,?,?,?)");
$resultado = $sentencia->execute([$jsonProduct->name, $jsonProduct->baseprice, $jsonProduct->publicprice, $jsonProduct->stock]);
echo json_encode([
    "resultado" => $resultado,
]);