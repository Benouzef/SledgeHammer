const fs = require('fs');
const router = require('express').Router();

router.get('/customers/', file('mock-api/Customers.json'));
router.get('/customers/:id/', file('mock-api/Customer.json'));

function file(filename) {
  return (request, response) => {
    response.writeHead(200, 'OK', {'Content-Type': 'application/json'});
    fs.createReadStream(filename).pipe(response);
  };
}

module.exports = router;