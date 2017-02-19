<?php
//Below code is based of code from http://www.kodingmadesimple.com/2015/01/convert-mysql-to-json-using-php.html
include "config.php"
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
	die ("Connection to the database failed." . $connection->connect_error);
}
$email = mysqli_real_escape_string($connection, $_GET['email']);
$pass = mysqli_real_escape_string($connection, $_GET['pass']);
$sql = "SELECT * FROM users WHERE email = $email and pass = $pass";
$result = $connection->query($sql);
	
if($result->num_rows==0) {
	die "Password and username are not correct";
}
else {
    $encode = array();
        while($row = mysqli_fetch_assoc($result)) {
        $encode[$row['question _text']][] = $row['answer_text'];
    }
}
echo json_encode($encode);
$connection->close();
?>

			
