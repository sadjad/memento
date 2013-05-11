
function Trajectory(el,nextel,screenplay_list,trajectory_list) {
	this.el = el;
	this.nextel = nextel;
	this.screenplay = screenplay_list;
	this.trajectory = trajectory_list;
	this.timeouts = [];
}

Trajectory.prototype.start = function() {
	
	//add text list
	for(var i=0;i<this.screenplay.length;i++)
	{
		this.addText(1000*screenplay[i]['time']-200, 
				     screenplay[i]['txt'],
				     trajectory['transition'][i]);
	}

	//add background event list
	this.setDefaultScenario(trajectory['storyboard']['default']['type']);
	for(var i=0;i<trajectory['storyboard']['scenario'].length;i++)
	{
		this.addScenario(1000*trajectory['storyboard']['scenario'][i]['time'],
						 trajectory['storyboard']['scenario'][i]['type'],
						 trajectory['storyboard']['scenario'][i]['options']);
	}
}


Trajectory.prototype.preload = function(){
	this.preloadItem(trajectory['storyboard']['default']);
	for(var i=0;i<trajectory['storyboard']['scenario'].length;i++)
		this.preloadItem(trajectory['storyboard']['scenario'][i]);
}

Trajectory.prototype.preloadItem = function(scenario){
	//yes, closure
	var This = this;
	switch(scenario['type']){
		case 'photo':
			if(scenario['options'] != undefined)
			{
				url = scenario['options']['url'];
				this.preloadImage(url);
			}
			break;
	}
}

Trajectory.prototype.preloadImage = function(url) {
	var image = new Image();
	image.src = url;

	// for now, don't check end of loading
	// we believe downloading the audio is the bottleneck
	// and checking for images download completion is unnecessary
}

Trajectory.prototype.pause = function(){
	for (var i = 0; i < timeouts.length; i++) {
		clearTimeout(this.timeouts[i]);
	}

	this.timeouts = [];
}

/*
	Script Methods
*/

Trajectory.prototype.addText = function(t,txt,type){
	switch(type){
		case 'fade':
			this.addFadingText(t,txt);
			break;
		case 'add-bottom':
			this.addBottomText(t,txt);
	}
}

Trajectory.prototype.addFadingText = function(t,txt) {
	var cel = this.el;
	var nel = this.nextel;
	
	this.timeouts.push(setTimeout(function(){
		if(nel.style.opacity>0.5)
		{
			temp = nel
			nel = cel;
			cel = temp;
		}
		
		if(cel.style.opacity>0.5 && nel.style.opacity>0.5)
		{
			setTimeout(function(){
				nel.innerHTML = txt;
				nel.style.opacity = 1;
			},500);
			cel.style.opacity = 0;
			nel.style.opacity = 0;
		}
		else
		{
			nel.innerHTML = txt;
			cel.style.opacity = 0;
			nel.style.opacity = 1;
		}
	},t));
}

Trajectory.prototype.addBottomText = function(t,txt) {
	var cel = this.el;
	var nel = this.nextel;
	
	this.timeouts.push(setTimeout(function(){
		if(nel.style.opacity>0.5)
		{
			temp = nel
			nel = cel;
			cel = temp;
		}
		
		nel.innerHTML = "<br/>"+txt;
		nel.style.opacity = 1;
	},t));
}

/*
	Scenario Methods
*/

Trajectory.prototype.setDefaultScenario = function(type,opts){
	this.addScenario(-1,type,opts);
}

Trajectory.prototype.addScenario = function(t,type,opts){
	
	//yes, closure
	var This = this;
	
	switch(type){
		case 'white':
			if(t<0)
				this.startWhite();
			else
				this.timeouts.push(setTimeout(function(){
					This.startWhite();
				},t));
			break;
		case 'starrynight':
			if(t<0)
				this.startStarryNight();
			else
				this.timeouts.push(setTimeout(function(){
					This.startStarryNight();
				},t));
			break;
		case 'gradient':
			if(opts != undefined)
			{
				destcolor = opts['to'];
				txtcolor = opts['text-to'];
				if(t<0)
					this.startGradient(destcolor,txtcolor);
				else
					this.queueGradient(t,destcolor,txtcolor);
			}
			break;
		case 'photo':
			if(opts != undefined)
			{
				url = opts['url'];
				if(t<0)
					this.startPhoto(url,
						opts['max-opacity'], 
						opts['start-x'],
						opts['increment-x'],
						opts['start-y'],
						opts['increment-y']);
				else
					this.queuePhoto(t,url,
						opts['max-opacity'], 
						opts['start-x'],
						opts['increment-x'],
						opts['start-y'],
						opts['increment-y']);
			}
			break;
		case 'fonteffect':
			if(opts != undefined)
			{
				if(t<0)
					this.startFontEffect(opts);
				else
					this.queueFontEffect(t,opts);
			}
			break;
			
	}
}

