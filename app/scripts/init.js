$(app).on('app:dataReady', function (ev) {
	app.initTypeahead();
	app.drawSearchExamples();

	/*app.chart = new ProbChart(
		'#chart-main',
		function() { return "A long sentance"; }
	)*/

	app.gauge = new Gauge('#gauge');

	//app.histogramAll = new Histogram('#histogram-all',app.data)

});


