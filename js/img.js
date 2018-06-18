function cloth(obj) {
	this.html='';
	this.ele=document.querySelector(obj.ele);
	this.init();
}
cloth.prototype={
	init(){
		this.Render();
		this.Close();
	},
	Render(){
		this.html='<canvas id="myCanvas"></canvas><span id="load_span">正在加载...</span>';
		this.ele.innerHTML=this.html;
	},
	Close(){
		var that = this.ele;
		setTimeout(() => {
			$('#big_box').css({
				'display':'none',
				'zIndex':'0'
			})
		}, 4000);
	}
}


function Img(obj){
	this.id = obj.id;
	this.indexmax = obj.index.max;
	this.indexzhong = obj.index.zhong;
	this.indexmin = obj.index.min;
	this.c = document.getElementById(obj.id);
	this.ctx = this.c.getContext("2d");
	this.img = new Image();
	this.index = 0;
	var that = this
	this.timer = setInterval(function(){that.imgs()},50);
	this.c.width = window.screen.width;
	this.c.height = window.screen.height;
}
Img.prototype.imgs = function(){
	this.index++;
	this.src();

	if (this.index == this.indexmax) {
		this.index = this.indexzhong;
	}

}
Img.prototype.src = function(){
	var that = this;
	if (this.index <= 9) {
		this.img.src = "img/loadDemoImg/load0" + this.index + ".png";
	}else{
		this.img.src = "img/loadDemoImg/load" + this.index + ".png";
	}
	this.img.onload = function(){
		that.c.height = that.c.height;
		that.ctx.drawImage(that.img,that.c.width/4,0,that.c.width/2,that.c.height/1.1);
	}
}

