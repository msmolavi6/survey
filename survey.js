// script.js

// JSON containing the survey questions
const surveyData = {
    questions: [
        {
            id: 1,
            question: "آیا پشتیبان شما طی دو هفته‌ی گذشته تاکنون (از آزمون ۱۸ آبان) با شما تماس تلفنی گرفته است؟",
            options: [
                "خیر، ایشان تماس تلفنی نگرفتند.",
                "بله، ایشان تماس تلفنی گرفتند.",
                "بله، تماس تلفنی ایشان از لحاظ زمانی (در حد ۵ دقیقه) و از لحاظ محتوا در حد خوب و کافی بود.",
                "بله، تماس تلفنی ایشان از لحاظ زمانی (بیش از ۵ دقیقه) و از لحاظ محتوا در حد عالی بود."
            ]
        },
        {
            id: 2,
            question: "پشتیبان چه زمانی با شما تماس گرفت؟",
            options: [
                "در زمان مناسب طبق توافق قبلی",
                "در زمان مناسب",
                "در روز پنج‌شنبه قبل از آزمون",
                "در روز یا ساعت نامناسب"
            ]
        },
        {
            id: 3,
            question: "پشتیبان شما چند دقیقه با شما تماس تلفنی داشت؟",
            options: [
                "یک دقیقه تا سه دقیقه",
                "۳ دقیقه تا ۵ دقیقه",
                "بین ۵ تا ۱۰ دقیقه",
                "بیش از ۱۰ دقیقه"
            ]
        },
        {
            id: 4,
            question: "آیا دفتر برنامه‌ریزی دارید؟",
            options: [
                "بله دارم و استفاده می‌کنم",
                "بله، دارم اما هنوز شروع به استفاده نکرده‌ام",
                "ندارم"
            ]
        },
        {
            id: 5,
            question: "آیا از پشتیبان خود راضی هستید؟",
            options: [
                "بله، کاملاً",
                "بله، در مجموع عملکرد ایشان را مطلوب می‌دانم.",
                "خیر، راضی نیستم ولی نمی‌خواهم ایشان تعویض شوند.",
                "خیر، می‌خواهم ایشان تعویض شوند."
            ]
        }
    ]
};


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
    currentQuestionIndex++;

    if (currentQuestionIndex==1){
        a1=+selectedOption.value
        a1++

    }else if (currentQuestionIndex==2){
        a2=+selectedOption.value
        a2++
    }
    else if (currentQuestionIndex==3){
        a3=+selectedOption.value
        a3++

    }
    else if (currentQuestionIndex==4){
        a4=+selectedOption.value
        a4++

    }
    else if (currentQuestionIndex==5){
        a5=+selectedOption.value
        a5++
        sendSurveyResponses(responses);
    }

    // If there are more questions, render the next one
    if (currentQuestionIndex < surveyData.questions.length) {
        renderQuestion();
    } else {
        // End of survey
        questionTitle.textContent = "پایان نظرسنجی. از شما متشکریم!";
        optionsContainer.innerHTML = "";
        questionForm.style.display = "none";
    }
});

// Initial render
renderQuestion();

startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    responses.id=id.value

    if(responses.id.length<10){
        alert("لطفا کد ملی خود را وارد کنید.")
        return;
    }

    infoDialog.style.display = "none";
    dialog.style.display = "flex";

});

function sendSurveyResponses(data) {
    const url = "https://script.google.com/macros/s/AKfycbzD_LzGy8fBkzuil6eDkyT_1udyDJ5q07rNOosn3J6CBzLnhqPM-4qFvuf0vKC0_sgA/exec"; // Replace with your Google Apps Script URL

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            id:responses.id,
            answers: `${a1}-${a2}-${a3}-${a4}-${a5}`
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

