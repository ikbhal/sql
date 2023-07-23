const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Backend API Tests', () => {
  // Test data for inserting a row
  const testRowData = {
    column1: 'Test Row',
    column2: 42,
  };
  let insertedId;

  it('should create the table', (done) => {
    chai
      .request(app)
      .post('/create-table')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Table creation initiated.');
        done();
      });
  });

  it('should insert a row', (done) => {
    chai
      .request(app)
      .post('/insert-row')
      .send(testRowData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Row inserted successfully.');
        expect(res.body).to.have.property('insertedId');
        insertedId = res.body.insertedId;
        done();
      });
  });

  it('should get all rows', (done) => {
    chai
      .request(app)
      .get('/get-rows')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        done();
      });
  });

  it('should get a row by ID', (done) => {
    chai
      .request(app)
      .get(`/get-row/${insertedId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').equal(insertedId);
        expect(res.body).to.have.property('column1').equal(testRowData.column1);
        expect(res.body).to.have.property('column2').equal(testRowData.column2);
        done();
      });
  });

  it('should update a row by ID', (done) => {
    const updatedData = {
      column1: 'Updated Row',
      column2: 99,
    };
    chai
      .request(app)
      .put(`/update-row/${insertedId}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal(`Row with ID ${insertedId} updated successfully.`);
        done();
      });
  });

  it('should delete a row by ID', (done) => {
    chai
      .request(app)
      .delete(`/delete-row/${insertedId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal(`Row with ID ${insertedId} deleted successfully.`);
        done();
      });
  });

  it('should drop the table', (done) => {
    chai
      .request(app)
      .delete('/drop-table')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Table drop initiated.');
        done();
      });
  });
});
