<?php
	//this is a controller, this is where the user interacts with the controller in order to modify anything in the model

	//in the () this is the path to the file we want included
	require_once(__DIR__ . "/../model/config.php");

	//*note we created a table within the database, 
	//the id has 11 values within the integers (type int) id cant be NULL(empty)
	//the max characters for this varchar is 255, the title cant be null either
	//the post info is gonna have text, and its not null
	//the primary key is set to id, this is how tables are connected to each other
	//we are using are session variable now
	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "title varchar(255) NOT NULL,"
		. "post text NOT NULL,"
		. "DateTime datetime NOT NULL ,"
		. "PRIMARY KEY (id))");

	//if this is true its been successfully created
	//*note you can only create a table once
	//else-> not true / table already exists
	if($query){
		echo "succesfully create table: posts";
	}
	else{
		echo "<p>" . $_SESSION["connection"]->error . " </p>";
	}


	//this string is going to be sent to the database
	//query is connected to our database connection which is stored in the session variable
	//it'll be true if the query is successful
	//if its not true the query couldnt be completed
	$query = $_SESSION["connection"]->query("CREATE TABLE users("
		//this string is going to be columns of the table
		//rows are records on the table 
		//this is going to be id for the user
		//not null so when you query the database there will be an id sent and its automatic
		//auto increment increments the id automatically
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		//for the username
		//need to store the username email password and salt
		//30 is the max characters of the username
		//its null so you cant have a blank username
		. "username varchar(30) NOT NULL,"
		//for the email
		//more characters because emails are usually long
		//not null so you have the email stored
		. "email varchar(50) NOT NULL,"
		//for the password
		//not null so this value gets set and cant be blank
		//if its blank there will be an error
		. "password char(128) NOT NULL,"
		//salt is for security
		//not null so cant be empty
		. "salt char(128) NOT NULL,"
		// for primary key
		. "PRIMARY KEY (id))");

	//if statement is to check somethings wronng
	//checking if query is true
	if($query){
		echo "<p> Successfully created table: users</p>";
	}
	else{
		echo "<p". $_SESSION["connection"]->error .  "</p>";
	}

	//we are closing the connection
	//$connection->close();

