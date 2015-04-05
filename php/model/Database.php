<?php

	//making an object 
	//this object is going to be associated with the database
	class Database {
		//this variable is going to be for our connection
		//private means it can only be accessed here
		//public means other files cann accessed the info
		private $connection;

		//this variable is going to hold the host info
		private $host;

		//this is for the username
		private $username;

		// this ones for the password
		private $password;

		//for the database
		private $database;

		//this is public because we want access within create-db
		public $error;

		//* note a function is a block of code that can be used repeatedly
		//* your doing this so you don't have to repeat alot of the code

	//this file needs to be public needs to accessed in any file
	// the variables are global variables
	//database in the () relate to the database
	//with the info we store the info within the global variables
	public function __construct($host, $username, $password, $database){

		//in the constructer you can access the variables by using this code
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

		//in this connection variable, theres class or object that accesses info on our mysqli server
		$this->connection = new mysqli($host, $username, $password);

		//this is where we check if theres a connection error
		if($this->connection->connect_error){

			//there is an error and were killing the program& were echoing whats wrong with it
			die("<p>error: " . $this->connection->connect_error . "</p>");
		}

		//this is gonna access the database
		$exists = $this->connection->select_db($database);

		//*note the ! means its false
		// this is creating a database if it doesnt exist& running a query& there is sql language in the ()
		if(!$exists){
			$query = $this->connection->query("CREATE DATABASE $database");

			//this is outputting a message
			if($query){
				echo "<p>successfully executed DATABASE:" . $database . "</p>";
			}
		}

			//if this runs this means a database already exists
			else{
				echo "<p>Database already exists</p>";
			}
	}

	//in this function your gonna open a connection and use
	public function openConnection(){

		//creating a new mysqli
		$this->connection = new mysqli($this->host,$this->username,$this->password,$this->database);

		//this is where we check if theres a connection error
		if($this->connection->connect_error){

			//there is an error and were killing the program& were echoing whats wrong with it
			die("<p>error: " . $this->connection->connect_error . "</p>");
		}

	}

	//when your going to use this function when you close the connection
	public function closeConnection(){

		//isset checks if the variable has been set or not/ if theres something in the variable
		//if there isnt it'll return null and the if statement wont work
		//if isset finds that theres is info it will execute the lines in the middle
		if(isset ($this->connection)){
			$this->connection->close();
		}

	}

	//this string can be located in a variable or an actual string 
	//but it will be a variable in the end
	public function query($string){
		
		//we are opening a connection, so it runs function openConnection n all the lines of code inside openConnection get executed
		$this->openConnection();

		//this is execute a query in the database
		//it uses the string of text to query the database here
		$query = $this->connection->query($string);

		//this conditional statement is to check the status of the query
		//this tells us if the is false
		if(!$query){
			$this->error = $this->connection->error;
		}

		//your closing the connection
		$this->closeConnection();

		//your returning the results
		return $query;
	}
}

