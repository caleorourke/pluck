/*! jQuery asPieProgress - v0.2.0 - 2014-12-09
* https://github.com/amazingSurge/jquery-asPieProgress
* Copyright (c) 2014 amazingSurge; Licensed GPL */

!function(a, b, c) {
  'use strict';

  function d() {
    return 'undefined' != typeof c.performance && c.performance.now ? c.performance.now() : Date.now()
  }
  function e(a) {
    return 'string' == typeof a && -1 != a.indexOf('%')
  }
  Date.now || (Date.now = function() {
    return (new Date).getTime()
  });
  for (var f = ['webkit', 'moz'], g = 0; g < f.length && !c.requestAnimationFrame; ++g) {
    var h = f[g];
    c.requestAnimationFrame = c[h + 'RequestAnimationFrame'], c.cancelAnimationFrame = c[h + 'CancelAnimationFrame'] || c[h + 'CancelRequestAnimationFrame']
  }
  if (/iP(ad|hone|od).*OS (6|7)/.test(c.navigator.userAgent) || !c.requestAnimationFrame || !c.cancelAnimationFrame) {
    var i = 0;
    c.requestAnimationFrame = function(a) {
      var b = d(),
          c = Math.max(i + 16, b);
      return setTimeout(function() {
        a(i = c)
      }, c - b)
    }, c.cancelAnimationFrame = clearTimeout
  }
  var j = function(c, d) {
    var e = b.createElementNS('http://www.w3.org/2000/svg', c);
    return a.each(d, function(a, b) {
      e.setAttribute(a, b)
    }), e
  },
  k = 'createElementNS' in b && new j('svg', {}).createSVGRect,
  l = 'asPieProgress',
  m = a[l] = function(b, c) {
    this.element = b, this.$element = a(b), this.options = a.extend({}, m.defaults, c, this.$element.data()), this.namespace = this.options.namespace, this.classes = {
      number: this.namespace + '-number',
      content: this.namespace + '-content'
    }, this.easing = m.easing[this.options.easing] || m.easing.ease, this.$element.addClass(this.namespace), this.min = this.$element.attr('aria-valuemin'), this.max = this.$element.attr('aria-valuemax'), this.min = this.min ? parseInt(this.min, 10) : this.options.min, this.max = this.max ? parseInt(this.max, 10) : this.options.max, this.first = this.$element.attr('aria-valuenow'), this.first = this.first ? parseInt(this.first, 10) : this.min, this.now = this.first, this.goal = this.options.goal, this._frameId = null, this.initialized = !1, this._trigger('init'), this.init()
  };
  m.defaults = {
    namespace: 'asPieProgress',
    min: 0,
    max: 100,
    goal: 100,
    size: 160,
    speed: 15,
    barcolor: '#ef1e25',
    barsize: '4',
    trackcolor: '#f2f2f2',
    fillcolor: 'none',
    easing: 'ease',
    numberCallback: function(a) {
      var b = this.getPercentage(a);
      return b + '%'
    },
    contentCallback: null
  };
  var n = function(a, b, c, d) {
    function e(a, b) {
      return 1 - 3 * b + 3 * a
    }
    function f(a, b) {
      return 3 * b - 6 * a
    }
    function g(a) {
      return 3 * a
    }
    function h(a, b, c) {
      return ((e(b, c) * a + f(b, c)) * a + g(b)) * a
    }
    function i(a, b, c) {
      return 3 * e(b, c) * a * a + 2 * f(b, c) * a + g(b)
    }
    function j(b) {
      for (var d = b, e = 0; 4 > e; ++e) {
        var f = i(d, a, c);
        if (0 === f) return d;
        var g = h(d, a, c) - b;
        d -= g / f
      }
      return d
    }
    return a === b && c === d ? {
      css: 'linear',
      fn: function(a) {
        return a
      }
    } : {
      css: 'cubic-bezier(' + a + ',' + b + ',' + c + ',' + d + ')',
      fn: function(a) {
        return h(j(a), b, d)
      }
    }
  };
  a.extend(m.easing = {}, {
    ease: n(.25, .1, .25, 1),
    linear: n(0, 0, 1, 1),
    'ease-in': n(.42, 0, 1, 1),
    'ease-out': n(0, 0, .58, 1),
    'ease-in-out': n(.42, 0, .58, 1)
  }), m.prototype = {
    constructor: m,
    init: function() {
      this.$number = this.$element.find('.' + this.classes.number), this.$content = this.$element.find('.' + this.classes.content), this.size = this.options.size, this.width = this.size, this.height = this.size, this.prepare(), this.initialized = !0, this._trigger('ready')
    },
    prepare: function() {
      k && (this.svg = new j('svg', {
        width: this.width,
        height: this.height
      }), this.buildTrack(), this.buildBar(), this.$element.append(this.svg))
    },
    buildTrack: function() {
      var a = this.size,
        b = this.size,
        c = a / 2,
        d = b / 2,
        e = this.options.barsize,
        f = new j('ellipse', {
          rx: c - e / 2,
          ry: d - e / 2,
          cx: c,
          cy: d,
          stroke: this.options.trackcolor,
          fill: this.options.fillcolor,
          'stroke-width': e
        });
      this.svg.appendChild(f)
    },
    buildBar: function() {
      if (k) {
        var a = new j('path', {
          fill: 'none',
          'stroke-width': this.options.barsize,
          stroke: this.options.barcolor
        });
        this.bar = a, this.svg.appendChild(a), this._drawBar(this.goal), this._updateBar()
      }
    },
    _drawBar: function(a) {
      if (k) {
        this.bar_goal = a;
        var b = this.size,
          c = this.size,
          d = b / 2,
          e = c / 2,
          f = 0,
          g = this.options.barsize,
          h = Math.min(d, e) - g / 2;
        this.r = h;
        var i = this.getPercentage(a);
        100 === i && (i -= 1e-4);
        var j = f + i * Math.PI * 2 / 100,
          l = d + h * Math.sin(f),
          m = e - h * Math.cos(f),
          n = d + h * Math.sin(j),
          o = e - h * Math.cos(j),
          p = 0;
        j - f > Math.PI && (p = 1);
        var q = 'M' + l + ',' + m + ' A' + h + ',' + h + ' 0 ' + p + ' 1 ' + n + ',' + o;
        this.bar.setAttribute('d', q)
      }
    },
    _updateBar: function() {
      if (k) {
        var a = this.getPercentage(this.now),
          b = this.bar.getTotalLength(),
          c = b * (1 - a / this.getPercentage(this.bar_goal));
        this.bar.style.strokeDasharray = b + ' ' + b, this.bar.style.strokeDashoffset = c
      }
    },
    _trigger: function(a) {
      var b = Array.prototype.slice.call(arguments, 1),
        c = [this].concat(b);
      this.$element.trigger(l + '::' + a, c), a = a.replace(/\b\w+\b/g, function(a) {
        return a.substring(0, 1).toUpperCase() + a.substring(1)
      });
      var d = 'on' + a;
      'function' == typeof this.options[d] && this.options[d].apply(this, b)
    },
    getPercentage: function(a) {
      return Math.round(100 * (a - this.min) / (this.max - this.min))
    },
    go: function(a) {
      var b = this;
      this._clear(), e(a) && (a = parseInt(a.replace('%', ''), 10), a = Math.round(this.min + a / 100 * (this.max - this.min))), 'undefined' == typeof a && (a = this.goal), a > this.max ? a = this.max : a < this.min && (a = this.min), this.bar_goal < a && this._drawBar(a);
      var f = b.now,
        g = d(),
        h = function(d) {
          var e = (d - g) / b.options.speed,
            i = Math.round(b.easing.fn(e / 100) * (b.max - b.min));
          a > f ? (i = f + i, i > a && (i = a)) : (i = f - i, a > i && (i = a)), b._update(i), i === a ? (c.cancelAnimationFrame(b._frameId), b._frameId = null, b.now === b.goal && b._trigger('finish')) : b._frameId = c.requestAnimationFrame(h)
        };
      b._frameId = c.requestAnimationFrame(h)
    },
    _update: function(a) {
      this.now = a, this._updateBar(), this.$element.attr('aria-valuenow', this.now), this.$number.length > 0 && 'function' == typeof this.options.numberCallback && this.$number.html(this.options.numberCallback.call(this, [this.now])), this.$content.length > 0 && 'function' == typeof this.options.contentCallback && this.$content.html(this.options.contentCallback.call(this, [this.now])), this._trigger('update', a)
    },
    _clear: function() {
      this._frameId && (c.cancelAnimationFrame(this._frameId), this._frameId = null)
    },
    get: function() {
      return this.now
    },
    start: function() {
      this._clear(), this._trigger('start'), this.go(this.goal)
    },
    reset: function() {
      this._clear(), this._drawBar(this.goal), this._update(this.first), this._trigger('reset')
    },
    stop: function() {
      this._clear(), this._trigger('stop')
    },
    finish: function() {
      this._clear(), this._update(this.goal), this._trigger('finish')
    },
    destory: function() {
      this.$element.data(l, null), this._trigger('destory')
    }
  }, a.fn[l] = function(b) {
    if ('string' != typeof b) return this.each(function() {
      a.data(this, l) || a.data(this, l, new m(this, b))
    });
    var c = b,
      d = Array.prototype.slice.call(arguments, 1);
    if (/^\_/.test(c)) return !1;
    if (!/^(get)$/.test(c)) return this.each(function() {
      var b = a.data(this, l);
      b && 'function' == typeof b[c] && b[c].apply(b, d)
    });
    var e = this.first().data(l);
    return e && 'function' == typeof e[c] ? e[c].apply(e, d) : void 0
  }
}(jQuery, document, window);