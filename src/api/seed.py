from app import app, db
from models import Restaurant, Pizza, RestaurantPizza
import random


def seed_restaurants():
    print("🍕 Seeding restaurants...")
    restaurants_data = [
        {"name": "Sottocasa NYC", "address": "298 Atlantic Ave, Brooklyn, NY 11201"},
        {"name": "PizzArte", "address": "69 W 55th St, New York, NY 10019"}
    ]

    with app.app_context():
        for restaurant_info in restaurants_data:
            restaurant = Restaurant(**restaurant_info)
            db.session.add(restaurant)
        db.session.commit()


def seed_pizzas():
    print("🍕 Seeding pizzas...")
    pizzas_data = [
        {"name": "Cheese", "ingredients": "Dough, Tomato Sauce, Cheese"},
        {"name": "Pepperoni", "ingredients": "Dough, Tomato Sauce, Cheese, Pepperoni"}
    ]

    with app.app_context():
        for pizza_info in pizzas_data:
            pizza = Pizza(**pizza_info)
            db.session.add(pizza)
        db.session.commit()


def assign_pizzas_to_restaurants():
    print("🍕 Adding pizzas to restaurants...")
    prices = [5, 10, 15, 20, 25, 30]

    with app.app_context():
        for restaurant in Restaurant.query.all():
            for pizza in Pizza.query.all():
                price = random.choice(prices)
                restaurant_pizza = RestaurantPizza(
                    price=price,
                    restaurant_id=restaurant.id,
                    pizza_id=pizza.id
                )
                db.session.add(restaurant_pizza)
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    seed_restaurants()
    seed_pizzas()
    assign_pizzas_to_restaurants()
    print("🍕 Done seeding!")
