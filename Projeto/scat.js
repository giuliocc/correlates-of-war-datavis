class Scatterplot {

	// {
	// 	name:	nome da guerra
	// 	x:		duração
	// 	y:		vidas perdidas
	// 	value:	
	// 	class:	tipo de guerra?
	// }

	constructor(arg) {

		this.id = arg.id;
		this.container = arg.container;

		this.x = arg.x;
		this.y = arg.y;
		this.width = arg.width;
		this.height = arg.height;

		this.canvas = this.container.append("g");
		this.canvas.attr("transform", "translate(" + this.x + "," + this.y + ")");

		this.param = {
			margin: {left: 30, right: 10, top: 10, bottom: 20},
			elements: {radius: 4},
			zoom: {extent: [1/4, 32]},
			tooltip: {x: 5, y: -20, on: 400, off: 100}
		};

		this.classes = {
			elements: "",
			axes: {x: "", y: ""},
			tooltip: "label label-primary",
			hide: "hidden"
		};

		this.setMargin();
		this.setScales();

		this.setDataset(arg.dataset);
		this.setAxes();

		this.setZoom();
		this.setTooltip();
		
		// this.setBrush();
	}

	setMargin() {

		this.width -= (this.param.margin.left + this.param.margin.right);
		this.height -= (this.param.margin.top + this.param.margin.bottom);

		this.view = this.canvas.append("g");

		this.canvas.attr("transform", "translate(" + (this.x + this.param.margin.left) + "," + (this.y + this.param.margin.top) + ")");
	}

	setScales() {

		this.x_scale = d3.scaleLinear().range([0, this.width]);
		this.y_scale = d3.scaleLinear().range([this.height, 0]);
	}

	setDataset(data) {

		var that = this;

		this.dataset = data;

		this.x_scale.domain(d3.extent(this.dataset, function(d) { return d.x; }));
		this.y_scale.domain(d3.extent(this.dataset, function(d) { return d.y; }));

		this.elements = this.view.selectAll("circle")
			.data(this.dataset);

		this.elements.exit()
			.remove();

		this.elements = this.elements.enter()
			.append("circle")
			.merge(this.elements)
			.attr("cx", function(d) { return that.x_scale(d.x); })
			.attr("cy", function(d) { return that.y_scale(d.y); })
			.attr("r", this.param.elements.radius)
			.attr("class", this.classes.elements);
	}

	setAxes() {

		this.x_axis = d3.axisBottom(this.x_scale);
		this.y_axis = d3.axisLeft(this.y_scale);

		this.x_axis_group = this.canvas.append("g")
			.attr("transform", "translate(0," + this.height + ")")
			.attr("class", this.classes.axes.x);

		this.y_axis_group = this.canvas.append("g")
			.attr("class", this.classes.axes.y);

		this.x_axis(this.x_axis_group);
		this.y_axis(this.y_axis_group);
	}

	setZoom() {

		var that = this;
		
		this.zoom = d3.zoom()
			.scaleExtent(this.param.zoom.extent)
			.on("zoom", function() {
				that.view.attr("transform", d3.event.transform);
				that.x_axis_group.call(that.x_axis.scale(d3.event.transform.rescaleX(that.x_scale)));
				that.y_axis_group.call(that.y_axis.scale(d3.event.transform.rescaleY(that.y_scale)));
			});

		this.zoom(this.container);
	}

	setTooltip() {

		var that = this;

		this.tooltip = d3.select("body").append("div")
			.style("position", "absolute")
			.attr("class", this.classes.hide);

		this.elements
			.on("mousemove", function(d) {
				that.tooltip.transition()
					.duration(that.param.tooltip.on);
					
				that.tooltip.html(d.x + ", " + d.y)
					.style("left", (d3.event.pageX + that.param.tooltip.x) + "px")
					.style("top", (d3.event.pageY + that.param.tooltip.y) + "px")
					.attr("class", that.classes.tooltip);
			})
			.on("mouseout", function(d) {
				that.tooltip.transition()
					.duration(that.param.tooltip.off)
					.attr("class", that.classes.hide);
			});
	}
}