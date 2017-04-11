var ImageGallery1 = Class.extend({
  init: function(numberOfElements, itemWidth, sectionClass){
    this.sectionClass = sectionClass;
  	this.numberOfElements = numberOfElements;
  	this.itemWidth = itemWidth;
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
  getSectionClass: function() {
    return this.sectionClass;
  }
});