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
$email = mysqli_real_escape_string($connection, $_POST['email']);
$genre = mysqli_real_escape_string($connection, $_POST['genre']);

//Below code gets the users id from the users email address.
$sql = "SELECT id FROM users WHERE email = '$email'";
$user = $connection->query($sql);
$array = $user->fetch_array(MYSQLI_ASSOC);
$id = $array['id'];

//Below code gets genre id from genre name
$sql = "SELECT id FROM genres WHERE name = '$genre'";
$genre = $connection->query($sql);
$genreArray = $genre->fetch_array(MYSQLI_ASSOC);
$genreId = $genreArray['id'];

$sql = "INSERT into user_genres (user_id, genre_id) VALUES ('$id', '$genreId')";
if ($connection->query($sql) === TRUE) {
    echo "Genre added correctly";
} 

?>