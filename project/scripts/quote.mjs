import { convertToJson, createElement, alertMessage } from "./utils.mjs";

const path = "https://api.api-ninjas.com/v1/quotes";
;
export default class Quote {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }

    //displays the data
    displayQuote(data) {
        const quotePar = createElement("p", "quote-par");
        quotePar.textContent = `${data[0].quote}`;
        this.parentElement.appendChild(quotePar);
    }

    //fetches the quote of the day
    async getQuote() {
        try {
            const options = {
                method: "GET",
                headers: {
                  'X-Api-Key': "BiZ0CVqHClV9k1T581dwGA==sQnugtyT4g3b94f9",
                  
                },
            };
            const response = await fetch(path, options)
            const quoteData = await convertToJson(response);
            const quotePar = createElement("p", "quote-par");
            quotePar.textContent = `${quoteData[0].quote}`;
            const quoteAuthor = createElement("p", "quote-author");
            quoteAuthor.textContent = `By ${quoteData[0].author}`;
            this.parentElement.appendChild(quotePar);
            this.parentElement.appendChild(quoteAuthor);
        } catch (error) {
            //get the error msg
            const err = await error.message;
            
            //print the error to console screen
            console.log(`${error.name}: ${err}`);
            
            //inform user of the error
            alertMessage(`${error.name}: ${err}`);
        }
    }
    
    //function to run the class
    init() {
        this.getQuote();
    }
}