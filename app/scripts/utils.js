(function() {
	app.utils = {};

	var locale = d3.locale({
	  "decimal": ",",
	  "thousands": "\xa0",
	  "grouping": [3],
	  "currency": ["", " kr"],
	  "dateTime": "%A %e %B %Y kl. %X",
	  "date": "%d.%m.%Y",
	  "time": "%H:%M:%S",
	  "periods": ["AM", "PM"],
	  "days": ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"],
	  "shortDays": ["må", "ti", "ons", "to", "fre", "lö", "sö"],
	  "months": ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
	  "shortMonths": ["jan", "feb", "mars", "apr", "maj", "jun", "jul", "aug", "sept", "okt", "nov", "dec"]
	})

	app.utils.formatPercent = locale.numberFormat('%');

	Array.prototype.getRandom = function(n) {
	    var arr = this,
	    	result = new Array(n),
	        len = arr.length,
	        taken = new Array(len);
	    if (n > len)
	        throw new RangeError("getRandom: more elements taken than available");
	    while (n--) {
	        var x = Math.floor(Math.random() * len);
	        result[n] = arr[x in taken ? taken[x] : x];
	        taken[x] = --len;
	    }
	    return result;
	}

})();