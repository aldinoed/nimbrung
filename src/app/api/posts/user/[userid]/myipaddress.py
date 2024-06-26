import json
import requests

from urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

response = requests.put(
      url='https://192.168.57.250/restconf/data/Cisco-IOS-XE-native:native/interface/Loopback=8888',
      auth=('admin', 'admin'),
      headers={
            'Accept':'application/yang-data+json',
            'Content-Type':'application/yang-data+json'
      },
      data=json.dumps({
            'Cisco-IOS-XE-native:Loopback':{
                  'name':8888,
                  'ip':{
                        'address':{
                              'primary':{
                                    'address':'8.8.8.8',
                                    'mask':'255.255.255.255'
                              }
                        }
                  }
            }
      })
      verify=False
)

print('Response Code: ' + str(response.status_code))