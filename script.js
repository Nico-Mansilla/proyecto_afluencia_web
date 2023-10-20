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
        callAPI()
            .then(result => {
                const numeroPersonas = result;
                console.log("Respuesta: ", result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
        numeroPersonasElement.textContent = numeroPersonas;
    }

    var callAPI = () => {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var requestOptions = {
                method: 'GET', // Cambiamos el método a GET si solo esperamos una respuesta
                headers: myHeaders,
                redirect: 'follow'
            };
    
            fetch("YOUR API GATEWAY ENDPOINT", requestOptions)
            .then(response => response.text())
            .then(result => {
                var resultObject = JSON.parse(result);
                var resultValue = resultObject.body;
    
                // Resuelve la promesa con el valor resultante
                resolve(parseFloat(resultValue));
            })
            .catch(error => {
                reject(error);
            });
        });
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