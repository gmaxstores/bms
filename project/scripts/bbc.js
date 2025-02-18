import { loadHeaderFooter, lastVisistedDisplay, convertToJson, createElement, alertMessage } from "./utils.mjs";


loadHeaderFooter();
lastVisistedDisplay();

const divContainer = document.querySelector(".news-search-container");
const newsUl = createElement("ul", "news-ul");
divContainer.appendChild(newsUl);

const options = {
    method: "GET",
    headers: {
      "X-Api-Key": "3221dc829a4844d79512864a08aa28dc"
    }
}
const path = "https://newsapi.org/v2/top-headlines?sources=bbc-news";

//function to dynamically create and display list of news
function displayNews (res, ul) {
    
    res.articles.forEach(element => {
        const date = createElement("p", "news-date");
        const author = createElement("p", "news-author");
        const newsArticle = createElement("p", "news-article");
        const title = createElement("p", "news-title");
        const desc = createElement("p", "news-desc");
        const newsLink = createElement("a", "news-link");
        const newsList = createElement("li", "news-list");
        date.textContent = `${element.publishedAt}`;
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

//function to fetch bbc news
async function getNews() {
    try {
        const response = await fetch(path, options);
        const newsResponse = await convertToJson(response);
        displayNews(newsResponse, newsUl);
    } catch (error) {
        const err = await error.message;

        //print the error to console screen
        console.log(`${error.name}: ${err.message}`);

        //inform user of the error
        alertMessage(`${error.name}: ${err}`);
    }
}

getNews()

