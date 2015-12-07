var parm = new Query;

$(function() {
	var agent = navigator.userAgent;
	if(agent.search(/iPhone/) != -1 || agent.search(/Android/) != -1) {
		$('#container').addClass('phone');
	}
	$(function() {
		if(parm.has) {
			var page = parm.get('page');
			if(page != null && $('header ul #'+page).length) {
					document.getElementById("disp").src = "cbp-src/html/"+page+".html"+location.search+location.hash;
			}
		}
	});

	$('#tweet').click(function() {
		window.open(
			encodeURI(decodeURI($(this).attr('href'))),
			'tweetwindow',
			'width=600, height=300, personalbar=0, toolbar=0, scrollbars=1, resizable=!'
		);
		return false;
	});
});

function Query() {
	this.has = false;
	var keys = new Array();
	var values = new Array();
	
	this.search = location.search;
	var argu = this.search.split("?");
	if(argu.length > 1) {
		var args = argu[1].split("&");
		for(var i = 0; i < args.length; i++ ) {
			this.has = true;
			var par = args[i].split("=");
			keys.push(par[0]);
			if(par.length > 1) {
				values.push(par[1]);
			} else {
				values.push(null);
			}
		}
	}
	this.get = function(key) {
		if(this.has) {
			for(var i in keys) {
				if(keys[i] == key) {
					return values[i];
				}
			}
		}
		return null;
	};
}
