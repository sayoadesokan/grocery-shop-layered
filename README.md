# Grocery Shop Monolithic Architecture

This is a monolithic architecture project for a grocery shop. It provides features such as ordering products, adding to cart and wishlist, uploading new products, user login and signup, and much more. This project is built using Node.js, Express, MongoDB, and other dependencies.

## Design Pattern

![Design Pattern](./image/Screenshot%20from%202023-03-14%2010-20-51.png)

## Architecture

For this grocery shop project, a monolithic architecture was chosen to simplify the development and deployment process. All of the features, such as user registration and login, product listing and search, adding/removing products to/from cart and wishlist, ordering products, and uploading new products, are implemented within a single application.

This approach has several benefits. Firstly, it simplifies the development process as developers only have to work on a single codebase. Secondly, it makes deployment easier as the entire application can be deployed as a single unit. Thirdly, it can lead to better performance since communication between different components is not required.

However, monolithic architectures can also have some drawbacks. For instance, it can be difficult to scale specific components independently. Additionally, since all components are bundled together, it can be harder to maintain and update the application in the long term.

Overall, the decision to use a monolithic architecture for this project was made with the aim of simplifying the development and deployment process, while also ensuring good performance.

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

## Screenshots

![Home Page](https://i.imgur.com/1234567.png)
![Product Listing Page](https://i.imgur.com/1234567.png)
![Product Detail Page](https://i.imgur.com/1234567.png)
![Cart Page](https://i.imgur.com/1234567.png)
![Order Confirmation Page](https://i.imgur.com/1234567.png)
![Admin Dashboard](https://i.imgur.com/1234567.png)

## Tech Stack

- Node.js
- Express
- MongoDB
- React (for frontend)
