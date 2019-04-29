/*
 * injectPage() fetches a page async & renders it in a div.
 */
function injectPage(pagePath, id) {
  var request = new XMLHttpRequest();
  request.open('GET', pagePath, true);

  request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          // Success!
          var resp = request.responseText;
          document.getElementById(id).innerHTML = resp;
      } else {
          // We reached our target server, but it returned an error
          console.log('there was an error');
      }
  };

  request.onerror = function() {
      // There was a connection error of some sort
      console.log('there was an error');
  };

  request.send();
}

function getPage(pagePath){
var request = new XMLHttpRequest();

request.open('GET', pagePath, true);

request.onload = function() {


  if (request.status >= 200 && request.status < 400) {
    // Success!
    var resp = request.responseText;

  } else {
    // We reached our target server, but it returned an error
    console.log('there was some error');
  }

};

request.onerror = function() {
  // There was a connection error of some sort
  console.log('there was an error');
};

request.send();
}

console.log(getPage('index.html'));


if (baseUrl[baseUrl.length-1].includes('.html')){
  baseUrl.forEach(function(each){
    if (each === "#"){
      each = '';
    }
    console.log(each)
  });
  baseUrl = baseUrl.join('');
  // baseUrl = baseUrl.splice(0, baseUrl.length - 1);
} else{
  // baseUrl = baseUrl;
  baseUrl = baseUrl.join('/');
  baseUrl = baseUrl.split('/').splice(0, baseUrl.length - 1).join('/')
  console.log()
  // baseUrl = baseUrl.split('#').join('');


  // var promise1 = new Promise(function (resolve, reject){
  //   setTimeout(function() {
  //     resolve(getPage(pagePath));
  //   }, 300);
  // });

  // promise1.then(function(value){
  //   document.getElementById(id).innerHTML = value;
  // });
