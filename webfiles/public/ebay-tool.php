<?php

/* Working out percantage chance of making a profit based on a price about to bid for

Example

There are 17 items in the DB for Crash Bandicoot

If I bid £6

There is only one that sold for less than this in the DB (1 sold for £5). This means there is a 16/17 chance of making a profit if I bid at $£6.

--------

SELECT * FROM `atomic-games`.`sold-playstation-one-games` where `price-sold-for` < '6';

The above SQL lets us know that only one item sold for less than £6.

Then count all rows for this specific game brings back, which equals '17'

Then to work the percantage chance of making a profit if I bought this at £6, use the formula below

([amount sold for less than £6] divide by [total number of rows in db for this specific game]) times by 100 and then round up. Finally deduct this number from 100

For Example
(1/17) * 100 = 5.8 (round up to 6)

100 - 6 = 94% chance of making a profit on this game if bought at £6






*/


////////////////// start /////////////////

$print_this = "PHP Works. Yay!";

// echo $print_this;
// ini_set("mysqli.default_port", 3307);
// echo ini_get("mysqli.default_port");


$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "atomic-games";
// $dbname = "scotchbox";
// $port = 3307;

// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// echo ini_get("mysqli.default_port");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";

$sql = "select * from `sold-playstation-one-games`";

if (!$result = $mysqli->query($sql)) {
    // Oh no! The query failed. 
    echo "Sorry, the website is experiencing problems.";

    // Again, do not do this on a public site, but we'll show you how
    // to get the error information
    echo "Error: Our query failed to execute and here is why: \n";
    echo "Query: " . $sql . "\n";
    echo "Errno: " . $mysqli->errno . "\n";
    echo "Error: " . $mysqli->error . "\n";
    exit;
}

// Phew, we made it. We know our MySQL connection and query 
// succeeded, but do we have a result?
if ($result->num_rows === 0) {
    // Oh, no rows! Sometimes that's expected and okay, sometimes
    // it is not. You decide. In this case, maybe actor_id was too
    // large? 
    echo "We could not find a match for ID $aid, sorry about that. Please try again.";
    exit;
}

// Print our 5 random actors in a list, and link to each actor
echo "<ul>\n";
while ($game = $result->fetch_assoc()) {
    echo "<li>";
    echo $game['name'];
    echo "<ul>";
        echo "<li>".$game['description']."</li>";
        echo "<li>&pound;".$game['price-sold-for']."</li>";
    echo "</ul>";
    echo "</li>";
}
echo "</ul>\n";


/////////////////////// end //////////////////

?>