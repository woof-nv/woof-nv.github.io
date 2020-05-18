(function(){
  'use strict';
  var app = (function (doc) {
    var eventIs = false;

    var toggleAnimations = function () {
      doc.querySelector('.about').classList.remove('about-color');
      doc.querySelectorAll('.message').forEach(function (span) {
        span.classList.remove('show-message');
      });
    };

    var closeAll = function () {
      var eventWrap = doc.querySelectorAll('.event-wrap');
      eventWrap.forEach(function (ele) {
        ele.firstElementChild.classList.remove('active', 'inactive');
      });
      toggleAnimations();
      
      eventIs = false;
    };
    
    var buttonToggle = function (eleId) {
      switch (eleId) {
        case 'popMore':
        case 'popAbout':
        case 'popContact':
          if (eventIs && eventIs !== eleId) {
            doc.querySelector('.' + eventIs).classList.replace('active', 'inactive');
            toggleAnimations();
          }
          if (!eventIs || true) {
            var element = doc.querySelector('.' + eleId);

            if (element.classList.contains('active')) {
              element.classList.replace('active', 'inactive');
            } 
            else if (element.classList.contains('inactive')){
              element.classList.replace('inactive', 'active');
            } 
            else {
              element.classList.add('active');
            }

            eventIs = eleId;
          }
          if (eleId === 'popMore') {
            doc.querySelectorAll('.message').forEach(function(firstLetter){
              firstLetter.classList.toggle('show-message');
            });
          }
          if(eleId === 'popAbout') {
            doc.querySelector('.about').classList.toggle('about-color');
          }
          break;
        default:
            console.log(eleId);
          break;
      }
    };

    return function (ele) {
      if (ele) buttonToggle(ele);
      if (ele === '') closeAll(ele);
    };
  })(document);

  document.addEventListener('click', function (e) { app(e.target.id); }, false);
})();