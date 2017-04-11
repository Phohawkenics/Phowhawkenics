$("#back-to-top").on("click", function() {
    $('html, body').animate({
	    scrollTop: 0
	}, 'fast');
});

$("#screen-overlay-container, #screen-overlay-container .close").on("click", function(e) { 
	if (e.target !== this)
    	return
    $("#screen-overlay-container").removeClass("open");
});

$("#screen-overlay-container .left-nav > span").on("click", function(e) { 
    fullScreenGallery.navigateLeft();
});

$("#screen-overlay-container .right-nav > span").on("click", function(e) { 
    fullScreenGallery.navigateRight();
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

$(".info-dropdown").on("click", "h2, h3, h4, h5, h6" , function() {
	var $listItem = $(this).parent();

	var showContentFlag = $listItem.hasClass("open");

	if (showContentFlag) {
		$listItem.removeClass("open");
	} else {
		$listItem.parent().find("li").removeClass("open");
		$listItem.addClass("open");

		$('html, body').animate({
		    scrollTop: $listItem.offset().top - 20
		}, 'slow');
	}
});


$(document).ready(function() {
	selectSidebar($("#selectedSidebar").val());
});

$(document).on("click", function (e) {
	if (!$(e.target).hasClass('misc-menu-btn')) {
		var $homeMenu = $(".home-menu");
		var inHomeMenu = $homeMenu.find(e.target).length > 0;
		var menuIsOpen = $(".menu-panel .open").length > 0;

	    if (!inHomeMenu && menuIsOpen) {
			$homeMenu.find("div").removeClass("open");
	    }

		var $infoDropdown = $(".info-dropdown");
		var inInfoDropdown = $infoDropdown.find(e.target).length > 0;
		var infoDropdownIsOpen = $(".info-dropdown > li.open").length > 0;

	    if (!inInfoDropdown && infoDropdownIsOpen) {
			$infoDropdown.find("li").removeClass("open");
	    }	    
	}
});