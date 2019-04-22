var navBar;
var navHeightOnMobile;
var navHeightOnDesktop;
var shadowIn =
    "box-shadow: 5px 5px 10px #e5e5e5;transition: box-shadow 0.1s ease-in-out;";
var shadowOut =
    "box-shadow: 0px 0px 0px #e5e5e5;transition: box-shadow 0.1s ease-in-out;";
var mainBody = document.getElementsByTagName("body")[0];
var dataUrl = "";
var data = {};
var clickedParent = "";
var putTogetherWidth = 0;
var forwardJump = 0;
var backwardJump = 0;

var siteUrl = window.location.href;
var baseUrl = siteUrl.split('/');
baseUrl = baseUrl.splice(0, baseUrl.length - 1)
baseUrl = baseUrl.join('/') + '/'

var state = {}

// functions block

/**
 * navigationShadow() renders a shadow when the user scrolls the page
 */
function navigationShadow() {
    navBar = document.getElementsByClassName("navigation--top");
    navHeightOnMobile = navBar[0].clientHeight;
    navHeightOnDesktop = navBar[1].clientHeight;

    var navOffset = window.pageYOffset;
    if (navHeightOnMobile != 0 || navHeightOnDesktop != 0) {
        if (navOffset >= 20) {
            navBar[0].setAttribute("style", shadowIn);
            navBar[1].setAttribute("style", shadowIn);
        } else {
            navBar[0].setAttribute("style", shadowOut);
            navBar[1].setAttribute("style", shadowOut);
        }
    }

    var applicableNavSize =
        largerOfTwo(navHeightOnMobile, navHeightOnDesktop) - 25;
    mainBody.setAttribute("style", "padding-top:" + applicableNavSize + "px;");
}

/**
 * getJsonData() runs an XHR page request.
 */
function getJsonData(dataUrl) {
    var request = new XMLHttpRequest();
    request.open("GET", dataUrl, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            data = JSON.parse(request.responseText);
        } else {
            // We reached our target server, but it returned an error
            console.log("Reached target server but returned error");
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log("There is a connection error of some sort.");
    };

    request.send();
}

/**
 * largerOfTwo() compares two variables and renders the value that is larger
 */
function largerOfTwo(a, b) {
    return a > b ? a : b;
}

/**
 * accordionToggle() controls all accordions
 * types: checkbox, radio,
 */
function accordionToggle(param, parentOfParam) {
    if (param.classList[0] === "card-accordion--radio") {
        var allAccordions = document.querySelectorAll(
            ".card--accordion-content.opened"
        );
        allAccordions.forEach(function(each) {
            each.classList.toggle("opened");
            each.parentNode.children[0].children[0].classList.toggle("rotate-fa");
        });

        param.children[0].classList.toggle("rotate-fa");
        parentOfParam.children[1].classList.toggle("opened");
    } else if (param.classList[0] === "card-accordion--checkbox") {
        param.children[0].classList.toggle("rotate-fa");
        parentOfParam.children[1].classList.toggle("opened");
    } else if (param.classList[0] === "card-accordion--text") {
        var allAccordions = document.querySelectorAll(
            ".card--accordion-content.width100.opened"
        );
        console.log(allAccordions);
        allAccordions.forEach(function(each) {
            each.classList.toggle("opened");
            each.parentNode.children[0].children[0].classList.toggle("rotate-fa");
        });

        param.children[0].classList.toggle("rotate-fa");
        parentOfParam.children[1].classList.toggle("opened");
    }
}

/**
 * bottomMenuToggle() controls opening & closing of the bottom-navigation drawer
 */
function menuToggle(param, parentOfParam) {
    if (parentOfParam.classList[5] === "sort-filter--column") {
        param.children[0].classList.toggle("hide");
        parentOfParam.classList.toggle("expanded");
        parentOfParam.children[1].classList.toggle("opened");
    } else {
        console.log(parentOfParam);
        param.children[0].classList.toggle("rotate-fa");
        parentOfParam.classList.toggle("expanded");
    }
}

/**
 * checkedUnchecked() marks the input tag associated to a visual checkbox/radio
 */
function checkedUnchecked(input) {
    var recordInput = document.getElementById(input.id);
    !recordInput.checked ?
        (recordInput.checked = true) :
        (recordInput.checked = false);
}

