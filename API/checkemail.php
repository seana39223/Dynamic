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
$sql = "SELECT displayname FROM users WHERE email = '$email'";
$name = $connection->query($sql);
$array = $name->fetch_array(MYSQLI_ASSOC);
$name = $array['displayname'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo "This email is not in a valid format";
}

else if (empty($name)) {
    echo "This email is fine";
}

else {
    echo "This email has already been used";
}
?>