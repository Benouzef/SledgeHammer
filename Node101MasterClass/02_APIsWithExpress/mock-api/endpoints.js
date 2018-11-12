const fs = require('fs');
const router = require('express').Router();

router.get('/customers/', file('./Node101MasterClass/02_APIsWithExpress/mock-api/Customers.json'));
router.get('/customers/:id/', file('./Node101MasterClass/02_APIsWithExpress/mock-api/Customer.json'));

function file(filename) {
  return (request, response) => {
    response.writeHead(200, 'OK', {'Content-Type': 'application/json'});
    console.log(process.cwd())
    fs.createReadStream(filename).pipe(response);
  };
}

module.exports = router;