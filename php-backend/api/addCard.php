<?php

require 'connect.php'; 

define('CARD_ID', "CardID");
define('BOARD_ID', 'BoardID');
define('TITLE', 'Title');
define('COLUMN_NAME', 'ColoumnName');

// Get the posted data.
$postdata = file_get_contents("php://input");

$cards = []; 
$cr = 0;

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $file = fopen("output.txt", "w");
  if ($request == null){
    fwrite($file, "null");
  }else{
    fwrite($file, $request->{"data"}->{"columnName"});
  }
  fclose($file);
	

  // Validate.
//   if(trim($request->data->model) === '' || (int)$request->data->price < 1)
//   {
//     return http_response_code(400);
//   }
	
  // Sanitize.
//   $model = mysqli_real_escape_string($con, trim($request->data->model));
//   $price = mysqli_real_escape_string($con, (int)$request->data->price);
    

  // Store.
  if($request != null){

    $sqlInsert = $con->prepare("INSERT INTO `kanban_db`.`Cards` (`BoardID`, `Title`, `ColoumnName`) VALUES ( ?, ?, ?)");
    $sqlInsert->bind_param("iss", $request->{"data"}->{"boardId"}, $request->{"data"}->{"title"}, $request->{"data"}->{"columnName"} );

    if($sqlInsert->execute()){

      $sql = "SELECT * FROM CARDS WHERE Title = \"" . $request->{"data"}->{"title"} ."\" AND ColoumnName = \"" . $request->{"data"}->{"columnName"} . "\"";
      if($result = mysqli_query($con,$sql))
      {
        http_response_code(201);

        $row = mysqli_fetch_assoc($result);
        $cards[$cr][CARD_ID] = $row[CARD_ID];
        $cards[$cr][BOARD_ID] = $row[BOARD_ID];
        $cards[$cr][TITLE] = $row[TITLE];
        $cards[$cr][COLUMN_NAME] = $row[COLUMN_NAME];
        echo json_encode(['data'=>$cards]);
      }
      
      else
      {
        http_response_code(422);
      }
    }
  } else {
    echo json_encode(['data'=>$cards]);
  }

}

?>