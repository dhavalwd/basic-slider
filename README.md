<h1 align="center"> Basic Slider </h1>

<p align="center"> Simple Slider with Simple API - No Dependency </p>

<p align="center"><img src="basic-logo.png" /></p>
<hr/>

**_NOTE: This is purely for educational and learning purpose. Don't use this in production._**

[Documentation](https://dhavalvyas.gitbook.io/basic-slider/)

## Installations

Very easy setup. This is work in progress. CSS is not included in the library.

### HTML Markup

```html
<div class="slider">
  <div class="item">
    <img src="image/url/name.jpg" /> <span>Slide 1</span>
  </div>
  <div class="item">
    <img src="image/url/name.jpg" /> <span>Slide 2</span>
  </div>
</div>
```

### Using `<script>`

_This is minified version._

```html
<script type="text/javascript" src="https://unpkg.com/@dhavalvyas/basic-slider/dist/index.js"></script>
```
Demo using direct `<script>` tag. [Basic Slider - Demo](https://codepen.io/cooldhavs/full/vvBKzr "Basic Slider - Demo")

OR

### Using npm

`npm i @dhavalvyas/basic-slider`

Demo using direct `npm`. [Basic Slider - Demo](https://dhavalwd.github.io/basic-slider/ "Basic Slider - Demo")

## Instructions

### DEMO

Here is the codepen link for the current working demo.

[Basic Slider - Demo](https://codepen.io/cooldhavs/full/vvBKzr "Basic Slider - Demo")

## Options

Some options to configure your slider. Below are default values.

```javascript
let slider = new BasicSlider({
  selector: '.slider',
  dotsWrapper: '.dots-wrapper',
  arrowLeft: '.arrow-left',
  arrowRight: '.arrow-right',
  loop: true,
  transition: {
    speed: 300,
    easing: 'ease-in'
  },
  onInit: (slider) => {
    console.log("onInit: slider Object ---> ", slider);
  },
  onSlideChange: (slider) => {
    console.log("onSlideChange: slider Object ---> ", slider);
  }
})
```

### Methods you can use

```javascript
// Re-initialize the slider
slider.reInit();

// Destroy slider
slider.destroy(() => {
  console.log("This is a callback once Slider is destroyed");
})
```
