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
$sql = "SELECT id FROM users WHERE email = '$email'";
$user = $connection->query($sql);
$array = $user->fetch_array(MYSQLI_ASSOC);
$id = $array['id'];

//Below code works out which users they are following.
$feeds = array();
$sql = "SELECT following_id FROM following WHERE user_id = '$id'";
$following = $connection->query($sql);
//Below loops through all the users which are being followed by the initial user.
while($row = mysqli_fetch_assoc($following)) {
	$followingId = $row['following_id'];
	$sql = "SELECT * FROM feed WHERE user_id = '$followingId'";
	$feed = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
	$feed = mysqli_fetch_assoc($feed);
	if ($feed!=NULL) {
		$id = $feed['user_id'];
		var_dump($id);
		$sql = "SELECT displayname FROM users WHERE id = '$id'";
		$displayName = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
		$displayName = mysqli_fetch_assoc($displayName);
		$displayName = $displayName['displayname'];
		$individualFeed = array (
			'text' => $feed['text'],
			'user_id' => $feed['user_id'],
			'display_name' => $displayName
			);
		array_push ($feeds, $individualFeed);

	}
}
echo json_encode($feeds);