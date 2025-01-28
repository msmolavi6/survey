/*
inspiration
https://dribbble.com/shots/4684682-Aquatic-Animals
*/

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    autoplay:true,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true
    },
    keyboard: {
        enabled: true
    },
    mousewheel: {
        thresholdDelta: 70
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 1
        },
        1024: {
            slidesPerView: 2
        },
        1560: {
            slidesPerView: 3
        }
    }
});


function preRegister(event) {
    event.preventDefault(); // Prevents the default form submission

    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        city: document.getElementById('city').value,
        educationLevel: document.getElementById('educationLevel').value,
        sheet:"sheet7"
    };
    console.log("JSON.stringify(formData)",JSON.stringify(formData))

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(formData);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        mode: "no-cors",
    };

    fetch('https://script.google.com/macros/s/AKfycbziddGNXG9lcaBjZhyS7E4tZG5bT247i-Q1-PIDK4A8iTPZwQFeLT_qw30XCWVj17Xp/exec', requestOptions)
        .then(data => {
            console.log('Success:', data);
            alert('اطلاعات با موفقیت ثبت شد.');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error with your submission.');
        });
}

function redirectToUrl(url) {
    window.open(url, "_blank"); // Opens the URL in a new tab
}

function sendData() {
    // Collecting values from input fields
    const contactNumber = document.getElementById('contact-number').value;
    const fullName = document.getElementById('full-name').value;

    if (!contactNumber || !fullName){
        alert('اطلاعات ناقص است');
        return
    }

    // Creating the data object to send
    const formData = {
        [contactNumber]:fullName,
        sheet:"sheet6"
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(formData);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        mode: "no-cors",
    };

    // Send the data to the API using fetch
    fetch('https://script.google.com/macros/s/AKfycbyi8_kcaZ4AW8je5WMIitnP_lPmRCmtuwJeDs47fqjzgeHvMc5604aqWqTp2rf4-tYU/exec', requestOptions)
        .then(data => {
            alert('اطلاعات شما با موفقیت ثبت شد.');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting your data.');
        });
}

