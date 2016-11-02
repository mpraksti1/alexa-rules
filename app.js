let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    alexaVerifier = require('alexa-verifier'); 

var rules = [{
        number: 1,
        rule: "This is rule number 1"
    },{
        number: 2,
        rule: "This is rule number 2"
    },{
        number: 3,
        rule: "This is rule number 3"
    }
}]

function requestVerifier(req, res, next) {
    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
                res.status(401).json({ message: 'Verification Failure', error: err });
            } else {
                next();
            }
        }
    );
}

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));

app.post('/rules', requestVerifier, function(req, res) {
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
           req.body.request.intent.name === 'rules') {

    if (!req.body.request.intent.slots.AMAZON.NUMBER ||
        !req.body.request.intent.slots.AMAZON.NUMBER.value) {
      // Handle this error by producing a response like:
      // "Hmm, what day do you want to know the forecast for?"
    }

    let currRule = rules[req.body.request.intent.slots.AMAZON.NUMBER].rule;

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
app.listen(3000);