/**
 * toggleSwitch() controls a two state switch
 */
function toggleSwitch(e) {
    if (e.target.classList.value === "btn-reg") {
        e.target.classList.toggle("btn-fill");
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.classList.toggle("btn-fill");
        } else if (e.target.previousElementSibling) {
            e.target.previousElementSibling.classList.toggle("btn-fill");
        }
    }
}

/**
 * playButton() toggles a video
 * Does the actual show/hide
 */
function playButton(param, parentOfParam) {
    document
        .querySelector("." + parentOfParam.classList[0])
        .children[1].classList.toggle("hide");
    document
        .querySelector("." + parentOfParam.classList[0])
        .children[0].children[0].classList.toggle("bg-black");
}

/**
 * mobileMenu() controls opening & closing of the nav drawer on mobile screen sizes
 */
function mobileMenu() {
    document.getElementsByClassName("affix")[0].classList.toggle("nav-toggle");
    document.getElementById("hamburger").children[0].classList.toggle("opened");
    document.getElementById("hamburger").children[1].classList.toggle("opened");
}

/**
 * descriptionCardToggle() controls opening & closing of the panel-overlay drawer
 */
function descriptionCardToggle(el) {
    if (
        el.classList.value === "card-descriptive--link" &&
        el.hasAttribute("data-description-toggle")
    ) {
        var existingClasses = el.nextElementSibling.classList;
        var revisedClassList = existingClasses + " is-shown";

        el.nextElementSibling.classList.value = revisedClassList;
    } else if (el.classList.value === "col-sm-2 col-xs-2 cursor-link") {
        var array = $(el).parents()[2].classList;

        var resetClassList = "";
        for (var i = 0; i < array.length - 1; i++) {
            resetClassList += array[i] + " ";
        }
        $(el).parents()[2].classList.value = resetClassList;
    }
}

/**
 * equalise() takes divs that are in a row and make them the same height
 */
function equalise() {
    var dataSet = document.querySelectorAll("[data-equalizer]");

    var tempArray = [];

    for (i = 0; i < dataSet.length; i++) {
        var identifier = dataSet[i].getAttribute("data-parent");
        tempArray.push(identifier);
    }

    for (i = 1; i < tempArray.length; i++) {
        if (tempArray[i] === tempArray[i - 1]) {
            tempArray = tempArray.splice(i, 1);
        }
    }

    for (i = 0; i < tempArray.length; i++) {
        var cardHeight = [];
        var textHeight = [];
        var identifier = dataSet[i].getAttribute("data-parent");
        var getSubset = document.querySelectorAll(
            "[data-parent =" + identifier + "]"
        );
        var modifiableSet = document.querySelectorAll("[size-modifiable]");

        function sameHeight(each, height) {
            height.push(each.clientHeight);
            height.sort((a, b) => b - a);
        }

        getSubset.forEach(function(each) {
            sameHeight(each, cardHeight);
        });

        getSubset.forEach(function(each) {
            each.setAttribute("style", "height: " + cardHeight[0] + "px;");
        });

        modifiableSet.forEach(function(each) {
            sameHeight(each, textHeight);
        });

        modifiableSet.forEach(function(each) {
            each.setAttribute("style", "height: " + textHeight[0] + "px;");
        });
    }
}

/**
 * secondaryNavigationView() adds/removes buttons &
 *
 */
function secondaryNavigationView() {
    if (
        document.querySelector(".navigation-secondary") ||
        document.querySelector(".nav-pills")
    ) {
        var navWrapper = document.querySelector(".navigation-secondary")
            .clientWidth;
        var allCategories = Array.from(
            document.querySelector(".nav-pills").children
        );
    }

    if (navWrapper < window.innerWidth) {
        allCategories.forEach(function(each) {
            putTogetherWidth += each.clientWidth + 25;
        });
        document
            .querySelector(".nav-pills")
            .setAttribute("style", "width:" + putTogetherWidth + "px");
    }

    if (navWrapper < putTogetherWidth) {
        Array.from(document.querySelectorAll(".scroller")).forEach(function(each) {
            each.classList.toggle("hide");
        });
    }
}

/**
 * secondaryNavControl() moves the user along the horizontal scroll
 */
