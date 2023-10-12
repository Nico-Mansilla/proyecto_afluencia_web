document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const message = document.getElementById("message");
    var n = 0;

    button.addEventListener("click", function () {
        if (n==0) {
            message.textContent = "¡Hola desde AWS Amplify!";
            n=1
        } else {
            message.textContent = "Gracias ChatGPT";
            n=0;
        }
    });
});