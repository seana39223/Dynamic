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
$eventId = mysqli_real_escape_string($connection, $_POST['event_id']);
$sql = "SELECT id from users WHERE email = '$email'";
$userId = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $userId->fetch_array(MYSQLI_ASSOC);
$userId = $array['id'];
$sql = "SELECT * from event_fav WHERE user_id = '$userId' AND event_id = '$eventId'";
$fav = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $fav->fetch_array(MYSQLI_ASSOC);
if ($array===null) {
    print json_encode("This is not already a fav.");
}

else {
    print json_encode("This is already a fav.");
}
?>



