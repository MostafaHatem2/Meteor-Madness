
import webview
import json
import os
import requests
from calculations import calculate_mass_and_energy, calculate_impact_effects
from simulation import generate_map_html

webPath = os.path.abspath("web")

class Api():
    def get_asteroid_list(self):
        url = "https://ssd-api.jpl.nasa.gov/cad.api"
        params = {
            "dist-min": "0.01",
            "dist-max": "0.05",
            "nea": "true",
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()


            if "data" in data and "fields" in data:
                fields = data["fields"]
                des_index = fields.index("des")   

                asteroid_names = []
                for item in data["data"]:
                    asteroid_names.append(item[des_index])

                print("Asteroids:", asteroid_names)
                return json.dumps(asteroid_names)
            else:
                print("No asteroid data found")
                return None
        else:
            print("Error: ", response.status_code)
            return json.dumps({"error": "Failed to fetch asteroid list from NASA API."})
        


#     def run_simulation(self, asteroid_name, diameter, velocity, lat, lon):

#         # Step 1: mass & energy
#         results = calculate_mass_and_energy(diameter, velocity)
#         print("Mass and Energy:", results)

#         # Step 2: impact effects
#         effects = calculate_impact_effects(results["energy"])
#         print("Impact Effects:", effects)

#         # Step 3: generate map html
#         html = generate_map_html(lat, lon)
#         print("Generated HTML:\n", html)
#         if(asteroid_name != ""):
#             url = "https://ssd-api.jpl.nasa.gov/sbdb.api"
#             params = {
#                 "sstr": asteroid_name,
#                 "ca-data": 1,
#                 "phys-par": 1,
#             }
#             response = requests.get(url, params=params)
#             if response.status_code == 200:
#                 data = response.json()
#                 diameter = None

#                 if("phys-par" in data):
#                     for item in data["phys-par"]:
#                         if item.get("name") == "diameter":
#                             diameter = item.get("value")
#                             break
                
#                 velocity = None
#                 if "ca-data" in data and len(data["ca-data"]) > 0:
#                     velocity = data["ca-data"][0].get("v_inf")
                
#                 print(f"Asteroid: {data.get('object', {}).get('fullname')}")
#                 print(f"Diameter: {diameter} km")
#                 print(f"Velocity: {velocity} km/s")
#             else:
#                 print("Error: ", response.status_code)

    

def start_app():
    api_handler = Api()
    window = webview.create_window(
        title="Meteor Madness",
        url = os.path.join(webPath, 'index.html'),
        js_api=api_handler,
        
    )
    webview.start()


if __name__ == '__main__':
    # هنا تستدعي دالة بدء التطبيق
    start_app()
