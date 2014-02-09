var WeatherPresenter = function(weatherModel, weatherView) {
    var self = this;

    /**
     * Constructor.
     */
    var init = function() {
        // Tell the view about this presenter so it can notify us of events and
        // then tell it to get started.
        if (weatherView != null) {
            weatherView.setPresenter(self);
            weatherView.start();
        }
    };

    var processWeatherResponse = function(response) {
        if (response.weather.length > 0) {
            weatherView.setWeatherReport(response.weather[0].main);
        } else {
            weatherView.setWeatherReport("");
        }
    };

    this.updateWeather = function() {
        var location = weatherView.getLocation();
        if (location == null || location == "") {
            weatherView.setWeatherReport("");
            return;
        }

        weatherModel.getWeather(location, processWeatherResponse, function(
                what, happened, here) {
            weatherView.setWeatherReport("");
        });
    };

    // Call constructor
    init();
};
