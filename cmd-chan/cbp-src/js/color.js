$(function(){
	var content = $('#content');
	$('#color-format').change(function(){
		var isHex = false;
		var isUpper = false;
		var isNoHash = false;
		var isAlpha = false;
		var isMulti = false;
		$("#color-format option:selected").each(function(){
			isHex = $(this).attr('Hex') == "1";
			if(isHex) {
				isUpper = $(this).attr('Upper') == "1";
				isNoHash = $(this).attr('NoHash') == "1";
			} else {
				
				isMulti = $(this).attr('Multi') == "1";
				isAlpha = $(this).attr('Alpha') == "1";
			}
		});
		$.each(content.find('.color-palet'), function(){
			var td;
			if(isNoHash) {
				td = $(this).find('#hash');
				$(this).find('#long').css('display', 'none');
				$(this).find('#dec').css('display', 'none');
			}
			else if(isMulti) {
				td = $(this).find('#dec');
				$(this).find('#long').css('display', 'none');
				$(this).find('#hash').css('display', 'none');
			} else {
				td = $(this).find('#long');
				$(this).find('#hash').css('display', 'none');
				$(this).find('#dec').css('display', 'none');
			}
			td.css('display', 'table-cell');
			if(isHex) {
				var output = td.find('input');
				var hex = $(this).attr('HEX');
				if(isUpper) hex = hex.toUpperCase();
				if(isNoHash) hex = hex.substring(1);
				output.attr('value', hex);
			} else {
				if(isMulti != true) {
					var r = $(this).attr('R');
					var g = $(this).attr('G');
					var b = $(this).attr('B');
					if(isAlpha) {
						td.find('input').attr('value', "rgba("+r+","+g+","+b+",1.0)");
					} else {
						td.find('input').attr('value', "rgb("+r+","+g+","+b+")");
					}
				}
			}
		});
		
	});
	$.each(content.find('.color-palet'), function(){
		var hex = $(this).attr('HEX');
		var r = parseInt(hex.substring(1, 3), 16);
		var g = parseInt(hex.substring(3, 5), 16);
		var b = parseInt(hex.substring(5, 7), 16);
		var table = '<table><tr>';
		table += '<td><div class="color-box" style="background-color:'+hex+';"></div></td>';
		table += '<td id="long" style="display:table-cell;"><input type="text" value="'+hex+'" class="color-stat" readonly size="20"></td>';
		table += '<td id="hash" style="display:none;">#<input type="text" value="" class="color-stat" readonly size="5"></td>';
		table += '<td id="dec" style="display:none;">';
		table += 'R:<input type="text" value="'+r+'" class="color-stat" readonly size="1">';
		table += 'G:<input type="text" value="'+g+'" class="color-stat" readonly size="1">';
		table += 'B:<input type="text" value="'+b+'" class="color-stat" readonly size="1"></td>';
		table += '</tr></table>';
		$(this).html(table);
		$(this).attr('R', r);
		$(this).attr('G', g);
		$(this).attr('B', b);
	});
	$('.color-stat').click(function(){
		$(this).select();
	});
});