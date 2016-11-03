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
        res.json({
            "version": "1.0",
            "response": {
                "shouldEndSession": true,
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": "<speak>HI</speak>"
                }
            }
        });
    }
});
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});