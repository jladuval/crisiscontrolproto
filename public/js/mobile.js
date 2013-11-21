var distaceFromHospital = 0;

App = Ember.Application.create();

App.Router.map(function() {
    this.route("canyouhelp");
    this.route("canthelp");
    this.route("canhelp");
    this.route("waitoninstructions");
    this.route("getjob");
    this.route("onmyway");
    this.route("youareneeded")
});

App.ApplicationRoute = Ember.Route.extend({
    events: {
        goToCantHelp: function(){
            this.transitionToAnimated('canthelp',  {main: 'slideLeft'}); 
        },
        goToCanYouHelp: function(){
            this.transitionToAnimated('canyouhelp',  {main: 'slideLeft'}); 
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
App.CanyouhelpView = Ember.View.extend();
App.CanthelpView = Ember.View.extend();
App.CanthelpController = Ember.Controller.extend({
    actions: {
        next: function(){
            this.transitionToRouteAnimated('canhelp',  {main: 'slideLeft'});
        }
    }
});
App.CanhelpView = Ember.View.extend({
    didInsertElement:  function(){
        var _this = this;
        $( "#distanceSlider" ).slider({
          range: "max",
          min: 0,
          max: 365,
          slide: function( event, ui ) {
            _this.get('controller').send('setDistance', ui.value);
            _this.set('distanceText', getDistance(ui.value, "I'm here now", "away", "") );
          }
        });
    },
    distanceText: "I'm here now",
});

App.IndexController = Ember.Controller.extend({
   init: function(){
       var _this = this;
        this._super();
        setTimeout(function(){
               _this.transitionToRouteAnimated('canyouhelp', {main: 'slideLeft'});
            },5000);
    }
});

App.CanhelpController = Ember.Controller.extend({
    distance : 0,
    setDistance: function(val){
        this.set('distance', val);
    },
    actions: {
        next: function(){
            var _this = this;
            distanceFromHospital = _this.get('distance');
            if(distanceFromHospital > 0)
                _this.transitionToRouteAnimated('waitoninstructions',  {main: 'slideLeft'});
            else{
                _this.transitionToRouteAnimated('getjob',  {main: 'slideLeft'});
            }
        }
    }
});

App.GetjobController = Ember.Controller.extend({
    init: function(){
        this._super();
        setTimeout(function(){
               window.location = "/inhospital";
            },3000);
    }
});

App.WaitoninstructionsController = Ember.Controller.extend({
    init: function(){
        this._super();
        var _this = this;
        setTimeout(function(){
            _this.transitionToRouteAnimated('youareneeded', {main: 'slideLeft'});
        },2000);
    }
});

App.YouareneededController = Ember.Controller.extend({
    actions:{
        next: function(){
            this.transitionToRouteAnimated('onmyway', {main: 'slideLeft'});
        }
    }
});

App.OnmywayView = Ember.View.extend({
    didInsertElement:  function(){
        var _this = this;
        $("#distanceSlider").slider({
          range: "max",
          min: 0,
          max: 365,
          slide: function( event, ui ) {
            _this.set('distance', ui.value);
            _this.set('distanceText', getDistance(ui.value, "I Am Not Delayed", "", "I Have Been Delayed By ") );
          }
        });
    },
    distanceText: "I Am Not Delayed",
    delayed: function(){
        this.get('controller').send('setDistance', this.get('distance'));
         $("#sliderwrapper").toggle('fast');
         this.set('sliderToggleText', "I Have Been Delayed");
    },
    toggleDelayed: function(){
         $("#sliderwrapper").toggle('fast');
         if($('#sliderwrapper').is(":visible")){
            this.set('sliderToggleText', "I Am No Longer Delayed");
         }else{
            this.set('sliderToggleText', "I Have Been Delayed");
         }
    },
    sliderToggleText: "I Have Been Delayed",
    distance: 0
});

App.OnmywayController = Ember.Controller.extend({
    distance: 0,
    init: function(){
        var _this = this;
        this._super();
        this.distance = distanceFromHospital;
        setInterval(function(){
            if(_this.get('distance') > 0){
                _this.set('distance', _this.get('distance') - 1);
            }
        },1000);
    },
    setDistance: function(newDistance){
        this.set('distance', this.get('distance') + newDistance);
    },
    actions:{
        next: function(){
            this.transitionToRouteAnimated('getjob', {main: 'slideLeft'});
        }
    }
})

var getDistance = function(sliderValue, minText, postText, preText){
    if(sliderValue < 1)
        return minText;
    if(sliderValue < 60)
        return preText + sliderValue + " Minutes " + postText;
    var hours = Math.round((sliderValue/60) * 10)/10;
    if(hours > 6)
        return preText +"More Than 6 Hours " + postText;
    return preText +hours + " Hours " + postText;
};