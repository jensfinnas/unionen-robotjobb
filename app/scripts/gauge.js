Gauge = (function() {
	function Gauge(selector) {
		var self = this;
		self.chart = c3.generate({
			bindto: selector,
		    data: {
		        columns: [
		            ['data', 0]
		        ],
		        type: 'gauge',
		    },
		    gauge: {
		    },
		    color: {
		        pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
		        threshold: {
		        	max: 100,
		            values: [30, 60, 90, 100]
		        }
		    },
		    size: {
		        height: 180
		    },
		    tooltip: {
		    	show: false
		    }
		});
	}
	Gauge.prototype.update = function(value) {
		var self = this;
		self.chart.load({
			columns: [['data', value * 100]]
		});
	}
	return Gauge;
})();