function secondaryNavControl(event) {
    var transtion = "transition: 0.4s all ease-in-out;";

    var existingStyle = "width:" + putTogetherWidth + "px;";

    var jump = putTogetherWidth * 0.005;

    var navPills = document.querySelector(".nav-pills");

    if (event.target.classList[1] === "scroller-left") {
        if (backwardJump < 100 - jump) {
            backwardJump += jump;
        }

        var shiftRight = backwardJump - forwardJump;

        navPills.setAttribute(
            "style",
            existingStyle + "transform:translateX(" + shiftRight + "%);" + transtion
        );
    } else if (event.target.classList[1] === "scroller-right") {
        if (forwardJump < 100 - jump) {
            forwardJump += jump;
        }

        var shiftLeft = forwardJump - backwardJump;

        navPills.setAttribute(
            "style",
            existingStyle + "transform:translateX(-" + shiftLeft + "%);" + transtion
        );
    }
}

/**
 * shareWidget() opens/closes click buttons under the share Floating action button
 */
function shareWidget(param) {
    // transform: translateY(-110 %);
    var shareIcons = Array.from(param.parentNode.children);
    var position = 0;

    if (
        !shareIcons[0].getAttribute("style") ||
        shareIcons[0].getAttribute("style") ===
        "transform: translateY(0%); transition: 0.3s all ease-in-out;"
    ) {
        shareIcons.forEach(function(each) {
            each.setAttribute(
                "style",
                "transform: translateY(-" +
                position +
                "%); transition: 0.3s all ease-in-out;"
            );
            position += 110;
        });
    } else if (
        shareIcons[0].getAttribute("style") ===
        "transform: translateY(-0%); transition: 0.3s all ease-in-out;"
    ) {
        shareIcons.forEach(function(each) {
            each.setAttribute(
                "style",
                "transform: translateY(" + 0 + "%); transition: 0.3s all ease-in-out;"
            );
        });
    }
}

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

            equalise();
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

/**
 * footer() controls the accordion in the footer
 */
function footer(param) {
    if (param.classList.value === "footer--accordion") {
        var totalFooterAccordions = document.querySelectorAll("[data-toggle-id]");
        var totalFooterAccordionsCount = totalFooterAccordions.length / 2;
        var picked = param.getAttribute("data-toggle-id");

        for (i = 4; i < totalFooterAccordions.length; i++) {
            if (i != picked + 4) {
                totalFooterAccordions[i].classList.value = "footer--accordion-content";
                totalFooterAccordions[i - 4].children[0].classList.value =
                    "footer--accordion-indicator-only rotate-fa";
                totalFooterAccordions[i].style.display = "none";
            }
        }

        for (j = 1; j < totalFooterAccordionsCount + 1; j++) {
            var array = [];
            document
                .querySelectorAll('[data-toggle-id="' + j + '"]')
                .forEach(function(each) {
                    array.push(each);
                });

            if (param === array[0] || param.classList === array[1]) {
                var clicked = param.getAttribute("data-toggle-id");
                document.querySelectorAll(
                    '[data-toggle-id="' + clicked + '"]'
                )[1].style.display = "block";
                document
                    .querySelectorAll('[data-toggle-id="' + clicked + '"]')[0]
                    .children[0].classList.toggle("rotate-fa");
                document
                    .querySelectorAll('[data-toggle-id="' + clicked + '"]')[1]
                    .classList.toggle("opened");
            }
        }
    }
}

/**
 * bottomNav() shows & hides the CTA on mobile screens
 */
function bottomNav() {
    var getBottomNav = document.getElementById("bottomNav");

    if (getBottomNav) {
        var animateIn =
            "mobile container-fluid navbar-fixed-bottom bg-gr-1 bs-1 fadeIn animated";
        var animateOut =
            "mobile container-fluid navbar-fixed-bottom bg-gr-1 bs-1 fadeOut animated";

        if (window.pageYOffset > 0.8 * window.innerHeight) {
            getBottomNav.setAttribute("class", animateIn);
        } else if (window.pageYOffset < 0.8 * window.innerHeight) {
            getBottomNav.setAttribute("class", animateOut);
        }
    }
}

/**
 * actOnClick() does actions for different types of clicks
 * types: radio, checkbox
 */
