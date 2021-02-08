var xmlhttp = new XMLHttpRequest();
var xmlhttp2 = new XMLHttpRequest();

var json;
var json2;

var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
var url2 = "https://api.exchangeratesapi.io/latest?base=USD";

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    json = JSON.parse(this.responseText);
    parseJson();
  }
};

xmlhttp2.onreadystatechange = function () {
  console.log(this.readyState, this.status, this.responseText);
  if (this.readyState == 4 && this.status == 200) {
    json2 = JSON.parse(this.responseText);
    parseJson();
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp2.open("GET", url2, true);
xmlhttp2.send();

function parseJson() {
  if (json == undefined || json2 == undefined) {
    return;
  }
  console.log("both found...")
  var time = "<b>Last Updated : " + json["time"]["updated"] + "</b>";
  var usdValue = parseFloat(json["bpi"]["USD"]["rate"].replace(/,/g, ''));
  var usdthb = json2["rates"]["THB"];
  var usdchf = json2["rates"]["CHF"];
  var thbchf = ((1 - usdchf) + 1) * usdthb * 1.01395;
  var satusd = 1 / (usdValue / 100000000)
  var satchf = 1 / (usdValue  * usdchf / 100000000)
  var satthb = 1 / (usdValue  * usdthb / 100000000)

  console.log(thbchf)

  document.getElementById("data").innerHTML = time +

    "<br /><br /><b> Bitcoin USD Values</b>" +
    "<br />" + "1 BTC equals to USD: " + usdValue.toFixed(2) +
    "<br />" + "1 USD is in satoshis: " + satusd.toFixed(2) +
    "<br />" + "1 satoshi is in USD: " + (usdValue / 100000000).toFixed(6) +

    "<br /><br /> <b>Bitcoin CHF Values</b>" +
    "<br />" + "1 BTC equals to CHF: " + (usdValue * usdchf).toFixed(2) +
    "<br />" + "1 CHF is in satoshis: " + satchf.toFixed(2) +

    "<br /><br /> <b>Bitcoin THB Values</b>" +
    "<br />" + "1 BTC equals to THB: " + (usdValue * usdthb).toFixed(2) +
    "<br />" + "0.1 BTC equals to THB: " + ((usdValue * usdthb / 10)).toFixed(2) +
    "<br />" + "1.554 BTC equals to: " + ((usdValue * usdthb * 1.554 / 1000000)).toFixed(3) + " Million Baht" +
    "<br />" + "1 THB is in satoshis: " + satthb.toFixed(2) +

    "<br /><br /> <b>CHF THB conversion</b>" +
    "<br />" + "1 CHF equals to THB: " + (thbchf.toFixed(2)) +
    "";
}

