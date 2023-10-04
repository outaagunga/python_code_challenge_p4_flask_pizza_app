from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models import Restaurant, Pizza, RestaurantPizza, db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)


# Schemas

class RestaurantSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Restaurant
        include_relationships = True
        load_instance = True


class PizzaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pizza
        include_relationships = True
        load_instance = True


class RestaurantPizzaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RestaurantPizza
        load_instance = True

# Routes


@app.route('/')
def home():
    return "Welcome to the Pizza Restaurants API"

# Get all restaurants


@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    schema = RestaurantSchema(many=True)
    return jsonify(schema.dump(restaurants))

# Get a specific restaurant by ID


@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404
    schema = RestaurantSchema()
    return jsonify(schema.dump(restaurant))

# Delete a restaurant by ID


@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404

    # Delete associated restaurant_pizzas first
    RestaurantPizza.query.filter_by(restaurant_id=id).delete()

    db.session.delete(restaurant)
    db.session.commit()
    return jsonify({}), 204

# Get all pizzas


@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    schema = PizzaSchema(many=True)
    return jsonify(schema.dump(pizzas))

# Create a new restaurant_pizza


@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.json
    pizza_id = data.get('pizza_id')
    restaurant_id = data.get('restaurant_id')
    price = data.get('price')

    if not (pizza_id and restaurant_id and price):
        return jsonify({'errors': ['Validation errors']}), 400

    if price < 1 or price > 30:
        return jsonify({'errors': ['Validation errors']}), 400

    pizza = Pizza.query.get(pizza_id)
    restaurant = Restaurant.query.get(restaurant_id)

    if not (pizza and restaurant):
        return jsonify({'errors': ['Validation errors']}), 400

    restaurant_pizza = RestaurantPizza(
        price=price,
        pizza_id=pizza_id,
        restaurant_id=restaurant_id
    )
    db.session.add(restaurant_pizza)
    db.session.commit()

    schema = PizzaSchema()
    return jsonify(schema.dump(pizza))


if __name__ == '__main__':
    app.run(debug=True)
