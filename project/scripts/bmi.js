import { lastVisistedDisplay, loadHeaderFooter } from "./utils.mjs";
import bmiCalculator from "./bmiCalc.mjs";

loadHeaderFooter();
lastVisistedDisplay();

const bmiMain = document.querySelector(".bmi-main");
const newBmi = new bmiCalculator(bmiMain);
newBmi.init();