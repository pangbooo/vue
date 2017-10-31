window.drag = (t, p) => {
  console.log(arguments);
  console.log('load');
  var point = p || null,
    target = t || null,
    resultX = 0,
    resultY = 0;
    //  t.appendChild(target);
    console.log(t);
  (!point) ? point = target : ''; // 如果没有拖动点，则拖动点默认为整个别拖动元素

  function getPos(t) {
    var offsetLeft = 0,
      offsetTop = 0,
      offsetParent = t;

    while (offsetParent) {
      offsetLeft += offsetParent.offsetLeft;
      offsetTop += offsetParent.offsetTop;
      offsetParent = offsetParent.offsetParent;
    }

    return { 'top': offsetTop, 'left': offsetLeft };
  }

  function core() {
    var width = document.body.clientWidth || document.documentElement.clientWidth,
      height = document.body.clientHeight || document.documentElement.clientHeight,
      maxWidth = width - target.offsetWidth,
      maxHeight = height - target.offsetHeight;

    (resultX >= maxWidth) ? target.style.left = maxWidth + 'px' : (resultX > 0) ? target.style.left = resultX + 'px' : ''; // 重置默认位置。
    (resultY >= maxHeight) ? target.style.top = maxHeight + 'px' : (resultY > 0) ? target.style.top = resultY + 'px' : ''; // 重置默认位置。

    point.onmousedown = function (e) {
      console.log(target);
      var s = target.cloneNode(true);
      // s.setAttribute('class', 'move');
      s.className += ' move';
       target.parentNode.appendChild(target = s);
      console.log('md');
      e = e || window.event;
        var coordX = e.clientX,
        coordY = e.clientY,
        posX = getPos(target).left,
        posY = getPos(target).top;

      // point.setCapture && point.setCapture();  // 将Mouse事件锁定到指定元素上。
      document.onmousemove = function (e) {
        console.log('mv');
        var ev = e || window.event,
          moveX = ev.clientX,
          moveY = ev.clientY;

        resultX = moveX - (coordX - posX); // 结果值是坐标点减去被拖动元素距离浏览器左侧的边距
        resultY = moveY - (coordY - posY);

        (resultX > 0) ? ((resultX < maxWidth) ? target.style.left = resultX + 'px' : target.style.left = maxWidth + 'px') : target.style.left = '0px';
        (resultY > 0) ? ((resultY < maxHeight) ? target.style.top = resultY + 'px' : target.style.top = maxHeight + 'px') : target.style.top = '0px';

        // ev.stopPropagation && ev.stopPropagation();
        // ev.preventDefault;
        ev.returnValue = false;
        ev.cancelBubble = true;
      };
    };
    document.onmouseup = function () {  // 解决拖动时，当鼠标指向的DOM对象非拖动点元素时，无法触发拖动点的onmousedown的BUG。
      document.onmousemove = null;
      point.releaseCapture && point.releaseCapture();  // 将Mouse事件从指定元素上移除。
    };
    point.onmouseup = function (e) {
      e = e || window.event;
      document.onmousemove = null;
      point.releaseCapture && point.releaseCapture();
    };
  }
  core();
  window.onresize = core;
};
