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
$event_name = mysqli_real_escape_string($connection, $_POST['event_name']);
$dName = mysqli_real_escape_string($connection, $_POST['artist']);

//Below code gets the users id from the users email address.
$sql = "SELECT event_id FROM events WHERE event_name = '$event_name'";
$event = $connection->query($sql);
$array = $event->fetch_array(MYSQLI_ASSOC);
$eventId = $array['event_id'];

//Below code artists id

$sql = "SELECT id FROM users WHERE displayname = '$dName'";
$user = $connection->query($sql);
$userArray = $user->fetch_array(MYSQLI_ASSOC);
$userId = $userArray['id'];

$sql = "INSERT into artists_at_events (event_id, artist_id) VALUES ('$eventId', '$userId')";
if ($connection->query($sql) === TRUE) {
    echo "Artist added to event correctly";
} 

?>
