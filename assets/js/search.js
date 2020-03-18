var sindex = 0;
var cycle = false;

function start() {
    var query = getParameterByName('q');
    if (query) search(query.replaceAll("+", "%2B"));

    document.getElementById('keywords').focus();

    window.setInterval(function () {
        updatetime();
    }, 200);
}

function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    var text = document.getElementById("keywords").value.replaceAll("+", "%2B");
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    if (key == 13) { // Search functions
        search(text);
    }
    if (key == 9) { // Tab Completion Functions
        e.preventDefault();
        e.stopPropagation();
        if (text[0] === ';') {
            switch (option) {
                case 't':
                    var streamers = ['admiralbahroo', 'moonmoon_ow', 'witwix'];
                    if (!subtext || cycle) {
                        cycle = true;
                        if (sindex > streamers.length - 1) sindex = 0;
                        document.getElementById("keywords").value = ';t ' + streamers[sindex++];
                        return;
                    }
                    for (var streamer of streamers) {
                        if (subtext === streamer.substr(0, subtext.length)) {
                            document.getElementById("keywords").value = ';t ' + streamer;
                            return;
                        }
                    }
                    break;
            }
        }
    }
    if(key == 32){ //Space to go to search
        document.getElementById("keywords").focus();
    }
    sindex = 0;
    cycle = false;
}

function search(text) {
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    var default_engine = "https://www.qwant.com/?q=";
    if (text[0] === '/') {
        if (text.indexOf(' ') > -1) {
            switch (option) {
                case "d":
                    window.location = "https://www.discogs.com/search/?q=" + subtext;
                    break;
                case "e":
                    window.location = "https://www.ebay.com/sch/i.html?_nkw=" + subtext;
                    break;
                case "g":
                    window.location = "https://www.google.com/search?q=" + subtext;
                    break;
                case "img":
                    window.location = "https://www.qwant.com/?q=" + subtext + "&t=images";
                    break;
                case "p":
                    window.location = "https://www.popsike.com/php/quicksearch.php?searchtext=" + subtext + "&sortord=ddate&pagenum=1&incldescr=&layout=&sprice=&eprice=&endfrom=&endthru=&bidsfrom=&bidsthru=#";
                    break;
                case "q":
                    window.location = "https://www.qwant.com/?q=" + subtext;
                    break;
                case "wiki":
                    window.location = "https://fr.wikipedia.org/w/index.php?search=" + subtext;
                    break;
                case "y":
                    window.location = "https://www.youtube.com/results?search_query=" + subtext;
                    break;
                case "calc":
                    var expr = subtext.replace(/%2B/, '+');
                    document.getElementById("keywords").value  = expr + " = " + eval(expr);
                    break;
                case "help":
                    window.location = "#help";
                    break;
            }
        } else {
            var option = text.substr(1);
            switch (option) {
                case "":
                case "?":
                    window.location = "#help";
                    break;
                case "ascii":
                    window.location = "#asciitable";
                    break;
                case "chrono":
                    window.location = "#chrono";
                    break;
                case "curr":
                    window.location = "#currency";
                    break;
                case "d":
                    window.location = "https://www.discogs.com/";
                    break;
                case "e":
                    window.location = "https://www.ebay.com/sch/i.html?_nkw=" + subtext;
                    break
                case "help":
                    window.location = "#help";
                    break;
                case "ip":
                    window.location = "#myip";
                    break;
                case "p":
                    window.location = "https://www.popsike.com/";
                    break;
                case "y":
                    window.location = "https://www.youtube.com";
                    break;
            }
        }
    } else {
        window.location = default_engine + text;
    }
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function getMyIp() {
  $(function() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
        document.getElementById("ip").innerHTML  = json.ip;
      }
    );
  });
}