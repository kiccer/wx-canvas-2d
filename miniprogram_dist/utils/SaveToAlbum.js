"use strict";function ownKeys(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,r)}return o}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(o),!0).forEach(function(e){_defineProperty(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var getAuth=function(r){return new Promise(function(o,t){wx.getSetting({success:function(t){var e=function(e){return{settings:t,code:e}};void 0!==t.authSetting["scope."+r]&&!0!==t.authSetting["scope."+r]?o(e(1)):void 0===t.authSetting["scope."+r]?o(e(2)):o(e(3))},fail:function(e){t(e)}})})},saveImageToPhotosAlbum=function(e){return new Promise(function(t,o){wx.saveImageToPhotosAlbum({filePath:e,success:function(e){t()},fail:function(e){o(e)}})})};module.exports={name:"save",handler:function(e){var i=this;return new Promise(function(o,r){var n=_objectSpread({x:0,y:0,width:0,height:0,destWidth:0,destHeight:0,modalOption:{}},e);wx.canvasToTempFilePath({x:n.x,y:n.y,width:n.width,height:n.height,destWidth:i.xDpr(n.destWidth),destHeight:i.xDpr(n.destHeight),canvas:i.canvas,success:function(e){var t=e.tempFilePath;getAuth("writePhotosAlbum").then(function(e){1===e.code?wx.showModal({title:n.modalOption.title||"获取权限",content:n.modalOption.content||"请前往开启相册权限",success:n.modalOption.success||function(e){e.confirm?(wx.openSetting(),i.debugLogout("用户前往授权页","error"),r(Error("用户前往授权页"))):e.cancel&&(i.debugLogout("用户拒绝授权","error"),r(Error("用户拒绝授权")))}}):[2,3].includes(e.code)&&saveImageToPhotosAlbum(t).then(function(e){i.debugLogout("保存图片到相册成功"),o()}).catch(function(){i.debugLogout("保存图片到相册失败","error"),r(Error("保存图片到相册失败"))})}).catch(function(){i.debugLogout("获取设置信息失败","error"),r(Error("获取设置信息失败"))})},fail:function(){i.debugLogout("生成图片失败","error"),r(Error("生成图片失败"))}})})}};