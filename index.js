var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 5000));

var rules = [{
    number: 1,
    rule: "This is rule number 1"
},{
    number: 2,
    rule: "This is rule number 2"
},{
    number: 3,
    rule: "This is rule number 3"
}];

app.post('/rules', function(req, res) {
    if (req.body.request.type === 'LaunchRequest') {
        res.json({
            "version": "1.0",
            "response": {
                "shouldEndSession": true,
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": "<speak>You insignifigant pleb, do not test my patience. <break time=\"1s\"/> What do you want to wish to divine from me?</speak>"
                }
            }
        });
    } else if (req.body.request.type === 'IntentRequest' &&
             req.body.request.intent.name === 'Rule') {

        if (!req.body.request.intent.slots.AMAZON.NUMBER ||
            !req.body.request.intent.slots.AMAZON.NUMBER.value) {
        }

        var currRule = rules[req.body.request.intent.slots.AMAZON.NUMBER].rule;

        res.json({
            "version": "1.0",
            "response": {
                "shouldEndSession": true,
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": "<speak>currRule</speak>"
                }
            }
        });
    }
});
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});