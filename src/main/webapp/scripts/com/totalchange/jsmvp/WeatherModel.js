/**
 * The Model part of Model View Presenter, this class simply hands over to
 * jQuery to make an AJAX request to the live weather service.
 */
var WeatherModel = function() {
    this.getWeather = function(location, successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                q: location
            },

            // This has to be JSONP as it crosses domains
            dataType: "jsonp",

            // Just pass the successful response on back to the caller
            success: function(response) {
                successCallback(response);
            },

            // As we're using JSONP we'll actually never find out about errors
            error: function(what, happened, here) {
                if (window.console && console.log) {
                    console.log(what, happened, here);
                }
                errorCallback(what, happened, here);
            }
        });
    }
};
