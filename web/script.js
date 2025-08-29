// Add main Title Dynamic
document.querySelector("h1").innerHTML = "Meteor Madness";

// Add My Asteroid Button
let inputs = document.querySelector(".inputs");
let inputGroup = document.querySelector(".input-group");
let addMyAsteroid = document.querySelector(".addMyAsteroid");
let choseRealAsteroid = document.querySelector(".choseRealAsteroid");

//! addMyAsteroid Funcation

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
    callPythonSimulation(
      asteroid_name.value,
      diameter.value,
      velocity.value,
      latitude.value,
      longitude.value
    );
  });
});

//! choseRealAsteroid Funcation

choseRealAsteroid.addEventListener("click", async function () {
  inputGroup.innerHTML = "";
  document.querySelector("h1").innerHTML = "Choose Already Asteroid";

  inputGroup.innerHTML = `<p class="text-info text-center">..........</p>`;

  try {
    const jsonString = await pywebview.api.get_asteroid_list();
    const asteroidList = JSON.parse(jsonString);

    inputGroup.innerHTML = "";

    if (asteroidList.error) {
      inputGroup.innerHTML = `<p class="text-danger">خطأ في تحميل قائمة الكويكبات: ${asteroidList.error}</p>`;
      console.error(
        "Error fetching asteroid list from Python:",
        asteroidList.error
      );
      return;
    }

    if (asteroidList.length > 0) {
      let select = document.createElement("select");
      select.id = "asteroidSelect";
      select.classList.add("form-select", "mb-3");
      inputGroup.appendChild(select);

      if (asteroidList.length > 0) {
        asteroidList.forEach((asteroidName) => {
          let option = document.createElement("option");
          option.value = asteroidName;
          option.textContent = asteroidName;
          select.appendChild(option);
        });
      } else {
        let option = document.createElement("option");
        option.value = "";
        option.textContent = "لا توجد كويكبات متاحة";
        select.appendChild(option);
      }

      let latitude = document.createElement("input");
      latitude.type = "number";
      latitude.max = "90";
      latitude.min = "-90";
      latitude.classList.add("latitude", "form-control", "mb-3");
      latitude.placeholder = "Impact Location Latitude";
      inputGroup.appendChild(latitude);

      let longitude = document.createElement("input");
      longitude.type = "number";
      longitude.max = "180";
      longitude.min = "-180";
      longitude.classList.add("longitude", "form-control", "mb-3");
      longitude.placeholder = "Impact Location Longitude";
      inputGroup.appendChild(longitude);

      const launchBtn = document.createElement("button");
      launchBtn.textContent = "Run Simulation";
      launchBtn.classList.add("btn", "btn-primary", "mt-3");
      inputGroup.appendChild(launchBtn);

      launchBtn.addEventListener("click", () => {
        const selectedName = select.value;
        const selectedLatitude = latitude.value;
        const selectedLongitude = longitude.value;

        callPythonSimulation(
          selectedName,
          null,
          null,
          selectedLatitude,
          selectedLongitude
        );
      });
    } else {
      inputGroup.innerHTML = `<p class="text-danger">لا توجد كويكبات متاحة</p>`;
    }
  } catch (error) {
    console.error("Error fetching asteroid list:", error);
    inputGroup.innerHTML = `<p class="text-danger">حدث خطأ أثناء تحميل قائمة الكويكبات.</p>`;
  }
});

async function callPythonSimulation(
  asteroid_name,
  diameter,
  velocity,
  latitude,
  longitude
) {
  inputGroup.innerHTML = `<p class="text-info text-center">..........</p>`;
  try {
    const response = await pywebview.api.run_simulation(
      asteroid_name,
      diameter,
      velocity,
      latitude,
      longitude
    );

    const resultData = JSON.parse(response);
    displaySimulationResults(resultData);
  } catch (error) {
    console.error("Error running simulation:", error);
    inputGroup.innerHTML = `<p class="text-danger">حدث خطأ أثناء تشغيل المحاكاة.</p>`;
  }
}
function displaySimulationResults(resultData) {
  inputGroup.innerHTML = "";

  let resultDiv = document.createElement("div");
  resultDiv.classList.add("result", "card", "p-3", "mt-4");

  if (resultData.error) {
    resultDiv.innerHTML = `<h2 class="text-danger">خطأ في المحاكاة</h2><p>${resultData.error}</p>`;
  } else {
    resultDiv.innerHTML = `
            <h2 class="text-center mb-3">نتائج المحاكاة</h2>
            <p><strong>الكتلة:</strong> ${
              resultData.mass
                ? resultData.mass.toExponential(2) + " kg"
                : "غير متاح"
            }</p>
            <p><strong>الطاقة الحركية:</strong> ${
              resultData.energy
                ? resultData.energy.toExponential(2) + " Joules"
                : "غير متاح"
            }</p>
            <p><strong>قوة الاصطدام:</strong> ${
              resultData.megatons_tnt
                ? resultData.megatons_tnt.toFixed(2) + " Megatons TNT"
                : "غير متاح"
            }</p>
            <p><strong>قطر الحفرة المتوقع:</strong> ${
              resultData.crater_diameter_km
                ? resultData.crater_diameter_km.toFixed(2) + " km"
                : "غير متاح"
            }</p>
            <p><strong>نصف قطر موجة الانفجار:</strong> ${
              resultData.blast_radius_km
                ? resultData.blast_radius_km.toFixed(2) + " km"
                : "غير متاح"
            }</p>
            <h3 class="mt-4 text-center">موقع التأثير</h3>
            <div class="map-container" style="width: 100%; height: 400px; border-radius: 8px; overflow: hidden;">
                ${
                  resultData.map_html ||
                  '<p class="text-warning">الخريطة غير متاحة.</p>'
                }
            </div>
        `;
  }
  inputGroup.appendChild(resultDiv);
}
