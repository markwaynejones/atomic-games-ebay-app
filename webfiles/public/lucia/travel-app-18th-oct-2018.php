<?php





if (isset($_GET['filter'])) {
 echo "Your chosen filters are <br/>";    
 //print_r($_GET['filter']); //$_ indicates a variable automatically created by PHP, also known as 'magic method'. in this case $_GET is always an associative array, therefore to access values stored within it, use the actual values as your 'index'

 echo "<ul>";
    foreach($_GET['filter'] as $filter) {
        echo "<li>".$filter."</li>";


    }//don't need semicolon after curly braces!

 echo "</ul>";

}
?>

<!doctype html>
<head>

    
    <title>Lucia's Travel App</title>

    <style>

    </style>

</head>
<body>

<h3>Gimme your filters</h3>

<form method="GET" action="travel-app.php"><!--This is going to be directed the url (linking to the php file) on submission of the form-->
<input type="checkbox" name="filter[]" value="beach"/>Beach <!--when writing values use lowercase because we are going to match it to a db param and these things are case sensitive-->
<input type="checkbox" name="filter[]" value="history"/>History<!--in the query string, these will appear as name=value-->
<input type="checkbox" name="filter[]" value="foodie"/>Foodie
<br />
<input type="submit" value="Let's do this" />



</form>

</body>
</html>