function writePane(titl, desc, url) {
	var body = '<div class="panel panel-default">';
	body += '<div class="panel-heading">'+titl+'</div>';
	body += '<div class="panel-body">'+desc+'</div>';
	body += '<div class="panel-footer"><a href="'+url+'">'+url+'</a></div>';
	body += '</div>';
	document.write(body);
}