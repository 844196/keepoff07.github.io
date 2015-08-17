function writeHeader(open) {
	var head = '<nav class="navbar navbar-default navbar-fixed-top">';
	head += '<div class="container-fluid">';
	head += '<div class="navbar-header">';
	
	head += '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarEexample7">';
	head += '<span class="sr-only">Toggle navigation</span>';
	head += '<span class="icon-bar"></span>';
	head += '<span class="icon-bar"></span>';
	head += '<span class="icon-bar"></span>';
	head += '</button>';
	
	head += '<a class="navbar-brand" href="https://gist.github.com/keepoff07">';
	head += 'Gist List';
	head += '</a>';
	head += '</div>';
	
	head += '<div class="collapse navbar-collapse" id="navbarEexample7">';
	head += '<ul class="nav navbar-nav">';
	
	if(open == 1) {
		head += '<li><a href="sub1.html">CraftBukkit/Spigot</a></li>';
		head += '<li class="active"><a href="sub2.html">Minecraft</a></li>';
		head += '<li><a href="sub3.html">その他</a></li>';
	} else if(open == 2) {
		head += '<li><a href="sub1.html">CraftBukkit/Spigot</a></li>';
		head += '<li><a href="sub2.html">Minecraft</a></li>';
		head += '<li class="active"><a href="sub3.html">その他</a></li>';
	} else {
		head += '<li class="active"><a href="sub1.html">CraftBukkit/Spigot</a></li>';
		head += '<li><a href="sub2.html">Minecraft</a></li>';
		head += '<li><a href="sub3.html">その他</a></li>';
	}

	head += '</ul>';
	head += '</div>';
	head += '</div>';
	head += '</nav>';
	document.write(head);
}