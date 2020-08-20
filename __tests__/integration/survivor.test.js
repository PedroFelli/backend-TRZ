import request from 'supertest';
import app from '../../src/app';

describe('Survivor', () => {
  it('should be able to register', async () => {
    await request(app)
      .post('/survivors')
      .send({
        name: 'Pedro Fellipe',
        age: 24,
        gender: 'man',
        latitude: '16.3287',
        longitude: '48.9534',
        items: [
          {
            item_id: 1,
            quantity: 10,
          },
          {
            item_id: 2,
            quantity: 5,
          },
          {
            item_id: 3,
            quantity: 3,
          },
          {
            item_id: 4,
            quantity: 3,
          },
        ],
      })
      .expect(204, '');
  });

  it('should not be able to create a survivor with same name', async () => {
    await request(app)
      .post('/survivors')
      .send({
        name: 'Pedro Fellipe',
        age: 24,
        gender: 'man',
        latitude: '16.3287',
        longitude: '48.9534',
        items: [
          {
            item_id: 1,
            quantity: 10,
          },
          {
            item_id: 2,
            quantity: 5,
          },
          {
            item_id: 3,
            quantity: 3,
          },
          {
            item_id: 4,
            quantity: 3,
          },
        ],
      })
      .expect(400);
  });

  it('should not be able to find a survivor  who doesn t exists', async () => {
    await request(app)
      .get('/survivors/5bd1e912-420d-45c1-aec3-ba173cb76257/')
      .send({})
      .expect(400);
  });

  it('should be able to update a survivor information', async () => {
    const response = await request(app).get('/survivors').send();

    const survivor = response.body[0].id;

    await request(app)
      .put(`/survivors/${survivor}`)
      .send({
        name: 'Lucas',
        age: 22,
        gender: 'woman',
        latitude: '-16.3287',
        longitude: '22.9534',
      })
      .expect(204);

    const res = await request(app).get(`/survivors/${survivor}`).send();

    expect(res.body).toHaveProperty('name', 'Lucas');
  });
});
