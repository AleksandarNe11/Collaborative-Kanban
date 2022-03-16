<?php

require 'connect.php'; 
// $data = $_POST;
// $file = fopen("output.txt", "w");
// fwrite($file, "out");
// foreach($data as $key) {
//     fwrite($file, "in");
//     fwrite($file, $key);
// }

// fclose($file);

define('CARD_ID', "CardID");
define('BOARD_ID', 'BoardID');
define('TITLE', 'Title');
define('COLUMN_NAME', 'ColoumnName');

// Get the posted data.
$postdata = file_get_contents("php://input");

$cards = []; 

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
//   if(trim($request->data->model) === '' || (int)$request->data->price < 1)
//   {
//     return http_response_code(400);
//   }
	
  // Sanitize.
//   $model = mysqli_real_escape_string($con, trim($request->data->model));
//   $price = mysqli_real_escape_string($con, (int)$request->data->price);
    

  // Store.
  $sql = "SELECT * FROM CARDS";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    // $car = [
    //   'model' => $model,
    //   'price' => $price,
    //   'id'    => mysqli_insert_id($con)
    // ];
    echo json_encode(['data'=>$card]);
  }
  
  else
  {
    http_response_code(422);
  }
}

?>