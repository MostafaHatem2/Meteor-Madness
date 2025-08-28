# calculations.py
def calculate_mass_and_energy(diameter_km, velocity_kms):
    mass = diameter_km * 1000   # تبسيط: الكتلة = القطر * 1000
    energy = mass * velocity_kms
    return {"mass": mass, "energy": energy}

def calculate_impact_effects(kinetic_energy_joules):
    values = {
        "megatons_tnt": kinetic_energy_joules / 4.184e12,
        "blast_radius_km": kinetic_energy_joules / 1.2,
        "crater_diameter_km": kinetic_energy_joules / 100,
    }
    return values
