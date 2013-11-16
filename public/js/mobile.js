App = Ember.Application.create();


App.Router.reopen({
    location: 'history'
});
App.Router.map(function() {
    this.route("needhelp");
    this.route("canhelp");
    this.route("dontneedhelp");
    this.route("canthelp");
});
App.ApplicationRoute = Ember.Route.extend({
    events: {
        goToNeedHelp: function(){
            this.transitionToAnimated('needhelp',  {main: 'slideLeft'}); 
        },
        goToCantHelp: function(){
            this.transitionToAnimated('canthelp',  {main: 'slideLeft'}); 
        },
        goToDontNeedHelp: function(){
            this.transitionToAnimated('dontneedhelp',  {main: 'slideLeft'}); 
        },
        goToCanHelp: function(){
            this.transitionToAnimated('canhelp',  {main: 'slideLeft'}); 
        },
        goBack: function() {
            Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});
            window.history.go(-1);
        }
    }
});


App.ApplicationView = Ember.View.extend({
    classNames: ['application']
});

App.CanhelpView = Ember.View.extend();
App.NeedhelpView = Ember.View.extend();
App.DontneedhelpView = Ember.View.extend();
App.CanthelpView = Ember.View.extend();
