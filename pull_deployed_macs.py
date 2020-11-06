#!/usr/bin/python3
import pprint
from carto.auth import APIKeyAuthClient

USERNAME="rofor8"
USR_BASE_URL = "https://rofor8.carto.com/".format(user=USERNAME)
auth_client = APIKeyAuthClient(api_key="606dccebf8b13efcc2a36201730087365a82ab1c", base_url=USR_BASE_URL)


from carto.sql import SQLClient

sql = SQLClient(auth_client)

try:
    data = sql.send('SELECT * FROM dep')
except CartoException as e:
    print("some error ocurred", e)

datarows = data['rows']

f= open("macs_deployed.txt","w+")

for datalist in datarows:
   macaddress = datalist.get('mac')
   print(macaddress)
   f.write(macaddress + "\n")