Trajectory.prototype.queueGradient = function(t,destcolor,txtcolor) {
	var This = this;
	this.timeouts.push(setTimeout(function(){
		This.startGradient(destcolor,txtcolor);
	},t))
}

Trajectory.prototype.queuePhoto = function(t, url, max_opacity, startx, incx, starty, incy) {
	var This = this;
	this.timeouts.push(setTimeout(function(){
		This.startPhoto(url, max_opacity, startx, incx, starty, incy);
	},t))
}


Trajectory.prototype.queueFontEffect = function(t,opts) {
	var This = this;
	this.timeouts.push(setTimeout(function(){
		This.startFontEffect(opts);
	},t))
}


Trajectory.prototype.startWhite = function() {
	//do nothing	
}

Trajectory.prototype.startGradient = function(color,txtcolor) {
	document.body.className = 'gradient';
	document.body.style.backgroundColor = color;
	
	if(txtcolor != undefined)
	{
		this.el.className = 'gradient';
		this.nextel.className = 'gradient';
		this.el.style.color = txtcolor;
		this.nextel.style.color = txtcolor;
	}
}

Trajectory.prototype.startFontEffect = function(fontopts) {

	for(var key in fontopts)
	{
		if (!fontopts.hasOwnProperty(key)) {
			continue;
		}
		this.el.style[key] = fontopts[key];
		this.nextel.style[key] = fontopts[key];
		
		if(fontopts[key]==='font-size')
		{
			var sign = '-';
			var size = fontopts[key];
			
			if(size[0]==='+')
				size = size.slice(1,size.length);
			else if(size[0]==='-')
				sign = '+';
				
			//center it
			this.el.style.marginTop = '-'+size;
			this.nextel.style.marginTop = '-'+size;
		}
	}
}

Trajectory.prototype.startPhoto = function(url, max_opacity_r, startx, incx, starty, incy) {
	var tag = document.createElement('div');
	tag.className = 'photo';
	tag.style.backgroundImage = 'url('+url+')';
	tag.style.opacity=0;
	document.body.appendChild(tag);
	
	var inc = +0.01;
	var opacity = 0;
	var x=0;
	var y=0;
	var mx = 0;
	var my = 0;
	var max_opacity = 1.0;
	
	if(max_opacity_r != undefined)
		max_opacity=parseFloat(max_opacity_r);
	
	if(startx != undefined)
		x=parseFloat(startx);
	
	if(starty != undefined)
		y=parseFloat(starty);
	
	if(incx != undefined)
		mx=parseFloat(incx);
	
	if(incy != undefined)
		my=parseFloat(incy);
	
	var ii = setInterval(function(){
		opacity += inc;
		tag.style.opacity = opacity;
		
		tag.style.backgroundPosition = x+'px '+y+'px';
		
		x+=mx;
		y+=my;
		
		if(inc>0 && opacity>max_opacity)
		{
			inc = 0;
			setTimeout(function(){
				inc = -0.01;
			},3500);
		}
		else if(opacity<0.01)
		{
			clearInterval(ii);
			document.body.removeChild(tag);
		}
	},50);
}

Trajectory.prototype.startStarryNight = function() {
	this.el.className = 'starry-text';
	this.nextel.className = 'starry-text';
	document.body.className = 'starry';
	
	// //move the skies.
	// var posx = [0,40,130,70];
	// var posy = [0,60,270,100];
	// this.night_time = setInterval(function(){
	// 	
	// 	var postr = posx[0]+"px "+posy[0]+"px, "+
	// 				posx[1]+"px "+posy[1]+"px, "+
	// 				posx[2]+"px "+posy[2]+"px, "+
	// 				posx[3]+"px "+posy[3]+"px";
	// 	
	// 	document.body.style.backgroundPosition = postr; 
	// 	posx[0]+=0.5;
	// 	posx[1]+=1.5;
	// 	posx[2]+=0.7;
	// 	posx[3]+=1;
	// },30);
}
