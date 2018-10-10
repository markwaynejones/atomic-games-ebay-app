exports.config = {

  // =====================
  // Server Configurations
  // =====================
  // Host address of the running Selenium server. This information is usually obsolete as
  // WebdriverIO automatically connects to localhost. Also if you are using one of the
  // supported cloud services like Sauce Labs, Browserstack or Testing Bot you also don't
  // need to define host and port information because WebdriverIO can figure that our
  // according to your user and key information. However if you are using a private Selenium
  // backend you should define the host address, port, and path here.
  //
  // host: '192.168.127.135',
  // host: '192.168.127.187',
  port: '4444',
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    'tests-to-run/*.js'
  ],
  // define specific suites
  suites: {
    allTests: [
      'tests/**/*.js'
    ],
    allComboTests: [
      'tests/all-combo-tests/*.js'
    ],
    tests1: [
      'tests/cliffjumper-test-delete-eventually/CMTConnectionsRuleTests/*.js',
      'tests/cliffjumper-test-delete-eventually/CMTConnectionsForbiddenConTests/*.js',
      'tests/cliffjumper-test-delete-eventually/CMTConnectionsExtractTests/*.js',
      'tests/cliffjumper-test-delete-eventually/CMTConnectionsEmailTests/*.js'
    ],
    tests2: [
      'tests/cliffjumper-test-delete-eventually/CMTConnectionsDuplicateConTests/*.js',
      'tests/cliffjumper-test-delete-eventually/CMTButtonsTests/*.js',
      'tests/cliffjumper-test-delete-eventually/CMTABTests/*.js',
      'tests/cliffjumper-test-delete-eventually/CMT Masking/*.js'
    ],
    tests3: [
      'tests/cliffjumper-test-delete-eventually/CMT Email Summary Screen/*.js',
      'tests/cliffjumper-test-delete-eventually/CMT Contour Panel/*.js',
      'tests/cliffjumper-test-delete-eventually/CMT ConnectionsABTests/*.js'
    ],
    tests4: [
      'tests/cliffjumper-test-delete-eventually/CMT Buttons/*.js',
      'tests/cliffjumper-test-delete-eventually/CMT AB Test Subject Line/*.js',
      'tests/cliffjumper-test-delete-eventually/CMT AB Test Creative/*.js',
      'tests/cliffjumper-test-delete-eventually/CMT AB Creatives Summary Screen/*.js'
    ],
    tests5: [
      'tests/cliffjumper-test-delete-eventually/CMT ConnectionsTests1/*.js',
      'tests/cliffjumper-test-delete-eventually/CMT ConnectionsTests2/*.js'
    ]
  },
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instance available you can make sure that not more than
    // 5 instance gets started at a time.
    maxInstances: 1,
    //
    browserName: 'phantomjs',
    'phantomjs.binary.path': '/usr/local/bin/phantomjs',
    'phantomjs.page.settings.userAgent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.11 Safari/537.36',
    'phantomjs.page.settings.loadImages': true
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'silent',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: './errorShots/',
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  baseUrl: 'http://localhost',
  //
  // Default timeout for all waitFor* commands.
  // waitforTimeout: 300000, // 5 minutes
  waitforTimeout: 120000, // 2 minutes
  // waitforTimeout: 3000, // 3 seconds
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 180000,
  //
  // Default request retries count
  connectionRetryCount: 10,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  // plugins: {
  //     webdrivercss: {
  //         screenshotRoot: '/vagrant/testfiles/runner-tests/mark/tests/screenshots',
  //         failedComparisonsRoot: 'diffs',
  //         misMatchTolerance: 0.05,
  //         screenWidth: [320,480,640,1024]
  //     }
  //     // webdriverrtc: {},
  //     // browserevent: {}
  // },
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['phantomjs'], //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['spec', 'junit'],
  reporterOptions: {
    junit: {
      // outputDir: './junit-files/' + process.argv[4].replace('--junitFolder=', '')
      outputDir: './junit-files/'
    }
  },
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 99999999,
    retries: 3
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  // Gets executed once before all workers get launched.
  onPrepare: function (config, capabilities) {
    // var campaignId = parseInt(process.argv[2].replace('--campaignId=', ''));
    // process.env.USERID = process.argv[2].replace('--userId=', '');
    // process.env.USERPASS = process.argv[3].replace('--userPass=', '');
    // console.log(campaignId) // outputs 123
  },
  //
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  // before: function (capabilities, specs) {
  // },
  //
  // Hook that gets executed before the suite starts
  // beforeSuite: function (suite) {
  //     console.log('Suite info: ' + JSON.stringify(suite));
  // },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  // beforeHook: function () {
  // },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  // afterHook: function () {
  // },
  //
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  beforeTest: function (test) {
    process.env.currentTest = JSON.stringify(test)
  },
  //
  // Runs before a WebdriverIO command gets executed.
  // beforeCommand: function (commandName, args) {
  // },
  //
  // Runs after a WebdriverIO command gets executed
  // afterCommand: function (commandName, args, result, error) {
  // },
  //
  // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  afterTest: function (test) {
    // // console.log('Test info: ' + JSON.stringify(test));
    // if (test.passed == false) {
    //     // console.log('test failed: ' + test.currentTest);
    // }

    // var testType = process.argv[4].replace('--testType=', '');

    // // removing equals sign if user enter ==unittests instead of =unittests
    // // this was because I wrote command wrong in tutorial video I made
    // if(testType == '=unittests') testType = 'unittests';

    // if (testType == 'unittest' || testType == 'unittests') {
    //     // console.log('Reloading browser');
    //     browser.reload();
    // }
  },

  onError: function (error, result) {
    var fs = require('fs')
    fs.appendFile('fatal-error-log.txt', 'error.type: ' + error.type + ' - error.message: ' + error.message + '\r\n', function (err) {
      if (err) throw err
      // console.log('file saved');
    })

    // dont bother showing info on timeout errors
    // added new error type to skip 'undefined' as dont believe this is a fatal error
    // also found these error types but may be fatals (RuntimeError, NoSessionIdError)
    if (error.type != 'WaitUntilTimeoutError' && error.type != 'NoSuchElement' && error.type != 'undefined' && error.message != 'Element is not currently visible and may not be manipulated' && (typeof error.type !== 'undefined')) {
      console.log('error info MARK: ' + JSON.stringify(error))
      console.log('current test info MARK: ' + process.env.currentTest)

      fs.appendFile('fatal-error-log.txt', '\r\n' + 'CAUSED FATAL ERROR FILE TO BE CREATED = error.type: ' + error.type + ' - error.message: ' + error.message + '\r\n\r\n', function (err) {
        if (err) throw err
      })

      var fs = require('fs')
      fs.writeFile('fatal-error-occurred.txt', '<<FATAL ERROR RUNNING TESTS>>', function (err) {
        if (err) throw err
        // console.log('file saved');
      })
    }
  }

  //
  // Hook that gets executed after the suite has ended
  // afterSuite: function (suite) {
  // },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  // after: function (result, capabilities, specs) {
  //     console.log('result info: ' + JSON.stringify(result));
  //     console.log('capabilities info: ' + JSON.stringify(capabilities));
  //     console.log('specs info: ' + JSON.stringify(specs));
  // },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  // onComplete: function(exitCode) {
  // }
}
