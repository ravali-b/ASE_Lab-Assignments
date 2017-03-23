(function () {
    "use strict";

    var $item = $('');


    var start = function () {

        var apikey = 'fcff12e9ce3b2504d329e67bc8dafb0861d1d812',

            outputMode = 'json',
            mixed = 'mixed',
            showSourceText = '1';


        $("input[type=submit]").on("click", function (evt) {

            var text = $('#userInput').val();
            var urlTarget = $('#urlInput').val();


            if ($('#userInput').val() !== "" && $('#urlInput').val() === "") {
                $("main .container").slideUp(400);

                console.log(text);

                var url = 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment?' + 'apikey=' + apikey + '&text=' + text + '&outputMode=' + outputMode + '&showSourceText=' + showSourceText;


                $.getJSON(url, function (sentimentResponse) {

                    var score = sentimentResponse.docSentiment.score;
                    var sentiment = sentimentResponse.docSentiment.type;
                    var mixed = sentimentResponse.docSentiment.mixed;
                    var inputText = sentimentResponse.text;

                    console.log(inputText);
                    console.log(score);
                    console.log(sentiment);
                    console.log(mixed);

                    if (score < -0.5) {
                        $('<p id="negResponse">Score: '+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                    } else if (score < 0) {

                        if (mixed == 1) {
                            $('<p id="slightNegResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        } else {
                            $('<p id="slightNegResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        }
                    } else if (sentiment == "neutral") {

                        if (mixed == 1) {
                            $('<p id="neutralResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        } else {
                            $('<p id="neutralResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        }
                    } else {

                        if (mixed == 1) {
                            $('<p id="posResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        } else {
                            $('<p id="posResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        }
                    }

                }); //end of getJSON Call

                refresh();


//=============+++++++++++ URL Sentiment +++++++++++++++++++++++========================//


            }  else if ($('#urlInput').val() !== "" && $('#userInput').val() === "") {
                $("main .container").slideUp(400);

                console.log(urlTarget);

                var url = 'http://access.alchemyapi.com/calls/url/URLGetTextSentiment?' + 'apikey=' + apikey + '&url=' + urlTarget + '&outputMode=' + outputMode + '&showSourceText=' + showSourceText;


                $.getJSON(url, function (sentimentResponse) {

                    var score = sentimentResponse.docSentiment.score;
                    var sentiment = sentimentResponse.docSentiment.type;
                    var mixed = sentimentResponse.docSentiment.mixed;
                    var textFromURL = sentimentResponse.text;

                    console.log(textFromURL);
                    console.log(score);
                    console.log(sentiment);
                    console.log(mixed);

                    if (score < -0.5) {
                        $('<p id="negResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                    } else if (score < 0) {

                        if (mixed == 1) {
                            $('<p id="slightNegResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        } else {
                            $('<p id="slightNegResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        }
                    } else if (sentiment == "neutral") {

                        if (mixed == 1) {
                            $('<p id="neutralResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        } else {
                            $('<p id="neutralResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        }
                    } else {

                        if (mixed == 1) {
                            $('<p id="posResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        } else {
                            $('<p id="posResponse">Score:'+score+' Sentiment:'+sentiment+'</p>').appendTo("main .response");
                        }
                    }

                }); //end of getJSON Call

                refresh();

//=============+++++++++++ error message +++++++++++++++++++++++========================//


            } else {
                console.log('error');
                alert('You forgot to paste in either text or a url for evaluation or maybe you pasted into both. Please try again.');
            };

        }); //button ending

    }; //end of Start function

//=============+++++++++++ refresh function +++++++++++++++++++++++========================//

    var refresh = function () {
        //$('#userInput').val("");
        //$('#urlInput').val("");

        //var $refreshButton = $('<input type="submit" id="refreshButton" value="Do it Again!">');
        //$refreshButton.insertAfter("main .response")

        $refreshButton.on("click", function (evt) {

            $("#negResponse").hide();
            $("#slightNegResponse").hide();
            $("#neutralResponse").hide();
            $("#posResponse").hide();

            $refreshButton.hide();

            $("main .container").slideDown("slow", function () {
                location.reload(true);
            });
        });

    };


    var main = function () {
        start();

    };

    $(document).ready(main);

}());

function speakText()
{
    responsiveVoice.speak("You just said, "+final_transcript);
}
