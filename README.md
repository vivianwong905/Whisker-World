# Whisker World!

## Link to our deployed site:
https://whisker-world.onrender.com/

## What is Whisker World?

Whisker World is an e-commerce site that was designed as a one stop shop for cat owners. We chose to cater specifically to the needs of cats so it can be a more intimate shopping experience for the user. With a limited number of products we are focused on meeting your needs as you search for the PURRRRRRR-fect items. Sifting through products on other websites can be a daunting task and we look to solve that problem. Your time is precious and the longer you spend looking at your device the less time you have with your best FUR-iend!

### Key Features

1. Persistent Cart.
2. Backend Sorting and Filtering for better User Experience.
3. Frontend Sorting by Price and Category for precision.
4. Colorful design that is visually appealing while not being overwhelming or unclear.
5. User feedback in the form of snack bar "Success!" messages and color changing on hover buttons.
5. The capability to login and register with user data saved on the backend.
6. Admin can easily create/add/change/delete items as an admin.

## React + Express

Getting Started

1. Make a new repository using this template
2. Add your teammates as collaborators on the repository
3. Clone your repository locally
4. Run `npm install` to install all the dependencies
5. Setup your `.env` file locally - you can use the `.env.example` as a guideline. In particular, you will need to setup `PORT` and `DATABASE_URL` environment variables. But you may as well at a `JWT_SECRET` while you're in there.
6. Run `npm run dev` to run locally


### Starting the App

Start the server (great while only working on API endpoints)
```
npm run server:dev
```

For starting the full-stack application - the server will restart whenever changes are made in the `server` directory, and the React app will rebuild whenever changes are made in the `client` directory.

```
npm run dev
```

### Running Tests

This will run Jest with verbose output enabled:
```
npm run test
```

If you want Jest to continually run as files are changed, you can call:
```
npm run test -- --watch
```

Or if you want Jest to continually run all tests when files change:
```
npm run test -- --watchAll
```

### Seed the Database

This will run the `server/db/seed.js` file:
```
npm run seed
```

### Deploying the App

You will need to create a Database in your hosting provider of choice (Render or Heroku both work well, but only Render is free).

Once you have a Database URL setup, you will need to setup your Environment Variables to include your Database URL, as well as any other app secrets needed (eg. JWT secret, Client ID and Secret for OAuth, etc)

Whichever provider you use, you will need to set the following settings:

**Build Command:** `npm install && npm run seed && npm run build`
**Start Command:** `npm start`

## Basic File Structure
```
.
├── client/
├── dist (ignored by git)
├── image
├── mocks/
├── node_modules (ignored by git)
├── prisma/
├── server/
├── .gitignore
├── babel.config.js
├── index.html
├── jest.config.js
├── package.json
├── README.md
└── vite.config.js
```

### Client Files

```
.
├── client/
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── Admin.test.jsx
│   │   │   └── Cart.test.jsx
│   │   │   └── Filters.test.jsx
│   │   │   └── GuestCartItems.test.jsx
│   │   │   └── LoggedInCartItem.test.jsx
│   │   │   └── AuthForm.test.jsx
│   │   │   └── NavBar.test.jsx
│   │   │   └── NewProductForm.test.jsx
│   │   │   └── Products.test.jsx
│   │   │   └── SingleProduct.test.jsx
│   │   │   └── UpdateProductForm.test.jsx
│   │   ├── Admin
│   │   |   ├── Admin.jsx
│   │   |   ├── NewProoductForm.jsx
│   │   |   └── UpdateProductForm.jsx
│   │   ├── Auth
│   │   |   ├── AuthForm.jsx
│   │   ├── Cart
│   │   |   ├── GuestCart
│   │   │   |       └── GuestCartItem.jsx
│   │   |   ├── LoggedInCart
│   │   │   |       └── LoggedInCartItem.jsx
│   │   |   └── Cart.jsx
│   │   ├── Products
│   │   |   ├── Filters.jsx
│   │   |   ├── Products.jsx
│   │   |   └── SingleProduct.jsx
│   │   └── NavBar.jsx
│   ├── redux
│   │    └── api.js
│   │    └── authSlice.js
│   │    └── cartSlice.js
│   │    └── filterSlice.js
│   │    └── store.js
│   └── App.jsx
│   └── index.css
│   └── main.jsx
│   └── theme.jsx


```

### Additional Files

```

├── image/
│   ├── catIcon.png
├── mocks
│   ├── fileMock.js
│   ├── prismaMock.js
│   ├── serverMock.js
│   │   ├── api/
│   │   │   └── apiSlice.js
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   └── counter/
│   │       └── counterSlice.js

```

### Server Files

```
├── prisma/
│   ├── migrations
│   └── schema.prisma
├── server/
│   ├── __tests__/
│   │   └── auth.test.js
│   │   └── products.test.js
│   │   └── userCart.test.js
│   ├── api/
│   │   ├── checkout.js
│   │   ├── index.js
│   │   ├── products.js
│   │   └── users.js
│   ├── auth/
│   │   ├── index.js
│   │   └── middleware.js
│   ├── db/
│   │   ├── catProducts.js
│   │   ├── client.js
│   │   └── seed.js
│   ├── app.js (configure the app)
│   └── index.js (start the app)

```
├── .gitignore
├── babel.config.js
├── index.html
├── jest.config.js
├── jest.pollyfills.js
├── package-lock.json
├── package.json
├── vite.config.js
