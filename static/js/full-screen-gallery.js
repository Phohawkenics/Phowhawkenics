var FullScreenGallery = Class.extend({
  init: function(){
  	this.currentClass = "";
  	this.pollingRetryCount = 0;
  	this.maxRetryCount = 50;
  },
  setCurrentClass: function(currentClass){
  	this.currentClass = currentClass;
  },
  navigateLeft: function(){
  	var self = this;
  	var srcUrl = $("#screen-overlay-container > div img").attr("src");
  	var $itemDom = $("." + this.currentClass + " .image-gallery-1 .item:has(img[src='" + srcUrl + "'])");
  	var $itemDomArray = $("." + this.currentClass + " .image-gallery-1 .item");

  	var index = $itemDomArray.index($itemDom) - 1;

  	if (index > -1) {
  		this.openInFullScreen($itemDomArray.eq(index));
  	} else {
  		this.openInFullScreen($itemDomArray.eq($itemDomArray.length - 1));
  	}

  },
  navigateRight: function(){
  	var self = this;
  	var srcUrl = $("#screen-overlay-container > div img").attr("src");
  	var $itemDom = $("." + this.currentClass + " .image-gallery-1 .item:has(img[src='" + srcUrl + "'])");
  	var $itemDomArray = $("." + this.currentClass + " .image-gallery-1 .item");

  	var index = $itemDomArray.index($itemDom) + 1;

  	if (index < $itemDomArray.length) {
  		this.openInFullScreen($itemDomArray.eq(index));
  	} else {
  		this.openInFullScreen($itemDomArray.eq(0));
  	}
  },
  openInFullScreen: function(itemDom) {
  	var self = this;

    $("#screen-overlay-container .loading-spinner").show();

  	var $imgDom = $(itemDom).find("img").clone();
    var $h2Dom = $(itemDom).find("h2").clone();
    
  	var $fullScreenContainer = $("#screen-overlay-container");

    $fullScreenContainer.find(" > div h2").remove()
  	$fullScreenContainer.find(" > div img").remove()
  	$fullScreenContainer.addClass("open");

    $h2Dom.appendTo("#screen-overlay-container > div");
  	$imgDom.appendTo("#screen-overlay-container > div").each(function() {
  		self.polling(125, function() {
  			var $newImageDom = $("#screen-overlay-container > div img");
			  $newImageDom.css("height", "100%");

		  	if ($newImageDom.width() > $("#screen-overlay-container > div").width()) {
		  		$newImageDom.attr("style", "");
		  		$newImageDom.css("width", "100%");
		  	}

        $("#screen-overlay-container .loading-spinner").hide();
  		},
  		function() {
  			var width = $("#screen-overlay-container > div img").width();
  			return  (width > 0);
  		});
  		
  	});
  },
  polling: function(retryTime, callback, endCondition) {
  	var self = this;

  	++this.pollingRetryCount;
  	if (this.pollingRetryCount <= this.maxRetryCount) {
  		var flag = endCondition();

  		if (flag) {
  			callback();
  			this.pollingRetryCount = 0;
  		} else {
  			setTimeout(function() {
	  			self.polling(retryTime, callback, endCondition);
	  		}, retryTime);
  		}
  	} else {
  		this.pollingRetryCount = 0;
  	}
  }

});

window.fullScreenGallery = new FullScreenGallery();