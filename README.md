## Setup
  This readme will explain to you, how to setup the project.<br>
  If you have any of the following tools already installed, you can skip the specific steps in the instructions.

### Install node

You will need node to run this project. Node can be downloaded and installed [here](https://nodejs.org/en/).

### Install Truffle

Truffel is needed to compile and deploy the smart contracts. To install it run `npm install -g truffle`

### Install Ganache

Ganache is used to run a local version of the etherum blockchain on your computer. To install it run `npm install -g ganache-cli`

### Install React

React is needed to run the front end. To install it run `npm install -g create-react-app`

## Start the Project

### Starting the blockchain
First you need to start the blockchain. Run `ganache-cli`<br>

### Deploying the smart contracts
Now open another terminal window and move into the top level folder. Arriving there the next step is to deploy the smart contracts.<br>
Run `truffle migrate` to do so. If you want to reset everything on the blockchain, run `truffel migrate --reset`.

### Starting the front end

Now move to the client folder.<br>
If you do this the for the first time, you will need to run `npm install`.<br>
Also make sure that in the subfolder `src` the symbolic link to contracts folder is working.<br>
Now you can type in `npm start` to start the frontend. It should automaticaly open a new tab on your default browser to show the frontend.

