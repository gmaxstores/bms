import { loadHeaderFooter, lastVisistedDisplay } from "./utils.mjs";


loadHeaderFooter();
lastVisistedDisplay();

const formResult = document.querySelector(".form-result");
const formInterest = document.querySelector(".form-interest");
const result = window.location.href;
const formData = result.split("?")[1].split('&');
console.log(formData);




function createResult(res) {
    let fresult;
    formData.forEach((element) => {
        if (element.startsWith(res)) {
            fresult = element.split("=")[1].replace("%40", "@").replace("%2F", "/").replace("%2F", "/").replace("%2C+", " - ").replace("%3A", ":").replace("%3A", ":").replace("+", " ");
        }
    })
    return fresult
}


//functions to display the entered form data
function resultDisplay() {
    if (createResult("gender") === "1") {
        if (createResult("nationality") === "1") {
            formResult.innerHTML = `
            <h2>Membership Details for ${createResult("firstname")} ${createResult("lastname")} <br> <span>${createResult("timestamp")}</span></h2>
            <p>Email address: <a href="${createResult("email")}">${createResult("email")}</a></p>
            <p>Phone Number: ${createResult("telephone")}</p>
            <p>Gender: Male</p>
            <p>Date of Birth: ${createResult("birth")}</p>
            <p>Nationality: Nigerian</p>
            <p>State of Origin: ${createResult("state")}</p>
            `;
        } else if (createResult("nationality") === "2") {
            formResult.innerHTML = `
            <h2>Membership Details for ${createResult("firstname")} ${createResult("lastname")} <br> <span>${createResult("timestamp")}</span></h2>
            <p>Email address: <a href="${createResult("email")}">${createResult("email")}</a></p>
            <p>Phone Number: ${createResult("telephone")}</p>
            <p>Gender: Male</p>
            <p>Date of Birth: ${createResult("birth")}</p>
            <p>Nationality: Non-Nigerian</p>
            <p>Country of Origin: ${createResult("country")}</p>
            `;
        }
    } else if (createResult("gender") === "2") {
        if (createResult("nationality") === "1") {
            formResult.innerHTML = `
            <h2>Membership Details for ${createResult("firstname")} ${createResult("lastname")} <br> <span>${createResult("timestamp")}</span></h2>
            <p>Email address: <a href="${createResult("email")}">${createResult("email")}</a></p>
            <p>Phone Number: ${createResult("telephone")}</p>
            <p>Gender: Female</p>
            <p>Date of Birth: ${createResult("birth")}</p>
            <p>Nationality: Nigerian</p>
            <p>State of Origin: ${createResult("state")}</p>
            `;
        } else if (createResult("nationality") === "2") {
            formResult.innerHTML = `
            <h2>Membership Details for ${createResult("firstname")} ${createResult("lastname")} <br> <span>${createResult("timestamp")}</span></h2>
            <p>Email address: <a href="${createResult("email")}">${createResult("email")}</a></p>
            <p>Phone Number: ${createResult("telephone")}</p>
            <p>Gender: Female</p>
            <p>Date of Birth: ${createResult("birth")}</p>
            <p>Nationality: Non-Nigerian</p>
            <p>Country of Origin: ${createResult("country")}</p>
            `;
        }
    }
}

function interestDisplay() {
    if (createResult("interest") === "1" && createResult("title") !== "") {
        formInterest.innerHTML = `
        <p>You are interested in Joining BMS Online Institute. <br> Kindly find below your submission details</p>
        <p>Guardian's Full name: ${createResult("title")}. ${createResult("guardian")}</p>
        <p>Kindly note that we have noted when you wish to resume and we would be in touch accordingly</p>
        `
    } else if (createResult("interest") === "1" && createResult("title") === "") {
        formInterest.innerHTML = `
        <p>You are interested in Joining BMS Online Institute. <br> Kindly find below your submission details</p>
        <p>Guardian's Full name: ${createResult("guardian")}</p>
        <p>Kindly note that we have noted when you wish to resume and we would be in touch accordingly</p>
        `
    } else if (createResult("interest") === "2" && createResult("title") !== "") {
        formInterest.innerHTML = `
        <p>You are interested in Enquiring about BMS Online Institute. <br> Kindly note that your submission details and questions has been logged in <br> We would be responding to your questions via email <br> Thank you for your time.</p>
        `
    } else if (createResult("interest") === "2" && createResult("title") == "") {
        formInterest.innerHTML = `
        <p>You are interested in Enquiring about BMS Online Institute. <br> Kindly note that your submission details and questions has been logged in <br> We would be responding to your questions via email <br> Thank you for your time.</p>
        `
    }
};


resultDisplay();
interestDisplay();