(function(){
  'use strict';
  var app = (function (doc) {
    //eventIs is used to keep track of the app state; when false app has been reset.
    var eventIs = false;
    //toggleAnimations is used to close all active animations.
    var toggleAnimations = function () {
      doc.querySelector('.about').classList.remove('about-color');
      doc.querySelectorAll('.message').forEach(function (span) {
        span.classList.remove('show-message');
      });
    };
    //closeAll is used to reset the app's state.
    var closeAll = function () {
      Object.values(doc.querySelector('.pop-up-container').children).forEach(function(ele){
        ele.classList.remove('active', 'inactive');
      });
      toggleAnimations();
      eventIs = false;
    };
    //controls button events.
    var buttonToggle = function (eleId) {
      //cases are buttons.
      switch (eleId) {
        case 'popMore':
        case 'popAbout':
        case 'popContact':
          if (eventIs && eventIs !== eleId) {
            //condition: user has clicked a button and user clicks a different botton.
            //if true: previous button's event ends.
            doc.querySelector('.' + eventIs).classList.replace('active', 'inactive');
            toggleAnimations();
          }
          if (!eventIs || true) {
            //condition: user's first button click or all other button clicks excluding button switching.
            var element = doc.querySelector('.' + eleId);
            //toggles button from active to inactive and vice versa.
            if (element.classList.contains('active')) {
              //condition: element is active?
              //if true: element now inactive
              element.classList.replace('active', 'inactive');
            } 
            else if (element.classList.contains('inactive')){
              //condition: element is inactive?
              //if true: element now active
              element.classList.replace('inactive', 'active');
            } 
            else {
              //if true: first button is clicked
              element.classList.add('active');
            }
            //user is now in a running state of the app
            eventIs = eleId;
          }
          if (eleId === 'popMore') {
            //condition: popMore button event?
            //if true: start animation for popMore
            doc.querySelectorAll('.message').forEach(function(firstLetter){
              firstLetter.classList.toggle('show-message');
            });
          }
          if(eleId === 'popAbout') {
            //condition: popAbout button event?
            //if true: start animation for popAbout
            doc.querySelector('.about').classList.toggle('about-color');
          }
          break;
        default:
          break;
      }
    };
    return function (ele) {
      //condition: element clicked has an id (is a button).
      //if true: toggle button.
      if (ele) buttonToggle(ele);
      //condition: element clicked doesn't have an id (is not a button).
      //if true: reset app.
      if (ele === '') closeAll(ele);
    };
  })(document);

  document.addEventListener('click', function (e) { app(e.target.id); }, false);

  //prevent other elements from bubbling up.
  document.querySelector('.pop-up-container').addEventListener('click', function(e){ e.stopPropagation();}, false);

  Object.values(document.querySelector('.pop-up-container').children).forEach(function(popUp){
    popUp.addEventListener('click', function(e){ e.stopPropagation(); }, false);
  });
})();