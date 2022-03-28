<?php

require 'connect.php'; 

define('BOARD_NAME', "BoardName");
define('BOARD_ID', 'BoardID');

// Get the posted data.
$postdata = file_get_contents("php://input");

$cards = []; 
$cr = 0;

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Store.
  if($request != null){

    // -------------- SQL Prepared Statements --------------
    
    $cards = [];
    $sql = $con->prepare("SELECT BoardID FROM BOARDS WHERE BoardName = ?");
    $sql->bind_param("s", $request->{"data"});

    if($sql->execute()){
    
    // -------------- SQL Prepared Statements --------------

        if($result = $sql->get_result())
        {
            http_response_code(201);

            // add the data to the varible that will be returned to the http request
            $row = mysqli_fetch_assoc($result);

            $cards[$cr] = $row;

            // return data
            echo json_encode(['data'=>$cards]);
        } else {
            http_response_code(422);
        }
    }
    
  } else {

    // return data
    echo json_encode(['data'=>$cards]);
  }

}

?>