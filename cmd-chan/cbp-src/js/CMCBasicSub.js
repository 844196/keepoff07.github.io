$(function() {
	var agent = navigator.userAgent;
	if(agent.search(/iPhone/) != -1 || agent.search(/Android/) != -1) {
		$('#container').addClass('phone');
	}
	$(function() {
		setTimeout(function(){
			window.parent.$('#disp').css('height', $('body').height());
		}, 10);
	});
	var patit = window.parent.$('title');
	var befor = patit.text();
	patit.text(befor+ " | " + $('title').text());
	
	$('a').click(function() {
		window.parent.location.href = $(this).attr("href");
		return false;
	});
});

function selectMenu(sel) {
	selectMenu(sel, null);
}
function selectMenu(sel, sub) {
	setTimeout(function(){
		var select = 'ul #'+sel;
		window.parent.$(select).addClass('active');
		if(sub != null) {
			var subsel = '.submenu #'+sub;
			window.parent.$(subsel).addClass('active');
		}
	}, 1);
}
