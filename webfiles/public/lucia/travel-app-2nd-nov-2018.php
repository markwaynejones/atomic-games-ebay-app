<?php

/*
***** Pro Tips *****
1. To comment multiple lines of code out, select the lines to comment and press "Ctrl+?""
2. 
3.
4.
...
*/

// Defining all connection details as variables, which we can then re-use later in the Connection
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$databasename = "scotchbox";

// Create connection
	$conn = new mysqli($servername, $username, $password, $databasename);

// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	//echo "Connected successfully";

// Use an SQL statement to find all entries (rows) in the "tags" table. 
	$sql = "SELECT * FROM tags";
// Store the result 
	$result = $conn->query($sql);

	//die; - we don't need this one right now. Die stops the PHP from running. 

//============================================================

	$checkmycheckbox = ""; // We will need to use this variable later, to append this checked=checked to the check boxes when they have been submitted



// If the $_GET variable is set, using values from the filters... (basically meaning that the user has pressed the submit button and passed values to the URL)


	if (isset($_GET['filter'])) {
		/**
		print_r($_GET['filter']);
		die;
		**/
// REMEMBER! ** $_ indicates a variable automatically created by PHP, also known as 'magic method'. in this case $_GET is always an associative array, therefore to access values stored within it, use the actual values as your 'index'

//...then Output the following HTML  ...	
	echo "Your chosen filters are <br/>";    
 	//print_r($_GET['filter']); 
	echo "<ul>";
	// Using a loop now. For each 'filter' that is available, we define a new variable called '$slug'
	    foreach($_GET['filter'] as $slug)     {
	    	$sql = "SELECT name FROM tags WHERE slug ='".$slug."'"; //REMEMBER! ** you can't just put PHP variables in the SQL statements values, otherwise the SQL will treat that as a value. always use this syntax (concatenate)
	    	$result_slugs = $conn->query($sql); //use this to execute query above
			$filter = $result_slugs->fetch_assoc(); //use this to fetch the first row and assign it to a variable called $filter
	        echo '<li>'.$filter['name']."</li>";


    } //REMEMBER! ** don't need semicolon after curly braces!

 echo "</ul>";

}
?>

<!DOCTYPE html>
	<head>
	    <title>Lucia's Travel App</title>
	    <style>
	    </style>
	</head>
	<body>
		<h3>Tell me what you're looking for in your perfect day out...</h3>
		<form method="GET" action="travel-app.php"><!--This is going to be directed the url (linking to the php file) on submission of the form-->
			<?php  
			// output data of each row 
			 while($row = $result->fetch_assoc()) { 
			 	// $row['slug'] = "beach"
			 	// $_GET['filter'] = "Beach"
			 	// beach, riverside == beach
			 	if (isset($_GET['filter']) && in_array($row["slug"], $_GET['filter'])) {
			 		$checkmycheckbox = 'checked="checked"';
			 	} else {
			 		$checkmycheckbox = '';
			 	}
			 	


			
/**

<?php
$people = array("Peter", "Joe", "Glenn", "Cleveland");

if (in_array("$row["slug"], $_GET['filter']))
  {
  echo "Match found";
  }
else
  {
  echo "Match not found";
  }
?>
**/



			?>
				<!--We want the value of input to be lowercase because we are going to match it to a DB param and these things are case sensitive. Hence, we have created an alias for the column name in the DB called 'slug', which serves this purpose. In the URL query string, the checked checkboxes will appear as name=value -->
				<input type="checkbox" name="filter[]" value="<?php echo $row["slug"];?>" <?php echo $checkmycheckbox; ?>/> 
				<?php echo $row["name"]; ?>
				<br>
			<?php   
				} 
			?>
			<br />
			<input type="submit" value="Let's do this" />
		</form>
	</body>
</html>