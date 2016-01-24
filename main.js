
var numberOfColumns = 10;
var numberOfRows = 10;

var maxTileRefreshTime = 2;

var tileInterval = setInterval(function(){
	var index = Math.floor((Math.random() * calculateNumOfTiles()) + 1);
	$(".tile:eq(" + index + ")").animate({backgroundColor: getRandomHexValue()}, 1000, "linear");
}, getRandomNumber());

$("#max_tile_refresh_time").text(maxTileRefreshTime);
$("#number_of_rows").text(numberOfRows);
$("#number_of_columns").text(numberOfColumns);

//control max tile refresh time
$("#decrease_max_tile_refresh_time").click(function() {
	if (maxTileRefreshTime >= 1000) {
		maxTileRefreshTime -= 1000;
		$("#max_tile_refresh_time").text(maxTileRefreshTime);
	}
});

$("#increase_max_tile_refresh_time").click(function() {
	maxTileRefreshTime += 1000;
	$("#max_tile_refresh_time").text(maxTileRefreshTime);
});

//control number of ROWS
$("#decrease_number_of_rows").click(function() {
	if (numberOfRows >= 0) {
		numberOfRows -= 1;
		$("#number_of_rows").text(numberOfRows);
		$("div.tile").remove();
		appendTiles();
	}
});

$("#increase_number_of_rows").click(function() {
	numberOfRows += 1;
	$("#number_of_rows").text(numberOfRows);
	$("div.tile").remove();
	appendTiles();
});

//control number of COLUMNS
$("#decrease_number_of_columns").click(function() {
	if (numberOfColumns >= 0) {
		numberOfColumns -= 1;
		$("#number_of_columns").text(numberOfColumns);
		$("div.tile").remove();
		appendTiles();
	}
});

$("#increase_number_of_columns").click(function() {
	numberOfColumns += 1;
	$("#number_of_columns").text(numberOfColumns);
	$("div.tile").remove();
	appendTiles();
});

var setTileInterval = function(){
    clearInterval(interval);

	var index = Math.floor((Math.random() * calculateNumOfTiles()) + 1);
	$(".tile:eq(" + index + ")").animate({backgroundColor: getRandomHexValue()}, 1000, "linear");

    interval = setInterval(setTileInterval, getRandomNumber());
}
var interval = setInterval(setTileInterval, getRandomNumber());

function calculateNumOfTiles() {
	return numberOfColumns*numberOfRows;
}

function getLength() {
	return $(window).width()/numberOfColumns;
}

function getRandomHexValue() {
	return "#" + (Math.random()*0xFFFFFF<<0).toString(16);
}

function appendTiles() {
	for(var i = 1; i <= calculateNumOfTiles(); i++) {
		$('body').append('<div class="tile square-tile" style="width:' + getLength() + 'px; height:' + getLength() + 'px; background-color:' + getRandomHexValue() + '"></div>');
	}
}

function updateTiles() {
	for(var i = 0; i <= calculateNumOfTiles(); i++) {
		$(".tile:eq(" + i + ")").css({"height":getLength(),"width":getLength()});
	}
}

function getRandomNumber() {
	var t = Math.floor((Math.random() * maxTileRefreshTime));
	console.log(t);
	return t;
}

$('.toggle-settings').click(function() {
  $('#settings_panel').fadeToggle();
});

$('.tile-shape').click(function() {

	if ($('i.tile-shape').hasClass("fa-circle-o") == true) {
		$('i.tile-shape').removeClass("fa-circle-o").addClass("fa-square-o");
		
		$(".tile").each(function(index) {
			$(".tile:eq(" + index + ")").removeClass("tile-shape-square").addClass("tile-shape-circle");
  		});
	} else {
		$("i.tile-shape").removeClass("fa-square-o").addClass("fa-circle-o");

		$(".tile").each(function(index) {
			$(".tile:eq(" + index + ")").removeClass("tile-shape-circle").addClass("tile-shape-square");
   		});
	}

});

$( window ).resize(function() {
	updateTiles();
});

appendTiles();
