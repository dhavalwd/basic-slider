# Basic Slider

Basic Slider - Simple Slider with Sinple API

**_NOTE: This is purely for educational and learning purpose. Don't use this in production._**

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

OR

### Using npm

`npm i @dhavalvyas/basic-slider`

## Instructions

### DEMO

Here is the codepen link for the current working demo.

[Basic Slider Demo](https://codepen.io/cooldhavs/full/vvBKzr "Basic Slider Demo")

## Options

Some options to configure your slider. Below are default values.

```javascript
new BasicSlider({
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
