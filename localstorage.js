/**
 * @desc: 一个本地存储的类，兼容各个浏览器
 * 如果支持本地存储，可以借鉴html5，若果是ie8以下，可以使用userdata
 * 兼容ie6+, ff3.5+, chrome4.0+, safari4.0+, opera10.5+
 * @author: 刘杰
 * @email: liujiejunior@gmail.com
 */
 
var util = util || {};
util.localStorage = (function(window){
	var supportHtml5Storage =  ('localStorage' in window) && window['localStorage'] !== null;
	var fname = location.hostname;
	var loc = null;
	return {
		init: function(){			
			if(supportHtml5Storage){
				loc = window.localStorage;				
				return true;
			}else{
				try{					
					loc = document.createElement('input');
					loc.type = "hidden";                 
					//o.style.behavior = "url('#default#userData')" ; 
					loc.addBehavior("#default#userData"); 
					var expires = new Date();
                    expires.setDate(expires.getDate()+365);
                    loc.expires = expires.toUTCString();					
					document.body.appendChild(loc);				
					return true;
				}catch(e){
					return false;
				}
			}
		},
		set: function(key, value, options){
			if(!!!key) return false;
			if(supportHtml5Storage){
				//localstorage not supports the type of value except string
				if(typeof value != 'string'){
					//the browser can support JSON if it supports localStorage in html5
					value = JSON.stringify(value); 
				}
				loc.setItem(key, value);
			}else{
				loc.load(fname);
				loc.setAttribute(key,value);
				loc.save(fname);
			}
		},
		get: function(key){
			if(!!!key) return null;
			if(supportHtml5Storage){
				return loc.getItem(key);
			}else{
				loc.load(fname);
				return loc.getAttribute(key);
			}
		},
		remove: function(key){
			if(!!!key) return false;
			if(supportHtml5Storage){
				loc.removeItem(key);
			}else{
				loc.load(fname);
				loc.removeAttribute(key);
				loc.save(fname);
			}
		},
		clear: function(){
			if(supportHtml5Storage){
				loc.clear();
			}else{
				loc.expires = -10;
				loc.save(fname);
			}
		}
	}
})(window);