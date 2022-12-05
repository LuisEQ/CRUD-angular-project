<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
if (empty($_GET["idUser"])) {
    exit("No hay id de usuario");
}
$idUser = $_GET["idUser"];
$bd = include_once "bd.php";
$sentencia = $bd->prepare("select id, name, email, password, pin from users where id = ?");
$sentencia->execute([$idUser]);
$user = $sentencia->fetchObject();
echo json_encode($user);