var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var record = {
    title: 'Application',
    statusCode: 200
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://eleven4generator:eleven4generator@ds213239.mlab.com:13239/eleven4generator', { useMongoClient: true });


var sendAmountSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    sendAmount: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { collection: 'sendAmount' });

var model = mongoose.model("sendAmount", sendAmountSchema);

// for bank
record.saveData = function (req, res) {
    var mydate = new Date();
    var  mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var postBody = req.body;
    var data = {
        from: postBody.from,
        to : postBody.to ,
        sendAmount: postBody.sendAmount,
        month : mlist[mydate.getMonth()],
        date:mydate
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
   
    record.updateSend= function(req,res){
            var postBody = req.params.id;
            model.findByIdAndUpdate(postBody,{
            $set : { 
                    sendAmount: req.body.sendAmount
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