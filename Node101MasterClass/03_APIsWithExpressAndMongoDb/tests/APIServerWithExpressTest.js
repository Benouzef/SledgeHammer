var assert = require('assert');
var app = require('../src/APIServerWithExpress');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('Customers', () => {
    describe('/GET Customers', () => {
        it('it should GET all the customers', (done) => {
        chai.request(app)
            .get('/Customers')
            .end((err, res) => {
                    res.should.have.status(200);
                    //console.log(res);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                done();
            });
        })
    })

    describe('/GET a single Customer', () => {
        it('it should GET a single customer', (done) => {
        chai.request(app)
            .get('/Customers/1')
            .end((err, res) => {
                    res.should.have.status(200);
                    //console.log(res);
                    res.body.should.be.a('object');
                    res.body.name.should.be.eql('name1');
                    res.body.email.should.be.eql('name1@test.com');
                done();
            });
        })
    })
});
