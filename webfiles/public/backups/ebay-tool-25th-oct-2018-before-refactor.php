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




//////////////




*/

// phpinfo();


////////////////// start /////////////////

$print_this = "PHP Works. Yay!";

// echo $print_this;
// ini_set("mysqli.default_port", 3307);
// echo ini_get("mysqli.default_port");

// below details work for database on scotchbox
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "atomic-games";

// 192.168.0.1
// 10.0.2.2
// 192.168.10.1
// $servername = "10.0.2.2";
// $username = "root";
// $password = "984367";
// $dbname = "atomic-games";

// $dbname = "scotchbox";
// $port = 3307;

// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// echo ini_get("mysqli.default_port");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Connected successfully";



/////// start of filter sql ///////////

// Get all games that have the platinum filter (may not need `atomic-games`. parts of query)
// $sql = "SELECT `sold-playstation-one-games`.name FROM `sold-playstation-one-games` 
// INNER JOIN `games-to-tags` ON  `sold-playstation-one-games`.id = `games-to-tags`.game_id
// INNER JOIN `tags` ON `games-to-tags`.tag_id = `tags`.id
// WHERE `tags`.name = 'platinum'";



// Get all games that have the platinum filter (may not need `atomic-games`. parts of query)

if(isset($_POST['tag'])){
    // print_r($_POST['tag']);
    // die;

    $filterSqlAppend = "";
    $filterSubQuery = "";

    foreach ($_POST['tag'] as $tag){
        $filterSqlAppend .= "`tags`.id != '".$tag."' AND ";
        $filterSubQuery .= "tag_id = '".$tag."' OR ";
    }

    $filterSqlAppend = substr($filterSqlAppend, 0, -5);
    $filterSubQuery = substr($filterSubQuery, 0, -4);

    // $sql = "SELECT `sold-playstation-one-games`.name FROM `sold-playstation-one-games` 
    // INNER JOIN `games-to-tags` ON  `sold-playstation-one-games`.id = `games-to-tags`.game_id
    // INNER JOIN `tags` ON `games-to-tags`.tag_id = `tags`.id
    // WHERE ".$filterSqlAppend."
    // and game_id NOT IN (select game_id from `atomic-games`.`games-to-tags` where  tag_id = '3' or tag_id = '1')
    // ";

    $sql = "SELECT `sold-playstation-one-games`.name, `sold-playstation-one-games`.id FROM `sold-playstation-one-games` 
    INNER JOIN `games-to-tags` ON  `sold-playstation-one-games`.id = `games-to-tags`.game_id
    INNER JOIN `tags` ON `games-to-tags`.tag_id = `tags`.id
    WHERE ".$filterSqlAppend." 
    and game_id NOT IN (select game_id from `atomic-games`.`games-to-tags` where ".$filterSubQuery.")
    group by `games-to-tags`.game_id";

    // echo $sql;
    // echo "\n";
    // echo $sqlTwo; die;  
    
    $resultFilter = $mysqli->query($sql);

    $allRowsGamesFiltered = $resultFilter->fetch_all(MYSQLI_ASSOC);

    // print_r($allRowsGamesFiltered);
    // die;

// die;

// $resultFilter = $mysqli->query($sql);

} else { // else no tags so just get all games in DB

    $sql = "SELECT `sold-playstation-one-games`.name, `sold-playstation-one-games`.id FROM `sold-playstation-one-games`";

    $resultFilter = $mysqli->query($sql);

    $allRowsGamesFiltered = $resultFilter->fetch_all(MYSQLI_ASSOC);
}







// if (!$result = $mysqli->query($sql)) {
//     echo "Error: " . $mysqli->error . "\n";
//     exit;
// }

// // Print out a list of games in the database
// echo "<ul>\n";
// while ($game = $resultFilter->fetch_assoc()) {
//     echo "<li>";
//     echo $game['name'];
//     echo "</li>";
// }
// echo "</ul>\n";

// die;

//////// end of filter sql //////////



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

// Print out a list of games in the database
// echo "<ul>\n";
// while ($game = $result->fetch_assoc()) {
//     echo "<li>";
//     echo $game['name'];
//     echo "<ul>";
//         echo "<li>".$game['description']."</li>";
//         echo "<li>&pound;".$game['price-sold-for']."</li>";
//     echo "</ul>";
//     echo "</li>";
// }
// echo "</ul>\n";


/////////////////////// end //////////////////


$markTest = "hello mark";
$average_prices = getAveragePricesForMonth('October', '2018')

