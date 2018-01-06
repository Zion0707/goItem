//时间戳格式化
(function($, window) {
    $.dateFormat = function (date, fmt) {
        date = date || new Date();
        var o = {
            "M+": date.getMonth() + 1,
            //月份
            "d+": date.getDate(),
            //日
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
            //小时
            "H+": date.getHours(),
            //小时
            "m+": date.getMinutes(),
            //分
            "s+": date.getSeconds(),
            //秒
            S: date.getMilliseconds()
        }, week = {
            "0": "日",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        }, zhou = {
            1: "一",
            2: "二",
            3: "三",
            4: "四",
            5: "五",
            6: "六"
        };
        fmt = fmt || "yyyy-MM-dd HH:mm:ss";
        if (/(y+)/.test(fmt)) {
            //年特殊处理
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            //星期特殊处理
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + week[date.getDay() + ""]);
        }
        if (/(e+)/.test(fmt)) {
            //第几周特殊处理
            var z = ~~(date.getDate() / 7) + 1;
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length > 1 ? zhou[z] : z);
        }
        if (/(q+)/.test(fmt)) {
            //第几季特殊处理
            var z = Math.floor((date.getMonth() + 3) / 3);
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length > 1 ? zhou[z] : z);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    };
    $.formatTimestamp = function (v,type) {
        v = new Date(Number(v));
        return $.dateFormat(v, type);
    }
})(jQuery, window);
var Core = top.window['Core'] || {};
/**
*获取url参数
*/
Core.queryParams = {
    /**
     * 将地址栏查询参数转为json对象
     * @param url
     * @return {Object}
     */
    getQueryParams: function(url, decode) {
        if (!url) return {};
        url = url.split("#")[0];
        var us = url.split("?"), obj = {}, u;
        if (us.length > 1) {
            us = us[1].split("&");
            for (var i = 0, c = us.length; i < c; i++) {
                u = us[i].split("=");
                obj[u[0]] = decode ? decodeURIComponent(u[1]) : u[1];
            }
        }
        return obj;
    },
    /**
     * 将地址栏指定key的查询参数
     * @param key
     * @param url
     * @return {String}
     */
    getQueryParamByKey: function(key, url) {
        url = url || location.href;
        var obj = Core.queryParams.getQueryParams(url);
        return obj[key] || "";
    }
}
//获取未来的时间
Core.futureDay = function( day ){
    var d = new Date();
    return new Date(d.getTime() + (day-1) *24*60*60*1000);
}
Core.amountNumber = function(s, n){
    if( !s ) return '0.00';
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
  t = "";
  for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}
//验证时间和格式是否正确：格式yyyy-mm-dd
Core.checkDateTime = function(str){
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
    if(r==null)return false; 
    var d= new Date(r[1], r[3]-1, r[4]); 
    return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
//比较相差天数：起始天数，结束天数
Core.dimDd = function(t1,t2){   
    var s1 = new Date(t1.replace(/-/g, '/'))
    var s2 = new Date(t2.replace(/-/g, '/'))
    var days = s2.getTime() - s1.getTime();
    return parseInt(days / (1000 * 60 * 60 * 24));
}
 
//获取文件后缀名
Core.getSuffix = function( filename ){
   if( filename ){
       var index1 = filename.lastIndexOf('.');
       var index2 = filename.length;
       return filename.substring( index1, index2)
   }else{
       return '';
   }
}
/**
 * 数组对象的深拷贝
 * @param source 数组对象
 */
Core.cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            Core.cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
}
//金额数值转换
Core.NumberDx = function(n){
    if ( n === '0' ) return '零元';
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据非法";
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
        n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p+1, 2);
        unit = unit.substr(unit.length - n.length);
    for (var i=0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
/**** elemnet ui表单验证函数 ****/
//必须是手机号
function checkPhone(rule, value, callback){
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if ( !value ) {
        return callback(new Error('值不能为空'));
    }else if( !reg.test(value) ){
        return callback(new Error('请填写正确的手机号'));
    }else{
        return callback();
    }
}
// 必须是汉字
function checkName(rule, value, callback){
    var reg = /^[\u4E00-\u9FA5]{2,4}$/
    if ( !value ) {
        return callback(new Error('值不能为空'));
    }else if( !reg.test(value) ){
        return callback(new Error('必须是2~4个汉字'));
    }else{
        return callback();
    }
}
// 必须是整数
function checkNumber(rule, value, callback){
    var reg = /^[0-9]*$/
    if ( !value ) {
        return callback(new Error('值不能为空'));
    }else if( !reg.test(value) ){
        return callback(new Error('必须是整数'));
    }else{
        return callback();
    }
}
// 必须是数值
function checkMoney(rule, value, callback){
    var reg = /^\d+(\.\d+)?$/
    if ( !value ) {
        return callback(new Error('值不能为空'));
    }else if( !reg.test(value) ){
        return callback(new Error('必须是数值'));
    }else{
        return callback();
    }
}
//身份证验证
function checkIdCard(rule, value, callback){
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if ( !value ) {
        return callback(new Error('值不能为空'));
    }else if( !reg.test(value) ){
        return callback(new Error('请填写正确的身份证'));
    }else{
        return callback();
    }
}
//家庭住址验证
function checkHomeAddress(rule, value, callback){
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]{2,30}/
    if ( !value ) {
        return callback(new Error('值不能为空'));
    }else if( !reg.test(value) ){
        return callback(new Error('请填写正确的家庭住址'));
    }else{
        return callback();
    }
}
//必须是手机号
function checkPhoneFree(rule, value, callback){
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if ( value == '' ) {
        return callback();
    }else if( !reg.test(value) ){
        return callback(new Error('请填写正确的手机号'));
    }else{
        return callback();
    }
}
// 必须是汉字
function checkNameFree(rule, value, callback){
    var reg = /^[\u4E00-\u9FA5]{2,4}$/
    if ( value == '' ) {
        return callback();
    }else if( !reg.test(value) ){
        return callback(new Error('必须是2~4个汉字'));
    }else{
        return callback();
    }
}
// 必须是整数
function checkNumberFree(rule, value, callback){
    var reg = /^[0-9]*$/
    if ( value == '' ) {
        return callback();
    }else if( !reg.test(value) ){
        return callback(new Error('必须是整数'));
    }else{
        return callback();
    }
}
// 必须是数值
function checkMoneyFree(rule, value, callback){
    var reg = /^\d+(\.\d+)?$/
    if ( value == '' ) {
        return callback();
    }else if( !reg.test(value) ){
        return callback(new Error('必须是数值'));
    }else{
        return callback();
    }
}
//身份证验证
function checkIdCardFree(rule, value, callback){
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if ( value == '' ) {
        return callback();
    }else if( !reg.test(value) ){
        return callback(new Error('请填写正确的身份证'));
    }else{
        return callback();
    }
}
//家庭住址验证
function checkHomeAddressFree(rule, value, callback){
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]{2,30}/
    if ( value == '' ) {
        return callback();
    }else if( !reg.test(value) ){
        return callback(new Error('请填写正确的家庭住址'));
    }else{
        return callback();
    }
}