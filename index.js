"use strict";

/*Songs*/
let $slideshow = $(".cycle-slideshow");

$slideshow.on("click", function() {
   if ($slideshow.is(".cycle-paused"))
      $slideshow.cycle("resume");                
   else
      $slideshow.cycle("pause");
});

$("#previous-btn").on("click", function() {
   $slideshow.cycle("stop");
   $slideshow.cycle("prev");
});

$("#next-btn").on("click", function() {
   $slideshow.cycle("stop");
   $slideshow.cycle("next");
});
/*Softwares - Mock Server*/

/*Form Validation*/

/*Accordion*/