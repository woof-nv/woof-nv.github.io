(function(){
  'use strict';
  var app = (function (doc) {
    //used to keep track of app state; when false app has been reset
    var eventIs = false;
    //used to close all active animations
    var toggleAnimations = function () {
      doc.querySelector('.about').classList.remove('about-color');
      doc.querySelectorAll('.message').forEach(function (span) {
        span.classList.remove('show-message');
      });
    };
    //used to reset the app's state
    var closeAll = function () {
      Object.values(doc.querySelector('.pop-up-container').children).forEach(function(ele){
        ele.classList.remove('active', 'inactive');
      });
      toggleAnimations();
      eventIs = false;
    };
    //controls button events
    var buttonToggle = function (eleId) {
      //cases are buttons
      switch (eleId) {
        case 'popMore':
        case 'popAbout':
        case 'popContact':
          if (eventIs && eventIs !== eleId) {
            //logic: not starting button event and user in event and clicks a different button
            //true: previous button's event ends
            doc.querySelector('.' + eventIs).classList.replace('active', 'inactive');
            toggleAnimations();
          }
          if (!eventIs || true) {
            //logic: user's first button event or all button events excluding button event switch
            var element = doc.querySelector('.' + eleId);

            if (element.classList.contains('active')) {
              //logic: element is active?
              //true: element now inactive
              element.classList.replace('active', 'inactive');
            } 
            else if (element.classList.contains('inactive')){
              //logic: element is inactive?
              //true: element now active
              element.classList.replace('inactive', 'active');
            } 
            else {
              //true: new button event starts
              element.classList.add('active');
            }
            //eventIs now true
            eventIs = eleId;
          }
          if (eleId === 'popMore') {
            //logic: popMore button event
            //true: start animation for popMore
            doc.querySelectorAll('.message').forEach(function(firstLetter){
              firstLetter.classList.toggle('show-message');
            });
          }
          if(eleId === 'popAbout') {
            //logic: popAbout button event
            //true: start animation for popAbout
            doc.querySelector('.about').classList.toggle('about-color');
          }
          break;
        default:
          break;
      }
    };
    return function (ele) {
      //logic: if ele is a button
      //true: toggle button
      if (ele) buttonToggle(ele);
      //logic: if ele is not a button
      //true: end events
      if (ele === '') closeAll(ele);
    };
  })(document);

  document.addEventListener('click', function (e) { 
    app(e.target.id); 
    console.log(e.target);
  }, false);

  //prevent other elements from bubbling up.
  document.querySelector('.pop-up-container').addEventListener('click', function(e){ e.stopPropagation();}, false);
  
  Object.values(document.querySelector('.pop-up-container').children).forEach(function(popUp){
    popUp.addEventListener('click', function(e){ e.stopPropagation(); }, false);
  })
})();