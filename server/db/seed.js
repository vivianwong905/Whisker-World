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
   const products = await Promise.all(
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
                { quantity: 5, product: { connect: { id: products[0].id } } },
                { quantity: 4, product: { connect: { id: products[1].id } } },
                { quantity: 3, product: { connect: { id: products[2].id } } }
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
                { quantity: 5, product: { connect: { id: products[0].id } } },
                { quantity: 4, product: { connect: { id: products[1].id } } },
                { quantity: 3, product: { connect: { id: products[2].id } } }
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

