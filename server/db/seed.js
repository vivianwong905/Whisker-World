const prisma = require("./client");
const { faker } = require("@faker-js/faker");

async function seed() {
  console.log("Seeding the database.");
  try {
    // Clear the database
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();

    // Add 5 products
    await Promise.all(
      [...Array(5)].map(() =>
        prisma.product.create({
          data: {
            name: faker.commerce.product(),
            detail: faker.lorem.sentences(),
            price: faker.commerce.price(),
            imageUrl: faker.image.url(),
          },
        })
      )
    );

    //create cart with users and cart items
    await Promise.all(
      [...Array(5)].map((_, i) =>
        prisma.cart.create({
          data: {
            user: {
              create: {
                username: faker.internet.userName(),
                password: faker.internet.password(),
                name: faker.person.fullName(),
                admin: i % 2 !== 0,
              }
            },
            cartItems: {
              create: [
                { quantity: 5, productId: 1 },
                { quantity: 4, productId: 2 },
                { quantity: 3, productId: 3 }
              ]
            }
          },
        })
      )
    );

     //create cart without users so we can use it for guest checkout
     await Promise.all(
      [...Array(5)].map((_, i) =>
        prisma.cart.create({
          data: {
            cartItems: {
              create: [
                { quantity: 5, productId: 1 },
                { quantity: 4, productId: 2 },
                { quantity: 3, productId: 3 }
              ]
            }
          },
        })
      )
    );

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}
seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

