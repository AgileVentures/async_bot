const English = require('yadda').localisation.English;
const botMock = require('botkit-mock');
const nock = require('nock')
const testedFile = require("../../src/controller");

module.exports = English.library()
    .given("network interactions are mocked", function (next) {
        this.ctx.async_rest = nock('http://localhost:3000')
            .post('/stories').reply(201, '{"_id": 3}')
            .post('/stories/3/votes').reply(201)

        next()
    })
    .then("the vote is persisted to the Async core backend", function () {
        this.ctx.async_rest.done();
    })
