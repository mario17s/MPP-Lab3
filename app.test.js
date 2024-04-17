const request = require('supertest');
const app = require('../app.cjs'); // Assuming your Express app file is named 'app.cjs'

describe('GET /', () => {
  it('responds with status code 200 and returns countries list', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('GET /1', () => {
  it('responds with status code 200 and returns countries list', async () => {
    const response = await request(app).get('/1');
    expect(response.status).toBe(200);
  });
});

describe('POST /add', () => {
  it('responds with status code 200 and returns countries list', async () => {
    const response = await request(app).post('/add');
    expect(response.status).toBe(201);
  });
});

describe('DELETE /del/1', () => {
  it('responds with status code 200 and returns countries list', async () => {
    const response = await request(app).delete('/del/1');
    expect(response.status).toBe(204);
  });
});

describe('PUT /upd/1', () => {
  it('responds with status code 200 and returns countries list', async () => {
    const response = await request(app).put('/upd/1');
    expect(response.status).toBe(200);
  });
});

