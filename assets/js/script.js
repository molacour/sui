function ISO8601_week_no(dt) 
{
  var tdt = new Date(dt.valueOf());
  var dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  var firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) 
  {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

function date() {
  let currentDate = new Date();
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let date = currentDate.toLocaleDateString("en-GB", dateOptions);
  document.getElementById("header_date").innerHTML = date + " - W" + ISO8601_week_no(currentDate);
}

function time() {
  let currentTime = new Date();

  H = currentTime.getHours();
  H = ("0" + H).slice(-2);

  M = currentTime.getMinutes();
  M = ("0" + M).slice(-2);

  S = currentTime.getSeconds();
  S = ("0" + S).slice(-2);


  document.getElementById("header_time").innerHTML = H + ":" + M + ":" + S;
}

function loadFunctions() {
  setTheme({
    'color-background': '#21211F',
    'color-text-pri': '#D1B59A',
    'color-text-acc': '#4E4E4E'
  });

  date();  
  // here we run the clockTick function every 1000ms (1 second)
  setInterval(time, 1000);

  fx.base = "USD"; 
  fx.rates = {
          "EUR" : 0.915332,
          "GBP" : 0.814371,
          "USD" : 1
  };

  getMyIp();
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        window.location = "#";
        document.getElementById("keywords").value  = "";
    }
};

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

var h1 = document.getElementById('chrono-text'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    reset = document.getElementById('reset'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
}

/* Clear button */
reset.onclick = function() {
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}


function refreshRates(){
    $.getJSON("https://api.exchangeratesapi.io/latest?base=USD",
        function (data) {
            fx.rates = {
                "EUR" : data.rates.EUR,
                "GBP" : data.rates.GBP,
                "USD" : 1
            };
        });
}


/* USD to EUR button */
usd.onclick = function() {
  var value = document.getElementById("currency_value").value.match(/(\d+(\.\d+)?)/)[0];
  var orig = value;

  if (value != "")
  {
    refreshRates();
    value= Number((fx.convert(parseFloat(value), {from: "USD", to: "EUR"})).toFixed(3));;
    document.getElementById("currency_value").value  = orig  + "$ = " + value + "€";
  }
}

/* GBP to EUR button */
gbp.onclick = function() {
  var value = document.getElementById("currency_value").value.match(/(\d+(\.\d+)?)/)[0];
  var orig = value;

  if (value != "")
  {
    refreshRates();
    value= Number((fx.convert(parseFloat(value), {from: "GBP", to: "EUR"})).toFixed(3));;
    document.getElementById("currency_value").value  = orig  + "£ = " + value + "€";
  }

}