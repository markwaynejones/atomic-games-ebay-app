<?php

// below details work for database on scotchbox
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "atomic-games";
$port = 3308;

// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM `sold-playstation-one-games` ORDER BY `id`";
    
    $resultFilter = $mysqli->query($sql);
    $allGames = $resultFilter->fetch_all(MYSQLI_ASSOC);



?>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<title>Atomic Games - All Games</title>
<link rel="shortcut icon" type="image/png" href="resources/joystick-icon.png"/>

<meta charset="UTF-8">
</head>

<body>

<p><a href="http://atomic-games/">eBay tool</a></p>

<h1>All games on the system</h1>

<table border="1">

<tr>
        <th>Heading</th>
        <th>Label Type</th>
        <th>Completion Type</th>
        <th>Image</th>
        <th>Number of Bids</th>
        <th>Price Sold For</th>
        <th>Postage Cost</th>
        <th>Total Sold For</th>
        <th>Date Added To System</th>
    </tr>

<? foreach ($allGames as $game) { ?>

    <tr>
        <td><?=$game['name']; ?></td>
        <td><?=$game['labeltype']; ?></td>
        <td><?=$game['complete'] == 1 ? 'Complete' : 'Incomplete'; ?></td>
        <td><img width="150px" src="<?=$game['imagesrc']; ?>" /></td>
        <td><?=$game['number-of-bids']; ?> bids</td>
        <td>&pound;<?=$game['price-sold-for']; ?></td>
        <td>&pound;<?=$game['postage-cost']; ?></td>
        <td>&pound;<?=$game['price-sold-for'] + $game['postage-cost']; ?></td>
        <td><?=$game['date_added_to_system']; ?></td>
    </tr>

<? } ?>

</table>

<br /><br />

</body>

</html>