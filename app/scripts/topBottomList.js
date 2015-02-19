(function() {
	var $low = $('#low');
	var $high = $('#high');
	var $similar = $('#similar');

	var numberOfListItems = 10;

	app.lowRiskJobs = function() {
		var randomSubset = _.sortBy(app.data, function(d) { 
			return d.probability; 
		})
		.slice(0,200)
		.getRandom(numberOfListItems);

		return _.sortBy(randomSubset, function(d) { 
			return d.probability; 
		});
	}
	app.highRiskJobs = function() {
		var randomSubset = _.sortBy(app.data, function(d) { 
			return -d.probability; 
		})
		.slice(0,200)
		.getRandom(numberOfListItems);

		return _.sortBy(randomSubset, function(d) { 
			return -d.probability; 
		});
	}
	function similarRiskJobs(d) {
		var arr = [];
		var index = $.inArray(d, app.data);
		for (var i = index + 1; i <= index + numberOfListItems / 2 && i < app.data.length; i++) {
			arr.push(app.data[i]);
		}
		for (var i = index - 1; i >= index - numberOfListItems / 2 && i >= 0; i--) {
			arr.push(app.data[i]);
		}
		return arr;
	}
	app.updateList = function($el, arr) {
		$el.html('');
		arr.forEach(function(d) {
			var $tr = $('<tr/>');
			$tr.append($('<td/>').text(d.name));
			$tr.append($('<td/>').text(app.utils.formatPercent(d.probability)));
			$el.append($tr);
		});
	}

	app.drawLists = function(selected) {
		app.updateList($low, app.lowRiskJobs());
		app.updateList($high, app.highRiskJobs());
		app.updateList($similar, similarRiskJobs(selected));
	}
})();