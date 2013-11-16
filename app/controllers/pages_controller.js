var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Crisis Control';
  this.render();
};

PagesController.foo = function() {
  this.title = 'Crisis Control';
  this.render();
};

module.exports = PagesController;
