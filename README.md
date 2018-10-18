## Getting Started

First of all, ensure you have the following versions of node and npm installed on your machine

version of node = 8.11.4

version of npm = 5.6.0

Then run the following command in the root of this codebase after cloning it

```
npm install
```

This will install all npm node module dependancies in the package.json file

Finally, run the following command in the root of this codebase to start running your web scraper.

```
./node_modules/.bin/wdio config
```

--------------

This codebase also has a scotch box vagrant file which is inside the 'webfiles' folder on the root of this codebase.

This allows us to view PHP files in a browser and also has its own database that we can use.

To start scotch box, after cloning this codebase, git bash into the 'webfiles' folder and type:
```
$ vagrant up
```

Then, once the vagrant machine is up and running, go to the following URL

http://192.168.33.10

This URL will display all files that are in the '/webfiles/public' folder of this codebase.
