(function() {
	var matcher = function(arr, key) {
	  return function findMatches(q, cb) {
	    var matches, substrRegex;
	 
	    // an array that will be populated with substring matches
	    matches = [];
	 
	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');
	 
	    var matches = arr.filter(function(d) {
	    	return substrRegex.test(d[key]);
	    });
	    if(matches.length == 1) {
	    	//app.drawResults(matches[0]);
	    	//app.$typeahead.trigger('blur');
	    }
	 
	    cb(matches.slice(0, 10));
	  };
	};

	app.initTypeahead = function() {
		app.$typeahead = $("#job").typeahead({
			minLength: 1,
			highlight: true,
		},{
			name: 'name',
  			displayKey: 'name',
			source: matcher(app.data, 'name')
		}).on('typeahead:selected', function(obj, datum) {
			app.drawResults(datum);
	    });
	}	
})();