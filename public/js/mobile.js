var CCMobile = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_STACKTRACE_ON_DEPRECATION: true,
    LOG_VERSION: true,
    debugMode: true
});

CCMobile.Router.map(function () { 
    this.resource("help");
    this.resource("canyouhelp");
    this.resource("canthelp");
    this.resource("canhelp");
});

CCMobile.HelpView = Ember.View.extend();

CCMobile.Question = Ember.Object.extend({
    number: 0,
    maxTime: 0,
    questionText: "",
});

var Questions = Ember.A([
        CCMobile.Question.create({
            number: 1,
            questionText: "How old are you1?"
        }),
         CCMobile.Question.create({
            number: 2,
            questionText: "How old are you2?"
        }), 
        CCMobile.Question.create({
            number: 3,
            questionText: "How old are you3?"
        })]);

CCMobile.QuestionController = Ember.Controller.extend({
    questions: Questions,
    currentQuestionNo : 0,
    currentQuestion: Questions[0],
    actions: {
        next: function() {
            this.set("currentQuestionNo", this.currentQuestionNo + 1);
            this.set("currentQuestion", this.questions[this.currentQuestionNo]);
        }
    }
});