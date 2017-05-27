class GeoMap {

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
			projection: {scale: [400]},
			zoom: {extent: [1/2, 8]},
			tooltip: {x: 5, y: -20, on: 400, off: 100}
		};

		this.classes = {
			paths: "",
			tooltip: "label label-success",
			hide: "hidden"
		};

		this.setProjection();
		this.setDataset(arg.dataset);

		this.setZoom();
		this.setTooltip();
	}

	setProjection() {

		this.projection = d3.geoAlbersUsa()
			.translate([this.width/2, this.height/2])
			.scale(this.param.projection.scale);

		this.path = d3.geoPath()
			.projection(this.projection);
	}

	setDataset(data) {

		this.dataset = data;

		this.elements = this.canvas.selectAll("path")
			.data(this.dataset.features);

		this.elements.exit()
			.remove();

		this.elements = this.elements.enter()
			.append("path")
			.merge(this.elements)
			.attr("d", this.path)
			.attr("class", this.classes.paths);
	}

	setZoom() {

		var that = this;

		this.zoom = d3.zoom()
			.scaleExtent(this.param.zoom.extent)
			.on("zoom", function() {
				that.canvas.attr("transform", d3.event.transform);
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
					
				that.tooltip.html(d.properties.name)
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