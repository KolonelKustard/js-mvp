describe("Weather Finder", function() {
    describe("Weather View", function() {
        var uiDiv = null;
        var locationInput = null;
        var submitButton = null;
        var weatherDiv = null;

        var mockWeatherPresenter = null;
        var weatherView = null;

        beforeEach(function() {
            uiDiv = $("<div />").appendTo("body");

            var form = $("<form id='weatherForm' />").appendTo(uiDiv);
            locationInput = $("<input id='location' name='location' "
                    + "type='text' />").appendTo(form);
            submitButton = $("<input id='submit' name='submit' "
                    + "type='submit' />").appendTo(form);
            weatherDiv = $("<div id='weather' />").appendTo(uiDiv);

            mockWeatherPresenter = jasmine.createSpyObj("mockWeatherPresenter", ["updateWeather"]);
            weatherView = new WeatherView();
            weatherView.setPresenter(mockWeatherPresenter);
            weatherView.start();
        });

        afterEach(function() {
            uiDiv.remove();
        });

        it("Returns the text entered into the location field", function() {
            locationInput.val("Kuala Lumpa, Malaysia");
            expect(weatherView.getLocation()).toBe("Kuala Lumpa, Malaysia");
        });

        it("Tells the presenter when the form is submitted", function() {
            submitButton.click();
            expect(mockWeatherPresenter.updateWeather).toHaveBeenCalled();
        });

        it("Displays the weather text in the UI", function() {
            weatherView.setWeatherReport("Scorchio");
            expect(weatherDiv.text()).toBe("Scorchio");
        });
    });
});
