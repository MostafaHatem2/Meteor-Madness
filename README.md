Meteor Madness
Welcome to the "Meteor Madness" project, an interactive tool that allows users to understand the potential effects of asteroid impacts. Using real data from NASA, this application simulates anticipated impact scenarios and visualizes the results on a global map, helping to raise awareness and understand potential risks.

Key Features
Realistic Simulation: Impact effects are calculated based on real data for diameter and velocity, using physical equations.

Interactive Interface: The application provides a user-friendly interface that allows for manual data entry or the selection of predefined scenarios.

Visual Representation: The anticipated impact zone is displayed on an interactive map, which transforms abstract numbers into understandable visual information.

Tools and Technologies Used
This project was built using a combination of tools and technologies:

Programming Languages: Python, JavaScript, HTML, CSS.

Frameworks and Libraries:

PyWebview (or Eel): To connect the frontend with the Python code.

Folium (or Plotly): To create interactive maps.

requests: To collect data from NASA APIs.

Bootstrap: For a quick and professional user interface design.

pandas: For data processing and cleaning.

Project Structure
/project_name
├── data/
│ ├── asteroid_data.json # Asteroid data from NASA
│ └── population_data.csv # Population density data
│
├── src/
│ ├── app.py # The main application file
│ ├── calculations.py # The physics equations file
│ └── simulation.py # The visual simulation file
│
├── web/
│ ├── index.html # The main user interface
│ ├── style.css # Styles and colors design
│ └── script.js # User interaction and Python communication
│
├── .gitignore # Files to ignore on GitHub
└── README.md # Project description

How to Run the Project
Follow these steps to run the application on your machine:

Clone the Repository

git clone https://github.com/MostafaHatem2/Meteor-Madness.git
cd Meteor-Madness

Install Required Libraries

pip install -r requirements.txt

Note: You must create a requirements.txt file containing a list of all used libraries.

Run the Application

python src/app.py

Contributors
[Mostafa Hatem]: Data and Frontend Lead.

[Yousef Abdallah]: Logic and Simulation Engineer.

[Alaa Ibrahim]: Logic and Simulation Engineer.

[Menna Alrahman]: Project and Creative Content Manager.

[Moaaz FarouK]: Project and Creative Content Manager.
