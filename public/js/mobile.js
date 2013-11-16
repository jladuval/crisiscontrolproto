App = Ember.Application.create();


App.Router.reopen({
    location: 'history'
});

App.Router.map(function() {
    this.route("needhelp");
    this.route("dontneedhelp");
    this.route("canthelp");
    this.route("foo", { path: "/foo2" });
    this.route("canhelp");
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
    
App.NeedhelpView = Ember.View.extend();
App.DontneedhelpView = Ember.View.extend();
App.CanthelpView = Ember.View.extend();
App.CanhelpView = Ember.View.extend({
    didInsertElement:  function(){
        var _this = this;
        $( "#distanceSlider" ).slider({
          range: "max",
          min: 0,
          max: 365,
          slide: function( event, ui ) {
            _this.set('distance', ui.value);
            _this.set('distanceText', _this.getDistance(ui.value) );
          }
        });
    },
    distance: 0,
    distanceText: "I'm here now",
    getDistance : function(sliderValue){
        if(sliderValue < 1)
            return "I'm here now";
        if(sliderValue < 60)
            return sliderValue + " minutes away";
        var hours = Math.round((sliderValue/60) * 10)/10;
        if(hours > 6)
            return "More than 6 hours away";
        return hours + " hours away";
    }
});

App.CanhelpController = Ember.Controller.extend({
    distance : 0
    
})