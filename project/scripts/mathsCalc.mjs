import { alertMessage } from "./utils.mjs";

export default class Mths {
    constructor (inputElement, table, buttons, clearBtn, calc) {
        //store some properties
        this.resultElement = inputElement;
        this.tableElement = table;
        this.buttons = buttons;
        this.clearBtn = clearBtn;
        this.calcBtn = calc;
    }
    // Function that display value 
    dis() { 
        this.buttons.forEach(ele => {
            ele.addEventListener("click", () => {
                this.resultElement.value += ele.value;
            })
        });
         
    }
    
    //function to run the calculator
    init() {
        //displays the clicked input button
        this.dis();
        
        
        //on clicking enter, solve function is called
        this.tableElement.addEventListener("keydown", (e) =>{
            //this.myFunction(e);
            if (e.key === "Enter") { 
                this.solve();
            } 
        });

        //on clicking clear btn, clr function is called
        this.clearBtn.addEventListener("click", () => {
            this.clr();
        })

        //on clicking equal to btn, solve function is called
        this.calcBtn.addEventListener("click", () => {
            this.solve();
        })
    }




    // Function that clear the display 
    clr() {
        //value of result element is set to empty
        this.resultElement.value = "";
    } 

    // Function that evaluates the digit and return result 
    solve() {
        //call the mathjs to solve the expression and display it
        this.mathjs();

        //display calculating while the request is processed asynchronously
        this.clr();
        this.resultElement.value = "calculating...";
    }

    //function to fetch a get request to evaluate a mathematical expression
    async mathjs() {
        //incorporate a try block if successful and
        //a catch block to catch and process the error
        try {
            //get the current value of the result element
            let x = this.resultElement.value;

            //convert the value to url encoded
            let encodedX = encodeURIComponent(x);

            //incorporate coverted value to the fetch path
            const path = `https://api.mathjs.org/v4/?expr=${encodedX}`;

            //fetch
            const res = await fetch(path);

            //convert response to text
            const answer = await this.convertToText(res);

            //display the response in the result element
            this.resultElement.value = answer;
        } catch (error) {
            //get the error msg
            const err = await error.message;

            //print the error to console screen
            console.log(`${error.name}: ${err}`);

            //inform user of the error
            alertMessage(`${error.name}: ${err}`);

            //display error in result element
            this.resultElement.value = "Error: please try again";
        }
    }
    
    //function to convert response to text
    //if successful or throw an error
    convertToText(res) {
        if (res.ok) {
        return res.text();
        } else {
        throw {name: "servicesError", message: res.text()};
        }
    }
}