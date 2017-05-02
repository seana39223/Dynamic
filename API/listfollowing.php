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
$sql = "SELECT id from users WHERE email = '$email'";
$userId = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $userId->fetch_array(MYSQLI_ASSOC);
$userId = $array['id'];
$sql = "SELECT * from following WHERE user_id = '$userId'";
$posts = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$rows = array();
while($post = mysqli_fetch_assoc($posts)) {
    $rows[] = $post;
}
print json_encode($rows);