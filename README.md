Pizza Restaurants
This Flask API project provides endpoints to manage pizza restaurants and their menus. It allows you to view restaurants, their menus, add new menu items, and delete restaurants.

Problem Statement
Managing pizza restaurants and their menus can be a complex task. This API simplifies the process by providing a straightforward way to interact with restaurant data and their associated pizzas. It also includes validation for pricing to ensure data integrity.

Project Structure
The project structure is organized as follows:

app.py: The main Flask application file containing the API routes and configurations.
pizza_restaurants.db: SQLite database file to store restaurant, pizza, and menu item data.

README.md: This documentation file.
requirements.txt: List of project dependencies.
venv/: Virtual environment directory (create one using python -m venv venv).
Getting Started
To get started with this project, follow the steps below:

Fork the Project
Click the "Fork" button at the top-right corner of this repository. This will create a copy of the project in your GitHub account.
Clone the Project
On your forked repository, click the "Code" button and copy the URL (e.g., https://github.com/your-username/pizza-restaurants-api.git).

Open your terminal or command prompt and navigate to the directory where you want to clone the project.

Run the following command to clone the project to your local machine:

git clone https://github.com/your-username/pizza-restaurants-api.git
Install Dependencies
Navigate to the project directory:

cd pizza-restaurants-api
Create a virtual environment (if not already created):

python -m venv venv
Activate the virtual environment:

On Windows:

venv\Scripts\activate
On macOS and Linux:

source venv/bin/activate
Install project dependencies:

pip install -r requirements.txt
Run the Application
Ensure you are in the project directory with the virtual environment activated.

Run the Flask application:

python app.py
The API will start running locally at http://localhost:5000. You can access the API using this URL.

API Endpoints
GET /restaurants: Get a list of all restaurants.
GET /restaurants/:id: Get details of a specific restaurant by ID.
DELETE /restaurants/:id: Delete a restaurant by ID, along with its menu items.
GET /pizzas: Get a list of all available pizzas.
POST /restaurant_pizzas: Create a new menu item associated with a restaurant and pizza.
Contributing
If you'd like to contribute to this project, please follow the standard GitHub flow:

Fork the repository.
Create a new branch for your feature or bug fix.
Make changes, commit, and push to your branch.
Create a pull request to submit your changes for review.

License
This project is licensed under the MIT License - see the LICENSE file for details.
