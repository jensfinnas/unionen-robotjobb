(function() {
	var $results = $('#results');
	var $probability = $results.find('#probability .value');
	var $histogramSentence = $('#histogram-sentence');
	app.drawResults = function(d) {
		$results.removeClass('hidden');
		$probability.text(app.utils.formatPercent(d.probability));

		// Update prob chart
		app.chart.update(d.probability);
		
		// Update histogram
		app.histogramAll.addReference(d.probability, d.name);

		// Update histogram sentence
		$histogramSentence.html(getHistogramSentence(d.probability));
	};

	// Get the number of jobs that are riskier
	function getHistogramSentence(percent) {
		// Count the number of jobs with higher risk
		var riskier = app.data.filter(function(d) {
			return d.probability > percent;
		}).length;
		var total = app.data.length;

		return riskier + ' av ' + total + ' jobb är mer utsatta.';
	}
})() 