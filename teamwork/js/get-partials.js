(function ($) {
	$(".no-js").removeClass("no-js");
	$(".no-js-msg").remove();
	// SYNC
	$.ajaxSetup({
		async: false
	});

	$.get("../partials/menu.html",function(data) {
		$("body").prepend($(data));
	});

	var $partialRequest = $("[class^='get_']");

	$partialRequest.each(function () {
		var $this = $(this);
		var params = getParams($this);

		var route = getRoute(params);
		var $partial = getPartial($, route);


		var heading = $partial.find("heading").html();
		var blurb = $partial.find("blurb").html();
		var preview = $partial.find("preview").html();
		var word = $partial.find("word").html();
		var usage = $partial.find("usage").html();

		// TEMP DISABLED
		usage = "Pending...";

		var $heading = $("<header><h2>" + heading + "</h2></header>");
		var $blurb = $("<article class='blurb'>" + blurb + "</article>");
		var $preview = $("<article class='preview'>" + preview + "</article>");
		var $word = $("<article class='word'>" + word + "</article>");
		var $usage = $("<article class='usage'>" + usage + "</article>");

		var $section = $("<section class='element' id='" + heading +"'>");
		$section.append($heading, $blurb, $preview, $word, $usage);

		$this.replaceWith($section);
	});

	$.ajaxSetup({
		async: true
	});
}(jQuery));

function getParams($node) {
	var params = $node.attr("class").split("_");
	params.shift();
	return params;
}

function getRoute(params) {
	return "../partials/" + params.join("/") + ".html";
}

function getPartial($, route) {
	// NOTE: This function requires $.ajaxSetup({async: false}); to work
	var callback;
	$.get(route, function (data) {
		$partial = $("<div>" + data + "</div>");
		callback = $partial;
	});
	return callback;
}
