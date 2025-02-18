import { loadHeaderFooter, lastVisistedDisplay } from "./utils.mjs";
import { listenForSubmission, formListeners, displayStatesInSelect } from "./contact.mjs";


loadHeaderFooter();
lastVisistedDisplay();



listenForSubmission();
formListeners();

displayStatesInSelect();