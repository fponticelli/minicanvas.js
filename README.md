#minicanvas.js

*minicanvas.js* helps you to quickly build canvas renderings. It works in the browser and in node seamlessly.

Here is an example:

```js
MiniCanvas.create(200, 200)
  .box(function(x, y) {
    return "rgb(" + Math.round(x*255) + "," + Math.round(y*255) + ", 255)";
  })
  .dotGrid(12, 12, 1, "rgba(255,255,255,0.75)")
  .display("box");
```

It renders an image just like this:

![box](https://raw.githubusercontent.com/fponticelli/minicanvas.js/master/images/box.png)

The API is quite simple and all methods are chainable. `MiniCanvas.create` generates a new instance. You can then use the many drawing options available and in the end call `display(name)` to 'show' the result. What `display` does depends on the environment, if you are using *minicanvas* in the browser than it will attach the canvas to the DOM (by default it will append to the body but you can decide for another parent element by overwriting `minicanvas.BrowserCanvas.parentNode`). If the image has been rendered within nodejs then an image file will be created and stored inside the `images` folder (the folder name can be redefined by overwriting `minicanvas.NodeCanvas.imagePath`).

## Drawing API

### `border(weight = 1.0, ?color = #000000)`

Generates a border around the canvas.

### `box(handler)`

Paints the entire canvas point by point. `handler` argument must be a function that takes two arguments, x and y, with values between `0.0` and `1.0`. The function must return a color in string format.

### `checkboard(?size = 8, ?light = #ffffff, ?dark = #cccccc)`

Generates a checkboard pattern whose tiles have side `size` and alternate between the `light` and `dark` colors.

### `circle(x, y, radius, weight, ?lineColor, ?fillColor)`

Draws a circle. If `lineColor` is passed the perimeter will be drawn with a weight of `weight`. If `fillColor` is provided the area will be filled with that color.

### `clear()`

Clears out the entire canvas.

### `cross(?ox, ?oy, ?weight = 1.0, ?color)`

Generates a cross shape. If no offsets (`ox` or `oy`) are provided the cross lines will be centered in the canvas area. Remember that if you want to use the default values you have to pass `null` values in their places.

### `dot(x, y, ?radius = 3, ?color)`

Draws a dot at `x` and `y` coords.

### `dotGrid(?dx = 10.0, ?dy = 10.0, ?radius = 1.0, ?color, ?ox = 0.5, ?oy = 0.5)`

Generates a grid of dots.

### `fill(color)`

### `grid(?dx = 10.0, ?dy = 10.0, ?weight = 1.0, ?color, ?ox = 0.5, ?oy = 0.5)`

### `gridHorizontal(?dy = 10.0, ?weight = 1.0, ?color, ?oy = 0.5)`

### `gridVertical(?dx = 10.0, ?weight = 1.0, ?color, ?ox = 0.5)`

### `gradientHorizontal(handler)`

### `gradientVertical(handler)`

### `line(x0, y0, x1, y1, ?weight = 1.0, ?color)`

### `lineHorizontal(offset, ?weight = 1.0, ?color)`

### `lineVertical(offset, ?weight = 1.0, ?color)`

### `palette(colors : Array<Array<RGBA>>, ?padding = 2.0, ?margin = 0.0)`

### `rect(x0, y0, x1, y1, ?weight = 1.0, ?lineColor, ?fillColor)`

## Animation API

### `animate(?x, ?y)`

### `animateNode(?x, ?y)`

### `animateBrowser(?x, ?y)`

### `storeFrame(?times = 1)`


## Utility API

### `context(callback)`

### `with(callback)`


## Interaction API

### `onClick(callback)`

### `onDown(callback)`

### `onMove(callback)`

### `onTrail(callback)`

### `onUp(callback)`

### `offClick()`

### `offDown()`

### `offMove()`

### `offTrail()`

### `offUp()`

### `click(x, y)`

### `down(x, y)`

### `move(x, y)`

### `up(x, y)`
