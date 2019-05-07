var siteUrl = window.location.href;

var baseUrl = siteUrl.split('/');
if (baseUrl.indexOf('#')) {
    baseUrl = baseUrl.slice(0, baseUrl.indexOf('#'));
}
baseUrl = baseUrl.join('/') + '/';

var endPoint = siteUrl.split('/');
endPoint = endPoint[endPoint.length - 1]

var payLoad = {};

var priorPayLoad = {};

var siteMap = {
    index: {
        url: 'index.html' || '',
        title: 'The Design System for Kotak Securities',
        local: 'index'
    },
    footer: {
        url: 'footer.html',
        title: '',
        local: 'footer'
    },
    navigation: {
        url: 'navigation.html',
        title: '',
        local: 'navigation'
    },
    home: {
        url: 'home-page-fragment.html',
        title: '',
        local: 'home'
    },
    guide: {
        url: 'guide-page-fragment.html',
        title: '',
        local: 'guide'
    },
    overview: {
        url: 'overview.html',
        title: 'Overview | Design System for Kotak Securities',
        local: 'overview'
    },
    content: {
        url: 'content-guide.html',
        title: 'Content guide | Design System for Kotak Securities',
        local: 'content'
    },
    design: {
        url: 'design-guide.html',
        title: 'Design guide | Design System for Kotak Securities',
        local: 'design'
    },
    components: {
        url: 'components-guide.html',
        title: 'Components guide | Design System for Kotak Securities',
        local: 'components'
    },
};

// getPage(pagePath)
function getPage(pagePath, key) {
    var request = new XMLHttpRequest();
    request.open('GET', pagePath, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = request.responseText;
            payLoad[key] = resp;

            localStorage.setItem('payLoad', JSON.stringify(payLoad));

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

// setPage(pagePath, id)
function setPage(pagePath, id, key) {
    if (Object.keys(payLoad).length === Object.keys(siteMap).length && key !== 'footer' && key !== 'navigation') {
        priorPayLoad = JSON.parse(localStorage.getItem('payLoad'));
    }

    var append = priorPayLoad[key];

    document.getElementById(id).innerHTML = append;

}

/*
 * update(pagePath)
 */
function update(pagePath) {

    var identifier = pagePath.split('.html')[0];
    if (identifier.includes('-')) {
        identifier = identifier.split('-')[0];
    } else {
        identifier;
    }

    document.title = siteMap[identifier].title;
    window.location.href = baseUrl + '#/' + siteMap[identifier].url;

    localStorage.setItem('activePage', siteMap[identifier].url);
}

/*
 * router(pagePath)
 */
function router(pagePath) {

    var insertLocationId = 'content-holder';

    switch (pagePath) {
        case (siteMap.index.url): {
            // console.log('yes that is index');
            setPage('home-page-fragment.html', insertLocationId, 'home');
            update(pagePath);
            break;
        }
        case siteMap.overview.url: {
            // console.log('yes that is overview');
            setPage('guide-page-fragment.html', insertLocationId, 'guide');
            setPage('overview.html', 'internal-content-holder', 'overview');
            update(pagePath);
            break;
        }
        case siteMap.content.url: {
            // console.log('yes that is content');
            setPage('guide-page-fragment.html', insertLocationId, 'guide');
            update(pagePath);
            break;
        }
        case siteMap.design.url: {
            // console.log('yes that is design');
            setPage('guide-page-fragment.html', insertLocationId, 'guide');
            update(pagePath);
            break;
        }
        case siteMap.components.url: {
            // console.log('yes that is components');
            setPage('guide-page-fragment.html', insertLocationId, 'guide');
            update(pagePath);
            break;
        }
        default: {
            // console.log('yes that is default');
            setPage('home-page-fragment.html', insertLocationId, 'home');
            update('index');
            break;
        }
    }

    setTimeout(function(e) {
        equalise();
    }, 250)

}

// event listeners
window.addEventListener('load', function(e) {

    if (priorPayLoad !== {}) {
        Object.keys(siteMap).forEach(function(each) {
            getPage(siteMap[each].url, each)
        })
    }

    setTimeout(function(e) {
        if (priorPayLoad !== {}) {
            // clearInterval(interval);
            if (!localStorage.getItem('activePage')) {
                router(siteMap.home.url);
            } else {
                router(localStorage.getItem('activePage'));
            }

            setPage('navigation.html', 'navigation-insert', 'navigation');
            setPage('footer.html', 'footer-insert', 'footer');
            equalise();
        }
    }, 350)

    // var interval = setInterval(function(e) {
    //     if (priorPayLoad !== {}) {
    //         clearInterval(interval);
    //         if (!localStorage.getItem('activePage')) {
    //             router(siteMap.home.url);
    //         } else {
    //             router(localStorage.getItem('activePage'));
    //         }

    //         setPage('navigation.html', 'navigation-insert', 'navigation');
    //         setPage('footer.html', 'footer-insert', 'footer');
    //         equalise();
    //     }
    // }, 100)
});
