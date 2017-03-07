$("#back-to-top").on("click", function() {
    $('html, body').animate({
	    scrollTop: 0
	}, 'fast');
});

$('.content').on("click", ".sidebar-horizontal > div, .sidebar-vertical > div", function(e) {
	e.preventDefault();
    var id = $(this).attr("class");

	$(".loading-spinner").show();
	$( "#pageContent" ).css("opacity", 0);

	var t0 = performance.now();

	$( "#pageContent" ).load( "/about/" + id, function() {
		
		selectSidebar(id);

		var t1 = performance.now();

		if (t1 - t0 < 400) {
			setTimeout(function() {
				$(".loading-spinner").hide();
				$( "#pageContent" ).animate({
					    opacity: 1
					}, 'normal');
			}, 500);
		} else {
			$(".loading-spinner").hide();
			$( "#pageContent" ).animate({
				    opacity: 1
				}, 'normal');
		}

	});
});

function selectSidebar (className) {
	$(".sidebar-horizontal > div, sidebar-vertical > div").removeClass("selected");
	$("." + className).addClass("selected");
}

$(document).ready(function() {
	selectSidebar($("#selectedSidebar").val());
});