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

$id = $_POST['id'];
$sql = "SELECT artist_id FROM artists_at_events where event_id = '$id'";

$posts = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$rows = array();
while($post = mysqli_fetch_assoc($posts)) {
    $rows[] = $post;
}
print json_encode($rows);	