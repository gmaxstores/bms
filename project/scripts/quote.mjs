import { convertToJson, createElement } from "./utils.mjs";

const path = "https://favqs.com/api/qotd";

export default class Quote {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }
    async getQuote() {
        try {
            const options = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token token='086911d0ec39af6bb5fd5f0def4ab2ac'",
                }
              };
            const response = await fetch(path, options);
            const quoteData = convertToJson(response);
            displayQuote(quoteData);
        } catch (error) {
            //get the error msg
            const err = await error.message;
            
            //print the error to console screen
            console.log(`${error.name}: ${err}`);
            
            //inform user of the error
            alertMessage(`${error.name}: ${err}`);
        }
    }
    
    displayQuote(data) {
        const quotePar = createElement("p", "quote-par");
        quotePar.textContent = `${data.quote.body}`;
        this.parentElement.appendChild(quotePar);
    }
    init() {
        this.getQuote();
    }
}