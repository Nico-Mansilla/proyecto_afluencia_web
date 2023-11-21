document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const message = document.getElementById("message");
    const chileTimeElement = document.getElementById("chileTime");
    const numeroPersonasElement = document.getElementById("numeroPersonas");
    const porcentajePersonasElement = document.getElementById("porcentajePersonas");
    //const nombreDiaElement = document.getElementById("nombreDia");
    
    const capacidadC = 200.00;

    let myChart;

    
    
    function updateNumeroPersonas() {
        callAPI()
            .then(result => {
                const fechaActual = new Date();
    
                // Configuración para obtener la fecha en formato "YYYY-MM-DD" en la zona horaria de Santiago de Chile
                const opcionesFormato = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/Santiago' };
    
                const fechaC = fechaActual.toLocaleDateString('es-CL', opcionesFormato);
                // Invertir los componentes de la cadena de fecha
                const fechaChile = fechaC.split('-').reverse().join('-');
    
                const datosHoy = result.filter(dato => dato.fecha.S.startsWith(fechaChile));

                
                // Objeto para realizar un seguimiento de la suma y la cantidad de ocurrencias de cada valor de horInv
                const promedioPorHora = {};
    
                datosHoy.forEach(dato => {
                    // Verificar si la zona es igual a 1
                    if (dato.zona && dato.flag.N === "0") {
                        const hora = dato.fecha.S.slice(-8, -3);
                        const cantidad = parseInt(dato.cantidad.N);
                
                        // Si es la primera vez que encontramos esta hora, inicializamos el objeto
                        if (!promedioPorHora[hora]) {
                            promedioPorHora[hora] = { sum: 0, count: 0 };
                        }
                
                        // Actualizamos la suma y la cantidad
                        promedioPorHora[hora].sum += cantidad;
                        promedioPorHora[hora].count++;
                    }
                });
    
                // Calculamos el promedio y actualizamos los arreglos horInv y verInv
                const horasUnicas = Object.keys(promedioPorHora);
                const horInv = horasUnicas.reverse();
                const verInv = horasUnicas.map(hora => promedioPorHora[hora].sum / promedioPorHora[hora].count).reverse();
    
                // Resto de tu código para actualizar la interfaz gráfica
                //busca ultimo dato
                const datoConMayorId = datosHoy.reduce((max, dato) => (
                    max && max.id && max.id.S > dato.id.S ? max : dato
                ), null);
                let numeroPersonas = datoConMayorId ? parseInt(datoConMayorId.cantidad.N) : null;
                //numeroPersonas = datoConMayorId ? parseInt(datoConMayorId.cantidad.N) : "Fuera de servicio";

                //console.log("Respuesta: ", result);
                //actualiza números solo si flag =0
                const ultimoDato = datosHoy.reduce((max, dato) => {
                    // Obtener los IDs sin el primer caracter
                    const idMax = max && max.id ? max.id.S.slice(1) : '';
                    const idDato = dato.id.S.slice(1);
                
                    // Comparar los IDs sin el primer caracter
                    return idMax > idDato ? max : dato;
                }, null);
                if (ultimoDato.flag.N === "0") {
                    numeroPersonasElement.textContent = numeroPersonas; // Establece el contenido dentro del .then
                    porcentajePersonasElement.textContent = Math.round((numeroPersonas / capacidadC) * 100);
                } else {
                    numeroPersonasElement.textContent = "Fuera de servicio"; // Establece el contenido dentro del .then
                    porcentajePersonasElement.textContent = "Fuera de servicio";
                }
                
                //actualiza gráfico
                chartUpdate(horInv, verInv);
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
        //nombreDiaElement.textContent = nombreDia;
    }
    
    function chartUpdate(xVal, yVal) {
        xValues = xVal;
        yValues = yVal.reverse();
        const barColors = ["#d86a50"]; // Puedes ajustar el color según tu preferencia
        const options = { weekday: 'long' };
        nombreDia = new Date().toLocaleString("es-CL", options);
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
                        display: true,
                        text: "Historial de hoy "+nombreDia
                    },
                    scales: {
                        x: {
                            type: 'linear', // Usa una escala lineal para el eje x
                            position: 'bottom',
                            ticks: {
                                stepSize: 2, // Puedes ajustar el paso según tu necesidad
                                callback: function (value) {
                                    return value % 2 === 0 ? xValues[value] : '';
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            min: 0  // Establece el valor mínimo del eje y en 0
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
    update();
    setInterval(update, 5000);
});