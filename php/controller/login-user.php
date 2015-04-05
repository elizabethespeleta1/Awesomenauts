<?php
	//need to require the config file because thats where the database object is made 
	require_once(__DIR__ . "/../model/config.php");

	//array is a series of objects 
	//this is an array
	$ajax = array(
		'exp' => '',
		'exp1' => '',
		'exp2' => '',
		'exp3' => '',
		'exp4' => '',

	);

	//need the variable for username and need to filter the input and store input
	//input post is the method for posting
	//need to filter and sanitize info going in
	$username = filter_input (INPUT_POST, "username", FILTER_SANITIZE_STRING);

	//need the variable for password and need to filter the input and store input
	//input post is the method for posting
	//need to filter and sanitize info going in
	$password = filter_input (INPUT_POST, "password", FILTER_SANITIZE_STRING);

	//making a query so you select the proper user
	//using session variable because thats where the database connection is being stored
	//running a query on the database
	//retrieving  info from database using select
	//selecting all from table
	//selecting from the username
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");

	//to check if theres info stored in query
	//since array the info get put has specific properties
	//num_rows tells how many rows we got from the database and checking if its one
	if($query->num_rows == 1){

		//making a variable to get the array of info thats in query
		//fetch array is Fetching a result row as an associative array (( and can fetch a numeric array))
		$row = $query->fetch_array();

			//to check variable  password  =  password stored in the database
			// === checks checks te value and type
			if($row["password"] === crypt($password, $row["salt"])){

				//creating a new session variable
				//this is an array of values
				//to make the user authenticated / logged in
				$_SESSION["authenticated"] = true;

				//taking exp from row it was loaded from
				$array["exp"] = $row["exp"];
				$array["exp1"] = $row["exp1"];
				$array["exp2"] = $row["exp2"];
				$array["exp3"] = $row["exp3"];
				$array["exp4"] = $row["exp4"];

				//session name (variable) for username
				$_SESSION["name"] = $username;

				//echoing this array as one javascript object
				echo json_encode($array);
			}
			//runs if the password is invalid
			else{
				echo "Invalid username and password";
			}

	}
	//runs rif the query fails or retrieve username
	else{
		echo "Invalid username and password";
	}