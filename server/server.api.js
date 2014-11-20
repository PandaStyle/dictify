Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: false
}));


/* --- Without parameter --- */
Router.route('/restful', {where: 'server'})
    .get(function () {
        writeToConsole(this);
        setHeader(this);

        this.response.end(JSON.stringify(
            Words.find().fetch()
        ));
    })
    .post(function () {
        writeToConsole(this);
        setHeader(this);

        this.response.end(JSON.stringify(
            Words.insert(deserialize(this.request.body))
        ));
    });


/* --- With parameter --- */
Router.route('/restful/:id', {where: 'server'})
    .get(function () {
        writeToConsole(this);
        setHeader(this);

        console.log("id: " + this.params.id);
        this.response.end(JSON.stringify(
            Words.findOne({_id: this.params.id })
        ));
    })
    .put(function () {
        writeToConsole(this);
        setHeader(this);

        this.response.end(JSON.stringify(
            Words.update({_id: this.params.id },{$set:{
                word: this.request.body.word
            }})
        ));
        this.response.end("UPDATE Response");
    })
    .delete(function(){
        writeToConsole(this);
        setHeader(this);

        this.response.end(JSON.stringify(
            Words.remove({_id: this.params.id })
        ));
    })


function writeToConsole(obj){
    console.log('################################################');
    console.log(obj.request.method);
    console.log(obj.request.headers);
    if(this.params && this.params.id){
        console.log('this.params.id: ' + this.params.id);
    }

    console.log('------------------------------');
    console.log(obj.request.body);
    console.log('------------------------------');

}

function setHeader(obj){
    obj.response.statusCode = 200;
    obj.response.setHeader("Content-Type", "application/json");
    obj.response.setHeader("Access-Control-Allow-Origin", "*");
    obj.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

function deserialize (text) {
    var res;

    try {
        res = JSON.parse(text);
    }
    catch (e) {
        // that means text is string as opposed to serialized object
        if (e.toString().match(/SyntaxError: Unexpected token/)) {
            res = text;
        }
        else {
            throw e;
        }
    }
    return res;
};
