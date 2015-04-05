<?php

	require_once(__DIR__ . "/Database.php");

	//this is a session it preserves & makes info availabe throughout the webpage
	//we use sessions to save the databse object & its only created once
	session_start();

	//when you start a session the session gets an id which remains constant
	//it uses the original session create new session with a new id and delete the old session
	session_regenerate_id(true);

	//is the path to all our project files
	$path = "/EEAwesomenauts/php/";

	// this is where you store info
	//* note you dont need a closing tag when there is only php

	//you are storing database server information here
	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "EEAwesomenauts_db";

	//this conditional statement is to check if session&connection exists
	//isset is to check if the variables have value
	if(!isset($_SESSION["connection"])){

	//this is a database object
	//this new object is going to be stored in connection
	//in connection you have acccesed to the functions in database
	//this Database object helps query on the database
	$connection = new Database($host, $username, $password, $database);

	//this is going to use the session variable
	//you access the session variable in the brackets
	//you create a session variable here named connection
	$_SESSION["connection"] = $connection;
}
