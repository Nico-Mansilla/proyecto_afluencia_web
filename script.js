document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const message = document.getElementById("message");
    const chileTimeElement = document.getElementById("chileTime");
    const numeroPersonasElement = document.getElementById("numeroPersonas");
    const porcentajePersonasElement = document.getElementById("porcentajePersonas");
    var n = 0;
    const capacidadC = 300.00;

    var cPersonas = 12;

    
    
    function updateNumeroPersonas() {
        callAPI()
            .then(result => {
                const numeroPersonas = result;
                const porcentajePersonas = parseFloat(result);

                console.log("Respuesta: ", result);
                numeroPersonasElement.textContent = numeroPersonas; // Establece el contenido dentro del .then
                porcentajePersonasElement.textContent = Math.round((numeroPersonas/capacidadC)*100);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    var callAPI = () => {
        return new Promise((resolve, reject) => {
            var requestOptions = {
                method: 'GET', // Cambiamos el método a GET si solo necesitas el valor
                redirect: 'follow'
            };
    
            fetch("https://dqrqv2q9jg.execute-api.sa-east-1.amazonaws.com/deploy", requestOptions)
            .then(response => response.json())
            .then(result => {
                var resultValue = result.body; // Suponiendo que el valor que necesitas se encuentra en una propiedad llamada 'body'
    
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