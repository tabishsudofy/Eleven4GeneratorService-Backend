var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var record = {
    title: 'Application',
    statusCode: 200
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://eleven4generator:eleven4generator@ds213239.mlab.com:13239/eleven4generator', { useMongoClient: true });


var customerFeeEntrySchema = new Schema({
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
    month: {
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
    ampere: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    // status: {
    //     type: String,
    //     required: true
    // }
}, { collection: 'customerFeeEntry' });

var model = mongoose.model("customerFeeEntry", customerFeeEntrySchema);

// for seat reservation
record.saveData = function (req, res) {

    var postBody = req.body;
    var mydate = new Date();
    var mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var data = {
        name: postBody.name,
        panel: postBody.panel,
        phone_no: postBody.phone_no,
        month: mlist[mydate.getMonth()],
        paid: postBody.paid,
        street_no: postBody.street_no,
        ampere: postBody.ampere,
        amount: postBody.amount,
        balance: postBody.balance,
        // status: postBody.status
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
record.getCustomerData = function (req, res) {
    model.find({}, { balance: 0, paid: 0, month: 0 }, function (err, newdata) {
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
record.updateCustomerFee = function(req,res){
        var postBody = req.params.id;
        model.findByIdAndUpdate(postBody,{
        $set : { 
            name: req.body.name,
            panel: req.body.panel,
            phone_no: req.body.phone_no,
            month: req.body.month,
            paid: req.body.paid,
            street_no: req.body.street_no,
            ampere: req.body.ampere,
            amount: req.body.amount,
            balance: req.body.balance,
            // status: req.body.status
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

//         //cancel Seat
//         record.deleteData = function(req,res){
//             var postBody = req.params.ticket_number;  
//             console.log(postBody);          
//             model.findOneAndRemove({ticket_number:postBody},function(err){
//                     if (err){
//                         res.send({
//                             statusCode : 505,
//                             message : "Some thing went wrong"
//                            })
//                         }
//                       else{
//                         res.send({
//                           statusCode : 200,
//                            message : "Data has been deleted",
//                         })
//                     }

//                 })
//             }

//           //get data on the basis of name or cnic
//   record.getDataBy = function(req,res){
//     var postBody = req.body;
//     model.find({$and: [{time :'7 am'},{date : '12/1/2018' }] },function(err,newdata){
//             if (err){
//                 res.send({
//                     statusCode : 505,
//                     message : "Some thing went wrong"
//                    });
//                 }
//               else{
//                 res.send({
//                   statusCode : 200,
//                    message : "Data has been displayed",
//                    data:newdata 
//                 })
//             }

//         });
//     }

module.exports = record;