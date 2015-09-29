$(function() {
	//load
	$.getJSON("gistlist/gist.json" , function(data) {
		var cateBukkit = $('#category_bukkit');
		var htmlBukkit = '';
		for(var i in data.Bukkit) {
			var id = data.Bukkit[i].id;
			var title = data.Bukkit[i].title;
			var desc = data.Bukkit[i].description;
			htmlBukkit += '<div class="panel panel-default" id="'+id+'"><div class="panel-heading"><a class="title" href="?category=bukkit#'+id+'" style="font-size:14px">'+title+'</a></div><div class="panel-body">'+desc+'<div class="display"><hr><button type="button" class="btn btn-default btn-sm" id="code_view" style="display:inline">表示</button><button type="button" class="btn btn-default btn-sm" id="code_hide" style="display:none">非表示</button><br><div id="gistCode"></div></div></div><div class="panel-footer"><a href="https://gist.github.com/keepoff07/'+id+'"><div class="display">https://gist.github.com/keepoff07/'+id+'</div><div class="display-sm">https://gist...'+id+'</div></a></div></div>';
		}
		cateBukkit.html(htmlBukkit);
		
		var cateMC = $('#category_minecraft');
		var htmlMC = '';
		for(var i in data.Minecraft) {
			var id = data.Minecraft[i].id;
			var title = data.Minecraft[i].title;
			var desc = data.Minecraft[i].description;
			htmlMC += '<div class="panel panel-default" id="'+id+'"><div class="panel-heading"><a class="title" href="?category=minecraft#'+id+'" style="font-size:14px">'+title+'</a></div><div class="panel-body">'+desc+'<div class="display"><hr><button type="button" class="btn btn-default btn-sm" id="code_view" style="display:inline">表示</button><button type="button" class="btn btn-default btn-sm" id="code_hide" style="display:none">非表示</button><br><div id="gistCode"></div></div></div><div class="panel-footer"><a href="https://gist.github.com/keepoff07/'+id+'"><div class="display">https://gist.github.com/keepoff07/'+id+'</div><div class="display-sm">https://gist...'+id+'</div></a></div></div>';
		}
		cateMC.html(htmlMC);
		
		var cateOther = $('#category_other');
		var htmlOther = '';
		for(var i in data.Other) {
			var id = data.Other[i].id;
			var title = data.Other[i].title;
			var desc = data.Other[i].description;
			htmlOther += '<div class="panel panel-default" id="'+id+'"><div class="panel-heading"><a class="title" href="?category=other#'+id+'" style="font-size:14px">'+title+'</a></div><div class="panel-body">'+desc+'<div class="display"><hr><button type="button" class="btn btn-default btn-sm" id="code_view" style="display:inline">表示</button><button type="button" class="btn btn-default btn-sm" id="code_hide" style="display:none">非表示</button><br><div id="gistCode"></div></div></div><div class="panel-footer"><a href="https://gist.github.com/keepoff07/'+id+'"><div class="display">https://gist.github.com/keepoff07/'+id+'</div><div class="display-sm">https://gist...'+id+'</div></a></div></div>';
		}
		cateOther.html(htmlOther);
		
		setEvent();
	});
});

function setEvent() {
	$(function() {
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
		
		var cateBukkit = $('#category_bukkit');
		var cateMC = $('#category_minecraft');
		var cateOther = $('#category_other');
		var setCateBukkit = $('body #set_category_bukkit');
		var setCateMC = $('body #set_category_minecraft');
		var setCateOther = $('body #set_category_other');
		var search = location.search;
		setCateBukkit.click(function(){
			viewBukkit();
		});
		setCateMC.click(function(){
			viewMC();
		});
		setCateOther.click(function(){
			viewOther();
		});
		if(search.indexOf('category=minecraft') != -1) {
			viewMC();
		} else if(search.indexOf('category=other') != -1) {
			viewOther();
		} else {
			viewBukkit();
		}
		function viewBukkit() {
			cateBukkit.css('display', 'inline');
			cateMC.css('display', 'none');
			cateOther.css('display', 'none');
			setCateBukkit.attr('class', 'btn btn-default active');
			setCateMC.attr('class', 'btn btn-default');
			setCateOther.attr('class', 'btn btn-default');
		}
		function viewMC() {
			cateBukkit.css('display', 'none');
			cateMC.css('display', 'inline');
			cateOther.css('display', 'none');
			setCateBukkit.attr('class', 'btn btn-default');
			setCateMC.attr('class', 'btn btn-default active');
			setCateOther.attr('class', 'btn btn-default');
		}
		function viewOther() {
			cateBukkit.css('display', 'none');
			cateMC.css('display', 'none');
			cateOther.css('display', 'inline');
			setCateBukkit.attr('class', 'btn btn-default');
			setCateMC.attr('class', 'btn btn-default');
			setCateOther.attr('class', 'btn btn-default active');
		}
	});
}
