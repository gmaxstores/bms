const container = document.querySelector(".courses-section");
const all = document.querySelector(".all");
const arts = document.querySelector(".arts");
const sciences = document.querySelector(".sciences");
const url = "https://gmaxstores.github.io/bms/project/data/courses.json";

async function getCoursesData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        createCourseCards(data.courses);
        arts.addEventListener("click", (e) => {
            e.preventDefault();
            createCourseCards(data.courses.filter(course => course.type === "Art"));
        });
        
        sciences.addEventListener("click", (e) => {
            e.preventDefault();
            createCourseCards(data.courses.filter(course => course.type === "Science"));
        });
        all.addEventListener("click", (e) => {
            e.preventDefault();
            createCourseCards(data.courses.filter(course => course.type === "Science" | course.type === "Art" | course.type === "Compulsory"));
        });
    } catch (error) {
        console.log(error);
    }
}



function createCourseCards(coursesD) {
    container.innerHTML = "";
    coursesD.forEach(course => {
        let card = document.createElement("section");
        let msg = document.createElement("h3");
        let button = document.createElement("button");
        button.classList.add("open-btn");
        let dialog = document.createElement("dialog");
        dialog.classList.add("dialog-box");
        let closeButton = document.createElement("button");
        let dialogPar = document.createElement("p");
        dialog.appendChild(closeButton);
        dialog.appendChild(dialogPar);

        msg.textContent = `${course.subject} ${course.number}`;
        button.textContent = "Learn More";
        closeButton.textContent = "X";
        if (course.type === "Art") {
            dialogPar.innerHTML = `<span class="course-span">Course:</span> <span class="title-span">${course.title} ${course.number}</span><br><br>${course.description}<br><br><span class="course-span">Type:</span> ${course.type} 🔮<br><br><span class="course-span">Credit Units:</span> ${course.credits}`
            card.style.backgroundColor = "green";
            card.style.border = "2px solid white";
            card.style.borderRadius = "1rem";
            button.style.borderRadius = "1rem";
            msg.classList.add("indi");
            msg.style.color = "white";
        }
        else if (course.type === "Science") {
            dialogPar.innerHTML = `<span class="course-span">Course:</span> <span class="title-span">${course.title} ${course.number}</span><br><br>${course.description}<br><br><span class="course-span">Type:</span> ${course.type} 🔧<br><br><span class="course-span">Credit Units:</span> ${course.credits}`
            card.style.backgroundColor = "blue";
            card.style.border = "2px solid white";
            card.style.borderRadius = "1rem";
            button.style.borderRadius = "1rem";
            msg.style.color = "white"
            msg.classList.add("indiTwo");
        }
        else if (course.type === "Compulsory") {
            dialogPar.innerHTML = `<span class="course-span">Course:</span> <span class="title-span">${course.title} ${course.number}</span><br><br>${course.description}<br><br><span class="course-span">Type:</span> ${course.type} ⭐<br><br><span class="course-span">Credit Units:</span> ${course.credits}`
            card.style.backgroundColor = "brown";
            card.style.border = "2px solid white";
            card.style.borderRadius = "1rem";
            button.style.borderRadius = "1rem";
            msg.style.color = "white";
            msg.classList.add("indiThree");
        }
        button.addEventListener("click", () => {
            dialog.showModal();
        })
        closeButton.addEventListener("click", () => {
            dialog.close();
        })
        

        card.appendChild(msg);
        card.appendChild(button);
        card.appendChild(dialog)

        container.appendChild(card);
    });
    
};

export {container, all, arts, sciences, url, getCoursesData, createCourseCards};