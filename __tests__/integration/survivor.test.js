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
      });

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
});
