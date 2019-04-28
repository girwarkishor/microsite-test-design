/* <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script> */

// var state = {}

/**
 * injectPage() fetches a page async & renders it in a div.
 */
function injectPage(pagePath, id) {
    document.getElementsByTagName('body')[0].offsetTop = 0;

    var pageUrl = ''
    var pageTitle = ''

    var request = new XMLHttpRequest();
    request.open("GET", pagePath, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = request.responseText;
            document.getElementById(id).innerHTML = resp;

            pageUrl = pagePath.replace('.html', '').split('-').join('');
            state[pageUrl] = resp;

            document.title = document.querySelectorAll('title')[1].innerText;
            pageTitle = document.title;
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

    if (pagePath === 'home-page.html') {
        pagePath = 'index.html';
        history.pushState(state.pageUrl, pageTitle, pagePath);
    } else {
        history.pushState(state.pageUrl, pageTitle, pagePath);
    }
}

// <!-- <script>
// if (siteUrl.split(baseUrl)[1] === '' || siteUrl.split(baseUrl)[1] === 'index.html') {
//     injectPage('home-page.html', 'content-holder');
// } else {

//     injectPage(siteUrl.split(baseUrl)[1], 'content-holder');
// }
// </script> -->


"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[jsonc]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[md]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
