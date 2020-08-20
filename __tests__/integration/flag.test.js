import request from 'supertest';
import app from '../../src/app';

describe('Flag Survivor', () => {
  it('should be able to flag a survivor', async () => {
    await request(app)
      .post('/survivors')
      .send({
        name: 'Olive Yew',
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

    await request(app)
      .post('/survivors')
      .send({
        name: 'Teri Dactyl',
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

    const response = await request(app).get('/survivors').send();

    const infected_id = response.body[0].id;
    const { id } = response.body[1];

    await request(app).post(`/report/${id}`).send({ infected_id }).expect(204);
  });

  it('should not be able to flag more  than once the same survivor', async () => {
    const response = await request(app).get('/survivors').send();

    const infected_id = response.body[0].id;
    const { id } = response.body[1];

    await request(app).post(`/report/${id}`).send({ infected_id }).expect(400);
  });

  it('should not be able to flag yourselft', async () => {
    const response = await request(app).get('/survivors').send();

    const { id } = response.body[1];

    await request(app)
      .post(`/report/${id}`)
      .send({ infected_id: id })
      .expect(400);
  });

  it('should be able to flag survivor 5x', async () => {
    await request(app)
      .post('/survivors')
      .send({
        name: 'Mario Speedwagon',
        age: 18,
        gender: 'man',
        latitude: '16.3287',
        longitude: '48.9534',
        items: [
          {
            item_id: 1,
            quantity: 8,
          },
          {
            item_id: 2,
            quantity: 7,
          },
          {
            item_id: 3,
            quantity: 4,
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
        name: 'Anna Sthesia',
        age: 19,
        gender: 'man',
        latitude: '16.3287',
        longitude: '48.9534',
        items: [
          {
            item_id: 1,
            quantity: 8,
          },
          {
            item_id: 2,
            quantity: 7,
          },
          {
            item_id: 3,
            quantity: 4,
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
        name: 'Gail Forcewind',
        age: 20,
        gender: 'man',
        latitude: '16.3287',
        longitude: '48.9534',
        items: [
          {
            item_id: 1,
            quantity: 8,
          },
          {
            item_id: 2,
            quantity: 7,
          },
          {
            item_id: 3,
            quantity: 4,
          },
          {
            item_id: 4,
            quantity: 3,
          },
        ],
      });

    const response = await request(app).get('/survivors').send();

    const infected_id = response.body[0].id;
    const { id } = response.body[1];
    const id_2 = response.body[2].id;
    const id_3 = response.body[3].id;
    const id_4 = response.body[4].id;
    const id_5 = response.body[5].id;

    await request(app).post(`/report/${id}`).send({ infected_id });
    await request(app).post(`/report/${id_2}`).send({ infected_id });

    await request(app).post(`/report/${id_3}`).send({ infected_id });

    await request(app).post(`/report/${id_4}`).send({ infected_id });

    await request(app)
      .post(`/report/${id_5}`)
      .send({ infected_id })
      .expect(204);
  });

  it('you should not be able to flag a survivor already infected ', async () => {
    await request(app)
      .post('/survivors')
      .send({
        name: 'Bob Frapples',
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

    const response = await request(app).get('/survivors').send();

    const infected_id = response.body[5].id;
    const { id } = response.body[6];

    await request(app).post(`/report/${id}`).send({ infected_id }).expect(400);
  });
});
