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
           available: 4, 
           total: 20
       },
       {
           name: "Ambulatory", 
           available: 2, 
           total: 5
       },
       {
           name: "Work Up", 
           available: 9, 
           total: 15
       },
       {
           name: "ICU", 
           available: 11, 
           total: 18
       }
   ],
   theatres: [
       {
           name: "Christchurch Hospital", 
           available: 6, 
           total: 11
       },
       {
           name: "Christchurch Womens Hospital", 
           available: 0, 
           total: 5
       },
        {
           name: "Burwood Hospital", 
           available: 2, 
           total: 4
       }
   ],
   patientNumbers: [
       {
           name: "Red", 
           number: 62
       },
       {
           name: "Yellow", 
           number: 95
       },
       {
           name: "Green", 
           number: 184
       }
       
   ],
});

App.IndexView = Ember.View.extend();
    
App.ApplicationView = Ember.View.extend({
    classNames: ['application']
});