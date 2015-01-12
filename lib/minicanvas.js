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
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		var tmp;
		if((this.r.m != null?n >= 0:false)?n < this.r.m.length:false) tmp = this.r.m[n]; else throw "EReg::matched";
		return tmp;
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		var tmp;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			tmp = b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			tmp = b1;
		}
		return tmp;
	}
	,split: function(s) {
		return s.replace(this.r,"#__delim__#").split("#__delim__#");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				var x = HxOverrides.substr(s,offset,null);
				buf_b += x == null?"null":"" + x;
				break;
			}
			var p = this.matchedPos();
			var x1 = HxOverrides.substr(s,offset,p.pos - offset);
			buf_b += x1 == null?"null":"" + x1;
			var x2 = f(this);
			buf_b += x2 == null?"null":"" + x2;
			if(p.len == 0) {
				var x3 = HxOverrides.substr(s,p.pos,1);
				buf_b += x3 == null?"null":"" + x3;
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if((!this.r.global?offset > 0:false)?offset < s.length:false) {
			var x4 = HxOverrides.substr(s,offset,null);
			buf_b += x4 == null?"null":"" + x4;
		}
		return buf_b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(((pos != null?pos != 0:false)?len != null:false)?len < 0:false) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length?HxOverrides.substr(s,0,start.length) == start:false;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen?HxOverrides.substr(s,slen - elen,elen) == end:false;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return !(c > 8?c < 14:false)?c == 32:true;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l?StringTools.isSpace(s,r):false) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l?StringTools.isSpace(s,l - r - 1):false) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = true;
