<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include "config.php";
$connection = new mysqli($server, $dbuser, $dbpass, $dbname);
if ($connection->connect_error) {
    die ("Connection to the database failed." . $connection->connect_error);
}

$sql = "SELECT name FROM genres";
$genres = $connection->query($sql);
$genresArray = array();
foreach ($genres as $genre) {
  $genresArray[] = $genre['name'];
}
echo json_encode($genresArray);
