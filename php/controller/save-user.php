<?php

//saying you need info from config file
require_once(__DIR__ . "/../model/config.php");

//5 variables are getting filtered
$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);

//setting the 5 variables where they used to be on your username account
//gonna know your username using $_SESSION["name"] from either creating a user or signing in
$query = $_SESSION["connection"]->query("UPDATE users SET "
	. "exp = $exp, "
	. "exp1 = $exp1, "
	. "exp2 = $exp2, "
	. "exp3 = $exp3, "
	. "exp4 = $exp4 WHERE username = \"" . $_SESSION["name"]. "\"");


//if it works its gonna echo out true
//if not its gonna echo the error
if($query){
	echo "true";
}
else{
	echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
