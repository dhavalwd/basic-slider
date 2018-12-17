// import dependencies
import { $ } from '../util/selectors';
import { addClass } from '../util/addClass';
import { removeClass } from '../util/removeClass';
import { hasClass } from '../util/hasClass';
import { addListenerMulti } from '../util/addListenerMulti';
import { removeListenerMulti } from '../util/removeListenerMulti';
import { timingSafeEqual } from 'crypto';

// return BasicSlider class
export class BasicSlider{
    constructor(options){
      // Create global config object
      this.config = BasicSlider.mergeSettings(options);

      // Resolve any issue with selector
      this.selector = typeof this.config.selector === 'string' ? $(this.config.selector) : this.config.selector;

      // If selector doesn't exist, throw error
      if(this.selector === null) {
        throw new Error('Something wrong with your selector!');
      }

      // Create global references
      this.selectWidth = this.selector.offsetWidth;
      this.innerElements = [].slice.call(this.selector.children);
      this.totalSlides = this.innerElements.length;
      this.transformProperty = BasicSlider.transformSupport();

      this.init();
    }

    /**
     * Overrides default settings with user defined settings ones.
     * @param {Object} options - Optional settings object.
     * @returns {Object} - Custom BasicSlider settings.
     */
    static mergeSettings(options) {
      // Default settings
      const settings = {
        selector: '.slider',
        dotsWrapper: false,
        arrowLeft: false,
        arrowRight: false,
        transition: {
          speed: 300,
          easing: 'ease-in'
        },
        swipe: false,
        autoHeight: true,
        loop: false,
        onInit: function onInit() {},
        onSlideChange: function onSlideChange() {}
      };

      const userSttings = options;
      for (const attrname in userSttings) {
        settings[attrname] = userSttings[attrname];
      }

      return settings;
    }

    static transformSupport() {
      const style = document.documentElement.style;
      if (typeof style.transform === 'string') {
        return 'transform';
      }
      return 'WebkitTransform';
    }

    buildDots() {
      for (var i = 0; i < this.totalSlides; i++) {
        var dot = document.createElement('li');
        dot.setAttribute('data-slide', i + 1);
        $(this.config.dotsWrapper).appendChild(dot);
      }

      $(this.config.dotsWrapper).addEventListener('click', e => {
        if (e.target && e.target.nodeName == "LI") {
          this.curSlide = parseInt(e.target.getAttribute('data-slide'));
          this.goToSlide();
        }
      }, false);
    }

    setDot() {
      var tardot = this.curSlide - 1;
      for (var j = 0; j < this.totalSlides; j++) {
        removeClass($(this.config.dotsWrapper).querySelectorAll('li')[j], 'active');
      }

      if (this.curSlide - 1 < 0) {
        tardot = this.totalSlides - 1;
      } else if (this.curSlide - 1 > this.totalSlides - 1) {
        tardot = 0;
      }
      addClass($(this.config.dotsWrapper).querySelectorAll('li')[tardot], 'active');
    }

    getCurLeft() {
      this.curLeft = parseInt(this.sliderInner.style.left.split('px')[0]);
    }

    loadedImg(el) {
      var loaded = false;
      let loadHandler = () => {
        if (loaded) {
          return;
        }
        loaded = true;
        this.loadedCnt++;
        if (this.loadedCnt >= this.innerElements.length) {
          this.updateSliderDimension();
        }
      }

      var img = el.querySelector('img');
      if (img) {
        img.onload = loadHandler;
        img.src = img.getAttribute('src');
        img.style.display = 'block';
        if (img.complete) {
          loadHandler();
          this.updateSliderDimension();
        }
      } else {
        this.updateSliderDimension();
      }
    }

    initArrows() {
      if (this.config.arrowLeft != '') {
        this.arrowLeft = $(this.config.arrowLeft);
        this.arrowLeft.clickEvent = () => {
          if (!hasClass(this.selector, 'isAnimating')) {
            if (this.curSlide == 1) {
              if(!this.config.loop) {
                return;
              }
              this.curSlide = this.totalSlides + 1;
              this.sliderInner.style.left = -this.curSlide * this.slideW + 'px';
            }
            this.curSlide--;
            setTimeout(() => {
              this.goToSlide();
            }, 20);
          }
        };

        this.arrowLeft.addEventListener('click', this.arrowLeft.clickEvent, false);
      }

      if (this.config.arrowRight != '') {
        this.arrowRight = $(this.config.arrowRight);
        this.arrowRight.clickEvent = () => {
          if (!hasClass(this.selector, 'isAnimating')) {
            if (this.curSlide == this.innerElements.length) {
              if(!this.config.loop) {
                return;
              }
              this.curSlide = 0;
              this.sliderInner.style.left = -this.curSlide * this.slideW + 'px';
            }
            this.curSlide++;
            setTimeout(() => {
              this.goToSlide();
            }, 20);
          }
        };
        this.arrowRight.addEventListener('click', this.arrowRight.clickEvent, false);
      }
    }

