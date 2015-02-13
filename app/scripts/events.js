$(app).on('app:dataReady', function (ev) {
	app.initTypeahead();
	app.chart = new ProbChart(
		'#chart-main',
		function() { return "A long sentance"; }
	)

	app.histogramAll = new Histogram('#histogram-all',app.data)
});


