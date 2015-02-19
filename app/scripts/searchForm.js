(function() {
	var $search = $('#job');
	var $examples = $('.search .examples');
	app.clearSearch = function() {
		$search.val('').focus();
	}

	app.setSearch = function(d) {
		$search.val(d.name);
		app.drawResults(d);
	}

	app.drawSearchExamples = function() {
		var n = 10;
		$examples.append('Du kan till exempel söka efter ')

		var jobs = app.data
			.getRandom(n)
			.map(function(d) { 
				return $('<a/>')
				.attr('href', '#')
				.click(function() {
					app.setSearch(d);
				})
				//.attr('onclick', '$("#job").val("' + d.name + '")')
				.text(d.name.split(',')[0].toLowerCase()); 
			});
		jobs.forEach(function($el, i) {
			var delimiter = ', ';
			if (i == jobs.length - 1) {
				delimiter = '.';
			}
			else if (i == jobs.length - 2) {
				delimiter = ' eller ';
			}
			$examples
				.append($el)
				.append(delimiter);
		})
		/*var exampleString = jobs.slice(0, n - 1).join(', ');
		exampleString += ' eller ' + jobs[jobs.length - 1];
		$examples.html(exampleString);*/
	}
})();