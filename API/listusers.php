<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

$sql = "SELECT * FROM users";
$users = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $users->fetch_array(MYSQLI_ASSOC);
var_dump($array);