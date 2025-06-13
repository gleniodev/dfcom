import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente (.env)
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), // Agora usa variável de ambiente
    ProductsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
