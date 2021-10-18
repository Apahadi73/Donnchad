import requests
from psycopg2 import connect
from html.parser import HTMLParser

event_url = "https://uttyler.campuslabs.com/engage/api/discovery/event/search?endsAfter=2021-10-17T18%3A55%3A17-05%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query="

r = requests.get(event_url)

eventJSON = None
if (r.ok):
    print("---request operation successfull---------")
    eventJSON = r.json()
else:
    print("------request operation failed----------")

events = []

event_dict = {}

class MyHTMLParser(HTMLParser):
    def handle_data(self, data):
        event_dict["description"] = data

parser = MyHTMLParser()

if (eventJSON["value"]) != None:
    for event in (eventJSON["value"]):
        event_dict["eid"] = event["id"]
        event_dict["hostname"] = event["organizationName"]
        event_dict["name"] = event["name"]
        parser.feed(event["description"])
        event_dict["location"] = event["location"]
        event_dict["categorynames"] = event["categoryNames"]
        event_dict["starttime"] = event["startsOn"]
        event_dict["endtime"] = event["endsOn"]
        if(event["imagePath"] != None):
            event_dict["imageurl"] ="https://uttyler.campuslabs.com/engage/image/" +event["imagePath"]
        events.append(event_dict)
        event_dict={}

print("--------event list fetched-----------")

# declare connection instance
conn = connect(
    dbname = "postgres",
    user = "postgres",
    host = "localhost",
    password = "password"
)

print("--------db connection started------------")

# declare a cursor object from the connection
cursor = conn.cursor()

for event in events:
    name,hostname,st,et,location,description,imageurl = event["name"],event["hostname"],event["starttime"],event["endtime"],event["location"],event["description"],event["imageurl"] if "imageurl" in event else ""
    result = cursor.execute(f"SELECT * FROM events WHERE name='{name}' AND hostname=\'{hostname}\' AND starttime=\'{st}\' AND endtime=\'{et}\' ;")
    if result is None:
        cursor.execute(f"INSERT INTO events (name,hostname,starttime,endtime,location,description,imageurl) VALUES (%s,%s,%s,%s,%s,%s,%s)",(name,hostname,st,et,location,description,imageurl))

print("--------data entered in events-----------")
conn.commit()

# close the cursor object to avoid memory leaks
cursor.close()

# close the connection as well
conn.close()
print("--------db connection closed------------")
