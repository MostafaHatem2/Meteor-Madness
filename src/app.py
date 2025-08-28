
import webview
import json
import os
import requests
from calculations import calculate_mass_and_energy, calculate_impact_effects
from simulation import generate_map_html

webPath = os.path.abspath("web")

class Api():
    def run_simulation(self, asteroid_name, diameter, velocity, lat, lon):
        # Step 1: mass & energy
        results = calculate_mass_and_energy(diameter, velocity)
        print("Mass and Energy:", results)

        # Step 2: impact effects
        effects = calculate_impact_effects(results["energy"])
        print("Impact Effects:", effects)

        # Step 3: generate map html
        html = generate_map_html(lat, lon)
        print("Generated HTML:\n", html)
        


def start_app():
    api_handler = Api()
    window = webview.create_window(
        title="Meteor Madness",
        url = os.path.join(webPath, 'index.html'),
        js_api=api_handler
    )
    webview.start()


if __name__ == '__main__':
    # هنا تستدعي دالة بدء التطبيق
    start_app()