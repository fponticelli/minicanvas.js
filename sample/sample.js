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

MiniCanvas.create(200, 200)
  .with(function(mini, w, h) {
    var stars = 200,
        frames = 40,
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
      mini.fill("#000000");
      var t = (i / frames) < 0.5 ? (i / frames) + 0.5 : 1.5 - (i / frames);
      for(j = 0; j < stars; j++) {
        star = arr[j];
        mini
          .dot(star.x, star.y, star.r * t, "rgba(255,255,255,"+t+")");
      }
      mini.storeFrame();
    }
  })
  .display("stars");
/*
MiniCanvas.create(500, 500)
  .box(function(x, y) {
    return 0xFFCCFFCC;
  })
  .display("box");
*/