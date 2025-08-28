// Add main Title Dynamic
document.querySelector("h1").innerHTML = "Meteor Madness";

// Add My Asteroid Button
let inputs = document.querySelector(".inputs");
let inputGroup = document.querySelector(".input-group");
let addMyAsteroid = document.querySelector(".addMyAsteroid");
let choseRealAsteroid = document.querySelector(".choseRealAsteroid");

addMyAsteroid.addEventListener("click", () => {
  inputGroup.innerHTML = "";
  document.querySelector("h1").innerHTML = "Add My Asteroid";

  let asteroid_name = document.createElement("input");
  asteroid_name.type = "text";
  asteroid_name.placeholder = "Asteroid Name";
  asteroid_name.classList.add("asteroid_name");
  inputGroup.appendChild(asteroid_name);

  let diameter = document.createElement("input");
  diameter.type = "number";
  diameter.placeholder = "Diameter";
  diameter.classList.add("diameter");
  inputGroup.appendChild(diameter);

  let velocity = document.createElement("input");
  velocity.type = "number";
  velocity.placeholder = "Velocity";
  velocity.classList.add("velocity");
  inputGroup.appendChild(velocity);

  let latitude = document.createElement("input");
  latitude.type = "number";
  latitude.max = "90";
  latitude.min = "-90";
  latitude.classList.add("latitude");
  latitude.placeholder = "Impact Location Latitude";
  inputGroup.appendChild(latitude);

  let longitude = document.createElement("input");
  longitude.type = "number";
  longitude.max = "180";
  longitude.min = "-180";
  longitude.classList.add("longitude");
  longitude.placeholder = "Impact Location Longitude";
  inputGroup.appendChild(longitude);

  let generate = document.createElement("button");
  generate.innerHTML = "Generate";
  generate.classList.add("generate");
  inputGroup.appendChild(generate);

  // ✅ attach listener here (after button exists)
  generate.addEventListener("click", () => {
    runSimulation(
      asteroid_name.value,
      diameter.value,
      velocity.value,
      latitude.value,
      longitude.value
    );
  });
});

choseRealAsteroid.addEventListener("click", function () {
  inputGroup.innerHTML = "";
  document.querySelector("h1").innerHTML = "Choose Already Asteroid";

  const url = "./ssd.json";
  const params = new URLSearchParams({
    "date-min": "2025-08-01",
    "date-max": "2025-08-28",
    "dist-max": "0.05",
    nea: "true",
  });
  fetch(`${url}?${params.toString()}`)
    .then((res) => res.json())
    .then((data) => {
      const fields = data.fields;
      const nameIndex = fields.indexOf("des"); // حدد العمود المناسب لاسم الكويكب
      const select = document.createElement("select");
      select.id = "asteroidSelect";

      data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[nameIndex];
        option.textContent = item[nameIndex];
        select.appendChild(option);
      });

      inputGroup.appendChild(select);

      const launchBtn = document.createElement("button");
      launchBtn.textContent = "Run Simulation";
      inputGroup.appendChild(launchBtn);

      launchBtn.addEventListener("click", () => {
        const selectedName = select.value;
        runSimulationExist(selectedName);
      });
    });
});

async function runSimulationExist(asteroid_name) {
  inputGroup.innerHTML = "";
  let result = document.createElement("div");
  result.classList.add("result");
  result.innerHTML = `<h3>Simulation Result</h3> Name: ${asteroid_name}`;
  inputs.appendChild(result);
}

function runSimulation(asteroid_name, diameter, velocity, latitude, longitude) {
  inputGroup.innerHTML = "";
  let result = document.createElement("div");
  result.classList.add("result");
  result.innerHTML = `
      <h3>Simulation Result</h3>
      Name: ${asteroid_name} <br>
      Diameter: ${diameter} km <br>
      Velocity: ${velocity} km/s <br>
      Latitude: ${latitude} <br>
      Longitude: ${longitude}
    `;
  inputs.appendChild(result);
}
