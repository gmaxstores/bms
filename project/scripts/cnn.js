import { loadHeaderFooter, lastVisistedDisplay, convertToJson, createElement, alertMessage } from "./utils.mjs";


loadHeaderFooter();
lastVisistedDisplay();

const divContainer = document.querySelector(".news-search-container");
const newsUl = createElement("ul", "news-ul");
divContainer.appendChild(newsUl);

const options = {
    method: "GET",
    headers: {
      "access_key": "f5149708a0d4d5d742476e496dffa9cd"
    }
}
const path = "https://api.mediastack.com/v1/news?access_key=f5149708a0d4d5d742476e496dffa9cd&sources=en,-de&sources=cnn,-bbc";


//function to dynamically create a list of news
function displayNews (res, ul) {
    
    res.data.forEach(element => {
        const date = createElement("p", "news-date");
        const author = createElement("p", "news-author");
        const newsArticle = createElement("p", "news-article");
        const title = createElement("p", "news-title");
        const desc = createElement("p", "news-desc");
        const newsLink = createElement("a", "news-link");
        const newsList = createElement("li", "news-list");
        date.textContent = `${element.published_at}`;
        author.textContent = `${element.author}`;
        newsArticle.textContent = `${element.content}`;
        title.textContent = `${element.title}`;
        desc.textContent = `${element.description}`;
        newsLink.href = `${element.url}`;
        newsLink.textContent = "click here for more details";
        newsList.appendChild(date);
        newsList.appendChild(title);
        newsList.appendChild(desc);
        newsList.appendChild(author);
        newsList.appendChild(newsLink);
        ul.appendChild(newsList);
    });
    
}


//function to fetch news and call displaynews function
async function getNews() {
    try {
        const response = await fetch(path);
        const newsResponse = await convertToJson(response);
        console.log(newsResponse)
        displayNews(newsResponse, newsUl);
    } catch (error) {
        const err = await error.message;
        
        //print the error to console screen
        console.log(`${error.name}: ${err}`);

        //inform user of the error
        alertMessage(`${error.name}: ${err}`);
    }
}

getNews()

