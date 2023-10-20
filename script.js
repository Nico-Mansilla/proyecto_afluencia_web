document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const message = document.getElementById("message");
    const chileTimeElement = document.getElementById("chileTime");
    const numeroPersonasElement = document.getElementById("numeroPersonas");
    var n = 0;

    var cPersonas = 12;

    //button.addEventListener("Actualizar", function () {
    //    message.textContent = cPersonas
    //});
    
    function updateNumeroPersonas() {
        fetch(" https://dqrqv2q9jg.execute-api.sa-east-1.amazonaws.com/deploy", requestOptions)
            .then(response => response.text())
            .then(result => alert(JSON.parse(result).body))
            .catch(error => console.log('error', error));
        callAPI(document.getElementById('base').value,document.getElementById('exponent').value)
        const numeroPersonas = "1";
        numeroPersonasElement.textContent = numeroPersonas;
    }

    function updateChileTime() {
        const chileTime = new Date().toLocaleString("en-US", { timeZone: "America/Santiago" });
        chileTimeElement.textContent = chileTime;
    }
    

    function update() {
        updateChileTime();
        updateNumeroPersonas();
    }
    // Actualizar cada segundo
    setInterval(update, 1000);
});