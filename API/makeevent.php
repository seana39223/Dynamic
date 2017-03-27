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
$genre = mysqli_real_escape_string($connection, $_POST['genre']);
$event_name = mysqli_real_escape_string($connection, $_POST['event_name']);
$venue = mysqli_real_escape_string($connection, $_POST['venue']);
$date = mysqli_real_escape_string($connection, $_POST['date']);
$start_time = mysqli_real_escape_string($connection, $_POST['start_time']);
$end_time = mysqli_real_escape_string($connection, $_POST['end_time']);


//Gets venue's id from the email.
$sql = "SELECT venue_id FROM venue WHERE name = '$venue'";
$venue = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $venue->fetch_array(MYSQLI_ASSOC);
$venue_id = $array['venue_id'];

//Gets genre's id from the name.
$sql = "SELECT id FROM genres WHERE name = '$genre'";
$genre = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $genre->fetch_array(MYSQLI_ASSOC);
$genre_id = $array['id'];

//Actually adds the event to the database.
$sql = "INSERT into events (venue_id, event_name, genre_id, date, start_time, end_time) 
VALUES('$venue_id', '$event_name', '$genre_id', '$date', '$start_time', '$end_time')";

if ($connection->query($sql) === TRUE) {
    echo "Event created succesfully";
} 
else {
    echo "Error: " . $sql . "</br>" . $conn->error;
}