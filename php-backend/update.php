<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
    
  // Sanitize.
  $CardID    = mysqli_real_escape_string($con, (int)$request->data->CardID);
  $BoardID = mysqli_real_escape_string($con, trim($request->data->BoardID));
  $Title = mysqli_real_escape_string($con, (int)$request->data->Title);
  $ColoumnName = mysqli_real_escape_string($con, (int)$request->data->ColoumnName);

  // Update.
  $sql = "UPDATE `CARDS` SET `ColoumnName`='$ColoumnName' WHERE `BoardID` = '{$BoardID}', `CardID` = '{$CardID}',  LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}

?>