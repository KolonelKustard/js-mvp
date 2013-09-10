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
            dataType: "jsonp",
            success: function(response) {
                successCallback(response);
            },

            // As we're using JSONP we'll never find out about errors
            error: function(what, happened, here) {
                if (window.console && console.log) {
                    console.log(what, happened, here);
                }
                errorCallback(what, happened, here);
            }
        });
    }
};
