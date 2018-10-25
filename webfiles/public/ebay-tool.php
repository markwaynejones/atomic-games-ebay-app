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


$print_this = "PHP Works. Yay!";

$all_game_ids_being_used_for_stats = array();

// below details work for database on scotchbox
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "atomic-games";

// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Connected successfully";

// below variable has all the games details to use for stats in one array (add more columns to sql in this function when and if need to)
/*
e.g. of what would be in variable

Array
(
    [0] => Array
        (
            [name] => Crash Bandicoot (Big Box) | Sony PlayStation 1 PS1 | Tested Complete | PAL UK
            [id] => 18
            [price] => 22.55
        )

    [1] => Array
        (
            [name] => Crash Bandicoot big box ps1
            [id] => 32
            [price] => 20.85
        )

)

*/
$allRowsGamesFiltered = getAllGamesToUseForStats();

$priceMatrixArray = array(
    '5' => 0,
    '10' => 0,
    '15' => 0,
    '20' => 0,
    '25' => 0,
    '100000' => 0
);

foreach ($allRowsGamesFiltered as $gameDetails) {

    foreach($priceMatrixArray as $priceRange => $amountOfGames) {

        // if last one then must fit into last price range (make more dynamic when get time)
        if ($priceRange == '100000') {
            $priceMatrixArray[$priceRange]++;
            break;
        }

        // if this price falls into this price range then increment the number of games at this price range and continue onto next game
        if ($gameDetails['price'] <= $priceRange) {
            $priceMatrixArray[$priceRange]++;
            break;
        }

    }

}

