var MyApp_SearchResultCount = 0;

var MyApp_SearchResults = [];

var MyApp_selectSpan;

var MyApp_SwitchIndex = 0;

//根据关键字查找

function MyApp_HighlightAllOccurencesOfStringForElement(element,keyword) {

    if (element) {
    alert('222');
        if (element.nodeType == 3) {        // Text node

            while (true) {

                var value = element.nodeValue;  // Search for keyword in text node

                var idx = value.toLowerCase().indexOf(keyword);

                if (idx < 0) break;            // not found, abort

                var span = document.createElement("span");

                var text = document.createTextNode(value.substr(idx,keyword.length));

                span.appendChild(text);



                span.setAttribute("class","MyAppHighlight");

                span.style.backgroundColor="yellow";

                span.style.color="black";



                text = document.createTextNode(value.substr(idx+keyword.length));

                element.deleteData(idx, value.length - idx);

                var next = element.nextSibling;

                element.parentNode.insertBefore(span, next);

                element.parentNode.insertBefore(text, next);

                element = text;

                MyApp_SearchResultCount++;    // update the counter

                MyApp_SearchResults.push(span);

            }

        } else if (element.nodeType == 1) { // Element node

            if (element.style.display != "none" && element.nodeName.toLowerCase() != 'select') {

                for (var i=element.childNodes.length-1; i>=0; i--) {

                    MyApp_HighlightAllOccurencesOfStringForElement(element.childNodes[i],keyword);

                }

            }

        }

    }

}

// 根据关键字查找 供WKWebView调用

function MyApp_HighlightAllOccurencesOfString(keyword) {

    MyApp_RemoveAllHighlights();

    MyApp_HighlightAllOccurencesOfStringForElement(document.body, keyword.toLowerCase());

}

// 关键关键字 移除高亮显示

function MyApp_RemoveAllHighlightsForElement(element) {

    if (element) {

        if (element.nodeType == 1) {

            if (element.getAttribute("class") == "MyAppHighlight") {

                var text = element.removeChild(element.firstChild);

                element.parentNode.insertBefore(text,element);

                element.parentNode.removeChild(element);

                return true;

            } else {

                var normalize = false;

                for (var i=element.childNodes.length-1; i>=0; i--) {

                    if (MyApp_RemoveAllHighlightsForElement(element.childNodes[i])) {

                        normalize = true;

                    }

                }

                if (normalize) {

                    element.normalize();

                }

            }

        }

    }

    return false;

}

//WKWebView调用移除高亮

function MyApp_RemoveAllHighlights() {

    MyApp_SearchResultCount = 0;

    MyApp_SearchResults = [];

    MyApp_RemoveAllHighlightsForElement(document.body);

}

//滚动到搜索到的第一个关键字

function MyApp_ScrollToFiristResult() {

    MyApp_ScrollToIndex(0);

}

//滚动到指定下标的关键字

function MyApp_ScrollToIndex(index) {

    if (MyApp_selectSpan) {

        MyApp_selectSpan.style.backgroundColor = "yellow";

    }

    var span = MyApp_SearchResults[MyApp_SearchResultCount - index - 1];

    span.style.backgroundColor = "orange";

    MyApp_selectSpan = span;

    var h = document.body.clientHeight; //获取设备的高度

    window.scrollTo(0,span.offsetTop-h/2); //滚动到屏幕中央

}

// 上移

function MyApp_SwitchToUp() {

    MyApp_SwitchIndex--;

    if (MyApp_SwitchIndex < 0) {

        MyApp_SwitchIndex = MyApp_SearchResultCount-1;

    }

    MyApp_ScrollToIndex(MyApp_SwitchIndex);

    return MyApp_SwitchIndex;

}

// 下移

function MyApp_SwitchToDown() {

    MyApp_SwitchIndex++;

    if (MyApp_SwitchIndex >= MyApp_SearchResultCount) {

        MyApp_SwitchIndex = 0;

    }

    MyApp_ScrollToIndex(MyApp_SwitchIndex);

    return MyApp_SwitchIndex;

}
