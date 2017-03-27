<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

$sql = "SELECT displayname FROM users WHERE type = 2";
$users = $connection->query($sql);
$usersArray = array();
foreach ($users as $user) {
  $usersArray[] = $user['displayname'];
}
echo json_encode($usersArray);
