document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const message = document.getElementById("message");
    const chileTimeElement = document.getElementById("chileTime");
    const numeroPersonasElement = document.getElementById("numeroPersonas");
    const porcentajePersonasElement = document.getElementById("porcentajePersonas");
    const nombreDiaElement = document.getElementById("nombreDia");
    
    const capacidadC = 200.00;

    let myChart;

    
    
    function updateNumeroPersonas() {
        callAPI()
            .then(result => {
                
                
                const datoConMayorId = result.reduce((max, dato) => (
                    max && max.id && max.id.S > dato.id.S ? max : dato
                  ), null);
                const numeroPersonas = datoConMayorId ? parseInt(datoConMayorId.cantidad.N) : null;
                
                console.log("Respuesta: ", result);
                //actualiza nmumeros
                numeroPersonasElement.textContent = numeroPersonas; // Establece el contenido dentro del .then
                porcentajePersonasElement.textContent = Math.round((numeroPersonas/capacidadC)*100);
                //actualiza grafico
                const hor = result.map(dato => dato.fecha.S);
                const ver = result.map(dato => parseInt(dato.cantidad.N));

                const horInv = hor.map(date => date.slice(-8, -3)).reverse();
                const verInv = ver.slice().reverse();

                chartUpdate(horInv,verInv);

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
                var jsonResult = result.body; // Suponiendo que el valor que necesitas se encuentra en una propiedad llamada 'body'
    
                // Resuelve la promesa con el valor resultante
                
                  //console.log("asdas: ", results);
                resolve(jsonResult);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    

    function updateChileTime() {
        const chileTime = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
        chileTimeElement.textContent = chileTime;
        const options = { weekday: 'long' };
        nombreDia = new Date().toLocaleString("es-CL", options);
        nombreDiaElement.textContent = nombreDia;
    }
    
    function chartUpdate(xValues, yValues) {
        const barColors = ["#f04d28"]; // Puedes ajustar el color según tu preferencia

        // Comprueba si el gráfico ya existe
        

        if (myChart) {
            // Actualiza los datos del gráfico existente
            existingChart.data.labels = xValues;
            existingChart.data.datasets[0].data = yValues;
            existingChart.update();
        } else {
            // Crea un nuevo gráfico si no existe
            new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        borderColor: barColors, // Agrega un color de borde si lo deseas
                        data: yValues,
                        fill: "start", // Rellena el área bajo la línea
                    }]
                },
                options: {
                    animation: {
                        duration: 0 // Desactiva la animación
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                        text: ""
                    },
                    scales: {
                        x: {
                            type: 'linear', // Usa una escala lineal para el eje x
                            position: 'bottom',
                            ticks: {
                                stepSize: 1, // Puedes ajustar el paso según tu necesidad
                                callback: function (value) {
                                    return value % 1 === 0 ? xValues[value] : '';
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    function update() {
        updateChileTime();
        updateNumeroPersonas();
    }
    // Actualizar cada segundo
    setInterval(update, 2000);
});