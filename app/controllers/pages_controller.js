var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

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
    var email = this.params("email");
    var feedback = this.params("feedback");
    this.res.redirect('/' + email + feedback);
};

module.exports = PagesController;
