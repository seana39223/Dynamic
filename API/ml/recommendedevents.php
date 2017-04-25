<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include "../config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}

$eventsArray = array();
$email = mysqli_real_escape_string($connection, $_POST['email']);
$sql = "SELECT id from users WHERE email = '$email'";
$userId = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$array = $userId->fetch_array(MYSQLI_ASSOC);
$userId = $array['id'];
$sql = "SELECT * from event_fav WHERE user_id = '$userId'";
$eventsSql = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$eventsAttending = array();
while($events = mysqli_fetch_assoc($eventsSql)) {
    $eventsAttending[] = $events;
}

//If the user does not have any events which they are attending it uses the genre to establish which events the user should attend.
if(empty($eventsAttending)) {
    $sql = "SELECT genre_id from user_genres WHERE user_id = '$userId'";
    $genres = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
    foreach ($genres as $genre) {
      $genreIdSql = $genre['genre_id'];
      $sql = "SELECT * from events WHERE genre_id = '$genreIdSql'";
      $events = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
      while($event = mysqli_fetch_assoc($events)) {
          if( in_array( $event ,$eventsArray ) ) {
          }
          else {
              $eventsArray[] = $event;
          }
       }
    }
  print json_encode($eventsArray);
}
else{
  $url = "events.php?id=" . $userId;
  header("Location:" . $url);
}
?>