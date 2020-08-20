import request from 'supertest';
import app from '../../src/app';
import SurvivorRepository from '../../src/app/repositories/SurvivorRepository';

describe('Survivor', () => {
  it('should be able to flag a survivor', async () => {
    await SurvivorRepository.store({
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
    });

    await SurvivorRepository.store({
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
    });

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
    await SurvivorRepository.store({
      name: 'Hugo First',
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

    await SurvivorRepository.store({
      name: 'Percy Vere',
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

    await SurvivorRepository.store({
      name: 'Percy Vere',
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

    const response = await request(app).get('/survivors').send();
    console.log(response.body);

    // const infected_id = response.body[0].id;
    // const { id } = response.body[1];

    // await request(app).post(`/report/${id}`).send({ infected_id }).expect(204);
  });
});
