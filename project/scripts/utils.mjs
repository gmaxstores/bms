


//inserts the header and footer html respectively
//into the appropriate element
function renderWithTemplate(template, parentElement, position = "afterbegin") {
    parentElement.insertAdjacentHTML(position, template);
  }
  
  //grabs the appropriate element from the index.html page
  //grabs the path to the header and footer html
  //calls the loadTempklate function to return the html
  //calls the renderWithTemplate to display the header and footer html dynamically
  export async function loadHeaderFooter() {
    const header = document.querySelector(".main-header");
    const footer = document.querySelector(".main-footer");
  
    const footerPath = "../public/footer.html";
    const headerPath = "../public/header.html";
  
    const footerTemplate = await loadTemplate(footerPath);
    const headerTemplate = await loadTemplate(headerPath);
  
    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
    createLastMondificationAndCurrentYear();
  }
  
  //fetches the path to the header/footer html and returns it in text
  export async function loadTemplate(path) {
    const response = await fetch(path);
    const html = await response.text();
    return html;
  }


  //function to display last modification date
  //and current year
export function createLastMondificationAndCurrentYear() {
    //grabs the currentyear id
    const currentyear = document.querySelector("#currentyear");

    //grabs the lastModified id
    const last = document.getElementById("lastModified");

    //creates a new date object
    const today = new Date();

    //display last modified
    last.innerHTML = `<span class="last">Last Modification: ${document.lastModified}</span>`;

    //display the current year
    currentyear.innerHTML = today.getFullYear();
}




export function lastVisistedDisplay() {
    const lastVisited = document.querySelector(".last-visited");
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    const today = new Date();
    if (localStorage.getItem("visitDate") == null) {
        lastVisited.textContent = "Welcome, let us know if you have any questions."
        localStorage.setItem("visitDate", today.getTime());
    }
    else {
        const lastVisitTime = localStorage.getItem("visitDate");
        let diff = today.getTime() - lastVisitTime
        diff = diff/day;
        if (diff <= 24) {
            lastVisited.innerHTML = "Back so Soon! <br> Awesome!"
        }
        else {
            lastVisited.textContent = `You Last vsisted ${Math.round(diff)} hours ago`
        };
        
    };
};


//function to display an alert box with a message.
export function alertMessage(message, scroll=true) {

    //create a div element
    const alert = document.createElement("div");

    //give a class name - alert
    alert.classList.add("alert");

    //create a p element
    const alertMsg = document.createElement("p");

    //set the content of the p element
    alertMsg.textContent = message

    //create a close button
    const alertButton = document.createElement("button");

    //set the textcontent of the button
    alertButton.textContent = "X"

    //append the p and button element to div element
    alert.appendChild(alertMsg);
    alert.appendChild(alertButton);

    //set the class name for the close btn
    alertButton.classList.add("alert-button");

    //remove the alert box when the close btn is clicked
    alert.addEventListener("click", (e) => {
      if (e.target.tagName) {
        const main = document.querySelector("main")
        main.removeChild(alert);
      }
    });

    //display the alert box and take user to the alert box
    const main = document.querySelector("main");
    main.prepend(alert);
    if (scroll) {
      window.scrollTo(0,0);
    }
  }
  