haxe_CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.exceptionStack = function() {
	return [];
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		b.b += m == null?"null":"" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += file == null?"null":"" + file;
		b.b += " line ";
		b.b += line == null?"null":"" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		b.b += cname == null?"null":"" + cname;
		b.b += ".";
		b.b += meth == null?"null":"" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		b.b += n == null?"null":"" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe_StackItem.Module(line));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe_ds_StringMap
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array)?o.__enum__ == null:false) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	var tmp;
	if(t == "function") {
		if(!o.__name__) tmp = o.__ename__; else tmp = true;
	} else tmp = false;
	if(tmp) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if((tostr != null?tostr != Object.toString:false)?typeof(tostr) == "function":false) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp?!o.hasOwnProperty(k):false) {
			continue;
		}
		if(!(!(!(!(k == "prototype")?k == "__class__":true)?k == "__super__":true)?k == "__interfaces__":true)?k == "__properties__":true) {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(!(i1 == cl)?js_Boot.__interfLoop(i1,cl):true) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array)?o.__enum__ == null:false;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object"?js_Boot.__isNativeObj(cl):false) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(!(!(!(name == "Object")?name == "Function":true)?name == "Math":true)?name == "JSON":true) return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
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
minicanvas_MiniCanvas.__name__ = true;
minicanvas_MiniCanvas.envIsNode = function() {
	return typeof module !== 'undefined' && module.exports;
};
minicanvas_MiniCanvas.create = function(width,height,scaleMode) {
	return minicanvas_MiniCanvas.envIsNode()?new minicanvas_NodeCanvas(width,height,scaleMode):new minicanvas_BrowserCanvas(width,height,scaleMode);
};
minicanvas_MiniCanvas.prototype = {
	display: function(name) {
		this.deltaTime = performance.now() - this.startTime;
		if(!minicanvas_MiniCanvas.displayGenerationTime) console.log("generated \"" + name + "\" in " + thx_core_Floats.roundTo(this.deltaTime,2) + "ms");
		this.nativeDisplay(name);
		return this;
	}
	,border: function(weight,color,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
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
		var slight = null == light?"rgba(255,255,255,1)":light;
		var sdark = null == dark?"rgba(204,204,204,1)":dark;
		var _g = 0;
		while(_g < cols) {
			var c = _g++;
			var _g1 = 0;
			while(_g1 < rows) {
				var r = _g1++;
				this.ctx.fillStyle = c % 2 != r % 2?slight:sdark;
				this.ctx.fillRect(c * size,r * size,size,size);
			}
		}
		return this;
	}
	,circle: function(x,y,radius,weight,lineColor,fillColor) {
		if(weight == null) weight = 1.0;
		if(!(null != fillColor)?null != lineColor:true) this.ctx.beginPath();
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
		var tmp;
		var tmp1;
		var _0 = color;
		if(null == _0) tmp1 = null; else tmp1 = _0;
		var t = tmp1;
		if(t != null) tmp = t; else tmp = "rgba(204,51,0,1)";
		this.ctx.fillStyle = tmp;
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
		var tmp;
		var tmp1;
		var _0 = color;
		if(null == _0) tmp1 = null; else tmp1 = _0;
		var t = tmp1;
		if(t != null) tmp = t; else tmp = "rgba(0,0,0,1)";
		this.ctx.strokeStyle = tmp;
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
	,sample: function(name,callback) {
		this.context(callback);
		this.display(name);
		return this;
	}
	,storeFrame: function(times) {
		if(times == null) times = 1;
		return this;
	}
	,animate: function(x,y) {
		var _g = this;
		var tmp;
		var tmp2;
		var _0 = x;
		if(null == _0) tmp2 = null; else tmp2 = _0;
		var t = tmp2;
		if(t != null) tmp = t; else tmp = this.width / 2;
		var tmp1;
		var tmp3;
		var _01 = y;
		if(null == _01) tmp3 = null; else tmp3 = _01;
		var t1 = tmp3;
		if(t1 != null) tmp1 = t1; else tmp1 = this.height;
		var interaction = new minicanvas_CanvasInteraction(this,tmp,tmp1,function(stack) {
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
	,context: function(callback) {
		callback(this.ctx,this.width,this.height);
		return this;
	}
	,'with': function(callback) {
		callback(this,this.width,this.height);
		return this;
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
			if(first) false; else {
				x1 = e.x;
				y1 = e.y;
				callback({ mini : _g, x0 : x0, y0 : y0, x1 : x1, y1 : y1});
				y1;
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
		if(!(!(!(x < 0)?x > this.width:true)?y < 0:true)?y > this.height:true) return this;
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
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 409, className : "minicanvas.MiniCanvas", methodName : "getDevicePixelRatio"});
	}
	,getBackingStoreRatio: function() {
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 412, className : "minicanvas.MiniCanvas", methodName : "getBackingStoreRatio"});
	}
	,init: function() {
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 415, className : "minicanvas.MiniCanvas", methodName : "init"});
	}
	,nativeDisplay: function(name) {
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 418, className : "minicanvas.MiniCanvas", methodName : "nativeDisplay"});
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
	,__class__: minicanvas_MiniCanvas
};
var minicanvas_ScaleMode = { __ename__ : true, __constructs__ : ["NoScale","Auto","Scaled"] };
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
minicanvas_BrowserCanvas.__name__ = true;
minicanvas_BrowserCanvas.devicePixelRatio = function() {
	return window.devicePixelRatio || 1;
};
minicanvas_BrowserCanvas.backingStoreRatio = function() {
	if(minicanvas_BrowserCanvas._backingStoreRatio == 0) {
		var tmp;
		var _this = window.document;
		tmp = _this.createElement("canvas");
		var canvas = tmp;
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
		var tmp;
		var _this = window.document;
		tmp = _this.createElement("canvas");
		this.canvas = tmp;
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
		var tmp;
		var f = $bind(this,this.resolveStack);
		var a1 = stack;
		var a2 = done;
		tmp = function() {
			f(a1,a2);
		};
		thx_core_Timer.delay(tmp,50);
	}
	,__class__: minicanvas_BrowserCanvas
});
var minicanvas_Interaction = function(mini) {
	this.mini = mini;
};
minicanvas_Interaction.__name__ = true;
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
	,__class__: minicanvas_Interaction
};
var minicanvas_CanvasInteraction = function(mini,x,y,done) {
	minicanvas_Interaction.call(this,mini);
	this.x = x;
	this.y = y;
	this.stack = [];
	this._done = done;
};
minicanvas_CanvasInteraction.__name__ = true;
minicanvas_CanvasInteraction.__super__ = minicanvas_Interaction;
minicanvas_CanvasInteraction.prototype = $extend(minicanvas_Interaction.prototype,{
	click: function(x,y) {
		if(!(this.x != x)?this.y != y:true) this.move(x,y);
		var tmp;
		var f = ($_=this.mini,$bind($_,$_.click));
		var x1 = x;
		var y1 = y;
		tmp = function() {
			return f(x1,y1);
		};
		this.stack.push(tmp);
		return this;
	}
	,down: function(x,y) {
		if(!(this.x != x)?this.y != y:true) this.move(x,y);
		var tmp;
		var f = ($_=this.mini,$bind($_,$_.down));
		var x1 = x;
		var y1 = y;
		tmp = function() {
			return f(x1,y1);
		};
		this.stack.push(tmp);
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
			var tmp;
			var f = [($_=this.mini,$bind($_,$_.move))];
			var x1 = [dx];
			var y1 = [dy];
			tmp = (function(y1,x1,f) {
				return function() {
					return f[0](x1[0],y1[0]);
				};
			})(y1,x1,f);
			this.stack.push(tmp);
		}
		this.x = x;
		this.y = y;
		return this;
	}
	,up: function(x,y) {
		if(!(this.x != x)?this.y != y:true) this.move(x,y);
		var tmp;
		var f = ($_=this.mini,$bind($_,$_.up));
		var x1 = x;
		var y1 = y;
		tmp = function() {
			return f(x1,y1);
		};
		this.stack.push(tmp);
		return this;
	}
	,sleep: function(frames) {
		var _g = 0;
		while(_g < frames) {
			_g++;
			this.stack.push(function() {
			});
		}
		return this;
	}
	,done: function() {
		this._done(this.stack);
		return this.mini;
	}
	,__class__: minicanvas_CanvasInteraction
});
var minicanvas_NodeCanvas = function(width,height,scaleMode) {
	this.hasFrames = false;
	this.isNode = true;
	this.isBrowser = false;
	if(null == scaleMode) scaleMode = minicanvas_NodeCanvas.defaultScaleMode;
	minicanvas_MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas_NodeCanvas.__name__ = true;
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
			_g++;
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
	,__class__: minicanvas_NodeCanvas
});
var minicanvas_node_IEncoder = function() { };
minicanvas_node_IEncoder.__name__ = true;
minicanvas_node_IEncoder.prototype = {
	__class__: minicanvas_node_IEncoder
};
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
minicanvas_node_GifEncoder.__name__ = true;
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
	,__class__: minicanvas_node_GifEncoder
};
var minicanvas_node_PNGEncoder = function(canvas) {
	this.canvas = canvas;
};
minicanvas_node_PNGEncoder.__name__ = true;
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
	,__class__: minicanvas_node_PNGEncoder
};
var thx_core_Arrays = function() { };
thx_core_Arrays.__name__ = true;
thx_core_Arrays.after = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0) + 1);
};
thx_core_Arrays.all = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(!predicate(item)) return false;
	}
	return true;
};
thx_core_Arrays.any = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(predicate(item)) return true;
	}
	return false;
};
thx_core_Arrays.at = function(arr,indexes) {
	return indexes.map(function(i) {
		return arr[i];
	});
};
thx_core_Arrays.before = function(array,element) {
	return array.slice(0,HxOverrides.indexOf(array,element,0));
};
thx_core_Arrays.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v;
	});
};
thx_core_Arrays.contains = function(array,element,eq) {
	if(null == eq) return HxOverrides.indexOf(array,element,0) >= 0; else {
		var _g1 = 0;
		var _g = array.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(eq(array[i],element)) return true;
		}
		return false;
	}
};
thx_core_Arrays.cross = function(a,b) {
	var r = [];
	var _g = 0;
	while(_g < a.length) {
		var va = a[_g];
		++_g;
		var _g1 = 0;
		while(_g1 < b.length) {
			var vb = b[_g1];
			++_g1;
			r.push([va,vb]);
		}
	}
	return r;
};
thx_core_Arrays.crossMulti = function(array) {
	var acopy = array.slice();
	var result = acopy.shift().map(function(v) {
		return [v];
	});
	while(acopy.length > 0) {
		var array1 = acopy.shift();
		var tresult = result;
		result = [];
		var _g = 0;
		while(_g < array1.length) {
			var v1 = array1[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < tresult.length) {
				var ar = tresult[_g1];
				++_g1;
				var t = ar.slice();
				t.push(v1);
				result.push(t);
			}
		}
	}
	return result;
};
thx_core_Arrays.eachPair = function(array,callback) {
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = i;
		var _g2 = array.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(!callback(array[i],array[j])) return;
		}
	}
};
thx_core_Arrays.equals = function(a,b,equality) {
	if(!(!(a == null)?b == null:true)?a.length != b.length:true) return false;
	if(null == equality) equality = thx_core_Functions.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!equality(a[i],b[i])) return false;
	}
	return true;
};
thx_core_Arrays.extract = function(a,predicate) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(predicate(a[i])) return a.splice(i,1)[0];
	}
	return null;
};
thx_core_Arrays.find = function(array,predicate) {
	var _g = 0;
	while(_g < array.length) {
		var item = array[_g];
		++_g;
		if(predicate(item)) return item;
	}
	return null;
};
thx_core_Arrays.findLast = function(array,predicate) {
	var len = array.length;
	var j;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		j = len - i - 1;
		if(predicate(array[j])) return array[j];
	}
	return null;
};
thx_core_Arrays.first = function(array) {
	return array[0];
};
thx_core_Arrays.flatMap = function(array,callback) {
	var tmp;
	var array1 = array.map(callback);
	tmp = Array.prototype.concat.apply([],array1);
	return tmp;
};
thx_core_Arrays.flatten = function(array) {
	return Array.prototype.concat.apply([],array);
};
thx_core_Arrays.from = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0));
};
thx_core_Arrays.head = function(array) {
	return array[0];
};
thx_core_Arrays.ifEmpty = function(value,alt) {
	return (null != value?0 != value.length:false)?value:alt;
};
thx_core_Arrays.initial = function(array) {
	return array.slice(0,array.length - 1);
};
thx_core_Arrays.isEmpty = function(array) {
	return array.length == 0;
};
thx_core_Arrays.last = function(array) {
	return array[array.length - 1];
};
thx_core_Arrays.mapi = function(array,callback) {
	var r = [];
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		r.push(callback(array[i],i));
	}
	return r;
};
thx_core_Arrays.mapRight = function(array,callback) {
	var i = array.length;
	var result = [];
	while(--i >= 0) result.push(callback(array[i]));
	return result;
};
thx_core_Arrays.order = function(array,sort) {
	var n = array.slice();
	n.sort(sort);
	return n;
};
thx_core_Arrays.pull = function(array,toRemove,equality) {
	var _g = 0;
	while(_g < toRemove.length) {
		var item = toRemove[_g];
		++_g;
		thx_core_Arrays.removeAll(array,item,equality);
	}
};
thx_core_Arrays.pushIf = function(array,condition,value) {
	if(condition) array.push(value);
	return array;
};
thx_core_Arrays.reduce = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_core_Arrays.resize = function(array,length,fill) {
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_core_Arrays.reducei = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_core_Arrays.reduceRight = function(array,callback,initial) {
	var i = array.length;
	while(--i >= 0) initial = callback(initial,array[i]);
	return initial;
};
thx_core_Arrays.removeAll = function(array,element,equality) {
	if(null == equality) equality = thx_core_Functions.equality;
	var i = array.length;
	while(--i >= 0) if(equality(array[i],element)) array.splice(i,1);
};
thx_core_Arrays.rest = function(array) {
	return array.slice(1);
};
thx_core_Arrays.sample = function(array,n) {
	var tmp;
	var b = array.length;
	if(n < b) tmp = n; else tmp = b;
	n = tmp;
	var copy = array.slice();
	var result = [];
	var _g = 0;
	while(_g < n) {
		_g++;
		result.push(copy.splice(Std.random(copy.length),1)[0]);
	}
	return result;
};
thx_core_Arrays.sampleOne = function(array) {
	return array[Std.random(array.length)];
};
thx_core_Arrays.shuffle = function(a) {
	var t = thx_core_Ints.range(a.length);
	var array = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		array.push(a[index]);
	}
	return array;
};
thx_core_Arrays.take = function(arr,n) {
	return arr.slice(0,n);
};
thx_core_Arrays.takeLast = function(arr,n) {
	return arr.slice(arr.length - n);
};
thx_core_Arrays.rotate = function(arr) {
	var result = [];
	var _g1 = 0;
	var _g = arr[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		var row = [];
		result.push(row);
		var _g3 = 0;
		var _g2 = arr.length;
		while(_g3 < _g2) {
			var j = _g3++;
			row.push(arr[j][i]);
		}
	}
	return result;
};
thx_core_Arrays.zip = function(array1,array2) {
	var tmp;
	var a = array1.length;
	var b = array2.length;
	if(a < b) tmp = a; else tmp = b;
	var length = tmp;
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i]});
	}
	return array;
};
thx_core_Arrays.zip3 = function(array1,array2,array3) {
	var length = thx_core_ArrayInts.min([array1.length,array2.length,array3.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i]});
	}
	return array;
};
thx_core_Arrays.zip4 = function(array1,array2,array3,array4) {
	var length = thx_core_ArrayInts.min([array1.length,array2.length,array3.length,array4.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i]});
	}
	return array;
};
thx_core_Arrays.zip5 = function(array1,array2,array3,array4,array5) {
	var length = thx_core_ArrayInts.min([array1.length,array2.length,array3.length,array4.length,array5.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i], _4 : array5[i]});
	}
	return array;
};
thx_core_Arrays.unzip = function(array) {
	var a1 = [];
	var a2 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
	});
	return { _0 : a1, _1 : a2};
};
thx_core_Arrays.unzip3 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
	});
	return { _0 : a1, _1 : a2, _2 : a3};
};
thx_core_Arrays.unzip4 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4};
};
thx_core_Arrays.unzip5 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	var a5 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
		a5.push(t._4);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4, _4 : a5};
};
var thx_core_ArrayFloats = function() { };
thx_core_ArrayFloats.__name__ = true;
thx_core_ArrayFloats.average = function(arr) {
	return thx_core_ArrayFloats.sum(arr) / arr.length;
};
thx_core_ArrayFloats.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v?isFinite(v):false;
	});
};
thx_core_ArrayFloats.max = function(arr) {
	return arr.length == 0?null:arr.reduce(function(max,v) {
		return v > max?v:max;
	},arr[0]);
};
thx_core_ArrayFloats.min = function(arr) {
	return arr.length == 0?null:arr.reduce(function(min,v) {
		return v < min?v:min;
	},arr[0]);
};
thx_core_ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_core_ArrayFloats.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0.0);
};
var thx_core_ArrayInts = function() { };
thx_core_ArrayInts.__name__ = true;
thx_core_ArrayInts.average = function(arr) {
	return thx_core_ArrayInts.sum(arr) / arr.length;
};
thx_core_ArrayInts.max = function(arr) {
	return arr.length == 0?null:arr.reduce(function(max,v) {
		return v > max?v:max;
	},arr[0]);
};
thx_core_ArrayInts.min = function(arr) {
	return arr.length == 0?null:arr.reduce(function(min,v) {
		return v < min?v:min;
	},arr[0]);
};
thx_core_ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_core_ArrayInts.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0);
};
var thx_core_ArrayStrings = function() { };
thx_core_ArrayStrings.__name__ = true;
thx_core_ArrayStrings.compact = function(arr) {
	return arr.filter(function(v) {
		return !thx_core_Strings.isEmpty(v);
	});
};
thx_core_ArrayStrings.max = function(arr) {
	return arr.length == 0?null:arr.reduce(function(max,v) {
		return v > max?v:max;
	},arr[0]);
};
thx_core_ArrayStrings.min = function(arr) {
	return arr.length == 0?null:arr.reduce(function(min,v) {
		return v < min?v:min;
	},arr[0]);
};
var thx_core_Error = function(message,stack,pos) {
	Error.call(this,message);
	this.message = message;
	if(null == stack) {
		var tmp;
		try {
			tmp = haxe_CallStack.exceptionStack();
		} catch( e ) {
			tmp = [];
		}
		stack = tmp;
		if(stack.length == 0) {
			var tmp1;
			try {
				tmp1 = haxe_CallStack.callStack();
			} catch( e1 ) {
				tmp1 = [];
			}
			stack = tmp1;
		}
	}
	this.stackItems = stack;
	this.pos = pos;
};
thx_core_Error.__name__ = true;
thx_core_Error.fromDynamic = function(err,pos) {
	if(js_Boot.__instanceof(err,thx_core_Error)) return err;
	return new thx_core_Error("" + Std.string(err),null,pos);
};
thx_core_Error.__super__ = Error;
thx_core_Error.prototype = $extend(Error.prototype,{
	toString: function() {
		return this.message + "\nfrom: " + this.pos.className + "." + this.pos.methodName + "() at " + this.pos.lineNumber + "\n\n" + haxe_CallStack.toString(this.stackItems);
	}
	,__class__: thx_core_Error
});
var thx_core_Floats = function() { };
thx_core_Floats.__name__ = true;
thx_core_Floats.angleDifference = function(a,b,turn) {
	if(turn == null) turn = 360;
	var r = (b - a) % turn;
	if(r < 0) r += turn;
	if(r > turn / 2) r -= turn;
	return r;
};
thx_core_Floats.ceilTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.ceil(f * p) / p;
};
thx_core_Floats.canParse = function(s) {
	return thx_core_Floats.pattern_parse.match(s);
};
thx_core_Floats.clamp = function(v,min,max) {
	var tmp;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Floats.clampSym = function(v,max) {
	var tmp;
	var min = -max;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Floats.compare = function(a,b) {
	var tmp;
	if(a < b) tmp = -1; else if(b > a) tmp = 1; else tmp = 0;
	return tmp;
};
thx_core_Floats.floorTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.floor(f * p) / p;
};
thx_core_Floats.interpolate = function(f,a,b) {
	return (b - a) * f + a;
};
thx_core_Floats.interpolateAngle = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolate(f,a,a + thx_core_Floats.angleDifference(a,b,turn)),turn);
};
thx_core_Floats.interpolateAngleWidest = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolateAngle(f,a,b,turn) - turn / 2,turn);
};
thx_core_Floats.interpolateAngleCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx_core_Floats.wrapCircular(a,turn);
	b = thx_core_Floats.wrapCircular(b,turn);
	if(b < a) b += turn;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolate(f,a,b),turn);
};
thx_core_Floats.interpolateAngleCCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx_core_Floats.wrapCircular(a,turn);
	b = thx_core_Floats.wrapCircular(b,turn);
	if(b > a) b -= turn;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolate(f,a,b),turn);
};
thx_core_Floats.nearEquals = function(a,b) {
	return Math.abs(a - b) <= 10e-10;
};
thx_core_Floats.nearZero = function(n) {
	return Math.abs(n) <= 10e-10;
};
thx_core_Floats.normalize = function(v) {
	var tmp;
	if(v < 0) tmp = 0; else if(v > 1) tmp = 1; else tmp = v;
	return tmp;
};
thx_core_Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx_core_Floats.root = function(base,index) {
	return Math.pow(base,1 / index);
};
thx_core_Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
thx_core_Floats.sign = function(value) {
	return value < 0?-1:1;
};
thx_core_Floats.wrap = function(v,min,max) {
	var range = max - min + 1;
	if(v < min) v += range * ((min - v) / range + 1);
	return min + (v - min) % range;
};
thx_core_Floats.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_core_Functions0 = function() { };
thx_core_Functions0.__name__ = true;
thx_core_Functions0.after = function(callback,n) {
	return function() {
		if(--n == 0) callback();
	};
};
thx_core_Functions0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx_core_Functions0.once = function(f) {
	return function() {
		var t = f;
		t();
	};
};
thx_core_Functions0.negate = function(callback) {
	return function() {
		return !callback();
	};
};
thx_core_Functions0.times = function(n,callback) {
	return function() {
		return thx_core_Ints.range(n).map(function(_) {
			return callback();
		});
	};
};
thx_core_Functions0.timesi = function(n,callback) {
	return function() {
		return thx_core_Ints.range(n).map(function(i) {
			return callback(i);
		});
	};
};
var thx_core_Functions1 = function() { };
thx_core_Functions1.__name__ = true;
thx_core_Functions1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx_core_Functions1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
thx_core_Functions1.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v) {
		return "" + Std.string(v);
	};
	var map_h = { };
	return function(v1) {
		var key = resolver(v1);
		if(map_h.hasOwnProperty("$" + key)) return map_h["$" + key];
		var result = callback(v1);
		map_h["$" + key] = result;
		return result;
	};
};
thx_core_Functions1.negate = function(callback) {
	return function(v) {
		return !callback(v);
	};
};
thx_core_Functions1.noop = function(_) {
};
thx_core_Functions1.times = function(n,callback) {
	return function(value) {
		return thx_core_Ints.range(n).map(function(_) {
			return callback(value);
		});
	};
};
thx_core_Functions1.timesi = function(n,callback) {
	return function(value) {
		return thx_core_Ints.range(n).map(function(i) {
			return callback(value,i);
		});
	};
};
thx_core_Functions1.swapArguments = function(callback) {
	return function(a2,a1) {
		return callback(a1,a2);
	};
};
var thx_core_Functions2 = function() { };
thx_core_Functions2.__name__ = true;
thx_core_Functions2.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2) {
		return "" + Std.string(v1) + ":" + Std.string(v2);
	};
	var map_h = { };
	return function(v11,v21) {
		var key = resolver(v11,v21);
		if(map_h.hasOwnProperty("$" + key)) return map_h["$" + key];
		var result = callback(v11,v21);
		map_h["$" + key] = result;
		return result;
	};
};
thx_core_Functions2.negate = function(callback) {
	return function(v1,v2) {
		return !callback(v1,v2);
	};
};
var thx_core_Functions3 = function() { };
thx_core_Functions3.__name__ = true;
thx_core_Functions3.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2,v3) {
		return "" + Std.string(v1) + ":" + Std.string(v2) + ":" + Std.string(v3);
	};
	var map_h = { };
	return function(v11,v21,v31) {
		var key = resolver(v11,v21,v31);
		if(map_h.hasOwnProperty("$" + key)) return map_h["$" + key];
		var result = callback(v11,v21,v31);
		map_h["$" + key] = result;
		return result;
	};
};
thx_core_Functions3.negate = function(callback) {
	return function(v1,v2,v3) {
		return !callback(v1,v2,v3);
	};
};
var thx_core_Functions = function() { };
thx_core_Functions.__name__ = true;
thx_core_Functions.constant = function(v) {
	return function() {
		return v;
	};
};
thx_core_Functions.equality = function(a,b) {
	return a == b;
};
thx_core_Functions.identity = function(value) {
	return value;
};
thx_core_Functions.noop = function() {
};
var thx_core_Ints = function() { };
thx_core_Ints.__name__ = true;
thx_core_Ints.abs = function(v) {
	return v < 0?-v:v;
};
thx_core_Ints.canParse = function(s) {
	return thx_core_Ints.pattern_parse.match(s);
};
thx_core_Ints.clamp = function(v,min,max) {
	var tmp;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Ints.clampSym = function(v,max) {
	var tmp;
	var min = -max;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Ints.compare = function(a,b) {
	return a - b;
};
thx_core_Ints.interpolate = function(f,a,b) {
	return Math.round(a + (b - a) * f);
};
thx_core_Ints.isEven = function(v) {
	return v % 2 == 0;
};
thx_core_Ints.isOdd = function(v) {
	return v % 2 != 0;
};
thx_core_Ints.max = function(a,b) {
	return a > b?a:b;
};
thx_core_Ints.min = function(a,b) {
	return a < b?a:b;
};
thx_core_Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	return isNaN(v)?null:v;
};
thx_core_Ints.random = function(min,max) {
	if(min == null) min = 0;
	return Std.random(max + 1) + min;
};
thx_core_Ints.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) throw "infinite range";
	var range = [];
	var i = -1;
	var j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
};
thx_core_Ints.toString = function(value,base) {
	return value.toString(base);
};
thx_core_Ints.sign = function(value) {
	return value < 0?-1:1;
};
thx_core_Ints.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_core_Nil = { __ename__ : true, __constructs__ : ["nil"] };
thx_core_Nil.nil = ["nil",0];
thx_core_Nil.nil.toString = $estr;
thx_core_Nil.nil.__enum__ = thx_core_Nil;
var thx_core_Nulls = function() { };
thx_core_Nulls.__name__ = true;
var thx_core_Strings = function() { };
thx_core_Strings.__name__ = true;
thx_core_Strings.after = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos + searchFor.length);
};
thx_core_Strings.capitalize = function(s) {
	return s.substring(0,1).toUpperCase() + s.substring(1);
};
thx_core_Strings.capitalizeWords = function(value,whiteSpaceOnly) {
	if(whiteSpaceOnly == null) whiteSpaceOnly = false;
	if(whiteSpaceOnly) return thx_core_Strings.UCWORDSWS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx_core_Strings.upperMatch); else return thx_core_Strings.UCWORDS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx_core_Strings.upperMatch);
};
thx_core_Strings.collapse = function(value) {
	return thx_core_Strings.WSG.replace(StringTools.trim(value)," ");
};
thx_core_Strings.compare = function(a,b) {
	var tmp;
	if(a < b) tmp = -1; else if(a > b) tmp = 1; else tmp = 0;
	return tmp;
};
thx_core_Strings.contains = function(s,test) {
	return s.indexOf(test) >= 0;
};
thx_core_Strings.dasherize = function(s) {
	return StringTools.replace(s,"_","-");
};
thx_core_Strings.ellipsis = function(s,maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	return s.length > maxlen?s.substring(0,symbol.length > maxlen - symbol.length?symbol.length:maxlen - symbol.length) + symbol:s;
};
thx_core_Strings.filter = function(s,predicate) {
	return s.split("").filter(predicate).join("");
};
thx_core_Strings.filterCharcode = function(s,predicate) {
	return thx_core_Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	}).filter(predicate).map(function(i) {
		return String.fromCharCode(i);
	}).join("");
};
thx_core_Strings.from = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos);
};
thx_core_Strings.humanize = function(s) {
	return StringTools.replace(thx_core_Strings.underscore(s),"_"," ");
};
thx_core_Strings.isAlphaNum = function(value) {
	return thx_core_Strings.ALPHANUM.match(value);
};
thx_core_Strings.isLowerCase = function(value) {
	return value.toLowerCase() == value;
};
thx_core_Strings.isUpperCase = function(value) {
	return value.toUpperCase() == value;
};
thx_core_Strings.ifEmpty = function(value,alt) {
	return (null != value?"" != value:false)?value:alt;
};
thx_core_Strings.isDigitsOnly = function(value) {
	return thx_core_Strings.DIGITS.match(value);
};
thx_core_Strings.isEmpty = function(value) {
	return !(value == null)?value == "":true;
};
thx_core_Strings.iterator = function(s) {
	var tmp;
	var _this = s.split("");
	tmp = HxOverrides.iter(_this);
	return tmp;
};
thx_core_Strings.map = function(value,callback) {
	return value.split("").map(callback);
};
thx_core_Strings.remove = function(value,toremove) {
	return StringTools.replace(value,toremove,"");
};
thx_core_Strings.removeAfter = function(value,toremove) {
	return StringTools.endsWith(value,toremove)?value.substring(0,value.length - toremove.length):value;
};
thx_core_Strings.removeBefore = function(value,toremove) {
	return StringTools.startsWith(value,toremove)?value.substring(toremove.length):value;
};
thx_core_Strings.repeat = function(s,times) {
	var tmp;
	var _g = [];
	var _g1 = 0;
	while(_g1 < times) {
		_g1++;
		_g.push(s);
	}
	tmp = _g;
	return tmp.join("");
};
thx_core_Strings.reverse = function(s) {
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
thx_core_Strings.stripTags = function(s) {
	return thx_core_Strings.STRIPTAGS.replace(s,"");
};
thx_core_Strings.surround = function(s,left,right) {
	return "" + left + s + (null == right?left:right);
};
thx_core_Strings.toArray = function(s) {
	return s.split("");
};
thx_core_Strings.toCharcodeArray = function(s) {
	return thx_core_Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	});
};
thx_core_Strings.toChunks = function(s,len) {
	var chunks = [];
	while(s.length > 0) {
		chunks.push(s.substring(0,len));
		s = s.substring(len);
	}
	return chunks;
};
thx_core_Strings.trimChars = function(value,charlist) {
	return thx_core_Strings.trimCharsRight(thx_core_Strings.trimCharsLeft(value,charlist),charlist);
};
thx_core_Strings.trimCharsLeft = function(value,charlist) {
	var pos = 0;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp;
		var test = value.charAt(i);
		tmp = charlist.indexOf(test) >= 0;
		if(tmp) pos++; else break;
	}
	return value.substring(pos);
};
thx_core_Strings.trimCharsRight = function(value,charlist) {
	var len = value.length;
	var pos = len;
	var i;
	var _g = 0;
	while(_g < len) {
		var j = _g++;
		i = len - j - 1;
		var tmp;
		var test = value.charAt(i);
		tmp = charlist.indexOf(test) >= 0;
		if(tmp) pos = i; else break;
	}
	return value.substring(0,pos);
};
thx_core_Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx_core_Strings.upTo = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substring(0,pos);
};
thx_core_Strings.wrapColumns = function(s,columns,indent,newline) {
	if(newline == null) newline = "\n";
	if(indent == null) indent = "";
	if(columns == null) columns = 78;
	return thx_core_Strings.SPLIT_LINES.split(s).map(function(part) {
		return thx_core_Strings.wrapLine(StringTools.trim(thx_core_Strings.WSG.replace(part," ")),columns,indent,newline);
	}).join(newline);
};
thx_core_Strings.upperMatch = function(re) {
	return re.matched(0).toUpperCase();
};
thx_core_Strings.wrapLine = function(s,columns,indent,newline) {
	var parts = [];
	var pos = 0;
	var len = s.length;
	var ilen = indent.length;
	columns -= ilen;
	while(true) {
		if(pos + columns >= len - ilen) {
			parts.push(s.substring(pos));
			break;
		}
		var i = 0;
		while(!StringTools.isSpace(s,pos + columns - i)?i < columns:false) i++;
		if(i == columns) {
			i = 0;
			while(!StringTools.isSpace(s,pos + columns + i)?pos + columns + i < len:false) i++;
			parts.push(s.substring(pos,pos + columns + i));
			pos += columns + i + 1;
		} else {
			parts.push(s.substring(pos,pos + columns - i));
			pos += columns - i + 1;
		}
	}
	return indent + parts.join(newline + indent);
};
var thx_core_Timer = function() { };
thx_core_Timer.__name__ = true;
thx_core_Timer.debounce = function(callback,delayms,leading) {
	if(leading == null) leading = false;
	var cancel = thx_core_Functions.noop;
	var poll = function() {
		cancel();
		thx_core_Timer.delay(callback,delayms);
	};
	return function() {
		if(leading) callback();
		poll();
	};
};
thx_core_Timer.throttle = function(callback,delayms,leading) {
	if(leading == null) leading = false;
	var waiting = false;
	var poll = function() {
		waiting = true;
		thx_core_Timer.delay(callback,delayms);
	};
	return function() {
		if(leading) {
			callback();
			return;
		}
		if(waiting) return;
		poll();
	};
};
thx_core_Timer.repeat = function(callback,delayms) {
	var tmp;
	var id = setInterval(callback,delayms);
	tmp = function() {
		thx_core_Timer.clear(id);
	};
	return tmp;
};
thx_core_Timer.delay = function(callback,delayms) {
	var tmp;
	var id = setTimeout(callback,delayms);
	tmp = function() {
		thx_core_Timer.clear(id);
	};
	return tmp;
};
thx_core_Timer.frame = function(callback) {
	var cancelled = false;
	var f = thx_core_Functions.noop;
	var current = performance.now();
	var next;
	f = function() {
		if(cancelled) return;
		next = performance.now();
		callback(next - current);
		current = next;
		requestAnimationFrame(f);
	};
	requestAnimationFrame(f);
	return function() {
		cancelled = false;
	};
};
thx_core_Timer.nextFrame = function(callback) {
	var id = requestAnimationFrame(callback);
	return function() {
		cancelAnimationFrame(id);
	};
};
thx_core_Timer.immediate = function(callback) {
	var tmp;
	var id = setImmediate(callback);
	tmp = function() {
		thx_core_Timer.clear(id);
	};
	return tmp;
};
thx_core_Timer.clear = function(id) {
	return clearTimeout(id);
};
thx_core_Timer.time = function() {
	return performance.now();
};
var thx_core__$Tuple_Tuple0_$Impl_$ = {};
thx_core__$Tuple_Tuple0_$Impl_$.__name__ = true;
thx_core__$Tuple_Tuple0_$Impl_$._new = function() {
	return thx_core_Nil.nil;
};
thx_core__$Tuple_Tuple0_$Impl_$["with"] = function(this1,v) {
	return v;
};
thx_core__$Tuple_Tuple0_$Impl_$.toString = function(this1) {
	return "Tuple0()";
};
thx_core__$Tuple_Tuple0_$Impl_$.toNil = function(this1) {
	return this1;
};
thx_core__$Tuple_Tuple0_$Impl_$.nilToTuple = function(v) {
	return thx_core_Nil.nil;
};
var thx_core__$Tuple_Tuple1_$Impl_$ = {};
thx_core__$Tuple_Tuple1_$Impl_$.__name__ = true;
thx_core__$Tuple_Tuple1_$Impl_$._new = function(_0) {
	return _0;
};
thx_core__$Tuple_Tuple1_$Impl_$.get__0 = function(this1) {
	return this1;
};
thx_core__$Tuple_Tuple1_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1, _1 : v};
};
thx_core__$Tuple_Tuple1_$Impl_$.toString = function(this1) {
	return "Tuple1(" + Std.string(this1) + ")";
};
var thx_core__$Tuple_Tuple2_$Impl_$ = {};
thx_core__$Tuple_Tuple2_$Impl_$.__name__ = true;
thx_core__$Tuple_Tuple2_$Impl_$._new = function(_0,_1) {
	return { _0 : _0, _1 : _1};
};
thx_core__$Tuple_Tuple2_$Impl_$.get_left = function(this1) {
	return this1._0;
};
thx_core__$Tuple_Tuple2_$Impl_$.get_right = function(this1) {
	return this1._1;
};
thx_core__$Tuple_Tuple2_$Impl_$.flip = function(this1) {
	return { _0 : this1._1, _1 : this1._0};
};
thx_core__$Tuple_Tuple2_$Impl_$.dropLeft = function(this1) {
	return this1._1;
};
thx_core__$Tuple_Tuple2_$Impl_$.dropRight = function(this1) {
	return this1._0;
};
thx_core__$Tuple_Tuple2_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : v};
};
thx_core__$Tuple_Tuple2_$Impl_$.toString = function(this1) {
	return "Tuple2(" + Std.string(this1._0) + "," + Std.string(this1._1) + ")";
};
var thx_core__$Tuple_Tuple3_$Impl_$ = {};
thx_core__$Tuple_Tuple3_$Impl_$.__name__ = true;
thx_core__$Tuple_Tuple3_$Impl_$._new = function(_0,_1,_2) {
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx_core__$Tuple_Tuple3_$Impl_$.flip = function(this1) {
	return { _0 : this1._2, _1 : this1._1, _2 : this1._0};
};
thx_core__$Tuple_Tuple3_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2};
};
thx_core__$Tuple_Tuple3_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1};
};
thx_core__$Tuple_Tuple3_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : v};
};
thx_core__$Tuple_Tuple3_$Impl_$.toString = function(this1) {
	return "Tuple3(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + ")";
};
var thx_core__$Tuple_Tuple4_$Impl_$ = {};
thx_core__$Tuple_Tuple4_$Impl_$.__name__ = true;
thx_core__$Tuple_Tuple4_$Impl_$._new = function(_0,_1,_2,_3) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx_core__$Tuple_Tuple4_$Impl_$.flip = function(this1) {
	return { _0 : this1._3, _1 : this1._2, _2 : this1._1, _3 : this1._0};
};
thx_core__$Tuple_Tuple4_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3};
};
thx_core__$Tuple_Tuple4_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2};
};
thx_core__$Tuple_Tuple4_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : v};
};
thx_core__$Tuple_Tuple4_$Impl_$.toString = function(this1) {
	return "Tuple4(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + ")";
};
var thx_core__$Tuple_Tuple5_$Impl_$ = {};
thx_core__$Tuple_Tuple5_$Impl_$.__name__ = true;
thx_core__$Tuple_Tuple5_$Impl_$._new = function(_0,_1,_2,_3,_4) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4};
};
thx_core__$Tuple_Tuple5_$Impl_$.flip = function(this1) {
	return { _0 : this1._4, _1 : this1._3, _2 : this1._2, _3 : this1._1, _4 : this1._0};
};
thx_core__$Tuple_Tuple5_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4};
};
thx_core__$Tuple_Tuple5_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3};
};
thx_core__$Tuple_Tuple5_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4, _5 : v};
};
thx_core__$Tuple_Tuple5_$Impl_$.toString = function(this1) {
	return "Tuple5(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + ")";
};
var thx_core__$Tuple_Tuple6_$Impl_$ = {};
thx_core__$Tuple_Tuple6_$Impl_$.__name__ = true;
thx_core__$Tuple_Tuple6_$Impl_$._new = function(_0,_1,_2,_3,_4,_5) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4, _5 : _5};
};
thx_core__$Tuple_Tuple6_$Impl_$.flip = function(this1) {
	return { _0 : this1._5, _1 : this1._4, _2 : this1._3, _3 : this1._2, _4 : this1._1, _5 : this1._0};
};
thx_core__$Tuple_Tuple6_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4, _4 : this1._5};
};
thx_core__$Tuple_Tuple6_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4};
};
thx_core__$Tuple_Tuple6_$Impl_$.toString = function(this1) {
	return "Tuple6(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + "," + Std.string(this1._5) + ")";
};
var thx_core_error_AbstractMethod = function(posInfo) {
	thx_core_Error.call(this,"method " + posInfo.className + "." + posInfo.methodName + "() is abstract",null,posInfo);
};
thx_core_error_AbstractMethod.__name__ = true;
thx_core_error_AbstractMethod.__super__ = thx_core_Error;
thx_core_error_AbstractMethod.prototype = $extend(thx_core_Error.prototype,{
	__class__: thx_core_error_AbstractMethod
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
$hx_exports.MiniCanvas = minicanvas_MiniCanvas;

      // Production steps of ECMA-262, Edition 5, 15.4.4.21
      // Reference: http://es5.github.io/#x15.4.4.21
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
          'use strict';
          if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          var t = Object(this), len = t.length >>> 0, k = 0, value;
          if (arguments.length == 2) {
            value = arguments[1];
          } else {
            while (k < len && ! k in t) {
              k++;
            }
            if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        };
      }
    ;
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
	scope.performance.now = (function($this) {
		var $r;
		var now = function() {
			return new Date() - nowOffset;
		};
		$r = now;
		return $r;
	}(this));
}
js_Boot.__toStr = {}.toString;
minicanvas_MiniCanvas.displayGenerationTime = false;
minicanvas_BrowserCanvas._backingStoreRatio = 0;
minicanvas_BrowserCanvas.defaultScaleMode = minicanvas_ScaleMode.Auto;
minicanvas_BrowserCanvas.parentNode = typeof document != 'undefined' && document.body;
minicanvas_NodeCanvas.defaultScaleMode = minicanvas_ScaleMode.NoScale;
minicanvas_NodeCanvas.imagePath = "images";
thx_core_Floats.TOLERANCE = 10e-5;
thx_core_Floats.EPSILON = 10e-10;
thx_core_Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx_core_Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx_core_Ints.BASE = "0123456789abcdefghijklmnopqrstuvwxyz";
thx_core_Strings.UCWORDS = new EReg("[^a-zA-Z]([a-z])","g");
thx_core_Strings.UCWORDSWS = new EReg("\\s[a-z]","g");
thx_core_Strings.ALPHANUM = new EReg("^[a-z0-9]+$","i");
thx_core_Strings.DIGITS = new EReg("^[0-9]+$","");
thx_core_Strings.STRIPTAGS = new EReg("</?[a-z]+[^>]*?/?>","gi");
thx_core_Strings.WSG = new EReg("\\s+","g");
thx_core_Strings.SPLIT_LINES = new EReg("\r\n|\n\r|\n|\r","g");
thx_core_Timer.FRAME_RATE = Math.round(16.6666666666666679);
})(typeof window != "undefined" ? window : exports);
