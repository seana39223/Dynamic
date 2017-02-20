<?php
//TODO: Update to be much more secure when necessary.
include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

$email = mysqli_real_escape_string($connection, $_POST['email']);
$pass = mysqli_real_escape_string($connection, $_POST['pass']);
$sql = "SELECT password FROM users WHERE email = '$email'";
$user = $connection->query($sql);
$array = $user->fetch_array(MYSQLI_ASSOC);
$correctPassword = $array['password'];

if (password_verify($pass, $correctPassword)) {
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $fullUserInfo = $connection->query($sql);
    var_dump($fullUserInfo);
    $encode = array();
    while($row = mysqli_fetch_assoc($fullUserInfo)) {
        $encode[] = array (
            'firstname' => $row['firstname'],
            'lastname' => $row['lastname'],
            'email' => $row['email']
        );
    }
    echo json_encode($encode);
}

else {
    echo "Password is not correct.";
}

echo json_encode($encode);
$connection->close();

?>

            
        