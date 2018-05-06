var express = require('express');
var router = express.Router();
var customerFeeEntry = require('./api/application/customerFeeEntry');
var customerEntry = require('./api/application/customerEntry');
var defaulterCustomer = require('./api/application/defaultersCollection');
var employeeEntry = require('./api/application/loginEmployee');
var sendAmount = require('./api/application/sendAmount');
var sendToBank = require('./api/application/sendToBank');



        // customer Fee  Collection
router.post('/customerFeeEntry',customerFeeEntry.saveData);
router.get('/getAllCustomerFee',customerFeeEntry.getData);
router.put('/customerFeeUpdate/:id',customerFeeEntry.updateCustomerFee);
router.delete('/customerFeeDelete/:id',customerFeeEntry.deleteData);

    // customer Entry Collection
router.post('/saveCustomerEntry',customerEntry.saveData);
router.get('/getAllEntries',customerEntry.getData);
router.put('/customerEntryUpdate/:id',customerEntry.updateCustomerEntry);
router.delete('/customerEntryDelete/:id',customerEntry.deleteData);
// router.get('/getDataBy',all_records.getDataBy);
         // defaulter Customer Collection
router.post('/saveDefaulterEntry',defaulterCustomer.saveData);
router.get('/getAllDefaulters',defaulterCustomer.getData);
router.put('/defaulterEntryUpdate/:id',defaulterCustomer.updateDefaulterEntry);
router.delete('/deleteDefaulters/:id',defaulterCustomer.deleteData);
        //Employee collection
router.post('/saveEmployeeEntry',employeeEntry.saveData);
router.get('/getAllEmployees',employeeEntry.getData);
router.put('/employeeEntryUpdate/:id',employeeEntry.updateloginEmployeeDetails);
router.put('/employeeAmountUpdate/:id',employeeEntry.updateloginEmployeeAmount);
router.put('/employeeButtonCheck/:id',employeeEntry.updateloginEmployeeCheck);
router.delete('/deleteEmployees/:id',employeeEntry.deleteData);
router.post('/employeeLogin',employeeEntry.getLogin);
router.get('/getemployeeName',employeeEntry.getEmployeeName);
router.get('/getemployeeNameById/:id',employeeEntry.getDataById);

        //Send Amount Schema
router.post('/saveSend',sendAmount.saveData);
router.get('/getAllSends',sendAmount.getData);

       //send Amount To Bank    
router.post('/saveRecieved',sendToBank.saveData);
router.get('/getAllRecieved',sendToBank.getData);
router.delete('/deletFromBank/:id',sendToBank.deleteData);
// router.put('/updateFromBank/:id',sendToBank.updateSend);
router.put('/updateRecievedAmount/:empBankId',sendToBank.updateSend);
router.put('/updateCurrentRecievedAmount/:id',sendToBank.updateCurrentRecieved);

module.exports = router;