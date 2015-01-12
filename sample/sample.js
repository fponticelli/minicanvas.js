var MiniCanvas = ("undefined" !== typeof require && require("../lib/minicanvas").MiniCanvas) || MiniCanvas;

MiniCanvas.create(200, 200)
  .checkboard(20)
  .checkboard(10, 0xAAAAAA66, 0xFFFFFF66)
  .border(1)
  .display("checkboard");

MiniCanvas.create(200, 200)
  .box(function(x, y) {
    return (x * y * 0xFFFFFF) << 8 | 0x000000FF;
  })
  .dotGrid(12, 12, 2, 0xFFFFFFcc)
  .display("box");

MiniCanvas.create(200, 200)
  .fill(0x000000FF)
  .display("stars");
/*
MiniCanvas.create(500, 500)
  .box(function(x, y) {
    return 0xFFCCFFCC;
  })
  .display("box");
*/