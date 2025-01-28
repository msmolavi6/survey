function sendData() {
    const city = document.getElementById('city').value;
    const education = document.getElementById('education').innerText;
    const username = document.getElementById('username').innerText;
    const phone = document.getElementById('phone').innerText;
    const contactNumber = document.getElementById('contactNumber').innerText;
    const description = document.getElementById('description').value;

    const membership = document.querySelector('input[name="membership"]:checked') ? document.querySelector('input[name="membership"]:checked').id : null;

    const formData = {
        city,
        education,
        username,
        phone,
        contactNumber,
        description,
        membership,
        sheet:"sheet8"
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

    fetch('https://script.google.com/macros/s/AKfycbyELA3KbdRMcax_9CQWzjgGBzaZWVrLs5iSjZsGD51hkouWSVxaZp4HaqufJwLUMAff/exec', requestOptions)
        .then(data => {
            console.log('Success:', data);
            alert('اطلاعات با موفقیت ثبت شد.');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error with your submission.');
        });
}