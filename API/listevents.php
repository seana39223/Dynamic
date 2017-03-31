<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}
$lat = mysqli_escape_string($_POST['lat']);
$long = mysqli_escape_string($_POST['long']);
$sql = "SELECT * FROM events ORDER by date";
$events = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$rows = array();
while($event = mysqli_fetch_assoc($events)) {
    $rows[] = $event;
}
print json_encode($rows);	