var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./test/features').each(function (file) {

    featureFile(file, function (feature) {

        var bot = require('./steps/bot')
        var hello = require('./steps/hello');
        var help = require('./steps/help');
        var voting = require('./steps/voting');

        var yadda = Yadda.createInstance([bot, hello, help, voting]);

        scenarios(feature.scenarios, function (scenario) {
            var ctx = {};
            steps(scenario.steps, function (step, done) {
                yadda.run(step, { ctx: ctx }, done);
            });
        });
    });
});
