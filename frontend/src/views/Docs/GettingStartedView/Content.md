# Getting started

Welcome to use Kiki. Before getting started, you will need to make sure to install [the latest stable version of NodeJS](https://nodejs.org/en/) on your machine. NodeJS is a JavaScript runtime environment that runs on a JavaScript Engine that can execute JavaScript code outside a web browser. 

In case you already have a different version of NodeJS installed, you can switch the Node version via [nvm](https://github.com/creationix/nvm#installation) on MacOS/Linux, and [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) on Windows.

We will use NPM to manage dependencies. NPM is a package manager for the JavaScript programming and is the default package manager for NodeJS. NPM is included with NodeJS installation.


## Install the dependencies

You will need to navigate to the root level of Kiki's project folder and isntall all dependecies in the terminal:

```
cd kiki-admin-template
npm install
```

## Run the development server

After installing all the dependencies, you can run the admin template by running `npm start` in the terminal.

```
npm start
```

You will see something as follows:

```
Compiled successfully!

You can now view kiki in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.86.54:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Now you can open [localhost:3000](http://localhost:3000) to view it in the browser. You may aslo see some warnings that don't affect the functionalities of the admin template because Kiki uses `ESlint`. Any page of Kiki will automatically reload when you make changes to the code. You will see the build errors and lint warnings updated too. 
