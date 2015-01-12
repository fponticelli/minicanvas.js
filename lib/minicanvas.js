(function ($hx_exports) { "use strict";
$hx_exports.minicanvas = $hx_exports.minicanvas || {};
var console = (1,eval)('this').console || {log:function(){}};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_IMap = function() { };
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
};
var minicanvas_MiniCanvas = $hx_exports.minicanvas.MiniCanvas = function(width,height,scaleMode) {
	this.scaleMode = scaleMode;
	this.width = width;
	this.height = height;
	this.processScale();
	this.startTime = performance.now();
	this.events = new haxe_ds_StringMap();
	this.init();
};
minicanvas_MiniCanvas.envIsNode = function() {
	return typeof module !== 'undefined' && module.exports;
};
minicanvas_MiniCanvas.create = function(width,height,scaleMode) {
	if(minicanvas_MiniCanvas.envIsNode()) return new minicanvas_NodeCanvas(width,height,scaleMode); else return new minicanvas_BrowserCanvas(width,height,scaleMode);
};
minicanvas_MiniCanvas.prototype = {
	display: function(name) {
		this.deltaTime = performance.now() - this.startTime;
		if(!minicanvas_MiniCanvas.displayGenerationTime) console.log("generated \"" + name + "\" in " + thx_core_Floats.roundTo(this.deltaTime,2) + "ms");
		this.nativeDisplay(name);
		return this;
	}
	,border: function(weight,color) {
		if(weight == null) weight = 1.0;
		if(null == color) color = "rgba(0,0,0,1)";
		return this.rect(weight / 2,weight / 2,this.width - weight / 2,this.height - weight / 2,weight,color);
	}
	,box: function(handler) {
		var _g1 = 0;
		var _g = this.width;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = 0;
			var _g2 = this.height;
			while(_g3 < _g2) {
				var y = _g3++;
				this.ctx.fillStyle = handler(x / this.width,y / this.height);
				this.ctx.fillRect(x,y,1,1);
			}
		}
		return this;
	}
	,checkboard: function(size,light,dark) {
		if(size == null) size = 8;
		var cols = Math.ceil(this.width / size);
		var rows = Math.ceil(this.height / size);
		var slight;
		if(null == light) slight = "rgba(255,255,255,1)"; else slight = light;
		var sdark;
		if(null == dark) sdark = "rgba(204,204,204,1)"; else sdark = dark;
		var _g = 0;
		while(_g < cols) {
			var c = _g++;
			var _g1 = 0;
			while(_g1 < rows) {
				var r = _g1++;
				if(c % 2 != r % 2) this.ctx.fillStyle = slight; else this.ctx.fillStyle = sdark;
				this.ctx.fillRect(c * size,r * size,size,size);
			}
		}
		return this;
	}
	,circle: function(x,y,radius,weight,lineColor,fillColor) {
		if(weight == null) weight = 1.0;
		if(null != fillColor || null != lineColor) this.ctx.beginPath();
		if(null != fillColor) this.ctx.fillStyle = fillColor;
		if(null != lineColor) {
			this.ctx.strokeStyle = lineColor;
			this.ctx.lineWidth = weight;
		}
		this.ctx.arc(x,y,radius,0,Math.PI * 2,true);
		if(null != fillColor) this.ctx.fill();
		if(null != lineColor) this.ctx.stroke();
	}
	,clear: function() {
		this.ctx.clearRect(0,0,this.width,this.height);
		return this;
	}
	,cross: function(ox,oy,weight,color) {
		if(weight == null) weight = 1.0;
		if(null == ox) ox = this.width / 2 + 0.5;
		if(null == oy) oy = this.height / 2 + 0.5;
		this.lineHorizontal(oy,weight,color);
		this.lineVertical(ox,weight,color);
		return this;
	}
	,dot: function(x,y,radius,color) {
		if(radius == null) radius = 3.0;
		this.ctx.beginPath();
		this.ctx.fillStyle = (function($this) {
			var $r;
			var t;
			{
				var _0 = color;
				if(null == _0) t = null; else t = _0;
			}
			$r = t != null?t:"rgba(204,51,0,1)";
			return $r;
		}(this));
		this.ctx.arc(x,y,radius,0,Math.PI * 2,true);
		this.ctx.fill();
		return this;
	}
	,dotGrid: function(dx,dy,radius,color,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
		if(radius == null) radius = 1.0;
		if(dy == null) dy = 10.0;
		if(dx == null) dx = 10.0;
		if(dx == 0) throw "invalid argument dx, should be different from zero";
		if(dy == 0) throw "invalid argument dy, should be different from zero";
		if(null == color) color = "rgba(170,170,170,1)";
		var py = oy % dy;
		while(py - radius <= this.height) {
			var px = ox % dx;
			while(px - radius <= this.height) {
				this.dot(px + 0.5,py + 0.5,radius,color);
				px += dx;
			}
			py += dy;
		}
		return this;
	}
	,fill: function(color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0,0,this.width,this.height);
		return this;
	}
	,grid: function(dx,dy,weight,color,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
		if(weight == null) weight = 1.0;
		if(dy == null) dy = 10.0;
		if(dx == null) dx = 10.0;
		this.gridHorizontal(dy,weight,color,oy);
		this.gridVertical(dx,weight,color,ox);
		return this;
	}
	,gridHorizontal: function(dy,weight,color,oy) {
		if(oy == null) oy = 0.5;
		if(weight == null) weight = 1.0;
		if(dy == null) dy = 10.0;
		if(dy == 0) throw "invalid argument dy, should be different from zero";
		if(null == color) color = "rgba(204,204,204,1)";
		var py = oy % dy;
		while(py - weight / 2 <= this.height) {
			this.lineHorizontal(py,weight,color);
			py += dy;
		}
		return this;
	}
	,gridVertical: function(dx,weight,color,ox) {
		if(ox == null) ox = 0.5;
		if(weight == null) weight = 1.0;
		if(dx == null) dx = 10.0;
		if(dx == 0) throw "invalid argument dx, should be different from zero";
		if(null == color) color = "rgba(204,204,204,1)";
		var px = ox % dx;
		while(px - weight / 2 <= this.width) {
			this.lineVertical(px,weight,color);
			px += dx;
		}
		return this;
	}
	,gradientHorizontal: function(handler) {
		var _g1 = 0;
		var _g = this.width;
		while(_g1 < _g) {
			var x = _g1++;
			this.ctx.fillStyle = handler(x / this.width);
			this.ctx.fillRect(x,0,1,this.height);
		}
		return this;
	}
	,gradientVertical: function(handler) {
		var _g1 = 0;
		var _g = this.height;
		while(_g1 < _g) {
			var y = _g1++;
			this.ctx.fillStyle = handler(y / this.height);
			this.ctx.fillRect(0,y,this.width,1);
		}
		return this;
	}
	,line: function(x0,y0,x1,y1,weight,color) {
		if(weight == null) weight = 1.0;
		this.ctx.lineWidth = weight;
		var t;
		var _0 = color;
		if(null == _0) t = null; else t = _0;
		if(t != null) this.ctx.strokeStyle = t; else this.ctx.strokeStyle = "rgba(0,0,0,1)";
		this.ctx.beginPath();
		this.ctx.moveTo(x0,y0);
		this.ctx.lineTo(x1,y1);
		this.ctx.stroke();
		return this;
	}
	,lineHorizontal: function(offset,weight,color) {
		if(weight == null) weight = 1.0;
		return this.line(0,offset,this.width,offset,weight,color);
	}
	,lineVertical: function(offset,weight,color) {
		if(weight == null) weight = 1.0;
		return this.line(offset,0,offset,this.height,weight,color);
	}
	,palette: function(colors,padding,margin) {
		if(margin == null) margin = 0.0;
		if(padding == null) padding = 2.0;
		var rows = colors.length;
		var h = (this.height - 2 * margin - (rows - 1) * padding) / rows;
		var py = margin;
		var _g = 0;
		while(_g < colors.length) {
			var row = colors[_g];
			++_g;
			var cols = row.length;
			var w = (this.width - 2 * margin - (cols - 1) * padding) / cols;
			var px = margin;
			var _g1 = 0;
			while(_g1 < row.length) {
				var col = row[_g1];
				++_g1;
				this.ctx.fillStyle = col;
				this.ctx.fillRect(px,py,w,h);
				px += w + padding;
			}
			py += h + padding;
		}
		return this;
	}
	,rect: function(x0,y0,x1,y1,weight,lineColor,fillColor) {
		if(weight == null) weight = 1.0;
		if(null != fillColor) {
			this.ctx.fillStyle = fillColor;
			this.ctx.fillRect(x0,y0,x1 - x0,y1 - y0);
		}
		if(null != lineColor) {
			this.ctx.lineWidth = weight;
			this.ctx.strokeStyle = lineColor;
			this.ctx.strokeRect(x0,y0,x1 - x0,y1 - y0);
		}
		return this;
	}
	,animate: function(x,y) {
		var _g = this;
		var interaction = new minicanvas_CanvasInteraction(this,(function($this) {
			var $r;
			var t;
			{
				var _0 = x;
				if(null == _0) t = null; else t = _0;
			}
			$r = t != null?t:$this.width / 2;
			return $r;
		}(this)),(function($this) {
			var $r;
			var t1;
			{
				var _01 = y;
				if(null == _01) t1 = null; else t1 = _01;
			}
			$r = t1 != null?t1:$this.height;
			return $r;
		}(this)),function(stack) {
			_g.resolveStack(stack,$bind(_g,_g.afterAnimate));
			_g.storeFrame();
		});
		this.beforeAnimate();
		return interaction;
	}
	,animateNode: function(x,y) {
		if(this.isNode) return this.animate(x,y); else return new minicanvas_Interaction(this);
	}
	,animateBrowser: function(x,y) {
		if(this.isBrowser) return this.animate(x,y); else return new minicanvas_Interaction(this);
	}
	,storeFrame: function(times) {
		if(times == null) times = 1;
		return this;
	}
	,context: function(callback) {
		callback(this.ctx,this.width,this.height);
		return this;
	}
	,'with': function(callback) {
		callback(this);
		return this;
	}
	,onClick: function(callback) {
		return this.onMouseEvent("click",null,callback);
	}
	,onDown: function(callback) {
		return this.onMouseEvent("mousedown",null,callback);
	}
	,onMove: function(callback) {
		return this.onMouseEvent("mousemove",null,callback);
	}
	,onTrail: function(callback) {
		var _g = this;
		var first = true;
		var x0 = 0.0;
		var y0 = 0.0;
		var x1;
		var y1;
		var listener = function(e) {
			if(first) {
				x0 = e.x;
				y0 = e.y;
				first = false;
			} else {
				x1 = e.x;
				y1 = e.y;
				callback({ mini : _g, x0 : x0, y0 : y0, x1 : x1, y1 : y1});
				x0 = x1;
				y0 = y1;
			}
		};
		return this.onMouseEvent("mousemove","trail",listener);
	}
	,onUp: function(callback) {
		return this.onMouseEvent("mouseup",null,callback);
	}
	,offClick: function() {
		return this.offMouseEvent("click");
	}
	,offDown: function() {
		return this.offMouseEvent("mousedown");
	}
	,offMove: function() {
		return this.offMouseEvent("mousemove");
	}
	,offTrail: function() {
		return this.offMouseEvent("mousemove","trail");
	}
	,offUp: function() {
		return this.offMouseEvent("mouseup");
	}
	,click: function(x,y) {
		return this.trigger("click",x,y);
	}
	,down: function(x,y) {
		return this.trigger("mousedown",x,y);
	}
	,move: function(x,y) {
		if(x < 0 || x > this.width || y < 0 || y > this.height) return this;
		this.trigger("mousemove",x,y);
		this.trigger("trail",x,y);
		return this;
	}
	,up: function(x,y) {
		return this.trigger("mouseup",x,y);
	}
	,onMouseEvent: function(type,name,callback) {
		var _g = this;
		if(null == name) name = type;
		this.offMouseEvent(type,name);
		var listener = function(e) {
			var rect = _g.canvas.getBoundingClientRect();
			_g.trigger(name,e.clientX - rect.left,e.clientY - rect.top);
		};
		this.events.h["$" + name] = { callback : callback, listener : listener};
		if(this.isBrowser) this.canvas.addEventListener(type,listener,false);
		return this;
	}
	,offMouseEvent: function(type,name) {
		if(null == name) name = type;
		var item = this.events.h["$" + name];
		if(null == item) return this;
		this.events.remove(name);
		if(this.isBrowser) this.canvas.removeEventListener(type,item.listener,false);
		return this;
	}
	,trigger: function(name,x,y) {
		var item = this.events.h["$" + name];
		if(null == item) return this;
		item.callback({ mini : this, x : x, y : y});
		return this;
	}
	,getDevicePixelRatio: function() {
		throw "abstract method getDevicePixelRatio()";
	}
	,getBackingStoreRatio: function() {
		throw "abstract method getBackingStoreRatio()";
	}
	,init: function() {
		throw "abstract method init()";
		return;
	}
	,nativeDisplay: function(name) {
		throw "abstract method nativeDisplay()";
		return;
	}
	,processScale: function() {
		var _g = this.scaleMode;
		switch(_g[1]) {
		case 1:
			var ratio = this.getDevicePixelRatio() / this.getBackingStoreRatio();
			if(ratio != 1) this.scaleMode = minicanvas_ScaleMode.Scaled(ratio); else this.scaleMode = minicanvas_ScaleMode.NoScale;
			break;
		default:
		}
	}
	,beforeAnimate: function() {
	}
	,afterAnimate: function() {
	}
	,resolveStack: function(stack,done) {
		if(stack.length == 0) return done();
		(stack.shift())();
		this.storeFrame();
		this.resolveStack(stack,done);
	}
};
var minicanvas_ScaleMode = { __constructs__ : ["NoScale","Auto","Scaled"] };
minicanvas_ScaleMode.NoScale = ["NoScale",0];
minicanvas_ScaleMode.NoScale.toString = $estr;
minicanvas_ScaleMode.NoScale.__enum__ = minicanvas_ScaleMode;
minicanvas_ScaleMode.Auto = ["Auto",1];
minicanvas_ScaleMode.Auto.toString = $estr;
minicanvas_ScaleMode.Auto.__enum__ = minicanvas_ScaleMode;
minicanvas_ScaleMode.Scaled = function(v) { var $x = ["Scaled",2,v]; $x.__enum__ = minicanvas_ScaleMode; $x.toString = $estr; return $x; };
var minicanvas_BrowserCanvas = function(width,height,scaleMode) {
	this.isNode = false;
	this.isBrowser = true;
	if(null == scaleMode) scaleMode = minicanvas_BrowserCanvas.defaultScaleMode;
	minicanvas_MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas_BrowserCanvas.devicePixelRatio = function() {
	return window.devicePixelRatio || 1;
};
minicanvas_BrowserCanvas.backingStoreRatio = function() {
	if(minicanvas_BrowserCanvas._backingStoreRatio == 0) {
		var canvas;
		var _this = window.document;
		canvas = _this.createElement("canvas");
		var context = canvas.getContext("2d");
		minicanvas_BrowserCanvas._backingStoreRatio = (function(c) {
        return c.webkitBackingStorePixelRatio ||
          c.mozBackingStorePixelRatio ||
          c.msBackingStorePixelRatio ||
          c.oBackingStorePixelRatio ||
          c.backingStorePixelRatio || 1;
        })(context);
	}
	return minicanvas_BrowserCanvas._backingStoreRatio;
};
minicanvas_BrowserCanvas.__super__ = minicanvas_MiniCanvas;
minicanvas_BrowserCanvas.prototype = $extend(minicanvas_MiniCanvas.prototype,{
	append: function(name) {
		var figure = window.document.createElement("figure");
		var caption = window.document.createElement("figcaption");
		figure.className = "minicanvas";
		figure.appendChild(this.canvas);
		caption.innerHTML = thx_core_Strings.humanize(name) + (minicanvas_MiniCanvas.displayGenerationTime?" <span class=\"info\">(" + thx_core_Floats.roundTo(this.deltaTime,2) + "ms)</span>":"");
		figure.appendChild(caption);
		minicanvas_BrowserCanvas.parentNode.appendChild(figure);
	}
	,init: function() {
		var _this = window.document;
		this.canvas = _this.createElement("canvas");
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas.width = Math.round(this.width * v);
				this.canvas.height = Math.round(this.height * v);
				this.canvas.style.width = "" + this.width + "px";
				this.canvas.style.height = "" + this.height + "px";
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,getDevicePixelRatio: function() {
		return minicanvas_BrowserCanvas.devicePixelRatio();
	}
	,getBackingStoreRatio: function() {
		return minicanvas_BrowserCanvas.backingStoreRatio();
	}
	,nativeDisplay: function(name) {
		this.append(name);
	}
	,beforeAnimate: function() {
		this.canvas.style.pointerEvents = "none";
	}
	,afterAnimate: function() {
		this.canvas.style.pointerEvents = "auto";
	}
	,resolveStack: function(stack,done) {
		if(stack.length == 0) return done();
		(stack.shift())();
		this.storeFrame();
		thx_core_Timer.delay((function(f,a1,a2) {
			return function() {
				f(a1,a2);
			};
		})($bind(this,this.resolveStack),stack,done),50);
	}
});
var minicanvas_Interaction = function(mini) {
	this.mini = mini;
};
minicanvas_Interaction.prototype = {
	click: function(x,y) {
		return this;
	}
	,down: function(x,y) {
		return this;
	}
	,move: function(x,y,delta) {
		if(delta == null) delta = 9;
		return this;
	}
	,up: function(x,y) {
		return this;
	}
	,sleep: function(frames) {
		return this;
	}
	,done: function() {
		return this.mini;
	}
	,frame: function(callback) {
		callback(this.mini);
		return this;
	}
};
var minicanvas_CanvasInteraction = function(mini,x,y,done) {
	minicanvas_Interaction.call(this,mini);
	this.x = x;
	this.y = y;
	this.stack = [];
	this._done = done;
};
minicanvas_CanvasInteraction.__super__ = minicanvas_Interaction;
minicanvas_CanvasInteraction.prototype = $extend(minicanvas_Interaction.prototype,{
	click: function(x,y) {
		if(this.x != x || this.y != y) this.move(x,y);
		this.stack.push((function(f,x1,y1) {
			return function() {
				return f(x1,y1);
			};
		})(($_=this.mini,$bind($_,$_.click)),x,y));
		return this;
	}
	,down: function(x,y) {
		if(this.x != x || this.y != y) this.move(x,y);
		this.stack.push((function(f,x1,y1) {
			return function() {
				return f(x1,y1);
			};
		})(($_=this.mini,$bind($_,$_.down)),x,y));
		return this;
	}
	,frame: function(callback) {
		this.stack.push((function(f,a1) {
			return function() {
				f(a1);
			};
		})(callback,this.mini));
		return this;
	}
	,move: function(x,y,delta) {
		if(delta == null) delta = 9;
		var dist = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));
		var steps = Math.ceil(dist / delta);
		var dx;
		var dy;
		var step;
		var _g = 0;
		while(_g < steps) {
			var i = _g++;
			step = i / steps;
			dx = Math.round(thx_core_Floats.interpolate(step,this.x,x));
			dy = Math.round(thx_core_Floats.interpolate(step,this.y,y));
			this.stack.push((function(f,x1,y1) {
				return function() {
					return f(x1,y1);
				};
			})(($_=this.mini,$bind($_,$_.move)),dx,dy));
		}
		this.x = x;
		this.y = y;
		return this;
	}
	,up: function(x,y) {
		if(this.x != x || this.y != y) this.move(x,y);
		this.stack.push((function(f,x1,y1) {
			return function() {
				return f(x1,y1);
			};
		})(($_=this.mini,$bind($_,$_.up)),x,y));
		return this;
	}
	,sleep: function(frames) {
		var _g = 0;
		while(_g < frames) {
			var i = _g++;
			this.stack.push(function() {
			});
		}
		return this;
	}
	,done: function() {
		this._done(this.stack);
		return this.mini;
	}
});
var minicanvas_NodeCanvas = function(width,height,scaleMode) {
	this.hasFrames = false;
	this.isNode = true;
	this.isBrowser = false;
	if(null == scaleMode) scaleMode = minicanvas_NodeCanvas.defaultScaleMode;
	minicanvas_MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas_NodeCanvas.create = function(width,height,scaleMode) {
	return new minicanvas_MiniCanvas(width,height,scaleMode);
};
minicanvas_NodeCanvas.__super__ = minicanvas_MiniCanvas;
minicanvas_NodeCanvas.prototype = $extend(minicanvas_MiniCanvas.prototype,{
	save: function(name) {
		var encoder = this.ensureEncoder();
		encoder.addFrame(this.ctx);
		encoder.save(name,function(file) {
			console.log("saved " + file);
		});
	}
	,storeFrame: function(times) {
		if(times == null) times = 1;
		this.hasFrames = true;
		if(times <= 0) times = 1;
		var _g = 0;
		while(_g < times) {
			var i = _g++;
			this.ensureEncoder().addFrame(this.ctx);
		}
		return this;
	}
	,init: function() {
		var Canvas = require("canvas");
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas = new Canvas(this.width * v,this.height * v);
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas = new Canvas(this.width,this.height);
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,getDevicePixelRatio: function() {
		return 1.0;
	}
	,getBackingStoreRatio: function() {
		return 1.0;
	}
	,nativeDisplay: function(name) {
		this.save(name);
	}
	,ensureEncoder: function() {
		if(null != this.encoder) return this.encoder;
		if(this.hasFrames) return this.encoder = new minicanvas_node_GifEncoder(this.width,this.height); else return this.encoder = new minicanvas_node_PNGEncoder(this.canvas);
	}
});
var minicanvas_node_IEncoder = function() { };
var minicanvas_node_GifEncoder = function(width,height) {
	this.frames = 0;
	this.encoder = (function(w, h, self) {
      var GIFEncoder = require('gifencoder'),
          encoder = new GIFEncoder(w, h);
      self.stream = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(50);
      encoder.setQuality(10);
      return encoder;
    })(width,height,this);
};
minicanvas_node_GifEncoder.__interfaces__ = [minicanvas_node_IEncoder];
minicanvas_node_GifEncoder.prototype = {
	addFrame: function(ctx) {
		this.encoder.addFrame(ctx);
		this.frames++;
	}
	,save: function(name,callback) {
		this.stream.pipe(require("fs").createWriteStream("" + minicanvas_NodeCanvas.imagePath + "/" + name + ".gif"));
		callback("" + name + ".gif (frames " + this.frames + ")");
	}
};
var minicanvas_node_PNGEncoder = function(canvas) {
	this.canvas = canvas;
};
minicanvas_node_PNGEncoder.__interfaces__ = [minicanvas_node_IEncoder];
minicanvas_node_PNGEncoder.prototype = {
	addFrame: function(ctx) {
	}
	,save: function(name,callback) {
		var fs = require("fs");
		var out = fs.createWriteStream("" + minicanvas_NodeCanvas.imagePath + "/" + name + ".png");
		var stream = this.canvas.pngStream();
		stream.on("data",function(chunk) {
			out.write(chunk);
		});
		stream.on("end",function(_) {
			callback("" + name + ".png");
		});
	}
};
var thx_core_Floats = function() { };
thx_core_Floats.interpolate = function(f,a,b) {
	return (b - a) * f + a;
};
thx_core_Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
var thx_core_Strings = function() { };
thx_core_Strings.humanize = function(s) {
	return StringTools.replace(thx_core_Strings.underscore(s),"_"," ");
};
thx_core_Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
var thx_core_Timer = function() { };
thx_core_Timer.delay = function(callback,delayms) {
	return (function(f,id) {
		return function() {
			f(id);
		};
	})(thx_core_Timer.clear,setTimeout(callback,delayms));
};
thx_core_Timer.clear = function(id) {
	clearTimeout(id);
	return;
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hx_exports.MiniCanvas = minicanvas_MiniCanvas;
var scope = ("undefined" !== typeof window && window) || ("undefined" !== typeof global && global) || this;
if(!scope.setImmediate) scope.setImmediate = function(callback) {
	scope.setTimeout(callback,0);
};
var lastTime = 0;
var vendors = ["webkit","moz"];
var x = 0;
while(x < vendors.length && !scope.requestAnimationFrame) {
	scope.requestAnimationFrame = scope[vendors[x] + "RequestAnimationFrame"];
	scope.cancelAnimationFrame = scope[vendors[x] + "CancelAnimationFrame"] || scope[vendors[x] + "CancelRequestAnimationFrame"];
	x++;
}
if(!scope.requestAnimationFrame) scope.requestAnimationFrame = function(callback1) {
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0,16 - (currTime - lastTime));
	var id = scope.setTimeout(function() {
		callback1(currTime + timeToCall);
	},timeToCall);
	lastTime = currTime + timeToCall;
	return id;
};
if(!scope.cancelAnimationFrame) scope.cancelAnimationFrame = function(id1) {
	scope.clearTimeout(id1);
};
if(typeof(scope.performance) == "undefined") scope.performance = { };
if(typeof(scope.performance.now) == "undefined") {
	var nowOffset = new Date().getTime();
	if(scope.performance.timing && scope.performance.timing.navigationStart) nowOffset = scope.performance.timing.navigationStart;
	var now = function() {
		return new Date() - nowOffset;
	};
	scope.performance.now = now;
}
minicanvas_MiniCanvas.displayGenerationTime = false;
minicanvas_BrowserCanvas._backingStoreRatio = 0;
minicanvas_BrowserCanvas.defaultScaleMode = minicanvas_ScaleMode.Auto;
minicanvas_BrowserCanvas.parentNode = typeof document != 'undefined' && document.body;
minicanvas_NodeCanvas.defaultScaleMode = minicanvas_ScaleMode.NoScale;
minicanvas_NodeCanvas.imagePath = "images";
})(typeof window != "undefined" ? window : exports);
