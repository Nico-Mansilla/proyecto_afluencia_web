import boto3
from datetime import datetime, timedelta

def lambda_handler(event, context):
    
    # Obtén la fecha y hora actual en UTC
    fecha_actual_utc = datetime.utcnow()
    
    # Ajusta la fecha y hora actual a la zona horaria de Santiago (considerando un offset fijo de -3 horas)
    fecha_actual_santiago = fecha_actual_utc - timedelta(hours=3)
    
    # Obtiene el nombre del día de la semana en formato "Sunday", "Monday", etc.
    nombre_dia_actual = fecha_actual_santiago.strftime('%A')
    

    # Inicializa el cliente de DynamoDB
    dynamodb = boto3.client('dynamodb')

    # Nombre de la tabla de DynamoDB
    tabla_nombre = 'afluenciaDB'

    try:
        # Escanea la tabla para obtener todos los elementos
        response = dynamodb.scan(TableName=tabla_nombre)

        # Filtra las entradas que cumplen con la condición de la columna "dia"
        items_filtrados = [item for item in response['Items'] if 'dia' in item and item['dia']['S'] in [nombre_dia_actual]]

        if items_filtrados:
            # Ordena los elementos filtrados en orden descendente según la clave de tiempo
            items_ordenados = sorted(items_filtrados, key=lambda x: x['fecha']['S'], reverse=True)

            # Obtiene todos los datos del dia
            valor_cantidad = items_ordenados
            
            return {
                'statusCode': 200,
                'body': valor_cantidad
            }
        else:
            return {
                'statusCode': 404,
                'body': 'No se encontraron resultados que cumplan con la condición del día.'
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }