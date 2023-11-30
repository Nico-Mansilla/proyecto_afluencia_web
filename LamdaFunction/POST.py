import json

# import the AWS SDK (for Python the package name is boto3)
import boto3

# import two packages to help us with dates and date formatting
from time import gmtime, strftime

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('afluenciaDB')

# store the current time in a human-readable format in a variable
#now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    # Extract the parameters from the event
    try:
        #data = json.loads(event['body'])
        #id = data.get('id')
        #cantidad = data.get('cantidad')
        #tiempo = data.get('tiempo')
        
        tiempo = str(event['tiempo'])
        cantidad = int(event['cantidad'])
        zona = int(event['zona'])
        dia = str(event['dia'])
        tiempoCln=''.join(filter(str.isdigit, tiempo))
        id= str(zona)+tiempoCln
        flag = int(event['flag'])
        
    except (KeyError, json.JSONDecodeError):
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid request data')
        }

    # Data to be added to the DynamoDB table
     
#,  # Use the ID from the request
#        'cantidad': cantidad,
#        'tiempo':tiempo
    # Write the item to the DynamoDB table using the put_item method
    response = table.put_item(Item= {
        'id': id,
        'cantidad': cantidad,
        'fecha': tiempo,
        'zona': zona,
        'dia': dia,
        'flag': flag
    })

    # Return a JSON response
    return {
        'statusCode': 200,
        'body': json.dumps('Item added to the table')
    }