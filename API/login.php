<?php
//TODO: Update to be much more secure when necessary.
include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

$email = mysqli_real_escape_string($connection, $_POST['email']);
$pass = mysqli_real_escape_string($connection, $_POST['pass']);
$sql = "SELECT * FROM users WHERE email = '$email' and password = '$pass'";
$result = $connection->query($sql);

if($result->num_rows==0) {
    die ("Password and username are not correct");
}
else {
    $encode = array();
    while($row = mysqli_fetch_assoc($result)) {
        $encode[] = array (
            'firstname' => $row['firstname'],
            'lastname' => $row['lastname'],
            'email' => $row['email']
        );
    }
}

echo json_encode($encode);
$connection->close();

?>

            
