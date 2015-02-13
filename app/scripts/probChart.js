ProbChart = (function() {
  var tau = 2 * Math.PI;

  function ProbChart(selector, longSentence) {
    var self = this;
    self.baseColor = "#666";
    self.color = d3.scale.linear()
      .domain([0, .5, 1])
      .range(["green", "red"]);
    self.container = d3.select(selector);
    var containerWidth = 400;//self.container[0][0].offsetWidth;
    
    self.elem = self.container.append("div").attr("class", "chart prob-chart");
    self.margin = m = { 
      top: containerWidth * 0.06, 
      bottom: containerWidth * 0.08, 
      right: 0, 
      left: 0
    };
    self.width = w = (containerWidth - m.left - m.right);
    self.height = h = w * 0.6;
    self.radius = r = (h - (m.top - m.bottom)) / 2;
    self.percent = 0; // Init at 0% and animate to correct pos
    self.longSentence = longSentence;
    self.getShortSentence = getShortSentence;

    // Init chart
    self.svg = self.elem.append('svg')
      .attr('width', w + m.left + m.right)
      .attr('height', h + m.top + m.bottom);

    self.chart = self.svg
      .append('g')
      .attr("transform", "translate(" + (w/2 + m.left) + "," + (h/2 + m.top) + ")")
    

    self.arc = d3.svg.arc()
      .innerRadius(r * .8) // Define the width of the arc here
      .outerRadius(r)
      .startAngle(0);

    // Left side arc
    self.leftArc = self.chart.append("path")
      .datum({endAngle: tau})
      .style("fill", self.baseColor)
      .attr("d", self.arc);

    // Right side arc
    self.rightArc = self.chart.append("path")
      .datum({endAngle: self.percent * tau})
      .attr("fill", self.color(self.percent))
      .attr("d", self.arc);

    // Label: text
    var fontSize = (10 + w * .05 );
    
    // Label: percent
    self.label = self.svg.append("text")
      .attr("class", "value")
      .attr("dy",".7em")
      .attr("font-size", fontSize * 1.5 + "px")
      .attr("text-anchor", "middle")
      .attr('transform', 'translate('+ [w / 2, h / 2] + ')');


    // Answer
    self.answer = self.elem.append("div")
      .attr("class", "answer");

    self.answer.append("div")
      .attr("class", "short-answer")
      .text();

    self.answer.append("div")
      .attr("class", "long-answer")
      .text()

  }

  function arcTween(transition, newPercent, self) {
    transition.attrTween("d", function(d) {
      var interpolate = d3.interpolate(d.endAngle, newPercent * tau);
      return function(t) {
        // Update labels while animating
        var percent = self.percent + (newPercent - self.percent) * t;
        self.label
          //.attr("fill", self.color(percent))
          .text(function(d,i) { return getShortSentence(percent) });
        
        self.rightArc.attr("fill", self.color(percent))

        d.endAngle = interpolate(t);
        return self.arc(d);
      };
    });
  }

  // Generate short answer text (eg. "Ja, troligen")
  var getShortSentence = function(percent) {
    var shortSentence;
    if (percent < .2) {
      shortSentence = 'Nej';
    }
    else if (.2 <= percent && percent < .4) {
      shortSentence = 'Knappast';
    }
    else if (.4 <= percent && percent < .6) {
      shortSentence = 'Oklart';
    }
    else if (.6 <= percent && percent < .8) {
      shortSentence = 'Troligen';
    }
    else if (.8 <= percent) {
      shortSentence = 'Ja';
    }
    return shortSentence; 
  }

  ProbChart.prototype.update = function(newPercent, opts, callbacks) {
    var self = this;

    // Animate chart
    self.rightArc.transition()
      .duration(800)
      .call(arcTween, newPercent, self)
      .each("end", function(d) {
        // Update texts
        self.percent = newPercent;
        /*self.answer.select(".short-answer")
          .text( self.getShortSentence(newPercent, self.opts) );
        self.answer.select(".long-answer")
          //.html( self.longSentence(newPercent))
          .html(function(d) { 
            return self.longSentence(newPercent); 
          })*/

        if (callbacks) {
          for (var i=0; i<callbacks.length; i++) {
            callbacks[i]();
          }
        }
      });
  }
  ProbChart.prototype.destroy = function() {
    var self = this;
    self.el.remove();
    return self;
  }
  return ProbChart;

})();