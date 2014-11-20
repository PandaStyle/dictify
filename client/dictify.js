
if (Meteor.isClient) {

    Words = new Mongo.Collection("words");
    Tracker.autorun(function () {
        Meteor.subscribe("allwords");
    });



  // counter starts at 0
  Session.setDefault("counter", 0);



  Template.home.helpers({
    counter: function () {
      return Session.get("counter");
    },
    words: function(){
        return Words.find();
    }
  });

  Template.word.helpers({
    translation: function(){
        var translation = TransOver.deserialize(this.translation);

        if (!translation) {
            console.log('skipping empty translation');
            return 'Empty translation'
        }

        var formatted = TransOver.formatTranslation(translation)

        return formatted;
    }
  })


    Router.route('/', function () {
        this.render('home');
    });
}



