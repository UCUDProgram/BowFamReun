<?php

$payload = json_decode(file_get_contents('php://input'));
if (isset($payload->password)){
$password = $payload->password;
}

$result = true;
$message = "";
$pspell_link = pspell_new("en");

if (pspell_check($pspell_link, $password)) {
    $result = false;
} 

if ($result){
    // Check the database for the Password
    $dbhandle = new PDO("sqlite:badPasswords.sqlite") or die("Failed to open DB");
         if (!$dbhandle) die ($error);
    $query = "SELECT word FROM Passwords WHERE word='$password'";
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $user_result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if(sizeof($user_result) != 0){
        $result = false;
    }
}

if ($result == false){
    $message = "Your password is weak, Try a different Password";
} else {
    $message = "Your password is accepable";
}

$results = array("response"=>$result, "message"=>$message);

//this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser
    echo json_encode($results);
?>