// print_r($priceMatrixArray);
// die;

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

        var data = google.visualization.arrayToDataTable([
          ['Amount Sold For', 'Number of Games Sold'],
          ['£0-£5',     <?=$priceMatrixArray['5'] ?>],
          ['£5-£10',      <?=$priceMatrixArray['10'] ?>],
          ['£10-£15',  <?=$priceMatrixArray['15'] ?>],
          ['£15-£20', <?=$priceMatrixArray['20'] ?>],
          ['£20-£25',    <?=$priceMatrixArray['25'] ?>],
          ['Greater than £25',    <?=$priceMatrixArray['100000'] ?>]
        ]);

        var options = {
          title: 'Price Crash Bandicoot Games Sold For In October 2018'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day of the Month');
      data.addColumn('number', 'Average price Crash Bandicoot sold for on this day');

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
          title: 'Average Price Game Sold For On Each Day In October 2018',
          subtitle: 'price at each point is average of all crash bandicoot 1 games that were sold on that day along with the day of the month it was sold'
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

<p>Please select filters to remove any games that are associated with that filter from the results.</p>

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

<h3>Games being used for stats</h3>

<? foreach($allRowsGamesFiltered as $game){ 
    echo $game['id'].": ".$game['name'].'<br />'; 
 } ?>

 <br />

<hr />


<h3>Summary of items sold</h3>

<p><strong>Number of items sold:</strong><?php echo count($allRowsGamesFiltered); ?></p>

<!-- <p><strong>:</strong><?php //echo ''; ?></p> -->

<hr />

<div id="piechart" style="width: 900px; height: 500px;"></div>

<div id="linechart_material" style="width: 900px; height: 500px;"></div>

</body>

</html>

<?php

//////////// start of PHP functions ////////////

function getAveragePricesForMonth($month, $year) {

    global $mysqli;
    global $all_game_ids_being_used_for_stats;

    // get list of games sold in a specific month and year (date_formatted = day in the month it was sold with leading zeros e.g. 07, 09, 13)
    $sql = "select `id`, `price-sold-for`, from_unixtime(datetimesold,'%e') as date_formatted from `sold-playstation-one-games` where MONTHNAME(from_unixtime(datetimesold)) = '".$month."' and Year(from_unixtime(datetimesold)) = '".$year."' ORDER by datetimesold";

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

    $average_prices = array();

    for($i = 1; $i <= 31; $i++) {
        $average_prices[$i] = array();
    }

    while ($game = $result->fetch_assoc()) {
        // if current game is being filtered out then don't add to stat graphs
        if(!in_array($game['id'], $all_game_ids_being_used_for_stats)) continue;

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

        $average_prices[$day]['average_price'] = round($totalPrice / $totalSold,2);
    }

    return $average_prices;

}

function getAllTags() {

    global $mysqli;

    $sql = "SELECT * FROM tags";
    
    $resultFilter = $mysqli->query($sql);
    $allRows = $resultFilter->fetch_all(MYSQLI_ASSOC);

    return $allRows;
}

function getAllGamesToUseForStats() {

    global $mysqli;
    global $all_game_ids_being_used_for_stats;

    // Get all games that don't have specific tags/filters associated to them
    if(isset($_POST['tag'])){

        $filterSqlAppend = "";
        $filterSubQuery = "";

        foreach ($_POST['tag'] as $tag){
            $filterSqlAppend .= "`tags`.id != '".$tag."' AND ";
            $filterSubQuery .= "tag_id = '".$tag."' OR ";
        }

        $filterSqlAppend = substr($filterSqlAppend, 0, -5);
        $filterSubQuery = substr($filterSubQuery, 0, -4);

        /* Below commentted out sql works better than one below it
        SELECT `sold-playstation-one-games`.id, `sold-playstation-one-games`.name, `sold-playstation-one-games`.id, `sold-playstation-one-games`.`price-sold-for` as price, `games-to-tags`.tag_id
        FROM `atomic-games`.`sold-playstation-one-games` 
        LEFT JOIN `atomic-games`.`games-to-tags` ON `sold-playstation-one-games`.id = `games-to-tags`.game_id 
        LEFT JOIN `atomic-games`.`tags` ON `games-to-tags`.tag_id = `tags`.id 
        WHERE (`games-to-tags`.`tag_id` != '3' OR `games-to-tags`.`tag_id` IS NULL) 
        AND `sold-playstation-one-games`.id NOT IN (select game_id from `atomic-games`.`games-to-tags` where tag_id = '3') 
        group by `sold-playstation-one-games`.id
        */

        $sql = "SELECT `sold-playstation-one-games`.id, `sold-playstation-one-games`.name, `sold-playstation-one-games`.id, `sold-playstation-one-games`.`price-sold-for` as price, `games-to-tags`.tag_id
        FROM `sold-playstation-one-games` 
        LEFT JOIN `games-to-tags` ON `sold-playstation-one-games`.id = `games-to-tags`.game_id 
        LEFT JOIN `tags` ON `games-to-tags`.tag_id = `tags`.id 
        WHERE (".$filterSqlAppend." OR `games-to-tags`.`tag_id` IS NULL)
        AND `sold-playstation-one-games`.id NOT IN (select game_id from `games-to-tags` where ".$filterSubQuery.") 
        group by `sold-playstation-one-games`.id";
    

        // $sql = "SELECT `sold-playstation-one-games`.name, `sold-playstation-one-games`.id, `sold-playstation-one-games`.`price-sold-for` as price FROM `sold-playstation-one-games` 
        // INNER JOIN `games-to-tags` ON  `sold-playstation-one-games`.id = `games-to-tags`.game_id
        // INNER JOIN `tags` ON `games-to-tags`.tag_id = `tags`.id
        // WHERE ".$filterSqlAppend." 
        // and game_id NOT IN (select game_id from `atomic-games`.`games-to-tags` where ".$filterSubQuery.")
        // group by `games-to-tags`.game_id";

        $resultFilter = $mysqli->query($sql);

        $allRowsGamesFiltered = $resultFilter->fetch_all(MYSQLI_ASSOC);

    } else { // else no tags so just get all games in DB

        $sql = "SELECT `sold-playstation-one-games`.name, `sold-playstation-one-games`.id, `sold-playstation-one-games`.`price-sold-for` as price FROM `sold-playstation-one-games`";

        $resultFilter = $mysqli->query($sql);

        $allRowsGamesFiltered = $resultFilter->fetch_all(MYSQLI_ASSOC);
    }

    foreach($allRowsGamesFiltered as $game) {
        $all_game_ids_being_used_for_stats[] = $game['id'];
    }

    // echo $sql; die;

    // print_r($allRowsGamesFiltered); die;

    return $allRowsGamesFiltered;
}

?>