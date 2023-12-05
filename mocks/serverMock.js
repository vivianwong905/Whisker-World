import React from 'react'
import { http, HttpResponse, delay } from 'msw'
const { faker } = require("@faker-js/faker");

export const productsHandlers = [
    http.get('http://localhost:8080/api/products', async () => {
      await delay(150)
      return HttpResponse.json([
        { id: 1, name: "cats are cool", detail: "here are all the cool cats", price: 10, imageUrl: "www.image.com" },
        { id: 2, name: "dogs are cool", detail: "here are all the cool dogs", price: 12, imageUrl: "www.images.com" },
    ])
    })
  ]

  export const singleProductHandlers = [
    http.get('http://localhost:8080/api/products/:id', async ({params}) => {
      const id = params.id
      await delay(150)
      return HttpResponse.json([
        { id: id, name: "cats are cool", detail: "here are all the cool cats", price: 10, imageUrl: "www.image.com" },
    ])
    })
  ]
  
  export const usersHandlers = [
    http.get('http://localhost:8080/auth', async () => {
      await delay(150)
      return HttpResponse.json([
        {id: 1, 
          username: faker.internet.userName(),
          password: hashedPassword,
          name: faker.person.fullName(),
          admin: false},
        { id: 2,  
          username: faker.internet.userName(),
          password: hashedPassword,
          name: faker.person.fullName(),
          admin: false}
    ])
    })
  ]

  export const cartHandlers = [
    http.get('http://localhost:8080/api/users/me/cart', async () => {
      await delay(150)
      return HttpResponse.json([
       { cartItems: [
            { quantity: 5, productId:100 },
            { quantity: 4, productId:101 },
            { quantity: 3, productId:102 }
          ]}
        
    ])
    })
  ]


// make different handler for each api endpoint on front end,