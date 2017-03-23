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

//Below code gets the users id from the users email address.
$email = mysqli_real_escape_string($connection, $_POST['email']);
$event_name = mysqli_real_escape_string($connection, $_POST['event_name']);
$postcode = mysqli_real_escape_string($connection, $_POST['postcode']);
$genre = mysqli_real_escape_string($connection, $_POST['genre']);

//Gets venue owner's id from the email.
$sql = "SELECT id FROM users WHERE email = '$email'";
$user = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $user->fetch_array(MYSQLI_ASSOC);
$venue_owner_id = $array['id'];

//Gets genre's id from the name.
$sql = "SELECT id FROM genres WHERE name = '$genre'";
$genre = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $genre->fetch_array(MYSQLI_ASSOC);
$genre_id = $array['id'];

//Actually adds the event to the database.
$sql = "INSERT into events (venue_owner_id, event_name, postcode, genre_id) 
VALUES('$venue_owner_id', '$event_name', '$postcode', '$genre_id')";

if ($connection->query($sql) === TRUE) {
    echo "Event created succesfully";
} 
else {
    echo "Error: " . $sql . "</br>" . $conn->error;
}