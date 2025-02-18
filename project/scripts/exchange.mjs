import { convertToJson, createElement, alertMessage } from "./utils.mjs";


const allPath = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";


//fucntion to display the required elements concerning exchange rate
//gets the value of the respective select elements
//gets the value of the input amount
//calculates and displays a modal showing the date of extracting the rate and value of the converted data.
export async function displayExchangeRates() {
    const exchangeContainer = document.querySelector(".exchange-section");
    const currencyDialog = createElement("dialog", "currency-dialog-box");
    const closeBtn = createElement("button", "close-button")
    closeBtn.textContent = "X";
    currencyDialog.prepend(closeBtn)
    const exchangeBtn = createElement("button", "exchange-button");
    exchangeBtn.textContent = "CONVERT";

    //creates a label for the currselect
    const fromLabel = createElement("label", "from-label");
    fromLabel.textContent = "FROM";

    //create a label for the currselecttwo
    const toLabel = createElement("label", "to-label");
    toLabel.textContent = "TO";
    const currSelect = createElement("select", "curr-select");
    fromLabel.appendChild(currSelect)
    const currSelectTwo = createElement("select", "curr-select-two");
    toLabel.appendChild(currSelectTwo);
    const rateAmount = createElement("input", "rate-amount");
    const errorOutput = createElement("output", "output-error")
    rateAmount.type = "number";
    rateAmount.step = 0.1;
    rateAmount.min = 0;
    rateAmount.required = true;
    const dialogDiv = createElement("div", "dialog-div");
    exchangeContainer.appendChild(currencyDialog);
    exchangeContainer.appendChild(fromLabel);
    exchangeContainer.appendChild(rateAmount);
    exchangeContainer.appendChild(toLabel)
    exchangeContainer.appendChild(exchangeBtn)
    exchangeContainer.insertBefore(errorOutput, exchangeContainer.children[3])
    currencyDialog.appendChild(dialogDiv)

    try {
        const response = await fetch(allPath);
        
        const rates = await convertToJson(response);

        //convert the response to an array
        let arr = Object.entries(rates);
        let arrTwo = Object.entries(rates);
        //console.log(arr)
        arr.forEach(element => {
            //create an option element and append to the currselect
            const rateOption = createElement("option", "rates-option");
            rateOption.textContent = element[1];
            rateOption.value = element[0];
            
            currSelect.appendChild(rateOption);

        });
        arrTwo.forEach(element => {
            //create an option element and append to the currselectTwo
            const rateOption = createElement("option", "rates-option");
            rateOption.textContent = element[1];
            rateOption.value = element[0];
            
            currSelectTwo.appendChild(rateOption);

        });
        exchangeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (rateAmount.checkValidity()) {
                const currencyPath = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currSelect.value}.json`;
                let val = currSelectTwo.value;
                currencyRate(currencyPath, val, rateAmount.value, currencyDialog, dialogDiv)
            } else {
                errorOutput.textContent = `${rateAmount.validationMessage}`
            }
        });
        closeBtn.addEventListener("click", () => {
            currencyDialog.close();
        })
        

    } catch (error) {
        const err = await error.message;
        
        //print the error to console screen
        console.log(`${error.name}: ${err}`);

        //inform user of the error
        alertMessage(`${error.name}: ${err}`);
    }
}

//function that takes in certain params to convert the data
async function currencyRate(path, valu, amount, dialog, dialogDiv) {
    try {
        
        const rateResponse = await fetch(path);
        const res = await convertToJson(rateResponse);
        let arr = Object.entries(res)
        let curObj = arr[1][1];
        let currArr = Object.entries(curObj)
        currArr.forEach(element => {
            if (element[0] == valu) {
                //first remove all childNodes from the dialogDiv
                while (dialogDiv.hasChildNodes()) {
                    dialogDiv.removeChild(dialogDiv.firstChild);
                }
                const date = createElement("p", "rate-date");
                const rateVal = createElement("p", "rate-value");
                date.style.decoration = "none"
                date.textContent = `Date: ${arr[0][1]}`;
                rateVal.textContent = `Value: ${element[1]*amount} ${element[0]}`
                dialogDiv.appendChild(date);
                dialogDiv.appendChild(rateVal);
                dialog.showModal();

                
            }
            
        });
    } catch (error) {
        const err = await error.message;

        //print the error to console screen
        console.log(`${error.name}: ${err}`);

        //inform user of the error
        alertMessage(`${error.name}: ${err}`);
    }
}
