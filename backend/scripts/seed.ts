import mongoose from 'mongoose';
import { Faker, en } from '@faker-js/faker';
import { Product, ProductSchema } from '../src/products/schemas/product.schema';
import { Review, ReviewSchema } from '../src/reviews/schemas/review.schema';

const faker = new Faker({ locale: [en] });

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/products_reviews_db';

const NUM_PRODUCTS = 10;
const REVIEWS_PER_PRODUCT = 5;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log('✅ Conectado ao MongoDB');

  // Reset total
  await mongoose.connection.dropDatabase();
  console.log('🗑️ Banco de dados resetado (dropDatabase)');

  const ProductModel = mongoose.model<Product>('Product', ProductSchema);
  const ReviewModel = mongoose.model<Review>('Review', ReviewSchema);

  await ProductModel.deleteMany({});
  await ReviewModel.deleteMany({});
  console.log('🗑️ Collections limpas');

  const products = [];

  for (let i = 0; i < NUM_PRODUCTS; i++) {
    const product = await ProductModel.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      category: faker.commerce.department(),
      createdAt: faker.date.past(),
    });

    products.push(product);
  }

  console.log(`✅ ${NUM_PRODUCTS} Products criados`);

  for (const product of products) {
    for (let j = 0; j < REVIEWS_PER_PRODUCT; j++) {
      await ReviewModel.create({
        productId: product._id,
        author: faker.person.fullName(),
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
        createdAt: faker.date.recent(),
      });
    }
  }

  console.log(`✅ ${REVIEWS_PER_PRODUCT} Reviews criadas para cada Product`);

  await mongoose.disconnect();
  console.log('🚀 Seed finalizado. Conexão encerrada.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
