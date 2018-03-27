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
router.delete('/deleteEmployees/:id',employeeEntry.deleteData);
router.post('/employeeLogin',employeeEntry.getLogin);
router.get('/getemployeeName',employeeEntry.getEmployeeName);
        //Send Amount Schema
router.post('/saveSend',sendAmount.saveData);
router.get('/getAllSends',sendAmount.getData);
router.put('/updateSends/:id',sendAmount.updateSend);
       //send Amount To Bank
router.post('/saveRecieved',sendToBank.saveData);
router.get('/getAllRecieved',sendToBank.getData);

        // Login Collection
// router.post('/getLogin',login.getLogin);
// router.put('/passUpdate',login.passUpdate);

        // Drivers Record Collection
// router.post('/addDriversRecord',records.saveData);
// router.get('/getDriversRecord',records.getData);
// router.delete('/deleteDriversRecord/:id',records.deleteData);
// router.put('/updateDriversRecord/:id',records.updateDriverInfo);

        // Coach Info Collection
// router.post('/addCoachInfo',coach_records.saveData);
// router.get('/getCoachInfo',coach_records.getData);
// router.get('/getDloc',coach_records.getDloc);
// router.get('/getTime',coach_records.getTime);
// router.get('/getCoach',coach_records.getCoach);
// router.delete('/deleteCoachInfo/:id',coach_records.deleteData);
// router.put('/updateCoachRecords/:id',coach_records.updateCoachInfo);



module.exports = router;