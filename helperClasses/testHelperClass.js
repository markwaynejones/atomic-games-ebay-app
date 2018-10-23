module.exports = function TestHelperClass(browserClass) {
  this.screenshotNumber = 1;
  this.browserClass = browserClass;

  ///////////// start of my new functions /////////////

  this.searchForGame = function(gameTosearch, consoleToSearch) {
    console.log("Going to ebay.co.uk");
    this.browserClass.url("https://www.ebay.co.uk/");

    // may need a wait for visible here instead of pause()
    this.browserClass.pause(3000);

    var searchQuery = gameTosearch + " " + consoleToSearch;

    console.log("Searching for game: " + searchQuery);

    this.browserClass.setValue("#gh-ac", searchQuery);

    this.browserClass.pause(2000);

    this.browserClass.click("#gh-btn");

    console.log("Got to Results Page");

    // may need a wait for visible here
  };

  this.chooseFiltersInSidebar = function() {
    console.log("Choosing Filters in sidebar");

    this.tickFilterInSidebar("Platform", "Sony PlayStation 1");

    this.tickFilterInSidebar("Show only", "Sold listings");

    this.tickFilterInSidebar("Item location", "UK Only");

    this.tickFilterInSidebar("Condition", "Good");

    // this.browserClass.waitForVisible(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Platform')]/parent::span/parent::div/parent::div//span[text()='Sony PlayStation 1']"
    // );

    // this.browserClass.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Platform')]/parent::span/parent::div/parent::div//span[text()='Sony PlayStation 1']"
    // );

    // this.browserClass.waitForVisible(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Show only')]/parent::span/parent::div/parent::div//span[text()='Sold listings']"
    // );

    // this.browserClass.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Show only')]/parent::span/parent::div/parent::div//span[text()='Sold listings']"
    // );

    // console.log("got here 4");

    // this.browserClass.waitForVisible(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Item location')]/parent::span/parent::div/parent::div//span[text()='UK Only']"
    // );
    // this.browserClass.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Item location')]/parent::span/parent::div/parent::div//span[text()='UK Only']"
    // );

    // this.browserClass.waitForVisible(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//span[text()='Good']"
    // );

    // this.browserClass.click(
    //   "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//span[text()='Good']"
    // );

    this.browserClass.pause(5000);

    console.log(
      "Expanding filters in sidebar to choose more options (filters pop up window)"
    );

    this.browserClass.waitForVisible(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//button[text()='see all']"
    );
    this.browserClass.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Condition')]/parent::span/parent::div/parent::div//button[text()='see all']"
    );

    this.browserClass.waitForVisible(
      "//div[@id='c_LH_ItemCondition']//label[contains(text(),'Very Good')]"
    );

    this.browserClass.click(
      "//div[@id='c_LH_ItemCondition']//label[contains(text(),'Very Good')]"
    );

    this.browserClass.waitForVisible(
      "//div[@class='cb']//input[contains(@class,'submit-btn')]"
    );

    this.browserClass.click(
      "//div[@class='cb']//input[contains(@class,'submit-btn')]"
    );

    this.browserClass.waitForVisible(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Format')]/parent::span/parent::div/parent::div//span[text()='Auction']"
    );

    this.browserClass.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'Format')]/parent::span/parent::div/parent::div//span[text()='Auction']"
    );

    this.browserClass.pause(4000);
    console.log("Finished choosing filters in sidebar");
  };

  this.tickFilterInSidebar = function(category, filter) {
    this.browserClass.waitForVisible(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'" +
        category +
        "')]/parent::span/parent::div/parent::div//span[text()='" +
        filter +
        "']"
    );

    this.browserClass.click(
      "//div[@id='LeftNavContainer']//div[contains(@class,'pnl')]//span//h3[contains(text(),'" +
        category +
        "')]/parent::span/parent::div/parent::div//span[text()='" +
        filter +
        "']"
    );
  };

  this.getGameHeading = function(gameElement) {
    var gameHeading = gameElement
      .element("//h3[contains(@class,'lvtitle')]")
      .getText();

    console.log("Game heading: " + gameHeading);

    return gameHeading;
  };

  this.getGameURL = function(gameElement) {
    var gameURL = gameElement
      .element("//h3[contains(@class,'lvtitle')]//a")
      .getAttribute("href");

    console.log("Game URL: " + gameURL);

    return gameURL;
  };

  this.getSoldPrice = function(gameElement) {
    var soldPrice = gameElement
      .element(
        "//ul[contains(@class,'lvprices')]//li[contains(@class,'lvprice')]//span"
      )
      .getText();

    // remove pound sign as we only want the price in numbers when inserting into the DB
    soldPrice = soldPrice.replace("£", "");

    console.log("Game Sold Price: " + soldPrice);

    return soldPrice;
  };

  this.getPostageCost = function(gameElement) {
    var postageCost = gameElement
      .element(
        "//ul[contains(@class,'lvprices')]//li[contains(@class,'lvshipping')]//span//span"
      )
      .getText();

    postageCost = postageCost.trim();

    if (postageCost == "Free Postage") {
      postageCost = "0.00";
    } else {
      // keep only the numbers in the postage cost as thats all we want when storing in DB
      var regex = /\+|\£| postage/gi;
      postageCost = postageCost.replace(regex, "");
    }

    console.log("Postage Cost: " + postageCost);

    return postageCost;
  };

  this.getNumberOfBids = function(gameElement) {
    var numberOfBids = gameElement
      .element(
        "//ul[contains(@class,'lvprices')]//li[contains(@class,'lvformat')]//span"
      )
      .getText();

    // remove the word bid or bids as we only want to store the number of bids in the DB
    numberOfBids = numberOfBids.replace(" bids", "");
    numberOfBids = numberOfBids.replace(" bid", "");

    console.log("Number of Bids: " + numberOfBids);

    return numberOfBids;
  };

  this.getImageSrc = function(gameElement) {
    var imageSrc = gameElement
      .element("//div[contains(@class,'lvpic')]//img")
      .getAttribute("src");

    // get the large version of the thumbnail image
    largeImageSrc = imageSrc.replace("s-l225.jpg", "s-l1600.jpg");

    console.log("Image Source: " + largeImageSrc);

    return largeImageSrc;
  };

  this.getSoldDateTimestamp = function(gameElement) {
    var soldDate = gameElement
      .element(
        "//ul[contains(@class,'lvdetails')]//li[contains(@class,'timeleft')]//span[contains(@class,'tme')]//span"
      )
      .getText();

    // need to make year dynamic rather than hardcoded to 2018 eventually
    var soldDateTimestamp = this.toTimestamp(soldDate + " 2018");

    console.log("Sold Date: " + soldDate);
    console.log("Sold Date Timestamp: " + soldDateTimestamp);
    return soldDateTimestamp;
  };

  this.toTimestamp = function(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };

  this.checkIfWeShouldStoreGameInDB = function(gameHeading, gameToSearch) {
    var gameHeadingReplacedSpecialChars = gameHeading;

    var allPsoneGames = this.getAllPsoneGames();

    // loop through all playstation one games from big array found in this class
    for (var i = 0; i < allPsoneGames.length; i++) {
      var currentGame = allPsoneGames[i];

      // if currentGame == gameToSearch then skip current game (dont bother checking if its the game we are searching for)
      if (currentGame.toLowerCase() == gameToSearch.toLowerCase()) {
        continue;
      }

      currentGameLowerCase = currentGame.toLowerCase();
      gameHeadingReplacedSpecialCharsLowerCase = gameHeadingReplacedSpecialChars.toLowerCase();

      var currentGameAppearsInEbayTitle = gameHeadingReplacedSpecialCharsLowerCase.includes(
        currentGameLowerCase
      );

      // if the current game from A-Z array of games appear in this items title, then dont insert into db and move onto next ebay sold item/game
      if (currentGameAppearsInEbayTitle === true) {
        console.log(
          "Not inserting this game into DB as it has the following other game in its heading: " +
            currentGame
        );
        insertGameIntoDB = false;
        return insertGameIntoDB;
      } else {
        insertGameIntoDB = true;
      }
    }
    return insertGameIntoDB;
  };

  this.getAllPsoneGames = function() {
    // replaced characters
    /*
  
      ,
      :
      (
      )
      *
      '
      also replaced two spaces with one space
  
    */

    var allGames = [
      "007 Racing",
      "007 Tomorrow Never Dies",
      "1 on 1",
      "101 Dalmations II Patch s London Adventure",
      "102 Dalmatians Puppies to the Rescue",
      "2002 FIFA World Cup",
      "2Xtreme",
      "360",
      "3D Baseball",
      "3D Lemmings",
      "3Xtreme",
      "40 Winks",
      "4 4 2 Soccer",
      "5 Star Racing",
      "A Bug s Life",
      "A Train",
      "AbalaBurn",
      "Aces of the Air",
      "Aconcagua",
      "Action Bass",
      "Action Man",
      "Action Man Mission Xtreme",
      "Activision Classics",
      "Actua Golf",
      "Actua Golf 2",
      "Actua Golf 3",
      "Actua Ice Hockey",
      "Actua Pool",
      "Actua Soccer",
      "Actua Soccer 2",
      "Actua Soccer 3",
      "Actua Soccer Club Edition",
      "Actua Tennis",
      "Adidas Power Soccer",
      "Adidas Power Soccer 2",
      "Adidas Power Soccer  97",
      "Adidas Power Soccer 98",
      "Advan Racing",
      "Advanced V.G.",
      "Advanced V.G. 2",
      "Agent Armstrong",
      "Agile Warrior",
      "Agile Warrior F 111X",
      "Air Combat Ace Combat in Japan ",
      "Ace Combat 2",
      "Ace Combat 3 Electrosphere",
      "Air Hockey",
      "Air Race",
      "Aironauts",
      "Akuji The Heartless",
      "Aladdin in Nasira s Revenge",
      "Alex Ferguson s Player Manager 2001",
      "Alexi Lalas International Soccer",
      "Alien Resurrection",
      "Alien Trilogy",
      "All Japan Woman Pro Wrestling",
      "All Star 1997 featuring Frank Thomas",
      "All Star Slammin  D ball",
      "All Star Tennis",
      "All Star Tennis  99",
      "All Star Watersports",
      "Allied General",
      "Alone in the Dark Jack Is Back",
      "Alone in the Dark One Eyed Jack s Revenge",
      "Alone in the Dark The New Nightmare",
      "Alundra",
      "Alundra 2",
      "The Amazing Virtual Sea Monkeys",
      "American Deer Hunter",
      "American Pool",
      "Amerzone",
      "Andretti Racing",
      "Angel Blade Neo Tokyo Guardians",
      "Angel Eyes",
      "Angel Graffiti Anathe no Profile",
      "Animaniacs Ten Pin Alley",
      "Anime Chick Story 1 Card Captor Sakura",
      "Animorphs Shattered Reality",
      "Ape Escape",
      "Apocalypse",
      "Aqua GT",
      "Aquanauts Holiday",
      "Aquanauts Holiday Memories of Summer 1996",
      "Arc the Lad",
      "Arc the Lad II",
      "Arc the Lad III",
      "Arc the Lad Collection",
      "Arc the Lad Monster Game with Casino Game",
      "Arcade Party Pack",
      "Arcade Party Pak",
      "Arcade s Greatest Hits Atari Collection 1",
      "Arcade s Greatest Hits Atari Collection 2",
      "Arcade s Greatest Hits Midway Collection 2",
      "Area 51",
      "Ark of Time",
      "Arkanoid Returns",
      "Armored Core",
      "Armored Core Master of Arena",
      "Armored Core Project Phantasma",
      "Armored Trooper Vatams Lightning Slash",
      "Armorines Project S.W.A.R.M.",
      "Army Men 3D",
      "Army Men Air Attack",
      "Army Men Air Attack 2",
      "Army Men Green Rogue",
      "Army Men Land Sea Air",
      "Army Men Lock  n  Load",
      "Army Men Omega Soldier",
      "Army Men Operation Meltdown",
      "Army Men Sarge s Heroes",
      "Army Men Sarge s Heroes 2",
      "Army Men Team Assault",
      "Army Men World War",
      "Army Men World War   Final Front",
      "Army Men World War   Land Sea Air",
      "Arthur! Ready to Race",
      "Assault",
      "Assault Rigs",
      "Assault Retribution",
      "Asterix",
      "Asteroids",
      "Asuka 120% Burning Fest. Final",
      "Asuka 120% Excellent Burning Festival",
      "Asuka 120% Special Burning Fest",
      "Atari Anniversary Edition",
      "Atari Anniversary Edition Redux",
      "Atelier Marie",
      "Athena Awakening From The Ordinary Life",
      "Atlantis The Lost Empire",
      "Atlantis The Lost Tales",
      "Attack of the Saucerman!",
      "ATV Mania",
      "ATV Quad Power Racing",
      "ATV Racers",
      "AubirdForce",
      "Austin Powers Pinball",
      "Auto Destruct",
      "Ayrton Senna Kart Duel 2",
      "Azito 2",
      "Azure Dreams Konami ",
      "B Movie",
      "Baby Universe",
      "Backguiner Yomigaeru Yuushatachi Guiner Tenshou Japan only",
      "Backguiner ACT 2 Yomigaeru Yuushatachi~ Hishou Hen Uragiri no Senjou Japan only",
      "Backstreet Billiards",
      "Backyard Football",
      "Backyard Soccer",
      "Bakuretsu Hunter Mahjong Special",
      "Bakusou Dekotora Densetsu Art Truck Battle",
      "Bakusou Kyoudai Let s & Go! Eternal Wings",
      "Baldies",
      "Baldy Land",
      "Ball Breakers",
      "Ballblazer Champions",
      "Ballerburg",
      "Ballistic",
      "Barbie Explorer",
      "Barbie Race and Ride",
      "Barbie Super Sports",
      "Barbie Gotta Have Games",
      "Baroque",
      "Baseball 2000",
      "Bases Loaded  96",
      "Bass Hunter",
      "Bass Landing",
      "Bass Rise",
      "Bastard!! Japan only ",
      "Batman & Robin",
      "Batman Beyond Return of the Joker",
      "Batman Forever The Arcade Game",
      "Batman Gotham City Racer",
      "Battle Arena Toshinden",
      "Battle Arena Toshinden 2",
      "Battle Arena Toshinden 2 Plus",
      "Battle Arena Toshinden 3",
      "Battle Hunter",
      "BattleSport",
      "Battlestations",
      "Battletanx Global Assault",
      "Beach Volleyball",
      "Beast Wars",
      "Beast Wars Transformers",
      "Beatmania",
      "Beatmania Append 3rd Mix Japan only ",
      "Beatmania Append 4th Mix Japan only ",
      "Beatmania Append 5th Mix Japan only ",
      "Beatmania Append 5th Mix Time To Get Down",
      "Beatmania Append Club Mix Japan only ",
      "Beatmania Append Gottamix Japan only ",
      "Beatmania Append Gottamix 2   Going Global Japan only ",
      "Beatmania 2nd Mix Japan only ",
      "Beatmania 6th Mix Plus Core Mix|Beatmania 6th Mix + Core Mix Japan only ",
      "Beatmania Best Hits Japan only ",
      "Beatmania   The Sound of Tokyo Japan only ",
      "Beat Planet Music",
      "Bedlam",
      "Beyblade",
      "Beyond the Beyond",
      "Big Air",
      "Big Air Snowboarding",
      "Big Bass Fishing",
      "Big Bass World Championship",
      "Big Hurt Baseball",
      "Big League Slugger Baseball",
      "Big Ol  Bass 2",
      "Big Strike Bowling",
      "Billiards",
      "Bio F.R.E.A.K.S. Midway Games ",
      "Bishi Bashi Special Japan only ",
      "Bishi Bashi Special PAL  PAL release containing both Bishi Bashi Special 1 and 2 ",
      "Bishi Bashi Special 2 Japan only ",
      "Bishi Bashi Special 3 Step Champ Japan only ",
      "Bishoujo Senshi Sailor Moon Super S",
      "Black & White cancelled ",
      "Black/Matrix Cross",
      "Black Bass with Blue Marlin",
      "Black Dawn",
      "Blade",
      "Blade 2",
      "Blades of Blood Samurai Shodown III",
      "Blast Chamber",
      "Blast Lacrosse",
      "Blast Radius",
      "Blaster Master",
      "Blaster Master Blasting Again",
      "Blasto",
      "Blaze & Blade",
      "Blaze & Blade Eternal Quest",
      "Blazing Dragons",
      "Block Buster",
      "Blockids",
      "Blood Lines",
      "Blood Omen Legacy of Kain",
      "Bloody Roar",
      "Bloody Roar 2",
      "Blue Breaker",
      "Blue Legend of Water",
      "Blue s Big Musical",
      "Board Game Top Shop",
      "Bob the Builder Can We Fix It?",
      "Bogey Dead 6",
      "Boku no Natsuyasumi",
      "Bokujou Monogatari Harvest Moon for Girls",
      "Bomberman",
      "Bomberman Fantasy Race",
      "Bomberman Party Edition",
      "Bomberman Wars",
      "Bomberman World",
      "The Bombing Islands",
      "Boombots",
      "Bottom of the 9th",
      "Bottom of the 9th  97",
      "Bottom of the 9th  99",
      "Bounty Hunter Sara",
      "Bowling",
      "Boxing",
      "BRAHMA Force The Assault on Beltlogger 9",
      "Brain Dead 13",
      "Bratz",
      "Brave Charge Box Japan only ",
      "Brave Fencer Musashi Brave Fencer Musashiden in Japan ",
      "Brave Prove",
      "Bravo Air Race",
      "Breakout",
      "Break Point Tennis",
      "Breakpoint",
      "Breath of Fire III",
      "Breath of Fire IV",
      "Brian Lara Cricket",
      "Brigandine Legend of Forsena",
      "Broken Helix",
      "Broken Sword Shadow of the Templars",
      "Broken Sword II The Smoking Mirror",
      "Brunswick Circuit Pro Bowling",
      "Brunswick Circuit Pro Bowling 2",
      "Bubble Bobble featuring Rainbow Islands",
      "Bubsy 3D",
      "Bug Riders",
      "Buggy",
      "Bugs Bunny Lost in Time",
      "Bugs Bunny & Taz Time Busters",
      "Builder s Block",
      "Burning Road",
      "Burstrick",
      "Burstrick Wake Boarding!!",
      "Bushido Blade",
      "Bushido Blade 2",
      "Bust a Groove Bust a Move in Japan ",
      "Bust a Groove 2 Bust a Move 2 in Japan ",
      "Bust A Move 2 Puzzle Bobble 2 in Japan ",
      "Bust A Move 2 Arcade Edition",
      "Bust A Move 4 Puzzle Bobble 4 in Japan ",
      "Bust A Move 99 Puzzle Bobble 3 in Japan ",
      "Buster Bros. Collection",
      "Buzz Lightyear of Star Command",
      "C The Contra Adventure",
      "C 12 Final Resistance",
      "Caesar s Palace 2000 Millennium Gold Edition",
      "Caesar s Palace II",
      "Capcom Generations 4 CDs with 13 classic games ",
      "Capcom vs SNK Pro",
      "Captain Tsubasa Eikou no Kiseki Japan only ",
      "Captain Tsubasa Aratanaru Densetsu Joshou Japan only ",
      "Captain Tsubasa J Get in the Tomorrow Japan only ",
      "Card Games",
      "Card Shark",
      "Cardcaptor Sakura Japan only ",
      "Cardinal SYN",
      "Carmageddon",
      "Carnage Heart",
      "CART World Series",
      "Casper Friends Around the World",
      "Castlevania Chronicles Castlevania Chronicle Akumajou Dracula in Japan ",
      "Castlevania Symphony of the Night Akumajou Dracula X Nocturne in the Moonlight in Japan ",
      "Catan   Die erste Insel German ",
      "Castrol Honda Superbike",
      "Celebrity Deathmatch",
      "Centipede",
      "Championship Bass",
      "Championship Manager Quiz",
      "Championship Motocross featuring Ricky Carmichael",
      "Championship Motocross 2001 featuring Ricky Carmichael",
      "Championship Surfer",
      "Chase the Express",
      "Chessmaster II",
      "Chicken Run",
      "Chill",
      "Choaniki Japan only ",
      "Chocobo Racing",
      "Chocobo s Mysterious Dungeon",
      "Chocobo s Mysterious Dungeon 2",
      "Chris Kamara s Street Soccer",
      "Chrono Cross",
      "Circuit Breakers",
      "The City of Lost Children",
      "Civilization II",
      "Clock Tower",
      "Clock Tower The First Fear Japan only ",
      "Clock Tower II The Struggle Within",
      "Codename Tenka",
      "Colin McRae 2.0",
      "Colin McRae Rally",
      "Colony Wars",
      "Colony Wars Red Sun",
      "Colony Wars Vengeance",
      "Command & Conquer",
      "Command & Conquer Red Alert",
      "Command & Conquer Red Alert   Retaliation",
      "Contender",
      "Contender 2",
      "Contra Legacy of War",
      "Convenience Store Manager Aka. The Conveni   Japan SLPS00782",
      "Convenience Store Manager 2 Aka. The Conveni 2   Japan SLPS01146",
      "Cool Boarders",
      "Cool Boarders 2",
      "Cool Boarders 3",
      "Cool Boarders 4",
      "Cool Boarders 2001",
      "Countdown Vampires",
      "Courier Crisis",
      "Covert Ops Nuclear Dawn",
      "Crash Bandicoot",
      "Crash Bandicoot 2",
      "Crash Bandicoot The Wrath of Cortex",
      "Crash Bandicoot 3",
      "Crash Bandicoot Warped",
      "Crash Bash",
      "Crash Team Racing",
      "Cricket 2000",
      "Crime Killer",
      "Crisis Beat",
      "Critical Depth",
      "Croc Legend of the Gobbos",
      "Croc 2",
      "Crossroad Crisis",
      "Crusaders of Might and Magic",
      "Cyber Daisenryaku Shutsugeki! Haruka tai Japan only ",
      "Cyberia",
      "CyberTiger",
      "Dance Dance Revolution",
      "Dance Dance Revolution 3rdMIX Japan only ",
      "Dance Dance Revolution 4thMIX Japan only ",
      "Dance Dance Revolution 5thMIX Japan only ",
      "Dance Dance Revolution Disney Mix Dance Dance Revolution Disney s Rave in Japan ",
      "Dance Dance Revoution Extra Mix Japan only ",
      "Dance Dance Revolution Konamix",
      "Dancing Blade Katteni Momotenshi! Japan only ",
      "Dancing Blade Katteni Momotenshi II ~Tears of Eden~ Japan only ",
      "Dancing Stage presents Dreams Come True Japan only ",
      "Dancing Stage presents True Kiss Destination Japan only ",
      "Dancing Stage Fever",
      "Dance UK Europe only ",
      "Danger Girls",
      "Darius Gaiden",
      "Dark Omen",
      "Darklight Conflict",
      "Darkstalkers",
      "Darkstalkers 3",
      "Darkstone",
      "Dave Mirra Freestyle BMX",
      "Dave Mirra Freestyle BMX Maximum Remix",
      "Dead Ball Zone",
      "David Beckham Soccer",
      "Dead in the Water",
      "Dead or Alive",
      "Deathtrap Dungeon",
      "Deception III Dark Delusion",
      "Delta Force Urban Warfare",
      "Delta Force Urban Warrior",
      "Demolition Racer",
      "Densha de go! Taito   Japan SLPS01150",
      "Densha de go! 2 Taito   Japan SLPM86141",
      "Descent 2",
      "Destrega",
      "Destruction Derby",
      "Destruction Derby 2",
      "Destruction Derby Raw",
      "Detana TwinBee Yahho ! Deluxe Pack Japan only ",
      "Devil Dice",
      "Dexter s Laboratory Mandark s Lab?",
      "Diablo",
      "Die Hard Trilogy",
      "Die Hard Trilogy 2",
      "Die Hard Trilogy Viva Las Vegas",
      "Digimon Digital Card Battle",
      "Digimon Rumble Arena",
      "Digimon World",
      "Digimon World 2",
      "Digimon World 3",
      "Digitalglider Airman Aka. Dejitaru guraidaa ea man   Japan SLPS02276",
      "Dino Crisis",
      "Dino Crisis 2",
      "Discworld",
      "Discworld Vermutlich vermisst",
      "Discworld Noir",
      "Disney s Dinosaur",
      "Disney s Donald Duck Goin  Quackers Donald Duck Quack Attack in Europe ",
      "Disney s Mulan Story Studio",
      "Disney s Peter Pan Adventures in Never Land",
      "Disney s Toy Story 2",
      "Disney s Treasure Planet",
      "Disruptor",
      "Diver s Dream",
      "Doom",
      "Downhill Mountain Bike Racing",
      "Dracula The Last Sanctuary",
      "Dracula The Resurrection",
      "Dragon Ball Final Bout",
      "Dragon Ball GT Final Bout",
      "Dragon Ball Z Legends JP ",
      "Dragon Ball Z Ultimate Battle 22",
      "Dragonseeds",
      "Dragon Knights Glorious Japan only ",
      "Dragon Tales Dragon Seek",
      "Dragon Valor",
      "Dragon Warrior VII",
      "Dreams",
      "Driver",
      "Driver 2",
      "Ducati World Championship Racing",
      "Duke Nukem",
      "Duke Nukem Land of the Babes",
      "Duke Nukem Time to Kill",
      "Duke Nukem Total Meltdown",
      "Dukes of Hazzard",
      "Dukes of Hazard II Daisy Dukes it Out",
      "Dune",
      "Dune 2000",
      "Dynasty Warriors",
      "EA Sports Supercross",
      "Eagle One Harrier Attack",
      "Earthworm Jim 2",
      "Echo Night",
      "Echo Night 2",
      "ECW Anarchy Rulz",
      "ECW Hardcore Revolution",
      "Ehrgeiz",
      "Einhänder",
      "Eithea Japan only ",
      "Elemental Gearbolt",
      "Elemental Pinball",
      "Eliminator",
      "The Emperor s New Groove",
      "Epidemic",
      "ESPN Extreme Games called 1Xtreme on Greatest Hits release ",
      "ESPN Extreme Games 2",
      "ESPN MLS GameNight",
      "E.T. the Extra Terrestrial Interplanetary Mission",
      "Eternal Eyes",
      "European Super League",
      "Everybody s Golf",
      "Everybody s Golf 2",
      "Evil Dead Hail to the King",
      "Evil Zone Eretzvaju in Japan ",
      "Excalibur 2555 A.D.",
      "Exhumed",
      "Expendable",
      "Extreme Ghostbusters",
      "F1 2000",
      "F1 Championship Season 2000",
      "F1 Racing Championship",
      "F1 World Grand Prix",
      "FA Premier League Stars",
      "Fade To Black",
      "Family Feud",
      "Family Game Pack",
      "Fantastic Four",
      "Farland Saga Japan only ",
      "Farland Story Yottsu no Fuuin Japan only ",
      "Fatal Fury Wild Ambition",
      "Fear Effect",
      "Fear Effect 2 Retro Helix",
      "Felony 11 79",
      "FIFA 96",
      "FIFA 97",
      "FIFA 98",
      "FIFA 98 Road To World Cup",
      "FIFA 99",
      "FIFA 2000",
      "FIFA 2001 Major League Soccer",
      "FIFA 2002",
      "The Fifth Element",
      "Fighter Maker",
      "Fighting Force",
      "Fighting Force 2",
      "Final Doom",
      "Final Fantasy VI",
      "Final Fantasy VII",
      "Final Fantasy VII International",
      "Final Fantasy VIII",
      "Final Fantasy IX",
      "Final Fantasy Anthology",
      "Final Fantasy Chronicles",
      "Final Fantasy Origins",
      "Final Fantasy Tactics",
      "Fire ProWrestling G Japan only ",
      "Firebugs",
      "Firestorm Thunderhawk 2",
      "Fisherman s Bait",
      "Fisherman s Bait 2 Big Ol  Bass",
      "Fisherman s Bait 3",
      "Fist of the North Star Japan only ",
      "Flintstones Bedrock Bowling",
      "Fluid",
      "Football Manager 2000",
      "Ford Racing",
      "Formula Nippon",
      "Formula 1  97",
      "Formula 1  98",
      "Formula One",
      "Formula One Arcade",
      "Formula One 2000",
      "Formula One 2001",
      "Formula One  99",
      "Forsaken",
      "Fox Sports Gold  99",
      "Fox Sports Soccer  99",
      "Freestyle Boardin   99",
      "Freestyle Motocross McGrath vs. Pastrana",
      "Frogger",
      "Frogger 2 Swampy s Revenge",
      "Front Mission 2 Japan only ",
      "Front Mission 3",
      "Future Cop L.A.P.D.",
      "Galaga Destination Earth",
      "Galaxy Fraulein Yuna Final Edition Japan only ",
      "Galerians",
      "Gallop Racer",
      "Ganbare Goemon Uchukaizoku Akogingu Japan only ",
      "Ganbare Goemon! Kuranarakoi! Ayashigeikka no Kuroikage Japan only ",
      "Gatekeepers Japan only ",
      "Gauntlet Legends",
      "G Darius",
      "Gekido",
      "Gekioh Shooting King",
      "Gex",
      "Gex Deep Cover Gecko",
      "Gex Enter the Gecko",
      "Ghost in the Shell",
      "Glover",
      "Gold and Glory The Road to El Dorado",
      "Golden Nugget",
      "Gokujou Parodius da! Deluxe Pack Japan only ",
      "G Police",
      "G Police Weapons of Justice",
      "Gradius Deluxe Pack Japan only ",
      "Gradius Gaiden Japan only ",
      "Gran Turismo",
      "Gran Turismo 2",
      "Grand Theft Auto",
      "Grand Theft Auto 2",
      "Grand Theft Auto London 1969",
      "Grand Tour Racing  98",
      "Grandia",
      "Granstream Saga",
      "The Grinch",
      "Grind Session",
      "Growlanser Japan only ",
      "Grudge Warriors",
      "Guardian s Crusade",
      "Gubble",
      "Guilty Gear",
      "GuitarFreaks Japan only ",
      "GuitarFreaks Append 2nd Mix Japan only ",
      "Gunbird Japan & Europe only Mobile Light Force in Europe ",
      "Gundam Battle Assault 2",
      "Gunfighter The Legend of Jesse James",
      "Hardball  99",
      "Hardcore 4x4",
      "Harry Potter and the Chamber of Secrets",
      "Harry Potter and the Sorcerer s Stone",
      "Harukaze Sentai V Force Japan only ",
      "Harvest Moon Back To Nature",
      "HBO Boxing",
      "Heart of Darkness",
      "Hell Night",
      "Hello Kitty s Cube Frenzy",
      "Hello Kitty Cute de Cute Japan only ",
      "Herc s Adventures",
      "Hercules Action Game",
      "HeXen",
      "Hidden and Dangerous",
      "High Heat Baseball 2000",
      "High Heat Major League Baseball 2002",
      "Hogs of War",
      "Hooters Road Trip",
      "Hoshigami Ruining Blue Earth",
      "Hot Shots Golf",
      "Hot Shots Golf 2",
      "Hot Wheels Turbo Racing",
      "Hugo",
      "Hugo 2",
      "Hunchback of Notre Dame",
      "Hunter X Hunter Ubawareta Aura Stone Japan only ",
      "Hydro Thunder",
      "IHRA Drag Racing",
      "In Cold Blood",
      "Incredible Crisis",
      "Incredible Hulk",
      "The Incredibles Rise of the Underminer",
      "Initial D Japan only ",
      "Inspector Gadget Gadget s Crazy Crisis",
      "Intelligent Qube",
      "Intellivision Classic Games",
      "International Superstar Soccer",
      "International Superstar Soccer  98",
      "International Track & Field",
      "International Track & Field 2",
      "International Track & Field 2000",
      "InuYasha",
      "Invasion from Beyond",
      "Iron and Blood",
      "Iron Soldier 3",
      "Irritating Stick",
      "ISS Pro",
      "ISS Pro Evolution",
      "The Italian Job",
      "J s Racing",
      "Jackie Chan s Stuntmaster",
      "Jade Cocoon",
      "Jade Cocoon Story of Tamamayu",
      "JamPack Fall 2001",
      "JamPack Summer 2000",
      "JamPack Volume 2",
      "JamPack Winter 2000",
      "Jarret & LaBonte Stock Car Racing",
      "Jeanette Lee s Virtual Pool",
      "Jeff Gordon XS Racing",
      "Jeff Wayne s War of the Worlds",
      "Jeopardy!",
      "Jeopardy! 2",
      "Jeopardy! 2nd Edition",
      "Jeremy McGrath Supercross  98",
      "Jeremy McGrath Supercross 2000",
      "Jersey Devil",
      "Jet Moto",
      "Jet Moto 2",
      "Jet Moto 3",
      "Jet Racer",
      "Jet Rider",
      "JGTC All Japan Grand Touring Car Championship",
      "Jigsaw Madness",
      "Jikkyou American Baseball",
      "Jikkyou Oshaberi Parodius Forever With Me Japan only ",
      "Jimmy Johnson VR Football",
      "Jimmy Johnson VR Football  98",
      "Jimmy White s Cue Ball 2",
      "Jingle Cats",
      "Jinx",
      "J League Jikkyou Winning Eleven 2000",
      "J League Winning Eleven 3",
      "J League Winning Eleven  97",
      "J League Winning Eleven  98  99",
      "JoJo s Bizarre Adventure",
      "Johnny Bazookatone",
      "Jonah Lomu Rugby",
      "Judge Dredd",
      "Juggernaut",
      "Jumping Flash!",
      "Jumping Flash! 2",
      "JumpStart Wildlife Safari Field Trip",
      "Jungle Book",
      "Jungle Book Groove Party",
      "Jungle Book Rhythm N Groove",
      "Jupiter Strike",
      "Jurassic Park The Lost Word",
      "K 1 Grand Prix",
      "K 1 Revenge",
      "Kagero Deception 2",
      "Kamen Rider Kuuga Japan only ",
      "Kartia World of Fate",
      "Kekkon ~Marriage~ Japan only ",
      "Kensei Sacred Fist",
      "Kickboxing",
      "Kileak The Blood",
      "Kileak The DNA Imperative",
      "Killer Loop",
      "King of Bowling 2",
      "The King of Fighters  95",
      "The King of Fighters  97",
      "The King of Fighters  98",
      "The King of Fighters  99",
      "The King of Fighters  99 Millennium Battle",
      "The King of Fighters Kyo",
      "King s Field",
      "King s Field II",
      "KISS Pinball",
      "Kisetsu wo Dakishimete Japan only ",
      "Klonoa Door To Phantomile",
      "Klonoa Beach Volleyball",
      "Knockout Kings",
      "Knockout Kings 99",
      "Knockout Kings 2000",
      "Knockout Kings 2001",
      "Konami Antiques MSX Collection Vol.1 Japan only ",
      "Konami Arcade Classics",
      "Kotobuki Grand Prix",
      "Koudelka",
      "Krazy Ivan",
      "Kula World",
      "Kurt Warner s Arena Football Unleashed",
      "Kurushi",
      "Lagnacure Japan only ",
      "The Land Before Time Great Valley Racing",
      "The Land Before Time Return to Great Valley",
      "Land Maker",
      "Largo Winch .//Commando Sar",
      "The Last Blade",
      "Le Mans 24 Hours",
      "Legacy of Kain Soul Reaver",
      "Legend",
      "The Legend of Dragoon",
      "Legend of Kartia",
      "Legend of Legaia",
      "Legend of Mana",
      "Lego Island 2 The Brickster s Revenge",
      "Lego Rock Raiders",
      "Lemmings",
      "3D Lemmings",
      "Libero Grande",
      "Lilo & Stitch Trouble in Paradise",
      "Linda Cube Again Japan only ",
      "The Lion King Simba s Mighty Adventure",
      "The Little Mermaid II",
      "Livewire",
      "LMA Manager",
      "LMA Manager 2001",
      "LMA Manager 2002",
      "Loaded",
      "Lode Runner",
      "Lomax in Lemmingland",
      "Looney Tunes Racing",
      "Looney Tunes Sheep Raider",
      "The Lost World Jurassic Park",
      "Lucky Luke",
      "Lunar Silver Star Story Complete",
      "Lunar 2 Eternal Blue Complete",
      "Machine Head",
      "Madden NFL 98",
      "Madden NFL 99",
      "Madden NFL 2000",
      "Madden NFL 2001",
      "Madden NFL 2002",
      "Madden NFL 2003",
      "Madden NFL 2004",
      "Madden NFL 2005",
      "The Maestromusic Japan only ",
      "The Maestromusic Christmas Edition Japan only ",
      "The Maestromusic Encore Japan only ",
      "Magic The Gathering Battlemage",
      "Magic Carpet",
      "Major League Baseball 98",
      "Major League Baseball 99",
      "Major League Baseball 2000",
      "Major League Baseball 2001",
      "Major League Baseball 2002",
      "Major League Baseball 2003",
      "Major League Baseball 2004",
      "Major League Baseball Bottom of the 9th 99",
      "Marble Master",
      "Martial Beat Japan only ",
      "Martial Beat 2 Japan only ",
      "Martian Gothic Unification",
      "Marvel Super Heroes",
      "Marvel Super Heroes vs. Street Fighter",
      "Marvel vs. Capcom EX",
      "Mary Kate and Ashley Magical Mystery Mall",
      "Mary Kate and Ashley Winner s Circle",
      "Mass Destruction",
      "Master of Monsters Disciples of Gaia",
      "Matt Hoffman s Pro BMX",
      "Maximum Force",
      "MDK",
      "Mechwarrior 2",
      "Medal of Honor",
      "Medal of Honor Underground",
      "MediEvil",
      "MediEvil II",
      "Mega Man 8 Rockman 8 in Japan ",
      "Mega Man Battle and Chase",
      "Mega Man Legends Rockman Legends in Japan ",
      "Mega Man Legends 2 Rockman Legends 2 in Japan ",
      "Mega Man X4 Rockman X4 in Japan ",
      "Mega Man X5 Rockman X5 in Japan ",
      "Mega Man X6 Rockman X6 in Japan ",
      "Memories Off Japan only ",
      "Men In Black The Game",
      "Men In Black   The Series Crashdown",
      "Metal Gear Solid",
      "Metal Gear Solid Integral Japan only ",
      "Metal Gear Solid VR Missions",
      "Metal Slug Japan only ",
      "Metal Slug X",
      "Michael Owen s WLS 99",
      "Micro Machines",
      "Micro Maniacs",
      "Midnight In Vegas",
      "Mike Tyson Boxing",
      "Millennium Soldier Expendable",
      "The Misadventures of Tron Bonne",
      "Miss Spider s Tea Party",
      "Missile Command",
      "Mission Impossible",
      "Mitsumete Knight Japan only ",
      "Mitsumete Knight R Daibouken hen Japan only ",
      "M&Ms   Shell Shocked",
      "Mobil 1 Rally Championship",
      "Mobile Armor",
      "Mobile Light Force",
      "Moho",
      "Monaco Grand Prix",
      "Monkey Hero",
      "Monkey Magic",
      "Monopoly",
      "Monster Bass!",
      "Monster Rancher",
      "Monster Rancher 2",
      "Monster Rancher Battle Card Episode II",
      "Monster Rancher Hop A Bout",
      "Monster Seed",
      "Monsters Inc.",
      "Mortal Kombat 2",
      "Mortal Kombat 3",
      "Mortal Kombat 4",
      "Mortal Kombat Mythologies Sub Zero",
      "Mortal Kombat Special Forces",
      "Mortal Kombat Trilogy",
      "Mort the Chicken",
      "Moto Racer",
      "Moto Racer 2",
      "Moto Racer World Tour",
      "Motocross Mania",
      "Motor Toon GP 2",
      "Motorhead",
      "Mr. Domino",
      "Mr. Driller G",
      "Mr. Driller G Japan only ",
      "Ms. Pac Man Maze Madness",
      "MTV Music Generator",
      "MTV Sports Pure Ride",
      "MTV Sports Skateboarding featuring Andy MacDonald",
      "The Mummy",
      "Muppet Monster Adventure",
      "Muppet Race Mania",
      "Music",
      "Music 2000",
      "My Disney Kitchen",
      "Myst",
      "N20",
      "Nagano Winter Olympics 98",
      "NAMCO Museum Vol. 1",
      "NAMCO Museum Vol. 2",
      "NAMCO Museum Vol. 3",
      "NAMCO Museum Vol. 4",
      "NAMCO Museum Vol. 5",
      "NAMCO Smash Court Tennis",
      "Naruto Shinobi no Sato no Jintori Kassen",
      "NASCAR 98",
      "NASCAR 99",
      "NASCAR 2000",
      "NASCAR 2001",
      "NASCAR Heat",
      "NASCAR Rumble",
      "NASCAR Thunder 2002",
      "NBA Basketball 2000",
      "NBA Fastbreak 98",
      "NBA Hoopz",
      "NBA In the Zone 98",
      "NBA In the Zone 99",
      "NBA In the Zone 2000",
      "NBA Jam Extreme",
      "NBA Jam Tournament Edition",
      "NBA Live 97",
      "NBA Live 98",
      "NBA Live 99",
      "NBA Live 2000",
      "NBA Live 2001",
      "NBA Live 2002",
      "NBA Live 2003",
      "NBA Pro 98",
      "NBA ShootOut 98",
      "NBA ShootOut 2000",
      "NBA ShootOut 2001",
      "NBA ShootOut 2002",
      "NBA ShootOut 2003",
      "NBA Showtime NBA on NBC",
      "NBA Tonight",
      "NCAA Final Four 99",
      "NCAA Final Four 2000",
      "NCAA Final Four 2001",
      "NCAA Football 98",
      "NCAA Football 99",
      "NCAA Football 2000",
      "NCAA Football 2001",
      "NCAA Gamebreaker 98",
      "NCAA Gamebreaker 99",
      "NCAA Gamebreaker 2000",
      "NCAA Gamebreaker 2001",
      "NCAA March Madness 98",
      "NCAA March Madness 2000",
      "NCAA March Madness 2001",
      "Nectaris Military Madness",
      "Need for Speed",
      "Need for Speed II",
      "Need for Speed 3 Hot Pursuit",
      "Need for Speed 5",
      "Need for Speed High Stakes",
      "Need for Speed Porsche 2000",
      "Need for Speed Porsche Unleashed",
      "Need for Speed Road Challenge",
      "Need for Speed V Rally",
      "Need for Speed V Rally 2",
      "Newman/Haas Racing",
      "The Next Tetris",
      "NFL Blitz",
      "NFL Blitz 2000",
      "NFL Blitz 2001",
      "NFL Gameday",
      "NFL Gameday 98",
      "NFL Gameday 99",
      "NFL Gameday 2000",
      "NFL Gameday 2001",
      "NFL Gameday 2002",
      "NFL Gameday 2003",
      "NFL Xtreme",
      "NFL Xtreme 2",
      "N.GEN Racing",
      "NHL 98",
      "NHL 99",
      "NHL 2000",
      "NHL 2001",
      "NHL Blades of Steel 2000",
      "NHL Breakaway 98",
      "NHL Championship 2000",
      "NHL Faceoff 98",
      "NHL Faceoff 99",
      "NHL Faceoff 2000",
      "NHL Faceoff 2001",
      "NHL Rock the Rink",
      "Nick Toons Racing",
      "Nightmare Creatures",
      "Nightmare Creatures II",
      "Ninja Shadow of Darkness",
      "No One Can Stop Mr. Domino!",
      "Novastorm",
      "Nuclear Strike",
      "O.D.T.",
      "Oddworld Abe s Exoddus",
      "Oddworld Abe s Oddysee",
      "Ogre Battle March of the Black Queen",
      "Ojyousama Express Japan only ",
      "Olympic Summer Games",
      "Omega Boost",
      "One",
      "One Piece Mansion",
      "Onside Soccer",
      "Overblood",
      "Overblood 2",
      "Overboard",
      "Pac Man World",
      "Pajama Sam",
      "Pandemonium",
      "Pandemonium 2",
      "Panzer Front",
      "Panzer General",
      "Paradise Casino",
      "PaRappa the Rapper",
      "Parasite Eve",
      "Parasite Eve II",
      "Paro Wars Japan only ",
      "Patriotic Pinball",
      "Perfect Assassin",
      "Perfect Weapon",
      "Persona",
      "Persona 2 Eternal Punishment",
      "Pet In TV",
      "Peter Jacobsen s Golden Tee Golf",
      "PGA Tour 96",
      "PGA Tour 97",
      "PGA Tour 98",
      "Pinball Power",
      "Pinobee",
      "Pipe Dreams 3D",
      "Pitfall 3D Beyond the Jungle",
      "Planet of the Apes",
      "Play with the Teletubbies",
      "Pocket Fighter",
      "PO d",
      "Point Blank",
      "Point Blank 2",
      "Point Blank 3",
      "Polaris SnoCross",
      "Policenauts Japan only ",
      "Pong",
      "Pool Hustler",
      "Pool Shark",
      "Pop n Music Japan only ",
      "Pop n Music 2 Japan only ",
      "Pop n Music 3 Append Disc Japan only ",
      "Pop n Music 4 Append Disc Japan only ",
      "Pop n Music 5 Japan only ",
      "Pop n Music 6 Japan only ",
      "Pop n Music Animation Melody Japan only ",
      "Pop n Music Disney Tunes Japan only ",
      "Populous The Beginning",
      "Porsche Challenge",
      "Power Play Sports Trivia",
      "Power Rangers Lightspeed Rescue",
      "Power Rangers Time Force",
      "Power Shovel",
      "Powerslave AKA Exhumed",
      "Power Soccer 2",
      "Power Spike Pro Beach Volleyball",
      "Powermove Pro Wrestling",
      "The Powerpuff Girls Chemical X Traction",
      "Poy Poy",
      "Poy Poy 2 Japan only ",
      "Premier Manager 2000",
      "Prism Court Japan only ",
      "Pro 18 World Tour Golf",
      "Pro Evolution Soccer",
      "Pro Pinball Big Race USA",
      "Pro Pinball Fantastic Journey",
      "Pro Pinball Timeshock!",
      "Project Overkill",
      "Psybadek",
      "Psychic Detective",
      "Psychometrer Eiji Japan only ",
      "Puchi Carat",
      "Punky Skunk",
      "Putter Golf",
      "Puyo Puyo Tsuu Japan only ",
      "Puyo Puyo Sun Japan only ",
      "Puyo Puyo~n Japan only ",
      "Puzzle Star Sweep",
      "Q Bert",
      "Qix Neo",
      "Quake II",
      "Racing",
      "Radikal Bikers X",
      "Rage Ball",
      "Rage Racer",
      "Raiden Project",
      "Railroad Tycoon 2",
      "Rainbow Six",
      "Rakugaki Showtime Japan only ",
      "Rally Championship",
      "Rally Cross 2",
      "Rally Masters",
      "Rampage World Tour",
      "Rampage 2 Universal Tour",
      "Rampage Through Time",
      "Ranma 1/2 Battle Renaissance Japan only ",
      "Rapid Reload",
      "Rascal",
      "Rat Attack",
      "Ray Tracers",
      "RayCrisis",
      "Rayman",
      "Rayman 2 The Great Escape",
      "Rayman Junior Level 3",
      "Rayman Brain Games",
      "Rayman Rush",
      "RayStorm",
      "Razor Freestyle Scooter",
      "RC de GO!",
      "RC Helicopter",
      "RC Revenge",
      "RC Stunt Copter",
      "Ready 2 Rumble",
      "Ready 2 Rumble Round 2",
      "ReBoot",
      "Red Asphalt",
      "Reel Fishing",
      "Reel Fishing II",
      "Refrain Love ~Anata ni Aitai~ Japan only ",
      "Refrain Love 2 Japan only ",
      "Reloaded",
      "Resident Evil Biohazard in Japan ",
      "Resident Evil Director s Cut Biohazard Director s Cut in Japan ",
      "Resident Evil 2 Biohazard 2 in Japan ",
      "Resident Evil 2 Dual Shock Edition Biohazard 2 Dual Shock Edition in Japan ",
      "Resident Evil 3 Nemesis Biohazard 3 Last Escape in Japan ",
      "Resident Evil Survivor Biohazard Gun Survivor in Japan ",
      "Retro Force",
      "Return Fire",
      "Revolution X",
      "Re Volt",
      "Rhapsody A Musical Adventure",
      "Ridge Racer",
      "Ridge Racer Revolution",
      "Ridge Racer Type 4",
      "Rising Zan",
      "Risk",
      "Rival Schools Rival Schools United by Fate in Japan ",
      "Riven The Sequel to Myst",
      "Road Rash",
      "Road Rash 3D",
      "Road Rash Jail Break",
      "Robo Pit",
      "Robo Pit 2",
      "Rock  Em Sock  Em Robots",
      "Rocket Power Team Rocket Rescue",
      "Rockman Battle & Chase Japan only ",
      "Rogue Trip",
      "Roll Away",
      "Rollcage",
      "Rollcage Stage II",
      "Romance of the Three Kingdoms IV",
      "Romance of the Three Kingdoms V",
      "Romance of the Three Kingdoms VI",
      "Ronin Blade",
      "Roswell Conspiracies Aliens Myths & Legends",
      "Rox",
      "RPG Maker",
      "R Type Delta",
      "R Types",
      "Rugrats Search for Reptar",
      "Rugrats Totally Angelica",
      "Rugrats in Paris The Movie",
      "Runabout 2",
      "Running Wild",
      "Rushdown",
      "Sabrina the Teenage Witch A Twitch in Time!",
      "SaGa Frontier",
      "SaGa Frontier 2",
      "Sailor Moon",
      "Saiyuki Journey West",
      "Salamander Deluxe Pack Plus Japan only ",
      "Saltwater Sportfishing",
      "Sammy Sosa High Heat Baseball 2001",
      "Sammy Sosa Softball Slam",
      "Sampras Extreme Tennis",
      "Samurai Deeper Kyo Japan only ",
      "Samurai Shodown 3 Blades of Blood Samurai Spirits 3 Zankuro Musoken in Japan ",
      "Samurai Shodown 4 Amakusa s Revenge Samurai Spirits 4 Amakusa Kourin in Japan ",
      "Samurai Shodown Warrior s Rage Samurai Spirits Warrior s Rage 2 in Japan ",
      "Samurai Spirits 1 Japan only ",
      "Samurai Spirits 2 Japan only ",
      "Samurai Spirits Kenkyaku Shinan Pack Japan only ",
      "Sanvein",
      "S.C.A.R.S.",
      "Scooby Doo and the Cyber Chase",
      "Scooter Racing",
      "Scrabble",
      "SD Gundam G Generation F.I.F. Japan only ",
      "Sensible Soccer",
      "Sentinel Returns",
      "Serial Experiments Lain",
      "Sesame Street Sports",
      "Sesame Street Elmo s Letter Adventure",
      "Sesame Street Elmo s Number",
      "Sexy Parodius Japan only ",
      "Shadow Gunner",
      "Shadow Madness",
      "Shadow Man",
      "Shadow Master",
      "Shadow Tower",
      "Shane Warne Cricket  99",
      "Shanghai True Valor",
      "Shaolin",
      "Sheep",
      "Sheep Dog  n  Wolf",
      "Shellshock",
      "Shin Megami Tensei Japan only ",
      "Shinseiki Evangelion Eva to Yukai na Nakama Tachi Japan only ",
      "Shinseiki Evangelion Koutetsu no Girlfriend Japan only ",
      "Shinseiki Evangelion Koutetsu no Girlfriend 2 Japan only ",
      "Shinseiki GPX Cyber Formula Japan only ",
      "Shinsetsu Samurai Spirits Bushido Retsuden Japan only ",
      "Shipwreckers",
      "Shockwave Assault",
      "Shooter Space Shot",
      "Shooter Starfight Sanvein",
      "Shrek Treasure Hunt",
      "Silent Bomber",
      "Silent Hill",
      "Silhouette Mirage",
      "SilverLoad",
      "SimCity 2000",
      "Sim Theme Park",
      "The Simpsons Wresling",
      "Skullmonkeys",
      "Sky Sports Football Quiz",
      "Skydiving Extreme",
      "Slam  n  Jam 96",
      "Slayers Royal Japan only ",
      "Slayers Royal 2 Japan only ",
      "Slayers Wonderful Japan only ",
      "Sled Storm",
      "Small Soldiers",
      "Smash Court Tennis",
      "Smurfs",
      "Smurf Racer",
      "Sno Cross Championship Racing",
      "Snow Racer",
      "Snowboarding",
      "Sokaigi Japan only ",
      "Sol Divide",
      "Sorceror s Maze",
      "Sotsugyou M ~Seito Kaichou no Karei naru Inbou~ Japan only ",
      "Soul Blade Soul Edge in Japan ",
      "Soul of the Samurai",
      "South Park",
      "South Park Chef s Luv Shack",
      "South Park Rally",
      "Soviet Strike",
      "Space Battleship Yamato Fan Disc Part 1 Japan only ",
      "Space Battleship Yamato Farewell Warriors of Love Japan only ",
      "Space Debris",
      "Space Invaders",
      "Space Invaders Simple 1500 Japan only ",
      "Space Jam",
      "Spawn The Eternal",
      "Spec Ops Airborne Commando",
      "Spec Ops Covert Assault",
      "Spec Ops Ranger Elite",
      "Spec Ops Stealth Patrol",
      "Speed Machine",
      "Speed Punks",
      "Speed Racer",
      "Speedball 2100",
      "Spice World",
      "Spider Man",
      "Spider Man 2 Enter Electro",
      "Spider The Video Game",
      "Spin Jam",
      "SpongeBob SquarePants",
      "Sports Car GT",
      "Spot Goes To Hollywood",
      "Spyro The Dragon",
      "Spyro 2 Ripto s Rage!",
      "Spyro Year of the Dragon",
      "Star Gladiator",
      "Star Ocean The Second Story",
      "Star Trek Invasion",
      "Star Wars Episode 1 Jedi Power Battles",
      "Star Wars Episode 1 The Phantom Menace",
      "Star Wars Dark Forces",
      "Star Wars Demolition",
      "Star Wars Masters of Teras Kasi",
      "Star Wars Rebel Assault II",
      "Starfighter 3000",
      "Starwinder",
      "Steel Harbinger",
      "Steel Reign",
      "Streak",
      "Street Fighter Alpha Street Fighter Zero in Japan ",
      "Street Fighter Alpha 2 Street Fighter Zero 2 in Japan ",
      "Street Fighter Alpha 3 Street Fighter Zero 3 in Japan ",
      "Street Fighter II Collection",
      "Street Fighter Collection 2",
      "Street Fighter EX plus Alpha",
      "Street Fighter EX2 Plus",
      "Street Fighter The Movie",
      "Street Racer",
      "Street Racquetball",
      "Street Scooters",
      "Street Sk8ter",
      "Street Sk8ter 2",
      "Strider 2",
      "Strike Force Hydra",
      "Striker Pro 2000",
      "Strikers 1945",
      "Strikers 1945 II",
      "Stuart Little 2",
      "Submarine Commander",
      "Suikoden Tendo 108 Sei Japan only ",
      "Suikoden",
      "Suikoden II",
      "Suikogaiden Vol. 1   Swordsman of Harmonia Japan only ",
      "Suikogaiden Vol. 2   The Duel of Crystal Valley Japan only ",
      "Summon Night Japan only ",
      "Summon Night 2 Japan only ",
      "Super Bubble Pop",
      "Super Duper Sumos",
      "Super Pang Collection",
      "Super Puzzle Fighter II Turbo Super Puzzle Fighter II X in Japan ",
      "Super Robot Wars Alpha",
      "Super Robot Wars Alpha Gaiden Japan only ",
      "Super Shot Soccer",
      "Superbike 2000",
      "SuperCross 2000",
      "SuperCross Circuit",
      "Supersonic Racers",
      "Superstar Dance Club ♯1 Hits!!!",
      "Surf Riders",
      "Susume! Taisen Puzzle Dama Japan only ",
      "Sven Goran Eriksson s World Challenge",
      "Sydney 2000",
      "Syndicate Wars",
      "Syphon Filter",
      "Syphon Filter 2",
      "Syphon Filter 3",
      "T ai Fu Wrath of the Tiger",
      "T.R.A.G.",
      "Tactics Ogre",
      "Tail Concerto",
      "Tales of Destiny",
      "Tales of Eternia",
      "Tales of Phantasia Japan only ",
      "Tank Racer",
      "Tarzan",
      "Team Buddies",
      "Team LOSI RC Racing",
      "Tear Ring Saga Japan only ",
      "Tecmo s Deception",
      "Tekken",
      "Tekken 2",
      "Tekken 3",
      "Tempest X3",
      "Tenchi Muyo! Toukou Muyou Japan only ",
      "Tenchu Stealth Assassins",
      "Tenchu 2 Birth of the Stealth Assassins",
      "Tennis",
      "Tennis Arena",
      "Terracon",
      "Test Drive 4",
      "Test Drive 5",
      "Test Drive 6",
      "Test Drive Le Mans",
      "Test Drive Off Road",
      "Test Drive Off Road 2",
      "Test Drive Off Road 3",
      "Tetris Plus",
      "Tetris with Card Captor Sakura Eternal Heart Japan only ",
      "The Renai Simulation ~Natsuiro Celebration~ SIMPLE 1500 Series Vol. 36 Japan only ",
      "Theme Hospital",
      "Theme Park",
      "Theme Park World",
      "This Is Football",
      "This Is Football 2",
      "Thousand Arms",
      "Thrasher Skate and Destroy",
      "Threads of Fate",
      "Three Lions",
      "Thrill Kill Bootleg ",
      "Thunder Force V",
      "Tiger Woods  99",
      "Tiger Woods PGA Tour 2000",
      "Tigger s Honey Hunt",
      "Time Commando",
      "Time Crisis",
      "Time Crisis Project Titan",
      "Tiny Tank",
      "Tiny Toon Adventures The Great Beanstalk Tiny Toon Adventures Revenge of the Beanstalk in Europe ",
      "Tiny Toon Adventures Toonenstein    Dare to Scare",
      "Tiny Toon Adventures Plucky s Big Adventure",
      "Tobal No. 1",
      "Tobal 2 Japan only ",
      "TOCA Touring Car Championship",
      "TOCA Touring Cars 2",
      "TOCA World Touring Cars",
      "Tokimeki Memorial Japan only ",
      "Tokimeki Memorial Drama Series Vol. 1 Nijiiro no Seishun Japan only ",
      "Tokimeki Memorial Drama Series Vol. 2 Irodori no Love Song Japan only ",
      "Tokimeki Memorial Drama Series Vol. 3 Tabidachi no Uta Japan only ",
      "Tokimeki Memorial Private Collection Japan only ",
      "Tokimeki Memorial Selection Fujisaki Shiori Japan only ",
      "Tokimeki Memorial Taisen Pazurudama Japan only ",
      "Tokimeki Memorial Taisen Tokkaedama Japan only ",
      "Tokimeki Memorial 2 Japan only ",
      "Tokimeki Memorial 2 Substories Dancing Summer Vacation Japan only ",
      "Tokimeki Memorial 2 Substories Leaping School Festival Japan only ",
      "Tokimeki Memorial 2 Substories Memories Ringing On Japan only ",
      "Tokimeki Memorial 2 Taisen Pazurudama Japan only ",
      "Tokimeki no Houkago ~Ne Quiz Shiyo~ Japan only ",
      "Tokyo Highway Battle",
      "Tom Clancy s Rainbow Six Rogue Spear",
      "Tom & Jerry in House Trap",
      "Tomb Raider",
      "Tomb Raider II",
      "Tomb Raider III Adventures of Lara Croft",
      "Tomb Raider Chronicles",
      "Tomb Raider The Last Revelation",
      "Tomba!",
      "Tomba! 2 The Evil Swine Return",
      "Tombi",
      "Tombi 2",
      "Tommy Makinen Rally",
      "Tomorrow Never Dies",
      "Tonka Space Station",
      "Tony Hawk s Pro Skater",
      "Tony Hawk s Pro Skater 2",
      "Tony Hawk s Pro Skater 3",
      "Tony Hawk s Pro Skater 4",
      "Tony Hawk s Skateboarding",
      "Toonenstein Dare To Scare",
      "Top Gun Fire At Will",
      "Torneko The Last Hope",
      "Toshinden Subaru AKA Battle Arena Toshinden 4",
      "Total Eclipse Turbo",
      "Total NBA 96",
      "Total NBA 97",
      "Toy Story 2",
      "Toy Story Racer",
      "Track & Field",
      "Transformers Beast Wars Transmetals",
      "Transport Tycoon",
      "Trap Gunner",
      "Trash It",
      "Treasure Gear Japan only ",
      "Treasures of the Deep",
      "Trespasser",
      "Trickin  Snowboarder",
      "Triple Play  99",
      "Triple Play 2000",
      "Triple Play 2001",
      "Triple Play Baseball",
      "True Love Story Japan only ",
      "True Love Story ~Remember my Heart~ Japan only ",
      "True Love Story 2 Japan only ",
      "True Love Story Fan Disk Japan only ",
      "True Pinball",
      "Tunnel B1",
      "Turbo Prop Racing",
      "Turbo Twister",
      "Turnabout",
      "Twinbee RPG Japan only ",
      "Twinbee Taisen Puzzle Dama Japan only ",
      "Twisted Metal",
      "Twisted Metal 2",
      "Twisted Metal 3",
      "Twisted Metal 4",
      "Twisted Metal Small Brawl",
      "Tyco RC Assault With a Battery",
      "UEFA Champions League 99/00",
      "UEFA Euro 2000",
      "UEFA Striker",
      "Ultima Underworld The Stygian Abyss",
      "Ultimate 8 Ball",
      "Ultimate Fighting Championship",
      "UmJammer Lammy",
      "The Unholy War",
      "Uprising X",
      "Urban Chaos",
      "V Rally",
      "V Rally 2",
      "Vagrant Story",
      "Valkyrie Profile",
      "Vampire Hunter D",
      "Vanark",
      "Vandal Hearts",
      "Vandal Hearts II",
      "Vanguard Bandits Epica Stella in Japan ",
      "Vanishing Point",
      "Vegas Casino",
      "Vegas Games 2000",
      "Vib Ribbon",
      "Victory Boxing Championship Edition",
      "V.I.P.",
      "Vigilante 8",
      "Vigilante 8 Second Offense",
      "Viper",
      "Virtual Kasparov",
      "Virus",
      "VR Baseball  97",
      "VR Baseball  99",
      "VR Sports Powerboat Racing",
      "Vs.",
      "Walt Disney World Quest Magical Racing Tour",
      "Walt Disney s Jungle Book Rhythm n  Groove",
      "Warcraft 2 The Dark Saga",
      "War Games DefCon 1",
      "War Jetz",
      "Warhammer Dark Omen",
      "Warhammer Shadow of the Horned Rat",
      "Warhawk",
      "Warpath Jurassic Park",
      "Warriors of Might & Magic",
      "Warzone 2100",
      "Wayne Gretsky s 3D Hockey 98",
      "WCW Backstage Assault",
      "WCW Mayhem",
      "WCW Nitro",
      "WCW/nWo Thunder",
      "WCW vs The World",
      "WDL Thunder Tanks",
      "The Weakest Link",
      "Wedding Peach Doki Doki Oiro naoshi Japan only ",
      "Wheel of Fortune",
      "Wheel of Fortune 2",
      "Who Wants to be a Millionaire",
      "Who Wants to be a Millionaire Second Edition",
      "Who Wants to be a Millionaire Third Edition",
      "Wild 9",
      "Wild ARMs",
      "Wild ARMs 2",
      "Wild Rapids",
      "The Wild Thornberrys Animal Adventure",
      "Williams Arcade s Greatest Hits",
      "Windsurfer s Paradise",
      "Wing Commander IV The Price of Freedom",
      "Wing Over 2",
      "Winnie the Pooh Kindergarten",
      "Winnie the Pooh Preschool",
      "wipEout",
      "wipEout XL wipEout 2097 in Europe ",
      "wip3out",
      "wip3out Special Edition",
      "Wizardry VII Gadeia no Houshu Japan only ",
      "Wizardry Empire Japan only ",
      "Wizardry Empire 2 Japan only ",
      "Wizardry Dimguil Japan only ",
      "Wizardry Llylgamyn Saga Japan only ",
      "Wizardry New Age of Llylgamyn Japan only ",
      "Woody Woodpecker Racing",
      "Wonders 3 Arcade Gears Japan only ",
      "World Championship Snooker",
      "World Cup 98",
      "World Destruction League Thunder Tanks",
      "The World Is Not Enough",
      "World League Soccer",
      "World s Scariest Police Chases",
      "Worms",
      "Worms Armageddon",
      "Worms Pinball",
      "Worms World Party",
      "Wreckin  Crew",
      "Wu Tang Shaolin Style",
      "WWF Attitude",
      "WWF In Your House",
      "WWF SmackDown!",
      "WWF SmackDown! 2 Know Your Role",
      "WWF War Zone",
      "WWF Wrestlemania The Arcade Game",
      "X2",
      "X Unmei no Takatai",
      "X Bladez Inline Skater",
      "X COM Enemy Unknown",
      "X COM UFO Defense",
      "X COM 2 Terror From the Deep",
      "X Files",
      "X Men Children of the Atom",
      "X Men Mutant Academy",
      "X Men Mutant Academy 2",
      "X Men Mutant Wars",
      "X Men vs. Street Fighter",
      "X Racing",
      "Xena Warrior Princess",
      "Xenocracy",
      "Xenogears",
      "Xevious 3D/G",
      "Xevious 3D/G+",
      "X Games Pro Boarder",
      "XS Junior League Dodgeball",
      "XS Junior League Football",
      "XS Junior League Soccer",
      "XS Moto",
      "Yarudora Series Vol. 1 Double Cast",
      "Yarudora Series Vol. 3 Sampaguita",
      "You Don t Know Jack",
      "You Don t Know Jack! Mock 2",
      "Yu Gi Oh! Forbidden Memories",
      "Yuukyuu Kumikyoku All Star Project",
      "Z Gundam Japan only ",
      "Zanac X Zanac Japan only ",
      "Zen Nippon Pro Wrestling Ouja no Kon",
      "ZeiramZone",
      "Zero4 Champ Doozy J",
      "Zero Divide",
      "Zero Divide 2",
      "Zeus Carnage Heart Second",
      "Zig Zag Ball",
      "Zill Oll",
      "Zoboomafoo",
      "Zoids",
      "Zoids 2 Heric vs Guylos Japan only ",
      "Zoop",
      "007 Racing",
      "007: Tomorrow Never Dies",
      "1 on 1",
      "101 Dalmations II: Patch's London Adventure",
      "102 Dalmatians: Puppies to the Rescue",
      "2002 FIFA World Cup",
      "2Xtreme",
      "360",
      "3D Baseball",
      "3D Lemmings",
      "3Xtreme",
      "40 Winks",
      "4-4-2 Soccer",
      "5-Star Racing",
      "A Bug's Life",
      "A-Train",
      "AbalaBurn",
      "Aces of the Air",
      "Aconcagua",
      "Action Bass",
      "Action Man",
      "Action Man: Mission Xtreme",
      "Activision Classics",
      "Actua Golf",
      "Actua Golf 2",
      "Actua Golf 3",
      "Actua Ice Hockey",
      "Actua Pool",
      "Actua Soccer",
      "Actua Soccer 2",
      "Actua Soccer 3",
      "Actua Soccer Club Edition",
      "Actua Tennis",
      "Adidas Power Soccer",
      "Adidas Power Soccer 2",
      "Adidas Power Soccer '97",
      "Adidas Power Soccer 98",
      "Advan Racing",
      "Advanced V.G.",
      "Advanced V.G. 2",
      "Agent Armstrong",
      "Agile Warrior",
      "Agile Warrior F-111X",
      "Air Combat (Ace Combat in Japan)",
      "Ace Combat 2",
      "Ace Combat 3: Electrosphere",
      "Air Hockey",
      "Air Race",
      "Aironauts",
      "Akuji The Heartless",
      "Aladdin in Nasira's Revenge",
      "Alex Ferguson's Player Manager 2001",
      "Alexi Lalas International Soccer",
      "Alien: Resurrection",
      "Alien Trilogy",
      "All Japan Woman Pro Wrestling",
      "All-Star 1997 featuring Frank Thomas",
      "All-Star Slammin' D-ball",
      "All Star Tennis",
      "All Star Tennis '99",
      "All Star Watersports",
      "Allied General",
      "Alone in the Dark: Jack Is Back",
      "Alone in the Dark: One-Eyed Jack's Revenge",
      "Alone in the Dark: The New Nightmare",
      "Alundra",
      "Alundra 2",
      "The Amazing Virtual Sea-Monkeys",
      "American Deer Hunter",
      "American Pool",
      "Amerzone",
      "Andretti Racing",
      "Angel Blade: Neo Tokyo Guardians",
      "Angel Eyes",
      "Angel Graffiti: Anathe no Profile",
      "Animaniacs Ten Pin Alley",
      "Anime Chick Story 1: Card Captor Sakura",
      "Animorphs: Shattered Reality",
      "Ape Escape",
      "Apocalypse",
      "Aqua GT",
      "Aquanauts Holiday",
      "Aquanauts Holiday: Memories of Summer 1996",
      "Arc the Lad",
      "Arc the Lad II",
      "Arc the Lad III",
      "Arc the Lad Collection",
      "Arc the Lad: Monster Game with Casino Game",
      "Arcade Party Pack",
      "Arcade Party Pak",
      "Arcade's Greatest Hits: Atari Collection 1",
      "Arcade's Greatest Hits: Atari Collection 2",
      "Arcade's Greatest Hits: Midway Collection 2",
      "Area 51",
      "Ark of Time",
      "Arkanoid Returns",
      "Armored Core",
      "Armored Core: Master of Arena",
      "Armored Core: Project Phantasma",
      "Armored Trooper Vatams: Lightning Slash",
      "Armorines: Project S.W.A.R.M.",
      "Army Men 3D",
      "Army Men: Air Attack",
      "Army Men: Air Attack 2",
      "Army Men: Green Rogue",
      "Army Men: Land, Sea, Air",
      "Army Men: Lock 'n' Load",
      "Army Men: Omega Soldier",
      "Army Men: Operation Meltdown",
      "Army Men: Sarge's Heroes",
      "Army Men: Sarge's Heroes 2",
      "Army Men: Team Assault",
      "Army Men: World War",
      "Army Men: World War - Final Front",
      "Army Men: World War - Land, Sea, Air",
      "Arthur! Ready to Race",
      "Assault",
      "Assault Rigs",
      "Assault: Retribution",
      "Asterix",
      "Asteroids",
      "Asuka 120% Burning Fest. Final",
      "Asuka 120% Excellent: Burning Festival",
      "Asuka 120% Special Burning Fest",
      "Atari Anniversary Edition",
      "Atari Anniversary Edition Redux",
      "Atelier Marie",
      "Athena: Awakening From The Ordinary Life",
      "Atlantis: The Lost Empire",
      "Atlantis: The Lost Tales",
      "Attack of the Saucerman!",
      "ATV Mania",
      "ATV: Quad Power Racing",
      "ATV Racers",
      "AubirdForce",
      "Austin Powers Pinball",
      "Auto Destruct",
      "Ayrton Senna Kart Duel 2",
      "Azito 2",
      "Azure Dreams (Konami)",
      "B-Movie",
      "Baby Universe",
      "Backguiner ~Yomigaeru Yuushatachi~ Guiner Tenshou (Japan only)",
      "Backguiner ACT-2 ~Yomigaeru Yuushatachi~ Hishou Hen Uragiri no Senjou (Japan only)",
      "Backstreet Billiards",
      "Backyard Football",
      "Backyard Soccer",
      "Bakuretsu Hunter: Mahjong Special",
      "Bakusou Dekotora Densetsu: Art Truck Battle",
      "Bakusou Kyoudai Let's & Go! Eternal Wings",
      "Baldies",
      "Baldy Land",
      "Ball Breakers",
      "Ballblazer Champions",
      "Ballerburg",
      "Ballistic",
      "Barbie Explorer",
      "Barbie Race and Ride",
      "Barbie Super Sports",
      "Barbie: Gotta Have Games",
      "Baroque",
      "Baseball 2000",
      "Bases Loaded '96",
      "Bass Hunter",
      "Bass Landing",
      "Bass Rise",
      "Bastard!! (Japan only)",
      "Batman & Robin",
      "Batman Beyond: Return of the Joker",
      "Batman Forever: The Arcade Game",
      "Batman: Gotham City Racer",
      "Battle Arena Toshinden",
      "Battle Arena Toshinden 2",
      "Battle Arena Toshinden 2 Plus",
      "Battle Arena Toshinden 3",
      "Battle Hunter",
      "BattleSport",
      "Battlestations",
      "Battletanx: Global Assault",
      "Beach Volleyball",
      "Beast Wars",
      "Beast Wars: Transformers",
      "Beatmania",
      "Beatmania Append 3rd Mix (Japan only)",
      "Beatmania Append 4th Mix (Japan only)",
      "Beatmania Append 5th Mix (Japan only)",
      "Beatmania Append 5th Mix: Time To Get Down",
      "Beatmania Append Club Mix (Japan only)",
      "Beatmania Append Gottamix (Japan only)",
      "Beatmania Append Gottamix 2 - Going Global (Japan only)",
      "Beatmania 2nd Mix (Japan only)",
      "Beatmania 6th Mix Plus Core Mix|Beatmania 6th Mix + Core Mix (Japan only)",
      "Beatmania Best Hits (Japan only)",
      "Beatmania - The Sound of Tokyo (Japan only)",
      "Beat Planet Music",
      "Bedlam",
      "Beyblade",
      "Beyond the Beyond",
      "Big Air",
      "Big Air Snowboarding",
      "Big Bass Fishing",
      "Big Bass World Championship",
      "Big Hurt Baseball",
      "Big League Slugger Baseball",
      "Big Ol' Bass 2",
      "Big Strike Bowling",
      "Billiards",
      "Bio F.R.E.A.K.S. (Midway Games)",
      "Bishi Bashi Special (Japan only)",
      "Bishi Bashi Special (PAL) (PAL release, containing both Bishi Bashi Special 1 and 2)",
      "Bishi Bashi Special 2 (Japan only)",
      "Bishi Bashi Special 3: Step Champ (Japan only)",
      "Bishoujo Senshi Sailor Moon Super S",
      "Black & White (cancelled)",
      "Black/Matrix Cross",
      "Black Bass with Blue Marlin",
      "Black Dawn",
      "Blade",
      "Blade 2",
      "Blades of Blood: Samurai Shodown III",
      "Blast Chamber",
      "Blast Lacrosse",
      "Blast Radius",
      "Blaster Master",
      "Blaster Master: Blasting Again",
      "Blasto",
      "Blaze & Blade",
      "Blaze & Blade: Eternal Quest",
      "Blazing Dragons",
      "Block Buster",
      "Blockids",
      "Blood Lines",
      "Blood Omen: Legacy of Kain",
      "Bloody Roar",
      "Bloody Roar 2",
      "Blue Breaker",
      "Blue Legend of Water",
      "Blue's Big Musical",
      "Board Game: Top Shop",
      "Bob the Builder: Can We Fix It?",
      "Bogey: Dead 6",
      "Boku no Natsuyasumi",
      "Bokujou Monogatari Harvest Moon for Girls",
      "Bomberman",
      "Bomberman Fantasy Race",
      "Bomberman Party Edition",
      "Bomberman Wars",
      "Bomberman World",
      "The Bombing Islands",
      "Boombots",
      "Bottom of the 9th",
      "Bottom of the 9th '97",
      "Bottom of the 9th '99",
      "Bounty Hunter Sara",
      "Bowling",
      "Boxing",
      "BRAHMA Force: The Assault on Beltlogger 9",
      "Brain Dead 13",
      "Bratz",
      "Brave Charge Box (Japan only)",
      "Brave Fencer Musashi (Brave Fencer Musashiden in Japan)",
      "Brave Prove",
      "Bravo Air Race",
      "Breakout",
      "Break Point Tennis",
      "Breakpoint",
      "Breath of Fire III",
      "Breath of Fire IV",
      "Brian Lara Cricket",
      "Brigandine: Legend of Forsena",
      "Broken Helix",
      "Broken Sword: Shadow of the Templars",
      "Broken Sword II: The Smoking Mirror",
      "Brunswick Circuit Pro Bowling",
      "Brunswick Circuit Pro Bowling 2",
      "Bubble Bobble featuring Rainbow Islands",
      "Bubsy 3D",
      "Bug Riders",
      "Buggy",
      "Bugs Bunny: Lost in Time",
      "Bugs Bunny & Taz: Time Busters",
      "Builder's Block",
      "Burning Road",
      "Burstrick",
      "Burstrick Wake Boarding!!",
      "Bushido Blade",
      "Bushido Blade 2",
      "Bust a Groove (Bust a Move in Japan)",
      "Bust a Groove 2 (Bust a Move 2 in Japan)",
      "Bust-A-Move 2 (Puzzle Bobble 2 in Japan)",
      "Bust-A-Move 2 Arcade Edition",
      "Bust-A-Move 4 (Puzzle Bobble 4 in Japan)",
      "Bust-A-Move 99 (Puzzle Bobble 3 in Japan)",
      "Buster Bros. Collection",
      "Buzz Lightyear of Star Command",
      "C: The Contra Adventure",
      "C-12: Final Resistance",
      "Caesar's Palace 2000: Millennium Gold Edition",
      "Caesar's Palace II",
      "Capcom Generations (4 CDs with 13 classic games)",
      "Capcom vs SNK Pro",
      "Captain Tsubasa: Eikou no Kiseki (Japan only)",
      "Captain Tsubasa: Aratanaru Densetsu Joshou (Japan only)",
      "Captain Tsubasa J: Get in the Tomorrow (Japan only)",
      "Card Games",
      "Card Shark",
      "Cardcaptor Sakura (Japan only)",
      "Cardinal SYN",
      "Carmageddon",
      "Carnage Heart",
      "CART World Series",
      "Casper: Friends Around the World",
      "Castlevania Chronicles (Castlevania Chronicle: Akumajou Dracula in Japan)",
      "Castlevania: Symphony of the Night (Akumajou Dracula X: Nocturne in the Moonlight in Japan)",
      "Catan - Die erste Insel (German)",
      "Castrol Honda Superbike",
      "Celebrity Deathmatch",
      "Centipede",
      "Championship Bass",
      "Championship Manager Quiz",
      "Championship Motocross featuring Ricky Carmichael",
      "Championship Motocross 2001 featuring Ricky Carmichael",
      "Championship Surfer",
      "Chase the Express",
      "Chessmaster II",
      "Chicken Run",
      "Chill",
      "Choaniki (Japan only)",
      "Chocobo Racing",
      "Chocobo's Mysterious Dungeon",
      "Chocobo's Mysterious Dungeon 2",
      "Chris Kamara's Street Soccer",
      "Chrono Cross",
      "Circuit Breakers",
      "The City of Lost Children",
      "Civilization II",
      "Clock Tower",
      "Clock Tower: The First Fear (Japan only)",
      "Clock Tower II: The Struggle Within",
      "Codename: Tenka",
      "Colin McRae 2.0",
      "Colin McRae Rally",
      "Colony Wars",
      "Colony Wars: Red Sun",
      "Colony Wars: Vengeance",
      "Command & Conquer",
      "Command & Conquer: Red Alert",
      "Command & Conquer: Red Alert - Retaliation",
      "Contender",
      "Contender 2",
      "Contra: Legacy of War",
      "Convenience Store Manager (Aka. The Conveni) - Japan: SLPS00782",
      "Convenience Store Manager 2 (Aka. The Conveni 2) - Japan: SLPS01146",
      "Cool Boarders",
      "Cool Boarders 2",
      "Cool Boarders 3",
      "Cool Boarders 4",
      "Cool Boarders 2001",
      "Countdown Vampires",
      "Courier Crisis",
      "Covert Ops: Nuclear Dawn",
      "Crash Bandicoot",
      "Crash Bandicoot 2",
      "Crash Bandicoot: Warped",
      "Crash Bash",
      "Crash Team Racing",
      "Cricket 2000",
      "Crime Killer",
      "Crisis Beat",
      "Critical Depth",
      "Croc: Legend of the Gobbos",
      "Croc 2",
      "Crossroad Crisis",
      "Crusaders of Might and Magic",
      "Cyber Daisenryaku: Shutsugeki! Haruka-tai (Japan only)",
      "Cyberia",
      "CyberTiger",
      "Dance Dance Revolution",
      "Dance Dance Revolution 3rdMIX (Japan only)",
      "Dance Dance Revolution 4thMIX (Japan only)",
      "Dance Dance Revolution 5thMIX (Japan only)",
      "Dance Dance Revolution: Disney Mix (Dance Dance Revolution: Disney's Rave in Japan)",
      "Dance Dance Revoution Extra Mix (Japan only)",
      "Dance Dance Revolution: Konamix",
      "Dancing Blade Katteni Momotenshi! (Japan only)",
      "Dancing Blade Katteni Momotenshi II ~Tears of Eden~ (Japan only)",
      "Dancing Stage presents Dreams Come True (Japan only)",
      "Dancing Stage presents True Kiss Destination (Japan only)",
      "Dancing Stage Fever",
      "Dance: UK (Europe only)",
      "Danger Girls",
      "Darius Gaiden",
      "Dark Omen",
      "Darklight Conflict",
      "Darkstalkers",
      "Darkstalkers 3",
      "Darkstone",
      "Dave Mirra Freestyle BMX",
      "Dave Mirra Freestyle BMX: Maximum Remix",
      "Dead Ball Zone",
      "David Beckham Soccer",
      "Dead in the Water",
      "Dead or Alive",
      "Deathtrap Dungeon",
      "Deception III: Dark Delusion",
      "Delta Force: Urban Warfare",
      "Delta Force: Urban Warrior",
      "Demolition Racer",
      "Densha de go! (Taito) - Japan: SLPS01150",
      "Densha de go! 2 (Taito) - Japan: SLPM86141",
      "Descent 2",
      "Destrega",
      "Destruction Derby",
      "Destruction Derby 2",
      "Destruction Derby Raw",
      "Detana TwinBee Yahho-! Deluxe Pack (Japan only)",
      "Devil Dice",
      "Dexter's Laboratory: Mandark's Lab?",
      "Diablo",
      "Die Hard Trilogy",
      "Die Hard Trilogy 2",
      "Die Hard Trilogy: Viva Las Vegas",
      "Digimon Digital Card Battle",
      "Digimon Rumble Arena",
      "Digimon World",
      "Digimon World 2",
      "Digimon World 3",
      "Digitalglider Airman (Aka. Dejitaru guraidaa ea man) - Japan: SLPS02276",
      "Dino Crisis",
      "Dino Crisis 2",
      "Discworld",
      "Discworld: Vermutlich vermisst",
      "Discworld Noir",
      "Disney's Dinosaur",
      "Disney's Donald Duck: Goin' Quackers (Donald Duck: Quack Attack in Europe)",
      "Disney's Mulan Story Studio",
      "Disney's Peter Pan: Adventures in Never Land",
      "Disney's Toy Story 2",
      "Disney's Treasure Planet",
      "Disruptor",
      "Diver's Dream",
      "Doom",
      "Downhill Mountain Bike Racing",
      "Dracula: The Last Sanctuary",
      "Dracula: The Resurrection",
      "Dragon Ball: Final Bout",
      "Dragon Ball GT: Final Bout",
      "Dragon Ball Z Legends (JP)",
      "Dragon Ball Z: Ultimate Battle 22",
      "Dragonseeds",
      "Dragon Knights Glorious (Japan only)",
      "Dragon Tales: Dragon Seek",
      "Dragon Valor",
      "Dragon Warrior VII",
      "Dreams",
      "Driver",
      "Driver 2",
      "Ducati World Championship Racing",
      "Duke Nukem",
      "Duke Nukem: Land of the Babes",
      "Duke Nukem: Time to Kill",
      "Duke Nukem: Total Meltdown",
      "Dukes of Hazzard",
      "Dukes of Hazard II: Daisy Dukes it Out",
      "Dune",
      "Dune 2000",
      "Dynasty Warriors",
      "EA Sports Supercross",
      "Eagle One: Harrier Attack",
      "Earthworm Jim 2",
      "Echo Night",
      "Echo Night 2",
      "ECW Anarchy Rulz",
      "ECW Hardcore Revolution",
      "Ehrgeiz",
      "Einhänder",
      "Eithea (Japan only)",
      "Elemental Gearbolt",
      "Elemental Pinball",
      "Eliminator",
      "The Emperor's New Groove",
      "Epidemic",
      "ESPN Extreme Games (called 1Xtreme on Greatest Hits release)",
      "ESPN Extreme Games 2",
      "ESPN MLS GameNight",
      "E.T. the Extra-Terrestrial: Interplanetary Mission",
      "Eternal Eyes",
      "European Super League",
      "Everybody's Golf",
      "Everybody's Golf 2",
      "Evil Dead: Hail to the King",
      "Evil Zone (Eretzvaju in Japan)",
      "Excalibur 2555 A.D.",
      "Exhumed",
      "Expendable",
      "Extreme Ghostbusters",
      "F1 2000",
      "F1 Championship Season 2000",
      "F1 Racing Championship",
      "F1 World Grand Prix",
      "FA Premier League Stars",
      "Fade To Black",
      "Family Feud",
      "Family Game Pack",
      "Fantastic Four",
      "Farland Saga (Japan only)",
      "Farland Story: Yottsu no Fuuin (Japan only)",
      "Fatal Fury: Wild Ambition",
      "Fear Effect",
      "Fear Effect 2: Retro Helix",
      "Felony 11-79",
      "FIFA 96",
      "FIFA 97",
      "FIFA 98",
      "FIFA 98: Road To World Cup",
      "FIFA 99",
      "FIFA 2000",
      "FIFA 2001 Major League Soccer",
      "FIFA 2002",
      "The Fifth Element",
      "Fighter Maker",
      "Fighting Force",
      "Fighting Force 2",
      "Final Doom",
      "Final Fantasy VI",
      "Final Fantasy VII",
      "Final Fantasy VII International",
      "Final Fantasy VIII",
      "Final Fantasy IX",
      "Final Fantasy Anthology",
      "Final Fantasy Chronicles",
      "Final Fantasy Origins",
      "Final Fantasy Tactics",
      "Fire ProWrestling G (Japan only)",
      "Firebugs",
      "Firestorm Thunderhawk 2",
      "Fisherman's Bait",
      "Fisherman's Bait 2: Big Ol' Bass",
      "Fisherman's Bait 3",
      "Fist of the North Star (Japan only)",
      "Flintstones Bedrock Bowling",
      "Fluid",
      "Football Manager 2000",
      "Ford Racing",
      "Formula Nippon",
      "Formula 1 '97",
      "Formula 1 '98",
      "Formula One",
      "Formula One Arcade",
      "Formula One 2000",
      "Formula One 2001",
      "Formula One '99",
      "Forsaken",
      "Fox Sports Gold '99",
      "Fox Sports Soccer '99",
      "Freestyle Boardin' '99",
      "Freestyle Motocross: McGrath vs. Pastrana",
      "Frogger",
      "Frogger 2: Swampy's Revenge",
      "Front Mission 2 (Japan only)",
      "Front Mission 3",
      "Future Cop L.A.P.D.",
      "Galaga: Destination Earth",
      "Galaxy Fraulein Yuna: Final Edition (Japan only)",
      "Galerians",
      "Gallop Racer",
      "Ganbare Goemon Uchukaizoku Akogingu (Japan only)",
      "Ganbare Goemon! Kuranarakoi! Ayashigeikka no Kuroikage (Japan only)",
      "Gatekeepers (Japan only)",
      "Gauntlet Legends",
      "G-Darius",
      "Gekido",
      "Gekioh: Shooting King",
      "Gex",
      "Gex: Deep Cover Gecko",
      "Gex: Enter the Gecko",
      "Ghost in the Shell",
      "Glover",
      "Gold and Glory: The Road to El Dorado",
      "Golden Nugget",
      "Gokujou Parodius da! Deluxe Pack (Japan only)",
      "G-Police",
      "G-Police: Weapons of Justice",
      "Gradius Deluxe Pack (Japan only)",
      "Gradius Gaiden (Japan only)",
      "Gran Turismo",
      "Gran Turismo 2",
      "Grand Theft Auto",
      "Grand Theft Auto 2",
      "Grand Theft Auto: London 1969",
      "Grand Tour Racing '98",
      "Grandia",
      "Granstream Saga",
      "The Grinch",
      "Grind Session",
      "Growlanser (Japan only)",
      "Grudge Warriors",
      "Guardian's Crusade",
      "Gubble",
      "Guilty Gear",
      "GuitarFreaks (Japan only)",
      "GuitarFreaks Append: 2nd Mix (Japan only)",
      "Gunbird (Japan & Europe only, Mobile Light Force in Europe)",
      "Gundam Battle Assault 2",
      "Gunfighter: The Legend of Jesse James",
      "Hardball '99",
      "Hardcore 4x4",
      "Harry Potter and the Chamber of Secrets",
      "Harry Potter and the Sorcerer's Stone",
      "Harukaze Sentai V-Force (Japan only)",
      "Harvest Moon: Back To Nature",
      "HBO Boxing",
      "Heart of Darkness",
      "Hell Night",
      "Hello Kitty's Cube Frenzy",
      "Hello Kitty: Cute de Cute (Japan only)",
      "Herc's Adventures",
      "Hercules Action Game",
      "HeXen",
      "Hidden and Dangerous",
      "High Heat Baseball 2000",
      "High Heat Major League Baseball 2002",
      "Hogs of War",
      "Hooters Road Trip",
      "Hoshigami: Ruining Blue Earth",
      "Hot Shots Golf",
      "Hot Shots Golf 2",
      "Hot Wheels Turbo Racing",
      "Hugo",
      "Hugo 2",
      "Hunchback of Notre Dame",
      "Hunter X Hunter: Ubawareta Aura Stone (Japan only)",
      "Hydro Thunder",
      "IHRA Drag Racing",
      "In Cold Blood",
      "Incredible Crisis",
      "Incredible Hulk",
      "The Incredibles: Rise of the Underminer",
      "Initial D (Japan only)",
      "Inspector Gadget: Gadget's Crazy Crisis",
      "Intelligent Qube",
      "Intellivision Classic Games",
      "International Superstar Soccer",
      "International Superstar Soccer '98",
      "International Track & Field",
      "International Track & Field 2",
      "International Track & Field 2000",
      "InuYasha",
      "Invasion from Beyond",
      "Iron and Blood",
      "Iron Soldier 3",
      "Irritating Stick",
      "ISS Pro",
      "ISS Pro Evolution",
      "The Italian Job",
      "J's Racing",
      "Jackie Chan's Stuntmaster",
      "Jade Cocoon",
      "Jade Cocoon: Story of Tamamayu",
      "JamPack Fall 2001",
      "JamPack Summer 2000",
      "JamPack Volume 2",
      "JamPack Winter 2000",
      "Jarret & LaBonte Stock Car Racing",
      "Jeanette Lee's Virtual Pool",
      "Jeff Gordon XS Racing",
      "Jeff Wayne's War of the Worlds",
      "Jeopardy!",
      "Jeopardy! 2",
      "Jeopardy! 2nd Edition",
      "Jeremy McGrath Supercross '98",
      "Jeremy McGrath Supercross 2000",
      "Jersey Devil",
      "Jet Moto",
      "Jet Moto 2",
      "Jet Moto 3",
      "Jet Racer",
      "Jet Rider",
      "JGTC: All-Japan Grand Touring Car Championship",
      "Jigsaw Madness",
      "Jikkyou American Baseball",
      "Jikkyou Oshaberi Parodius: Forever With Me (Japan only)",
      "Jimmy Johnson VR Football",
      "Jimmy Johnson VR Football '98",
      "Jimmy White's Cue Ball 2",
      "Jingle Cats",
      "Jinx",
      "J-League Jikkyou Winning Eleven 2000",
      "J-League Winning Eleven 3",
      "J-League Winning Eleven '97",
      "J-League Winning Eleven '98-'99",
      "JoJo's Bizarre Adventure",
      "Johnny Bazookatone",
      "Jonah Lomu Rugby",
      "Judge Dredd",
      "Juggernaut",
      "Jumping Flash!",
      "Jumping Flash! 2",
      "JumpStart Wildlife Safari Field Trip",
      "Jungle Book",
      "Jungle Book Groove Party",
      "Jungle Book: Rhythm N'Groove",
      "Jupiter Strike",
      "Jurassic Park: The Lost Word",
      "K-1 Grand Prix",
      "K-1 Revenge",
      "Kagero: Deception 2",
      "Kamen Rider Kuuga (Japan only)",
      "Kartia: World of Fate",
      "Kekkon ~Marriage~ (Japan only)",
      "Kensei Sacred Fist",
      "Kickboxing",
      "Kileak: The Blood",
      "Kileak: The DNA Imperative",
      "Killer Loop",
      "King of Bowling 2",
      "The King of Fighters '95",
      "The King of Fighters '97",
      "The King of Fighters '98",
      "The King of Fighters '99",
      "The King of Fighters '99 Millennium Battle",
      "The King of Fighters: Kyo",
      "King's Field",
      "King's Field II",
      "KISS Pinball",
      "Kisetsu wo Dakishimete (Japan only)",
      "Klonoa: Door To Phantomile",
      "Klonoa Beach Volleyball",
      "Knockout Kings",
      "Knockout Kings 99",
      "Knockout Kings 2000",
      "Knockout Kings 2001",
      "Konami Antiques MSX Collection Vol.1 (Japan only)",
      "Konami Arcade Classics",
      "Kotobuki Grand Prix",
      "Koudelka",
      "Krazy Ivan",
      "Kula World",
      "Kurt Warner's Arena Football Unleashed",
      "Kurushi",
      "Lagnacure (Japan only)",
      "The Land Before Time: Great Valley Racing",
      "The Land Before Time: Return to Great Valley",
      "Land Maker",
      "Largo Winch .//Commando Sar",
      "The Last Blade",
      "Le Mans 24 Hours",
      "Legacy of Kain: Soul Reaver",
      "Legend",
      "The Legend of Dragoon",
      "Legend of Kartia",
      "Legend of Legaia",
      "Legend of Mana",
      "Lego Island 2: The Brickster's Revenge",
      "Lego Rock Raiders",
      "Lemmings",
      "3D Lemmings",
      "Libero Grande",
      "Lilo & Stitch: Trouble in Paradise",
      "Linda Cube Again (Japan only)",
      "The Lion King: Simba's Mighty Adventure",
      "The Little Mermaid II",
      "Livewire",
      "LMA Manager",
      "LMA Manager 2001",
      "LMA Manager 2002",
      "Loaded",
      "Lode Runner",
      "Lomax in Lemmingland",
      "Looney Tunes Racing",
      "Looney Tunes: Sheep Raider",
      "The Lost World: Jurassic Park",
      "Lucky Luke",
      "Lunar: Silver Star Story Complete",
      "Lunar 2: Eternal Blue Complete",
      "Machine Head",
      "Madden NFL 98",
      "Madden NFL 99",
      "Madden NFL 2000",
      "Madden NFL 2001",
      "Madden NFL 2002",
      "Madden NFL 2003",
      "Madden NFL 2004",
      "Madden NFL 2005",
      "The Maestromusic (Japan only)",
      "The Maestromusic: Christmas Edition (Japan only)",
      "The Maestromusic: Encore (Japan only)",
      "Magic: The Gathering: Battlemage",
      "Magic Carpet",
      "Major League Baseball 98",
      "Major League Baseball 99",
      "Major League Baseball 2000",
      "Major League Baseball 2001",
      "Major League Baseball 2002",
      "Major League Baseball 2003",
      "Major League Baseball 2004",
      "Major League Baseball Bottom of the 9th 99",
      "Marble Master",
      "Martial Beat (Japan only)",
      "Martial Beat 2 (Japan only)",
      "Martian Gothic: Unification",
      "Marvel Super Heroes",
      "Marvel Super Heroes vs. Street Fighter",
      "Marvel vs. Capcom EX",
      "Mary-Kate and Ashley: Magical Mystery Mall",
      "Mary-Kate and Ashley: Winner's Circle",
      "Mass Destruction",
      "Master of Monsters: Disciples of Gaia",
      "Matt Hoffman's Pro BMX",
      "Maximum Force",
      "MDK",
      "Mechwarrior 2",
      "Medal of Honor",
      "Medal of Honor: Underground",
      "MediEvil",
      "MediEvil II",
      "Mega Man 8 (Rockman 8 in Japan)",
      "Mega Man Battle and Chase",
      "Mega Man Legends (Rockman Legends in Japan)",
      "Mega Man Legends 2 (Rockman Legends 2 in Japan)",
      "Mega Man X4 (Rockman X4 in Japan)",
      "Mega Man X5 (Rockman X5 in Japan)",
      "Mega Man X6 (Rockman X6 in Japan)",
      "Memories Off (Japan only)",
      "Men In Black: The Game",
      "Men In Black - The Series: Crashdown",
      "Metal Gear Solid",
      "Metal Gear Solid: Integral (Japan only)",
      "Metal Gear Solid: VR Missions",
      "Metal Slug (Japan only)",
      "Metal Slug X",
      "Michael Owen's WLS 99",
      "Micro Machines",
      "Micro Maniacs",
      "Midnight In Vegas",
      "Mike Tyson Boxing",
      "Millennium Soldier: Expendable",
      "The Misadventures of Tron Bonne",
      "Miss Spider's Tea Party",
      "Missile Command",
      "Mission: Impossible",
      "Mitsumete Knight (Japan only)",
      "Mitsumete Knight R Daibouken hen (Japan only)",
      "M&Ms - Shell Shocked",
      "Mobil 1: Rally Championship",
      "Mobile Armor",
      "Mobile Light Force",
      "Moho",
      "Monaco Grand Prix",
      "Monkey Hero",
      "Monkey Magic",
      "Monopoly",
      "Monster Bass!",
      "Monster Rancher",
      "Monster Rancher 2",
      "Monster Rancher Battle Card: Episode II",
      "Monster Rancher Hop-A-Bout",
      "Monster Seed",
      "Monsters, Inc.",
      "Mortal Kombat 2",
      "Mortal Kombat 3",
      "Mortal Kombat 4",
      "Mortal Kombat Mythologies: Sub-Zero",
      "Mortal Kombat: Special Forces",
      "Mortal Kombat Trilogy",
      "Mort the Chicken",
      "Moto Racer",
      "Moto Racer 2",
      "Moto Racer World Tour",
      "Motocross Mania",
      "Motor Toon GP 2",
      "Motorhead",
      "Mr. Domino",
      "Mr. Driller G",
      "Mr. Driller G (Japan only)",
      "Ms. Pac-Man Maze Madness",
      "MTV Music Generator",
      "MTV Sports: Pure Ride",
      "MTV Sports: Skateboarding featuring Andy MacDonald",
      "The Mummy",
      "Muppet Monster Adventure",
      "Muppet Race Mania",
      "Music",
      "Music 2000",
      "My Disney Kitchen",
      "Myst",
      "N20",
      "Nagano Winter Olympics 98",
      "NAMCO Museum Vol. 1",
      "NAMCO Museum Vol. 2",
      "NAMCO Museum Vol. 3",
      "NAMCO Museum Vol. 4",
      "NAMCO Museum Vol. 5",
      "NAMCO Smash Court Tennis",
      "Naruto: Shinobi no Sato no Jintori Kassen",
      "NASCAR 98",
      "NASCAR 99",
      "NASCAR 2000",
      "NASCAR 2001",
      "NASCAR Heat",
      "NASCAR Rumble",
      "NASCAR Thunder 2002",
      "NBA Basketball 2000",
      "NBA Fastbreak 98",
      "NBA Hoopz",
      "NBA In the Zone 98",
      "NBA In the Zone 99",
      "NBA In the Zone 2000",
      "NBA Jam Extreme",
      "NBA Jam Tournament Edition",
      "NBA Live 97",
      "NBA Live 98",
      "NBA Live 99",
      "NBA Live 2000",
      "NBA Live 2001",
      "NBA Live 2002",
      "NBA Live 2003",
      "NBA Pro 98",
      "NBA ShootOut 98",
      "NBA ShootOut 2000",
      "NBA ShootOut 2001",
      "NBA ShootOut 2002",
      "NBA ShootOut 2003",
      "NBA Showtime: NBA on NBC",
      "NBA Tonight",
      "NCAA Final Four 99",
      "NCAA Final Four 2000",
      "NCAA Final Four 2001",
      "NCAA Football 98",
      "NCAA Football 99",
      "NCAA Football 2000",
      "NCAA Football 2001",
      "NCAA Gamebreaker 98",
      "NCAA Gamebreaker 99",
      "NCAA Gamebreaker 2000",
      "NCAA Gamebreaker 2001",
      "NCAA March Madness 98",
      "NCAA March Madness 2000",
      "NCAA March Madness 2001",
      "Nectaris: Military Madness",
      "Need for Speed",
      "Need for Speed II",
      "Need for Speed 3: Hot Pursuit",
      "Need for Speed 5",
      "Need for Speed: High Stakes",
      "Need for Speed: Porsche 2000",
      "Need for Speed: Porsche Unleashed",
      "Need for Speed: Road Challenge",
      "Need for Speed: V-Rally",
      "Need for Speed: V-Rally 2",
      "Newman/Haas Racing",
      "The Next Tetris",
      "NFL Blitz",
      "NFL Blitz 2000",
      "NFL Blitz 2001",
      "NFL Gameday",
      "NFL Gameday 98",
      "NFL Gameday 99",
      "NFL Gameday 2000",
      "NFL Gameday 2001",
      "NFL Gameday 2002",
      "NFL Gameday 2003",
      "NFL Xtreme",
      "NFL Xtreme 2",
      "N.GEN Racing",
      "NHL 98",
      "NHL 99",
      "NHL 2000",
      "NHL 2001",
      "NHL Blades of Steel 2000",
      "NHL Breakaway 98",
      "NHL Championship 2000",
      "NHL Faceoff 98",
      "NHL Faceoff 99",
      "NHL Faceoff 2000",
      "NHL Faceoff 2001",
      "NHL Rock the Rink",
      "Nick Toons Racing",
      "Nightmare Creatures",
      "Nightmare Creatures II",
      "Ninja: Shadow of Darkness",
      "No One Can Stop Mr. Domino!",
      "Novastorm",
      "Nuclear Strike",
      "O.D.T.",
      "Oddworld: Abe's Exoddus",
      "Oddworld: Abe's Oddysee",
      "Ogre Battle: March of the Black Queen",
      "Ojyousama Express (Japan only)",
      "Olympic Summer Games",
      "Omega Boost",
      "One",
      "One Piece Mansion",
      "Onside Soccer",
      "Overblood",
      "Overblood 2",
      "Overboard",
      "Pac-Man World",
      "Pajama Sam",
      "Pandemonium",
      "Pandemonium 2",
      "Panzer Front",
      "Panzer General",
      "Paradise Casino",
      "PaRappa the Rapper",
      "Parasite Eve",
      "Parasite Eve II",
      "Paro Wars (Japan only)",
      "Patriotic Pinball",
      "Perfect Assassin",
      "Perfect Weapon",
      "Persona",
      "Persona 2: Eternal Punishment",
      "Pet In TV",
      "Peter Jacobsen's Golden Tee Golf",
      "PGA Tour 96",
      "PGA Tour 97",
      "PGA Tour 98",
      "Pinball Power",
      "Pinobee",
      "Pipe Dreams 3D",
      "Pitfall 3D: Beyond the Jungle",
      "Planet of the Apes",
      "Play with the Teletubbies",
      "Pocket Fighter",
      "PO'd",
      "Point Blank",
      "Point Blank 2",
      "Point Blank 3",
      "Polaris SnoCross",
      "Policenauts (Japan only)",
      "Pong",
      "Pool Hustler",
      "Pool Shark",
      "Pop'n Music (Japan only)",
      "Pop'n Music 2 (Japan only)",
      "Pop'n Music 3 Append Disc (Japan only)",
      "Pop'n Music 4 Append Disc (Japan only)",
      "Pop'n Music 5 (Japan only)",
      "Pop'n Music 6 (Japan only)",
      "Pop'n Music: Animation Melody (Japan only)",
      "Pop'n Music: Disney Tunes (Japan only)",
      "Populous: The Beginning",
      "Porsche Challenge",
      "Power Play Sports Trivia",
      "Power Rangers Lightspeed Rescue",
      "Power Rangers Time Force",
      "Power Shovel",
      "Powerslave AKA Exhumed",
      "Power Soccer 2",
      "Power Spike Pro Beach Volleyball",
      "Powermove Pro Wrestling",
      "The Powerpuff Girls: Chemical X-Traction",
      "Poy Poy",
      "Poy Poy 2 (Japan only)",
      "Premier Manager 2000",
      "Prism Court (Japan only)",
      "Pro 18 World Tour Golf",
      "Pro Evolution Soccer",
      "Pro Pinball: Big Race USA",
      "Pro Pinball: Fantastic Journey",
      "Pro Pinball: Timeshock!",
      "Project Overkill",
      "Psybadek",
      "Psychic Detective",
      "Psychometrer Eiji (Japan only)",
      "Puchi Carat",
      "Punky Skunk",
      "Putter Golf",
      "Puyo Puyo Tsuu (Japan only)",
      "Puyo Puyo Sun (Japan only)",
      "Puyo Puyo~n (Japan only)",
      "Puzzle Star Sweep",
      "Q*Bert",
      "Qix Neo",
      "Quake II",
      "Racing",
      "Radikal Bikers X",
      "Rage Ball",
      "Rage Racer",
      "Raiden Project",
      "Railroad Tycoon 2",
      "Rainbow Six",
      "Rakugaki Showtime (Japan only)",
      "Rally Championship",
      "Rally Cross 2",
      "Rally Masters",
      "Rampage World Tour",
      "Rampage 2: Universal Tour",
      "Rampage Through Time",
      "Ranma 1/2: Battle Renaissance (Japan only)",
      "Rapid Reload",
      "Rascal",
      "Rat Attack",
      "Ray Tracers",
      "RayCrisis",
      "Rayman",
      "Rayman 2: The Great Escape",
      "Rayman Junior Level 3",
      "Rayman Brain Games",
      "Rayman Rush",
      "RayStorm",
      "Razor Freestyle Scooter",
      "RC de GO!",
      "RC Helicopter",
      "RC Revenge",
      "RC Stunt Copter",
      "Ready 2 Rumble",
      "Ready 2 Rumble: Round 2",
      "ReBoot",
      "Red Asphalt",
      "Reel Fishing",
      "Reel Fishing II",
      "Refrain Love ~Anata ni Aitai~ (Japan only)",
      "Refrain Love 2 (Japan only)",
      "Reloaded",
      "Resident Evil (Biohazard in Japan)",
      "Resident Evil: Director's Cut (Biohazard Director's Cut in Japan)",
      "Resident Evil 2 (Biohazard 2 in Japan)",
      "Resident Evil 2: Dual Shock Edition (Biohazard 2: Dual Shock Edition in Japan)",
      "Resident Evil 3: Nemesis (Biohazard 3: Last Escape in Japan)",
      "Resident Evil: Survivor (Biohazard Gun Survivor in Japan)",
      "Retro Force",
      "Return Fire",
      "Revolution X",
      "Re-Volt",
      "Rhapsody: A Musical Adventure",
      "Ridge Racer",
      "Ridge Racer Revolution",
      "Ridge Racer Type 4",
      "Rising Zan",
      "Risk",
      "Rival Schools (Rival Schools: United by Fate in Japan)",
      "Riven: The Sequel to Myst",
      "Road Rash",
      "Road Rash 3D",
      "Road Rash: Jail Break",
      "Robo Pit",
      "Robo Pit 2",
      "Rock 'Em Sock 'Em Robots",
      "Rocket Power: Team Rocket Rescue",
      "Rockman Battle & Chase (Japan only)",
      "Rogue Trip",
      "Roll Away",
      "Rollcage",
      "Rollcage Stage II",
      "Romance of the Three Kingdoms IV",
      "Romance of the Three Kingdoms V",
      "Romance of the Three Kingdoms VI",
      "Ronin Blade",
      "Roswell Conspiracies: Aliens, Myths, & Legends",
      "Rox",
      "RPG Maker",
      "R-Type Delta",
      "R-Types",
      "Rugrats: Search for Reptar",
      "Rugrats: Totally Angelica",
      "Rugrats in Paris: The Movie",
      "Runabout 2",
      "Running Wild",
      "Rushdown",
      "Sabrina the Teenage Witch: A Twitch in Time!",
      "SaGa Frontier",
      "SaGa Frontier 2",
      "Sailor Moon",
      "Saiyuki: Journey West",
      "Salamander Deluxe Pack Plus (Japan only)",
      "Saltwater Sportfishing",
      "Sammy Sosa High Heat Baseball 2001",
      "Sammy Sosa Softball Slam",
      "Sampras Extreme Tennis",
      "Samurai Deeper Kyo (Japan only)",
      "Samurai Shodown 3: Blades of Blood (Samurai Spirits 3: Zankuro Musoken in Japan)",
      "Samurai Shodown 4 Amakusa's Revenge (Samurai Spirits 4: Amakusa Kourin in Japan)",
      "Samurai Shodown: Warrior's Rage (Samurai Spirits: Warrior's Rage 2 in Japan)",
      "Samurai Spirits 1 (Japan only)",
      "Samurai Spirits 2 (Japan only)",
      "Samurai Spirits Kenkyaku Shinan Pack (Japan only)",
      "Sanvein",
      "S.C.A.R.S.",
      "Scooby-Doo and the Cyber Chase",
      "Scooter Racing",
      "Scrabble",
      "SD Gundam G Generation F.I.F. (Japan only)",
      "Sensible Soccer",
      "Sentinel Returns",
      "Serial Experiments Lain",
      "Sesame Street Sports",
      "Sesame Street: Elmo's Letter Adventure",
      "Sesame Street: Elmo's Number",
      "Sexy Parodius (Japan only)",
      "Shadow Gunner",
      "Shadow Madness",
      "Shadow Man",
      "Shadow Master",
      "Shadow Tower",
      "Shane Warne Cricket '99",
      "Shanghai: True Valor",
      "Shaolin",
      "Sheep",
      "Sheep, Dog 'n' Wolf",
      "Shellshock",
      "Shin Megami Tensei (Japan only)",
      "Shinseiki Evangelion: Eva to Yukai na Nakama Tachi (Japan only)",
      "Shinseiki Evangelion: Koutetsu no Girlfriend (Japan only)",
      "Shinseiki Evangelion: Koutetsu no Girlfriend 2 (Japan only)",
      "Shinseiki GPX: Cyber Formula (Japan only)",
      "Shinsetsu Samurai Spirits Bushido Retsuden (Japan only)",
      "Shipwreckers",
      "Shockwave Assault",
      "Shooter: Space Shot",
      "Shooter: Starfight Sanvein",
      "Shrek: Treasure Hunt",
      "Silent Bomber",
      "Silent Hill",
      "Silhouette Mirage",
      "SilverLoad",
      "SimCity 2000",
      "Sim Theme Park",
      "The Simpsons Wresling",
      "Skullmonkeys",
      "Sky Sports Football Quiz",
      "Skydiving Extreme",
      "Slam 'n' Jam 96",
      "Slayers Royal (Japan only)",
      "Slayers Royal 2 (Japan only)",
      "Slayers Wonderful (Japan only)",
      "Sled Storm",
      "Small Soldiers",
      "Smash Court Tennis",
      "Smurfs",
      "Smurf Racer",
      "Sno-Cross Championship Racing",
      "Snow Racer",
      "Snowboarding",
      "Sokaigi (Japan only)",
      "Sol Divide",
      "Sorceror's Maze",
      "Sotsugyou M ~Seito Kaichou no Karei naru Inbou~ (Japan only)",
      "Soul Blade (Soul Edge in Japan)",
      "Soul of the Samurai",
      "South Park",
      "South Park: Chef's Luv Shack",
      "South Park Rally",
      "Soviet Strike",
      "Space Battleship Yamato Fan Disc Part 1 (Japan only)",
      "Space Battleship Yamato: Farewell Warriors of Love (Japan only)",
      "Space Debris",
      "Space Invaders",
      "Space Invaders Simple 1500 (Japan only)",
      "Space Jam",
      "Spawn: The Eternal",
      "Spec Ops: Airborne Commando",
      "Spec Ops: Covert Assault",
      "Spec Ops: Ranger Elite",
      "Spec Ops: Stealth Patrol",
      "Speed Machine",
      "Speed Punks",
      "Speed Racer",
      "Speedball 2100",
      "Spice World",
      "Spider-Man",
      "Spider-Man 2: Enter Electro",
      "Spider: The Video Game",
      "Spin Jam",
      "SpongeBob SquarePants",
      "Sports Car GT",
      "Spot Goes To Hollywood",
      "Spyro The Dragon",
      "Spyro 2: Ripto's Rage!",
      "Spyro: Year of the Dragon",
      "Star Gladiator",
      "Star Ocean: The Second Story",
      "Star Trek: Invasion",
      "Star Wars Episode 1: Jedi Power Battles",
      "Star Wars Episode 1: The Phantom Menace",
      "Star Wars: Dark Forces",
      "Star Wars: Demolition",
      "Star Wars: Masters of Teras Kasi",
      "Star Wars: Rebel Assault II",
      "Starfighter 3000",
      "Starwinder",
      "Steel Harbinger",
      "Steel Reign",
      "Streak",
      "Street Fighter Alpha (Street Fighter Zero in Japan)",
      "Street Fighter Alpha 2 (Street Fighter Zero 2 in Japan)",
      "Street Fighter Alpha 3 (Street Fighter Zero 3 in Japan)",
      "Street Fighter II Collection",
      "Street Fighter Collection 2",
      "Street Fighter EX plus Alpha",
      "Street Fighter EX2 Plus",
      "Street Fighter: The Movie",
      "Street Racer",
      "Street Racquetball",
      "Street Scooters",
      "Street Sk8ter",
      "Street Sk8ter 2",
      "Strider 2",
      "Strike Force Hydra",
      "Striker Pro 2000",
      "Strikers 1945",
      "Strikers 1945 II",
      "Stuart Little 2",
      "Submarine Commander",
      "Suikoden Tendo 108 Sei (Japan only)",
      "Suikoden",
      "Suikoden II",
      "Suikogaiden Vol. 1 - Swordsman of Harmonia (Japan only)",
      "Suikogaiden Vol. 2 - The Duel of Crystal Valley (Japan only)",
      "Summon Night (Japan only)",
      "Summon Night 2 (Japan only)",
      "Super Bubble Pop",
      "Super Duper Sumos",
      "Super Pang Collection",
      "Super Puzzle Fighter II Turbo (Super Puzzle Fighter II X in Japan)",
      "Super Robot Wars Alpha",
      "Super Robot Wars Alpha Gaiden (Japan only)",
      "Super Shot Soccer",
      "Superbike 2000",
      "SuperCross 2000",
      "SuperCross Circuit",
      "Supersonic Racers",
      "Superstar Dance Club ♯1 Hits!!!",
      "Surf Riders",
      "Susume! Taisen Puzzle Dama (Japan only)",
      "Sven Goran Eriksson's World Challenge",
      "Sydney 2000",
      "Syndicate Wars",
      "Syphon Filter",
      "Syphon Filter 2",
      "Syphon Filter 3",
      "T'ai Fu: Wrath of the Tiger",
      "T.R.A.G.",
      "Tactics Ogre",
      "Tail Concerto",
      "Tales of Destiny",
      "Tales of Eternia",
      "Tales of Phantasia (Japan only)",
      "Tank Racer",
      "Tarzan",
      "Team Buddies",
      "Team LOSI RC Racing",
      "Tear Ring Saga (Japan only)",
      "Tecmo's Deception",
      "Tekken",
      "Tekken 2",
      "Tekken 3",
      "Tempest X3",
      "Tenchi Muyo! Toukou Muyou (Japan only)",
      "Tenchu: Stealth Assassins",
      "Tenchu 2: Birth of the Stealth Assassins",
      "Tennis",
      "Tennis Arena",
      "Terracon",
      "Test Drive 4",
      "Test Drive 5",
      "Test Drive 6",
      "Test Drive: Le-Mans",
      "Test Drive Off-Road",
      "Test Drive Off-Road 2",
      "Test Drive Off-Road 3",
      "Tetris Plus",
      "Tetris with Card Captor Sakura Eternal Heart (Japan only)",
      "The Renai Simulation ~Natsuiro Celebration~ SIMPLE 1500 Series Vol. 36 (Japan only)",
      "Theme Hospital",
      "Theme Park",
      "Theme Park World",
      "This Is Football",
      "This Is Football 2",
      "Thousand Arms",
      "Thrasher: Skate and Destroy",
      "Threads of Fate",
      "Three Lions",
      "Thrill Kill (Bootleg)",
      "Thunder Force V",
      "Tiger Woods '99",
      "Tiger Woods PGA Tour 2000",
      "Tigger's Honey Hunt",
      "Time Commando",
      "Time Crisis",
      "Time Crisis: Project Titan",
      "Tiny Tank",
      "Tiny Toon Adventures: The Great Beanstalk (Tiny Toon Adventures: Revenge of the Beanstalk in Europe)",
      "Tiny Toon Adventures: Toonenstein -- Dare to Scare",
      "Tiny Toon Adventures: Plucky's Big Adventure",
      "Tobal No. 1",
      "Tobal 2 (Japan only)",
      "TOCA Touring Car Championship",
      "TOCA Touring Cars 2",
      "TOCA World Touring Cars",
      "Tokimeki Memorial (Japan only)",
      "Tokimeki Memorial Drama Series Vol. 1 Nijiiro no Seishun (Japan only)",
      "Tokimeki Memorial Drama Series Vol. 2 Irodori no Love Song (Japan only)",
      "Tokimeki Memorial Drama Series Vol. 3 Tabidachi no Uta (Japan only)",
      "Tokimeki Memorial Private Collection (Japan only)",
      "Tokimeki Memorial Selection: Fujisaki Shiori (Japan only)",
      "Tokimeki Memorial Taisen Pazurudama (Japan only)",
      "Tokimeki Memorial Taisen Tokkaedama (Japan only)",
      "Tokimeki Memorial 2 (Japan only)",
      "Tokimeki Memorial 2 Substories: Dancing Summer Vacation (Japan only)",
      "Tokimeki Memorial 2 Substories: Leaping School Festival (Japan only)",
      "Tokimeki Memorial 2 Substories: Memories Ringing On (Japan only)",
      "Tokimeki Memorial 2 Taisen Pazurudama (Japan only)",
      "Tokimeki no Houkago ~Ne Quiz Shiyo~ (Japan only)",
      "Tokyo Highway Battle",
      "Tom Clancy's Rainbow Six: Rogue Spear",
      "Tom & Jerry in House Trap",
      "Tomb Raider",
      "Tomb Raider II",
      "Tomb Raider III: Adventures of Lara Croft",
      "Tomb Raider Chronicles",
      "Tomb Raider: The Last Revelation",
      "Tomba!",
      "Tomba! 2: The Evil Swine Return",
      "Tombi",
      "Tombi 2",
      "Tommy Makinen Rally",
      "Tomorrow Never Dies",
      "Tonka Space Station",
      "Tony Hawk's Pro Skater",
      "Tony Hawk's Pro Skater 2",
      "Tony Hawk's Pro Skater 3",
      "Tony Hawk's Pro Skater 4",
      "Tony Hawk's Skateboarding",
      "Toonenstein: Dare To Scare",
      "Top Gun: Fire At Will",
      "Torneko: The Last Hope",
      "Toshinden Subaru AKA Battle Arena Toshinden 4",
      "Total Eclipse Turbo",
      "Total NBA 96",
      "Total NBA 97",
      "Toy Story 2",
      "Toy Story Racer",
      "Track & Field",
      "Transformers: Beast Wars Transmetals",
      "Transport Tycoon",
      "Trap Gunner",
      "Trash It",
      "Treasure Gear (Japan only)",
      "Treasures of the Deep",
      "Trespasser",
      "Trickin' Snowboarder",
      "Triple Play '99",
      "Triple Play 2000",
      "Triple Play 2001",
      "Triple Play Baseball",
      "True Love Story (Japan only)",
      "True Love Story ~Remember my Heart~ (Japan only)",
      "True Love Story 2 (Japan only)",
      "True Love Story Fan Disk (Japan only)",
      "True Pinball",
      "Tunnel B1",
      "Turbo Prop Racing",
      "Turbo Twister",
      "Turnabout",
      "Twinbee RPG (Japan only)",
      "Twinbee Taisen Puzzle Dama (Japan only)",
      "Twisted Metal",
      "Twisted Metal 2",
      "Twisted Metal 3",
      "Twisted Metal 4",
      "Twisted Metal: Small Brawl",
      "Tyco RC: Assault With a Battery",
      "UEFA Champions League 99/00",
      "UEFA Euro 2000",
      "UEFA Striker",
      "Ultima Underworld The Stygian Abyss",
      "Ultimate 8-Ball",
      "Ultimate Fighting Championship",
      "UmJammer Lammy",
      "The Unholy War",
      "Uprising X",
      "Urban Chaos",
      "V-Rally",
      "V-Rally 2",
      "Vagrant Story",
      "Valkyrie Profile",
      "Vampire Hunter D",
      "Vanark",
      "Vandal Hearts",
      "Vandal Hearts II",
      "Vanguard Bandits (Epica Stella in Japan)",
      "Vanishing Point",
      "Vegas Casino",
      "Vegas Games 2000",
      "Vib-Ribbon",
      "Victory Boxing Championship Edition",
      "V.I.P.",
      "Vigilante 8",
      "Vigilante 8: Second Offense",
      "Viper",
      "Virtual Kasparov",
      "Virus",
      "VR Baseball '97",
      "VR Baseball '99",
      "VR Sports Powerboat Racing",
      "Vs.",
      "Walt Disney World Quest: Magical Racing Tour",
      "Walt Disney's Jungle Book Rhythm n' Groove",
      "Warcraft 2: The Dark Saga",
      "War Games: DefCon 1",
      "War Jetz",
      "Warhammer: Dark Omen",
      "Warhammer: Shadow of the Horned Rat",
      "Warhawk",
      "Warpath: Jurassic Park",
      "Warriors of Might & Magic",
      "Warzone 2100",
      "Wayne Gretsky's 3D Hockey 98",
      "WCW Backstage Assault",
      "WCW Mayhem",
      "WCW Nitro",
      "WCW/nWo Thunder",
      "WCW vs The World",
      "WDL Thunder Tanks",
      "The Weakest Link",
      "Wedding Peach: Doki Doki Oiro-naoshi (Japan only)",
      "Wheel of Fortune",
      "Wheel of Fortune 2",
      "Who Wants to be a Millionaire",
      "Who Wants to be a Millionaire: Second Edition",
      "Who Wants to be a Millionaire: Third Edition",
      "Wild 9",
      "Wild ARMs",
      "Wild ARMs 2",
      "Wild Rapids",
      "The Wild Thornberrys: Animal Adventure",
      "Williams Arcade's Greatest Hits",
      "Windsurfer's Paradise",
      "Wing Commander IV: The Price of Freedom",
      "Wing Over 2",
      "Winnie the Pooh: Kindergarten",
      "Winnie the Pooh: Preschool",
      "wipEout",
      "wipEout XL (wipEout 2097 in Europe)",
      "wip3out",
      "wip3out: Special Edition",
      "Wizardry VII: Gadeia no Houshu (Japan only)",
      "Wizardry Empire (Japan only)",
      "Wizardry Empire 2 (Japan only)",
      "Wizardry: Dimguil (Japan only)",
      "Wizardry: Llylgamyn Saga (Japan only)",
      "Wizardry: New Age of Llylgamyn (Japan only)",
      "Woody Woodpecker Racing",
      "Wonders 3 Arcade Gears (Japan only)",
      "World Championship Snooker",
      "World Cup 98",
      "World Destruction League: Thunder Tanks",
      "The World Is Not Enough",
      "World League Soccer",
      "World's Scariest Police Chases",
      "Worms",
      "Worms Armageddon",
      "Worms Pinball",
      "Worms World Party",
      "Wreckin' Crew",
      "Wu-Tang: Shaolin Style",
      "WWF Attitude",
      "WWF In Your House",
      "WWF SmackDown!",
      "WWF SmackDown! 2: Know Your Role",
      "WWF War Zone",
      "WWF Wrestlemania: The Arcade Game",
      "X2",
      "X: Unmei no Takatai",
      "X-Bladez: Inline Skater",
      "X-COM: Enemy Unknown",
      "X-COM: UFO Defense",
      "X-COM 2: Terror From the Deep",
      "X-Files",
      "X-Men: Children of the Atom",
      "X-Men: Mutant Academy",
      "X-Men: Mutant Academy 2",
      "X-Men: Mutant Wars",
      "X-Men vs. Street Fighter",
      "X-Racing",
      "Xena: Warrior Princess",
      "Xenocracy",
      "Xenogears",
      "Xevious 3D/G",
      "Xevious 3D/G+",
      "X Games Pro Boarder",
      "XS Junior League Dodgeball",
      "XS Junior League Football",
      "XS Junior League Soccer",
      "XS Moto",
      "Yarudora Series Vol. 1: Double Cast",
      "Yarudora Series Vol. 3: Sampaguita",
      "You Don't Know Jack",
      "You Don't Know Jack! Mock 2",
      "Yu-Gi-Oh! Forbidden Memories",
      "Yuukyuu Kumikyoku All Star Project",
      "Z-Gundam (Japan only)",
      "Zanac X Zanac (Japan only)",
      "Zen-Nippon Pro Wrestling: Ouja no Kon",
      "ZeiramZone",
      "Zero4 Champ Doozy-J",
      "Zero Divide",
      "Zero Divide 2",
      "Zeus: Carnage Heart Second",
      "Zig Zag Ball",
      "Zill'Oll",
      "Zoboomafoo",
      "Zoids",
      "Zoids 2: Heric vs Guylos (Japan only)",
      "Zoop"
    ];

    return allGames;
  };

  ///////////// end of my new functions /////////////

  // Sets up the browser for tests
  this.setUp = function(startUrl, viewportWidth, viewportHeight) {
    this.browserClass.setViewportSize({
      width: viewportWidth,
      height: viewportHeight
    });

    this.browserClass.url(startUrl);
  };

  // Take Screenshot of test
  this.takeScreenshot = function(imageName) {
    imageName = typeof imageName !== "undefined" ? imageName : false;
    if (typeof imageName === "string") {
      this.browserClass.saveScreenshot(
        "screenshots/" + this.screenshotNumber + "-" + imageName + ".png"
      );
    } else {
      this.browserClass.saveScreenshot(
        "screenshots/" + this.screenshotNumber + ".png"
      );
    }

    this.screenshotNumber = this.screenshotNumber + 1;
  };

  // Input the login details to contour
  this.loginToContour = function(userid, userPassword) {
    console.log("Logging in as User ID: " + process.env.USERID);
    console.log("With password: " + process.env.USERPASS);

    this.browserClass.waitForVisible("#username");
    this.browserClass.waitForVisible("#password");

    this.browserClass.setValue("#username", process.env.USERID);
    this.browserClass.setValue("#password", process.env.USERPASS);

    this.browserClass.click("#button");

    this.browserClass.waitForVisible(".clientListTitle", 60000);
  };

  // Choose which client to use
  this.chooseClient = function(clientName) {
    this.browserClass.pause(5000);
    this.browserClass.click(".clientName*=" + clientName);
    this.browserClass.waitForVisible(".welcome*=Welcome back", 60000);
  };

  // Input the name of new campaign
  this.newCampaign = function(campaignType) {
    this.browserClass.click(".tool-name*=Campaign");
    // this.takeScreenshot('welcome-to-campaign-' + Date.now());
    this.browserClass.waitForExist("p*=Welcome to Campaign", 60000);
    this.browserClass.click(".listitem*=Start a new campaign");
    this.browserClass.click("button=next");

    // run once
    if (campaignType == "runOnce") {
      this.browserClass.click(".listitem*=Run once Campaign");
    } else if ("Recurring") {
      // else must be recurring
      // recurring
      this.browserClass.click(".listitem*=Recurring Campaign");
    }

    this.browserClass.click("button=next");
    this.browserClass.waitForExist(
      ".x-form-item-label*=Enter a campaign name:"
    );
    var randomNumber =
      Math.floor(Math.random() * (909090 - 101010 + 1)) + 101010;
    this.browserClass.setValue('[name="newCamDesc"]', "ACTestDescription");
    this.browserClass.setValue('[name="newCamName"]', "ACTest" + randomNumber);
    this.browserClass.waitForVisible(
      "//table[not(contains(@class,'x-item-disabled')) and contains(@class,'x-btn-wrap')]//button[contains(text(),'Save')]"
    );
    this.browserClass.click("button=Save");
    this.browserClass.waitForVisible("//button[contains(text(),'Yes')]");
    this.browserClass.click("button=Yes");
    this.browserClass.waitForExist(".cmtMiniTbar", 60000);
    return "ACTest" + randomNumber;
  };

  this.loadCampaign = function(campaignName) {
    this.browserClass.click(".tool-name*=Campaign");
    this.browserClass.waitForExist("p*=Welcome to Campaign");
    this.browserClass.click(".listitem*=Load a saved campaign");
    this.browserClass.click("button=next");

    this.browserClass.waitForExist(
      "p*=These are the saved campaigns which you can view or modify"
    );
    this.browserClass.waitForExist(
      ".cmtSplashPage .cmtSplashAction .seqMgrListView .listitem"
    );
    this.browserClass.click(".cmtSplashPage input.x-form-text.x-form-field");
    this.browserClass.setValue(
      ".cmtSplashPage input.x-form-text.x-form-field.x-form-focus",
      campaignName
    );
    this.browserClass.waitForExist(".listitem*=" + campaignName);

    this.browserClass.click("h3*=" + campaignName);

    this.browserClass.click("button=Load");
    this.browserClass.waitForExist(".cmtMiniTbar", 60000);
  };

  // Drag an item onto canvas
  this.dragItemOntoCanvas = function(item, place, x, y) {
    this.browserClass.click(".cmtMiniTbar .icon-contour-tool");
    switch (item) {
      case "timer":
        this.browserClass.moveToObject(
          ".cmtToolBox li.timer .icon-contour-timer"
        );
        break;
      case "email":
        this.browserClass.moveToObject(".cmtToolBox .icon-contour-live-email");
        break;
      case "start timer":
        this.browserClass.moveToObject(
          ".cmtToolBox li.start .icon-contour-timer"
        );
        break;
      case "extract":
        this.browserClass.moveToObject(".cmtToolBox .icon-contour-download");
        break;
      case "abtest":
        this.browserClass.moveToObject(".cmtToolBox .icon-contour-abtest");
        break;
      case "sms":
        this.browserClass.moveToObject(".cmtToolBox .icon-contour-sms");
        break;
      case "rule":
        this.browserClass.moveToObject(".cmtToolBox .icon-contour-rule");
        break;
      case "sticky note":
        this.browserClass.moveToObject(".cmtToolBox .icon-contour-unpin");
        break;
      case "rapid":
        this.browserClass.moveToObject(".cmtToolBox .icon-contour-rapid");
        break;
    }

    this.browserClass.buttonDown();
    this.browserClass.moveToObject(place, x, y);
    this.browserClass.buttonUp();
    this.browserClass.pause(1000);
  };

  // Drag an item onto canvas
  this.moveItemOnCanvas = function(item, place, x, y) {
    this.browserClass.moveToObject(item);

    this.browserClass.buttonDown();
    this.browserClass.moveToObject(place, parseInt(x), parseInt(y));
    // this.browserClass.moveToObject(place,500,300);
    this.browserClass.buttonUp();
    this.browserClass.pause(1000);
  };

  // Drag an object from the toolbar
  this.dragFromTool = function(id, tool, listItem) {
    this.browserClass.click(".cmtMiniTbar " + tool);

    var headingToSearch = "";
    var keysToEnter = "";

    switch (listItem) {
      case "recipient":
        headingToSearch = "Segments";
        keysToEnter = "0 UT ListOfRecipients001";
        break;
      case "html":
        headingToSearch = "HTML Creatives";
        keysToEnter = "000_UT_ReDye_001";
        break;
      case "text":
        headingToSearch = "Text Creatives";
        keysToEnter = "000_UT_BasicNoMergeFields";
        break;
      case "rule":
        headingToSearch = "Rules";
        keysToEnter = "not opened previous schedule";
        break;
      case "list":
        headingToSearch = "Lists";
        keysToEnter = "0 0 0 0 UT Seedlist 001";
        break;
      case "report":
        headingToSearch = "Reports";
        keysToEnter = "0000 UT Reports";
        break;
    }

    this.browserClass
      .element(
        "//span[contains(@class,'x-panel-header-text') and (contains(text(),'" +
          headingToSearch +
          "'))]/parent::div/parent::div//div[contains(@class,'x-form-field-wrap')]"
      )
      .click(".x-form-text");
    this.browserClass.keys(keysToEnter);
    this.browserClass.click(
      "//div[contains(@class,'x-form-field-wrap x-trigger-wrap-focus')]//img[contains(@class,'x-form-trigger x-form-search-trigger')]"
    );
    this.browserClass.waitForVisible(
      "//div[contains(@class,'col') and (contains(text(),'" +
        keysToEnter +
        "'))]"
    );
    this.browserClass.moveToObject(
      "//div[contains(@class,'col') and (contains(text(),'" +
        keysToEnter +
        "'))]"
    );
    this.browserClass.buttonDown();
    this.browserClass.moveToObject("#" + id, 0, 0);
    this.browserClass.buttonUp();
  };

  // Drag an object from the toolbar based on search term passed through
  this.dragFromToolWithSearchTerm = function(id, tool, listItem, searchTerm) {
    this.browserClass.click(".cmtMiniTbar " + tool);

    var headingToSearch = "";

    switch (listItem) {
      case "recipient":
        headingToSearch = "Segments";
        break;
      case "html":
        headingToSearch = "HTML Creatives";
        break;
      case "text":
        headingToSearch = "Text Creatives";
        break;
      case "rule":
        headingToSearch = "Rules";
        break;
      case "list":
        headingToSearch = "Lists";
        break;
      case "report":
        headingToSearch = "Reports";
        break;
    }

    this.browserClass
      .element(
        "//span[contains(@class,'x-panel-header-text') and (contains(text(),'" +
          headingToSearch +
          "'))]/parent::div/parent::div//div[contains(@class,'x-form-field-wrap')]"
      )
      .click(".x-form-text");
    this.browserClass.keys(searchTerm);
    this.browserClass.click(
      "//div[contains(@class,'x-form-field-wrap x-trigger-wrap-focus')]//img[contains(@class,'x-form-trigger x-form-search-trigger')]"
    );
    this.browserClass.waitForVisible(
      "//div[contains(@class,'col') and (contains(text(),'" +
        searchTerm +
        "'))]"
    );
    this.browserClass.moveToObject(
      "//div[contains(@class,'col') and (contains(text(),'" +
        searchTerm +
        "'))]"
    );
    this.browserClass.buttonDown();
    this.browserClass.moveToObject("#" + id, 0, 0);
    this.browserClass.buttonUp();
  };

  // Drag an object from the toolbar but do not drop, also picks which object to drag
  this.dragDontDrop = function(id, tool, listItem, listNumber) {
    this.browserClass.click(".cmtMiniTbar " + tool);
    switch (listItem) {
      case "recipient":
        this.browserClass.waitForExist(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(3)"
        );
        this.browserClass.moveToObject(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(3)",
          0,
          0
        );
        break;
      case "html":
        this.browserClass.waitForExist(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(2)"
        );
        this.browserClass.moveToObject(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(2)",
          0,
          0
        );
        break;
        "";
      case "text":
        this.browserClass.waitForExist(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(2)"
        );
        this.browserClass.moveToObject(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(2)",
          0,
          0
        );
        break;
      case "rule":
        this.browserClass.waitForExist(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(" +
            listNumber +
            ")"
        );
        this.browserClass.moveToObject(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(" +
            listNumber +
            ")",
          0,
          0
        );
        break;
      case "list":
        this.browserClass.waitForExist(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(1)"
        );
        this.browserClass.moveToObject(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(1)",
          0,
          0
        );
        break;
      case "report":
        this.browserClass.waitForExist(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(3)"
        );
        this.browserClass.moveToObject(
          ".cmtToolBox .x-panel-noborder:not(.x-hide-display) .x-panel-noborder .dragItem.listitem:nth-child(3)",
          0,
          0
        );
        break;
    }
    this.browserClass.buttonDown();
    this.browserClass.moveToObject("#" + id, 0, 0);
  };

  // Gets Id(s) of last added item
  this.lastItemAddedOntoCanvas = function(numItems) {
    // if numItems isnt passed as a parameter, then we just want to return a single item id
    if (typeof numItems == "undefined") {
      var id = this.browserClass.execute(function() {
        return redeye.campaignSeqMgr.sequenceItems.get(
          redeye.campaignSeqMgr.sequenceItems.length - 1
        ).id;
      });

      return id.value;
    } else {
      // else return (n) item ids that were last added to the canvas

      var ids = this.browserClass.execute(function(numItems) {
        var numItemsOnCanvas = redeye.campaignSeqMgr.sequenceItems.length;

        var itemIds = [];

        for (i = 0; i < numItems; numItems--) {
          var indexToPush = numItemsOnCanvas - numItems;

          itemIds.push(redeye.campaignSeqMgr.sequenceItems.get(indexToPush).id);
        }

        return itemIds;
      }, numItems);

      // console.log(ids.value);

      return ids.value;
    }
  };

  // Get Id of chosen Item
  this.getIdOfItem = function(idNumber) {
    var id = this.browserClass.execute(function(x) {
      return redeye.campaignSeqMgr.sequenceItems.get(x).id;
    }, idNumber);
    return id.value;
  };

  // Click Radial button of an item on the canvas
  this.clickRadialButton = function(button, id, item) {
    this.browserClass.moveToObject("#" + id, 0, 0);

    item = typeof item !== "undefined" ? item : false;

    if (item == "sticky note") {
      this.browserClass.moveToObject("#" + id, 0, 0);
      this.browserClass.click(".seqEl_sticky_note");
      this.browserClass.click(".seqEl_sticky_note");
      this.browserClass.click(button);
    } else {
      this.browserClass.click("#" + id + " .wheel " + button);
    }
  };

  // Connect two items to each other
  this.connectItems = function(idFirst, idSecond) {
    this.browserClass.moveToObject("#" + idFirst);
    this.browserClass.moveToObject("#" + idFirst + " .handle");
    this.browserClass.buttonDown();
    this.browserClass.moveToObject("#" + idSecond);
    this.browserClass.buttonUp();
  };

  // Connect rule to an item with a chosen handle
  this.connectRules = function(idFirst, idSecond, handle) {
    this.browserClass.moveToObject("#" + idFirst);
    this.browserClass.moveToObject("#" + idFirst + handle);
    this.browserClass.buttonDown();
    this.browserClass.moveToObject("#" + idSecond);
    this.browserClass.buttonUp();
  };

  this.changeTimerDateAndTime = function(id, hourPick, minPick) {
    this.clickRadialButton(".icon-contour-edit", id);
    this.browserClass.waitForVisible(".x-window-header-text=Edit the Timer");
    this.browserClass.setValue("//input[@name='timerHourPicker']", hourPick);
    this.browserClass.setValue("//input[@name='timerMinsPicker']", minPick);
    this.browserClass.click(
      "//div[@id = 'stopDragging']//button[contains(text(),'OK')]"
    );
    this.browserClass.pause(1000);
  };

  //////////////// Start of Marks new functions ////////////////

  // Save a schedule in CMT based on its ext id
  this.saveSchedule = function(id) {
    this.clickRadialButton(".icon-contour-save", id);
    var randomNumber =
      Math.floor(Math.random() * (909090 - 101010 + 2)) + 101010;
    this.browserClass.waitForVisible(
      ".x-form-text.x-form-field.x-form-empty-field"
    );
    this.browserClass.setValue(
      ".x-form-text.x-form-field.x-form-empty-field",
      "Emaill" + randomNumber
    );
    this.browserClass.element('.x-window[style*="visible"]').click("button=OK");
    this.browserClass.waitForVisible(".infoMsg*=Campaign Saved");
    return randomNumber;
  };

  // Save a schedule in CMT based on its ext id
  this.commissionSchedule = function(id, scheduleType) {
    this.clickRadialButton(".icon-contour-commission", id);
    this.browserClass.waitForVisible(
      "//button[contains(@class,'x-btn-text') and contains(text(),'Commission')]"
    );
    this.browserClass.click(
      "//button[contains(@class,'x-btn-text') and contains(text(),'Commission')]"
    );

    switch (scheduleType) {
      case "extract":
        this.browserClass.click(
          "//button[contains(@class,'x-btn-text') and contains(text(),'Extract Now')]"
        );
        break;
    }

    this.browserClass.waitForVisible(".infoMsg*=Campaign Saved");
    this.browserClass.waitForVisible(
      "//div[contains(@id,'" +
        id +
        "')]//div[contains(@class,'scheduleStatus')]//h5[contains(text(),'Live')]"
    );
  };

  // Fill in all required radial icons required to get email to proof stage
  this.completeEmailSchedule = function(id) {
    // set subject line
    this.clickRadialButton(".icon-contour-subject", id);
    this.browserClass.waitForVisible("#subjectline");
    this.browserClass.pause(2000);
    var randomNumber =
      Math.floor(Math.random() * (909090 - 101010 + 1)) + 101010;
    this.browserClass.setValue("#subjectline", "NewCampaign" + randomNumber);
    this.browserClass.element('.x-window[style*="visible"]').click("button=OK");
    this.browserClass.pause(2000);

    // Clicks on the friendly from radial button, chooses an option and presses OK
    this.clickRadialButton(".icon-contour-friendlyfrom", id);
    this.browserClass.waitForVisible(".x-window-header.x-window-draggable");
    this.browserClass.element('.x-window[style*="visible"]').click("button=OK");

    // drag random segment onto email
    this.dragFromTool(id, ".icon-contour-recipient", "recipient");

    // drag html creative onto email
    this.dragFromTool(id, ".icon-contour-html", "html");

    // drag text creative onto email
    this.dragFromTool(id, ".icon-contour-text", "text");
  };

  // send proof
  this.sendScheduleProof = function(id) {
    this.clickRadialButton(".icon-contour-proof", id);
    this.browserClass.waitForVisible(".x-window-header.x-window-draggable");
    this.browserClass.waitForVisible(
      ".x-window.pickerWindow .seqMgrListView .listitem.clearfix:nth-child(1)"
    );
    this.browserClass.click(
      ".x-window.pickerWindow .seqMgrListView .listitem.clearfix:nth-child(1)"
    );
    this.browserClass.click("button=Send Proof");
    this.browserClass.waitForVisible(".infoMsg*=Proof Sent", 60000);
  };

  this.clickButtonInCurrentOpenWindow = function(buttonText) {
    this.browserClass.waitForVisible(
      "//div[contains(@class,'x-window') and contains(@style,'visibility: visible')]//button[text()='" +
        buttonText +
        "']"
    );
    this.browserClass.click(
      "//div[contains(@class,'x-window') and contains(@style,'visibility: visible')]//button[text()='" +
        buttonText +
        "']"
    );
  };

  ///////// Function for AB Test /////////

  this.completeABSubjectLineSchedule = function(id) {
    // set subject line
    this.clickRadialButton(".icon-contour-subject", id);
    this.browserClass.waitForVisible("#subjectlineA");
    this.browserClass.pause(2000);
    var randomNumber =
      Math.floor(Math.random() * (909090 - 101010 + 1)) + 101010;
    this.browserClass.setValue("#subjectlineA", "NewCampaign" + randomNumber);
    this.browserClass.setValue("#subjectlineB", "NewCampaign" + randomNumber);
    this.browserClass.element('.x-window[style*="visible"]').click("button=OK");
    this.browserClass.pause(2000);

    // Clicks on the friendly from radial button,and presses OK
    this.clickRadialButton(".icon-contour-friendlyfrom", id);
    this.browserClass.waitForVisible(".x-window-header.x-window-draggable");
    this.browserClass.element('.x-window[style*="visible"]').click("button=OK");

    //Remove rules
    this.clickRadialButton(".icon-contour-recipient", id);
    this.browserClass.waitForVisible(
      "//span[contains(@class,'x-window-header-text') and contains(text(),'Edit the Recipients')]"
    );
    this.browserClass
      .element('.x-window[style*="visible"]')
      .click(".listitem.clearfix.seqMgrListView-selected:nth-child(1)");
    this.browserClass
      .element('.x-window[style*="visible"]')
      .click(".listitem.clearfix.seqMgrListView-selected:nth-child(2)");
    this.browserClass
      .element('.x-window[style*="visible"]')
      .click("button=Save");

    // drag html creative onto ab schedule
    this.dragFromTool(id, ".icon-contour-html", "html");

    // drag text creative onto ab schedule
    this.dragFromTool(id, ".icon-contour-text", "text");
  };

  //Change start timer inorder to commission an AB schedule
  this.changeStartTimer = function(id, hourPick, minPick) {
    this.clickRadialButton(".icon-contour-edit", id);
    this.browserClass.waitForVisible(".x-window-header-text=Edit the Timer");
    this.browserClass.setValue("//input[@name='timerHourPicker']", hourPick);
    this.browserClass.setValue("//input[@name='timerMinsPicker']", minPick);
    this.browserClass.click(
      "//div[@id = 'stopDragging']//button[contains(text(),'OK')]"
    );
    this.browserClass.waitForVisible(
      "//div[contains(@class,'x-panel') and not(contains (@class,'x-masked'))]//div[contains(@class,'x-panel-bwrap')]//div[contains(@class,'x-panel-body')]//div[contains(@class,'cmtMiniTbar')]"
    );
  };
};
