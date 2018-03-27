var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var record = {
    title: 'Application',
    statusCode: 200
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://eleven4generator:eleven4generator@ds213239.mlab.com:13239/eleven4generator', { useMongoClient: true });


var defaulterCustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    panel: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    paid: {
        type: Number,
        required: true
    },
    street_no: {
        type: String,
        required: true
    },
    start_month: {
        type: String,
        required: true
    },
    ampere: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required : true
    }
}, { collection: 'defaulterCustomer' });

var model = mongoose.model("defaulterCustomer", defaulterCustomerSchema);

// for seat reservation
record.saveData = function (req, res) {

    var postBody = req.body;
    var data = {
        name: postBody.name,
        panel: postBody.panel,
        phone_no: postBody.phone_no,
        paid: postBody.paid,
        street_no: postBody.street_no,
        start_month: postBody.start_month,
        ampere: postBody.ampere,
        amount: postBody.amount,
        remarks: postBody.remarks,
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
                newdata: data
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
    record.updateDefaulterEntry = function(req,res){
            var postBody = req.params.id;
            model.findByIdAndUpdate(postBody,{
            $set : { 
                name: req.body.name,
                panel: req.body.panel,
                phone_no: req.body.phone_no,
                paid: req.body.paid,
                street_no: req.body.street_no,
                start_month: req.body.start_month,
                ampere: req.body.ampere,
                amount: req.body.amount,
                remarks: req.body.remarks,
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
        

module.exports = record;