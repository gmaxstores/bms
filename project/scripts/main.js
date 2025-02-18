import { createLastMondificationAndCurrentYear, lastVisistedDisplay } from "./utils.mjs";
import Quote from "./quote.mjs";
import Weather from "./weather.mjs";
import { displayExchangeRates } from "./exchange.mjs";
import { hamburgerMenu } from "./utils.mjs";

createLastMondificationAndCurrentYear();
lastVisistedDisplay()

const quoteElement = document.querySelector(".fav-quote");

const newQuote = new Quote(quoteElement);
newQuote.init();

const newWeather = new Weather;
newWeather.init();

displayExchangeRates();

hamburgerMenu();