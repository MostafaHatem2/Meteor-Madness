# calculations.py
def calculate_mass_and_energy(actual_diameter_m, veactual_velocity_mslocity_kms):
    print(f"from calcution {actual_diameter_m}")

def calculate_impact_effects(kinetic_energy_joules):
    values = {
        "megatons_tnt": kinetic_energy_joules / 4.184e12,
        "blast_radius_km": kinetic_energy_joules / 1.2,
        "crater_diameter_km": kinetic_energy_joules / 100,
    }
    return values
