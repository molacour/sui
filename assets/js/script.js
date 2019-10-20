function date() {
  let currentDate = new Date();
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let date = currentDate.toLocaleDateString("fr-FR", dateOptions);
  document.getElementById("header_date").innerHTML = date;
}

function time() {
  let currentTime = new Date();

  H = currentTime.getHours();
  H = ("0" + H).slice(-2);

  M = currentTime.getMinutes();
  M = ("0" + M).slice(-2);

  document.getElementById("header_time").innerHTML = H + ":" + M;
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
