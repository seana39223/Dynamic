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

//Gets user id from email.
$email = mysqli_real_escape_string($connection, $_POST['email']);
$sql = "SELECT id FROM users WHERE email = '$email'";
$user = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $user->fetch_array(MYSQLI_ASSOC);
$venue_owner_id = $array['id'];
var_dump($venue_owner_id);
die();
//Gets the venues this user owns.
$sql = "SELECT name FROM VENUE where venue_owner_id = '$venue_owner_id'";
$venues = $connection->query($sql);
$venuesArray = array();
foreach ($venues as $venue) {
  $genresArray[] = $venue['name'];
}
echo json_encode($venuesArray);