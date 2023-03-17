# Grocery Shop Layered Architecture

This is a project for a grocery shop that uses a layered architecture. It provides features such as ordering products, adding to cart and wishlist, uploading new products, user login and signup, and much more. This project is built using Node.js, Express, MongoDB, and other dependencies.

## Design

![Design](./image/Screenshot%20from%202023-03-14%2010-20-51.png)

## Architecture

For this grocery shop project, a layered architecture was chosen to improve the scalability, maintainability and flexibility of the application. The layered architecture consists of the following layers:

    Presentation Layer: This layer handles user interface and input/output operations.
    Application Layer: This layer is responsible for the coordination and orchestration of business logic.
    Domain Layer: This layer is where the core business logic is implemented.
    Data Access Layer: This layer manages the communication between the application and the database.

This approach has several benefits. Firstly, it makes the application more scalable as each layer can be scaled independently. Secondly, it makes the application more maintainable as changes in one layer do not affect the others. Thirdly, it improves the flexibility of the application as each layer can be replaced or modified without affecting the others.

However, a layered architecture can also have some drawbacks. For instance, it can increase the complexity of the application as it adds more layers to the codebase. Additionally, it can lead to performance issues as communication between different layers is required.

Overall, the decision to use a layered architecture for this project was made with the aim of improving the scalability, maintainability, and flexibility of the application.

## Features

- User registration and login
- User profile management
- Product listing and search
- Product detail view
- Adding/removing products to/from cart
- Adding/removing products to/from wishlist
- Ordering products
- Uploading new products
- And much more!

## Run Locally

To run this project on your local machine, follow the steps below:

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm install` to install all dependencies.
4. Create a `.env` file in the root directory and set the necessary environment variables.
5. Run `npm start` to start the server.
6. Test using Postman/Thunder Client

## Appendix

The following are the endpoints for the API:

- `/api/users` (user registration and login)
- `/api/products` (product listing and search)
- `/api/products/:id` (product detail view)
- `/api/cart` (adding/removing products to/from cart)
- `/api/wishlist` (adding/removing products to/from wishlist)
- `/api/orders` (ordering products)
- `/api/admin` (admin dashboard)

## Tech Stack

- Node.js
- Express
- MongoDB
- React (for frontend)
