document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const message = document.getElementById("message");
    const chileTimeElement = document.getElementById("chileTime");
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
    
    function updateChileTime() {
        const chileTime = new Date().toLocaleString("en-US", { timeZone: "America/Santiago" });
        chileTimeElement.textContent = chileTime;
    }
    updateChileTime();

    // Actualizar la hora cada segundo
    setInterval(updateChileTime, 1000);
});