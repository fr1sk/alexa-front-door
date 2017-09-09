
var request = require("request");
var speechOutput;

exports.handler = function(event, context) {
    onLaunch(context ,event.request, event.session, function callback(sessionAttributes, speechletResponse) {
                context.succeed(buildResponse("",  buildSpeechletResponseWithoutCard("I unlocked it for you!", "", true)));
            });
    console.log("handler")
    console.log("con: "+context)
};

function onLaunch(context, launchRequest, session, callback) {
    getWelcomeResponse(context)
}

function onSessionEnded(sessionEndedRequest, session) {}

function getWelcomeResponse(context) {
    speechOutput="I unlocked it for you!";
    var reprompt = ""
    var shouldEndSession = true

    var sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": reprompt
    }
    var urlNew = 'http://vrata.tk'
    const prom=new Promise((resolve,reject)=>{
        request.post({
                  headers: {'content-type' : 'application/x-www-form-urlencoded'},
                  url:     urlNew,
                  body:    "UNLOCK2=on"
                }, function(error,response,body){
                    if (!error && response.statusCode === 200) {
                            speechOutput = "I unlocked it for you!"
                            context.succeed(buildResponse("",  buildSpeechletResponseWithoutCard("I unlocked it for you!", "", true)));
                        } else {
                            speechOutput = "Sorry, I cant do it right now."
                            context.succeed(buildResponse("",  buildSpeechletResponseWithoutCard("ARRRRR!", "", true)));
                        }
                    });
                });
    prom.then(function(res){
        console.log("promise then");
        context.succeed(buildResponse("",  buildSpeechletResponseWithoutCard("I unlocked it for you!", "", true)));

    });
}

// ------- Helper functions to build responses for Alexa -------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}



function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {version: "1.0", sessionAttributes: sessionAttributes, response: speechletResponse};
}
