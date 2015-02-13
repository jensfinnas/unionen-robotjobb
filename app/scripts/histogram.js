Histogram = (function() {
	function Histogram(selector, inputData, opts) {
		var self = this;
		var binSize = 0.02; 
		self.baseColor = "#999";
		self.fillColor = app.themeColor;

		/* ---- DRAW DOM ELEMENTS ----*/
		// Create a div element where we draw the chart
		self.container = d3.select(selector);
		// Chart size is based on container size
		var containerWidth = 400;//self.wrapper[0][0].offsetWidth;
		self.elem = self.container
			.append("div")
			.attr("class", "chart histogram");
		self.margin = m = { 
		  top: 0, 
		  bottom: 0, 
		  right: 0.1 * containerWidth, 
		  left: 0.1 * containerWidth
		};
		self.width = w = (containerWidth - m.left - m.right);
		self.height = h = w * 0.6;

		// Append svg
		self.svg = self.elem.append('svg')
		  .attr('width', w + m.left + m.right)
		  .attr('height', h + m.top + m.bottom);

		// Append the canvas
		self.chart = self.svg
		  .append('g')
		  .attr("transform", "translate(" + m.left + "," + m.top + ")")
		
		/* ---- INIT DATA ----*/
		// Get values
		self.values = inputData.map(function(d) {
			return d.probability; 
		});
		// Aggregate data to histogra,
		self.data = d3.layout.histogram()
			.bins(1/binSize)(self.values);

		/* ---- INIT SCALES ----*/
		// X scale
		self.x = d3.scale.linear()
		    .domain([0, 1])
		    .range([0, w]);

		self.y = d3.scale.linear()
			.domain([0, d3.max(self.data, function(d) { return d.y; })])
			.range([h, 0]);

		self.barGroups = self.chart.selectAll(".bar")
			.data(self.data)
			.enter().append("g")
		    .attr("class", "bar")
		    .attr("transform", function(d) { 
		    	return "translate(" + self.x(d.x) + "," + self.y(d.y) + ")"; 
		    });

		self.bars = self.barGroups.append("rect")
		    .attr("x", 1)
		    .attr("fill", app.baseColor)
		    .attr("width", self.x(self.data[0].dx) - 1)
		    .attr("height", function(d) { return h - self.y(d.y); });
	}
	Histogram.prototype.addReference = function(value, label) {
		var self = this;
		self.bars.transition()
			.attr('fill', function(d) {
				return d[d.length - 1] > value ? app.themeColor : app.baseColor;
			})
			.duration(500)
			.delay(function(d,i) {
				return i * 20;
			});

	}
	Histogram.prototype.clear = function() {
		self.bars.transition()
			//.attr('fill', app.baseColor);
	}

	return Histogram;
})();