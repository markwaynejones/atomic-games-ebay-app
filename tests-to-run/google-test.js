var TestHelperClass = require("../helperClasses/testHelperClass.js");

var assert = require("assert");
var mysql = require("promise-mysql");

var databaseConnection = false;

var gameToSearch = "crash bandicoot";
var consoleToSearch = "ps1";

var searchQuery = gameToSearch + " " + consoleToSearch;

var insertGameIntoDB;

var dateOfLastSOldItemInDB;

describe("simple google test", function() {
  it("should check that site title of webdriverio", function() {
    var testHelper = new TestHelperClass(browser);

    browser.setViewportSize({
      width: 1920,
      height: 1080
    });

    //////////////// start of mysql ////////////////

    mysql
      .createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "atomic-games"
      })
      .then(function(conn) {
        var result = conn.query(
          // "select `name` from `sold-playstation-one-games`"
          "SELECT `datetimesold` from `sold-playstation-one-games` order by `datetimesold` desc limit 1"
        );

        databaseConnection = conn;

        // conn.end();
        return result;
      })
      .then(function(rows) {
        if (typeof rows[0] != "undefined") {
          dateOfLastSOldItemInDB = rows[0].datetimesold;
        } else {
          dateOfLastSOldItemInDB = 0;
        }
      });

    //////////////// end of mysql ////////////////

    //////////////// start of web scraper ////////////////

    // go to ebay and search for a game
    testHelper.searchForGame(gameToSearch, consoleToSearch);

    // choose filters in left sidebar
    testHelper.chooseFiltersInSidebar();

    ///////// Start of looping through games (on page 1) /////////
    var gameTitles = browser.elements(
      "//div[@id='ResultSetItems']//ul[@id='ListViewInner']//li[contains(@class,'sresult')]"
    );

    console.log("Start looping through each game that has been sold");

    // loop through sold ebay listings
    for (index = 0; index < gameTitles.value.length; ++index) {
      var currentGameElement = gameTitles.value[index];

      var gameHeading = testHelper.getGameHeading(currentGameElement);

      var gameURL = testHelper.getGameURL(currentGameElement);

      var soldPrice = testHelper.getSoldPrice(currentGameElement);

      var postageCost = testHelper.getPostageCost(currentGameElement);

      var numberOfBids = testHelper.getNumberOfBids(currentGameElement);

      var imageSrc = testHelper.getImageSrc(currentGameElement);

      var soldDateTimestamp = testHelper.getSoldDateTimestamp(
        currentGameElement,
        dateOfLastSOldItemInDB
      );

      // if we should have this item already in DB, then skip onto next item/game
      if (soldDateTimestamp <= dateOfLastSOldItemInDB) {
        console.log(
          "Not inserting game '" +
            gameHeading +
            "' because it should already be inserted based on its time/date it was sold."
        );

        console.log("Breaking out of loop and ending application.");

        break;
      }

      // check to see if any other game appears in title and if it does then we don't want to store this item in the DB
      var insertGameIntoDB = testHelper.checkIfWeShouldStoreGameInDB(
        gameHeading,
        gameToSearch
      );

      console.log("--------------- End of Refactor Code ---------------");

      if (insertGameIntoDB === true) {
        console.log("Inserting below game into database");
        console.log(gameHeading);
        console.log("------------------------------------");

        // insert into DB
        databaseConnection.query(
          "insert into `sold-playstation-one-games` set `name` = '" +
            gameHeading +
            "', `price-sold-for` = '" +
            soldPrice +
            "', `datetimesold` = '" +
            soldDateTimestamp +
            "', `number-of-bids` = '" +
            numberOfBids +
            "', `postage-cost` = '" +
            postageCost +
            "', `imageSrc` = '" +
            imageSrc +
            "', `searchquery` = '" +
            searchQuery +
            "', `gamename` = '" +
            gameToSearch +
            "', `console` = '" +
            consoleToSearch +
            "', `ebayitemurl` = '" +
            gameURL +
            "'"
        );
      } else {
        console.log("Not inserting below game into database");
        console.log(gameHeading);
        console.log("------------------------------------");
      }

      browser.pause(2000);
    } // end loop through sold ebay listings

    ///////// End of looping through games (on page 1) /////////

    var siteTitle = browser.getTitle();
    console.log(siteTitle);

    browser.saveScreenshot("./snapshot.png");
    // browser.saveElementScreenshot("crash.png", "#mainImgHldr #icImg");
    browser.pause(1000); // need this else below wont assert, still works just wont assert due to image taking time to save screenshot

    //////////////// end of web scraper ////////////////
  });
});
