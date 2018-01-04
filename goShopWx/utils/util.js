const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//金额转换
const money = num => {
    if( !num ) return '0.00';
        num = num.toString().replace(/\$|\,/g,'');
      
    if(isNaN(num))
        num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num*100+0.50000000001);
        var cents = num%100;
        num = Math.floor(num/100).toString();

    if(cents<10)
        cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
        num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + num + '.' + cents);
}


//金额数值大写转换
const numberDx = n =>{
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
}



//金额过滤器 [s数值,n保留几位数]
const number = (s,n) => {
    if( !s ) return '0.00';
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
      var t = "";
      for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      return t.split("").reverse().join("") + "." + r;
}


//request请求
function request(url,postData,doSuccess,doFail,doComplete){ 
    var host = getApp().globalData.conf.host;
    wx.request({
        url: host+url,
        data:postData,
        method: 'POST', 
        success: function(res){
            if(typeof doSuccess == "function"){
                doSuccess(res);
            }
        },
        fail: function() {
            if(typeof doFail == "function"){
                doFail();
            }
        },
        complete: function() {
            if(typeof doComplete == "function"){
                doComplete();
            }
        }
   });
}


module.exports = {
    formatTime: formatTime,
    money: money,
    numberDx: numberDx,
    number: number,
    request:request
}
