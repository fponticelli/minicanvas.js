var MiniCanvas = ("undefined" !== typeof require && require("../lib/minicanvas").MiniCanvas) || MiniCanvas;

MiniCanvas.create(200, 200)
  .checkboard(20)
  .checkboard(10, "rgba(100,200,200,0.5)", "rgba(255,255,255,0.5)")
  .border(1)
  .display("checkboard");

MiniCanvas.create(200, 200)
  .box(function(x, y) {
    return "rgb(" + Math.round(x*255) + "," + Math.round(y*255) + ", 255)";
  })
  .dotGrid(12, 12, 1, "rgba(255,255,255,0.75)")
  .display("box");

var w = 200,
    h = 200,
    interaction = MiniCanvas.create(w, h).animate(),
    frames = 40,
    stars = 200,
    arr = [],
    i, j, star;

for(i = 0; i < stars; i++) {
  arr.push({
    x : Math.random() * w,
    y : Math.random() * h,
    r : Math.random() + 1.0,
    s : Math.random() + 0.5
  });
}

for(i = 0; i < frames; i++) {
  (function(i) {
    interaction.frame(function(mini) {
      mini.fill("#000000");
      var t = (i / frames) < 0.5 ? (i / frames) + 0.5 : 1.5 - (i / frames);
      for(j = 0; j < stars; j++) {
        star = arr[j];
        mini.dot(star.x, star.y, star.r * t, "rgba(255,255,255,"+t+")");
      }
      //mini.storeFrame();
    });
  })(i);
}

interaction.done()
  .display("stars");