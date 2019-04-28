var siteUrl = window.location.href;

/**
 * injectPage() fetches a page async & renders it in a div.
 */
function injectPage(pagePath, id) {
  var request = new XMLHttpRequest();
  request.open("GET", pagePath, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;
        document.getElementById(id).innerHTML = resp;
    } else {
        // We reached our target server, but it returned an error
        console.log("there was an error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("there was an error");
  };

  request.send();
}

function router(siteUrl) {

  injectPage("navigation.html", "navigation-insert");
  injectPage("footer.html", "footer-insert");

  var baseUrl = siteUrl.split("/");
  baseUrl = baseUrl.splice(0, baseUrl.length - 1);
  baseUrl = baseUrl.join("/") + "/";



  console.log(baseUrl);
}


// event listeners
window.addEventListener("load", function(e) {
  router(siteUrl);
  equalise();
});
