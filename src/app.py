
from math import sqrt
import webview
import json
import os
import requests
import math
from calculations import calculate_mass_and_energy, calculate_impact_effects
from simulation import generate_map_html

webPath = os.path.abspath("web")

class Api():
    def get_asteroid_list(self):
        url = "https://ssd-api.jpl.nasa.gov/cad.api"
        params = {
            "dist-min": "   0.01",
            "dist-max": "0.05",
            "nea": "true",
        }
        response = requests.get(url, params=params)
        if response.status_code != 200:
            return json.dumps({"error": f"Failed to fetch asteroid list: {response.status_code}"})

        data = response.json()

        if "data" not in data or "fields" not in data:
            return json.dumps({"error": "No asteroid data found in NASA API response."})

        fields = data["fields"]
        des_index = fields.index("des")
        h_index = fields.index("h")
        v_inf_index = fields.index("v_inf")

        asteroid_info = []
        for item in data["data"]:
            if item[h_index] not in (None, "") and item[v_inf_index] not in (None, ""):
                asteroid_info.append({
                    "name": item[des_index],
                    "h": item[h_index],
                    "v_inf": item[v_inf_index]
                })


        return json.dumps(asteroid_info)


    def run_simulation(
    self,
    asteroid_name=None,
    diameter=None,
    velocity=None,
    lat=None,
    long=None,
    h_value=None
):  
     error_message = None
     asteroid_name = asteroid_name.replace(" ", "") if asteroid_name else None

     # Latitude & Longitude check
     lat = float(lat) if lat not in (None, "") else 0.0
     long = float(long) if long not in (None, "") else 0.0

     pv = 0.15
     D = 1329

     try:
         if asteroid_name and h_value not in (None, "") and velocity not in (None, ""):
             # حساب القطر من magnitude
             actual_diameter_m = (D / math.sqrt(pv)) * (10**(-float(h_value)/5))
             actual_velocity_ms = float(velocity) * 1000

         elif (not asteroid_name) and (diameter not in (None, "")) and (velocity not in (None, "")):
             # لو المستخدم دخل القطر والسرعة بنفسه
             actual_diameter_m = float(diameter) * 1000
             actual_velocity_ms = float(velocity) * 1000

         else:
             error_message = "Invalid input parameters"
             return json.dumps({"error": error_message})

         # الحسابات
         mass_energy_results = calculate_mass_and_energy(actual_diameter_m, actual_velocity_ms)
         impact_effects = calculate_impact_effects(mass_energy_results["energy"])
         map_html = generate_map_html(lat, long, impact_effects["blast_radius_km"])
        
         final_results = {
             "mass_kg": mass_energy_results["mass"],
             "energy_joules": mass_energy_results["energy"],
             "megatons_tnt": impact_effects["megatons_tnt"],
             "crater_diameter_km": impact_effects["crater_diameter_km"],
             "blast_radius_km": impact_effects["blast_radius_km"],
             "map_html": map_html
         }
         return json.dumps(final_results)

     except Exception as e:
         return json.dumps({"error": str(e)})


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
