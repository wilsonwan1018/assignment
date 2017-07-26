$('.fancybox').fancybox();

$(function() {
	
	var $searchField = $('#query'),
			$button = $('#search-btn');

	$('#search-form').submit(function(e){
		e.preventDefault();
	});
	
});

function search() {

	// Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	q = $('#query').val();
	
	// Run Get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyDKJYxyWUDZhykA8DUVOorUbmC7J7QAAUg' },
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
					
				$.each(data.items, function(i, item) {
					// Get Output
					var output = getOutput(item);
					
					// Display Resluts
					$('#results').append(output);
				});
				
				var buttons = getButtons(prevPageToken, nextPageToken);
				
				// Display Buttons
				$('#buttons').append(buttons);
	
			}
	);
}

// Next Button
function nextPage() {
	
	var token = $('#next-button').data('token'),
			q = $('#next-button').data('query');
	
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	q = $('#query').val();
	
	// Run Get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			pageToken: token,
			q: q,
			type: 'video',
			key: 'AIzaSyDKJYxyWUDZhykA8DUVOorUbmC7J7QAAUg' },
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
					
				$.each(data.items, function(i, item) {
					// Get Output
					var output = getOutput(item);
					
					// Display Resluts
					$('#results').append(output);
				});
				
				var buttons = getButtons(prevPageToken, nextPageToken);
				
				// Display Buttons
				$('#buttons').append(buttons);
	
			}
	);
}

// Prev Button
function prevPage() {

	var token = $('#prev-button').data('token'),
			q = $('#prev-button').data('query');
	
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	q = $('#query').val();
	
	// Run Get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			pageToken: token,
			q: q,
			type: 'video',
			key: 'AIzaSyDKJYxyWUDZhykA8DUVOorUbmC7J7QAAUg' },
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
					
				$.each(data.items, function(i, item) {
					// Get Output
					var output = getOutput(item);
					
					// Display Resluts
					$('#results').append(output);
				});
				
				var buttons = getButtons(prevPageToken, nextPageToken);
				
				// Display Buttons
				$('#buttons').append(buttons);
	
			}
	);
}

// Build Output
function getOutput(item) {
	var videoId = item.id.videoId,
			title = item.snippet.title,
			description = item.snippet.description,
			thumb = item.snippet.thumbnails.high.url,
			channelTitle = item.snippet.channelTitle,
			videoDate = item.snippet.publishedAt;
	
	var output = '<li class="youtube">' +
			'<div class="list-left">' +
			'<img src="'+thumb+'">' +
			'</div>' +
			'<div class="list-right">' +
			'<h3><a class="fancybox fancybox.iframe" href="https://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
			'<small>By <span class="cTtile">'+channelTitle+'</span> on '+videoDate+'</small>' +
			'<p>'+description+'</p>' +
			'</div>' +
			'</li>' +
			'<div class="clearfix"></div>' +
			'';
	
	return output;
}

// Build the Buttons
function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnOutput = '<div class="btn-container">' +
				'<button id="next-button" class="btn" data-query="'+ q +'"' +
				'data-token="'+ nextPageToken +'" onclick="nextPage()">Next Page</button></div>'
	} else {
				var btnOutput = '<div class="button-container">' +
				'<button id="prev-button" class="btn" data-query="'+ q +'"' +
				'data-token="'+ prevPageToken +'" onclick="prevPage();">Prev Page</button>' +
				'<button id="next-button" class="btn" data-query="'+ q +'"' +
				'data-token="'+ nextPageToken +'" onclick="nextPage();">Next Page</button></div>'
	}
	return btnOutput;
}