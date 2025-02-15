import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function createElement(element, className) {
    const createdElement = document.createElement(element);
    createdElement.classList.add(className);
    return createdElement;
}

export default class bmiCalculator {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.divStartContainer;
        this.divTrackContainer;
        this.dialogRecord;
        this.dialogBoxOne;
        this.dialogBoxTwo;
        this.dialogBoxThree;
        this.dialogBoxFour;
        this.dialogInputOne;
        this.dialogInputTwo;
        this.dialogInputThree;
        this.startButton;
        this.trackButton;
        this.nextOne;
        this.nextTwo;
        this.nextThree;
        this.outputElement;
        this.dialogInterpretationPar = createElement("p", "interpretation-par");
        this.closeButton = createElement("button", "dialog-close-button");
        this.heightPar = createElement("p", "height-par");
        this.namePar = createElement("p", "name-par");
        this.detailsPar = createElement("p", "details-par");
        this.bmi = {};
    }

    init() {
        this.divCreator("START", "bmi-start-button");
        this.divCreator("TRACK", "bmi-track-button", false);
        this.dialogCreator();
        this.dialogNodeAppender();

        //listens for the start button
        //display input for name
        this.startButton.addEventListener("click", () => {
            this.dialogBoxOne.prepend(this.closeButton);
            this.dialogBoxOne.showModal();
            this.closeButtonListener(this.dialogBoxOne);
        });

        //listens for click on track button
        //renders the records appropriately
        this.trackButton.addEventListener("click", () =>{
            this.renderBmiRecord();
            this.dialogRecord.showModal();
        })

        //listen for click on the next button 
        //displays input for height
        //checks if the input is valid
        //before proceeding
        this.nextOne.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.dialogInputOne.checkValidity()) {
                this.dialogBoxOne.close();
                this.dialogBoxTwo.prepend(this.closeButton);
                this.namePar.textContent = `Hi, ${this.dialogInputOne.value}`;
                this.dialogBoxTwo.insertBefore(this.namePar, this.dialogBoxTwo.children[1]);
                this.dialogBoxTwo.showModal();
                this.closeButtonListener(this.dialogBoxTwo);
            } else {
                //renders appropriate message to guide user 
                //to input valid data
                this.dialogBoxOne.insertBefore(this.outputElement, this.dialogBoxOne.children[2]);
                this.outputElement.textContent = this.dialogInputOne.validationMessage;
            }
            
        });

        //listen for click on the next button 
        //displays input for weight
        //checks if the input is valid
        //before proceeding
        this.nextTwo.addEventListener("click", (e) => {
            e.preventDefault()
            if (this.dialogInputTwo.checkValidity()) {
                this.dialogBoxTwo.close();
                this.dialogBoxThree.prepend(this.closeButton);
                this.heightPar.textContent = `Height: ${this.dialogInputTwo.value}m`;
                this.dialogBoxThree.insertBefore(this.heightPar, this.dialogBoxThree.children[1]);
                this.dialogBoxThree.showModal();
                this.bmi.height = this.dialogInputTwo.value;
                this.closeButtonListener(this.dialogBoxThree);
            } else {
                this.dialogBoxTwo.insertBefore(this.outputElement, this.dialogBoxTwo.children[2]);

                //renders appropriate message to guide user 
                //to input valid data
                this.outputElement.textContent = this.dialogInputTwo.validationMessage;
            }
            
        });

        //listens when the calculate button is clicked
        //and then calculates and stores the bmi
        this.nextThree.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.dialogInputThree.checkValidity()) {
                this.dialogBoxThree.close();
                this.detailsPar.innerHTML = `Height: ${this.dialogInputTwo.value}m<br>Weight: ${this.dialogInputThree.value}kg<br>BMI: ${(this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value)).toFixed(2)}`;
                this.dialogBoxFour.prepend(this.closeButton);
                this.dialogBoxFour.appendChild(this.detailsPar);
                this.bmiInterpreter();
                this.dialogBoxFour.showModal();
                this.bmiTracker();
                this.closeButtonListener(this.dialogBoxFour);
            } else {
                this.dialogBoxThree.insertBefore(this.outputElement, this.dialogBoxThree.children[2]);
                this.outputElement.textContent = this.dialogInputThree.validationMessage;
            }
            
        });
    }
    //handles the listener on the close button when clicked
    closeButtonListener(box) {
        this.closeButton.addEventListener("click", () => {
            box.close();
            this.dialogInputOne.value = "";
            this.dialogInputTwo.value = "";
            this.dialogInputThree.value = "";
        })
    }

    //function that creates a div container
    //for either start or track button
    divCreator(btnValue, btnClassName, start=true) {
        if (start) {
            this.divStartContainer = createElement("div", "bmi-div-container");
            this.startButton = createElement("button", btnClassName);
            this.startButton.textContent = btnValue;
            this.divStartContainer.appendChild(this.startButton);
        
            this.parentElement.appendChild(this.divStartContainer);
        } else {
            this.divTrackContainer = createElement("div", "bmi-div-container");
            this.trackButton = createElement("button", btnClassName);
            this.trackButton.textContent = btnValue;
            this.divTrackContainer.appendChild(this.trackButton);
        
            this.parentElement.appendChild(this.divTrackContainer);
        }
        
        
        
    }

    //function that creates the dialog boxes
    dialogCreator() {
        this.dialogBoxOne = createElement("dialog", "dialog-box-one");
        this.dialogBoxTwo = createElement("dialog", "dialog-box-two");
        this.dialogBoxThree = createElement("dialog", "dialog-box-three");
        this.dialogBoxFour = createElement("dialog", "dialog-box-four");
    }

    //function to create and append the necessary elements
    dialogNodeAppender() {
        this.closeButton.textContent = "X";
        this.dialogInputOne = createElement("input", "dialog-input-one");
        this.dialogInputTwo = createElement("input", "dialog-input-two");
        this.dialogInputThree = createElement("input", "dialog-input-three");
        this.outputElement = createElement("output", "dialog-output");
        this.dialogInputOne.autofocus = true;
        this.dialogInputOne.required = true;
        this.dialogInputTwo.autofocus = true;
        this.dialogInputTwo.required = true;
        this.dialogInputTwo.type = "number";
        this.dialogInputTwo.step = 0.1;
        this.dialogInputThree.autofocus = true;
        this.dialogInputThree.required = true;
        this.dialogInputThree.type = "number";
        this.dialogInputThree.step = 0.1;
        const questionOne = createElement("p", "question-one");
        questionOne.textContent = "What is your name?";
        const questionTwo = createElement("p", "question-two");
        questionTwo.textContent = "What is your height (in meters)?";
        const questionThree = createElement("p", "question-three");
        questionThree.textContent = "What do you weigh (in kg)?";
        this.nextOne = createElement("button", "next-one");
        this.nextOne.textContent = "NEXT";
        this.nextTwo = createElement("button", "next-two");
        this.nextTwo.textContent = "NEXT";
        this.nextThree = createElement("button", "next-three");
        this.nextThree.textContent = "CALCULATE";

        this.dialogBoxOne.appendChild(questionOne);
        this.dialogBoxOne.appendChild(this.dialogInputOne);
        this.dialogBoxOne.appendChild(this.nextOne);
        
        
        this.dialogBoxTwo.appendChild(questionTwo);
        this.dialogBoxTwo.appendChild(this.dialogInputTwo);
        this.dialogBoxTwo.appendChild(this.nextTwo);

        
        this.dialogBoxThree.appendChild(questionThree);
        this.dialogBoxThree.appendChild(this.dialogInputThree);
        this.dialogBoxThree.appendChild(this.nextThree);
        this.divStartContainer.appendChild(this.dialogBoxOne);
        this.divStartContainer.appendChild(this.dialogBoxTwo);
        this.divStartContainer.appendChild(this.dialogBoxThree);
        this.divStartContainer.appendChild(this.dialogBoxFour);
    }

    //function to display the appropriate interpretation
    //of the bmi result
    bmiInterpreter() {
        if (this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value) < 18.5) {
            this.dialogInterpretationPar.innerHTML = `Dear ${this.dialogInputOne.value},<br>From the values you inputed, you are <span class="bmi-value">UNDERWEIGHT (ACCORDING TO WHO)</span><br>Kindly see a doctor for nutritional counselling.`;
            this.dialogBoxFour.appendChild(this.dialogInterpretationPar);
        } else if (this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value) >= 18.5 && this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value) <= 24.9) {
            this.dialogInterpretationPar.innerHTML = `Dear ${this.dialogInputOne.value},<br>From the values you inputed, you are <span class="bmi-value">PHYSIOLOGICALLY NORMAL (ACCORDING TO WHO)</span><br>Kindly continue with your healthy habits`;
            this.dialogBoxFour.appendChild(this.dialogInterpretationPar);
        } else if (this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value) >= 25 && this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value) <= 29.9) {
            this.dialogInterpretationPar.innerHTML = `Dear ${this.dialogInputOne.value},<br>From the values you inputed, you are <span class="bmi-value">OVERWEIGHT (ACCORDING TO WHO)</span><br>Kindly see a doctor for counselling on healthy habits`;
            this.dialogBoxFour.appendChild(this.dialogInterpretationPar);
        }else if (this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value) >= 30) {
            this.dialogInterpretationPar.innerHTML = `Dear ${this.dialogInputOne.value},<br>From the values you inputed, you are <span class="bmi-value">OBESED (ACCORDING TO WHO)</span><br>Kindly see a doctor urgently`;
            this.dialogBoxFour.appendChild(this.dialogInterpretationPar);
        }
    }

    //function to store the bmi data
    bmiTracker() {
        this.bmi.weight = this.dialogInputThree.value;
        const newDate = new Date;
        this.bmi.name = this.dialogInputOne.value;
        this.bmi.bmiValue = (this.dialogInputThree.value/(this.dialogInputTwo.value*this.dialogInputTwo.value)).toFixed(2);
        this.bmi.date = newDate;
        const bmiRecord = getLocalStorage("bmi") || [];
        bmiRecord.push(this.bmi);
        setLocalStorage("bmi", bmiRecord);
    }
    //function to dynamically render contents of the localstorage
    //with regards to bmi
    renderBmiRecord() {
        const bmiRecord = getLocalStorage("bmi") || [];
        this.dialogRecord = createElement("dialog", "dialog-record-box");
        const recordUl = createElement("ul", "record-ul");
        this.dialogRecord.appendChild(recordUl);
        this.dialogRecord.prepend(this.closeButton);
        this.divTrackContainer.appendChild(this.dialogRecord);
        if (bmiRecord.length <= 0) {
            const emptyRecordPar = createElement("p", "empty-record-par");
            emptyRecordPar.textContent = "YOU HAVE NO RECORDED BMI";
            recordUl.appendChild(emptyRecordPar);
            this.closeButton.addEventListener("click", () => {
                this.dialogRecord.close();
            });
        } else {
            bmiRecord.forEach(element => {
                const recordLi = createElement("li", "record-li");
                const recordHeight = createElement("p", "record-height");
                const recordName = createElement("p", "record-name");
                const recordBmi = createElement("p", "record-bmi");
                const recordWeight = createElement("p", "record-weight");
                const recordDate = createElement("p", "record-date");
                recordHeight.innerHTML = `Height: <span class="record-span-height">${element.height}</span>`;
                recordName.innerHTML = `Name: <span class="record-span-name">${element.name}</span>`;
                recordBmi.innerHTML = `BMI: <span class="record-span-bmivalue">${element.bmiValue}</span>`;
                recordWeight.innerHTML = `Weight: <span class="record-span-weight">${element.weight}</span>`;
                recordDate.innerHTML = `Date: <span class="record-span-date">${element.date}</span>`;
                recordLi.appendChild(recordDate);
                recordLi.appendChild(recordName);
                recordLi.appendChild(recordHeight);
                recordLi.appendChild(recordWeight);
                recordLi.appendChild(recordBmi);    
                recordUl.appendChild(recordLi);     
            });
            this.closeButton.addEventListener("click", () => {
                this.dialogRecord.close();
            });
        }
        
    }
}


