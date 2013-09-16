// Sets up JSMockito
JsHamcrest.Integration.QUnit();
JsMockito.Integration.QUnit();

pavlov.specify("Weather Finder", function() {
    describe("Weather Presenter", function() {
        var locationInput;
        var submitButton;
        var weatherDiv;

        var mockWeatherPresenter;
        var weatherView;

        before(function() {
            var ui = $("#ui");

            var form = $("<form id='weatherForm' />").appendTo(ui);
            locationInput = $("<input id='location' name='location' type='text' />").appendTo(form);
            submitButton = $("<input id='submit' name='submit' type='submit' />").appendTo(form);
            weatherDiv = $("<div id='weather' />").appendTo(ui);

            mockWeatherPresenter = mock(WeatherPresenter);
            weatherView = new WeatherView();
            weatherView.setPresenter(mockWeatherPresenter);
            weatherView.start();
        });

        after(function() {
            $("#ui").empty();
        });

        it("Returns the text entered into the location field", function() {
            locationInput.val("Kuala Lumpa, Malaysia");
            assert(weatherView.getLocation()).equals("Kuala Lumpa, Malaysia");
        });

        it("Displays the weather text in the UI", function() {
            weatherView.setWeatherReport("Scorchio");
            assert(weatherDiv.text()).equals("Scorchio");
        });

        it("Tells the presenter when the form is submitted", function() {
            submitButton.click();
            verify(mockWeatherPresenter).updateWeather();
            expect(0);
        });
    });
});
