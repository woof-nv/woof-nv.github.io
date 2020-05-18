(function(){
  'use strict';
  var app = (function (doc) {
    var eventIs = false;

    var closeAll = function () {
      var eventWrap = doc.querySelectorAll('.event-wrap');
      eventWrap.forEach(function (ele) {
        ele.firstElementChild.classList.remove('active');
      });
      doc.querySelector('.about').classList.remove('aboutt');
      doc.querySelectorAll('.message').forEach(function (span) {
        span.classList.remove('foo');
      });

      eventIs = false;
    };
    
    var buttonToggle = function (eleId) {
      switch (eleId) {
        case 'popMore':
        case 'popAbout':
        case 'popContact':
          if (eventIs && eventIs !== eleId) {
            doc.querySelector('.' + eventIs).classList.remove('active');
            doc.querySelector('.about').classList.remove('aboutt');
            doc.querySelectorAll('.message').forEach(function (span) {
              span.classList.remove('foo');
            });
          }
          if (!eventIs || true) {
            doc.querySelector('.' + eleId).classList.toggle('active');
            console.log(eventIs, eleId);
            eventIs = eleId;
          }
          if (eleId === 'popMore') {
            console.log(doc.querySelectorAll('.message'));
            doc.querySelectorAll('.message').forEach(function(span){
              span.classList.toggle('foo');
            });
          }
          if(eleId === 'popAbout') {
            console.log('about', eleId);
            doc.querySelector('.about').classList.toggle('aboutt')
          }
          break;
        default:
            console.log(eleId);
          break;
      }
    };

    return function (ele) {
      if (ele) buttonToggle(ele);
      if (ele === 'popMore') console.log('do additional animation');
      if (ele === 'popAbout') console.log('do additional animation');
      if (ele === '') closeAll(ele);
    }
  })(document);

  document.addEventListener('click', function (e) { app(e.target.id); 
    // console.log(e);
  }, false);
})();