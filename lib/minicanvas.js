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
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	var tmp;
	if(v == 0) {
		if(!(HxOverrides.cca(x,1) == 120)) tmp = HxOverrides.cca(x,1) == 88; else tmp = true;
	} else tmp = false;
	if(tmp) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
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
StringTools.hex = function(n,digits) {
	var s = "";
	do {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
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
	,border: function(weight,color) {
		if(color == null) color = 255;
		if(weight == null) weight = 1.0;
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
				this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(handler(x / this.width,y / this.height));
				this.ctx.fillRect(x,y,1,1);
			}
		}
		return this;
	}
	,checkboard: function(size,light,dark) {
		if(size == null) size = 8;
		var cols = Math.ceil(this.width / size);
		var rows = Math.ceil(this.height / size);
		var slight = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(null == light?-1:light);
		var sdark = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(null == dark?-858993409:dark);
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
		if(null != fillColor) this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(fillColor);
		if(null != lineColor) {
			this.ctx.strokeStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(lineColor);
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
	,context: function(callback) {
		callback(this.ctx,this.width,this.height);
		return this;
	}
	,cross: function(ox,oy,weight,color) {
		if(weight == null) weight = 1.0;
		if(null == ox) ox = this.width / 2;
		if(null == oy) oy = this.height / 2;
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
		if(t != null) tmp = t; else tmp = -869072641;
		this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(tmp);
		this.ctx.arc(x,y,radius,0,Math.PI * 2,true);
		this.ctx.fill();
		return this;
	}
	,dotGrid: function(dx,dy,radius,color,ox,oy) {
		if(oy == null) oy = 0.0;
		if(ox == null) ox = 0.0;
		if(radius == null) radius = 1.0;
		if(dy == null) dy = 10.0;
		if(dx == null) dx = 10.0;
		if(dx == 0) throw "invalid argument dx, should be different from zero";
		if(dy == 0) throw "invalid argument dy, should be different from zero";
		if(null == color) color = -1431655681;
		var py = oy % dy;
		while(py - radius <= this.height) {
			var px = ox % dx;
			while(px - radius <= this.height) {
				this.dot(px,py,radius,color);
				px += dx;
			}
			py += dy;
		}
		return this;
	}
	,fill: function(color) {
		this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(color);
		this.ctx.fillRect(0,0,this.width,this.height);
		return this;
	}
	,grid: function(dx,dy,weight,color,ox,oy) {
		if(oy == null) oy = 0.0;
		if(ox == null) ox = 0.0;
		if(weight == null) weight = 1.0;
		if(dy == null) dy = 10.0;
		if(dx == null) dx = 10.0;
		this.gridHorizontal(dy,weight,color,oy);
		this.gridVertical(dx,weight,color,ox);
		return this;
	}
	,gridHorizontal: function(dy,weight,color,oy) {
		if(oy == null) oy = 0.0;
		if(weight == null) weight = 1.0;
		if(dy == null) dy = 10.0;
		if(dy == 0) throw "invalid argument dy, should be different from zero";
		if(null == color) color = -858993409;
		var py = oy % dy;
		while(py - weight / 2 <= this.height) {
			this.lineHorizontal(py,weight,color);
			py += dy;
		}
		return this;
	}
	,gridVertical: function(dx,weight,color,ox) {
		if(ox == null) ox = 0.0;
		if(weight == null) weight = 1.0;
		if(dx == null) dx = 10.0;
		if(dx == 0) throw "invalid argument dx, should be different from zero";
		if(null == color) color = -858993409;
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
			this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(handler(x / this.width));
			this.ctx.fillRect(x,0,1,this.height);
		}
		return this;
	}
	,gradientVertical: function(handler) {
		var _g1 = 0;
		var _g = this.height;
		while(_g1 < _g) {
			var y = _g1++;
			this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(handler(y / this.height));
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
		if(t != null) tmp = t; else tmp = 255;
		this.ctx.strokeStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(tmp);
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
				this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(col);
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
			this.ctx.fillStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(fillColor);
			this.ctx.fillRect(x0,y0,x1 - x0,y1 - y0);
		}
		if(null != lineColor) {
			this.ctx.lineWidth = weight;
			this.ctx.strokeStyle = thx_color__$RGBA_RGBA_$Impl_$.toCSS3(lineColor);
			this.ctx.strokeRect(x0,y0,x1 - x0,y1 - y0);
		}
		return this;
	}
	,sample: function(name,callback) {
		this.context(callback);
		this.display(name);
		return this;
	}
	,storeFrame: function() {
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
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 399, className : "minicanvas.MiniCanvas", methodName : "getDevicePixelRatio"});
	}
	,getBackingStoreRatio: function() {
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 402, className : "minicanvas.MiniCanvas", methodName : "getBackingStoreRatio"});
	}
	,init: function() {
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 405, className : "minicanvas.MiniCanvas", methodName : "init"});
	}
	,nativeDisplay: function(name) {
		throw new thx_core_error_AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 408, className : "minicanvas.MiniCanvas", methodName : "nativeDisplay"});
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
	,storeFrame: function() {
		this.hasFrames = true;
		this.ensureEncoder().addFrame(this.ctx);
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
var thx_color__$CIELCh_CIELCh_$Impl_$ = {};
thx_color__$CIELCh_CIELCh_$Impl_$.__name__ = true;
thx_color__$CIELCh_CIELCh_$Impl_$.create = function(lightness,chroma,hue) {
	var tmp;
	var channels = [lightness,chroma,thx_core_Floats.wrapCircular(hue,360)];
	tmp = channels;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$CIELCh_CIELCh_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CIELCh_CIELCh_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielch":
			tmp = thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CIELCh_CIELCh_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.complement = function(this1) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180);
};
thx_color__$CIELCh_CIELCh_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolateAngle(t,this1[2],other[2],360)];
	tmp = channels;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.withHue(this1,this1[2] + angle);
};
thx_color__$CIELCh_CIELCh_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.square = function(this1) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.tetrad(this1,90);
};
thx_color__$CIELCh_CIELCh_$Impl_$.tetrad = function(this1,angle) {
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180 + angle);
	tmp = { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.triad = function(this1) {
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,120);
	tmp = { _0 : _0, _1 : _1, _2 : _2};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.withLightness = function(this1,newlightness) {
	return [newlightness,this1[1],this1[2]];
};
thx_color__$CIELCh_CIELCh_$Impl_$.withChroma = function(this1,newchroma) {
	return [this1[0],newchroma,this1[2]];
};
thx_color__$CIELCh_CIELCh_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.wrapCircular(newhue,360)];
	tmp = channels;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$CIELCh_CIELCh_$Impl_$.toString = function(this1) {
	return "CIELCh(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab = function(this1) {
	var hradi = this1[2] * (Math.PI / 180);
	var a = Math.cos(hradi) * this1[1];
	var b = Math.sin(hradi) * this1[1];
	return [this1[0],a,b];
};
thx_color__$CIELCh_CIELCh_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBXA(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toRGBX(thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toXYZ = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toXYZ(thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toYxy = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toYxy(thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.get_lightness = function(this1) {
	return this1[0];
};
thx_color__$CIELCh_CIELCh_$Impl_$.get_chroma = function(this1) {
	return this1[1];
};
thx_color__$CIELCh_CIELCh_$Impl_$.get_hue = function(this1) {
	return this1[2];
};
var thx_color__$CIELab_CIELab_$Impl_$ = {};
thx_color__$CIELab_CIELab_$Impl_$.__name__ = true;
thx_color__$CIELab_CIELab_$Impl_$.create = function(l,a,b) {
	return [l,a,b];
};
thx_color__$CIELab_CIELab_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$CIELab_CIELab_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CIELab_CIELab_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielab":
			tmp = thx_color__$CIELab_CIELab_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CIELab_CIELab_$Impl_$.distance = function(this1,other) {
	return (this1[0] - other[0]) * (this1[0] - other[0]) + (this1[1] - other[1]) * (this1[1] - other[1]) + (this1[2] - other[2]) * (this1[2] - other[2]);
};
thx_color__$CIELab_CIELab_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],0),this1[1],this1[2]];
	tmp = channels;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],100),this1[1],this1[2]];
	tmp = channels;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.match = function(this1,palette) {
	var it = palette;
	if(null == it) throw new thx_core_error_NullArgument("Iterable argument \"this\" cannot be null",{ fileName : "NullArgument.hx", lineNumber : 73, className : "thx.color._CIELab.CIELab_Impl_", methodName : "match"}); else if(!$iterator(it)().hasNext()) throw new thx_core_error_NullArgument("Iterable argument \"this\" cannot be empty",{ fileName : "NullArgument.hx", lineNumber : 75, className : "thx.color._CIELab.CIELab_Impl_", methodName : "match"});
	var dist = Infinity;
	var closest = null;
	var $it0 = $iterator(palette)();
	while( $it0.hasNext() ) {
		var color = $it0.next();
		var ndist = thx_color__$CIELab_CIELab_$Impl_$.distance(this1,color);
		if(ndist < dist) {
			dist = ndist;
			closest = color;
		}
	}
	return closest;
};
thx_color__$CIELab_CIELab_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$CIELab_CIELab_$Impl_$.withLightness = function(this1,lightness) {
	return [lightness,this1[1],this1[2]];
};
thx_color__$CIELab_CIELab_$Impl_$.withA = function(this1,newa) {
	return [this1[0],newa,this1[2]];
};
thx_color__$CIELab_CIELab_$Impl_$.withB = function(this1,newb) {
	return [this1[0],this1[1],newb];
};
thx_color__$CIELab_CIELab_$Impl_$.toString = function(this1) {
	return "CIELab(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$CIELab_CIELab_$Impl_$.toCIELCh = function(this1) {
	var h = thx_core_Floats.wrapCircular(Math.atan2(this1[2],this1[1]) * 180 / Math.PI,360);
	var c = Math.sqrt(this1[1] * this1[1] + this1[2] * this1[2]);
	return [this1[0],c,h];
};
thx_color__$CIELab_CIELab_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CIELab_CIELab_$Impl_$.toRGBXA(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBX = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toXYZ = function(this1) {
	var y = (this1[0] + 16) / 116;
	var x = this1[1] / 500 + y;
	var z = y - this1[2] / 200;
	var p;
	p = Math.pow(y,3);
	y = p > 0.008856?p:(y - 0.137931034482758619) / 7.787;
	p = Math.pow(x,3);
	x = p > 0.008856?p:(x - 0.137931034482758619) / 7.787;
	p = Math.pow(z,3);
	z = p > 0.008856?p:(z - 0.137931034482758619) / 7.787;
	return [95.047 * x,100 * y,108.883 * z];
};
thx_color__$CIELab_CIELab_$Impl_$.toYxy = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.get_l = function(this1) {
	return this1[0];
};
thx_color__$CIELab_CIELab_$Impl_$.get_a = function(this1) {
	return this1[1];
};
thx_color__$CIELab_CIELab_$Impl_$.get_b = function(this1) {
	return this1[2];
};
var thx_color__$CMY_CMY_$Impl_$ = {};
thx_color__$CMY_CMY_$Impl_$.__name__ = true;
thx_color__$CMY_CMY_$Impl_$.create = function(cyan,magenta,yellow) {
	var tmp;
	if(cyan < 0) tmp = 0; else if(cyan > 1) tmp = 1; else tmp = cyan;
	var tmp1;
	if(magenta < 0) tmp1 = 0; else if(magenta > 1) tmp1 = 1; else tmp1 = magenta;
	var tmp2;
	if(yellow < 0) tmp2 = 0; else if(yellow > 1) tmp2 = 1; else tmp2 = yellow;
	return [tmp,tmp1,tmp2];
};
thx_color__$CMY_CMY_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$CMY_CMY_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CMY_CMY_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmy":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CMY_CMY_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$.withCyan = function(this1,newcyan) {
	var tmp;
	if(newcyan < 0) tmp = 0; else if(newcyan > 1) tmp = 1; else tmp = newcyan;
	return [tmp,this1[1],this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.withMagenta = function(this1,newmagenta) {
	var tmp;
	if(newmagenta < 0) tmp = 0; else if(newmagenta > 1) tmp = 1; else tmp = newmagenta;
	return [this1[0],tmp,this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.withYellow = function(this1,newyellow) {
	var tmp;
	if(newyellow < 0) tmp = 0; else if(newyellow > 1) tmp = 1; else tmp = newyellow;
	return [this1[0],this1[1],tmp];
};
thx_color__$CMY_CMY_$Impl_$.toString = function(this1) {
	return "cmy(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$CMY_CMY_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$CMY_CMY_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toCMYK = function(this1) {
	var k = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	if(k == 1) return [0,0,0,1]; else return [(this1[0] - k) / (1 - k),(this1[1] - k) / (1 - k),(this1[2] - k) / (1 - k),k];
};
thx_color__$CMY_CMY_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CMY_CMY_$Impl_$.toRGBXA(this1));
};
thx_color__$CMY_CMY_$Impl_$.toRGBX = function(this1) {
	return [1 - this1[0],1 - this1[1],1 - this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.get_cyan = function(this1) {
	return this1[0];
};
thx_color__$CMY_CMY_$Impl_$.get_magenta = function(this1) {
	return this1[1];
};
thx_color__$CMY_CMY_$Impl_$.get_yellow = function(this1) {
	return this1[2];
};
var thx_color__$CMYK_CMYK_$Impl_$ = {};
thx_color__$CMYK_CMYK_$Impl_$.__name__ = true;
thx_color__$CMYK_CMYK_$Impl_$.create = function(cyan,magenta,yellow,black) {
	var tmp;
	if(cyan < 0) tmp = 0; else if(cyan > 1) tmp = 1; else tmp = cyan;
	var tmp1;
	if(magenta < 0) tmp1 = 0; else if(magenta > 1) tmp1 = 1; else tmp1 = magenta;
	var tmp2;
	if(yellow < 0) tmp2 = 0; else if(yellow > 1) tmp2 = 1; else tmp2 = yellow;
	var tmp3;
	if(black < 0) tmp3 = 0; else if(black > 1) tmp3 = 1; else tmp3 = black;
	return [tmp,tmp1,tmp2,tmp3];
};
thx_color__$CMYK_CMYK_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$CMYK_CMYK_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$CMYK_CMYK_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmyk":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CMYK_CMYK_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2]),thx_core_Floats.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.withCyan = function(this1,newcyan) {
	var tmp;
	if(newcyan < 0) tmp = 0; else if(newcyan > 1) tmp = 1; else tmp = newcyan;
	return [tmp,this1[1],this1[2],this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withMagenta = function(this1,newmagenta) {
	var tmp;
	if(newmagenta < 0) tmp = 0; else if(newmagenta > 1) tmp = 1; else tmp = newmagenta;
	return [this1[0],tmp,this1[2],this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withYellow = function(this1,newyellow) {
	var tmp;
	if(newyellow < 0) tmp = 0; else if(newyellow > 1) tmp = 1; else tmp = newyellow;
	return [this1[0],this1[1],tmp,this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withBlack = function(this1,newblack) {
	var tmp;
	if(newblack < 0) tmp = 0; else if(newblack > 1) tmp = 1; else tmp = newblack;
	return [this1[0],this1[1],this1[2],tmp];
};
thx_color__$CMYK_CMYK_$Impl_$.toString = function(this1) {
	return "cmyk(" + this1[0] + "," + this1[1] + "," + this1[2] + "," + this1[3] + ")";
};
thx_color__$CMYK_CMYK_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$CMYK_CMYK_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toCMY = function(this1) {
	return [this1[3] + (1 - this1[3]) * this1[0],this1[3] + (1 - this1[3]) * this1[1],this1[3] + (1 - this1[3]) * this1[2]];
};
thx_color__$CMYK_CMYK_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CMYK_CMYK_$Impl_$.toRGBXA(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBX = function(this1) {
	return [(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])];
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.get_cyan = function(this1) {
	return this1[0];
};
thx_color__$CMYK_CMYK_$Impl_$.get_magenta = function(this1) {
	return this1[1];
};
thx_color__$CMYK_CMYK_$Impl_$.get_yellow = function(this1) {
	return this1[2];
};
thx_color__$CMYK_CMYK_$Impl_$.get_black = function(this1) {
	return this1[3];
};
thx_color__$CMYK_CMYK_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
var thx_color__$Grey_Grey_$Impl_$ = {};
thx_color__$Grey_Grey_$Impl_$.__name__ = true;
thx_color__$Grey_Grey_$Impl_$.create = function(v) {
	var tmp;
	if(v < 0) tmp = 0; else if(v > 1) tmp = 1; else tmp = v;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "grey":case "gray":
			var grey = thx_color_parse_ColorParser.getFloatChannels(info.channels,1)[0];
			tmp = grey;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$._new = function(grey) {
	return grey;
};
thx_color__$Grey_Grey_$Impl_$.contrast = function(this1) {
	return this1 > 0.5?thx_color__$Grey_Grey_$Impl_$.black:thx_color__$Grey_Grey_$Impl_$.white;
};
thx_color__$Grey_Grey_$Impl_$.darker = function(this1,t) {
	var tmp;
	var grey = thx_core_Floats.interpolate(t,this1,0);
	tmp = grey;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var grey = thx_core_Floats.interpolate(t,this1,1);
	tmp = grey;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var grey = thx_core_Floats.interpolate(t,this1,other);
	tmp = grey;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.toString = function(this1) {
	return "grey(" + this1 * 100 + "%)";
};
thx_color__$Grey_Grey_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_color__$Grey_Grey_$Impl_$.get_grey = function(this1) {
	return this1;
};
thx_color__$Grey_Grey_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$Grey_Grey_$Impl_$.toRGBXA(this1));
};
thx_color__$Grey_Grey_$Impl_$.toRGBX = function(this1) {
	return [this1,this1,this1];
};
thx_color__$Grey_Grey_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
var thx_color__$HSL_HSL_$Impl_$ = {};
thx_color__$HSL_HSL_$Impl_$.__name__ = true;
thx_color__$HSL_HSL_$Impl_$.create = function(hue,saturation,lightness) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(lightness < 0) tmp2 = 0; else if(lightness > 1) tmp2 = 1; else tmp2 = lightness;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$HSL_HSL_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$HSL_HSL_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.complement = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.rotate(this1,180);
};
thx_color__$HSL_HSL_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],0)];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],1)];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0],360),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSL_HSL_$Impl_$.withHue(this1,this1[0] + angle);
};
thx_color__$HSL_HSL_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.square = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.tetrad(this1,90);
};
thx_color__$HSL_HSL_$Impl_$.tetrad = function(this1,angle) {
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,180 + angle);
	tmp = { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.triad = function(this1) {
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,120);
	tmp = { _0 : _0, _1 : _1, _2 : _2};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.withAlpha = function(this1,alpha) {
	var tmp;
	var tmp1;
	if(alpha < 0) tmp1 = 0; else if(alpha > 1) tmp1 = 1; else tmp1 = alpha;
	var channels = this1.concat([tmp1]);
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	var channels = [thx_core_Floats.wrapCircular(newhue,360),this1[1],this1[2]];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.withLightness = function(this1,newlightness) {
	var tmp;
	if(newlightness < 0) tmp = 0; else if(newlightness > 1) tmp = 1; else tmp = newlightness;
	return [this1[0],this1[1],tmp];
};
thx_color__$HSL_HSL_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2]];
};
thx_color__$HSL_HSL_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.toString(this1);
};
thx_color__$HSL_HSL_$Impl_$.toString = function(this1) {
	return "hsl(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$HSL_HSL_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$HSL_HSL_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSL_HSL_$Impl_$.toRGBXA(this1));
};
thx_color__$HSL_HSL_$Impl_$.toRGBX = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toHSLA = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.withAlpha(this1,1.0);
};
thx_color__$HSL_HSL_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSL_HSL_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSL_HSL_$Impl_$.get_lightness = function(this1) {
	return this1[2];
};
thx_color__$HSL_HSL_$Impl_$._c = function(d,s,l) {
	var m2 = l <= 0.5?l * (1 + s):l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_core_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$HSLA_HSLA_$Impl_$ = {};
thx_color__$HSLA_HSLA_$Impl_$.__name__ = true;
thx_color__$HSLA_HSLA_$Impl_$.create = function(hue,saturation,lightness,alpha) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(lightness < 0) tmp2 = 0; else if(lightness > 1) tmp2 = 1; else tmp2 = lightness;
	var tmp3;
	if(alpha < 0) tmp3 = 0; else if(alpha > 1) tmp3 = 1; else tmp3 = alpha;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2,tmp3];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$HSLA_HSLA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$HSLA_HSLA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			var tmp1;
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp1 = channels;
			tmp = thx_color__$HSL_HSL_$Impl_$.toHSLA(tmp1);
			break;
		case "hsla":
			var channels1 = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			tmp = channels1;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.complement = function(this1) {
	return thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,180);
};
thx_color__$HSLA_HSLA_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],0),this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],1),this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.transparent = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.opaque = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2]),thx_core_Floats.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSLA_HSLA_$Impl_$.create(this1[0] + angle,this1[1],this1[2],this1[3]);
};
thx_color__$HSLA_HSLA_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 150.0;
	var tmp;
	var _0 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.withAlpha = function(this1,newalpha) {
	var tmp;
	if(newalpha < 0) tmp = 0; else if(newalpha > 1) tmp = 1; else tmp = newalpha;
	return [this1[0],this1[1],this1[2],tmp];
};
thx_color__$HSLA_HSLA_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	var channels = [thx_core_Floats.wrapCircular(newhue,360),this1[1],this1[2],this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.withLightness = function(this1,newlightness) {
	var tmp;
	if(newlightness < 0) tmp = 0; else if(newlightness > 1) tmp = 1; else tmp = newlightness;
	return [this1[0],this1[1],tmp,this1[3]];
};
thx_color__$HSLA_HSLA_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2],this1[3]];
};
thx_color__$HSLA_HSLA_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$HSLA_HSLA_$Impl_$.toString(this1);
};
thx_color__$HSLA_HSLA_$Impl_$.toString = function(this1) {
	return "hsla(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$HSLA_HSLA_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$HSLA_HSLA_$Impl_$.toHSL = function(this1) {
	var tmp;
	var channels = this1.slice(0,3);
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.toHSVA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA(thx_color__$HSLA_HSLA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSLA_HSLA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGB(thx_color__$HSLA_HSLA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSLA_HSLA_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSLA_HSLA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSLA_HSLA_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var channels = [thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSLA_HSLA_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSLA_HSLA_$Impl_$.get_lightness = function(this1) {
	return this1[2];
};
thx_color__$HSLA_HSLA_$Impl_$.get_alpha = function(this1) {
	return this1[3];
};
thx_color__$HSLA_HSLA_$Impl_$._c = function(d,s,l) {
	var m2 = l <= 0.5?l * (1 + s):l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_core_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$HSV_HSV_$Impl_$ = {};
thx_color__$HSV_HSV_$Impl_$.__name__ = true;
thx_color__$HSV_HSV_$Impl_$.create = function(hue,saturation,lightness) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(lightness < 0) tmp2 = 0; else if(lightness > 1) tmp2 = 1; else tmp2 = lightness;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2];
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$HSV_HSV_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$HSV_HSV_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSV_HSV_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.complement = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.rotate(this1,180);
};
thx_color__$HSV_HSV_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSV_HSV_$Impl_$.withHue(this1,this1[0] + angle);
};
thx_color__$HSV_HSV_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.square = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.tetrad(this1,90);
};
thx_color__$HSV_HSV_$Impl_$.tetrad = function(this1,angle) {
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,180 + angle);
	tmp = { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.triad = function(this1) {
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,120);
	tmp = { _0 : _0, _1 : _1, _2 : _2};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.withAlpha = function(this1,alpha) {
	var tmp;
	var tmp1;
	if(alpha < 0) tmp1 = 0; else if(alpha > 1) tmp1 = 1; else tmp1 = alpha;
	var channels = this1.concat([tmp1]);
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	var channels = [thx_core_Floats.wrapCircular(newhue,360),this1[1],this1[2]];
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.withValue = function(this1,newvalue) {
	var tmp;
	if(newvalue < 0) tmp = 0; else if(newvalue > 1) tmp = 1; else tmp = newvalue;
	return [this1[0],this1[1],tmp];
};
thx_color__$HSV_HSV_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2]];
};
thx_color__$HSV_HSV_$Impl_$.toString = function(this1) {
	return "hsv(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$HSV_HSV_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$HSV_HSV_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toHSVA = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.withAlpha(this1,1.0);
};
thx_color__$HSV_HSV_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSV_HSV_$Impl_$.toRGBXA(this1));
};
thx_color__$HSV_HSV_$Impl_$.toRGBX = function(this1) {
	if(this1[1] == 0) return [this1[2],this1[2],this1[2]];
	var r;
	var g;
	var b;
	var i;
	var f;
	var p;
	var q;
	var t;
	var h = this1[0] / 60;
	i = Math.floor(h);
	f = h - i;
	p = this1[2] * (1 - this1[1]);
	q = this1[2] * (1 - f * this1[1]);
	t = this1[2] * (1 - (1 - f) * this1[1]);
	switch(i) {
	case 0:
		r = this1[2];
		g = t;
		b = p;
		break;
	case 1:
		r = q;
		g = this1[2];
		b = p;
		break;
	case 2:
		r = p;
		g = this1[2];
		b = t;
		break;
	case 3:
		r = p;
		g = q;
		b = this1[2];
		break;
	case 4:
		r = t;
		g = p;
		b = this1[2];
		break;
	default:
		r = this1[2];
		g = p;
		b = q;
	}
	return [r,g,b];
};
thx_color__$HSV_HSV_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSV_HSV_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSV_HSV_$Impl_$.get_value = function(this1) {
	return this1[2];
};
var thx_color__$HSVA_HSVA_$Impl_$ = {};
thx_color__$HSVA_HSVA_$Impl_$.__name__ = true;
thx_color__$HSVA_HSVA_$Impl_$.create = function(hue,saturation,value,alpha) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(value < 0) tmp2 = 0; else if(value > 1) tmp2 = 1; else tmp2 = value;
	var tmp3;
	if(alpha < 0) tmp3 = 0; else if(alpha > 1) tmp3 = 1; else tmp3 = alpha;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2,tmp3];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$HSVA_HSVA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$HSVA_HSVA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			var tmp1;
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp1 = channels;
			tmp = thx_color__$HSV_HSV_$Impl_$.toHSVA(tmp1);
			break;
		case "hsva":
			var channels1 = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			tmp = channels1;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.complement = function(this1) {
	return thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,180);
};
thx_color__$HSVA_HSVA_$Impl_$.transparent = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.opaque = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2]),thx_core_Floats.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSVA_HSVA_$Impl_$.create(this1[0] + angle,this1[1],this1[2],this1[3]);
};
thx_color__$HSVA_HSVA_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 150.0;
	var tmp;
	var _0 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.withAlpha = function(this1,newalpha) {
	var tmp;
	if(newalpha < 0) tmp = 0; else if(newalpha > 1) tmp = 1; else tmp = newalpha;
	return [this1[0],this1[1],this1[2],tmp];
};
thx_color__$HSVA_HSVA_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	var channels = [thx_core_Floats.wrapCircular(newhue,360),this1[1],this1[2],this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.withLightness = function(this1,newvalue) {
	var tmp;
	if(newvalue < 0) tmp = 0; else if(newvalue > 1) tmp = 1; else tmp = newvalue;
	return [this1[0],this1[1],tmp,this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2],this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.toString = function(this1) {
	return "hsva(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$HSVA_HSVA_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$HSVA_HSVA_$Impl_$.toHSV = function(this1) {
	var tmp;
	var channels = this1.slice(0,3);
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.toHSLA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA(thx_color__$HSVA_HSVA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSVA_HSVA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGB(thx_color__$HSVA_HSVA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSVA_HSVA_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSVA_HSVA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSVA_HSVA_$Impl_$.toRGBXA = function(this1) {
	if(this1[1] == 0) return [this1[2],this1[2],this1[2],this1[3]];
	var r;
	var g;
	var b;
	var i;
	var f;
	var p;
	var q;
	var t;
	var h = this1[0] / 60;
	i = Math.floor(h);
	f = h - i;
	p = this1[2] * (1 - this1[1]);
	q = this1[2] * (1 - f * this1[1]);
	t = this1[2] * (1 - (1 - f) * this1[1]);
	switch(i) {
	case 0:
		r = this1[2];
		g = t;
		b = p;
		break;
	case 1:
		r = q;
		g = this1[2];
		b = p;
		break;
	case 2:
		r = p;
		g = this1[2];
		b = t;
		break;
	case 3:
		r = p;
		g = q;
		b = this1[2];
		break;
	case 4:
		r = t;
		g = p;
		b = this1[2];
		break;
	default:
		r = this1[2];
		g = p;
		b = q;
	}
	return [r,g,b,this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSVA_HSVA_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSVA_HSVA_$Impl_$.get_value = function(this1) {
	return this1[2];
};
thx_color__$HSVA_HSVA_$Impl_$.get_alpha = function(this1) {
	return this1[3];
};
var thx_color__$RGB_RGB_$Impl_$ = {};
thx_color__$RGB_RGB_$Impl_$.__name__ = true;
thx_color__$RGB_RGB_$Impl_$.create = function(red,green,blue) {
	return (red & 255) << 16 | (green & 255) << 8 | blue & 255;
};
thx_color__$RGB_RGB_$Impl_$.createf = function(red,green,blue) {
	return thx_color__$RGB_RGB_$Impl_$.create(Math.round(red * 255),Math.round(green * 255),Math.round(blue * 255));
};
thx_color__$RGB_RGB_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			tmp = thx_color__$RGB_RGB_$Impl_$.fromInts(thx_color_parse_ColorParser.getInt8Channels(info.channels,3));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGB_RGB_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,3);
	return thx_color__$RGB_RGB_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$RGB_RGB_$Impl_$._new = function(rgb) {
	return rgb;
};
thx_color__$RGB_RGB_$Impl_$.darker = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBX_RGBX_$Impl_$.darker(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1),t));
};
thx_color__$RGB_RGB_$Impl_$.lighter = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBX_RGBX_$Impl_$.lighter(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1),t));
};
thx_color__$RGB_RGB_$Impl_$.interpolate = function(this1,other,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBX_RGBX_$Impl_$.interpolate(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1),thx_color__$RGB_RGB_$Impl_$.toRGBX(other),t));
};
thx_color__$RGB_RGB_$Impl_$.withAlpha = function(this1,alpha) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),thx_color__$RGB_RGB_$Impl_$.get_green(this1),thx_color__$RGB_RGB_$Impl_$.get_blue(this1),alpha]);
};
thx_color__$RGB_RGB_$Impl_$.withRed = function(this1,newred) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([newred,thx_color__$RGB_RGB_$Impl_$.get_green(this1),thx_color__$RGB_RGB_$Impl_$.get_blue(this1)]);
};
thx_color__$RGB_RGB_$Impl_$.withGreen = function(this1,newgreen) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),newgreen,thx_color__$RGB_RGB_$Impl_$.get_blue(this1)]);
};
thx_color__$RGB_RGB_$Impl_$.withBlue = function(this1,newblue) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),thx_color__$RGB_RGB_$Impl_$.get_green(this1),newblue]);
};
thx_color__$RGB_RGB_$Impl_$.toCSS3 = function(this1) {
	return "rgb(" + thx_color__$RGB_RGB_$Impl_$.get_red(this1) + "," + thx_color__$RGB_RGB_$Impl_$.get_green(this1) + "," + thx_color__$RGB_RGB_$Impl_$.get_blue(this1) + ")";
};
thx_color__$RGB_RGB_$Impl_$.toString = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.toHex(this1);
};
thx_color__$RGB_RGB_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(thx_color__$RGB_RGB_$Impl_$.get_red(this1),2) + StringTools.hex(thx_color__$RGB_RGB_$Impl_$.get_green(this1),2) + StringTools.hex(thx_color__$RGB_RGB_$Impl_$.get_blue(this1),2);
};
thx_color__$RGB_RGB_$Impl_$.equals = function(this1,other) {
	return (thx_color__$RGB_RGB_$Impl_$.get_red(this1) == thx_color__$RGB_RGB_$Impl_$.get_red(other)?thx_color__$RGB_RGB_$Impl_$.get_green(this1) == thx_color__$RGB_RGB_$Impl_$.get_green(other):false)?thx_color__$RGB_RGB_$Impl_$.get_blue(this1) == thx_color__$RGB_RGB_$Impl_$.get_blue(other):false;
};
thx_color__$RGB_RGB_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toRGBX = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),thx_color__$RGB_RGB_$Impl_$.get_green(this1),thx_color__$RGB_RGB_$Impl_$.get_blue(this1)]);
};
thx_color__$RGB_RGB_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.withAlpha(this1,255);
};
thx_color__$RGB_RGB_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(thx_color__$RGB_RGB_$Impl_$.toRGBA(this1));
};
thx_color__$RGB_RGB_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx_color__$RGB_RGB_$Impl_$.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx_color__$RGB_RGB_$Impl_$.get_blue = function(this1) {
	return this1 & 255;
};
var thx_color__$RGBA_RGBA_$Impl_$ = {};
thx_color__$RGBA_RGBA_$Impl_$.__name__ = true;
thx_color__$RGBA_RGBA_$Impl_$.create = function(red,green,blue,alpha) {
	return (red & 255) << 24 | (green & 255) << 16 | (blue & 255) << 8 | alpha & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.fromFloats = function(arr) {
	var ints = thx_core_ArrayFloats.resize(arr,4).map(function(_) {
		return Math.round(_ * 255);
	});
	return thx_color__$RGBA_RGBA_$Impl_$.create(ints[0],ints[1],ints[2],ints[3]);
};
thx_color__$RGBA_RGBA_$Impl_$.fromInt = function(rgba) {
	return rgba;
};
thx_color__$RGBA_RGBA_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,4);
	return thx_color__$RGBA_RGBA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$RGBA_RGBA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			tmp = thx_color__$RGB_RGB_$Impl_$.toRGBA(thx_color__$RGB_RGB_$Impl_$.fromInts(thx_color_parse_ColorParser.getInt8Channels(info.channels,3)));
			break;
		case "rgba":
			tmp = thx_color__$RGBA_RGBA_$Impl_$.create(thx_color_parse_ColorParser.getInt8Channel(info.channels[0]),thx_color_parse_ColorParser.getInt8Channel(info.channels[1]),thx_color_parse_ColorParser.getInt8Channel(info.channels[2]),Math.round(thx_color_parse_ColorParser.getFloatChannel(info.channels[3]) * 255));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGBA_RGBA_$Impl_$._new = function(rgba) {
	return rgba;
};
thx_color__$RGBA_RGBA_$Impl_$.darker = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.darker(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.lighter = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.lighter(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.transparent = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.transparent(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.opaque = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.opaque(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.interpolate = function(this1,other,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.interpolate(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(other),t));
};
thx_color__$RGBA_RGBA_$Impl_$.withAlpha = function(this1,newalpha) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255,newalpha]);
};
thx_color__$RGBA_RGBA_$Impl_$.withRed = function(this1,newred) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([newred,this1 >> 16 & 255,this1 >> 8 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.withGreen = function(this1,newgreen) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 24 & 255,newgreen,this1 >> 8 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.withBlue = function(this1,newblue) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,newblue]);
};
thx_color__$RGBA_RGBA_$Impl_$.toHSLA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1));
};
thx_color__$RGBA_RGBA_$Impl_$.toHSVA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1));
};
thx_color__$RGBA_RGBA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.create(this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255);
};
thx_color__$RGBA_RGBA_$Impl_$.toRGBX = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.toString(this1);
};
thx_color__$RGBA_RGBA_$Impl_$.toString = function(this1) {
	return "rgba(" + (this1 >> 24 & 255) + "," + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) / 255 + ")";
};
thx_color__$RGBA_RGBA_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(this1 & 255,2) + StringTools.hex(this1 >> 24 & 255,2) + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2);
};
thx_color__$RGBA_RGBA_$Impl_$.equals = function(this1,other) {
	return (((this1 >> 24 & 255) == (other >> 24 & 255)?(this1 & 255) == (other & 255):false)?(this1 >> 16 & 255) == (other >> 16 & 255):false)?(this1 >> 8 & 255) == (other >> 8 & 255):false;
};
thx_color__$RGBA_RGBA_$Impl_$.get_alpha = function(this1) {
	return this1 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_red = function(this1) {
	return this1 >> 24 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_green = function(this1) {
	return this1 >> 16 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_blue = function(this1) {
	return this1 >> 8 & 255;
};
var thx_color__$RGBX_RGBX_$Impl_$ = {};
thx_color__$RGBX_RGBX_$Impl_$.__name__ = true;
thx_color__$RGBX_RGBX_$Impl_$.create = function(red,green,blue) {
	var tmp;
	if(red < 0) tmp = 0; else if(red > 1) tmp = 1; else tmp = red;
	var tmp1;
	if(green < 0) tmp1 = 0; else if(green > 1) tmp1 = 1; else tmp1 = green;
	var tmp2;
	if(blue < 0) tmp2 = 0; else if(blue > 1) tmp2 = 1; else tmp2 = blue;
	return [tmp,tmp1,tmp2];
};
thx_color__$RGBX_RGBX_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$RGBX_RGBX_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$RGBX_RGBX_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,3);
	return thx_color__$RGBX_RGBX_$Impl_$.create(arr[0] / 255,arr[1] / 255,arr[2] / 255);
};
thx_color__$RGBX_RGBX_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			tmp = thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],0),thx_core_Floats.interpolate(t,this1[1],0),thx_core_Floats.interpolate(t,this1[2],0)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],1),thx_core_Floats.interpolate(t,this1[1],1),thx_core_Floats.interpolate(t,this1[2],1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toString(this1);
};
thx_color__$RGBX_RGBX_$Impl_$.toString = function(this1) {
	return "rgb(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$RGBX_RGBX_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(thx_color__$RGBX_RGBX_$Impl_$.get_red(this1),2) + StringTools.hex(thx_color__$RGBX_RGBX_$Impl_$.get_green(this1),2) + StringTools.hex(thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1),2);
};
thx_color__$RGBX_RGBX_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$RGBX_RGBX_$Impl_$.withAlpha = function(this1,alpha) {
	var tmp;
	var tmp1;
	if(alpha < 0) tmp1 = 0; else if(alpha > 1) tmp1 = 1; else tmp1 = alpha;
	var channels = this1.concat([tmp1]);
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.withRed = function(this1,newred) {
	var tmp;
	var tmp1;
	if(newred < 0) tmp1 = 0; else if(newred > 1) tmp1 = 1; else tmp1 = newred;
	var channels = [tmp1,thx_color__$RGBX_RGBX_$Impl_$.get_green(this1),thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.withGreen = function(this1,newgreen) {
	var tmp;
	var tmp1;
	if(newgreen < 0) tmp1 = 0; else if(newgreen > 1) tmp1 = 1; else tmp1 = newgreen;
	var channels = [thx_color__$RGBX_RGBX_$Impl_$.get_red(this1),tmp1,thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.withBlue = function(this1,newblue) {
	var tmp;
	var tmp1;
	if(newblue < 0) tmp1 = 0; else if(newblue > 1) tmp1 = 1; else tmp1 = newblue;
	var channels = [thx_color__$RGBX_RGBX_$Impl_$.get_red(this1),thx_color__$RGBX_RGBX_$Impl_$.get_green(this1),tmp1];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.toCIELab = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toCIELab(thx_color__$RGBX_RGBX_$Impl_$.toXYZ(this1));
};
thx_color__$RGBX_RGBX_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toCIELCh(thx_color__$RGBX_RGBX_$Impl_$.toCIELab(this1));
};
thx_color__$RGBX_RGBX_$Impl_$.toCMY = function(this1) {
	return [1 - this1[0],1 - this1[1],1 - this1[2]];
};
thx_color__$RGBX_RGBX_$Impl_$.toCMYK = function(this1) {
	var c = 0.0;
	var y = 0.0;
	var m = 0.0;
	var k;
	if(this1[0] + this1[1] + this1[2] == 0) k = 1.0; else {
		k = 1 - Math.max(Math.max(this1[0],this1[1]),this1[2]);
		c = (1 - this1[0] - k) / (1 - k);
		m = (1 - this1[1] - k) / (1 - k);
		y = (1 - this1[2] - k) / (1 - k);
	}
	return [c,m,y,k];
};
thx_color__$RGBX_RGBX_$Impl_$.toGrey = function(this1) {
	return this1[0] * .2126 + this1[1] * .7152 + this1[2] * .0722;
};
thx_color__$RGBX_RGBX_$Impl_$.toPerceivedGrey = function(this1) {
	return this1[0] * .299 + this1[1] * .587 + this1[2] * .114;
};
thx_color__$RGBX_RGBX_$Impl_$.toPerceivedAccurateGrey = function(this1) {
	var tmp;
	var grey = Math.pow(this1[0],2) * .241 + Math.pow(this1[1],2) * .691 + Math.pow(this1[2],2) * .068;
	tmp = grey;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.toHSL = function(this1) {
	var min = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	var max = Math.max(Math.max(this1[0],this1[1]),this1[2]);
	var delta = max - min;
	var h;
	var s;
	var l = (max + min) / 2;
	if(delta == 0.0) s = h = 0.0; else {
		s = l < 0.5?delta / (max + min):delta / (2 - max - min);
		if(this1[0] == max) h = (this1[1] - this1[2]) / delta + (this1[1] < thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1)?6:0); else if(this1[1] == max) h = (this1[2] - this1[0]) / delta + 2; else h = (this1[0] - this1[1]) / delta + 4;
		h *= 60;
	}
	return [h,s,l];
};
thx_color__$RGBX_RGBX_$Impl_$.toHSV = function(this1) {
	var min = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	var max = Math.max(Math.max(this1[0],this1[1]),this1[2]);
	var delta = max - min;
	var h;
	var s;
	var v = max;
	if(delta != 0) s = delta / max; else {
		s = 0;
		h = -1;
		return [-1,0,v];
	}
	if(this1[0] == max) h = (this1[1] - this1[2]) / delta; else if(this1[1] == max) h = 2 + (this1[2] - this1[0]) / delta; else h = 4 + (this1[0] - this1[1]) / delta;
	h *= 60;
	if(h < 0) h += 360;
	return [h,s,v];
};
thx_color__$RGBX_RGBX_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.createf(this1[0],this1[1],this1[2]);
};
thx_color__$RGBX_RGBX_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.withAlpha(this1,1.0);
};
thx_color__$RGBX_RGBX_$Impl_$.toXYZ = function(this1) {
	var r = this1[0];
	var g = this1[1];
	var b = this1[2];
	r = 100 * (r > 0.04045?Math.pow((r + 0.055) / 1.055,2.4):r / 12.92);
	g = 100 * (g > 0.04045?Math.pow((g + 0.055) / 1.055,2.4):g / 12.92);
	b = 100 * (b > 0.04045?Math.pow((b + 0.055) / 1.055,2.4):b / 12.92);
	return [r * 0.4124 + g * 0.3576 + b * 0.1805,r * 0.2126 + g * 0.7152 + b * 0.0722,r * 0.0193 + g * 0.1192 + b * 0.9505];
};
thx_color__$RGBX_RGBX_$Impl_$.toYxy = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ(this1));
};
thx_color__$RGBX_RGBX_$Impl_$.get_red = function(this1) {
	return Math.round(this1[0] * 255);
};
thx_color__$RGBX_RGBX_$Impl_$.get_green = function(this1) {
	return Math.round(this1[1] * 255);
};
thx_color__$RGBX_RGBX_$Impl_$.get_blue = function(this1) {
	return Math.round(this1[2] * 255);
};
thx_color__$RGBX_RGBX_$Impl_$.get_redf = function(this1) {
	return this1[0];
};
thx_color__$RGBX_RGBX_$Impl_$.get_greenf = function(this1) {
	return this1[1];
};
thx_color__$RGBX_RGBX_$Impl_$.get_bluef = function(this1) {
	return this1[2];
};
var thx_color__$RGBXA_RGBXA_$Impl_$ = {};
thx_color__$RGBXA_RGBXA_$Impl_$.__name__ = true;
thx_color__$RGBXA_RGBXA_$Impl_$.create = function(red,green,blue,alpha) {
	var tmp;
	if(red < 0) tmp = 0; else if(red > 1) tmp = 1; else tmp = red;
	var tmp1;
	if(green < 0) tmp1 = 0; else if(green > 1) tmp1 = 1; else tmp1 = green;
	var tmp2;
	if(blue < 0) tmp2 = 0; else if(blue > 1) tmp2 = 1; else tmp2 = blue;
	var tmp3;
	if(alpha < 0) tmp3 = 0; else if(alpha > 1) tmp3 = 1; else tmp3 = alpha;
	return [tmp,tmp1,tmp2,tmp3];
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$RGBXA_RGBXA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,4);
	return thx_color__$RGBXA_RGBXA_$Impl_$.create(arr[0] / 255,arr[1] / 255,arr[2] / 255,arr[3] / 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			tmp = thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3)));
			break;
		case "rgba":
			tmp = thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.darker = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.darker(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1),t),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.lighter = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.lighter(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1),t),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.transparent = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Ints.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.opaque = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Ints.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Ints.interpolate(t,this1[0],other[0]),thx_core_Ints.interpolate(t,this1[1],other[1]),thx_core_Ints.interpolate(t,this1[2],other[2]),thx_core_Ints.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withAlpha = function(this1,newalpha) {
	var tmp;
	var tmp1;
	if(newalpha < 0) tmp1 = 0; else if(newalpha > 1) tmp1 = 1; else tmp1 = newalpha;
	var channels = [thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),tmp1];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withRed = function(this1,newred) {
	var tmp;
	var tmp1;
	if(newred < 0) tmp1 = 0; else if(newred > 1) tmp1 = 1; else tmp1 = newred;
	var channels = [tmp1,thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withGreen = function(this1,newgreen) {
	var tmp;
	var tmp1;
	if(newgreen < 0) tmp1 = 0; else if(newgreen > 1) tmp1 = 1; else tmp1 = newgreen;
	var channels = [thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),tmp1,thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withBlue = function(this1,newblue) {
	var tmp;
	var tmp1;
	if(newblue < 0) tmp1 = 0; else if(newblue > 1) tmp1 = 1; else tmp1 = newblue;
	var channels = [thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),tmp1,thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toString(this1);
};
thx_color__$RGBXA_RGBXA_$Impl_$.toString = function(this1) {
	return "rgba(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1),2) + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),2) + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),2) + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),2);
};
thx_color__$RGBXA_RGBXA_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1)),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1)),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX = function(this1) {
	var tmp;
	var channels = this1.slice(0,3);
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this1[0],this1[1],this1[2],this1[3]]);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_red = function(this1) {
	return Math.round(this1[0] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_green = function(this1) {
	return Math.round(this1[1] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_blue = function(this1) {
	return Math.round(this1[2] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha = function(this1) {
	return Math.round(this1[3] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_redf = function(this1) {
	return this1[0];
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_greenf = function(this1) {
	return this1[1];
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_bluef = function(this1) {
	return this1[2];
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_alphaf = function(this1) {
	return this1[3];
};
var thx_color__$XYZ_XYZ_$Impl_$ = {};
thx_color__$XYZ_XYZ_$Impl_$.__name__ = true;
thx_color__$XYZ_XYZ_$Impl_$.create = function(x,y,z) {
	return [x,y,z];
};
thx_color__$XYZ_XYZ_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$XYZ_XYZ_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$XYZ_XYZ_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "ciexyz":case "xyz":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$XYZ_XYZ_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$.withX = function(this1,newx) {
	return [newx,this1[1],this1[2]];
};
thx_color__$XYZ_XYZ_$Impl_$.withY = function(this1,newy) {
	return [this1[0],newy,this1[2]];
};
thx_color__$XYZ_XYZ_$Impl_$.withZ = function(this1,newz) {
	return [this1[0],this1[1],newz];
};
thx_color__$XYZ_XYZ_$Impl_$.toString = function(this1) {
	return "XYZ(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$XYZ_XYZ_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$XYZ_XYZ_$Impl_$.toCIELab = function(this1) {
	var x = this1[0] * 0.0105211106;
	var y = this1[1] * 0.01;
	var z = this1[2] * 0.00918417016;
	x = x > 0.008856?Math.pow(x,0.333333333333333315):7.787 * x + 0.137931034482758619;
	y = y > 0.008856?Math.pow(y,0.333333333333333315):7.787 * y + 0.137931034482758619;
	z = z > 0.008856?Math.pow(z,0.333333333333333315):7.787 * z + 0.137931034482758619;
	return y > 0.008856?[116 * y - 16,500 * (x - y),200 * (y - z)]:[903.3 * y,500 * (x - y),200 * (y - z)];
};
thx_color__$XYZ_XYZ_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toCIELCh(thx_color__$XYZ_XYZ_$Impl_$.toCIELab(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$XYZ_XYZ_$Impl_$.toRGBXA(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBX = function(this1) {
	var x = this1[0] / 100;
	var y = this1[1] / 100;
	var z = this1[2] / 100;
	var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	var b = x * 0.0557 + y * -0.204 + z * 1.0570;
	r = r > 0.0031308?1.055 * Math.pow(r,0.416666666666666685) - 0.055:12.92 * r;
	g = g > 0.0031308?1.055 * Math.pow(g,0.416666666666666685) - 0.055:12.92 * g;
	b = b > 0.0031308?1.055 * Math.pow(b,0.416666666666666685) - 0.055:12.92 * b;
	return [r,g,b];
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toYxy = function(this1) {
	var sum = this1[0] + this1[1] + this1[2];
	return [this1[1],sum == 0?1:this1[0] / sum,sum == 0?1:this1[1] / sum];
};
thx_color__$XYZ_XYZ_$Impl_$.get_x = function(this1) {
	return this1[0];
};
thx_color__$XYZ_XYZ_$Impl_$.get_y = function(this1) {
	return this1[1];
};
thx_color__$XYZ_XYZ_$Impl_$.get_z = function(this1) {
	return this1[2];
};
var thx_color__$Yxy_Yxy_$Impl_$ = {};
thx_color__$Yxy_Yxy_$Impl_$.__name__ = true;
thx_color__$Yxy_Yxy_$Impl_$.create = function(y1,x,y2) {
	return [y1,x,y2];
};
thx_color__$Yxy_Yxy_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$Yxy_Yxy_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$Yxy_Yxy_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "yxy":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$Yxy_Yxy_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$.withY1 = function(this1,newy1) {
	return [newy1,this1[1],this1[2]];
};
thx_color__$Yxy_Yxy_$Impl_$.withY = function(this1,newx) {
	return [this1[0],this1[1],this1[2]];
};
thx_color__$Yxy_Yxy_$Impl_$.withZ = function(this1,newy2) {
	return [this1[0],this1[1],this1[2]];
};
thx_color__$Yxy_Yxy_$Impl_$.toString = function(this1) {
	return "Yxy(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$Yxy_Yxy_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$Yxy_Yxy_$Impl_$.toCIELab = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toCIELab(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toCIELCh(thx_color__$Yxy_Yxy_$Impl_$.toCIELab(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$Yxy_Yxy_$Impl_$.toRGBXA(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBX = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toXYZ = function(this1) {
	return [this1[1] * (this1[0] / this1[2]),this1[0],(1 - this1[1] - this1[2]) * (this1[0] / this1[2])];
};
thx_color__$Yxy_Yxy_$Impl_$.get_y1 = function(this1) {
	return this1[0];
};
thx_color__$Yxy_Yxy_$Impl_$.get_x = function(this1) {
	return this1[1];
};
thx_color__$Yxy_Yxy_$Impl_$.get_y2 = function(this1) {
	return this1[2];
};
var thx_color_parse_ColorParser = function() {
	this.pattern_color = new EReg("^\\s*([^(]+)\\s*\\(([^)]*)\\)\\s*$","i");
	this.pattern_channel = new EReg("^\\s*(\\d*.\\d+|\\d+)(%|deg|rad)?\\s*$","i");
};
thx_color_parse_ColorParser.__name__ = true;
thx_color_parse_ColorParser.parseColor = function(s) {
	return thx_color_parse_ColorParser.parser.processColor(s);
};
thx_color_parse_ColorParser.parseHex = function(s) {
	return thx_color_parse_ColorParser.parser.processHex(s);
};
thx_color_parse_ColorParser.parseChannel = function(s) {
	return thx_color_parse_ColorParser.parser.processChannel(s);
};
thx_color_parse_ColorParser.getFloatChannels = function(channels,length,useInt8) {
	if(useInt8 == null) useInt8 = true;
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	var tmp;
	var a2 = useInt8;
	tmp = function(a1) {
		return thx_color_parse_ColorParser.getFloatChannel(a1,a2);
	};
	return channels.map(tmp);
};
thx_color_parse_ColorParser.getInt8Channels = function(channels,length) {
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	return channels.map(thx_color_parse_ColorParser.getInt8Channel);
};
thx_color_parse_ColorParser.getFloatChannel = function(channel,useInt8) {
	if(useInt8 == null) useInt8 = true;
	var tmp;
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) tmp = 1; else tmp = 0;
		break;
	case 1:
		var v1 = channel[2];
		tmp = v1;
		break;
	case 4:
		var v2 = channel[2];
		tmp = v2;
		break;
	case 2:
		var v3 = channel[2];
		tmp = v3;
		break;
	case 3:
		var v4 = channel[2];
		if(useInt8) tmp = v4 / 255; else {
			var v5 = channel[2];
			tmp = v5;
		}
		break;
	case 0:
		var v6 = channel[2];
		tmp = v6 / 100;
		break;
	}
	return tmp;
};
thx_color_parse_ColorParser.getInt8Channel = function(channel) {
	var tmp;
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) tmp = 1; else tmp = 0;
		break;
	case 3:
		var v1 = channel[2];
		tmp = v1;
		break;
	case 0:
		var v2 = channel[2];
		tmp = Math.round(255 * v2 / 100);
		break;
	default:
		throw "unable to extract a valid int8 value";
	}
	return tmp;
};
thx_color_parse_ColorParser.prototype = {
	processHex: function(s) {
		if(!thx_color_parse_ColorParser.isPureHex.match(s)) {
			if(HxOverrides.substr(s,0,1) == "#") {
				if(s.length == 4) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3); else if(s.length == 5) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3) + s.charAt(4) + s.charAt(4); else s = HxOverrides.substr(s,1,null);
			} else if(HxOverrides.substr(s,0,2) == "0x") s = HxOverrides.substr(s,2,null); else return null;
		}
		var channels = [];
		while(s.length > 0) {
			channels.push(thx_color_parse_ChannelInfo.CIInt8(Std.parseInt("0x" + HxOverrides.substr(s,0,2))));
			s = HxOverrides.substr(s,2,null);
		}
		if(channels.length == 4) return new thx_color_parse_ColorInfo("rgba",channels.slice(1).concat([channels[0]])); else return new thx_color_parse_ColorInfo("rgb",channels);
	}
	,processColor: function(s) {
		if(!this.pattern_color.match(s)) return null;
		var name = this.pattern_color.matched(1);
		if(null == name) return null;
		name = name.toLowerCase();
		var m2 = this.pattern_color.matched(2);
		var s_channels = null == m2?[]:m2.split(",");
		var channels = [];
		var channel;
		var _g = 0;
		while(_g < s_channels.length) {
			var s_channel = s_channels[_g];
			++_g;
			channel = this.processChannel(s_channel);
			if(null == channel) return null;
			channels.push(channel);
		}
		return new thx_color_parse_ColorInfo(name,channels);
	}
	,processChannel: function(s) {
		if(!this.pattern_channel.match(s)) return null;
		var value = this.pattern_channel.matched(1);
		var unit = this.pattern_channel.matched(2);
		if(unit == null) unit = "";
		var tmp;
		try {
			switch(unit) {
			case "%":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIPercent(thx_core_Floats.parse(value)); else tmp = null;
				break;
			case "deg":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value)); else tmp = null;
				break;
			case "DEG":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value)); else tmp = null;
				break;
			case "rad":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value) * 180 / Math.PI); else tmp = null;
				break;
			case "RAD":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value) * 180 / Math.PI); else tmp = null;
				break;
			case "":
				if(thx_core_Ints.canParse(value)) {
					var i = thx_core_Ints.parse(value);
					if(i == 0) tmp = thx_color_parse_ChannelInfo.CIBool(false); else if(i == 1) tmp = thx_color_parse_ChannelInfo.CIBool(true); else if(i < 256) tmp = thx_color_parse_ChannelInfo.CIInt8(i); else tmp = thx_color_parse_ChannelInfo.CIInt(i);
				} else if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIFloat(thx_core_Floats.parse(value)); else tmp = null;
				break;
			default:
				tmp = null;
			}
		} catch( e ) {
			return null;
		}
		return tmp;
	}
	,__class__: thx_color_parse_ColorParser
};
var thx_color_parse_ColorInfo = function(name,channels) {
	this.name = name;
	this.channels = channels;
};
thx_color_parse_ColorInfo.__name__ = true;
thx_color_parse_ColorInfo.prototype = {
	toString: function() {
		return "" + this.name + ", channels: " + Std.string(this.channels);
	}
	,__class__: thx_color_parse_ColorInfo
};
var thx_color_parse_ChannelInfo = { __ename__ : true, __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx_color_parse_ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
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
var thx_core_error_NullArgument = function(message,posInfo) {
	thx_core_Error.call(this,message,null,posInfo);
};
thx_core_error_NullArgument.__name__ = true;
thx_core_error_NullArgument.__super__ = thx_core_Error;
thx_core_error_NullArgument.prototype = $extend(thx_core_Error.prototype,{
	__class__: thx_core_error_NullArgument
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
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
thx_color__$Grey_Grey_$Impl_$.black = 0;
thx_color__$Grey_Grey_$Impl_$.white = 1;
thx_color_parse_ColorParser.parser = new thx_color_parse_ColorParser();
thx_color_parse_ColorParser.isPureHex = new EReg("^([0-9a-f]{2}){3,4}$","i");
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
