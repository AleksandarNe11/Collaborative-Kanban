<?php

require 'connect.php'; 

define('CARD_ID', "CardID");
define('BOARD_ID', 'BoardID');
define('TITLE', 'Title');
define('COLUMN_NAME', 'ColumnName');

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

    $sqlInsert = $con->prepare("INSERT INTO `kanban_db`.`Cards` (`BoardID`, `Title`, `ColumnName`) VALUES ( ?, ?, ?)");
    $sqlInsert->bind_param("iss", $request->{"data"}->{"BoardID"}, $request->{"data"}->{"Title"}, $request->{"data"}->{"ColumnName"} );

    if($sqlInsert->execute()){
    
      $sql = $con->prepare("SELECT * FROM CARDS WHERE Title = ? AND ColumnName = ?");
      $sql->bind_param("ss", $request->{"data"}->{"Title"}, $request->{"data"}->{"ColumnName"});

      if($sql->execute()){
      
    // -------------- SQL Prepared Statements --------------

        if($result = $sql->get_result())
        {
          http_response_code(201);

          // add the data to the varible that will be returned to the http request
          $row = mysqli_fetch_assoc($result);

          $cards[$cr][CARD_ID] = $row[CARD_ID];
          $cards[$cr][BOARD_ID] = $row[BOARD_ID];
          $cards[$cr][TITLE] = $row[TITLE];
          $cards[$cr][COLUMN_NAME] = $row[COLUMN_NAME];

          // return data
          echo json_encode(['data'=>$cards]);
        }
        
        else
        {
          http_response_code(422);
        }
      }
    }
  } else {

    // return data
    echo json_encode(['data'=>$cards]);
  }

}

?>