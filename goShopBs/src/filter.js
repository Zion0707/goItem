/** Vue 自定义过滤器整合 **/ 
import Vue from 'vue'
//金额数值大写转换
Vue.filter('moneyDx',function(n){
    if ( n === '0' ) return '零元';
    if ( n =='' )
        return;
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n) && n != '')
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
})
//保留两位小数金额（常用）
Vue.filter('money',function(num) {
    if( !num ) return '0.00';
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    let cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
})
//vue 全局金额过滤器 [s数值,n保留几位数]
Vue.filter('moneyN',function(s, n) {
    if( !s ) return '0.00';
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
})
//vue保留两位小数，但不四舍五入 
Vue.filter('floatingPoint',function(s,n){
    if( !s ) return '0.00';
    s = s.toString()
    if ( s.indexOf('.') == -1 ) {
        s += '.00'
    }else if( s.split('.')[1].length == 1 ){
        s += '0'
    }else{
        var si = s.indexOf('.') + n + 1 ;
        s = s.substr( 0 , si );
    }
    return s;
})