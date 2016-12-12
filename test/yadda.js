var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./test/features').each(function(file) {

	featureFile(file, function(feature) {

		var cucumber = require('./steps/cucumber');
        var hello = require('./steps/hello');

		var yadda = Yadda.createInstance([cucumber, hello]);

		scenarios(feature.scenarios, function(scenario) {
			steps(scenario.steps, function(step, done) {
				yadda.run(step, done);
			});
		});
	});
});
