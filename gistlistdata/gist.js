var gists = new GistDataList();
var tags = new TagList();
var parm = new Query;

$(function() {
	//load
	// set data
	$.getJSON("https://api.github.com/gists/501c035f20ff4213d041" , function(data) {
		console.log("load");
		$.getJSON(data.files.json.raw_url , function(subdata) {
			for(var i in subdata) {
				var gist = new GistData(subdata[i]);
				tags.add(gist.tags);
				gists.add(gist);
			}
			
			// write
			$('#tags').html(tags.ui);
			var text = "";
			for(var i = 0; i < gists.size(); i++) {
				text += gists.get(i).html;
			}
			$('#content').html(text);
			
			// set event
			setEvent();
		});
	});
});
function setEvent() {
	$('body #code_hide').click(function(){
		var button = $(this);
		var parent = button.parents('.panel');
		button.css('display', 'none');
		parent.find('#code_view').css('display', 'inline');
		parent.find('#gistCode').css('display', 'none');
	});
	$('body #code_view').click(function(){
		var button = $(this);
		var parent = button.parents('.panel');
		var gistID = parent.attr('id');
		var code = parent.find('#gistCode');
		if(code.css('display') == 'block') {
			var gistFrame = document.createElement("iframe");
			gistFrame.setAttribute("width", "100%");
			gistFrame.setAttribute("height", "210px");
			gistFrame.setAttribute("scrolling", "auto");
			gistFrame.id = "gistFrame";
			
			code.css('display', 'inline');
			code.append(gistFrame);
			
			var gistFrameHTML = '<html><head></head><body><sc'+'ript type="text/javascript" src="https://gist.github.com/keepoff07/'+gistID+'.js"></sc'+'ript></body>';
			var gistFrameDoc = gistFrame.document;
			
			if (gistFrame.contentDocument) {
				gistFrameDoc = gistFrame.contentDocument;
			} else if (gistFrame.contentWindow) {
				gistFrameDoc = gistFrame.contentWindow.document;
			}
			gistFrameDoc.open();
			gistFrameDoc.write(gistFrameHTML);
			gistFrameDoc.close();
		} else {
			code.css('display', 'inline');
		}
		button.css('display', 'none');
		parent.find('#code_hide').css('display', 'inline');
	});
	$('body a').click(function(){
		var link = $(this);
		var hre = link.attr('href');
		if(hre.substring(0, 5) == '?tag=') {
			var tag = hre.substring(5, hre.length);
			viewTag(tag);
			return false;
		}
		else if(hre.substring(0, 6) == '?clear') {
			viewTag(null);
			return false;
		}
		else if(hre.substring(0, 1) == '#') {
			var parent = $(link).parents('.panel');
			var pos = $(parent).offset().top;
			$("html,body").animate({scrollTop : pos}, 500);
			return false;
		} else {
			return true;
		}
	});

	// tagパラメーターがある時
	viewTag(parm.get("tag"));
	
	var hash = location.hash;
	if(hash.indexOf('#') != -1) {
		var gist = $(hash);
		var pos = $(gist).offset().top;
		$("html,body").animate({scrollTop : pos}, 500);
	}
}
function viewTag(tag) {
	$.each($('body').find('.panel'), function(index){
		var div = $(this);
		if(tag != null) {
			var id = div.attr('id');
			var gist = gists.search(id);
			if(gist != null) {
				if(gist.hasTag(tag)) {
					div.css('display', 'block');
				} else {
					div.css('display', 'none');
				}
			}
		} else {
			div.css('display', 'block');
		}
	});
}

function GistData(data) {
	this.id = data.id;
	this.title = data.title;
	this.depr = data.deprecated;
	var dep = "";
	if(this.depr) dep = "<b>@deprecated</b><br>";
	this.desc = data.description;
	this.tags = data.tags;
	this.html = '<div class="panel panel-default" id="'+this.id+'"><div class="panel-heading"><a class="title" href="#'+this.id+'" style="font-size:14px">'+this.title+'</a></div><div class="panel-body">'+dep+this.desc+'<div class="display"><hr><button type="button" class="btn btn-default btn-sm" id="code_view" style="display:inline">表示</button><button type="button" class="btn btn-default btn-sm" id="code_hide" style="display:none">非表示</button><br><div id="gistCode"></div></div></div><div class="panel-footer"><a href="https://gist.github.com/keepoff07/'+this.id+'"><div class="display">https://gist.github.com/keepoff07/'+this.id+'</div><div class="display-sm">https://gist...'+this.id+'</div></a></div></div>';
	this.hasTag = function(tag) {
		for(var i in this.tags) {
			if(this.tags[i] == tag)
				return true;
		}
		return false;
	}
}
function GistDataList() {
	var gistlist = new Array();
	this.add = function(gist) {
		gistlist.push(gist);
	}
	this.size = function() {
		return gistlist.length;
	}
	this.get = function(index) {
		return gistlist[index];
	}
	this.search = function(id) {
		for(var i in gistlist) {
			if(gistlist[i].id == id)
				return gistlist[i];
		}
		return null;
	}
}
function TagList() {
	var taglist = new Array();
	this.add = function(tags) {
		for(var i in tags) {
			var tag = tags[i];
			var enable = true;
			for(var j in taglist) {
				if(taglist[j] == tag) {
					enable = false;
					break;
				}
			}
			if(enable) {
				taglist.push(tag);
			}
		}
	}
	this.size = function() {
		return taglist.length;
	}
	this.get = function(index) {
		return taglist[index];
	}
	this.ui = function() {
		var li = '<li role="presentation"><a href="?clear">ALL</a></li>';
		for(var i in taglist) {
			var tag = taglist[i];
			li += '<li role="presentation"><a href="?tag='+tag+'">'+tag+'</a></li>'
		}
		return li;
	}
}
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
	}
}
