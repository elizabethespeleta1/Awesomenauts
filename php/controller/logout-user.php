<?php
	//require because you need the config file
	require_once(__DIR__ . "/../model/config.php");

	//oing to unset variable authenticated
	unset($_SESSION["authenticated"]);

	//destroy the session and no info about the login will remain on the server
	session_destroy();
	
	//header is going to take a string and the string is a location
	header("Location: " . $path . "index.php");