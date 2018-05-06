var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var record = {
    title: 'Application',
    statusCode: 200
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://eleven4generator:eleven4generator@ds213239.mlab.com:13239/eleven4generator', { useMongoClient: true });


var loginEmployeeDetailsSchema = new Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeePassword: {
        type: String,
        required: true
    },
    employeeCnic: {
        type: String,
        required: true
    },
    employeeContact: {
        type: String,
        required: true
    },
    employeeAdress: {
        type: String,
        required: true
    },
    employeeAmount: {
        type: Number,
        required :true
    },
    employeeJoinMonth: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    check:{
        type : Boolean
    }
}, { collection: 'loginEmployeeDetails' });

var model = mongoose.model("loginEmployeeDetails", loginEmployeeDetailsSchema);

// for sava data
record.saveData = function (req, res) {

    var postBody = req.body;
    var data = {
        employeeName: postBody.employeeName,
        employeePassword: postBody.employeePassword,
        employeeCnic: postBody.employeeCnic,
        employeeContact: postBody.employeeContact,
        employeeAdress: postBody.employeeAdress,
        employeeAmount: postBody.employeeAmount,
        employeeJoinMonth: postBody.employeeJoinMonth,
        type: postBody.type,
        check : true
    }       
    var addData = new model(data);
    addData.save(function (err, newdata) {
        if (err) {
            console.log(err)
            res.send({
                statusCode: 505,
                message: "Unable To Save a Data"
            });
        }
        else {
            res.send({
                statusCode: 200,
                message: "Data has been saved",
                newdata
            })
        }

    });
}

//   //get data for showing all records *
record.getData = function (req, res) {
    model.find({}, function (err, newdata) {
        if (err) {
            res.send({
                statusCode: 505,
                message: "Some thing went wrong"
            });
        }
        else {
            res.send({
                statusCode: 200,
                message: "Data has been displayed",
                data: newdata
            })
        }

    });
}

// find one by id 
record.getDataById = function (req, res) {
    var postBody = req.params.id;
    model.findById(postBody, function (err, newdata) {
        if (err) {
            res.send({
                statusCode: 505,
                message: "Some thing went wrong"
            });
        }
        else {
            res.send({
                statusCode: 200,
                message: "Data has been displayed",
                data: newdata
            })
        }

    });
}


// update customer entry
record.updateloginEmployeeDetails = function(req,res){
    var postBody = req.params.id;
    model.findByIdAndUpdate(postBody,{
    $set : { 
        employeeName: req.body.employeeName,
        employeePassword: req.body.employeePassword,
        employeeCnic: req.body.employeeCnic,
        employeeContact: req.body.employeeContact,
        employeeAdress: req.body.employeeAdress,
        employeeJoinMonth: req.body.employeeJoinMonth,
        type: req.body.type
   } 
    },function(err,newdata){
            if (err){
                console.log("Error")
                res.send({
                    statusCode : 505,
                    message : "Some thing went wrong"
                   })
                }
              else{
                res.json({
                statusCode : 200,
                message : "Data has been updated",  
                data: newdata 
                })
            }
        })
    }
     //delete Records
record.deleteData = function(req,res){
    var postBody = req.params.id;
        model.findByIdAndRemove(postBody,function(err,newdata){
            if (err){
                res.send({
                    statusCode : 505,
                    message : "Some thing went wrong"
                    })
                }
                else{
                res.send({
                    statusCode : 200,
                    message : "Data has been deleted",
                    data:newdata 
                })
            }
        })
    }
 // update Amount
 record.updateloginEmployeeAmount = function(req,res){
    var postBody = req.params.id;
    model.findByIdAndUpdate(postBody,{
    $set : { 
        employeeAmount: req.body.employeeAmount,
        check : req.body.check
   }
    },function(err,newdata){
            if (err){
                console.log("Error")
                res.send({
                    statusCode : 505,
                    message : "Some thing went wrong"
                   })
                }
              else{
                res.json({
                statusCode : 200,
                message : "Amount has been updated",  
                data: newdata 
                })
            }
        })
    }

    //Get Login Employees
    record.getLogin = function (req, res) {
              var postBody = req.body;
              model.find({employeeName: postBody.employeeName,
                employeePassword: postBody.employeePassword},
                function (err, data) {
                if (err) {
                  console.log(err)
                } else if(data.length==0) {
                    res.send({
                        statusCode : 404,
                         message : "Email or Password is Invalid"
                    });
            }
            else{
                const user  = {id:3};
                const token = jwt.sign({user},'my_secret_key',{ expiresIn: '30 days' });
                res.send({
                    statusCode : 200,
                    message : "Login Successfully",
                    data:data,
                    success : true,
                    token : token
             })
            }
     })
}

record.getEmployeeName = function(req,res){
    model.find({},{employeeName:1,_id:false},function(err,newdata){
            if (err){
                res.send({
                    statusCode : 505,
                    message : "Some thing went wrong"
                   });
                }
              else{
                var data1 = [];
                if(newdata!==null){
                    size=newdata.length;
                    for(let i=0; i<size; i++)
                    {
                        for(let j=i+1; j<size; j++)
                        {
                            /* If any duplicate found */
                            if(newdata[i].employeeName == newdata[j].employeeName)
                            {
                                /* Delete the current duplicate element */
                                for(let k=j; k<size; k++)
                                {
                                    newdata[k] = newdata[k + 1];
                                }
                
                                /* Decrement size after removing duplicate element */
                                size--;
                
                                /* If shifting of elements occur then don't increment j */
                                j--;
                            }
                        }
                    }
              }
              else{
                  console.log("Data not found");
              }
              for(let m=0;m<size;m++){
                  data1[m]=newdata[m];
              }
              console.log(data1);
                res.send({
                  statusCode : 200,
                   message : "Data has been displayed",
                   data:data1 
                })    
            }
        });
    }
     // update Amount
 record.updateloginEmployeeCheck = function(req,res){
    var postBody = req.params.id;
    model.findByIdAndUpdate(postBody,{
    $set : { 
        check: req.body.check
   } 
    },function(err,newdata){
            if (err){
                console.log("Error")
                res.send({
                    statusCode : 505,
                    message : "Some thing went wrong"
                   })
                }
              else{
                res.json({
                statusCode : 200,
                message : "Button Pressed",  
                data: newdata 
                })
            }
        })
    }

module.exports = record;