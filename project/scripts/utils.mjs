


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
  
    const footerPath = "public/footer.html";
    const headerPath = "public/header.html";
  
    const footerTemplate = await loadTemplate(footerPath);
    const headerTemplate = await loadTemplate(headerPath);
  
    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
  }
  
  //fetches the path to the header/footer html and returns it in text
  export async function loadTemplate(path) {
    const response = await fetch(path);
    const html = await response.text();
    return html;
  }
  