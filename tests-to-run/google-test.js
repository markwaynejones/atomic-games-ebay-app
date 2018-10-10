// var TestHelperClass = require('../../helperClasses/testHelperClass.js')
var assert = require("assert");
var mysql = require("promise-mysql");

describe("simple google test", function() {
  it("should check that site title of webdriverio", function() {
    browser.setViewportSize({
      width: 1920,
      height: 1080
    });

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
        conn.end();
        return result;
      })
      .then(function(rows) {
        // Logs out a list of rows from database
        console.log(rows[0].name);
        assert.equal(rows[0].name, "mark test");
      });

    //////////////// end of mysql ////////////////

    //////////////// start of web scraper ////////////////

    // browser.url("https://www.ebay.co.uk/");

    // browser.pause(3000);

    // browser.setValue("#gh-ac", "crash bandicoot ps1");

    // browser.pause(2000);

    // browser.click("#gh-btn");

    // browser.pause(3000);

    // browser.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Platform')]/parent::span/parent::div/parent::div//span[text()='Sony PlayStation 1']"
    // );

    // browser.pause(3000);

    // browser.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Show only')]/parent::span/parent::div/parent::div//span[text()='Sold listings']"
    // );

    // browser.pause(3000);

    // browser.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Item location')]/parent::span/parent::div/parent::div//span[text()='UK Only']"
    // );

    // browser.pause(3000);

    // browser.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//span[text()='Good']"
    // );

    // browser.pause(3000);

    // browser.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//button[text()='see all']"
    // );

    // browser.pause(3000);

    // browser.click(
    //   "//div[@id='c_LH_ItemCondition']//label[contains(text(),'Very Good')]"
    // );

    // browser.pause(1000);

    // browser.click("//div[@class='cb']//input[contains(@class,'submit-btn')]");

    // browser.pause(5000);

    // var siteTitle = browser.getTitle();
    // console.log(siteTitle);

    // browser.saveScreenshot("./snapshot.png");
    // // browser.saveElementScreenshot("crash.png", "#mainImgHldr #icImg");
    // browser.pause(1000); // need this else below wont assert, still works just wont assert due to image taking time to save screenshot

    // assert.equal(is_connected, "Connected!");
    // });

    //////////////// end of web scraper ////////////////
  });
});
