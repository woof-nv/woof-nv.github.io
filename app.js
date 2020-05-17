(function(){
  'use strict';
  var app = (function (doc) {
    var eventIs = false;
    var buttonToggle = function (eleId) {
      switch (eleId) {
        case 'popMore':
        case 'popAbout':
        case 'popContact':
          if (eventIs && eventIs !== eleId) doc.querySelector('.' + eventIs).classList.remove('active');
          if (!eventIs || true) {
            doc.querySelector('.' + eleId).classList.toggle('active');
            // doc.querySelector('.' + eleId).classList.replace('active', 'hidden');
            console.log(eventIs, eleId);
            eventIs = eleId;
          }
          break;
        default:
            console.log(eleId);
          break;
      }
    }
    var closeAll = function () {
      var eventWrap = doc.querySelectorAll('.event-wrap');
      eventWrap.forEach(ele => ele.firstElementChild.classList.remove('active'));
      eventIs = false;
    }

    return function (ele) {
      // console.log(ele);
      if (ele) buttonToggle(ele);
      // if (ele === 'popMore') console.log('do additional animation');
      // if (ele === 'popAbout') console.log('do additional animation');
      if (ele === '') closeAll(ele);
    }
  })(document);

  document.addEventListener('click', function (e) { app(e.target.id); 
    // console.log(e);
  }, false);
})();