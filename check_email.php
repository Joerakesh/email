function submitEmail() {
    let email = document.getElementById("userEmail").value;
    if (email) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://your-domain.com/save_email.php", true); // Use your hosted PHP URL here
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.exists) {
                    alert("You are already subscribed!");
                } else {
                    alert("Thank you for subscribing!");
                }
                document.getElementById("emailPopup").style.display = "none";
            }
        };
        xhr.send("email=" + encodeURIComponent(email));
    } else {
        alert("Please enter a valid email.");
    }
}
