// Sets up JSMockito
JsHamcrest.Integration.QUnit();
JsMockito.Integration.QUnit();

pavlov.specify("Weather Finder", function() {
    describe("Weather Presenter", function() {
        var mockWeatherView;
        var mockWeatherModel;
        var weatherPresenter;

        before(function() {
            mockWeatherView = mock(WeatherView);
            mockWeatherModel = mock(WeatherModel);
            weatherPresenter = new WeatherPresenter(mockWeatherView,
                    mockWeatherModel);
        });

        it("Updates the view with the current weather", function() {
            when(mockWeatherView).getLocation().thenReturn(
                    "Punta Hermosa, Peru");
            when(mockWeatherModel).getWeather("Punta Hermosa, Peru", func(),
                    func()).then(
                function(location, successCallback, errorCallback) {
                    successCallback({
                        weather : [ {
                            main : "Amazing"
                        } ]
                    });
                }
            );

            weatherPresenter.updateWeather();

            verify(mockWeatherView).setWeatherReport("Amazing");
            expect(0);
        });
    });
});