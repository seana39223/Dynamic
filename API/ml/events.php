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

$id = $_GET['id'];
$sql = "SELECT * from event_fav WHERE user_id = '$id'";
$eventsAttending = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$eventsAttendingArray = array();
while($event = mysqli_fetch_assoc($eventsAttending)) {
    $eventsAttendingArray[] = $event;
}
$eventsAttendingArrayInfo = array();
foreach($eventsAttendingArray as $eventAttending) {
    $id = $eventAttending['event_id'];
    $sql = "SELECT * from events where event_id = '$id'";
    $event = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
    while($eventInfo = mysqli_fetch_assoc($event)) {
            $eventsAttendingArrayInfo[] = $eventInfo;
    }
}

    
$sql = "SELECT * from events";
$allEvents = $connection->query($sql) or trigger_error($mysqli->error."[$sql]");
$allEventsArray = array();
while($event = mysqli_fetch_assoc($allEvents)) {
    $allEventsArray[] = $event;
}
$recommendedEvents = array();
foreach ($allEventsArray as $event) {
    foreach($eventsAttendingArrayInfo as $eventAttending) {
        if (in_array($event, $eventsAttendingArrayInfo)) {
        }
        else {
            if($event['genre_id']==$eventAttending['genre_id']) {
                if($event['event_id']==$eventAttending['event_id']) {
                }
                else{
                    if (!empty($recommendedEvents)) {
                        if (in_array($event, $recommendedEvents)) {
                       }
                        else {
                            $recommendedEvents[] = $event;
                        }
                    }
                    else {
                        $recommendedEvents[] = $event;
                    }
                }
            }
        }
    }
}
print json_encode($recommendedEvents);
?>