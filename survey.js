// script.js

const requestOptions = {
    method: "GET",
    redirect: "follow"
};
fetch("https://script.googleusercontent.com/macros/echo?user_content_key=cp8biWFZILFZO8q6IvO4O4ZLBSPJGf3aj5kaN65UlCRz8YH778I92Gea0AbO3b6j06-3xrr9ehYD_hD0nsSGJTH1QZv124Ttm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFbpB7NyaRw-v0c6oA7KLd5aR_zhAd-G89S-atc6zZHV1GZkcanbFawHzDM_gzs3sRr-XwcB4-2pRynrwa-KDnvGUmrPB3he6g&lib=Mb6L7AGLWVyaRP4pGYb4rmONPajJ3IafT", requestOptions)
    .then((response) => {
        return response.json()
    }).then(json => {
    console.log(json);
    document.getElementById("surveyTitle").innerHTML = json[0][1]
})

// JSON containing the survey questions
const surveyData = {
    questions: [
        {
            id: 1,
            question: "test",
            options: [
                "دو بار",
                "یک بار",
                "فقط پیام متنی فرستاد",
                "تماس نگرفت"
            ]
        }
    ]
};

function convertSurveyData(originalData) {
    return originalData.map((data, index) => ({
        id: index + 1,
        question: data[0],
        options: data.slice(1) // Take all elements except the first one for options
    }));
}

function removeEmptyElements(arr) {
    return arr.map(subArray => subArray.filter(item => item !== ""));
}

fetch("https://script.google.com/macros/s/AKfycbyRETsLIj8FDPD0zqAU3ARjv_Z4xTE8r-0yJjlrkoJQL7I02tfOxUSocsSXsbNMGyXS/exec", requestOptions)
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        console.log(convertSurveyData(removeEmptyElements(result)))
        surveyData.questions=convertSurveyData(removeEmptyElements(result))
        renderQuestion()
    })
    .catch((error) => console.error(error));





const responses = {}

// DOM elements
const questionTitle = document.getElementById("question-title");
const id = document.getElementById("id");
const optionsContainer = document.getElementById("options-container");
const questionForm = document.getElementById("question-form");
const startBtn = document.getElementById("styled-button2");
const infoDialog = document.getElementById("info-dialog");
const dialog = document.getElementById("dialog");

let a1 = 0
let a2 = 0
let a3 = 0
let a4 = 0
let a5 = 0
let awnsers = []

let currentQuestionIndex = 0;

// Function to render a question
function renderQuestion() {
    // Get the current question
    const currentQuestion = surveyData.questions[currentQuestionIndex];

    // Set the question title
    questionTitle.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Create radio buttons for options
    currentQuestion.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.textContent = option;

        const input = document.createElement("input");
        input.type = "radio";
        input.classList.add("custom-radio");
        input.name = "answer";
        input.value = index;

        label.prepend(input);
        optionsContainer.appendChild(label);
    });
}

// Handle form submission
questionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Check if an option is selected
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("لطفاً یکی از گزینه‌ها را انتخاب کنید.");
        return;
    }

    // Move to the next question
    awnsers[currentQuestionIndex] = (+selectedOption.value)
    awnsers[currentQuestionIndex]++
    currentQuestionIndex++;
    if (currentQuestionIndex == 1) {
        a1 = +selectedOption.value
        a1++

    } else if (currentQuestionIndex == 2) {
        a2 = +selectedOption.value
        a2++
    } else if (currentQuestionIndex == 3) {
        a3 = +selectedOption.value
        a3++

    } else if (currentQuestionIndex == 4) {
        a4 = +selectedOption.value
        a4++

    } else if (currentQuestionIndex == 5) {
        a5 = +selectedOption.value
        a5++
        // sendSurveyResponses(responses);
    }

    if(currentQuestionIndex == surveyData.questions.length){
        questionTitle.textContent = "پایان نظرسنجی. از شما متشکریم!";
        optionsContainer.innerHTML = "";
        questionForm.style.display = "none";
        sendSurveyResponses(responses);
    }

    // If there are more questions, render the next one
    if (currentQuestionIndex < surveyData.questions.length) {
        renderQuestion();
    } else {
        // // End of survey
        // questionTitle.textContent = "پایان نظرسنجی. از شما متشکریم!";
        // optionsContainer.innerHTML = "";
        // questionForm.style.display = "none";
    }
});



startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const selectedId = id.value
    if (!selectedId) {
        alert("لطفاً کد ملی خود را وارد کنید.");
        return;
    }

    const numberPattern = /^[0-9]{10}$/;

    if (!numberPattern.test(id.value)) {
        // If validation fails, show an alert
        alert("لطفا کد ملی صحیح وارد کنید");
        return;
    }

    responses.id = id.value

    infoDialog.style.display = "none";
    dialog.style.display = "flex";

});

function sendSurveyResponses(data) {
    const url = "https://script.google.com/macros/s/AKfycbyRETsLIj8FDPD0zqAU3ARjv_Z4xTE8r-0yJjlrkoJQL7I02tfOxUSocsSXsbNMGyXS/exec"; // Replace with your Google Apps Script URL
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            id: responses.id,
            answers: awnsers.join("-")
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => {
            console.log("Raw response:", response); // Log the raw response
            return response.json(); // Read the response as plain text first
        })
        .then((text) => {
            console.log("Response text:", text); // Log the plain text response
            return JSON.parse(text); // Try parsing the JSON
        })
        .then((json) => {
            console.log("Parsed JSON:", json); // Log the parsed JSON object
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Example survey data
let surveyResponses = {
    id: 1,
    answers: "1-2-4-1-3"
};

// Call this function after survey completion
// sendSurveyResponses(surveyResponses);

