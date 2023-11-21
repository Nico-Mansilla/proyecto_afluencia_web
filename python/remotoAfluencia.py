import requests
import json
import pytz
import locale
from datetime import datetime

# Define la URL de la API Gateway
api_url = "https://dqrqv2q9jg.execute-api.sa-east-1.amazonaws.com/deploy"  # Reemplaza con la URL de tu API Gateway

# Obtén la hora actual en Santiago de Chile automáticamente

santiago_timezone = pytz.timezone('Chile/Continental')
now = datetime.now(santiago_timezone).strftime("%Y-%m-%d %H:%M:%S")
dia = datetime.now(santiago_timezone).strftime("%A")

zona = 1
cantidad = 20

# Datos a enviar en la solicitud POST
data = {
    "zona": str(zona),
    "cantidad": cantidad,
    "tiempo": now,
    "dia": dia
}

# Convierte los datos a JSON
data_json = json.dumps(data)

# Realiza la solicitud POST
response = requests.post(api_url, data=data_json, headers={"Content-Type": "application/json"})

# Verifica la respuesta
if response.status_code == 200:
    print("Solicitud exitosa. Respuesta:")
    print(response.text)
else:
    print(f"Error en la solicitud: {response.status_code} - {response.text}")

# Realiza una solicitud GET para obtener la respuesta
response = requests.get(api_url)
print(response.text)
