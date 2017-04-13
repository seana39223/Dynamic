<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

$sql = "SELECT * FROM users where type = 1";
$users = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$rows = array();
while($user = mysqli_fetch_assoc($users)) {
    $rows[] = $user;
}
print json_encode($rows);