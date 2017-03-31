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

$email = $_POST['email'];
$sql = "SELECT postcode FROM users WHERE email = '$email'";
$postcode = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $postcode->fetch_array(MYSQLI_ASSOC);
$postcode = $array['postcode'];
echo $postcode;
?>