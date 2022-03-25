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

  // --------- Used for test, adds a place to put output when file runs ---------
  // $file = fopen("output.txt", "w");
  // if ($request == null){
  //   fwrite($file, "null");
  // }else{
  //   fwrite($file, $request->{"data"}->{"BoardID"});
  // }
  // fclose($file);
  // ----------------------------------------------------------------------------
	   

  // Store.
  if($request != null){

    // -------------- SQL Prepared Statements --------------
    
    $sql = $con->prepare("SELECT BoardID FROM BOARDS WHERE BoardName = ?");
    $sql->bind_param("s", $request->{"data"});

    if($sql->execute()){
    
    // -------------- SQL Prepared Statements --------------

        if($result = $sql->get_result())
        {
            http_response_code(201);

            // add the data to the varible that will be returned to the http request
            $row = mysqli_fetch_assoc($result);

            $cards[$cr][BOARD_ID] = $row;

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