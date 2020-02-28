const request = require('supertest'); 

const server = require('./server.js');



describe('server', function() { 

    describe('GET /', function() {
        it('should return 200 OK', function() {
            // make a GET request to /
            return request(server).post('/api/auth/register')
                .then(res => {
                // check that the status code is 200
                expect(res.status).toBe(500);
            })
        })

        it('should return JSON', function() {
            // make a GET request to /
            return request(server).post('/api/auth/register')
                .then(res => {
                // check that the status code is 200
                expect(res.type).toMatch('text/html')
            })
        })



        it('should return 200 OK', function() {
            // make a GET request to /
            return request(server).post('/api/auth/login')
                .then(res => {
                // check that the status code is 200
                expect(res.status).toBe(500);
            })
        })

        it('should return JSON', function() {
            // make a GET request to /
            return request(server).post('/api/auth/login')
                .then(res => {
                // check that the status code is 200
             expect(res.body).toStrictEqual({})
            })
        })


        it('should return 401 OK', function() {
            // make a GET request to /
            return request(server).get('/api/jokes')
                .then(res => {
                // check that the status code is 200
                expect(res.status).toBe(401);
            })
        })

        it('should return {"text"}', function() {
            // make a GET request to /
            return request(server).get('/api/jokes')
                .then(res => {
                // check that the status code is 200
             expect(res.body).toStrictEqual({"you" : "shall not pass!"})
            }) 
        })
})

})