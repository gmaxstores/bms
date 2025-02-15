import { createLastMondificationAndCurrentYear, lastVisistedDisplay } from "./utils.mjs";
import Quote from "./quote.mjs";

createLastMondificationAndCurrentYear();
lastVisistedDisplay()

const quoteElement = document.querySelector(".fav-quote");

const newQuote = new Quote(quoteElement);
newQuote.init();