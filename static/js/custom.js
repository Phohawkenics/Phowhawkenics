$("#back-to-top").on("click", function() {
    $('html, body').animate({
	    scrollTop: 0
	}, 'fast');
});

$('.content').on("click", ".sidebar > div", function(e) {
	e.preventDefault();

    var id = $(this).attr("class");
	var $selectedContent = $( "#pageContent .row-wrapper." + id);

	if ($selectedContent != null && $selectedContent.length > 0) {
		selectSidebar(id);

		$(".loading-spinner").show();
		$( "#pageContent .row-wrapper").attr("style", "");

		$selectedContent.css("opacity", 0);
		$selectedContent.css("display", "block");
	
		$selectedContent.animate({
			    opacity: 1
			}
			, 'normal'
			, function() {
				$(".loading-spinner").hide();
			});
	} 
});

function selectSidebar (className) {
	$(".sidebar > div").removeClass("selected");
	$(".sidebar ." + className).addClass("selected");
	$("#pageContent .row-wrapper." + className).css("display", "block")
}

$(document).ready(function() {
	selectSidebar($("#selectedSidebar").val());
});