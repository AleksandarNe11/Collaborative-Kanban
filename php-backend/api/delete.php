<?php

require 'connect.php';

// Extract, validate and sanitize the id.
$id = ($_GET['CardID'] !== null && (int)$_GET['CardID'] > 0)? mysqli_real_escape_string($con, (int)$_GET['CardID']) : false;

if(!$id)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `cards` WHERE `CardID` ={$id}";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}

?>