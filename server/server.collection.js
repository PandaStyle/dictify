Words = new Meteor.Collection("words");

Meteor.publish("allwords", function () {
    return Words.find({});
});

Words.allow({
    insert: function(){
        return true;
    },
    update: function () {
        return true;
    },
    remove: function(){
        return true;
    }
});