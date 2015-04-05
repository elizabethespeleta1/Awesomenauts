<?php
	//need to require config fle because it has info we need
	require_once(__DIR__ . "/../model/config.php");

	//creating a function that will determine whether or not a user is logged in or not
	function authenticateUser(){
		
		//check if theres a session variable and if its true
		// if its not true or not set if the variable is set but not true that means the user isnt logged in
		//using an if statement to check if session authenticated hasnt been set
		if(!isset($_SESSION["authenticated"])){
			return false;
		}
		else{
			//checking session variable has info 
			if($_SESSION["authenticated"] != true){
				return false;
			}
			else{
				return true;
			}
		}
	}