var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./test/features').each(function(file) {

	featureFile(file, function(feature) {

		var cucumber = require('./steps/cucumber');

		var yadda = Yadda.createInstance([cucumber]);

		scenarios(feature.scenarios, function(scenario) {
			steps(scenario.steps, function(step, done) {
				yadda.run(step, done);
			});
		});
	});
});