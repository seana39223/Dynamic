<?php
//Below code is based of code from https://www.w3schools.com/php/php_mysql_insert.asp
include "config.php"
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
	die ("Connection to the database failed." . $connection->connect_error);
}
$email = mysqli_real_escape_string($connection, $_GET['email']);
$pass = mysqli_real_escape_string($connection, $_GET['pass']);
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$sql = "SELECT * FROM users WHERE email = $email and pass = $pass";
    	if ($connection->query($sql) === TRUE) {
       	//TODO: Create object to send back to app.
    } 
    else {
    	echo "Error: " . $sql . "</br>" . $conn->error;
    }
}

else {
    echo "The email provided is not valid.";
}

$connection->close();
?>

			
