import Mths from "./mathsCalc.mjs";
import { loadHeaderFooter, lastVisistedDisplay } from "./utils.mjs";

const resultElem = document.querySelector("#result");
const calcTable = document.querySelector("#calcu");
const buttons = document.querySelectorAll(".dis-btn");
const clearBtn = document.querySelector(".clear-btn");
const calcBtn = document.querySelector(".calc")
const newMaths = new Mths(resultElem, calcTable, buttons, clearBtn, calcBtn);
newMaths.init();
loadHeaderFooter();
lastVisistedDisplay();