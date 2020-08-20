import request from 'supertest';
import app from '../../src/app';

describe('Survivor properties', () => {
  it('should not be able to find properties of survivor  who doesn t exists', async () => {
    await request(app)
      .get('/survivors/5bd1e912-420d-45c1-aec3-ba173cb76257/properties')
      .send({})
      .expect(400);
  });
});
