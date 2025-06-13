import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let createdProductId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /products → deve criar um novo produto', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Produto Teste E2E',
        description: 'Descrição do produto de teste',
        price: 99.99,
        category: 'Categoria Teste',
      })
      .expect(201);

    // Validar que a resposta contém um _id
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('Produto Teste E2E');

    // Guardar o _id para usar nos próximos testes
    createdProductId = response.body._id;
  });

  it('GET /products → deve listar os produtos', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    // Validar que a resposta é um array
    expect(Array.isArray(response.body)).toBe(true);

    // Validar que o produto criado aparece na lista
    const foundProduct = response.body.find(
      (product) => product._id === createdProductId,
    );
    expect(foundProduct).toBeDefined();
    expect(foundProduct.name).toBe('Produto Teste E2E');
  });

  it('GET /products/:id → deve buscar um produto específico', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', createdProductId);
    expect(response.body.name).toBe('Produto Teste E2E');
  });

  it('DELETE /products/:id → deve deletar o produto', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(200);

    // Agora esperamos que o GET retorne 404 após deletar
    await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(404);
  });
});
