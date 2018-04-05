(function() {
  "use strict";

  
  var el = function(element) {
    if (element.charAt(0) === "#") { 
      return document.querySelector(element); 
    }
    return document.querySelectorAll(element);
  };

  // variables
  var viewer = el("#viewer"), 
    equals = el("#equals"), 
    nums = el(".num"), 
    ops = el(".ops"), 
    theNum = "", 
    oldNum = "", 
    resultNum, 
    operator; 

  // Obtener el numero presionado
  var setNum = function() {
    if (resultNum) { 
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { 
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum;

  };

  // Obtener el operador presionado
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "");
  };

  // Calcular resultado
  var displayNum = function() {

    // convir string en no
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;

      default:
        resultNum = theNum;
    }

    // falla**
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { 
        resultNum = "You broke it!";
      } else { 
        resultNum = "Look at what you've done";
        el('#calculator').classList.add("broken");
        el('#reset').classList.add("show"); 
      }
    }

    // imprimir resultado
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    oldNum = 0;
    theNum = resultNum;

  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

 
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  
  equals.onclick = displayNum;


  el("#clear").onclick = clearAll;

 
  el("#reset").onclick = function() {
    window.location = window.location;
  };

}());