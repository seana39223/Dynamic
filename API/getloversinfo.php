<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}

$id = $_POST['id'];
$sql = "SELECT * FROM users WHERE id = '$id'";
$userInfo = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $userInfo->fetch_array(MYSQLI_ASSOC);
print json_encode($array);
?>