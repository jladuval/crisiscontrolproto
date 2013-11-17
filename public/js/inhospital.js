App = Ember.Application.create();

App.Router.map(function() {
    this.route("taskcard");
    this.route("updates");
});

App.ApplicationRoute = Ember.Route.extend({
    events: {
        goToTeam: function(){
            this.transitionToAnimated('index',  {main: 'slideLeft'}); 
        },
        goToUpdates: function(){
            this.transitionToAnimated('updates',  {main: 'slideLeft'}); 
        },
        goToTaskCard: function(){
            this.transitionToAnimated('taskcard',  {main: 'slideLeft'}); 
        },
        goBack: function() {
            Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});
            window.history.go(-1);
        }
    }
});

App.UpdatesController = Ember.Controller.extend({
   beds: [
       {
           name: "Resus", 
           available: 63, 
           total: 203
       },
       {
           name: "Ambulatory", 
           available: 23, 
           total: 44
       },
       {
           name: "Work Up", 
           available: 54, 
           total: 374
       },
       {
           name: "ICU", 
           available: 12, 
           total: 46
       }
   ],
   theatres: [
       {
           name: "Christchurch Hospital", 
           available: 3, 
           total: 6
       },
       {
           name: "Christchurch Womens Hospital", 
           available: 1, 
           total: 4
       }
   ],
   patientNumbers: [
       {
           name: "Red", 
           number: 32
       },
       {
           name: "Yellow", 
           number: 56
       },
       {
           name: "Green", 
           number: 245
       }
       
   ],
});

App.IndexView = Ember.View.extend();
    
App.ApplicationView = Ember.View.extend({
    classNames: ['application']
});