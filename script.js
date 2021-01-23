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

/*
  parseJson in beiden onreadystatechange Funktionen aufrufen
  Die JSON-Daten werden asynchron bezogen. D.h. du weisst nicht wann die Daten wirklich da sind.
  Wenn man nun die Funktion bei beiden Datenbezügen aufruft und an erster Stelle in der
  Funktion prüft ob beide Datensätze da sind, kann man das "synchronisieren" oder wie
  man das auch immer nennen will.
*/

function parseJson() {
  if (json == undefined || json2 == undefined) {
    return;
  }
  console.log("both found...")
  var time = "<b>Last Updated : " + json["time"]["updated"] + "</b>";
  var usdValue = parseFloat(json["bpi"]["USD"]["rate"].replace(/,/g, ''));
  var usdthb = json2["rates"]["THB"];
  var usdchf = json2["rates"]["CHF"];
  var thbchf = ((1 - usdchf) + 1) * usdthb;
  var satusd = 1 / (usdValue / 100000000)
  var satchf = 1 / (usdValue  * usdchf / 100000000)
  var satthb = 1 / (usdValue  * usdthb / 100000000)

  console.log(thbchf)

  document.getElementById("data").innerHTML = time +

    "<br /><br /><b> Bitcoin USD Values</b>" +
    "<br />" + "1 BTC equals to USD: " + usdValue +
    "<br />" + "0.1 BTC equals to USD: " + (usdValue / 10) +
    "<br />" + "1.554 BTC equals to USD: " + (usdValue * 1.554) +
    "<br />" + "1 USD is in satoshis: " + satusd +
    "<br />" + "1 satoshi is in USD: " + (usdValue / 100000000) +
    "<br /><br />" +
    "<br /><br /> <b>Bitcoin CHF Values</b>" +
    "<br />" + "1 BTC equals to CHF: " + (usdValue * usdchf) +
    "<br />" + "0.1 BTC equals to CHF: " + ((usdValue * usdchf / 10)) +
    "<br />" + "1.554 BTC equals to CHF: " + ((usdValue * usdchf * 1.554)) +
    "<br />" + "1 CHF is in satoshis: " + satchf +
    "<br />" + "1 satoshi is in CHF: " + (usdValue * usdchf / 100000000) +
    "<br /><br />" +
    "<br /><br /> <b>Bitcoin THB Values</b>" +
    "<br />" + "1 BTC equals to THB: " + (usdValue * usdthb) +
    "<br />" + "0.1 BTC equals to THB: " + ((usdValue * usdthb / 10)) +
    "<br />" + "1.554 BTC equals to THB: " + ((usdValue * usdthb * 1.554)) +
    "<br />" + "1 THB is in satoshis: " + satthb +
    "<br />" + "1 satoshi is in THB: " + (usdValue * usdthb / 100000000) +
    "<br /><br />" +
    "<br /><br /> <b>CHF THB conversion</b>" +
    "<br />" + "1 CHF equals to THB: " + (thbchf) +
    "<br /><br />";
}

