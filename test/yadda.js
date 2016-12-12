var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./test/features').each(function(file) {

    featureFile(file, function(feature) {

        var cucumber = require('./steps/cucumber');
        var hello = require('./steps/hello');
        var voting = require('./steps/voting');

        var yadda = Yadda.createInstance([cucumber, hello, voting]);

        scenarios(feature.scenarios, function(scenario) {
            var ctx = {};
            steps(scenario.steps, function(step, done) {
                yadda.run(step, { ctx: ctx }, done);
            });
        });
    });
});