    updateArrowClass() {
      // Don't update classes if it's a loop slider
      if(this.config.loop) {
        return;
      }
      if (this.curSlide == this.innerElements.length) {
        if(!hasClass(this.config.arrowRight, 'is-disabled')) {
          addClass($(this.config.arrowRight), 'is-disabled')
        }
        if(!hasClass(this.config.arrowLeft, 'is-disabled')) {
          removeClass($(this.config.arrowLeft), 'is-disabled')
        }
      } else if (this.curSlide == 1) {
        if(!hasClass(this.config.arrowLeft, 'is-disabled')) {
          addClass($(this.config.arrowLeft), 'is-disabled')
        }
        if(!hasClass(this.config.arrowRight, 'is-disabled')) {
          removeClass($(this.config.arrowRight), 'is-disabled')
        }
      } else {
        if(!hasClass(this.config.arrowLeft, 'is-disabled')) {
          removeClass($(this.config.arrowLeft), 'is-disabled')
        }
        if(!hasClass(this.config.arrowRight, 'is-disabled')) {
          removeClass($(this.config.arrowRight), 'is-disabled')
        }
      }
    }

    on_resize(c, t) {
      onresize = function() {
        clearTimeout(t);
        t = setTimeout(c, 100);
      }
      return onresize;
    }

    updateSliderDimension() {
      this.slideW = parseInt(this.allSlides[0].offsetWidth);
      this.sliderInner.style.left = this.config.loop ? -this.slideW * this.curSlide + "px" : -this.slideW * (this.curSlide - 1) + "px";
      if (this.config.autoHeight) {
        this.selector.style.height = this.allSlides[this.curSlide].offsetHeight + "px";
      } else {
        for (var i = 0; i < this.totalSlides; i++) {
          if (this.allSlides[i].offsetHeight > this.selector.offsetHeight) {
            this.config.target.style.height = this.allSlides[i].offsetHeight + "px";
          }
        }
      }
    }

    goToSlide() {
      this.sliderInner.style.transition = 'left ' + this.config.transition.speed / 1000 + 's ' + this.config.transition.easing;
      this.sliderInner.style.left = -(this.curSlide * this.slideW) + 'px';
      addClass(this.selector, 'isAnimating');
      setTimeout(() => {
        this.sliderInner.style.transition = '';
        removeClass(this.selector, 'isAnimating');
      }, this.config.transition.speed);
      this.setDot();
      this.updateArrowClass();
      this.updateSliderDimension();
      this.config.onSlideChange(this);
    }

    startSwipe(e) {
      var touch = e;
      this.getCurLeft();
      if (!this.isAnimating) {
        if (e.type == 'touchstart') {
          touch = e.targetTouches[0] || e.changedTouches[0];
        }
        this.startX = touch.pageX;
        this.startY = touch.pageY;
        addListenerMulti(this.sliderInner, 'mousemove touchmove', this.swipeMove.bind(this));
        addListenerMulti($('body'), 'mouseup touchend', this.swipeEnd.bind(this));
      }
    }

    swipeMove(e) {
      var touch = e;
      if (e.type == 'touchmove') {
        touch = e.targetTouches[0] || e.changedTouches[0];
      }
      this.moveX = touch.pageX;
      this.moveY = touch.pageY;

      // for scrolling up and down
      if (Math.abs(this.moveX - this.startX) < 40) return;

      this.isAnimating = true;
      addClass(this.selector, 'isAnimating');
      e.preventDefault();

      if (this.curLeft + this.moveX - this.startX > 0 && this.curLeft == 0) {
        this.curLeft = -this.totalSlides * this.slideW;
      } else if (this.curLeft + this.moveX - this.startX < -(this.totalSlides + 1) * this.slideW) {
        this.curLeft = -this.slideW;
      }
      this.sliderInner.style.left = this.curLeft + this.moveX - this.startX + "px";
    }

