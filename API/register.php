<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);

if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

$firstName = mysqli_real_escape_string($connection, $_POST['firstName']);
$lastName = mysqli_real_escape_string($connection, $_POST['lastName']);
$email = mysqli_real_escape_String($connection, $_POST['email']);
$type = mysqli_real_escape_String($connection, $_POST['type']);
$dName = mysqli_real_escape_String($connection, $_POST['dName']);
$password = mysqli_real_escape_String($connection, $_POST['password']);
$password = password_hash($password, PASSWORD_DEFAULT);
$postcode = mysqli_real_escape_String($connection, $_POST['postcode']);
$date = mysqli_real_escape_String($connection, $_POST['date']);

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $sql = "INSERT into users (firstname, lastname, email, type, displayname, password, postcode, picture, date_joined)
    VALUES ('$firstName', '$lastName', '$email', $type, '$dName', '$password', '$postcode', 'http://seananderson.co.uk/api/uploads/generic.png', '$date')";

    if ($connection->query($sql) === TRUE) {
        echo "New user added succesfully";
    } 
    else {
        echo "Error: " . $sql . "</br>" . $conn->error;
    }
}

else {
    echo "Email is not valid";
}

$connection->close();
?>