?>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script type="text/javascript">
google.charts.load('current', {
    'packages':['corechart','line'],
    'language': 'en-GB'

});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        // var data = google.visualization.arrayToDataTable([
        //   ['Task', 'Hours per Day'],
        //   ['Work',     10],
        //   ['Eat',      0],
        //   ['Commute',  4],
        //   ['Watch TV', 2],
        //   ['Sleep',    7]
        // ]);

        var data = google.visualization.arrayToDataTable([
          ['Amount Sold For', 'Number of Games Sold'],
          ['£0-£5',     10],
          ['£5-£10',      0],
          ['£10-£15',  4],
          ['£15-£20', 2],
          ['£20-£25',    7],
          ['Greater than £25',    8]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }


// google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    // var alertMessage = '<?php echo 'php worked' ?>';
    
    // alert(alertMessage);

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day of the Month');
      data.addColumn('number', 'Price Crash Bandicoot Sold For');

    //   ['day sold','average price']
    //   data.addRows([
    //     [0, 0],   [1, 10],  [2, 23]
    //   ]);

      data.addRows([
        <?php foreach($average_prices as $day => $price_array) { 
            if (!isset($price_array['average_price'])) {
                $avg_price = 0;
                continue;
            } else{
                $avg_price = $price_array['average_price'];
            }
            ?>
        [<?php 
        if($day != 31){
            echo $day ?>,<?php echo $avg_price; ?>],
        <?php } else{ 
            echo $day ?>,<?php echo $avg_price; ?>]
        <?php } ?>
        
        <?php } ?>
      ]);

      var options = {
        chart: {
          title: 'Average Price Game Sold For In October 2018',
          subtitle: 'in pounds (£)'
        },
        vAxis: {
            format: 'currency',
        },
        hAxis: {

        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }

</script>

<meta charset="UTF-8">
<title>Title of the document</title>
</head>

<body>

<h1>Crash Bandicoot PS1</h1>

<h3>Filters / Tags</h3>

<form method="POST" action="http://192.168.33.10/ebay-tool.php">
<ul>

<?
$allTags = getAllTags();

foreach($allTags as $tag){ ?>
    <? if(isset($_POST['tag'])){ ?>
        <li><?=$tag['name'] ?> <input name="tag[]" value="<?=$tag['id'] ?>" type="checkbox" <? if(in_array($tag['id'], $_POST['tag'])){ ?> checked="checked" <? } ?> /></li>
    <? } else{ ?>
        <li><?=$tag['name'] ?> <input name="tag[]" value="<?=$tag['id'] ?>" type="checkbox" /></li>
    <? } ?>
<? }
?>
<br />
<input type="submit" value="Submit Filters" />
</form>
</ul>

<hr />

<? // if(isset($_POST['tag'])){ ?>

<h3>Games being used for stats based on filters chosen</h3>

<? foreach($allRowsGamesFiltered as $game){ 
    echo $game['id'].": ".$game['name'].'<br />'; 
 } ?>

 <br />



<hr />

<? // } ?>

<h3>Summary of items sold</h3>

<p><strong>Number of items sold:</strong><?php echo count($allRowsGamesFiltered); ?></p>

<p><strong>:</strong><?php echo ''; ?></p>

<p><strong>:</strong><?php echo ''; ?></p>

<p><strong>:</strong><?php echo ''; ?></p>

<p><strong>:</strong><?php echo ''; ?></p>

<hr />

<div id="piechart" style="width: 900px; height: 500px;"></div>

<div id="linechart_material" style="width: 900px; height: 500px;"></div>

</body>

</html>

<?php

//////////// start of PHP functions ////////////

function getAveragePricesForMonth($month, $year) {

    global $mysqli;


    // get list of games sold in a specific month and year (date_formatted = day in the month it was sold with leading zeros e.g. 07, 09, 13)
    $sql = "select `price-sold-for`, from_unixtime(datetimesold,'%e') as date_formatted from `sold-playstation-one-games` where MONTHNAME(from_unixtime(datetimesold)) = '".$month."' and Year(from_unixtime(datetimesold)) = '".$year."' ORDER by datetimesold";
    // $sql = "select `price-sold-for`, from_unixtime(datetimesold,'%e') as date_formatted from `sold-playstation-one-games`";
    // $sql = "select `price-sold-for`, from_unixtime(datetimesold,'%e') as date_formatted from `sold-playstation-one-games`";

    $result = $mysqli->query($sql);

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
    

    // var_dump($result); die;
    

    $average_prices = array();

    for($i = 1; $i <= 31; $i++) {

        $average_prices[$i] = array();

    }





    while ($game = $result->fetch_assoc()) {

        $average_prices[$game['date_formatted']][] = $game['price-sold-for'];

    }

    foreach($average_prices as $day => $priceArray) {
        if (count($average_prices[$day]) == 0) continue;

        $totalPrice = 0;
        $totalSold = 0;
        foreach($average_prices[$day] as $price) {
            $totalPrice += $price;
            $totalSold++;
        }

        $average_prices[$day]['average_price'] = round($totalPrice / $totalSold);

    }

    // print_r($average_prices);

    // die;

    return $average_prices;

}

function getAllTags() {

    global $mysqli;

    $sql = "SELECT * FROM tags";
    
    $resultFilter = $mysqli->query($sql);
    $allRows = $resultFilter->fetch_all(MYSQLI_ASSOC);

    return $allRows;

    // print_r($allRows);
    // die;
    
    // if (!$result = $mysqli->query($sql)) {
    //     echo "Error: " . $mysqli->error . "\n";
    //     exit;
    // }
    
    // // Print out a list of games in the database
    // echo "<ul>\n";
    // while ($game = $resultFilter->fetch_assoc()) {
    //     echo "<li>";
    //     echo $game['name'];
    //     echo "</li>";
    // }
    // echo "</ul>\n";

}

?>