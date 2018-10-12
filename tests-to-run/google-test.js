// var TestHelperClass = require('../../helperClasses/testHelperClass.js')
var assert = require("assert");
var mysql = require("promise-mysql");

var databaseConnection = false;

describe("simple google test", function() {
  it("should check that site title of webdriverio", function() {
    browser.setViewportSize({
      width: 1920,
      height: 1080
    });

    // var priceTest = "£8.50";

    // priceTest = priceTest.replace("£", "");

    // console.log(priceTest);

    //////////////// start of mysql ////////////////

    mysql
      .createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "984367",
        database: "atomic-games"
      })
      .then(function(conn) {
        var result = conn.query(
          "select `name` from `sold-playstation-one-games`"
        );

        databaseConnection = conn;

        // conn.query(
        //   "insert into `sold-playstation-one-games` set `name` = 'broken sword 2', `description` = 'second point and click adventure', `price-sold-for` = '11.68'"
        // );

        //     //////////////// start of web scraper ////////////////

        //     // browser.url("https://www.ebay.co.uk/");

        //     // browser.pause(3000);

        //     // browser.setValue("#gh-ac", "crash bandicoot ps1");

        //     // browser.pause(2000);

        //     // browser.click("#gh-btn");

        //     // browser.pause(3000);

        //     // browser.click(
        //     //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Platform')]/parent::span/parent::div/parent::div//span[text()='Sony PlayStation 1']"
        //     // );

        //     // browser.pause(3000);

        //     // browser.click(
        //     //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Show only')]/parent::span/parent::div/parent::div//span[text()='Sold listings']"
        //     // );

        //     // browser.pause(3000);

        //     // browser.saveScreenshot("./snapshot.png");

        //     // browser.click(
        //     //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Item location')]/parent::span/parent::div/parent::div//span[text()='UK Only']"
        //     // );

        //     // browser.pause(3000);

        //     // browser.click(
        //     //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//span[text()='Good']"
        //     // );

        //     // browser.pause(3000);

        //     // browser.click(
        //     //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//button[text()='see all']"
        //     // );

        //     // browser.pause(3000);

        //     // browser.click(
        //     //   "//div[@id='c_LH_ItemCondition']//label[contains(text(),'Very Good')]"
        //     // );

        //     // browser.pause(1000);

        //     // browser.click(
        //     //   "//div[@class='cb']//input[contains(@class,'submit-btn')]"
        //     // );

        //     // browser.pause(5000);

        //     // // get all listing heading (should be 50)

        //     // // "//div[@id='ResultSetItems']//ul[@id='ListViewInner']//li[contains(@class,'sresult')]//h3[contains(@class,'lvtitle')]"

        //     // browser.saveScreenshot("./snapshot.png");

        //     // var gameTitles = browser.elements(
        //     //   "//div[@id='ResultSetItems']//ul[@id='ListViewInner']//li[contains(@class,'sresult')]//h3[contains(@class,'lvtitle')]"
        //     // );

        //     // // var numElementsFound = gameTitles.value[0];

        //     // // console.log(numElementsFound);

        //     // // for (index = 0; index < gameTitles.length; ++index) {
        //     // //   console.log(gameTitles[index]);
        //     // // }

        //     // console.log("hello world");

        //     // // console.dir(gameTitles);

        //     // var siteTitle = browser.getTitle();
        //     // // console.log(siteTitle);

        //     // // browser.saveScreenshot("./snapshot.png");
        //     // // browser.saveElementScreenshot("crash.png", "#mainImgHldr #icImg");
        //     // browser.pause(1000); // need this else below wont assert, still works just wont assert due to image taking time to save screenshot

        //     // // conn.query(
        //     // //   "insert into `sold-playstation-one-games` set `name` = 'broken sword 2', `description` = 'second point and click adventure', `price-sold-for` = '11.68'"
        //     // // );

        //     // //////////////// end of web scraper ////////////////

        // conn.end();
        return result;
      })
      .then(function(rows) {
        // console.log("pausing for 7 seconds");
        // browser.pause(7000);
        // console.log("Finished pausing");
        // Logs out a list of rows from database
        // console.log(rows[0].name);
        // assert.equal(rows[0].name, "mark test");
      });

    //////////////// end of mysql ////////////////

    // console.log("pausing for 7 seconds");
    // browser.pause(7000);
    // console.log("Finished pausing");

    //////////////// start of web scraper ////////////////

    browser.url("https://www.ebay.co.uk/");

    browser.pause(3000);

    browser.setValue("#gh-ac", "crash bandicoot ps1");

    browser.pause(2000);

    browser.click("#gh-btn");

    browser.pause(3000);

    browser.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Platform')]/parent::span/parent::div/parent::div//span[text()='Sony PlayStation 1']"
    );

    browser.pause(3000);

    browser.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Show only')]/parent::span/parent::div/parent::div//span[text()='Sold listings']"
    );

    browser.pause(3000);

    browser.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Item location')]/parent::span/parent::div/parent::div//span[text()='UK Only']"
    );

    browser.pause(3000);

    browser.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//span[text()='Good']"
    );

    browser.pause(3000);

    browser.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//button[text()='see all']"
    );

    browser.pause(3000);

    browser.click(
      "//div[@id='c_LH_ItemCondition']//label[contains(text(),'Very Good')]"
    );

    browser.pause(1000);

    browser.click("//div[@class='cb']//input[contains(@class,'submit-btn')]");

    browser.pause(5000);

    browser.pause(3000);

    browser.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Format')]/parent::span/parent::div/parent::div//span[text()='Auction']"
    );

    browser.pause(5000);

    // var gameTitles = browser.elements(
    //   "//div[@id='ResultSetItems']//ul[@id='ListViewInner']//li[contains(@class,'sresult')]//h3[contains(@class,'lvtitle')]"
    // );

    var gameTitles = browser.elements(
      "//div[@id='ResultSetItems']//ul[@id='ListViewInner']//li[contains(@class,'sresult')]"
    );

    // console.log(gameTitles.value[0].getText());

    for (index = 0; index < gameTitles.value.length; ++index) {
      var gameHeading = gameTitles.value[index]
        .element("//h3[contains(@class,'lvtitle')]")
        .getText();

      var soldPrice = gameTitles.value[index]
        .element(
          "//ul[contains(@class,'lvprices')]//li[contains(@class,'lvprice')]//span"
        )
        .getText();

      soldPrice = soldPrice.replace("£", "");

      console.log(gameHeading);
      console.log(soldPrice);
      console.log("-------------------");

      databaseConnection.query(
        "insert into `sold-playstation-one-games` set `name` = '" +
          gameHeading +
          "', `description` = 'test description', `price-sold-for` = '" +
          soldPrice +
          "'"
      );

      browser.pause(2000);
    }

    var siteTitle = browser.getTitle();
    console.log(siteTitle);

    browser.saveScreenshot("./snapshot.png");
    // browser.saveElementScreenshot("crash.png", "#mainImgHldr #icImg");
    browser.pause(1000); // need this else below wont assert, still works just wont assert due to image taking time to save screenshot

    // // assert.equal(is_connected, "Connected!");
    // // });

    //////////////// end of web scraper ////////////////
  });
});
