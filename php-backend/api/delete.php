<?php

require 'connect.php';

echo "Hello";


$cardid = (int) mysqli_real_escape_string($con, (int)$_GET['id']);

echo "  CardID: " . $cardid;

if(!$cardid)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `cards` WHERE `CardID` = {$cardid}";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}

?>