const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')


// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
})

const testUser = {
  username: "eli1",
  passsword: "123321"
};


describe('server', () => {
    describe('jokes get request', () => {
        it('no permission without token', async () => {
            const res = await request(server).get('/api/jokes')
        expect(res.status).toBe(401);
        });
        it('res type of json', async() => {
            const res = await request(server).get('/api/jokes');
            expect(res.type).toBe('application/json')
        });
    });
    describe("register", () => {
        it('500 error', async () => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({user: "kek1", pass: "kekw1" });
            expect(res.status).toBe(500);
        });
        it('creates user', async () => {
          const res = await request(server).post("/api/auth/register").send(testUser);

          expect(res.statusCode).toBe(500);
        });
    });
    describe("login endpoint", ()=> {
        it('should fail with invalid user', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'ttt', password: '123123123' })
            expect(res.status).toBe(401)
        })
    });
});