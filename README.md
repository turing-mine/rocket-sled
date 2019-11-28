# RocketSled
RocketSled is an IoT templating framework using Express, Node.js and _underscore.

https://rocket-sled.herokuapp.com/

Use `git clone https://github.com/turing-mine/rocket-sled.git` to copy the app config and file structure to a `sites` or other subdirectory, preferably a subdirectory from your OS's user home.  The importance of this, and the obvious absence of an **_NPM_ project** will be clarified in the following narrative.

> Precursor

The intent of this project is to use orphaned (no Verizon or ATT, etc...) Android phones in wireless challenged areas, to host Node.js app servers and non-standard microservices.  With a Chrome client on top of this, these devices can help first-responders collect remote environmental data in coastal areas, and relay the data to the cloud once wireless connectivity has been re-established.  Of course this mobile app server would also be beneficial in a meshed agricultural network, or assist health care workers serving populations in remote locations.

> Dev Environment 

This mobile dev framework has been deployed and tested on MacOS, Android Linux for mobile (3.10.84 aarch64 and 4.4.13 armv81), with minor modifications to the runtime scripts to resolve compatibility issues.

The preferred terminal emulator for Android phones is Termux, installed from the Google Play app store.  Once installed, make sure you give the app full access to memory, including SD card if the permissions for this are separate in your settings. Run the following commands in the Termux terminal emulator to install and upgrade packages on your mobile device:

```
pkg upgrade
pkg install git
pkg install nano
pkg install perl
pkg install mariadb
pkg install nodejs-lts
```

Some mobile phones support the latest version of Node, but may experience issues with some less popular modules.  To use the latest version of Node instead of Node LTS, change the last line to:
```
pkg install node
```

Then clone the project, if you haven't done so already, and install with NPM. For Android mobile installs, use the production flag:
```
git clone https://github.com/turing-mine/rocket-sled
cd rocket-sled
npm install --production
```

For MacOS installs, use a plain vanilla install without flags:
```
git clone https://github.com/turing-mine/rocket-sled
cd rocket-sled
npm install
```

Most mobile Android Linux distributions can work with your phone's SD card for this installation, but for better compatibility you should install RocketSled in a subdirectory of Termux home, such as a `sites/` subdirectory.

> Ignition

To start the app, make sure you run the start script from the `rocket-sled/` directory: `npm start &`

Some debugging messages will display, along with the ip address and port that the server is listening to.  If the server can't determine the ip address, it will display as localhost:80 or localhost:8080, depending on what other ports are already in use.  Open a new tab in your browser and point it to that.  

localhost/photonic is a test page to upload files.  localhost/upload is the success page.  You can list the uploaded files in the `rocket-sled/uploads` directory.  If you are running the app on a mobile phone, your camera is the default upload source choice, making this an ideal framework for a selfie app.

To stop the app, type: `npm stop`

<img src="https://raw.githubusercontent.com/turing-mine/rocket-sled/master/assets/Screen%20Shot%202019-05-06%20at%2010.17.14%20PM.png" width="100%" />

> App Scripts

The three NPM scripts the app uses are `start`, `stop` and `test`.  These scripts modify the search path to find and use global modules, and should only be executed in the scope they were intended for.  They are documented in the package.json file, but also here for quick reference:

start:
```
export NODE_PATH=$(npm root --quiet):$(npm root --quiet -g) && node metaphor.js
```

stop:
```
export NODE_PATH=$(npm root --quiet):$(npm root --quiet -g) && node grimm_reaper.js
```

test:
```
jasmine
```

> Utilities

Several utilities are included in package.json; they are:
```
Bootstrap
blubird
dotenv
Express
node-wifi
Underscore
```

> Static Modules

The dotenv Node module is installed as a static module.  That is, the required module files are part of this GitHub project, installed via git clone and not npm install.  This of course is not standard practice, but rather an experiment to see what's possile in a mobile Node deployment.

Comments are always welcome.  Ping me, Paul Zabin, via LinkedIn or from the contact info on my profile page at https://github.com/turing-mine