function actOnClick(param) {
    var uncheckedClasses = "fa fa-minus-circle animated fadeIn tc-ter-2 ";
    var checkedClass = "checkbox-color";
    var type;
    var inputId;

    var uncheckedRadioClasses = "far fa-circle animated fadeIn tc-ter-2";
    var checkedRadioClasses = "fa fa-dot-circle animated fadeIn tc-sc-4";

    var allRadioButtons = Array.from(
        document.querySelectorAll("input[type=radio]")
    );

    var inputField = param.nextElementSibling;

    if (inputField) {
        type = inputField.type;
    }

    if (inputField && type) {
        if (type === false) {
            param.children[0].classList.toggle("checkbox-color");
            checkedUnchecked(inputField);
        } else if (type === "radio") {
            inputId = inputField.id;

            for (var i = 0; i < allRadioButtons.length - 1; i++) {
                if (allRadioButtons[i] === document.getElementById(inputId)) {
                    allRadioButtons.splice(i, 1);
                }
            }
            allRadioButtons.forEach(function(each) {
                each.checked = false;
                each.previousElementSibling.children[0].children[0].children[0].classList.value = uncheckedRadioClasses;
            });

            param.children[0].children[0].children[0].classList.value = checkedRadioClasses;
            document.getElementById(inputId).checked = true;
        } else if (type === "checkbox") {
            param.children[0].children[0].children[0].classList.toggle(
                "checkbox-color"
            );
            checkedUnchecked(inputField);
        }
        // else if (type === 'all') {
        //   var unsubscribeAll = Array.from(document.querySelectorAll('input[type="checkbox"]'));
        //   if (!param.children[0].classList[5]) {

        //     unsubscribeAll.forEach(each => {
        //       each.checked = true;
        //       each.parentNode.children[0].children[0].classList.value = uncheckedClasses + checkedClass;
        //     });
        //   } else {
        //     unsubscribeAll.forEach(each => {
        //       each.checked = false;
        //       each.parentNode.children[0].children[0].classList.value = uncheckedClasses;
        //     });
        //   }
        // }
    }
}

/*
 *
 *
 */
function enrol() {
    event.preventDefault();
    document.querySelector(".card-enrol").classList.add("fadeOut");
    document.querySelector(".is-complete").classList.toggle("hide");
}

/*
 *
 */

//  function

// event listener block
window.addEventListener("click", function(e) {
    accordionToggle(e.target, e.target.parentNode);
    actOnClick(e.target);
    descriptionCardToggle(e.target);
    secondaryNavControl(e);
    toggleSwitch(e);
    footer(e.target);
});

window.addEventListener("mouseover", function(e) {});

window.addEventListener("scroll", function(e) {
    navigationShadow();
    bottomNav();
});

window.addEventListener("load", function(e) {
    bottomNav();
    setTimeout(function() {
        navigationShadow();
        equalise();
    }, 50);

    setTimeout(function() {
        navigationShadow();
    }, 500);

    secondaryNavigationView();
    // footer()
});

window.addEventListener("resize", function(e) {
    setTimeout(function() {
        navigationShadow();
        equalise();
    }, 50);
});

window.addEventListener("focusin", function(e) {
    if (e.target.hasAttribute("placeholder")) {
        if (e.target.getAttribute("class").includes("form--reset ")) {
            e.target.parentNode.children[0].setAttribute(
                "class",
                "form--placeholder fadeIn animated"
            );
        } else if (e.target.getAttribute("class").includes("form--with-icon ")) {
            e.target.parentNode.parentNode.children[0].setAttribute(
                "class",
                "form--placeholder-with-icon fadeIn animated"
            );
        }
    }
});

window.addEventListener("focusout", function(e) {
    if (e.target.hasAttribute("placeholder") && e.target.value === "") {
        if (e.target.getAttribute("class").includes("form--reset ")) {
            e.target.parentNode.children[0].setAttribute(
                "class",
                "form--placeholder fadeOut animated"
            );
        } else if (e.target.getAttribute("class").includes("form--with-icon ")) {
            e.target.parentNode.parentNode.children[0].setAttribute(
                "class",
                "form--placeholder-with-icon fadeOut animated"
            );
        }
    }
});
