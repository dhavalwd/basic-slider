// import dependencies
import { $ } from '../util/selectors';
import { addClass } from '../util/addClass';
import { removeClass } from '../util/removeClass';
import { hasClass } from '../util/hasClass';
import { addListenerMulti } from '../util/addListenerMulti';
import { removeListenerMulti } from '../util/removeListenerMulti';

// return BasicSlider class
export class BasicSlider{
    constructor(options){
      // Create global config object
      this.config = BasicSlider.mergeSettings(options);
      console.log("this.config -> ", this.config);

      // Resolve any issue with selector
      this.selector = typeof this.config.selector === 'string' ? $(this.config.selector) : this.config.selector;

      // If selector doesn't exist, throw error
      if(this.selector === null) {
        throw new Error('Something wrong with your selector!');
      }

      // Create global references
      this.selectWidth = this.selector.offsetWidth;
      this.innerElements = [].slice.call(this.selector.children);
      this.transformProperty = BasicSlider.transformSupport();

      console.log("BasicSlider.transformSupport() -> ", BasicSlider.transformSupport());

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
        dotsWrapper: '.dots-wrapper',
        arrowLeft: '.arrow-left',
        arrowRight: '.arrow-right',
        transition: {
          speed: 300,
          easing: 'ease-in'
        },
        swipe: false,
        autoHeight: true,
        loop: false,
        afterChangeSlide: function afterChangeSlide() {}
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
      for (var i = 0; i < this.innerElements.length; i++) {
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

    getCurLeft() {
      this.curLeft = parseInt(this.sliderInner.style.left.split('px')[0]);
      console.log("this.curLeft -> ", this.curLeft);
    }

    goToSlide() {
      this.sliderInner.style.transition = 'left ' + this.config.transition.speed / 1000 + 's ' + this.config.transition.easing;
      this.sliderInner.style.left = -(this.curSlide - 1) * this.slideW + 'px';
      addClass($(this.config.selector), 'isAnimating');
      setTimeout(() => {
        this.sliderInner.style.transition = '';
        removeClass($(this.config.selector), 'isAnimating');
      }, this.config.transition.speed);
      this.setDot();
      this.updateArrowClass();
      this.updateSliderDimension();
      this.config.afterChangeSlide(this);
    }

    loadedImg(el) {
      console.log("el -> ",el);
      var loaded = false;
      function loadHandler() {
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
        img.src = img.getAttribute('data-src');
        img.style.display = 'block';
        if (img.complete) {
          loadHandler();
        }
      } else {
        this.updateSliderDimension();
      }
    }

    updateSliderDimension() {
      console.log("Updated dimension");
      this.slideW = parseInt($(this.config.selector).querySelectorAll('.item')[0].offsetWidth);
      console.log("this.slideW --> ", this.slideW);
      this.sliderInner.style.left = -this.slideW * (this.curSlide - 1) + "px";
      if (this.config.autoHeight) {
        $(this.config.selector).style.height = $(this.config.selector).querySelectorAll('.item')[this.curSlide - 1].offsetHeight + "px";
        $(this.config.selector).style.width = $(this.config.selector).querySelectorAll('.item')[this.curSlide - 1].offsetWidth + "px";
      } else {
        for (var i = 0; i < this.innerElements.length; i++) {
          if (this.innerElements[i].offsetHeight > this.config.selector.offsetHeight) {
            this.config.target.style.height = this.innerElements[i].offsetHeight + "px";
          }
        }
      }
      this.config.afterChangeSlide(this);
    }

    setDot() {
      var tardot = this.curSlide - 1;
      console.log("this.innerElements.length -> ", this.innerElements.length);
      for (var j = 0; j < this.innerElements.length; j++) {
        removeClass($(this.config.dotsWrapper).querySelectorAll('li')[j], 'active');
      }

      if (this.curSlide - 1 < 0) {
        tardot = this.innerElements.length - 1;
      } else if (this.curSlide - 1 > this.innerElements.length - 1) {
        tardot = 0;
      }
      addClass($(this.config.dotsWrapper).querySelectorAll('li')[tardot], 'active');
    }

    initArrows() {
      if (this.config.arrowLeft != '') {
        $(this.config.arrowLeft).addEventListener('click', () => {
          if (!hasClass(this.config.selector, 'isAnimating')) {
            if (this.curSlide == 1) {
              return;
              // this.curSlide = this.innerElements.length + 1;
              // this.sliderInner.style.left = -this.curSlide * this.slideW + 'px';
            }
            this.curSlide--;
            setTimeout(() => {
              this.goToSlide();
            }, 20);
          }
        }, false);
      }

      if (this.config.arrowRight != '') {
        $(this.config.arrowRight).addEventListener('click', () => {
          if (!hasClass(this.config.selector, 'isAnimating')) {
            if (this.curSlide == this.innerElements.length) {
              return;
            }
            this.curSlide++;
            setTimeout(() => {
              this.goToSlide();
            }, 20);
          }
        }, false);
      }
    }

    updateArrowClass() {
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

    startSwipe(e) {
      console.log(e);
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
      addClass($(this.config.selector), 'isAnimating');
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

    init() {
      console.log("this ------> ", this);
      // Wrap all slides into slider-inner
      let defaultMarkup = $(this.config.selector).innerHTML;
      $(this.config.selector).innerHTML = `<div class="slider-inner">${defaultMarkup}</div>`;
      this.sliderInner = $(this.config.selector).querySelector('.slider-inner');

      console.log("this.sliderInner -> ", this.sliderInner);

      this.loadedCnt = 0;
      this.curSlide = 0;

      // Increase curSlide number
      this.curSlide++;

      this.sliderInner.style.width = (this.innerElements.length) * 100 + "%";
      for (var _i = 0; _i < this.innerElements.length; _i++) {
        this.innerElements[_i].style.width = (100 / this.innerElements.length) + "%";
        this.loadedImg(this.innerElements[_i]);
      }

      // Update relavant dimension
      this.updateSliderDimension();

      this.buildDots();
      this.setDot();
      this.initArrows();
      this.updateArrowClass();
      // this.getCurLeft();

      if (this.config.swipe) {
        addListenerMulti(this.sliderInner, 'mousedown touchstart', this.startSwipe.bind(this));
      }

      this.isAnimating = false;
    }
}
