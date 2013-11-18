var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var nodemailer = require("nodemailer");

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Crisis Control';
  this.render();
};

PagesController.inhospital = function() {
  this.title = 'Crisis Control';
  this.render();
};

PagesController.feedback = function() {
  this.title = 'Crisis Control';
  this.render();
};

PagesController.saveFeedback = function(){
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "SendGrid",
        auth: {
            user: "azure_1b219be9150eadf93fa15c687b53c8f8@azure.com",
            pass: "pojl3o1r"
        }
    });
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: this.params("email"), // sender address
        to: "contact@ironwing.co.nz", // list of receivers
        subject: "Feedback", // Subject line
        text: this.params("feedback"), // plaintext body
    };
    
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
    this.res.redirect('/');
};

module.exports = PagesController;
