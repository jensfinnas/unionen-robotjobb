(function() {
	var $results = $('#results');
	var $probability = $results.find('#probability .value');
	var $comparisonSentence = $('#comparison-sentence');
	app.drawResults = function(d) {
		$results.removeClass('hidden');
		$probability.text(app.utils.formatPercent(d.probability));

		// Update prob chart
		//app.chart.update(d.probability);

		// Update gauge chart
		app.gauge.update(d.probability);

		
		// Update histogram
		//app.histogramAll.addReference(d.probability, d.name);

		// Update histogram sentence
		$comparisonSentence.html(getComparisonSentance(d.probability));

		// Draw lists
		app.drawLists(d);
	};

	// Get the number of jobs that are riskier
	function getComparisonSentance(percent) {
		// Count the number of jobs with higher risk
		var higherRisk = app.data.filter(function(d) {
			return d.probability >= percent;
		}).length;
		var total = app.data.length;
		var lowerRisk = total - higherRisk;
		var higherRiskShare = higherRisk / total;

		if (percent > .9) {
			return "Det här yrket tillhör de mest hotade. " + lowerRisk + ' av ' + total + ' yrken har bättre framtidsutsikter.';
		}
		else if (percent >= .5) {
			return "Det här yrket går en osäker framtid till mötes. " + lowerRisk + ' av ' + total + ' yrken bedöms ha större chans att överleva digitaliseringen.';
		}
		else if (percent > .2) {
			return "Det här yrket har en bättre framtid än de flesta andra. " + higherRisk + ' av ' + total + ' yrken är mer riskutsatta.';
		}
		else {
			return "Det här yrket kommer med stor sannolikhet behövas också i framtiden. Det har bättre framtidsutsikter än " + higherRisk + ' av ' + total + ' yrken.';
		}

	}
})() 