describe("Weather Finder", function() {
    describe("Weather Presenter", function() {
        var mockWeatherModel = null;
        var mockWeatherView = null;
        var weatherPresenter = null;

        beforeEach(function() {
            mockWeatherModel = new WeatherModel();
            mockWeatherView = new WeatherView();

            spyOn(mockWeatherView, "setPresenter");
            spyOn(mockWeatherView, "start");
            weatherPresenter = new WeatherPresenter(mockWeatherModel,
                    mockWeatherView);
            expect(mockWeatherView.setPresenter).toHaveBeenCalled();
            expect(mockWeatherView.start).toHaveBeenCalled();
        });

        it("Updates the view with the current weather", function() {
            spyOn(mockWeatherView, "getLocation").andReturn(
                    "Punta Hermosa, Peru");
            spyOn(mockWeatherModel, "getWeather").andCallFake(
                function(location, successCallback, errorCallback) {
                    successCallback({
                        weather: [{
                            main: "Amazing"
                        }]
                    });
                }
            );
            spyOn(mockWeatherView, "setWeatherReport");

            weatherPresenter.updateWeather();

            expect(mockWeatherView.setWeatherReport).toHaveBeenCalledWith("Amazing");
        });

        it("Clears the weather if no location is provided", function() {
            spyOn(mockWeatherView, "getLocation").andReturn("");
            spyOn(mockWeatherView, "setWeatherReport");

            weatherPresenter.updateWeather();

            expect(mockWeatherView.setWeatherReport).toHaveBeenCalledWith("");
        });

        it("Clears the weather if an error occurs", function() {
            spyOn(mockWeatherView, "getLocation").andReturn(
                    "Punta Hermosa, Peru");
            spyOn(mockWeatherModel, "getWeather").andCallFake(
                function(location, successCallback, errorCallback) {
                    errorCallback("Something", "bad", "happened");
                }
            );
            spyOn(mockWeatherView, "setWeatherReport");

            weatherPresenter.updateWeather();

            expect(mockWeatherView.setWeatherReport).toHaveBeenCalledWith("");
        });
    });
});
