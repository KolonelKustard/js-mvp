var WeatherView = function() {
    var presenter = null;

    this.setPresenter = function(pres) {
        presenter = pres;
    };

    this.start = function() {
        $("#weatherForm").submit(function() {
            presenter.updateWeather();
            return false;
        });
    };

    this.getLocation = function() {
        return $("#location").val();
    };

    this.setWeatherReport = function(weather) {
        $("#weather").text(weather);
    };
};
