<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
if (empty($_GET["idProduct"])) {
    exit("No hay id de producto");
}
$idProduct = $_GET["idProduct"];
$bd = include_once "bd.php";
$sentencia = $bd->prepare("select id, name, baseprice, publicprice, stock from products where id = ?");
$sentencia->execute([$idProduct]);
$product = $sentencia->fetchObject();
echo json_encode($product);