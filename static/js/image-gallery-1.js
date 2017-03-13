var ImageGallery1 = Class.extend({
  init: function(numberOfElements, itemWidth, sectionClass){
    this.sectionClass = sectionClass;
  	this.numberOfElements = numberOfElements;
  	this.itemWidth = itemWidth;
  	this.pollingRetryCount = 0;
  	this.maxRetryCount = 50;
    this.isBusy = false;

  	var evenFlag = (numberOfElements % 2) == 0;

  	if (evenFlag) {
  		this.initialOffset = -1 * (itemWidth/2);
  		this.maxOffsetLeft = -1 * (itemWidth * (this.numberOfElements)/2) - this.initialOffset;
  		this.maxOffsetRight = (itemWidth * (this.numberOfElements)/2) + this.initialOffset;
  		$("." + this.sectionClass + " .image-gallery-1 .items").css("left", this.initialOffset.toString() + "px");
  	} else {
  		this.initialOffset = 0;
  		this.maxOffsetLeft = -1 * (itemWidth * (this.numberOfElements - 1)/2);
  		this.maxOffsetRight = (itemWidth * (this.numberOfElements - 1)/2);
  	}
  },

  navigateLeft: function() {
    var self = this;
	  var $itemsDom = $("." + this.sectionClass + " .image-gallery-1 .items");
    var maxOffsetFlag = parseInt($itemsDom.css("left")) >= this.maxOffsetRight;

  	var width = $itemsDom.width();

  	if (!maxOffsetFlag && !this.isBusy) {
      this.isBusy = true;
	    $itemsDom.css("width", width)

	    $itemsDom.animate({
		    left: "+=" + this.itemWidth
		}, 'fast'
		, function() {
      self.isBusy = false;
		});
	}
  },

  navigateRight: function() {
    var self = this;
	  var $itemsDom = $("." + this.sectionClass + " .image-gallery-1 .items");
  	var maxOffsetFlag = parseInt($itemsDom.css("left")) <= this.maxOffsetLeft;

  	var width = $itemsDom.width();

	if (!maxOffsetFlag && !this.isBusy) {
      this.isBusy = true;
	    $itemsDom.css("width", width)
	    $itemsDom.animate({
		    left: "-=" + this.itemWidth
		}, 'fast'
		, function() {
      self.isBusy = false;
		});
	}
  },
  openInFullScreen: function(imgDom) {
  	var self = this;
  	var $imgDom = $(imgDom).find("img").clone();

  	var $fullScreenContainer = $("#screen-overlay-container");

  	$fullScreenContainer.find(" > div img").remove()
  	$fullScreenContainer.addClass("open");

  	$imgDom.appendTo("#screen-overlay-container > div").each(function() {
  		self.polling(125, function() {
  			var $newImageDom = $("#screen-overlay-container > div img");
			$newImageDom.css("height", "100%");

		  	if ($newImageDom.width() > $("#screen-overlay-container > div").width()) {
		  		$newImageDom.attr("style", "");
		  		$newImageDom.css("width", "100%");
		  	}
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