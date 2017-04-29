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
$dName = $_POST['dName'];
$bio = mysqli_real_escape_string($connection, $_POST['bio']);
$sql = "UPDATE users SET bio = '$bio' WHERE displayname = '$dName' ";

if ($connection->query($sql) === TRUE) {
    echo "Bio updated";
} 
else {
    echo "Error: " . $sql . "</br>" . $conn->error;
}
?>