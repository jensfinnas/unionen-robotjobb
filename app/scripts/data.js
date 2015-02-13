(function() {
	app.init = function() {
		d3.tsv(app.dataPath, function(d) {
			return {
				id: d.id,
				name: d.title,
				rank: +d.rank,
				probability: +(d.probability.replace(',', '.'))
			};
		}, function(error, rows) {
			app.data = rows;
			$(app).trigger('app:dataReady');
		});
	}	
})();

