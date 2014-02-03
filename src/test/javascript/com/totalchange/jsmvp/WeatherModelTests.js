describe("Weather Finder", function() {
    describe("Weather Model", function() {
        beforeEach(function() {
            $.mockjaxClear();
        });

        it("Makes an AJAX request to the weather service to find it's raining "
                + "in Aberystwyth", function() {
            var successResponse = null;
            var failResponse = null;

            runs(function() {
                $.mockjax({
                    url: "http://api.openweathermap.org/data/2.5/weather",
                    data: {
                        q: "Aberystwyth, Wales"
                    },
                    responseTime: 0,
                    status: 500,
                    responseText: {
                        "weather": [{
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }],
                        "main":{
                            "temp":285.382
                        },
                        "name": "Aberystwyth"
                    }
                });

                var weatherModel = new WeatherModel();
                weatherModel.getWeather(
                    "Aberystwyth, Wales",
                    function(response) {
                        successResponse = response;
                    },
                    function(what, happened, here) {
                        failResponse = {
                            what: what,
                            happened: happened,
                            here: here
                        };
                    }
                );
            });

            waitsFor(function() {
                return successResponse != null || failResponse != null;
            }, "Expecting a response from the AJAX request", 1000);

            runs(function() {
                expect(failResponse).toBe(null);
                expect(successResponse.weather[0].main).toBe("Rain");
            });
        });
    });
});
