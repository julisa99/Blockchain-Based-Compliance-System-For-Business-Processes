import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import OnlineShopBusinessProcess from "./contracts/OnlineShopBusinessProcess.json";
import Universality from "./contracts/Universality.json";
import Precedence from "./contracts/Precedence.json";
import Existence from "./contracts/Existence.json";
import Absence from "./contracts/Absence"

// let drizzle know what contracts we want
const options = { contracts: [OnlineShopBusinessProcess, Universality, Precedence, Existence, Absence] };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

