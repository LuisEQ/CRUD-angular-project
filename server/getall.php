<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "bd.php";
$sentencia = $bd->query("select id, name, email, password, pin from users");
$users = $sentencia->fetchAll(PDO::FETCH_OBJ);
echo json_encode($users);