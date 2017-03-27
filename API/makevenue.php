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
$postcode = mysqli_real_escape_string($connection, $_POST['postcode']);
$name = mysqli_real_escape_string($connection, $_POST['name']);
$first_line = mysqli_real_escape_string($connection, $_POST['first_line']);
$second_line = mysqli_real_escape_string($connection, $_POST['second_line']);
$city = mysqli_real_escape_string($connection, $_POST['city']);
$postcode = mysqli_real_escape_string($connection, $_POST['postcode']);

//Gets venue owner's id from the email.
$sql = "SELECT id FROM users WHERE email = '$email'";
$user = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $user->fetch_array(MYSQLI_ASSOC);
$venue_owner_id = $array['id'];

//Actually adds the venue to the database.
$sql = "INSERT into venue (venue_owner_id, name, first_line, second_line, city, postcode) 
VALUES('$venue_owner_id', '$name' '$event_name', '$first_line', '$second_line', '$city', '$postcode')";

if ($connection->query($sql) === TRUE) {
    echo "Venue created succesfully";
} 
else {
    echo "Error: " . $sql . "</br>" . $conn->error;
}