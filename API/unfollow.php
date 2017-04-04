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
$following = mysqli_real_escape_string($connection, $_POST['followid']);
$sql = "SELECT id FROM users WHERE email = '$email'";
$user = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $user->fetch_array(MYSQLI_ASSOC);
$id = $array['id'];

$feeds = array();
$sql = "DELETE FROM following WHERE user_id = '$id' and following_id = '$following'";
if ($connection->query($sql) === TRUE) {
    echo "Unfollowed";
} 
else {
    echo "Error: " . $sql . "</br>" . $conn->error;
}

