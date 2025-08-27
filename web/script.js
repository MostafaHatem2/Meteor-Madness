// Add main Title Dynaimc
document.querySelector("h1").innerHTML = "Meteor Madness";

// Add My Asteroid Button
let inputGroup = document.querySelector(".input-group");
let addMyAsteroid = document.querySelector(".addMyAsteroid");
let choseRealAsteroid = document.querySelector(".choseRealAsteroid");

addMyAsteroid.addEventListener("click", () => {
  inputGroup.innerHTML = "";
  document.querySelector("h1").innerHTML = "Add My Asteroid";
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

  let Latitude = document.createElement("input");
  Latitude.type = "number";
  Latitude.max = "90";
  Latitude.min = "-90";
  Latitude.classList.add("latitude");
  Latitude.placeholder = "Impact Location Latitude";
  inputGroup.appendChild(Latitude);

  let longitude = document.createElement("input");
  longitude.type = "number";
  longitude.max = "180";
  longitude.min = "-180";
  longitude.classList.add("longitude");
  longitude.placeholder = "Impact Location Longitude";
  inputGroup.appendChild(longitude);
});