    swipeEnd(e) {
      var touch = e;
      this.getCurLeft();

      if (Math.abs(this.moveX - this.startX) === 0) return;

      this.stayAtCur = Math.abs(this.moveX - this.startX) < 40 || typeof this.moveX === "undefined" ? true : false;
      this.dir = this.startX < this.moveX ? 'left' : 'right';

      if (this.stayAtCur) {} else {
        this.dir == 'left' ? this.curSlide-- : this.curSlide++;
        if (this.curSlide < 0) {
          this.curSlide = this.totalSlides;
        } else if (this.curSlide == this.totalSlides + 2) {
          this.curSlide = 1;
        }
      }

      // this.gotoSlide();

      delete this.startX;
      delete this.startY;
      delete this.moveX;
      delete this.moveY;

      this.isAnimating = false;
      removeClass(this.config.target, 'isAnimating');
      removeListenerMulti(this.sliderInner, 'mousemove touchmove', this.swipeMove.bind(this));
      removeListenerMulti($('body'), 'mouseup touchend', this.swipeEnd.bind(this));
    }

    buildItems() {
      // Wrap all slides into slider-inner
      let defaultMarkup = this.selector.innerHTML;
      // this.selector.innerHTML = `<div class="slider-inner">${defaultMarkup}</div>`;
      // this.sliderInner = this.selector.querySelector('.slider-inner');
      this.sliderInner = document.createElement('div');
      this.sliderInner.style.width = this.totalSlidesCount * 100 + "%";
      this.sliderInner.style.position = "absolute";

      const docFragment = document.createDocumentFragment();
      if(this.config.loop) {
        for (let i=this.totalSlides - 1; i < this.totalSlides; i++) {
          const element = this.buildItemWrapper(this.innerElements[i].cloneNode(true));
          docFragment.appendChild(element);
        }
      }
      for (let i = 0; i < this.innerElements.length; i++) {
        const element = this.buildItemWrapper(this.innerElements[i]);
        docFragment.appendChild(element);
      }
      if (this.config.loop) {
        for (let i = 0; i < 1; i++) {
          const element = this.buildItemWrapper(this.innerElements[i].cloneNode(true));
          docFragment.appendChild(element);
        }
      }

      // Clear sliderInner (just in case something is there) and insert a frame
      this.selector.innerHTML = '';
      this.sliderInner.appendChild(docFragment);
      this.selector.appendChild(this.sliderInner);
    }

    buildItemWrapper(elm) {
      const elementContainer = document.createElement('div');
      elementContainer.style.cssFloat = 'left';
      elementContainer.style.float = 'left';
      elementContainer.style.width = 100 / this.totalSlidesCount + "%";
      elementContainer.appendChild(elm);
      return elementContainer;
    }

    // reInit() method
    reInit() {
      // Destroy slider first and then reInit
      this.init();
    }

    // destroy() method
    destroy(callback) {
      // remove click events from Arrows
      this.arrowLeft.removeEventListener('click', this.arrowLeft.clickEvent, false);
      this.arrowRight.removeEventListener('click', this.arrowRight.clickEvent, false);
      // remove all markup for pagination
      $(this.config.dotsWrapper).innerHTML = '';
      // remove all plugin generated markup
      const slides = document.createDocumentFragment();
      for (let i = 0; i < this.innerElements.length; i++) {
        slides.appendChild(this.innerElements[i]);
      }
      this.selector.innerHTML = '';
      this.selector.appendChild(slides);
      this.selector.removeAttribute('style');

      if (callback) {
        callback(this);
      }
    }

    init() {
      // Some default values
      this.loadedCnt = 0;
      this.curSlide = 0;
      this.totalSlidesCount = this.config.loop ? this.totalSlides + 2 : this.totalSlides;

      // Build items
      this.buildItems();

      this.allSlides = this.sliderInner.children;

      // Increase curSlide number
      this.curSlide++;

      for (var _i = 0; _i < this.totalSlidesCount ; _i++) {
        this.loadedImg(this.allSlides[_i]);
      }

      window.addEventListener("resize", this.on_resize( () => {
        this.updateSliderDimension();
      }), false);

      // Update relavant dimension
      this.updateSliderDimension();

      // Build and set dots only if its true
      if(this.config.dotsWrapper) {
        this.buildDots();
        this.setDot();
      }

      // Init arrows only if both arrows are true
      if(this.config.arrowLeft && this.config.arrowRight) {
        this.initArrows();
      }

      if(!this.config.loop) {
        this.updateArrowClass();
      }

      if (this.config.swipe) {
        // addListenerMulti(this.sliderInner, 'mousedown touchstart', this.startSwipe.bind(this));
      }

      this.isAnimating = false;

      this.config.onInit(this);
    }
}
