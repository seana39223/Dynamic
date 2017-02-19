<?php
//TODO: Update and add password security.
//Below code is based of code from https://www.w3schools.com/php/php_mysql_insert.asp
include "config.php"
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
	die ("Connection to the database failed." . $connection->connect_error);
}
$firstName = mysqli_real_escape_string($connection, $_GET['firstName']);
$lastName = mysqli_real_escape_string($connection, $_GET['lastName']);
$email = mysqli_real_escape_String($connection, $_GET['email']);
$type = mysqli_real_escape_String($connection, $_GET['type']);

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$sql = "INSERT into users (firstname, lastname, email, type) VALUES ('$firstName', '$lastName', '$email', $type)";
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

			