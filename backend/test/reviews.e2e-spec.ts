import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ReviewsController (e2e)', () => {
  let app: INestApplication;
  let createdProductId: string;
  let createdReviewId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Criar um produto para associar reviews
    const productResponse = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Produto com Reviews',
        description: 'Produto para testar reviews',
        price: 199.99,
        category: 'Categoria Reviews',
      })
      .expect(201);

    createdProductId = productResponse.body._id;
  });

  afterAll(async () => {
    // Deletar o produto criado no beforeAll
    await request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(200);

    await app.close();
  });

  it('POST /products/:productId/reviews → deve criar uma avaliação', async () => {
    const response = await request(app.getHttpServer())
      .post(`/products/${createdProductId}/reviews`)
      .send({
        author: 'Autor Teste',
        rating: 5,
        comment: 'Excelente produto!',
      })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.rating).toBe(5);
    expect(response.body.comment).toBe('Excelente produto!');

    createdReviewId = response.body._id;
  });

  it('GET /products/:productId/reviews → deve listar avaliações', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}/reviews`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const foundReview = response.body.find(
      (review) => review._id === createdReviewId,
    );
    expect(foundReview).toBeDefined();
    expect(foundReview.author).toBe('Autor Teste');
  });

  it('GET /products/:productId/reviews/average → deve retornar média de avaliações', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}/reviews/average`)
      .expect(200);

    // Como só temos uma review com rating 5, a média deve ser 5
    expect(response.body).toHaveProperty('averageRating', 5);
  });

  it('DELETE /reviews/:reviewId → deve deletar avaliação', async () => {
    const deleteResponse = await request(app.getHttpServer()).delete(
      `/reviews/${createdReviewId}`,
    );

    expect([200, 404]).toContain(deleteResponse.status);

    // Adicionar um pequeno delay (100ms) para garantir que o Mongo finalize a remoção
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Validar que a review foi removida → lista de reviews deve NÃO conter o review deletado
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}/reviews`)
      .expect(200);

    const foundReview = response.body.find(
      (review) => review._id === createdReviewId,
    );
    expect(foundReview).toBeUndefined();
  });
});
