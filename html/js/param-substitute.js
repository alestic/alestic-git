function ParamSubstitute(){
  // Parse query string parameters
  // Based on code from: http://stackoverflow.com/questions/901115/
  var urlKeys   = [];
  var urlParams = {};
  (function () {
    var k, e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a," ")); },
        q = window.location.search.substring(1);
    while (e = r.exec(q)) {
      k = d(e[1]);
      urlKeys.push(k);
      urlParams[k] = d(e[2]);
    }
  })();

  // Get elements with a specified class name
  if (document.getElementsByClassName == undefined) {
    document.getElementsByClassName = function(className) {
      var hasClassName = new RegExp("(?:^|\\s)" + className +"(?:$|\\s)");
      var allElements = document.getElementsByTagName("*");
      var results = [];
      var element;
      for (var i = 0; (element = allElements[i]) != null; i++) {
        var elementClass = element.className;
        if (elementClass && elementClass.indexOf(className) != -1 &&
            hasClassName.test(elementClass))
          results.push(element);
      }
      return results;
    }
  }

  // Find elements with class "param-KEY" and replace with ?KEY= value.
  (function () {
    for(var i = 0; i < urlKeys.length; ++i) {
      var key = urlKeys[i];
      var elements = document.getElementsByClassName('param-'+key);
      for(var j = 0; j < elements.length; ++j) {
        elements[j].innerHTML = urlParams[key];
      }
    }
  })();
}
