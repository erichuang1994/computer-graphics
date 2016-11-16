/*
 * Copyright © 2011-2015 by Animatron.
 * All rights are reserved.
 *
 * Animatron Player is licensed under the MIT License.
 *
 * v1.4, built at Tue Sep 13 2016 07:05:33 GMT+0000 (UTC) / 2016-09-13T07:05:33.329Z
 */
var $jscomp = {
  scope: {},
  checkStringArgs: function(c, v, k) {
    if (null == c) throw new TypeError("The 'this' value for String.prototype." + k + " must not be null or undefined");
    if (v instanceof RegExp) throw new TypeError("First argument to String.prototype." + k + " must not be a regular expression");
    return c + ""
  }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, v, k) {
  if (k.get || k.set) throw new TypeError("ES3 does not support getters and setters.");
  c != Array.prototype && c != Object.prototype && (c[v] = k.value)
};
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global ? global : c
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, v, k, b) {
  if (v) {
    k = $jscomp.global;
    c = c.split(".");
    for (b = 0; b < c.length - 1; b++) {
      var e = c[b];
      e in k || (k[e] = {});
      k = k[e]
    }
    c = c[c.length - 1];
    b = k[c];
    v = v(b);
    v != b && null != v && $jscomp.defineProperty(k, c, {
      configurable: !0,
      writable: !0,
      value: v
    })
  }
};
$jscomp.polyfill("String.prototype.repeat", function(c) {
  return c ? c : function(c) {
    var k = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > c || 1342177279 < c) throw new RangeError("Invalid count value");
    c |= 0;
    for (var b = ""; c;)
      if (c & 1 && (b += k), c >>>= 1) k += k;
    return b
  }
}, "es6-impl", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(c) {
  return $jscomp.SYMBOL_PREFIX + (c || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var c = $jscomp.global.Symbol.iterator;
  c || (c = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[c] && $jscomp.defineProperty(Array.prototype, c, {
    configurable: !0,
    writable: !0,
    value: function() {
      return $jscomp.arrayIterator(this)
    }
  });
  $jscomp.initSymbolIterator = function() {}
};
$jscomp.arrayIterator = function(c) {
  var v = 0;
  return $jscomp.iteratorPrototype(function() {
    return v < c.length ? {
      done: !1,
      value: c[v++]
    } : {
      done: !0
    }
  })
};
$jscomp.iteratorPrototype = function(c) {
  $jscomp.initSymbolIterator();
  c = {
    next: c
  };
  c[$jscomp.global.Symbol.iterator] = function() {
    return this
  };
  return c
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(c, v) {
  $jscomp.initSymbolIterator();
  c instanceof String && (c += "");
  var k = 0,
    b = {
      next: function() {
        if (k < c.length) {
          var e = k++;
          return {
            value: v(e, c[e]),
            done: !1
          }
        }
        b.next = function() {
          return {
            done: !0,
            value: void 0
          }
        };
        return b.next()
      }
    };
  b[Symbol.iterator] = function() {
    return b
  };
  return b
};
$jscomp.polyfill("Array.prototype.keys", function(c) {
  return c ? c : function() {
    return $jscomp.iteratorFromArray(this, function(c) {
      return c
    })
  }
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function(c) {
  return c ? c : function(c, k, b) {
    var e = this.length || 0;
    0 > k && (k = Math.max(0, e + k));
    if (null == b || b > e) b = e;
    b = Number(b);
    0 > b && (b = Math.max(0, e + b));
    for (k = Number(k || 0); k < b; k++) this[k] = c;
    return this
  }
}, "es6-impl", "es3");
$jscomp.findInternal = function(c, v, k) {
  c instanceof String && (c = String(c));
  for (var b = c.length, e = 0; e < b; e++) {
    var a = c[e];
    if (v.call(k, a, e, c)) return {
      i: e,
      v: a
    }
  }
  return {
    i: -1,
    v: void 0
  }
};
$jscomp.polyfill("Array.prototype.find", function(c) {
  return c ? c : function(c, k) {
    return $jscomp.findInternal(this, c, k).v
  }
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.values", function(c) {
  return c ? c : function() {
    return $jscomp.iteratorFromArray(this, function(c, k) {
      return k
    })
  }
}, "es6", "es3");
(function e$$0(v, k, b) {
  function e(d, f) {
    if (!k[d]) {
      if (!v[d]) {
        var h = "function" == typeof require && require;
        if (!f && h) return h(d, !0);
        if (a) return a(d, !0);
        h = Error("Cannot find module '" + d + "'");
        throw h.code = "MODULE_NOT_FOUND", h;
      }
      h = k[d] = {
        exports: {}
      };
      v[d][0].call(h.exports, function(a) {
        var b = v[d][1][a];
        return e(b ? b : a)
      }, h, h.exports, e$$0, v, k, b)
    }
    return k[d].exports
  }
  for (var a = "function" == typeof require && require, f = 0; f < b.length; f++) e(b[f]);
  return e
})({
  1: [function(c, v, k) {
    var b = [],
      e = function(a, c) {
        var d = document.head || document.getElementsByTagName("head")[0],
          e = b[b.length - 1];
        c = c || {};
        c.insertAt = c.insertAt || "bottom";
        if ("top" === c.insertAt) e ? e.nextSibling ? d.insertBefore(a, e.nextSibling) : d.appendChild(a) : d.insertBefore(a, d.firstChild), b.push(a);
        else if ("bottom" === c.insertAt) d.appendChild(a);
        else throw Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
      };
    v.exports = {
      createLink: function(a, b) {
        var d = document.head || document.getElementsByTagName("head")[0],
          c = document.createElement("link");
        c.href = a;
        c.rel = "stylesheet";
        for (var h in b) b.hasOwnProperty(h) &&
          c.setAttribute("data-" + h, b[h]);
        d.appendChild(c)
      },
      createStyle: function(a, b, d) {
        d = d || {};
        var c = document.createElement("style");
        c.type = "text/css";
        for (var h in b) b.hasOwnProperty(h) && c.setAttribute("data-" + h, b[h]);
        c.sheet ? (c.innerHTML = a, c.sheet.cssText = a, e(c, {
          insertAt: d.insertAt
        })) : c.styleSheet ? (e(c, {
          insertAt: d.insertAt
        }), c.styleSheet.cssText = a) : (c.appendChild(document.createTextNode(a)), e(c, {
          insertAt: d.insertAt
        }))
      }
    }
  }, {}],
  2: [function(c, v, k) {
    c("browserify-css").createStyle(".anm-wrapper {\n  position: relative;\n}\n.anm-controls {\n  position: absolute;\n  left: 0;\n  top: 0;\n  vertical-align: top;\n  z-index: 100;\n  cursor: pointer;\n  background-color: rgba(0,0,0,0);\n}\n#anm-text-measurer-container {\n  position: absolute;\n  visibility: hidden;\n  left: -10000px;\n  top: -10000px;\n}\n", {
      href: "res/player.css"
    }, {
      insertAt: "bottom"
    });
    v.exports = ".anm-wrapper {\n  position: relative;\n}\n.anm-controls {\n  position: absolute;\n  left: 0;\n  top: 0;\n  vertical-align: top;\n  z-index: 100;\n  cursor: pointer;\n  background-color: rgba(0,0,0,0);\n}\n#anm-text-measurer-container {\n  position: absolute;\n  visibility: hidden;\n  left: -10000px;\n  top: -10000px;\n}\n"
  }, {
    "browserify-css": 1
  }],
  3: [function(c, v, k) {
    function b() {
      this.id = e.guid();
      this.tree = [];
      this.hash = {};
      this.name = "";
      this.duration =
        void 0;
      this.bgfill = null;
      this.height = this.width = void 0;
      this.factor = this.speed = this.zoom = 1;
      this.repeat = !1;
      this.meta = {};
      this.targets = {};
      this.$prefix = null;
      this.__informEnabled = !0;
      this.__lastOverElm = null;
      this._laters = [];
      this._initHandlers()
    }
    var e = c("../utils.js"),
      a = e.is,
      f = e.iter;
    k = c("../constants.js");
    var d = c("engine"),
      n = c("../resource_manager.js"),
      h = c("../../vendor/font_detector.js"),
      t = c("./element.js"),
      w = c("../graphics/brush.js"),
      r = c("../events.js"),
      z = r.provideEvents,
      y = c("../errors.js"),
      x = c("../loc.js").Errors,
      A = c("./search.js"),
      u = {
        click: k.X_MCLICK,
        dblclick: k.X_MDCLICK,
        mouseup: k.X_MUP,
        mousedown: k.X_MDOWN,
        mousemove: k.X_MMOVE,
        mouseover: k.X_MOVER,
        mouseout: k.X_MOUT,
        keypress: k.X_KPRESS,
        keyup: k.X_KUP,
        keydown: k.X_KDOWN
      };
    b.DEFAULT_DURATION = 10;
    z(b, [k.A_START, k.A_PAUSE, k.A_STOP, k.X_MCLICK, k.X_MDCLICK, k.X_MUP, k.X_MDOWN, k.X_MMOVE, k.X_MOVER, k.X_MOUT, k.X_KPRESS, k.X_KUP, k.X_KDOWN, k.X_ERROR]);
    b.prototype.add = function(b, d, c) {
      d ? (b = new t(b, d), c && b.changeTransform(c), this.addToTree(b)) : a.arr(b) ? ((new t).add(b), this.addToTree(_clip)) :
        this.addToTree(b);
      return this
    };
    b.prototype.remove = function(a) {
      a.parent ? a.parent.remove(a) : this._unregister(a);
      return this
    };
    b.prototype.traverse = function(a, b) {
      e.keys(this.hash, function(d, c) {
        return a(c, b)
      });
      return this
    };
    b.prototype.each = function(a, b) {
      for (var d = 0, c = this.tree.length; d < c && !1 !== a(this.tree[d], b); d++);
      return this
    };
    b.prototype.reverseEach = function(a, b) {
      for (var d = this.tree.length; d-- && !1 !== a(this.tree[d], b););
      return this
    };
    b.prototype.iter = function(a, b) {
      f(this.tree).each(a, b);
      return this
    };
    b.prototype.render = function(a, b, d) {
      a.save();
      this.time = b;
      var c = this.zoom;
      1 != c && a.scale(c, c);
      this.bgfill && (this.bgfill instanceof w || (this.bgfill = w.fill(this.bgfill)), this.bgfill.apply(a), a.fillRect(0, 0, this.width, this.height));
      b = this.$prefix ? this.$prefix(b, a) : b;
      this.each(function(m) {
        m.render(a, b, d)
      });
      a.restore()
    };
    b.prototype.jump = function(a) {
      this.jumping || (this.jumping = !0, e.keys(this.targets, function(b, d) {
        d && d.seek(a)
      }), this.jumping = !1)
    };
    b.prototype.jumpTo = function(b) {
      (b = a.str(b) ? this.find(b) : b) &&
      this.jump(b.gband[0])
    };
    b.prototype.getFittingDuration = function() {
      var a = -Infinity;
      this.each(function(b) {
        b = b._max_tpos();
        b > a && (a = b)
      });
      return a
    };
    b.prototype.reset = function() {
      this.__informEnabled = !0;
      this.time = null;
      this.each(function(a) {
        a.reset()
      });
      return this
    };
    b.prototype.playedIn = function(a) {
      this.targets[a.id] = a;
      return this
    };
    b.prototype.dispose = function(a) {
      a && (this.targets[a.id] = null);
      this.disposeHandlers();
      var b = this;
      this.iter(function(a) {
        b._unregister_no_rm(a);
        a.dispose();
        return !1
      });
      return this
    };
    b.prototype.isEmpty =
      function() {
        return 0 === this.tree.length
      };
    b.prototype.toString = function() {
      return "[ Animation " + (this.name ? "'" + this.name + "'" : "") + "]"
    };
    b.prototype.subscribeEvents = function(a) {
      d.subscribeAnimationToEvents(a, this, u)
    };
    b.prototype.unsubscribeEvents = function(a) {
      d.unsubscribeAnimationFromEvents(a, this)
    };
    b.prototype.filterEvent = function(b, d) {
      function c(q, g) {
        return q.firstParent(function(q) {
          return q.subscribedTo(g)
        })
      }
      var h = this;
      if (r.mouse(b)) {
        var m = h.adapt(d.pos.x, d.pos.y),
          g = !1;
        h.reverseEach(function(q) {
          q.inside(m,
            function(q) {
              return a.defined(q.cur_t) && q.fits(q.cur_t)
            },
            function(q, a) {
              g = !0;
              if ("mousemove" !== b) {
                var C = c(q, b);
                C && C.fire(b, d)
              } else if (C = c(q, "mousemove"), h.__lastOverElm)
                if (q.id === h.__lastOverElm.id) C && C.fire(b, d);
                else {
                  r = c(q, "mouseover");
                  if (h.__lastOverElm) {
                    var m = c(h.__lastOverElm, "mouseout");
                    m && m.fire("mouseout", d);
                    h.__lastOverElm = null
                  }
                  h.__lastOverElm = q;
                  r && r.fire("mouseover", d);
                  C && C.fire("mousemove", d)
                }
              else {
                h.__lastOverElm = q;
                var r = c(q, "mouseover");
                r && r.fire("mouseover", d);
                C && C.fire("mousemove", d)
              }
              return !1
            });
          if (g) return !1
        });
        if ("mousemove" === b && !g && h.__lastOverElm) {
          var q = !1;
          h.__lastOverElm.inside(m, null, function() {
            q = !0
          });
          if (!q) {
            var C = c(h.__lastOverElm, "mouseout");
            h.__lastOverElm = null;
            C && C.fire("mouseout", d)
          }
        }
        return !1
      }
      return !0
    };
    b.prototype.addToTree = function(a) {
      if (!a.children) throw y.animation(x.A.OBJECT_IS_NOT_ELEMENT, this);
      this._register(a);
      this.tree.push(a)
    };
    b.prototype.handlePause = function() {
      this.traverse(function(a) {
        a.__resetBandEvents()
      })
    };
    b.prototype._register = function(a) {
      if (this.hash[a.id]) throw y.animation(x.A.ELEMENT_IS_REGISTERED,
        this);
      a.registered = !0;
      a.anim = this;
      this.hash[a.id] = a;
      var b = this;
      a.each(function(a) {
        b._register(a)
      })
    };
    b.prototype._unregister_no_rm = function(a) {
      this._unregister(a, !0)
    };
    b.prototype._unregister = function(a, b) {
      if (!a.registered) throw y.animation(x.A.ELEMENT_IS_NOT_REGISTERED, this);
      var d = this;
      a.each(function(a) {
        d._unregister(a)
      });
      var c = -1;
      if (!b)
        for (; 0 <= (c = this.tree.indexOf(a));) this.tree.splice(c, 1);
      delete this.hash[a.id];
      a.registered = !1;
      a.anim = null
    };
    b.prototype._collectRemoteResources = function(a) {
      var b = [],
        d = this;
      this.traverse(function(c) {
        c._hasRemoteResources(d, a) && (b = b.concat(c._collectRemoteResources(d, a)))
      });
      this.fonts && this.fonts.length && (b = b.concat(this.fonts.map(function(a) {
        return a.url
      })));
      return b
    };
    b.prototype._loadRemoteResources = function(a) {
      var b = this;
      this.traverse(function(d) {
        d._hasRemoteResources(b, a) && d._loadRemoteResources(b, a)
      });
      b.loadFonts(a)
    };
    b.prototype.find = function(a, b) {
      return A.one(a).over(b ? b.children : this.tree)
    };
    b.prototype.findAll = function(a, b) {
      return A.all(a).over(b ? b.children :
        this.tree)
    };
    b.prototype.findById = function(a) {
      return this.hash[a]
    };
    b.prototype.prefix = function(a) {
      this.$prefix = a
    };
    b.prototype.adapt = function(a, b) {
      return {
        x: a / this.factor,
        y: b / this.factor
      }
    };
    b.prototype.invokeAllLaters = function() {
      for (var a = 0; a < this._laters.length; a++) this._laters[a].call(this)
    };
    b.prototype.clearAllLaters = function() {
      this._laters = []
    };
    b.prototype.invokeLater = function(a) {
      this._laters.push(a)
    };
    b.prototype.loadFonts = function(a) {
      if (this.fonts && this.fonts.length) {
        for (var b = this.fonts, c = d.getWebfontStyleObject(),
            r = "", m = [], g = new h, q = 0; q < b.length; q++) {
          var C = b[q];
          if (C.url && C.face) {
            var x = d.checkMediaUrl(C.url),
              e = d.checkMediaUrl(C.woff);
            m.push(C);
            r += '@font-face {\nfont-family: "' + C.face + '";\nsrc:' + (e ? ' url("' + e + '") format("woff"),\n' : "") + ' url("' + x + '") format("truetype");\n' + (C.style ? "font-style: " + C.style + ";\n" : "") + (C.weight ? "font-weight: " + C.weight + ";\n" : "") + "}\n"
          }
        }
        if (0 !== m.length)
          for (c.innerHTML += r, b = function(q) {
              var a = m[q];
              return function(q) {
                var b = 0,
                  d;
                d = setInterval(function() {
                  b += 100;
                  if (g.detect(a) || 1E4 < b) clearInterval(d),
                    q()
                }, 100)
              }
            }, q = 0; q < m.length; q++) n.loadOrGet(a.id, m[q].url, b(q))
      }
    };
    v.exports = b
  }, {
    "../../vendor/font_detector.js": 42,
    "../constants.js": 12,
    "../errors.js": 13,
    "../events.js": 14,
    "../graphics/brush.js": 17,
    "../loc.js": 27,
    "../resource_manager.js": 35,
    "../utils.js": 39,
    "./element.js": 6,
    "./search.js": 9,
    engine: 40
  }],
  4: [function(c, v, k) {
    var b = {
      recalc: function(c, a) {
        a = a || (c.parent ? c.parent.gband : [0, 0]);
        c.gband = [a[0] + c.lband[0], a[0] + c.lband[1]];
        c.each(function(a) {
          b.recalc(a, c.gband)
        })
      },
      wrap: function(b, a) {
        return b ? [b[0] +
          a[0], b[0] + a[1] <= b[1] ? b[0] + a[1] : b[1]
        ] : a
      },
      expand: function(b, a) {
        return b ? [a[0] < b[0] ? a[0] : b[0], a[1] > b[1] ? a[1] : b[1]] : a
      },
      reduce: function(b, a) {
        return b ? [a[0] > b[0] ? a[0] : b[0], a[1] < b[1] ? a[1] : b[1]] : a
      }
    };
    v.exports = b
  }, {}],
  5: [function(c, v, k) {
    function b(a, b) {
      f["E_" + a] = a;
      var c = new d(b),
        e = function(a) {
          return c.atT([0, 0], a)[1]
        };
      h[a] = e;
      n[a] = function() {
        return e
      }
    }

    function e(a) {
      for (var b = 1, d = 0, c = 0, h; 100 >= c; c++) h = a(c / 100), b = Math.min(b, h), d = Math.max(d, h);
      return [b, d]
    }

    function a(a) {
      var b = e(a);
      return function(d) {
        return (a(d) -
          b[0]) / (b[1] - b[0])
      }
    }
    var f = c("../constants.js"),
      d = c("../graphics/segments.js").CSeg,
      n = {};
    n[f.E_PATH] = function(a) {
      return function(b) {
        return a.pointAt(b)[1]
      }
    };
    n[f.E_FUNC] = function(a) {
      return a
    };
    n[f.E_CSEG] = function(a) {
      return function(b) {
        return a.atT([0, 0], b)[1]
      }
    };
    n[f.E_STDF] = function(a) {
      return t[a]
    };
    var h = {};
    b("default", [.25, .1, .25, 1, 1, 1]);
    b("in", [.42, 0, 1, 1, 1, 1]);
    b("out", [0, 0, .58, 1, 1, 1]);
    b("inout", [.42, 0, .58, 1, 1, 1]);
    b("sinein", [.47, 0, .745, .715, 1, 1]);
    b("sineout", [.39, .575, .565, 1, 1, 1]);
    b("sineinout", [.445,
      .05, .55, .95, 1, 1
    ]);
    b("quadin", [.55, .085, .68, .53, 1, 1]);
    b("quadout", [.25, .46, .45, .94, 1, 1]);
    b("quadinout", [.455, .03, .515, .955, 1, 1]);
    b("cubicin", [.55, .055, .675, .19, 1, 1]);
    b("cubicout", [.215, .61, .355, 1, 1, 1]);
    b("cubicinout", [.645, .045, .355, 1, 1, 1]);
    b("quartin", [.895, .03, .685, .22, 1, 1]);
    b("quartout", [.165, .84, .44, 1, 1, 1]);
    b("quartinout", [.77, 0, .175, 1, 1, 1]);
    b("quintin", [.755, .05, .855, .06, 1, 1]);
    b("quintout", [.23, 1, .32, 1, 1, 1]);
    b("quintinout", [.86, 0, .07, 1, 1, 1]);
    b("expoin", [.95, .05, .795, .035, 1, 1]);
    b("expoout", [.19,
      1, .22, 1, 1, 1
    ]);
    b("expoinout", [1, 0, 0, 1, 1, 1]);
    b("circin", [.6, .04, .98, .335, 1, 1]);
    b("circout", [.075, .82, .165, 1, 1, 1]);
    b("circinout", [.785, .135, .15, .86, 1, 1]);
    b("backin", [.6, -.28, .735, .045, 1, 1]);
    b("backout", [.175, .885, .32, 1.275, 1, 1]);
    b("backinout", [.68, -.55, .265, 1.55, 1, 1]);
    var t = [function(a) {
        return h["default"](a)
      }, function(a) {
        return h["in"](a)
      }, function(a) {
        return h.out(a)
      }, function(a) {
        return h.inout(a)
      }, function(a) {
        return a * a
      }, function(a) {
        return a * (2 - a)
      }, function(a) {
        if (.5 > a) return 2 * a * a;
        a = 2 * (a - .5);
        return -(a *
          (a - 2) - 1) / 2
      }, function(a) {
        return a * a * a
      }, function(a) {
        --a;
        return a * a * a + 1
      }, function(a) {
        if (.5 > a) return a *= 2, a * a * a / 2;
        a = 2 * (a - .5) - 1;
        return (a * a * a + 2) / 2
      }, function(a) {
        return 1 - Math.cos(Math.PI / 2 * a)
      }, function(a) {
        return Math.sin(Math.PI / 2 * a)
      }, function(a) {
        return -(Math.cos(Math.PI * a) - 1) / 2
      }, function(a) {
        return 0 >= a ? 0 : Math.pow(2, 10 * (a - 1))
      }, function(a) {
        return 1 <= a ? 1 : -Math.pow(2, -10 * a) + 1
      }, function(a) {
        return 0 >= a ? 0 : 1 <= a ? 1 : .5 > a ? Math.pow(2, 10 * (2 * a - 1)) / 2 : (-Math.pow(2, -20 * (a - .5)) + 2) / 2
      }, function(a) {
        return 1 - Math.sqrt(1 - a * a)
      },
      function(a) {
        --a;
        return Math.sqrt(1 - a * a)
      },
      function(a) {
        return 1 > (a *= 2) ? -(Math.sqrt(1 - a * a) - 1) / 2 : (Math.sqrt(1 - (a -= 2) * a) + 1) / 2
      },
      a(function(a) {
        return a * a * (2.70158 * a - 1.70158)
      }),
      function(a) {
        return function(b) {
          return (a(b) - -.2) / 1.4
        }
      }(function(a) {
        return --a * a * (2.70158 * a + 1.70158) + 1
      }), a(function(a) {
        var b = 1.70158;
        return 1 > (a *= 2) ? a * a * (((b *= 1.525) + 1) * a - b) / 2 : ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2) / 2
      }),
      function(a) {
        return 1 - t[23](1 - a)
      },
      a(function(a) {
        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ?
          7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
      }),
      function(a) {
        return .5 > a ? .5 * t[22](2 * a) : .5 * t[23](2 * a - 1) + .5
      },
      function(a) {
        return 0
      },
      function(a) {
        return 1
      },
      function(a) {
        return .5 > a ? 0 : 1
      }
    ];
    v.exports = n
  }, {
    "../constants.js": 12,
    "../graphics/segments.js": 20
  }],
  6: [function(c, v, k) {
    function b(q) {
      return f.roundTo(q, 9)
    }

    function e(q, a) {
      return b(q) > b(a) ? 1 : b(q) < b(a) ? -1 : 0
    }

    function a(q, a, g) {
      this.id = f.guid();
      this.name = q || "";
      this.type = w.ET_EMPTY;
      this.children = [];
      this.parent = null;
      this.level = 0;
      this.anim = null;
      this.disabled = !1;
      this.affectsChildren = this.visible = !0;
      this.$data = null;
      this.rendering = this.registered = this.shown = !1;
      this.initState();
      this.initVisuals();
      this.initTime();
      this.initEvents();
      this.$modifiers = {};
      this.$painters = {};
      g && this.modify(g);
      a && this.paint(a);
      this.__painting = this.__modifying = null;
      this.__modifiers_hash = {};
      this.__painters_hash = {};
      this.__detachQueue = [];
      this.__frameProcessors = [];
      this._initHandlers();
      var b = this,
        c = this.on;
      this.on = function(q, a) {
        return c.call(b, q, a)
      };
      this.addSysModifiers();
      this.addSysPainters();
      d.liveDebug && this.addDebugRender()
    }
    c("../log.js");
    var f = c("../utils.js"),
      d = c("../global_opts.js"),
      n = f.iter,
      h = f.is,
      t = c("engine"),
      w = c("../constants.js");
    k = c("../events.js");
    var r = k.provideEvents,
      z = k.EventState,
      y = c("../../vendor/transform.js"),
      x = c("../render.js"),
      A = c("../graphics/brush.js"),
      u = c("../graphics/color.js"),
      B = c("../graphics/bounds.js"),
      D = c("./modifier.js"),
      F = c("./painter.js"),
      p = c("./band.js"),
      m = c("../errors.js"),
      g = c("../loc.js").Errors;
    a.DEFAULT_PVT = [.5, .5];
    a.DEFAULT_REG = [0, 0];
    a._$ = function(q,
      g, b) {
      return new a(q, g, b)
    };
    a.NO_TIME = null;
    a.NO_BAND = null;
    a.DEFAULT_LEN = Infinity;
    a._customImporters = [];
    r(a, [w.X_MCLICK, w.X_MDCLICK, w.X_MUP, w.X_MDOWN, w.X_MMOVE, w.X_MOVER, w.X_MOUT, w.X_START, w.X_STOP]);
    a.prototype.is = function(q) {
      return this.type == q
    };
    a.prototype.initState = function() {
      this.y = this.x = 0;
      this.sy = this.sx = 1;
      this.angle = this.hy = this.hx = 0;
      this.alpha = 1;
      this.matrix ? this.matrix.reset() : this.matrix = new y;
      this._y = this._x = 0;
      this._hy = this._hx = this._sy = this._sx = 1;
      this._angle = 0;
      this._alpha = 1;
      this._matrix ?
        this._matrix.reset() : this._matrix = new y;
      this.$reg = a.DEFAULT_REG;
      this.$pivot = a.DEFAULT_PVT;
      return this
    };
    a.prototype.resetState = a.prototype.initState;
    a.prototype.initVisuals = function() {
      this.$video = this.$audio = this.$my_bounds = this.lastBoundsSavedAt = this.$bounds = this.$mpath = this.$mask = this.composite_op = this.$image = this.$text = this.$path = this.$shadow = this.$stroke = this.$fill = null;
      return this
    };
    a.prototype.resetVisuals = a.prototype.initVisuals;
    a.prototype.initTime = function() {
      this.mode = w.R_ONCE;
      this.nrep = Infinity;
      this.lband = [0, a.DEFAULT_LEN];
      this.gband = [0, a.DEFAULT_LEN];
      this.keys = {};
      this["switch"] = this.rt = this.t = this.key = this.tf = null;
      this.__resetTimeCache();
      this.__resetBandEvents();
      return this
    };
    a.prototype.resetTime = a.prototype.initTime;
    a.prototype.__resetTimeCache = function() {
      this.__lastJump = this.cur_rt = this.cur_t = null;
      this.__jumpLock = !1
    };
    a.prototype.__resetBandEvents = function() {
      this.__firedStop = this.__firedStart = !1;
      this.__lastRender = null
    };
    a.prototype.initEvents = function() {
      this.evts = {};
      this.__evt_st = new z;
      this.__evtCache = [];
      return this
    };
    a.prototype.resetEvents = a.prototype.initEvents;
    a.prototype.path = function(q) {
      return q ? (this.invalidate(), this.type = w.ET_PATH, this.$path = h.str(q) ? new Path(q) : q, this) : this.$path
    };
    a.prototype.text = function(q) {
      return q ? (this.invalidate(), this.type = w.ET_TEXT, this.$text = h.str(q) || h.arr(q) ? new Text(q) : q, this) : this.$text
    };
    a.prototype.image = function(q, a) {
      return q ? (this.invalidate(), this.type = w.ET_SHEET, this.$image = h.str(q) ? new Image(q, a) : q, this) : this.$image
    };
    a.prototype.fill =
      function(q) {
        return q ? (this.$fill = q instanceof A ? q : A.fill(q), this) : this.$fill
      };
    a.prototype.noFill = function() {
      this.$fill = u.TRANSPARENT;
      return this
    };
    a.prototype.stroke = function(q, a) {
      return q ? (q instanceof A ? (this.$stroke = q, h.defined(a) && (this.$stroke.width = a)) : this.$stroke = A.stroke(q, a), this) : this.$stroke
    };
    a.prototype.noStroke = function() {
      this.$stroke = null;
      return this
    };
    a.prototype.shadow = function(q, a, g, b) {
      return q ? (this.$shadow = q instanceof A ? q : A.shadow(q, a, g, b), this) : this.$shadow
    };
    a.prototype.modifiers =
      function(q, g, b) {
        b = b || D.ALL_MODIFIERS;
        g = g || 0;
        this.applyPrevState(this);
        this.cur_t = q;
        this.cur_rt = q / (this.lband[1] - this.lband[0]);
        h.num(this.__appliedAt) && (this._t = this.__appliedAt, this._rt = this.__appliedAt / (this.lband[1] - this.lband[0]));
        this.__loadEvents();
        for (var d = this.$modifiers, c, m, r, x, f = 0, e = b.length; f < e; f++) {
          this.__modifying = c = b[f];
          this.__mbefore(c);
          if (m = d[c])
            for (var p = 0, u = m.length; p < u; p++)
              if (r = m[p], x = this.__adaptModTime(r, q), null !== x && (!1 === x || !1 === r.apply(this, x[0], g, x[1]))) return this.__mafter(q,
                this.__modifying, !1), this.__modifying = null, !1;
          this.__mafter(q, c, !0)
        }
        this.matrix = a.getMatrixOf(this, this.matrix);
        this.__modifying = null;
        this.__appliedAt = q;
        this.resetEvents();
        return !0
      };
    a.prototype.painters = function(q, a) {
      for (var g = a || F.ALL_PAINTERS, b = this.$painters, d, c, m, h = 0, r = g.length; h < r; h++) {
        this.__painting = d = g[h];
        this.__pbefore(q, d);
        if (c = b[d])
          for (var x = 0, f = c.length; x < f; x++) m = c[x], m.apply(this, q);
        this.__pafter(q, d)
      }
      this.__painting = null
    };
    a.prototype.forAllModifiers = function(q) {
      for (var a = D.ALL_MODIFIERS,
          g = this.$modifiers, b, d, c = 0, m = a.length; c < m; c++)
        if (b = a[c], d = g[b])
          for (var h = 0, r = d.length; h < r; h++) q(d[h], b)
    };
    a.prototype.forAllPainters = function(q) {
      for (var a = F.ALL_PAINTERS, g = this.$painters, b, d, c = 0, m = a.length; c < m; c++)
        if (b = a[c], d = g[b])
          for (var h = 0, r = d.length; h < r; h++) q(d[h], b)
    };
    a.prototype.draw = a.prototype.painters;
    a.prototype.transform = function(q) {
      q.globalAlpha *= this.alpha;
      this.matrix.apply(q);
      return this.matrix
    };
    a.prototype.invTransform = function(q) {
      var g = a.getIMatrixOf(this);
      q.globalAlpha *= this.alpha;
      g.apply(q);
      return g
    };
    a.prototype.render = function(q, g, b) {
      if (!this.disabled) {
        this.rendering = !0;
        var d = !1,
          c = this.ltime(g);
        if (c !== a.NO_TIME) {
          this.cur_rt = this.cur_t = null;
          d = this.__preRender(g, c, q);
          this.anim && this.anim.__informEnabled && this.inform(g, c);
          d && (d = this.fits(c) && this.modifiers(c, b) && this.visible);
          if (d) {
            q.save();
            g = this.affectsChildren ? this.gtime(c) : g;
            var m = this.$mask,
              h = !1,
              r, x;
            m && (r = m.ltime(c), x = m.gtime(r), h = m.fits(r) && m.modifiers(r, b) && m.visible);
            if (h) {
              m.ensureHasMaskCanvas();
              var c = m.__maskCvs,
                f = m.__maskCtx,
                h = m.__backCvs,
                e = m.__backCtx,
                p = m.bounds(r).toPoints(),
                u = Number.MAX_VALUE;
              r = Number.MAX_VALUE;
              for (var y = Number.MIN_VALUE, z = Number.MIN_VALUE, n, A = 0, w = p.length; A < w; A++) n = p[A], n.x < u && (u = n.x), n.y < r && (r = n.y), n.x > y && (y = n.x), n.y > z && (z = n.y);
              p = t.PX_RATIO;
              n = u;
              A = r;
              u = Math.round(y - u);
              r = Math.round(z - r);
              z = this._maskCvsSize || t.getCanvasSize(c);
              z[0] < u || z[1] < r ? (this._maskCvsSize = t.setCanvasSize(c, u, r), t.setCanvasSize(h, u, r)) : this._maskCvsSize = z;
              e.clearRect(0, 0, u * p, r * p);
              f.clearRect(0, 0, u * p, r * p);
              e.save();
              f.save();
              e.setTransform(p,
                0, 0, p, -n * p, -A * p);
              f.setTransform(p, 0, 0, p, -n * p, -A * p);
              this.transform(e);
              this.painters(e);
              this.each(function(q) {
                q.render(e, g, b)
              });
              m.transform(f);
              m.painters(f);
              m.each(function(q) {
                q.render(f, x, b)
              });
              e.globalCompositeOperation = "destination-in";
              e.setTransform(1, 0, 0, 1, 0, 0);
              e.drawImage(c, 0, 0);
              q.drawImage(h, 0, 0, Math.floor(u * p), Math.floor(r * p), n, A, u, r);
              f.restore();
              e.restore()
            } else this.transform(q), this.painters(q), this.each(function(a) {
              a.render(q, g, b)
            });
            q.restore()
          }
          this.shown = d;
          this.__postRender();
          this.rendering = !1;
          return this
        }
      }
    };
    a.prototype.pivot = function(q, a) {
      this.$pivot = [q, a];
      return this
    };
    a.prototype.reg = function(q, a) {
      this.$reg = [q, a];
      return this
    };
    a.prototype.move = function(q, a) {
      this.x = q;
      this.y = a;
      return this
    };
    a.prototype.rotate = function(q) {
      this.angle = q;
      return this
    };
    a.prototype.rotateInDeg = function(q) {
      return this.rotate(q / 180 * Math.PI)
    };
    a.prototype.scale = function(q, a) {
      this.sx = q;
      this.sy = a;
      return this
    };
    a.prototype.skew = function(q, a) {
      this.hx = q;
      this.hy = a;
      return this
    };
    a.prototype.repeat = function(q, a) {
      this.mode =
        q;
      this.nrep = h.num(a) ? a : Infinity;
      return this
    };
    a.prototype.once = function() {
      this.mode = w.R_ONCE;
      this.nrep = Infinity;
      return this
    };
    a.prototype.stay = function() {
      this.mode = w.R_STAY;
      this.nrep = Infinity;
      return this
    };
    a.prototype.loop = function(q) {
      this.mode = w.R_LOOP;
      this.nrep = h.num(q) ? q : Infinity;
      return this
    };
    a.prototype.bounce = function(q) {
      this.mode = w.R_BOUNCE;
      this.nrep = h.num(q) ? q : Infinity;
      return this
    };
    a.prototype.jump = function(q) {
      h.defined(this.pausedAt) && (this.pausedAt = q);
      this.t = q;
      return this
    };
    a.prototype.jumpTo =
      function(q) {
        if (q = h.str(selector) ? this.find(selector) : selector) return this.anim ? this.anim.jump(q.gband[0]) : this.jump(q.lband[0]), this
      };
    a.prototype.play = function() {
      if (this.paused) return this.paused = !1, this.t = null, this.pausedAt = void 0, this.__m_stop && this.removeModifier(this.__m_stop), this
    };
    a.prototype.stop = function() {
      if (this.paused) return this;
      this.paused = !0;
      this.__m_stop = new D(function(q) {
        this.paused && (h.defined(this.pausedAt) ? this.t = this.pausedAt : this.pausedAt = q)
      });
      this.modify(this.__m_stop);
      return this
    };
    a.prototype.at = function(q, a) {
      return this.modify((new D(a)).time(q))
    };
    a.prototype.modify = function(q, a) {
      h.arr(q) || (a = q, q = null);
      if (!a) throw m.element("No modifier was passed to .modify() method", this);
      if (!h.modifier(a) && h.fun(a)) a = new D(a, w.MOD_USER);
      else if (!h.modifier(a)) throw m.element("Modifier should be either a function or a Modifier instance", this);
      if (!a.type) throw m.element("Modifier should have a type defined", this);
      q && (a.$band = q);
      if (a.__applied_to && a.__applied_to[this.id]) throw m.element("This modifier is already applied to this Element",
        this);
      this.$modifiers[a.type] || (this.$modifiers[a.type] = []);
      this.$modifiers[a.type].push(a);
      this.__modifiers_hash[a.id] = a;
      a.__applied_to || (a.__applied_to = {});
      a.__applied_to[this.id] = this.$modifiers[a.type].length;
      return this
    };
    a.prototype.removeModifier = function(a) {
      if (!h.modifier(a)) throw m.element("Please pass Modifier instance to removeModifier", this);
      if (!this.__modifiers_hash[a.id]) throw m.element("Modifier wasn't applied to this element", this);
      if (!a.__applied_to || !a.__applied_to[this.id]) throw m.element(g.A.MODIFIER_NOT_ATTACHED,
        this);
      f.removeElement(this.__modifiers_hash, a.id);
      f.removeElement(this.$modifiers[a.type], a);
      f.removeElement(a.__applied_to, this.id);
      return this
    };
    a.prototype.paint = function(a) {
      if (!a) throw m.element("No painter was passed to .paint() method", this);
      if (!h.painter(a) && h.fun(a)) a = new F(a, w.MOD_USER);
      else if (!h.painter(a)) throw m.element("Painter should be either a function or a Painter instance", this);
      if (!a.type) throw m.element("Painter should have a type defined", this);
      if (a.__applied_to && a.__applied_to[this.id]) throw m.element("This painter is already applied to this Element",
        this);
      this.$painters[a.type] || (this.$painters[a.type] = []);
      this.$painters[a.type].push(a);
      this.__painters_hash[a.id] = a;
      a.__applied_to || (a.__applied_to = {});
      a.__applied_to[this.id] = this.$painters[a.type].length;
      return this
    };
    a.prototype.removePainter = function(a) {
      if (!h.painter(a)) throw m.element("Please pass Painter instance to removePainter", this);
      if (!this.__painters_hash[a.id]) throw m.element("Painter wasn't applied to this element", this);
      if (!a.__applied_to || !a.__applied_to[this.id]) throw m.element(g.A.PAINTER_NOT_ATTACHED,
        this);
      f.removeElement(this.__painters_hash, a.id);
      f.removeElement(this.$painters[a.type], a);
      f.removeElement(a.__applied_to, this.id);
      return this
    };
    a.prototype.tween = function(a) {
      if (!h.tween(a)) throw m.element("Please pass Tween instance to .tween() method", this);
      return this.modify(a)
    };
    a.prototype.removeTween = function(a) {
      if (!h.tween(a)) throw m.element("Please pass Tween instance to .removeTween() method", this);
      return this.removeModifier(a)
    };
    a.prototype.add = function(q, g, b) {
      if (g) q = new a(q, g), b && q.changeTransform(b),
        this._addChild(q);
      else if (h.arr(q))
        for (b = 0, q = elms.length; b < q; b++) this._addChild(elms[b]);
      else this._addChild(q);
      this.invalidate();
      return this
    };
    a.prototype.remove = function(a) {
      if (!a) throw m.element(g.A.NO_ELEMENT_TO_REMOVE);
      if (0 === this.__safeDetach(a)) throw m.element(g.A.NO_ELEMENT);
      this.invalidate();
      return this
    };
    a.prototype._unbind = function() {
      if (this.parent.__unsafeToRemove || this.__unsafeToRemove) throw m.element(g.A.UNSAFE_TO_REMOVE);
      this.parent = null;
      this.anim && this.anim._unregister(this)
    };
    a.prototype.detach =
      function() {
        if (0 === this.parent.__safeDetach(this)) throw m.element(g.A.ELEMENT_NOT_ATTACHED, this);
      };
    a.prototype.makeBandFit = function() {
      var a = this.findWrapBand();
      this.gband = a;
      this.lband[1] = a[1] - a[0]
    };
    a.prototype.fits = function(q) {
      return 0 > q || q === a.NO_TIME ? !1 : 0 >= e(q, this.lband[1] - this.lband[0])
    };
    a.prototype.gtime = function(a) {
      return this.gband[0] + a
    };
    a.prototype.ltime = function(q) {
      return this.__checkJump(a.checkRepeatMode(this.__checkSwitcher(q), this.gband, this.mode, this.nrep))
    };
    a.prototype.inform = function(a,
      g) {
      var b = this.lband[1] - this.lband[0];
      0 > e(g, 0) || (h.defined(this.__lastRender) ? h.defined(this.__lastRender) && 0 < e(g, b) ? (this.__firedStop || (this.modifiers(b, b - this.__lastRender), this.fire(w.X_STOP, g, b), this.traverse(function(g) {
        g.inform(g.ltime(a), a)
      }), this.__firedStop = !0), this.__lastRender = void 0) : this.__lastRender = g : (this.__lastRender = g, this.__firedStart || (this.fire(w.X_START, g, b), this.__firedStart = !0)))
    };
    a.prototype.band = function(a, g) {
      if (!h.defined(a)) return this.lband;
      h.arr(a) && (a = a[0], g = a[1]);
      h.defined(g) ||
        (g = Infinity);
      this.lband = [a, g];
      if (this.parent) {
        var b = this.parent;
        this.gband = [b.gband[0] + a, b.gband[0] + g]
      }
      return this
    };
    a.prototype.duration = function(a) {
      if (!h.defined(a)) return this.lband[1] - this.lband[0];
      this.gband = [this.gband[0], this.gband[0] + a];
      this.lband = [this.lband[0], this.lband[0] + a];
      return this
    };
    a.prototype._max_tpos = function() {
      return 0 <= this.gband[1] ? this.gband[1] : 0
    };
    a.prototype.m_on = function(a, g) {
      this.modify(new D(function(b) {
        if (this.__evt_st.check(a))
          for (var d = this.evts[a], c = 0, m = d.length; c <
            m; c++)
            if (!1 === g.call(this, d[c], b)) return !1
      }, w.MOD_EVENT))
    };
    a.prototype.findWrapBand = function() {
      if (0 === this.children.length) return this.gband;
      var a = [Infinity, 0];
      this.each(function(g) {
        a = p.expand(a, g.gband)
      });
      return Infinity !== a[0] ? a : null
    };
    a.prototype.dispose = function() {
      this.disposeHandlers();
      this.disposeVisuals();
      this.each(function(a) {
        a.dispose()
      })
    };
    a.prototype.disposeVisuals = function() {
      this.$path && this.$path.dispose();
      this.$text && this.$text.dispose();
      this.$image && this.$image.dispose();
      this.$video &&
        this.$video.dispose();
      this.$mpath && this.$mpath.dispose()
    };
    a.prototype.reset = function() {
      this.resetEvents();
      this.__resetTimeCache();
      this.__resetBandEvents();
      var a = this;
      this.forAllModifiers(function(g) {
        g.__wasCalled && (g.__wasCalled[a.id] = !1);
        h.defined(g.__wasCalledAt) && (g.__wasCalledAt[a.id] = -1)
      });
      this.each(function(a) {
        a.reset()
      })
    };
    a.prototype.each = function(a) {
      var g = this.children;
      this.__unsafeToRemove = !0;
      for (var b = 0, d = g.length; b < d && !1 !== a(g[b]); b++);
      this.__unsafeToRemove = !1;
      return this
    };
    a.prototype.reverseEach =
      function(a) {
        var g = this.children;
        this.__unsafeToRemove = !0;
        for (var b = g.length; b-- && !1 !== a(g[b]););
        this.__unsafeToRemove = !1;
        return this
      };
    a.prototype.firstParent = function(a) {
      if (a(this)) return this;
      for (var g = this.parent; g && !a(g);) g = g.parent;
      return g
    };
    a.prototype.traverse = function(a) {
      var g = this.children;
      this.__unsafeToRemove = !0;
      for (var b = 0, d = g.length; b < d; b++) {
        var c = g[b];
        if (!1 === a(c)) break;
        c.traverse(a)
      }
      this.__unsafeToRemove = !1;
      return this
    };
    a.prototype.iter = function(a, g) {
      this.__unsafeToRemove = !0;
      n(this.children).each(a,
        g);
      this.__unsafeToRemove = !1;
      return this
    };
    a.prototype.hasChildren = function() {
      return 0 < this.children.length
    };
    a.prototype.deepIterateChildren = function(a, g) {
      this.__unsafeToRemove = !0;
      n(this.children).each(function(b) {
        b.deepIterateChildren(a, g);
        return a(b)
      }, g);
      this.__unsafeToRemove = !1
    };
    a.prototype.__performDetach = function() {
      var a = this.children;
      n(this.__detachQueue).each(function(g) {
        0 <= (idx = a.indexOf(g)) && (a.splice(idx, 1), g._unbind())
      });
      this.__detachQueue = []
    };
    a.prototype.clear = function() {
      if (this.__unsafeToRemove) throw m.element(g.A.UNSAFE_TO_REMOVE,
        this);
      if (this.rendering) this.__detachQueue = this.__detachQueue.concat(this.children);
      else {
        var a = this.children;
        this.children = [];
        n(a).each(function(a) {
          a._unbind()
        })
      }
      return this
    };
    a.prototype.lock = function() {
      this.__jumpLock = !0;
      this.__state = this.extractState();
      this.__pstate = this.extractPrevState()
    };
    a.prototype.unlock = function(a) {
      a = a ? this.extractState() : void 0;
      this.applyState(this.__state);
      this.applyPrevState(this.__pstate);
      this.__pstate = this.__state = null;
      this.__jumpLock = !1;
      return a
    };
    a.prototype.extractState =
      function() {
        return {
          x: this.x,
          y: this.y,
          sx: this.sx,
          sy: this.sy,
          hx: this.hx,
          hy: this.hy,
          angle: this.angle,
          alpha: this.alpha,
          t: this.t,
          rt: this.rt,
          key: this.key
        }
      };
    a.prototype.extractPrevState = function() {
      return {
        x: this._x,
        y: this._y,
        sx: this._sx,
        sy: this._sy,
        hx: this._hx,
        hy: this._hy,
        angle: this._angle,
        alpha: this._alpha,
        t: this._t,
        rt: this._rt,
        key: this._key
      }
    };
    a.prototype.applyState = function(a) {
      this.x = a.x;
      this.y = a.y;
      this.sx = a.sx;
      this.sy = a.sy;
      this.hx = a.hx;
      this.hy = a.hy;
      this.angle = a.angle;
      this.alpha = a.alpha;
      this.t = a.t;
      this.rt =
        a.rt;
      this.key = a.key
    };
    a.prototype.applyPrevState = function(a) {
      this._x = a.x;
      this._y = a.y;
      this._sx = a.sx;
      this._sy = a.sy;
      this._hx = a.hx;
      this._hy = a.hy;
      this._angle = a.angle;
      this._alpha = a.alpha;
      this._t = a.t;
      this._rt = a.rt;
      this._key = a.key
    };
    a.prototype.stateAt = function(g) {
      this.lock();
      return this.unlock(this.modifiers(g, 0, a.NOEVT_MODIFIERS))
    };
    a.prototype.pos = function(a, g) {
      return h.defined(a) ? this.move(a, g) : {
        x: this.x,
        y: this.y
      }
    };
    a.prototype.offset = function() {
      for (var a = 0, g = 0, b = this.parent; b;) a += b.x, g += b.y, b = b.parent;
      return [a,
        g
      ]
    };
    a.prototype.invalidate = function() {
      this.lastBoundsSavedAt = this.$bounds = this.$my_bounds = null;
      this.parent && this.parent.invalidate();
      return this
    };
    a.prototype.invalidateVisuals = function() {
      var a = this.$path || this.$text || this.$image || this.$video;
      a && a.invalidate()
    };
    a.prototype.bounds = function(a) {
      if (h.defined(this.lastBoundsSavedAt) && 0 == e(this.lastBoundsSavedAt, a)) return this.$bounds;
      var g = this.myBounds();
      this.children.length && (g = g.clone(), this.each(function(b) {
        g.add(b.bounds(a))
      }));
      g = this.adaptBounds(g);
      this.lastBoundsSavedAt = a;
      return this.$bounds = g
    };
    a.prototype.myBounds = function() {
      if (this.$my_bounds) return this.$my_bounds;
      var a = this.$path || this.$text || this.$image || this.$video;
      return a ? this.$my_bounds = a.bounds() : this.$my_bounds = B.NONE
    };
    a.prototype.inside = function(a, g, b) {
      if (!g || g(this)) {
        var d = this.adapt(a.x, a.y);
        if (this.myBounds().inside(d) && (a = this.$path || this.$text || this.$image || this.$video) && a.inside(d)) return b(this, d);
        this.reverseEach(function(a) {
          return a.inside(d, g, b)
        })
      }
    };
    a.prototype.adapt =
      function(a, g) {
        return this.matrix.transformPointInverse(a, g)
      };
    a.prototype.adaptBounds = function(a) {
      var g = this.matrix,
        b = g.transformPoint(a.x, a.y),
        d = g.transformPoint(a.x + a.width, a.y),
        c = g.transformPoint(a.x + a.width, a.y + a.height);
      a = g.transformPoint(a.x, a.y + a.height);
      var g = Math.min(b.x, d.x, a.x, c.x),
        m = Math.min(b.y, d.y, a.y, c.y);
      return new B(g, m, Math.max(b.x, d.x, a.x, c.x) - g, Math.max(b.y, d.y, a.y, c.y) - m)
    };
    a.prototype.inverseAdaptBounds = function(a) {
      var g = this.matrix,
        b = g.transformPointInverse(a.x, a.y),
        d = g.transformPointInverse(a.x +
          a.width, a.y),
        c = g.transformPointInverse(a.x + a.width, a.y + a.height);
      a = g.transformPointInverse(a.x, a.y + a.height);
      var g = Math.min(b.x, d.x, a.x, c.x),
        m = Math.min(b.y, d.y, a.y, c.y);
      return new B(g, m, Math.max(b.x, d.x, a.x, c.x) - g, Math.max(b.y, d.y, a.y, c.y) - m)
    };
    a.prototype.isEmpty = function() {
      var a = this.myBounds();
      return 0 === a.width && 0 === a.height
    };
    a.prototype.applyVisuals = function(a) {
      var g = this.$path || this.$text || this.$image || this.$video;
      g && g.apply(a, this.$fill, this.$stroke, this.$shadow)
    };
    a.prototype.applyBrushes = function(a) {
      this.$shadow &&
        this.$shadow.apply(a);
      this.$fill && (this.$fill.apply(a), a.fill());
      this.$shadow && A.clearShadow(a);
      this.$stroke && (this.$stroke.apply(a), a.stroke())
    };
    a.prototype.applyAComp = function(a) {
      this.composite_op && (a.globalCompositeOperation = w.AC_NAMES[this.composite_op])
    };
    a.prototype.mask = function(a) {
      if (!a) return this.$mask;
      this.$mask = a;
      return this
    };
    a.prototype.noMask = function() {
      this.$mask = null;
      return this
    };
    a.prototype.ensureHasMaskCanvas = function(a) {
      this.__maskCvs && this.__backCvs || (this.__maskCvs = t.createCanvas(1,
        1), this.__maskCtx = t.getContext(this.__maskCvs, "2d"), this.__backCvs = t.createCanvas(1, 1), this.__backCtx = t.getContext(this.__backCvs, "2d"))
    };
    a.prototype.removeMaskCanvases = function() {
      this.__maskCvs && t.disposeElement(this.__maskCvs);
      this.__backCvs && t.disposeElement(this.__backCvs);
      this.__backCtx = this.__maskCtx = null
    };
    a.prototype.data = function(a) {
      if (!h.defined(a)) return this.$data;
      this.$data = a;
      return this
    };
    a.prototype.toString = function() {
      var a = ["[ Element "];
      a.push("'" + (this.name || this.id) + "' ");
      a.push("]");
      return a.join("")
    };
    a.prototype.find = function(a) {
      return this.anim.find(a, this)
    };
    a.prototype.findAll = function(a) {
      return this.anim.findAll(a, this)
    };
    a.prototype.clone = function() {
      var g = new a;
      g.name = this.name;
      g.children = [].concat(this.children);
      g.$modifiers = [].concat(this.$modifiers);
      g.$painters = [].concat(this.$painters);
      g.level = this.level;
      a.transferState(this, g);
      a.transferVisuals(this, g);
      a.transferTime(this, g);
      g.__u_data = this.__u_data;
      return g
    };
    a.prototype.shallow = function() {
      var a = this.clone();
      a.children = [];
      for (var g = this.children, b = a.children, d = 0, c = g.length; d < c; d++) {
        var m = g[d].shallow();
        m.parent = a;
        b.push(m)
      }
      a.$modifiers = {};
      this.forAllModifiers(function(g, b) {
        a.modify(g)
      });
      a.$painters = {};
      this.forAllPainters(function(g, b) {
        a.paint(g)
      });
      a.__u_data = f.obj_clone(this.__u_data);
      return a
    };
    a.prototype.asClip = function(a, g, b) {
      if (g != w.R_ONCE) return this.clip_band = a, this.clip_mode = g, this.clip_nrep = b, this
    };
    a.prototype._addChild = function(a) {
      a.parent = this;
      a.level = this.level + 1;
      this.children.push(a);
      this.anim && this.anim._register(a);
      p.recalc(this)
    };
    a.prototype._stateStr = function() {
      return "x: " + this.x + " y: " + this.y + "\nsx: " + this.sx + " sy: " + this.sy + "\nangle: " + this.angle + " alpha: " + this.alpha + "\np: " + this.p + " t: " + this.t + " key: " + this.key + "\n"
    };
    a.prototype.__mbefore = function(a, g) {};
    a.prototype.__mafter = function(a, g, b) {};
    a.prototype.__adaptModTime = function(g, d) {
      var c = this.lband[1] - this.lband[0],
        m = g.$easing,
        r = g.$band || g.$time,
        x = g.$relative,
        f = g.is_tween;
      if (this.clip_band && (d = a.checkRepeatMode(d, this.clip_band, this.clip_mode || w.R_ONCE,
          this.clip_nrep), 0 > d)) return !1;
      if (null === r) r = d;
      else if (h.arr(r)) {
        if (x && (r = [r[0] * c, r[1] * c]), c = r[1] - r[0], r = d - r[0], 0 > e(r, 0) || 0 < e(r, c)) return null
      } else {
        if (h.num(r)) {
          if (g.__wasCalled && g.__wasCalled[this.id] || !(0 <= e(d, x ? r * c : r))) return null;
          g.__wasCalled || (g.__wasCalled = {});
          g.__wasCalledAt || (g.__wasCalledAt = {});
          g.__wasCalled[this.id] = !0;
          g.__wasCalledAt[this.id] = d
        }
        r = d
      }
      x || f ? h.finite(c) && (r = b(r) / b(c), c = b(c)) : (r = b(r), c = b(c));
      return m ? [m(r, c), c] : [r, c]
    };
    a.prototype.__pbefore = function(a, g) {};
    a.prototype.__pafter =
      function(a, g) {};
    a.prototype.__checkJump = function(g) {
      if (g === a.NO_TIME) return a.NO_TIME;
      if (this.tf) return this.tf(g);
      var b, d = this.lband[1] - this.lband[0];
      b = h.defined(this.p) ? this.p : null;
      b = null === b && null !== this.t ? this.t : b;
      b = null === b && null !== this.rt && h.finite(d) ? this.rt * d : b;
      b = null === b && h.defined(this.key) ? this.keys[this.key] : b;
      if (null !== b) {
        if (0 > b || b > d) throw m.element("Failed to calculate jump", this);
        if (!this.__jumpLock) return this.__lastJump = [g, b], this.key = this.t = this.p = null, b
      }
      b = null !== b ? b : g;
      return h.defined(this.__lastJump) ?
        (h.finite(this.__lastJump[1]) ? this.__lastJump[1] : 0) + (b - this.__lastJump[0]) : null !== b ? b : a.NO_TIME
    };
    a.prototype.__checkSwitcher = function(g) {
      if (!this.parent || !this.parent["switch"]) return g;
      var b = this.parent;
      return b["switch"] === w.SWITCH_OFF ? a.NO_TIME : b["switch"] === this.name && b.switch_band ? g === a.NO_TIME ? a.NO_TIME : g - b.switch_band[0] : a.NO_TIME
    };
    a.prototype.filterEvent = function(a, g) {
      if (a != w.X_START && a != w.X_STOP)
        if (this.shown) this.__saveEvt(a, g);
        else return a === w.X_STOP && this.__resetBandEvents(), !1;
      return !0
    };
    a.prototype.__saveEvt = function(a, g) {
      this.__evtCache.push([a, g])
    };
    a.prototype.__loadEvents = function() {
      var a = this.__evtCache,
        g = a.length;
      this.resetEvents();
      if (0 < g) {
        for (var b, d, c, m = 0; m < g; m++) b = a[m], d = b[0], this.__evt_st.save(d), c = this.evts, c[d] || (c[d] = []), c[d].push(b[1]);
        this.__evtCache = []
      }
    };
    a.prototype.__preRender = function(a, g, b) {
      for (var d = this.__frameProcessors, c = 0, m = d.length; c < m; c++)
        if (!1 === d[c].call(this, a, g, b)) return !1;
      return !0
    };
    a.prototype.__safeDetach = function(a, b) {
      var d = -1,
        c = b || 0,
        r = this.children;
      if (0 <= (d = r.indexOf(a))) {
        if (this.rendering || a.rendering) this.__detachQueue.push(a);
        else {
          if (this.__unsafeToRemove) throw m.element(g.A.UNSAFE_TO_REMOVE, this);
          a._unbind();
          r.splice(d, 1)
        }
        return 1
      }
      this.each(function(g) {
        c += g.__safeDetach(a, c)
      });
      return c
    };
    a.prototype.__postRender = function() {
      this.__performDetach()
    };
    a.prototype._hasRemoteResources = function(a, g) {
      return g.imagesEnabled && this.$image || this.is(w.ET_AUDIO) && g.audioEnabled || this.is(w.ET_VIDEO) && g.videoEnabled ? !0 : this.$mask ? this.$mask._hasRemoteResources(a,
        g) : !1
    };
    a.prototype._collectRemoteResources = function(a, g) {
      var b = [];
      g.imagesEnabled && this.$image && b.push(this.$image.src);
      g.audioEnabled && this.is(w.ET_AUDIO) && b.push(this.$audio.url);
      g.videoEnabled && this.is(w.ET_VIDEO) && b.push(this.$video.url);
      this.$mask && (b = b.concat(this.$mask._collectRemoteResources(a, g)));
      return b
    };
    a.prototype._loadRemoteResources = function(a, g) {
      g.imagesEnabled && this.$image && this.$image.load(this.id, g);
      this.is(w.ET_AUDIO) && g.audioEnabled && this.$audio.load(this.id, g);
      this.is(w.ET_VIDEO) &&
        g.videoEnabled && this.$video.load(this.id, g);
      this.$mask && this.$mask._loadRemoteResources(this, g)
    };
    a.mergeStates = function(a, g, b) {
      b.x = a.x + g.x;
      b.y = a.y + g.y;
      b.sx = a.sx * g.sx;
      b.sy = a.sy * g.sy;
      b.hx = a.hx + g.hx;
      b.hy = a.hy + g.hy;
      b.angle = a.angle + g.angle;
      b.alpha = a.alpha + g.alpha
    };
    a.transferState = function(a, g) {
      g.x = a.x;
      g.y = a.y;
      g.sx = a.sx;
      g.sy = a.sy;
      g.hx = a.hx;
      g.hy = a.hy;
      g.angle = a.angle;
      g.alpha = a.alpha;
      g.$reg = [].concat(a.$reg);
      g.$pivot = [].concat(a.$pivot)
    };
    a.transferVisuals = function(a, g) {
      g.$fill = A.clone(a.$fill);
      g.$stroke = A.clone(a.$stroke);
      g.$shadow = A.clone(a.$shadow);
      g.$path = a.$path ? a.$path.clone() : null;
      g.$text = a.$text ? a.$text.clone() : null;
      g.$image = a.$image ? a.$image.clone() : null;
      g.$audio = a.$audio ? a.$audio.clone() : null;
      g.$video = a.$video ? a.$video.clone() : null;
      g.$mask = a.$mask ? a.$mask : null;
      g.$mpath = a.$mpath ? a.$mpath.clone() : null;
      g.composite_op = a.composite_op
    };
    a.transferTime = function(a, g) {
      g.mode = a.mode;
      g.nrep = a.nrep;
      g.lband = [].concat(a.lband);
      g.gband = [].concat(a.gband);
      g.keys = [].concat(a.keys);
      g.tf = a.tf
    };
    a.getMatrixOf = function(a, g) {
      var b =
        g ? (g.reset(), g) : new y,
        d = a.getTranslate();
      b.translate(d.x, d.y);
      b.rotate(a.getRotate());
      b.shear(a.hx, a.hy);
      b.scale(a.sx, a.sy);
      b.translate(-a.$reg[0], -a.$reg[1]);
      d = a.$pivot;
      if (0 === d[0] && 0 === d[1]) return b;
      var c = a.myBounds();
      if (!c || c === B.NONE) return b;
      b.translate(-(d[0] * (c.width || 0)), -(d[1] * (c.height || 0)));
      return b
    };
    a.prototype.getTranslate = function() {
      if (this.parent && this.parent.layer2Bone) {
        for (var a = this.bonePath(), g = {
            x: 0,
            y: 0
          }, b = 0, d = null, c = 0; c < a.length; c++) d = a[c], b += d.bonerotate, g.x += d.bonelength * Math.cos(b),
          g.y += d.bonelength * Math.sin(b);
        a = d ? this.parent.children[a[0].$from] : this;
        g.x += a.x;
        g.y += a.y;
        return g
      }
      return this
    };
    a.prototype.getRotate = function() {
      if (this.parent && this.parent.layer2Bone) {
        this.$bonePath = this.$bonePath || a.bonePath(this);
        for (var g = 0, b = this.$bonePath.length; b--;) g += this.$bonePath[b].bonerotate;
        return g + this.angle
      }
      return this.angle
    };
    a.prototype.bonePath = function() {
      if (!this.$bonePath) {
        for (var a = this.parent.layer2Bone, g = [], b = a[this.parent.children.indexOf(this)]; b;) g.push(b), b = a[b.$from];
        this.$bonePath = g.reverse()
      }
      return this.$bonePath
    };
    a.getIMatrixOf = function(g, b) {
      var d = a.getMatrixOf(g, b);
      d.invert();
      return d
    };
    a.checkRepeatMode = function(g, b, d, c) {
      if (g === a.NO_TIME) return a.NO_TIME;
      if (!h.finite(b[1])) return g - b[0];
      var m, r;
      switch (d) {
        case w.R_ONCE:
          return g - b[0];
        case w.R_STAY:
          return 0 >= e(g, b[1]) ? g - b[0] : b[1] - b[0];
        case w.R_LOOP:
          d = b[1] - b[0];
          if (0 > d) return -1;
          m = (g - b[0]) / d;
          r = Math.floor(m);
          return 0 > r || m > c ? -1 : g = g - b[0] - r * d;
        case w.R_BOUNCE:
          d = b[1] - b[0];
          if (0 > d) return -1;
          m = (g - b[0]) / d;
          r = Math.floor(m);
          if (0 > r || m > c) return -1;
          g = g - b[0] - r * d;
          return 0 === r % 2 ? g : d - g
      }
    };
    a.prototype.addSysModifiers = function() {};
    a.prototype.addSysPainters = function() {
      this.paint(x.p_applyAComp);
      this.paint(x.p_drawVisuals)
    };
    a.prototype.addDebugRender = function() {
      this.paint(x.p_drawPivot);
      this.paint(x.p_drawBounds);
      this.paint(x.p_drawReg);
      this.paint(x.p_drawName);
      this.paint(x.p_drawMPath)
    };
    v.exports = a
  }, {
    "../../vendor/transform.js": 43,
    "../constants.js": 12,
    "../errors.js": 13,
    "../events.js": 14,
    "../global_opts.js": 15,
    "../graphics/bounds.js": 16,
    "../graphics/brush.js": 17,
    "../graphics/color.js": 18,
    "../loc.js": 27,
    "../log.js": 28,
    "../render.js": 34,
    "../utils.js": 39,
    "./band.js": 4,
    "./modifier.js": 7,
    "./painter.js": 8,
    engine: 40
  }],
  7: [function(c, v, k) {
    function b(a, b) {
      this.id = f();
      this.type = b || e.MOD_USER;
      this.func = a;
      this.$easing = this.$data = this.$time = this.$band = null;
      this.$relative = !1;
      this.is_tween = b == e.MOD_TWEEN
    }
    var e = c("../constants.js");
    k = c("../utils.js");
    var a = k.is,
      f = k.guid,
      d = c("./easing.js");
    b.ORDER = [e.MOD_SYSTEM, e.MOD_TWEEN, e.MOD_USER, e.MOD_EVENT];
    b.FIRST_MOD = e.MOD_SYSTEM;
    b.LAST_MOD = e.MOD_EVENT;
    b.ALL_MODIFIERS = [e.MOD_SYSTEM, e.MOD_TWEEN, e.MOD_USER, e.MOD_EVENT];
    b.NOEVT_MODIFIERS = [e.MOD_SYSTEM, e.MOD_TWEEN, e.MOD_USER];
    b.prototype.band = function(b, d) {
      if (!a.defined(b)) return this.$band;
      a.arr(b) && (d = b[1], b = b[0]);
      a.defined(d) || (d = Infinity);
      this.$band = [b, d];
      return this
    };
    b.prototype.start = function(b) {
      if (!a.defined(b)) return this.$band[0];
      this.$band = this.$band ? [b, this.$band[1]] : [b, Infinity];
      return this
    };
    b.prototype.stop = function(b) {
      if (!a.defined(b)) return this.$band[1];
      this.$band = this.$band ? [this.$band[0], b] : [0, b];
      return this
    };
    b.prototype.time = function(b) {
      if (!a.num(b)) return this.$time;
      this.$time = b;
      return this
    };
    b.prototype.relative = function(b) {
      if (!a.defined(b)) return this.$relative;
      this.$relative = b;
      return this
    };
    b.prototype.easing = function(a, b) {
      if (!a) return this.$easing;
      this.$easing = n(a, b, this.$relative || this.is_tween);
      return this
    };
    b.prototype.clone = function() {
      var a = new b(this.$func, this.$type);
      a.$time = this.$time;
      a.$band = this.$band;
      a.$data = this.$data;
      a.$easing = this.$easing;
      a.$relative = this.$relative;
      a.is_tween = this.is_tween;
      return a
    };
    b.prototype.apply = function(a, b, d, c) {
      return this.func.call(a, b, d, c)
    };
    b.prototype.data = function(a) {
      this.$data = a
    };
    var n = function(b, c, f) {
      if (!b) return null;
      var r;
      if (a.str(b)) {
        if (!d[b]) throw Error("Unknown easing: " + b);
        r = d[b](c);
        return f ? r : function(a, b) {
          return r(a / b, b) * b
        }
      }
      if (a.fun(b) && !c) return b;
      if (a.fun(b) && c) return b(c);
      if (b.type) return r = d[b.type](b.data || c), f ? r : function(a, b) {
        return r(a / b, b) * b
      };
      if (b.f) return b.f(b.data || c)
    };
    v.exports = b
  }, {
    "../constants.js": 12,
    "../utils.js": 39,
    "./easing.js": 5
  }],
  8: [function(c, v, k) {
    function b(b, d) {
      this.id = a();
      this.func = b;
      this.type = d || e.PNT_USER
    }
    var e = c("../constants.js"),
      a = c("../utils.js").guid;
    b.ORDER = [e.PNT_SYSTEM, e.PNT_USER, e.PNT_DEBUG];
    b.FIRST_PNT = e.PNT_SYSTEM;
    b.LAST_PNT = e.PNT_DEBUG;
    b.ALL_PAINTERS = [e.PNT_SYSTEM, e.PNT_USER, e.PNT_DEBUG];
    b.NODBG_PAINTERS = [e.PNT_SYSTEM, e.PNT_USER];
    b.prototype.apply = function(a, b) {
      return this.func.call(a, b)
    };
    v.exports = b
  }, {
    "../constants.js": 12,
    "../utils.js": 39
  }],
  9: [function(c,
    v, k) {
    function b(a) {
      this.selector = a.selector;
      this.multiple = a.multiple;
      this.anywhere = "/" !== a.selector[0];
      this.tokens = "/" === a.selector[0] ? a.selector.split("/").slice(1) : [a.selector]
    }

    function e(a, b, d) {
      return ":" === b[0] && d === parseInt(b.slice(1)) || b === a.name
    }

    function a(b, d) {
      for (var c = 0; c < b.length; c++) {
        if (e(b[c], d, c)) return b[c];
        var r = a(b[c].children, d);
        if (r) return r
      }
      return null
    }

    function f(a, b, d) {
      for (var c = 0; c < b.length; c++) e(b[c], d, c) && a.push(b[c]), f(a, b[c].children, d);
      return a
    }

    function d(a, b, c) {
      c = c || 0;
      if (0 ===
        b.length || c >= b.length) return null;
      for (var r = b[c], f = c === b.length - 1, y = 0; y < a.length; y++)
        if (e(a[y], r, y)) {
          if (f) return a[y];
          var x = d(a[y].children, b, c + 1);
          if (x) return x
        }
      return null
    }

    function n(a, b, d, c) {
      c = c || 0;
      if (0 === d.length || c >= d.length) return a;
      for (var f = d[c], y = c === d.length - 1, x = 0; x < b.length; x++) e(b[x], f, x) && (y ? a.push(b[x]) : n(a, b[x].children, d, c + 1));
      return a
    }
    b.prototype.over = function(b) {
      if (!this.multiple && this.anywhere) return a(b, this.tokens[0]);
      if (this.multiple && this.anywhere) return f([], b, this.tokens[0]);
      if (!this.multiple && !this.anywhere) return d(b, this.tokens);
      if (this.multiple && !this.anywhere) return n([], b, this.tokens)
    };
    b.one = function(a) {
      return new b({
        selector: a,
        multiple: !1
      })
    };
    b.all = function(a) {
      return new b({
        selector: a,
        multiple: !0
      })
    };
    v.exports = b
  }, {}],
  10: [function(c, v, k) {
    function b(b, d) {
      var c = new f(null, a.MOD_TWEEN),
        x = w[b];
      c.def = x;
      c.func = function(a, b, d) {
        c.$tween && c.$tween.call(this, a, b, d)
      };
      c.is_tween = !0;
      c.tween_type = b;
      h.defined(d) ? c.value(d) : x.from === e && x.to === e && (c.$tween = x.func(void 0, c));
      return c
    }

    function e() {}
    var a = c("../constants.js"),
      f = c("./modifier.js"),
      d = c("../graphics/brush.js"),
      n = c("../graphics/path.js"),
      h = c("../utils.js").is;
    c("../errors.js");
    var t = f,
      w = {};
    t.DEFAULT_FROM = function(a, b) {
      return h.defined(b) ? [a, b[1]] : [a, null]
    };
    t.DEFAULT_TO = function(a, b) {
      return h.defined(a) ? [b[0], a] : [null, a]
    };
    t.register = function(a, d) {
      d = h.fun(d) ? {
        func: d
      } : d;
      d.from = d.from || t.DEFAULT_FROM;
      d.to = d.to || t.DEFAULT_TO;
      w[a] = d;
      t[a] = function(d) {
        return b(a, d)
      }
    };
    t._$ = b;
    t.prototype.values = function(a, b) {
      if (!h.defined(a) &&
        this.$value) return this.$value;
      this.$value = this.def.to(b, this.def.from(a, null));
      this.$tween = this.def.func(this.$value, this);
      return this
    };
    t.prototype.value = function(a) {
      if (!h.defined(a) && this.$value) return this.$value;
      this.$value = a;
      this.$tween = this.def.func(this.$value, this);
      return this
    };
    t.prototype.from = function(a, b) {
      this.$value = this.def.from(h.defined(b) ? [a, b] : a, this.$value);
      this.$tween = this.def.func(this.$value, this);
      return this
    };
    t.prototype.to = function(a, b) {
      this.$value = this.def.to(h.defined(b) ? [a, b] : a, this.$value);
      this.$tween = this.def.func(this.$value, this);
      return this
    };
    t.register(a.T_TRANSLATE, {
      func: function(a) {
        return function(b) {
          var d = a.pointAt(b);
          d && (this.x = d[0], this.y = d[1], this.$mpath_t = b, this.$mpath = 0 < a.length() ? a : null)
        }
      },
      from: function(a, b) {
        return b ? b.line(a[0], a[1]) : (new n).move(a[0], a[1])
      },
      to: function(a, b) {
        return b ? b.line(a[0], a[1]) : (new n).move(a[0], a[1])
      }
    });
    t.register(a.T_SCALE, {
      func: function(a) {
        var b = a[0],
          d = a[1];
        return function(a) {
          this.sx = b[0] * (1 - a) + d[0] * a;
          this.sy = b[1] * (1 - a) +
            d[1] * a
        }
      },
      from: function(a, b) {
        a = a.length ? a : [a, a];
        return b ? [a, b[1]] : [a, [1, 1]]
      },
      to: function(a, b) {
        a = a.length ? a : [a, a];
        return b ? [b[0], a] : [
          [1, 1], a
        ]
      }
    });
    t.register(a.T_ROTATE, function(a) {
      var b = a[0],
        d = a[1];
      return function(a) {
        this.angle = b * (1 - a) + d * a
      }
    });
    t.register(a.T_BONE_ROTATE, function(a) {
      var b = a[0],
        d = a[1];
      return function(a) {
        this.bonerotate = b * (1 - a) + d * a
      }
    });
    t.register(a.T_BONE_LENGTH, function(a) {
      var b = a[0],
        d = a[1];
      return function(a) {
        this.bonelength = b * (1 - a) + d * a
      }
    });
    t.register(a.T_ROT_TO_PATH, {
      func: function() {
        return function(a) {
          if (a =
            this.$mpath) this.angle += a.tangentAt(this.$mpath_t || .001)
        }
      },
      from: e,
      to: e
    });
    t.register(a.T_ALPHA, function(a) {
      var b = a[0],
        d = a[1];
      return function(a) {
        this.alpha = b * (1 - a) + d * a
      }
    });
    t.register(a.T_SHEAR, {
      func: function(a) {
        var b = a[0],
          d = a[1];
        return function(a) {
          this.hx = b[0] * (1 - a) + d[0] * a;
          this.hy = b[1] * (1 - a) + d[1] * a
        }
      },
      from: function(a, b) {
        a = a.length ? a : [a, a];
        return b ? [a, b[1]] : [a, [1, 1]]
      },
      to: function(a, b) {
        a = a.length ? a : [a, a];
        return b ? [b[0], a] : [
          [1, 1], a
        ]
      }
    });
    t.register(a.T_FILL, function(a) {
      var b = d.interpolateBrushes(a[0], a[1]);
      return function(a) {
        this.$fill = b(a)
      }
    });
    t.register(a.T_STROKE, function(a) {
      var b = d.interpolateBrushes(a[0], a[1]);
      return function(a) {
        this.$stroke = b(a)
      }
    });
    t.register(a.T_SHADOW, function(a) {
      var b = d.interpolateBrushes(a[0], a[1]);
      return function(a) {
        this.$shadow = b(a)
      }
    });
    t.register(a.T_VOLUME, function(a) {
      var b = a[0],
        d = a[1];
      return function(a) {
        this.$audio && this.$audio.ready && this.$audio.setVolume(b * (1 - a) + d * a)
      }
    });
    t.register(a.T_DISPLAY, {
      func: function(a) {
        return function(b) {
          this.visible = a
        }
      },
      from: function(a, b) {
        return a
      },
      to: function(a, b) {
        return a
      }
    });
    t.register(a.T_SWITCH, {
      func: function(a, b) {
        return function(d) {
          this.switch_band = b.$band;
          this["switch"] = a
        }
      },
      from: e,
      to: e
    });
    v.exports = t
  }, {
    "../constants.js": 12,
    "../errors.js": 13,
    "../graphics/brush.js": 17,
    "../graphics/path.js": 19,
    "../utils.js": 39,
    "./modifier.js": 7
  }],
  11: [function(c, v, k) {
    k = "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {};
    c = c("./constants.js");
    c = k.__anm_conf || {
      logImport: !1,
      logResMan: !1,
      logEvents: !1,
      logLevel: c.L_ERROR |
        c.L_WARN | c.L_INFO,
      doNotLoadAudio: !1,
      doNotLoadImages: !1,
      doNotRenderShadows: !1,
      engine: null
    };
    k.__anm_conf = c;
    v.exports = c
  }, {
    "./constants.js": 12
  }],
  12: [function(c, v, k) {
    c = {
      L_DEBUG: 1,
      L_INFO: 2,
      L_WARN: 4,
      L_ERROR: 8,
      NOTHING: -1,
      STOPPED: 0,
      PLAYING: 1,
      PAUSED: 2,
      LOADING: 3,
      RES_LOADING: 4,
      ERROR: 5,
      M_CONTROLS_ENABLED: 1,
      M_CONTROLS_DISABLED: 2,
      M_INFO_ENABLED: 4,
      M_INFO_DISABLED: 8,
      M_HANDLE_EVENTS: 16,
      M_DO_NOT_HANDLE_EVENTS: 32,
      M_DRAW_STILL: 64,
      M_DO_NOT_DRAW_STILL: 128,
      M_INFINITE_DURATION: 256,
      M_FINITE_DURATION: 512
    };
    c.M_PREVIEW = c.M_CONTROLS_DISABLED |
      c.M_INFO_DISABLED | c.M_DO_NOT_HANDLE_EVENTS | c.M_DRAW_STILL | c.M_FINITE_DURATION;
    c.M_DYNAMIC = c.M_CONTROLS_DISABLED | c.M_INFO_DISABLED | c.M_HANDLE_EVENTS | c.M_DO_NOT_DRAW_STILL | c.M_INFINITE_DURATION;
    c.M_VIDEO = c.M_CONTROLS_ENABLED | c.M_INFO_DISABLED | c.M_DO_NOT_HANDLE_EVENTS | c.M_DRAW_STILL | c.M_FINITE_DURATION;
    c.M_SANDBOX = c.M_CONTROLS_DISABLED | c.M_INFO_DISABLED | c.M_DO_NOT_HANDLE_EVENTS | c.M_DO_NOT_DRAW_STILL | c.M_FINITE_DURATION;
    c.LT_ANIMATION = 1;
    c.LT_ELEMENTS = 2;
    c.LT_IMPORT = 3;
    c.LT_URL = 4;
    c.LM_ONREQUEST = "onrequest";
    c.LM_ONPLAY = "onplay";
    c.LM_DEFAULT = c.LM_ONREQUEST;
    c.ET_EMPTY = "empty";
    c.ET_PATH = "path";
    c.ET_TEXT = "text";
    c.ET_SHEET = "image";
    c.ET_AUDIO = "audio";
    c.ET_VIDEO = "video";
    c.R_ONCE = 0;
    c.R_STAY = 1;
    c.R_LOOP = 2;
    c.R_BOUNCE = 3;
    c.C_SRC_OVER = 1;
    c.C_SRC_ATOP = 2;
    c.C_SRC_IN = 3;
    c.C_SRC_OUT = 4;
    c.C_DST_OVER = 5;
    c.C_DST_ATOP = 6;
    c.C_DST_IN = 7;
    c.C_DST_OUT = 8;
    c.C_LIGHTER = 9;
    c.C_DARKER = 10;
    c.C_COPY = 11;
    c.C_XOR = 12;
    c.AC_NAMES = [];
    c.AC_NAMES[c.C_SRC_OVER] = "source-over";
    c.AC_NAMES[c.C_SRC_ATOP] = "source-atop";
    c.AC_NAMES[c.C_SRC_IN] = "source-in";
    c.AC_NAMES[c.C_SRC_OUT] =
      "source-out";
    c.AC_NAMES[c.C_DST_OVER] = "destination-over";
    c.AC_NAMES[c.C_DST_ATOP] = "destination-atop";
    c.AC_NAMES[c.C_DST_IN] = "destination-in";
    c.AC_NAMES[c.C_DST_OUT] = "destination-out";
    c.AC_NAMES[c.C_LIGHTER] = "lighter";
    c.AC_NAMES[c.C_DARKER] = "darker";
    c.AC_NAMES[c.C_COPY] = "copy";
    c.AC_NAMES[c.C_XOR] = "xor";
    c.BT_NONE = "none";
    c.BT_FILL = "fill";
    c.BT_STROKE = "stroke";
    c.BT_SHADOW = "shadow";
    c.TA_LEFT = "left";
    c.TA_CENTER = "center";
    c.TA_RIGHT = "right";
    c.BL_TOP = "top";
    c.BL_MIDDLE = "middle";
    c.BL_BOTTOM = "bottom";
    c.BL_ALPHABETIC =
      "alphabetic";
    c.BL_HANGING = "hanging";
    c.BL_IDEOGRAPHIC = "ideographic";
    c.PC_ROUND = "round";
    c.PC_BUTT = "butt";
    c.PC_MITER = "miter";
    c.PC_SQUARE = "square";
    c.PC_BEVEL = "bevel";
    c.E_PATH = "path";
    c.E_FUNC = "function";
    c.E_CSEG = "segment";
    c.E_STDF = "standard";
    c.T_TRANSLATE = "translate";
    c.T_SCALE = "scale";
    c.T_ROTATE = "rotate";
    c.T_ROT_TO_PATH = "rotatetopath";
    c.T_ALPHA = "alpha";
    c.T_SHEAR = "shear";
    c.T_FILL = "fill";
    c.T_STROKE = "stroke";
    c.T_SHADOW = "shadow";
    c.T_VOLUME = "volume";
    c.T_DISPLAY = "display";
    c.T_SWITCH = "switch";
    c.T_BONE_ROTATE =
      "bonerotate";
    c.T_BONE_LENGTH = "bonelength";
    c.MOD_SYSTEM = "system";
    c.MOD_TWEEN = "tween";
    c.MOD_USER = "user";
    c.MOD_EVENT = "event";
    c.PNT_SYSTEM = "system";
    c.PNT_USER = "user";
    c.PNT_DEBUG = "debug";
    c.SWITCH_OFF = "[None]";
    v.exports = c
  }, {}],
  13: [function(c, v, k) {
    function b(a) {
      return function(b) {
        Error.captureStackTrace && Error.captureStackTrace(this, this);
        b = Error(b || "");
        b.name = a;
        return b
      }
    }
    var e = c("./constants.js"),
      a = b("SystemError"),
      f = b("PlayerError"),
      d = b("AnimationError");
    v.exports = {
      system: function(b, d) {
        var c = new a(b);
        d && d.fire(e.S_ERROR, c);
        return c
      },
      player: function(a, b) {
        var d = new f(a);
        b && b.fire(e.S_ERROR, d);
        return d
      },
      animation: function(a, b) {
        var c = new d(a);
        b && b.fire(e.X_ERROR, c);
        return c
      },
      element: function(a, b) {
        var c = new d(a);
        b && b.anim && b.anim.fire(e.X_ERROR, c);
        return c
      },
      SystemError: a,
      PlayerError: f,
      AnimationError: d
    }
  }, {
    "./constants.js": 12
  }],
  14: [function(c, v, k) {
    function b(a) {
      return 0 === a.indexOf("mouse")
    }

    function e(a) {
      return 0 === a.indexOf("key")
    }

    function a() {
      this.reset()
    }
    var f = c("./constants.js"),
      d = c("./errors.js");
    f.S_NEW_PLAYER = "new";
    f.S_PLAYER_DETACH = "detach";
    f.X_MCLICK = "mouseclick";
    f.X_MDCLICK = "mousedoubleclick";
    f.X_MUP = "mouseup";
    f.X_MDOWN = "mousedown";
    f.X_MMOVE = "mousemove";
    f.X_MOVER = "mouseover";
    f.X_MOUT = "mouseout";
    f.X_KPRESS = "keypress";
    f.X_KUP = "keyup";
    f.X_KDOWN = "keydown";
    f.X_START = "bandstart";
    f.X_STOP = "bandstop";
    f.X_ERROR = "error";
    f.A_START = "animationstart";
    f.A_STOP = "animationstop";
    f.A_PAUSE = "animationpause";
    f.S_CHANGE_STATE = "statechange";
    f.S_PLAY = "play";
    f.S_PAUSE = "pause";
    f.S_STOP = "stop";
    f.S_COMPLETE = "complete";
    f.S_REPEAT = "repeat";
    f.S_IMPORT = "import";
    f.S_LOAD = "load";
    f.S_RES_LOAD = "loadresources";
    f.S_LOADING_PROGRESS = "loadprogress";
    f.S_TIME_UPDATE = "timeupdate";
    f.S_REPORT_STATS = "reportstats";
    f.S_INTERACTIVITY = "interactivity";
    f.S_ERROR = "error";
    var n = {
      mouseclick: 1,
      mousedoubleclick: 2,
      mouseup: 4,
      mousedown: 8,
      mousemove: 16,
      mouseover: 32,
      mouseout: 64,
      keypress: 128,
      keyup: 256,
      keydown: 512
    };
    a.prototype.reset = function() {
      this.state = 0
    };
    a.prototype.save = function(a) {
      this.state |= n[a]
    };
    a.prototype.check = function(a) {
      return this.state &
        n[a]
    };
    v.exports = {
      mouse: b,
      keyboard: e,
      mouseOrKeyboard: function(a) {
        return b(a) || e(a)
      },
      registerEvent: function(a, b) {
        f[a] = b
      },
      provideEvents: function(a, b) {
        a.prototype._initHandlers = function(a) {
          return function() {
            var b = {};
            this.handlers = b;
            for (var d = 0, c = a.length; d < c; d++) b[a[d]] = []
          }
        }(b);
        a.prototype.on = function(a, b) {
          if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
          if (!this.provides(a)) throw d.system("Event '" + a + "' is not provided by " + this);
          if (b) return this.handlers[a].push(b),
            this.handlers[a].length - 1
        };
        a.prototype.subscribedTo = function(a) {
          return this.handlers && this.handlers[a] && this.handlers[a].length
        };
        a.prototype.fire = function(a) {
          if (!this.disabled) {
            if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
            if (!this.provides(a)) throw d.system("Event '" + a + "' is not provided by " + this);
            if (!this.filterEvent || this.filterEvent.apply(this, arguments))
              if (this["handle_" + a] || this.handlers[a].length) {
                for (var b = Array(arguments.length -
                    1), c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
                this["handle_" + a] && this["handle_" + a].apply(this, b);
                for (var c = this.handlers[a], f = 0, e = c.length; f < e; f++) c[f].apply(this, b)
              }
          }
        };
        a.prototype.provides = function(a) {
          return function(b) {
            if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
            return b ? this.handlers.hasOwnProperty(b) : a
          }
        }(b);
        a.prototype.unbind = function(a, b) {
          if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
          this.provides(a) && this.handlers[a][b] && this.handlers[a].splice(b, 1)
        };
        a.prototype.disposeHandlers = function() {
          if (!this.handlers) throw d.system("Instance is not initialized with handlers, call __initHandlers in its constructor");
          var a = this.handlers,
            b;
          for (b in a) a.hasOwnProperty(b) && (a[b] = [])
        };
        for (var c = function(a) {
            return function(b) {
              this.fire(a, b)
            }
          }, f = 0, e = b.length; f < e; f++) a.prototype["e_" + b[f]] = c(b[f])
      },
      EventState: a
    }
  }, {
    "./constants.js": 12,
    "./errors.js": 13
  }],
  15: [function(c, v, k) {
    v.exports = {
      liveDebug: !1,
      autoFocus: !0,
      setTabindex: !0
    }
  }, {}],
  16: [function(c, v, k) {
    function b(a, b, d, c) {
      this.x = a;
      this.y = b;
      this.width = d;
      this.height = c
    }
    var e = c("../utils.js").is;
    b.prototype.load = function(a) {
      this.x = a.x;
      this.y = a.y;
      this.width = a.width;
      this.height = a.height
    };
    b.prototype.loadDiag = function(a, b, d, c) {
      var e;
      d < a && (e = a, a = d, d = e);
      c < b && (e = b, b = c, c = e);
      this.x = a;
      this.y = b;
      this.width = d - a;
      this.height = c - b
    };
    b.prototype.minX = function() {
      return this.x
    };
    b.prototype.minY = function() {
      return this.y
    };
    b.prototype.maxX = function() {
      return this.x + this.width
    };
    b.prototype.maxY = function() {
      return this.y + this.height
    };
    b.prototype.add = function(a) {
      a.exist() && (this.exist() ? this.loadDiag(Math.min(this.minX(), a.minX()), Math.min(this.minY(), a.minY()), Math.max(this.maxX(), a.maxX()), Math.max(this.maxY(), a.maxY())) : this.load(a))
    };
    b.prototype.addPoint = function(a) {
      this.loadDiag(Math.min(this.minX(), a.x), Math.min(this.minY(), a.y), Math.max(this.maxX(), a.x), Math.max(this.maxY(), a.y))
    };
    b.prototype.toPoints = function() {
      return [{
        x: this.x,
        y: this.y
      }, {
        x: this.x + this.width,
        y: this.y
      }, {
        x: this.x + this.width,
        y: this.y + this.height
      }, {
        x: this.x,
        y: this.y + this.height
      }]
    };
    b.prototype.exist = function() {
      return !e.nan(this.x)
    };
    b.prototype.inside = function(a) {
      return this.exist() ? a.x >= this.x && a.x - this.x <= this.width && a.y >= this.y && a.y - this.y <= this.height : !1
    };
    b.prototype.clone = function() {
      return new b(this.x, this.y, this.width, this.height)
    };
    b.NONE = new b(NaN, NaN, NaN, NaN);
    v.exports = b
  }, {
    "../utils.js": 39
  }],
  17: [function(c, v, k) {
    function b(d) {
      this.type = a.BT_NONE;
      d && b.value(d, this)
    }

    function e() {
      this.$radial = !1;
      this.$stops = {};
      this.$radius = null;
      this.$bounds = [0, 0, 1, 1];
      this.$direction = [
        [.5, 0],
        [.5, 1]
      ]
    }
    var a = c("../constants.js"),
      f = c("../conf.js"),
      d = c("../utils.js"),
      n = d.is,
      h = c("engine"),
      t = c("../errors.js"),
      w = c("./color.js");
    b.DEFAULT_CAP = a.PC_ROUND;
    b.DEFAULT_JOIN = a.PC_ROUND;
    b.DEFAULT_FILL = "#ffbc05";
    b.DEFAULT_STROKE = w.TRANSPARENT;
    b.DEFAULT_SHADOW = w.TRANSPARENT;
    b.prototype.apply = function(d) {
      if (this.type != a.BT_NONE) {
        var c = this._style || (this._style = this.adapt(d));
        if (this.type == a.BT_FILL) d.fillStyle = c;
        else if (this.type ==
          a.BT_STROKE) 0 < this.width ? (d.lineWidth = this.width, d.strokeStyle = c || b.DEFAULT_STROKE, d.lineCap = this.cap || b.DEFAULT_CAP, d.lineJoin = this.join || b.DEFAULT_JOIN) : b.clearStroke(d);
        else if (this.type == a.BT_SHADOW && !f.doNotRenderShadows) {
          var e = h.getAnmProps(d);
          e.skip_shadows || (e = h.PX_RATIO * (e.factor || 1), d.shadowColor = c, d.shadowBlur = this.blurRadius * e || 0, d.shadowOffsetX = this.offsetX * e || 0, d.shadowOffsetY = this.offsetY * e || 0)
        }
      }
    };
    b.prototype.invalidate = function() {
      this._converted = !1;
      this._style = null
    };
    b.prototype.convertColorsToRgba =
      function() {
        if (!this._converted) {
          if (this.color && n.str(this.color)) this.color = w.fromStr(this.color);
          else if (this.grad)
            for (var a = this.grad.stops, b = 0, d = a.length; b < d; b++) n.str(a[b][1]) && (a[b][1] = w.from(a[b][1]));
          this._converted = !0
        }
      };
    b.prototype.adapt = function(a) {
      if (this.color && n.str(this.color)) return this.color;
      if (this.color) return w.toRgbaStr(this.color);
      if (this.grad) {
        var b = this.grad,
          d = b.stops,
          c = b.dir || [
            [.5, 0],
            [.5, 1]
          ],
          e = b.r || [1, 1];
        bounds = b.bounds || [0, 0, 1, 1];
        a = n.defined(b.r) ? bounds ? a.createRadialGradient(bounds[0] +
          c[0][0] * bounds[2], bounds[1] + c[0][1] * bounds[3], Math.max(bounds[2], bounds[3]) * e[0], bounds[0] + c[1][0] * bounds[2], bounds[1] + c[1][1] * bounds[3], Math.max(bounds[2], bounds[3]) * e[1]) : a.createRadialGradient(c[0][0], c[0][1], e[0], c[1][0], c[1][1], e[1]) : bounds ? a.createLinearGradient(bounds[0] + c[0][0] * bounds[2], bounds[1] + c[0][1] * bounds[3], bounds[0] + c[1][0] * bounds[2], bounds[1] + c[1][1] * bounds[3]) : a.createLinearGradient(c[0][0], c[0][1], c[1][0], c[1][1]);
        b = 0;
        for (c = d.length; b < c; b++) e = d[b], a.addColorStop(e[0], w.adapt(e[1]));
        return a
      }
      return this.pattern ? (d = this.pattern.elm, b = h.createCanvas(this.pattern.w, this.pattern.h, null, 1), c = b.getContext("2d"), d.pivot(0, 0), d.disabled = !1, d.render(c, 0, 0), d.disabled = !0, a.createPattern(b, this.pattern.repeat)) : null
    };
    b.prototype.clone = function() {
      var a = new b;
      a.type = this.type;
      this.color && n.str(this.color) ? a.color = this.color : this.color && (a.color = {
        r: this.color.r,
        g: this.color.g,
        b: this.color.b,
        a: this.color.a || 1
      });
      if (this.grad) {
        var d = this.grad,
          c = {
            stops: []
          };
        for (i = 0; i < d.stops.length; i++) c.stops[i] = [].concat(d.stops[i]);
        c.dir = [];
        for (i = 0; i < d.dir.length; i++) c.dir[i] = [].concat(d.dir[i]);
        d.r && (c.r = [].concat(d.r));
        a.grad = c
      }
      this.hasOwnProperty("width") && (a.width = this.width);
      this.hasOwnProperty("cap") && (a.cap = this.cap);
      this.hasOwnProperty("join") && (a.join = this.join);
      this.hasOwnProperty("blurRadius") && (a.blurRadius = this.blurRadius);
      this.hasOwnProperty("offsetX") && (a.offsetX = this.offsetX);
      this.hasOwnProperty("offsetY") && (a.offsetY = this.offsetY);
      return a
    };
    b.fill = function(d) {
      var c = new b;
      c.type = a.BT_FILL;
      n.obj(d) ? d instanceof e ? c.grad = d.get() : d.stops ? c.grad = d : d.elm && (c.pattern = d) : c.color = d;
      return c
    };
    b.stroke = function(d, c, e, f, h) {
      d = d && d instanceof b ? d.clone() : b.fill(d);
      d.type = a.BT_STROKE;
      d.width = c || 0;
      d.cap = e || b.DEFAULT_CAP;
      d.join = f || b.DEFAULT_JOIN;
      d.mitter = h;
      return d
    };
    b.shadow = function(d, c, e, f) {
      d = b.fill(d);
      d.type = a.BT_SHADOW;
      d.blurRadius = c || 0;
      d.offsetX = e || 0;
      d.offsetY = f || 0;
      return d
    };
    b.value = function(d, c) {
      var f = c || new b;
      if (d)
        if (n.str(d)) f.type = a.BT_FILL, f.color = d;
        else if (n.obj(d))
        if (d = d instanceof e ?
          d.get() : d, n.defined(d.r) && n.defined(d.g) && n.defined(d.b)) f.type = a.BT_FILL, f.color = d;
        else if (d.color || d.grad) {
        n.defined(d.width) ? f.type = a.BT_STROKE : n.defined(d.blurRadius) || n.defined(d.offsetX) ? f.type = a.BT_SHADOW : f.type = a.BT_FILL;
        for (var x in d) d.hasOwnProperty(x) && (f[x] = d[x])
      } else throw t.element("Unknown type of brush");
      else throw t.element("Use Brush.fill, Brush.stroke or Brush.shadow to create brush from values");
      else f.type = a.BT_NONE
    };
    b.gradient = function() {
      return new e
    };
    b.qfill = function(a, b) {
      a.fillStyle =
        b
    };
    b.qstroke = function(a, d, c) {
      a.lineWidth = c || 1;
      a.strokeStyle = d;
      a.lineCap = b.DEFAULT_CAP;
      a.lineJoin = b.DEFAULT_JOIN
    };
    b.clearFill = function(a) {
      a.fillStyle = b.DEFAULT_FILL
    };
    b.clearStroke = function(a) {
      a.strokeStyle = b.DEFAULT_STROKE;
      a.lineWidth = 0;
      a.lineCap = b.DEFAULT_CAP;
      a.lineJoin = b.DEFAULT_JOIN
    };
    b.clearShadow = function(a) {
      a.shadowColor = b.DEFAULT_SHADOW;
      a.shadowBlur = 0;
      a.shadowOffsetX = 0;
      a.shadowOffsetY = 0
    };
    b.interpolateBrushes = function(c, e) {
      var f = n.equal(c, e);
      c = c instanceof b ? c : b.value(c);
      c._converted || c.convertColorsToRgba();
      if (f) return function() {
        return c
      };
      e = e instanceof b ? e : b.value(e);
      e._converted || e.convertColorsToRgba();
      var x = c.clone();
      return function(b) {
        n.defined(c.width) && n.defined(e.width) && (x.width = d.interpolateFloat(c.width, e.width, b));
        c.type === a.BT_SHADOW && (x.offsetX = d.interpolateFloat(c.offsetX, e.offsetX, b), x.offsetY = d.interpolateFloat(c.offsetY, e.offsetY, b), x.blurRadius = d.interpolateFloat(c.blurRadius, e.blurRadius, b));
        if (c.color) x.grad = null, x.color = w.toRgbaStr(w.interpolate(c.color, e.color, b));
        else if (c.grad) {
          x.color =
            null;
          x.grad || (x.grad = {});
          var f = x.grad,
            h = c.grad,
            y = e.grad,
            t;
          for (t = 0; t < h.dir.length; t++) f.dir[t] || (f.dir[t] = []), f.dir[t][0] = d.interpolateFloat(h.dir[t][0], y.dir[t][0], b), f.dir[t][1] = d.interpolateFloat(h.dir[t][1], y.dir[t][1], b);
          f.stops && f.stops.length === h.stops.length || (f.stops = []);
          for (t = 0; t < h.stops.length; t++) f.stops[t] || (f.stops[t] = []), f.stops[t][0] = d.interpolateFloat(h.stops[t][0], y.stops[t][0], b), f.stops[t][1] = w.toRgbaStr(w.interpolate(h.stops[t][1], y.stops[t][1], b));
          h.r ? (f.r || (f.r = []), f.r[0] = d.interpolateFloat(h.r[0],
            y.r[0], b), f.r[1] = d.interpolateFloat(h.r[1], y.r[1], b)) : f.r = null
        }
        x.invalidate();
        return x
      }
    };
    e.prototype.stops = function(a) {
      if (n.defined(a)) {
        var b = [],
          d;
        for (d in a) b.push([parseFloat(d), a[d]]);
        this.$stops = b;
        return this
      }
      a = {};
      b = this.$stops;
      for (d = 0; d < b.length; d++) a[b[d][0]] = b[d][1];
      return a
    };
    e.prototype.radial = function() {
      this.$radial = !0;
      return this
    };
    e.prototype.radius = function(a) {
      if (!n.defined(a)) return this.$radius;
      this.$radial = !0;
      this.$radius = a;
      return this
    };
    e.prototype.start = function(a, b) {
      if (!n.defined(a)) return [this.$bounds[0],
        this.$bounds[1]
      ];
      this.$bounds[0] = a;
      this.$bounds[1] = b;
      return this
    };
    e.prototype.size = function(a, b) {
      if (!n.defined(a)) return [this.$bounds[2], this.$bounds[3]];
      this.$bounds[2] = a;
      this.$bounds[3] = b;
      return this
    };
    e.prototype.from = function(a, b) {
      if (!n.defined(a)) return this.$direction[0];
      this.$direction[0][0] = a;
      this.$direction[0][1] = b;
      return this
    };
    e.prototype.to = function(a, b) {
      if (!n.defined(a)) return this.$direction[1];
      this.$direction[1][0] = a;
      this.$direction[1][1] = b;
      return this
    };
    e.prototype.get = function() {
      return {
        r: this.$radial ?
          this.$radius || [1, 1] : null,
        stops: this.$stops,
        bounds: this.$bounds,
        dir: this.$direction
      }
    };
    v.exports = b
  }, {
    "../conf.js": 11,
    "../constants.js": 12,
    "../errors.js": 13,
    "../utils.js": 39,
    "./color.js": 18,
    engine: 40
  }],
  18: [function(c, v, k) {
    var b = c("../utils.js"),
      e = b.is,
      a = {
        TRANSPARENT: "transparent",
        HEX_RE: /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i,
        HEX_SHORT_RE: /^#?([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])$/i,
        RGB_RE: /^rgb\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/i,
        RGBA_RE: /^rgba\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*(\d*[.]?\d+)\s*\)$/i,
        HSL_RE: /^hsl\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*%\s*,\s*([0-9]{1,3})\s*%\s*\)$/i,
        HSLA_RE: /^hsla\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*%\s*,\s*([0-9]{1,3})\s*%\s*,\s*(\d*[.]?\d+)\s*\)$/i,
        from: function(b) {
          return e.str(b) ? a.fromStr(b) : b.r && b
        },
        fromStr: function(b) {
          return a.fromHex(b) || a.fromRgb(b) || a.fromRgba(b) || a.fromHsl(b) || {
            r: 0,
            g: 0,
            b: 0,
            a: 0
          }
        },
        fromHex: function(b) {
          if ("#" !== b[0]) return null;
          var d = a.HEX_RE.exec(b);
          return d ? {
            r: parseInt(d[1], 16),
            g: parseInt(d[2], 16),
            b: parseInt(d[3], 16),
            a: 1
          } : (d = a.HEX_SHORT_RE.exec(b)) ? {
            r: parseInt(d[1] + d[1], 16),
            g: parseInt(d[2] + d[2], 16),
            b: parseInt(d[3] + d[3], 16),
            a: 1
          } : null
        },
        fromRgb: function(b) {
          return 0 !== b.indexOf("rgb(") ? null : (b = a.RGB_RE.exec(b)) ? {
            r: parseInt(b[1]),
            g: parseInt(b[2]),
            b: parseInt(b[3]),
            a: 1
          } : null
        },
        fromRgba: function(b) {
          return 0 !== b.indexOf("rgba(") ? null : (b = a.RGBA_RE.exec(b)) ? {
            r: parseInt(b[1]),
            g: parseInt(b[2]),
            b: parseInt(b[3]),
            a: parseFloat(b[4])
          } : null
        },
        fromHsl: function(b) {
          return 0 !== b.indexOf("hsl(") ? null : (b = a.HSL_RE.exec(b)) ? a.fromHslVal(parseInt(b[1]) / 180 * Math.PI, parseInt(b[2]) /
            100, parseInt(b[3]) / 100) : null
        },
        fromHsla: function(b) {
          if (0 !== b.indexOf("hsla(")) return null;
          b = a.HSLA_RE.exec(hsl);
          if (!b) return null;
          b = a.fromHslVal(parseInt(b[1]) / 180 * Math.PI, parseInt(b[2]) / 100, parseInt(b[3]) / 100);
          b.a = parseFloat(b[4]);
          return b
        },
        fromHslVal: function(b, d, c) {
          var e = a.hueToRgb;
          d = .5 >= c ? c * (d + 1) : c + d - c * d;
          c = 2 * c - d;
          return {
            r: e(c, d, b + 2),
            g: e(c, d, b),
            b: e(c, d, b - 2),
            a: 1
          }
        },
        hueToRgb: function(a, b, c) {
          0 > c && (c += 6);
          6 <= c && (c -= 6);
          return 1 > c ? (b - a) * c + a : 3 > c ? b : 4 > c ? (b - a) * (4 - c) + a : a
        },
        rgb: function(a, b, c) {
          return "rgb(" + a + "," +
            b + "," + c + ")"
        },
        rgba: function(a, b, c, h) {
          return "rgba(" + a + "," + b + "," + c + "," + (e.defined(h) ? h.toFixed(2) : 1) + ")"
        },
        hsl: function(b, d, c) {
          return a.dhsl(b / Math.PI * 180, d, c)
        },
        dhsl: function(a, b, c) {
          return "hsl(" + Math.floor(a) + "," + Math.floor(100 * b) + "%," + Math.floor(100 * c) + "%)"
        },
        hsla: function(b, d, c, e) {
          return a.dhsla(b / Math.PI * 180, d, c, e)
        },
        dhsla: function(a, b, c, h) {
          return "hsla(" + Math.floor(a) + "," + Math.floor(100 * b) + "%," + Math.floor(100 * c) + "%," + (e.defined(h) ? h.toFixed(2) : 1) + ")"
        },
        adapt: function(b) {
          if (!b) return null;
          if (e.str(b)) return b;
          if (e.defined(b.g)) return a.toRgbaStr(b);
          if (e.defined(b.h)) return a.toHslaStr(b)
        },
        toRgbaStr: function(b) {
          return a.rgba(b.r, b.g, b.b, b.a)
        },
        toHslaStr: function(b) {
          return a.hsla(b.h, b.s, b.l, b.a)
        },
        interpolate: function(a, d, c) {
          return {
            r: Math.round(b.interpolateFloat(a.r, d.r, c)),
            g: Math.round(b.interpolateFloat(a.g, d.g, c)),
            b: Math.round(b.interpolateFloat(a.b, d.b, c)),
            a: b.interpolateFloat(a.a, d.a, c)
          }
        }
      };
    v.exports = a
  }, {
    "../utils.js": 39
  }],
  19: [function(c, v, k) {
    function b(b) {
      this.segs = [];
      this.closed = !1;
      a.str(b) ? (this.parse(b),
        this.updatePath2D(b)) : a.arr(b) && (this.segs = b);
      this.cached_hits = {}
    }
    c("../constants.js");
    var e = c("../utils.js"),
      a = e.is;
    k = c("./segments.js");
    var f = k.MSeg,
      d = k.LSeg,
      n = k.CSeg,
      h = k.Crossings,
      t = c("engine"),
      w = !!t.Path2D && !t.isIEorEdge,
      r = c("./brush.js"),
      z = c("./bounds.js");
    b.prototype.visit = function(a, b) {
      for (var d = this.segs, c = 0, e = d.length; c < e; c++) a(d[c], b);
      return this
    };
    b.prototype.length = function() {
      if (a.defined(this.cached_len)) return this.cached_len;
      var b = 0,
        d = this.start();
      this.visit(function(a) {
        b += a.length(d);
        d = a.last()
      });
      return this.cached_len = b
    };
    b.prototype.add = function(a) {
      this.segs.push(a);
      this._p2dCurrent = !1;
      return this
    };
    b.prototype.move = function(a, b) {
      return this.add(new f([a, b]))
    };
    b.prototype.line = function(a, b) {
      return this.add(new d([a, b]))
    };
    b.prototype.curve = function(a, b, d, c, e, f) {
      return this.add(new n([a, b, d, c, e, f]))
    };
    b.prototype.close = function() {
      this.closed = !0;
      return this
    };
    b.prototype.apply = function(a, b, d, c) {
      if (w) return this.updatePath2D(), c && c.apply(a), b && (b.apply(a), a.fill(this.path2d)), c && r.clearShadow(a),
        d && (d.apply(a), a.stroke(this.path2d)), this;
      a.beginPath();
      for (var e = this.segs, f = 0, p = e.length; f < p; f++) e[f].draw(a);
      this.closed && a.closePath();
      c && c.apply(a);
      b && (b.apply(a), a.fill());
      c && r.clearShadow(a);
      d && (d.apply(a), a.stroke());
      return this
    };
    b.prototype.parse = function(a) {
      a && b.parse(a, this);
      return this
    };
    b.prototype.hitAt = function(b) {
      if (a.defined(this.cached_hits[b])) return this.cached_hits[b];
      var d = this.length();
      if (0 === d || 0 > b || 1 < b) return null;
      var c = this.start(),
        f = e.roundTo(b, 3);
      if (0 === b) return this.cached_hits[f] = {
        seg: this.segs[0],
        start: c,
        slen: 0,
        segt: 0
      };
      var h = this.segs.length;
      if (0 === h) return null;
      b *= d;
      for (var n = 0, p, m = 0; m < h; m++) {
        d = this.segs[m];
        p = d.length(c);
        if (b <= n + p) return h = b - n, this.cached_hits[f] = {
          seg: d,
          start: c,
          slen: p,
          segt: 0 != p ? d.findT(c, h) : 0
        };
        n += p;
        c = d.last()
      }
      return null
    };
    b.prototype.pointAt = function(a) {
      return (a = this.hitAt(a)) ? a.seg.atT(a.start, a.segt) : this.start()
    };
    b.prototype.inside = function(a) {
      var b = a.x;
      a = a.y;
      var d = this.segs.length;
      if (2 > d) return !1;
      for (var c = this.start(), e = c, f = 0, p = 0; p < d; p++) var m = this.segs[p],
        f = f + m.crossings(e, b, a),
        e = m.last();
      c !== e && (f += h.line(b, a, e[0], e[1], c[0], c[1]));
      return 0 !== (f & -1)
    };
    b.prototype.tangentAt = function(a) {
      return (a = this.hitAt(a)) ? a.seg.tangentAt(a.start, a.segt) : 0
    };
    b.prototype.start = function() {
      return 1 > this.segs.length ? null : [this.segs[0].pts[0], this.segs[0].pts[1]]
    };
    b.prototype.end = function() {
      return 1 > this.segs.length ? null : this.segs[this.segs.length - 1].last()
    };
    b.prototype.bounds = function() {
      if (this.$bounds) return this.$bounds;
      if (0 >= this.segs.length) return z.NONE;
      var a = this.segs[0].pts[0],
        b = this.segs[0].pts[0],
        d = this.segs[0].pts[1],
        c = this.segs[0].pts[1];
      this.visit(function(e) {
        e = e.pts;
        var f = e.length,
          p;
        for (p = 0; p < f; p += 2) a = Math.min(a, e[p]), b = Math.max(b, e[p]);
        for (p = 1; p < f; p += 2) d = Math.min(d, e[p]), c = Math.max(c, e[p])
      });
      return this.$bounds = new z(a, d, b - a, c - d)
    };
    b.prototype.vpoints = function(a) {
      this.visit(function(b) {
        b = b.pts;
        for (var d = b.length, c = 0; c < d; c += 2) {
          var e = a(b[c], b[c + 1]);
          e && (b[c] = e[0], b[c + 1] = e[1])
        }
      })
    };
    b.prototype.shift = function(a) {
      this.vpoints(function(b, d) {
        return [b + a[0], d + a[1]]
      });
      return this
    };
    b.prototype.zoom = function(a) {
      this.vpoints(function(b, d) {
        return [b * a[0], d * a[1]]
      });
      return this
    };
    b.prototype.normalize = function() {
      var a = this.bounds(),
        b = Math.floor(a.width / 2),
        d = Math.floor(a.height / 2),
        c = a.x,
        e = a.y;
      this.vpoints(function(a, p) {
        return [a - c - b, p - e - d]
      });
      return [b, d]
    };
    b.prototype.getPoints = function() {
      var a = [];
      this.visit(function(b) {
        a = a.concat(b.pts)
      });
      return a
    };
    b.prototype.toString = function() {
      return "[ Path '" + b.toSVGString(this) + "' ]"
    };
    b.prototype.clone = function() {
      var a = new b;
      this.visit(function(b) {
        a.add(b.clone())
      });
      clone.closed = this.closed;
      return a
    };
    b.prototype.invalidate = function() {
      this.cached_len = void 0;
      this.cached_hits = {};
      this.$bounds = null
    };
    b.prototype.reset = function() {
      this.segs = [];
      this.closed = !1
    };
    b.prototype.dispose = function() {};
    b.prototype.updatePath2D = function(a) {
      w && !this._p2dCurrent && (a = a || b.toSVGString(this), this.path2d = new t.Path2D(a), this._p2dCurrent = !0)
    };
    b.toSVGString = function(a) {
      var b = [];
      a.visit(y, b);
      b.push("Z");
      return b.join(" ")
    };
    var y = function(a, b) {
      b.push(a.toString())
    };
    b.parse = function(a, d) {
      d =
        d || new b;
      d.segs = [];
      for (var c = a.match(/[a-z][^a-z]*/ig), e = 0; e < c.length; e++) {
        var f = b.parseSegment(c[e]);
        f && d.segs.push(f)
      }
      d.str = a;
      return d
    };
    b.parseSegment = function(a) {
      a = a.toUpperCase();
      var b = a.substring(1).trim().replace(/,/g, " ").split(" ").map(function(a) {
        return parseFloat(a)
      });
      switch (a[0]) {
        case "M":
          return new f(b);
        case "L":
          return new d(b);
        case "C":
          return new n(b);
        default:
          return null
      }
    };
    v.exports = b
  }, {
    "../constants.js": 12,
    "../utils.js": 39,
    "./bounds.js": 16,
    "./brush.js": 17,
    "./segments.js": 20,
    engine: 40
  }],
  20: [function(c, v, k) {
    function b(a) {
      this.pts = a
    }

    function e(a) {
      this.pts = a
    }

    function a(a) {
      this.pts = a;
      this._cachedStart = null;
      this._length = 0
    }
    c("../constants.js");
    b.prototype.draw = function(a) {
      a.moveTo(this.pts[0], this.pts[1])
    };
    b.prototype.length = function(a) {
      return 0
    };
    b.prototype.findT = function(a, b) {
      return 0
    };
    b.prototype.atDist = function(a, b) {
      return this.atT(a, null)
    };
    b.prototype.atT = function(a, b) {
      return [this.pts[0], this.pts[1]]
    };
    b.prototype.tangentAt = function(a, b) {
      return 0
    };
    b.prototype.crossings = function(a,
      b, c) {
      return 0
    };
    b.prototype.last = function() {
      return [this.pts[0], this.pts[1]]
    };
    b.prototype.toString = function() {
      return "M" + this.pts.join(" ")
    };
    b.prototype.clone = function() {
      return new b(this.pts)
    };
    e.prototype.draw = function(a) {
      a.lineTo(this.pts[0], this.pts[1])
    };
    e.prototype.length = function(a) {
      var b = this.pts[0] - a[0];
      a = this.pts[1] - a[1];
      return Math.sqrt(b * b + a * a)
    };
    e.prototype.findT = function(a, b) {
      if (0 >= b) return 0;
      var c = this.length(a);
      return b >= c ? 1 : b / c
    };
    e.prototype.atDist = function(a, b) {
      return this.atT(a, this.findT(a,
        b))
    };
    e.prototype.atT = function(a, b) {
      var c = a[0],
        e = a[1];
      return [c + (this.pts[0] - c) * b, e + (this.pts[1] - e) * b]
    };
    e.prototype.tangentAt = function(a, b) {
      return Math.atan2(this.pts[1] - a[1], this.pts[0] - a[0])
    };
    e.prototype.crossings = function(a, b, c) {
      return f.line(b, c, a[0], a[1], this.pts[0], this.pts[1])
    };
    e.prototype.last = function() {
      return [this.pts[0], this.pts[1]]
    };
    e.prototype.toString = function() {
      return "L" + this.pts.join(" ")
    };
    e.prototype.clone = function() {
      return new e(this.pts)
    };
    a.prototype.draw = function(a) {
      a.bezierCurveTo(this.pts[0],
        this.pts[1], this.pts[2], this.pts[3], this.pts[4], this.pts[5])
    };
    a.prototype.length = function(a) {
      if (this._cachedStart && this._cachedStart[0] === a[0] && this._cachedStart[1] === a[1]) return this._length;
      this._cachedStart = a;
      return this._length = this.findLengthAndT(a, Number.MAX_VALUE)[0]
    };
    a.prototype.findT = function(a, b) {
      return this.findLengthAndT(a, b)[1]
    };
    a.prototype.findLengthAndT = function(a, b) {
      for (var c = this.pts, e = a[0], f = a[1], r = c[0], z = c[1], y = c[2], x = c[3], A = c[4], u = c[5], c = Math.sqrt(Math.pow(r - e, 2) + Math.pow(z - f,
          2)) + Math.sqrt(Math.pow(y - r, 2) + Math.pow(x - z, 2)) + Math.sqrt(Math.pow(A - y, 2) + Math.pow(u - x, 2)) + 1, B = 1 / c, D = 3 * B, k = D * B, p = B * B * B, m = 2 * k, g = 6 * p, q = e - 2 * r + y, C = f - 2 * z + x, A = 3 * (r - y) - e + A, u = 3 * (z - x) - f + u, x = e, y = f, e = (r - e) * D + q * k + p * A, f = (z - f) * D + C * k + p * u, z = q * m + A * g, m = C * m + u * g, C = A * g, g = u * g, A = q = 0; A < c; A++)
        if (r = x, D = y, x += e, y += f, e += z, f += m, z += C, m += g, q += Math.sqrt((x - r) * (x - r) + (y - D) * (y - D)), q >= b) return [q, B * A];
      return [q, 1]
    };
    a.prototype.atDist = function(a, b) {
      return this.atT(a, this.findT(a, b))
    };
    a.prototype.atT = function(a, b) {
      var c = b * b,
        e = c * b,
        f = 1 - b,
        r =
        f * f,
        z = r * f,
        r = 3 * b * r,
        c = 3 * c * f;
      return [a[0] * z + this.pts[0] * r + this.pts[2] * c + this.pts[4] * e, a[1] * z + this.pts[1] * r + this.pts[3] * c + this.pts[5] * e]
    };
    a.prototype.tangentAt = function(a, b) {
      0 > b && (b = 0);
      1 < b && (b = 1);
      var c = 3 * (1 - b) * (1 - b),
        e = 6 * (1 - b) * b,
        f = 3 * b * b;
      return Math.atan2(c * (this.pts[1] - a[1]) + e * (this.pts[3] - this.pts[1]) + f * (this.pts[5] - this.pts[3]), c * (this.pts[0] - a[0]) + e * (this.pts[2] - this.pts[0]) + f * (this.pts[4] - this.pts[2]))
    };
    a.prototype.crossings = function(a, b, c) {
      var e = this.pts;
      return f.curve(b, c, a[0], a[1], e[0], e[1], e[2],
        e[3], e[4], e[5], 0)
    };
    a.prototype.last = function() {
      return [this.pts[4], this.pts[5]]
    };
    a.prototype._ensure_params = function(a) {
      this._lstart && this._lstart[0] === a[0] && this._lstart[1] === a[1] || (this._lstart = a, this._params = this._calc_params(a))
    };
    a.prototype._calc_params = function(a) {
      var b = this.pts,
        c = [],
        e = a[0];
      a = a[1];
      var f = b[0],
        r = b[1],
        z = b[2],
        y = b[3],
        x = b[5];
      c[0] = b[4] - 3 * z + 3 * f - e;
      c[1] = 3 * z - 6 * f + 3 * e;
      c[2] = 3 * f - 3 * e;
      c[3] = e;
      c[4] = x - 3 * y + 3 * r - a;
      c[5] = 3 * y - 6 * r + 3 * a;
      c[6] = 3 * r - 3 * a;
      c[7] = a;
      return c
    };
    a.prototype.clone = function() {
      return new a(this.pts)
    };
    a.prototype.toString = function() {
      return "C" + this.pts.join(" ")
    };
    var f = {
      curve: function(a, b, c, e, w, r, z, y, x, A, u) {
        if (b < e && b < r && b < y && b < A || b >= e && b >= r && b >= y && b >= A || a >= c && a >= w && a >= z && a >= x) return 0;
        if (a < c && a < w && a < z && a < x) {
          if (b >= e) {
            if (b < A) return 1
          } else if (b >= A) return -1;
          return 0
        }
        if (52 < u) return f.line(a, b, c, e, x, A);
        var B = (w + z) / 2,
          k = (r + y) / 2;
        w = (c + w) / 2;
        r = (e + r) / 2;
        z = (z + x) / 2;
        y = (y + A) / 2;
        var v = (w + B) / 2,
          p = (r + k) / 2,
          m = (B + z) / 2,
          g = (k + y) / 2,
          B = (v + m) / 2,
          k = (p + g) / 2;
        return isNaN(B) || isNaN(k) ? 0 : f.curve(a, b, c, e, w, r, v, p, B, k, u + 1) + f.curve(a, b,
          B, k, m, g, z, y, x, A, u + 1)
      },
      line: function(a, b, c, e, f, r) {
        return b < e && b < r || b >= e && b >= r || a >= c && a >= f ? 0 : a < c && a < f ? e < r ? 1 : -1 : a >= c + (b - e) * (f - c) / (r - e) ? 0 : e < r ? 1 : -1
      }
    };
    v.exports = {
      MSeg: b,
      LSeg: e,
      CSeg: a,
      Crossings: f
    }
  }, {
    "../constants.js": 12
  }],
  21: [function(c, v, k) {
    k = c("../animation/element.js");
    var b = c("./path.js");
    c = c("./segments.js");
    var e = c.MSeg,
      a = c.LSeg;
    k.prototype.dot = function() {
      var a = this;
      this.paint(function(b) {
        b.beginPath();
        b.arc(0, 0, 3, 0, 2 * Math.PI, !1);
        b.closePath();
        a.applyBrushes(b)
      });
      return this
    };
    k.prototype.rect = function(c,
      d) {
      d = d || c;
      var n = new b;
      n.add(new e([0, 0]));
      n.add(new a([0 + c, 0]));
      n.add(new a([0 + c, 0 + d]));
      n.add(new a([0, 0 + d]));
      n.add(new a([0, 0]));
      this.path(n);
      return this
    };
    k.prototype.oval = function(a, b) {
      var c = this,
        e = a / 2,
        t = b ? b / 2 : e;
      this.paint(function(a) {
        a.ellipse && (a.beginPath(), a.ellipse(0, 0, e, t, 0, 0, 2 * Math.PI, !1), a.closePath(), c.applyBrushes(a))
      });
      return this
    };
    k.prototype.triangle = function(c, d) {
      d = d || c;
      var n = c / 2,
        h = new b;
      h.add(new e([0 + n, 0]));
      h.add(new a([0 + c, 0 + d]));
      h.add(new a([0, 0 + d]));
      h.add(new a([0 + n, 0]));
      this.path(h);
      return this
    };
    v.exports = {}
  }, {
    "../animation/element.js": 6,
    "./path.js": 19,
    "./segments.js": 20
  }],
  22: [function(c, v, k) {
    function b(a, c, d) {
      this.id = b.instances++;
      this.src = a;
      this._dimen = [0, 0];
      this.regions = [
        [0, 0, 1, 1]
      ];
      this.regions_f = null;
      this.cur_region = d || 0;
      this.wasError = this.ready = !1;
      this._image = null;
      this._callback = c;
      this._thumbnail = !1
    }
    var e = c("../conf.js"),
      a = c("../log.js"),
      f = c("engine"),
      d = c("../resource_manager.js"),
      n = c("../errors.js"),
      h = c("./bounds.js");
    b.instances = 0;
    b.MISSED_SIDE = 50;
    b.prototype.load = function(b,
      c, h, z) {
      h = h || this._callback;
      if (this._image) throw n.element("Image already loaded", b);
      var y = this;
      y.src ? d.loadOrGet(b, y.src, function(a, b, c) {
        c = f.checkMediaUrl(y.src);
        if (!y._thumbnail && e.doNotLoadImages) b("Loading images is turned off");
        else {
          var d = new Image,
            h = f.getAnmProps(d);
          d.onload = d.onreadystatechange = function() {
            h.ready || (this.readyState && "complete" !== this.readyState && b(this.readyState), h.ready = !0, d.isReady = !0, a(d))
          };
          d.onerror = b;
          d.addEventListener("error", b, !1);
          try {
            d.src = c
          } catch (r) {
            b(r)
          }
        }
      }, function(a) {
        y._image =
          a;
        y._dimen = [a.width, a.height];
        y.ready = !0;
        h && h.call(y, a)
      }, function(b) {
        a.error(b.srcElement || b.path, b.message || b);
        y.ready = !0;
        var c = y.wasError = !0;
        z && (c = !z.call(y, b));
        if (c) throw n.element(b ? b.message : "Unknown", elm);
      }) : (a.error("Empty source URL for image"), y.ready = !0, y.wasError = !0, z && z.call(y, "Empty source"))
    };
    b.prototype.updateRegion = function() {
      if (!(0 > this.cur_region)) {
        var a;
        if (this.region_f) a = this.region_f(this.cur_region);
        else {
          a = this.regions[this.cur_region];
          var b = this._dimen;
          a = [a[0] * b[0], a[1] * b[1],
            a[2] * b[0], a[3] * b[1]
          ]
        }
        this.region = a
      }
    };
    b.prototype.apply = function(a) {
      if (this.ready)
        if (this.wasError) this.applyMissed(a);
        else {
          this.updateRegion();
          var b = this.region;
          a.drawImage(this._image, b[0], b[1], b[2], b[3], 0, 0, b[2], b[3])
        }
    };
    b.prototype.applyMissed = function(a) {
      a.save();
      a.strokeStyle = "#900";
      a.lineWidth = 1;
      a.beginPath();
      var c = b.MISSED_SIDE;
      a.moveTo(0, 0);
      a.lineTo(c, 0);
      a.lineTo(0, c);
      a.lineTo(c, c);
      a.lineTo(0, 0);
      a.lineTo(0, c);
      a.lineTo(c, 0);
      a.lineTo(c, c);
      a.stroke();
      a.restore()
    };
    b.MISSED_BOUNDS = new h(0, 0, b.MISSED_SIDE,
      b.MISSED_SIDE);
    b.prototype.bounds = function() {
      if (this.wasError) return b.MISSED_BOUNDS;
      if (!this.ready) return h.NONE;
      this.region || this.updateRegion();
      var a = this.region;
      return new h(0, 0, a[2], a[3])
    };
    b.prototype.inside = function(a) {
      return !0
    };
    b.prototype.clone = function() {
      return new b(this.src)
    };
    b.prototype.invalidate = function() {};
    b.prototype.reset = function() {};
    b.prototype.dispose = function() {};
    v.exports = b
  }, {
    "../conf.js": 11,
    "../errors.js": 13,
    "../log.js": 28,
    "../resource_manager.js": 35,
    "./bounds.js": 16,
    engine: 40
  }],
  23: [function(c, v, k) {
    function b(c, d, e, f, z) {
      this.lines = c;
      this.$font = d || b.DEFAULT_FONT;
      this.$align = e || b.DEFAULT_ALIGN;
      this.baseline = f || b.DEFAULT_BASELINE;
      this.underlined = a.defined(z) ? z : b.DEFAULT_UNDERLINE;
      this.size = -1;
      this.$bounds = null
    }
    var e = c("../constants.js"),
      a = c("../utils.js").is,
      f = c("../errors.js");
    k = c("engine");
    var d = c("./brush.js"),
      n = c("./bounds.js");
    b.DEFAULT_FFACE = "sans-serif";
    b.DEFAULT_FSIZE = 24;
    b.DEFAULT_FONT = b.DEFAULT_FSIZE + "px " + b.DEFAULT_FFACE;
    b.DEFAULT_ALIGN = e.TA_LEFT;
    b.DEFAULT_BASELINE =
      e.BL_MIDDLE;
    b.DEFAULT_UNDERLINE = !1;
    b.__measuring_f = k.createTextMeasurer();
    b.prototype.apply = function(a, c, e, f) {
      var z = this.bounds(),
        y = z.height / this.lineCount(),
        x = this.underlined;
      a.font = this.$font;
      a.textBaseline = this.baseline || b.DEFAULT_BASELINE;
      a.textAlign = this.$align || b.DEFAULT_ALIGN;
      var n = this.ascent(y, a.textBaseline),
        u = this.xOffset(z.width, a.textAlign),
        B;
      f ? f.apply(a) : d.clearShadow(a);
      c ? (c.apply(a), B = 0, this.visitLines(function(b) {
        a.fillText(b, u, B + n);
        B += y
      })) : d.clearFill(a);
      f && d.clearShadow(a);
      e ? (e.apply(a),
        B = 0, this.visitLines(function(b) {
          a.strokeText(b, u, B + n);
          B += y
        })) : d.clearStroke(a);
      if (x && c) {
        B = 0;
        e = d.stroke(c, 1);
        e.apply(a);
        var k = null,
          v = 0,
          p = this;
        this.visitLines(function(c) {
          k = b.bounds(p, c);
          v = k.width;
          a.beginPath();
          a.moveTo(u, B + y);
          a.lineTo(v, B + y);
          a.stroke();
          B += y
        })
      }
    };
    b.prototype.font = function(a) {
      if (!a) return this.$font;
      this.$font = a;
      return this
    };
    b.prototype.align = function(a) {
      if (!a) return this.$align;
      this.$align = a;
      return this
    };
    b.prototype.bounds = function() {
      return this.$bounds ? this.$bounds : this.$bounds = b.bounds(this,
        this.lines)
    };
    b.prototype.inside = function(a) {
      return !0
    };
    b.prototype.ascent = function(a, b) {
      return b == e.BL_MIDDLE ? a / 2 : a
    };
    b.prototype.xOffset = function(a, b) {
      return b == e.TA_LEFT ? 0 : b == e.TA_CENTER ? a / 2 : b == e.TA_RIGHT ? a : 0
    };
    b.prototype.lineCount = function() {
      var b = this.lines;
      return a.arr(b) ? b.length : 1
    };
    b.prototype.visitLines = function(b, c) {
      var d = this.lines;
      if (a.arr(d))
        for (var e, f = 0, y = d.length; f < y; f++) e = d[f], b(e);
      else b(d.toString())
    };
    b.prototype.clone = function() {
      var a = new b(this.lines, this.$font);
      this.lines && Array.isArray(this.lines) &&
        (a.lines = [].concat(this.lines));
      return a
    };
    b.prototype.invalidate = function() {
      this.$bounds = null
    };
    b.prototype.reset = function() {};
    b.prototype.dispose = function() {};
    b.bounds = function(a, c) {
      if (!b.__measuring_f) throw f.system("no Text buffer, bounds call failed");
      var d = b.__measuring_f(a, c);
      return new n(0, 0, d[0], d[1])
    };
    v.exports = b
  }, {
    "../constants.js": 12,
    "../errors.js": 13,
    "../utils.js": 39,
    "./bounds.js": 16,
    "./brush.js": 17,
    engine: 40
  }],
  24: [function(c, v, k) {
    var b = c("./errors.js"),
      e = {
        register: function(a, c) {
          if (e[a]) throw b.system("Importer " +
            a + " is already registered!");
          e[a] = c
        },
        get: function(a) {
          if (!e[a]) throw b.system("Importer " + a + " is not registered!");
          return e[a]
        },
        create: function(a) {
          if (!e[a]) throw b.system("Importer " + a + " is not registered!");
          return new e[a]
        },
        isAccessible: function(a) {
          return "undefined" !== typeof e[a]
        }
      };
    v.exports = e
  }, {
    "./errors.js": 13
  }],
  25: [function(c, v, k) {
    var b = c("engine"),
      e = c("../constants.js"),
      a = {
        play: function() {
          this.play()
        },
        pause: function() {
          this.pause()
        },
        getPaused: function() {
          return this.state.happens === e.PAUSED
        },
        mute: function() {
          this.mute()
        },
        unmute: function() {
          this.unmute()
        },
        isMuted: function() {
          return this.muted
        },
        setVolume: function(a) {
          y.volume(a.value / 100)
        },
        getVolume: function() {
          return 100 * y.volume()
        },
        getDuration: function() {
          return y.state.duration
        },
        setCurrentTime: function(a) {
          a = a.value;
          this.pause().play(a)
        },
        getCurrentTime: function() {
          return this.state.time
        },
        setLoop: function(a) {
          this.repeat = a.value
        },
        getLoop: function() {
          return this.repeat
        },
        addEventListener: function(a) {
          var b = a.value;
          a = a.listener;
          if (f[b] && -1 === f[b].indexOf(a)) return f[b].push(a), {}
        },
        removeEventListener: function(a) {
          var b = a.value;
          a = a.listener;
          f[b] && (a ? (a = f[b].indexOf(a), -1 !== a && f[b].splice(a, 1)) : f[b] = [])
        }
      },
      f = {
        progress: [],
        timeupdate: [],
        play: [],
        pause: [],
        ended: []
      },
      d = ["ready"],
      n;
    for (n in f) d.push(n);
    var h = [],
      t;
    for (t in a) h.push(t);
    var w = b.getIframeOrigin();
    c = function(c) {
      var d;
      try {
        d = JSON.parse(c.data)
      } catch (e) {
        d = {}
      }
      c.origin === w && "player.js" === d.context && a[d.method] && y && (c = a[d.method].call(y, d), b.postToContentWindow({
        context: "player.js",
        version: "0.0.10",
        event: d.method,
        listener: d.listener,
        value: c
      }))
    };
    b.isInIframe() && b.addMessageListener(c);
    var r = function(a, c, d) {
        c = {
          context: "player.js",
          version: "0.0.10",
          event: a,
          value: c || {}
        };
        if (d) b.postToContentWindow(c);
        else if (f[a] && 0 !== f[a].length)
          for (d = 0; d < f[a].length; d++) c.listener = f[a][d], b.postToContentWindow(c)
      },
      z = function(a) {
        b.isInIframe() && (a.on(e.S_LOAD, function() {
          r("ready", {
            src: b.getIframeSrc(),
            events: d,
            methods: h
          }, !0)
        }), a.on(e.S_LOADING_PROGRESS, function(a) {
          r("progress", {
            percent: 100 * a
          })
        }), a.on(e.S_PLAY, function() {
          r("play")
        }), a.on(e.S_PAUSE,
          function() {
            r("pause")
          }), a.on(e.S_COMPLETE, function() {
          r("ended")
        }), a.on(e.S_TIME_UPDATE, function(b) {
          r("timeupdate", {
            seconds: b,
            duration: a.state ? a.state.duration : b
          })
        }))
      },
      y;
    v.exports = {
      setPlayer: function(a) {
        y = a;
        z(a)
      }
    }
  }, {
    "../constants.js": 12,
    engine: 40
  }],
  26: [function(c, v, k) {
    var b = c("./utils.js"),
      e = b.is,
      a = c("./loc.js").Errors,
      f = c("./errors.js"),
      d = c("./constants.js"),
      n = c("./global_opts.js"),
      h = c("engine"),
      t = c("./animation/animation.js"),
      w = {
        loadAnimation: function(a, b, c) {
          a.anim && a.anim.dispose(a);
          b.playedIn(a);
          a.debug && !n.liveDebug && b.traverse(function(a) {
            a.addDebugRender()
          });
          b.width && b.height ? a.forceAnimationSize && a._resize(b.width, b.height) : (b.width = a.width, b.height = a.height);
          a.anim = b;
          b.actions && w.applyActions(a, b, b.actions);
          c && c.call(a, b);
          a._checkOpts()
        },
        loadFromUrl: function(c, d, e, n) {
          if (!JSON) throw f.system(a.S.NO_JSON_PARSER, c);
          e = e || anm.importers.create("animatron");
          var u = d.split("?");
          d = u[0];
          var t = (u = u[1]) && 0 < u.length ? b.paramsToObj(u) : {};
          if (u = r(t)) c._addOpts(u), c._checkOpts();
          var k = function(c) {
              throw f.system(b.strf(a.P.SNAPSHOT_LOADING_FAILED, [c ? c.message || c : "\u00bfPor qu\u00e9?"]));
            },
            u = h.getCookie("_animatronauth");
          h.ajax(d, function(a) {
            try {
              w.loadFromObj(c, JSON.parse(a.responseText), e, function(a) {
                n && n.call(c, a);
                c._applyUrlParamsToAnimation(t)
              })
            } catch (b) {
              k(b)
            }
          }, k, "GET", u ? {
            "Animatron-Security-Token": u
          } : null)
        },
        loadFromObj: function(b, c, e, h) {
          if (!e) throw f.player(a.P.NO_IMPORTER_TO_LOAD_WITH, b);
          var u = e.load(c);
          b.fire(d.S_IMPORT, e, u, c);
          w.loadAnimation(b, u, h)
        },
        loadElements: function(a, b, c) {
          var d = new t;
          d.add(b);
          w.loadAnimation(a, d, c)
        },
        applyActions: function(a,
          b, c) {
          eval("(function(p, a){" + c + ";actions.call(p,a);})")(a, b);
          a.handleEvents = !0
        }
      },
      r = function(a) {
        function b(a) {
          if (!a || 0 === a || "0" == a) return !1;
          if (1 == a) return !0;
          if ("false" == a) return !1;
          if ("true" == a) return !0;
          if ("off" == a) return !1;
          if ("on" == a) return !0;
          if ("no" == a) return !1;
          if ("yes" == a) return !0
        }

        function c() {
          for (var d = arguments, f = 0; f < d.length; f++)
            if (e.defined(a[d[f]])) return b(a[d[f]])
        }
        var d = {};
        d.debug = e.defined(a.debug) ? b(a.debug) : void 0;
        d.muteErrors = c("me", "muterrors");
        d.repeat = c("r", "repeat");
        d.autoPlay = c("a",
          "auto", "autoplay");
        d.mode = a.m || a.mode || void 0;
        d.zoom = a.z || a.zoom;
        d.speed = a.v || a.speed;
        d.width = a.w || a.width;
        d.height = a.h || a.height;
        d.infiniteDuration = c("i", "inf", "infinite");
        d.audioEnabled = c("s", "snd", "sound", "audio");
        d.handleEvents = c("he", "events");
        d.controlsEnabled = c("c", "controls");
        d.controlsInvisible = c("controlsInvisible");
        d.infoEnabled = c("info");
        d.loadingMode = a.lm || a.lmode || a.loadingmode || void 0;
        d.thumbnail = a.th || a.thumb || void 0;
        d.bgColor = a.bg || a.bgcolor;
        d.ribbonsColor = a.rc || a.ribbons || a.ribcolor;
        return d
      };
    v.exports = w
  }, {
    "./animation/animation.js": 3,
    "./constants.js": 12,
    "./errors.js": 13,
    "./global_opts.js": 15,
    "./loc.js": 27,
    "./utils.js": 39,
    engine: 40
  }],
  27: [function(c, v, k) {
    c = {
      S: {},
      P: {},
      A: {}
    };
    c.S.CANVAS_NOT_SUPPORTED = "Your browser does not support HTML5 canvas, so we cannot play anything for you.";
    c.S.SAD_SMILEY_HTML = '<span style="font-size: 4em;">:(</span><br>' + c.S.CANVAS_NOT_SUPPORTED;
    c.S.NO_JSON_PARSER = "JSON parser is not accessible";
    c.S.ERROR_HANDLING_FAILED = "Error-handling mechanics were broken with error {0}";
    c.S.NO_METHOD_FOR_PLAYER = "No method '{0}' exist for player";
    c.P.NO_IMPORTER_TO_LOAD_WITH = "Cannot load this project without importer. Please define it";
    c.P.NO_WRAPPER_WITH_ID = "No element found with given id: {0}";
    c.P.NO_WRAPPER_WAS_PASSED = "No element was passed to player initializer";
    c.P.CANVAS_NOT_VERIFIED = "Canvas is not verified by the provider";
    c.P.CANVAS_NOT_PREPARED = "Canvas is not prepared, don't forget to call 'init' method";
    c.P.ALREADY_PLAYING = "Player is already in playing mode, please call 'stop' or 'pause' before playing again";
    c.P.PAUSING_WHEN_STOPPED = "Player is stopped, so it is not allowed to pause";
    c.P.NO_ANIMATION_PASSED = "No animation passed to load method";
    c.P.NO_STATE = "There's no player state defined, nowhere to draw, please load something in player before calling its playing-related methods";
    c.P.NO_ANIMATION = "There's nothing at all to manage with, please load something in player before calling its playing-related methods";
    c.P.COULD_NOT_LOAD_WHILE_PLAYING = "Could not load any animation while playing or paused, please stop player before loading";
    c.P.LOAD_WAS_ALREADY_POSTPONED = "Load was called while loading process was already in progress";
    c.P.NO_LOAD_CALL_BEFORE_PLAY = "No animation was loaded into player before the request to play";
    c.P.BEFOREFRAME_BEFORE_PLAY = "Please assign beforeFrame callback before calling play()";
    c.P.AFTERFRAME_BEFORE_PLAY = "Please assign afterFrame callback before calling play()";
    c.P.BEFORERENDER_BEFORE_PLAY = "Please assign beforeRender callback before calling play()";
    c.P.AFTERRENDER_BEFORE_PLAY = "Please assign afterRender callback before calling play()";
    c.P.PASSED_TIME_VALUE_IS_NO_TIME = "Given time is not allowed, it is treated as no-time";
    c.P.PASSED_TIME_NOT_IN_RANGE = "Passed time ({0}) is not in animation range";
    c.P.DURATION_IS_NOT_KNOWN = "Duration is not known";
    c.P.ALREADY_ATTACHED = "Player is already attached to this canvas, please use another one";
    c.P.INIT_TWICE = "Initialization was called twice";
    c.P.INIT_AFTER_LOAD = "Initialization was called after loading a animation";
    c.P.SNAPSHOT_LOADING_FAILED = "Snapshot failed to load ({0})";
    c.P.IMPORTER_CONSTRUCTOR_PASSED =
      "You've passed importer constructor to snapshot loader, but not an instance! Probably you used anm.importers.get instead of anm.importers.create.";
    c.P.DOM_NOT_READY = "Document in not yet ready, please consider moving your initialization script to the bottom of your web page";
    c.A.OBJECT_IS_NOT_ELEMENT = "It appears that you've passed not an instance of anm.Element";
    c.A.ELEMENT_IS_REGISTERED = "This element is already registered in animation";
    c.A.ELEMENT_IS_NOT_REGISTERED = "There is no such element registered in animation";
    c.A.UNSAFE_TO_REMOVE = "Unsafe to remove, please use iterator-based looping (with returning false from iterating function) to remove safely";
    c.A.NO_ELEMENT_TO_REMOVE = "Please pass some element or use detach() method";
    c.A.NO_ELEMENT = "No such element found";
    c.A.ELEMENT_NOT_ATTACHED = "Element is not attached to something at all";
    c.A.MODIFIER_NOT_ATTACHED = "Modifier wasn't applied to anything";
    c.A.NO_MODIFIER_PASSED = "No modifier was passed";
    c.A.NO_PAINTER_PASSED = "No painter was passed";
    c.A.MODIFIER_REGISTERED =
      "Modifier was already added to this element";
    c.A.PAINTER_REGISTERED = "Painter was already added to this element";
    c.A.RESOURCES_FAILED_TO_LOAD = "Some of resources required to play this animation were failed to load";
    c.A.MASK_SHOULD_BE_ATTACHED_TO_ANIMATION = "Element to be masked should be attached to animation when rendering";
    v.exports = {
      Strings: {
        COPYRIGHT: "Animatron Player",
        LOADING: "Loading...",
        LOADING_ANIMATION: "Loading {0}..."
      },
      Errors: c
    }
  }, {}],
  28: [function(c, v, k) {
    (function(b) {
      var e, a, f, d, n = c("./conf.js"),
        h = c("./constants.js"),
        t = function() {},
        w = b.console || {
          log: t,
          info: t,
          warn: t,
          error: t
        };
      b.console && (e = w.debug || w.log, a = w.info || w.log, f = w.warn || w.log, d = w.error || w.log, w.log.apply || (e = Function.prototype.bind.call(e, w), a = Function.prototype.bind.call(a, w), f = Function.prototype.bind.call(f, w), d = Function.prototype.bind.call(e, w)));
      v.exports = {
        debug: function() {
          n.logLevel & h.L_DEBUG && e.apply(w, arguments)
        },
        info: function() {
          n.logLevel & h.L_INFO && a.apply(w, arguments)
        },
        warn: function() {
          n.logLevel & h.L_WARN && f.apply(w, arguments)
        },
        error: function() {
          n.logLevel & h.L_ERROR && d.apply(w, arguments)
        }
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
  }, {
    "./conf.js": 11,
    "./constants.js": 12
  }],
  29: [function(c, v, k) {
    (function(b) {
      function e(a) {
        this.url = /\.\w+$/i.test(a) ? a : a + w;
        this.canPlay = this.playing = this.ready = !1;
        this.volume = 1;
        this.audio = null
      }

      function a(a, b) {
        return function(c) {
          b(Error("Failed to load audio file from " + a + " with error code: " + (c && c.currentTarget && c.currentTarget.error) ?
            c.currentTarget.error.code : "Unknown"))
        }
      }
      c("../conf.js");
      var f = c("../log.js");
      c("../utils.js");
      var d = c("../constants.js");
      c("../errors.js");
      var n = c("engine"),
        h = c("../resource_manager.js"),
        t = n.createAudio(),
        w = t.canPlayType && t.canPlayType("audio/ogg;").replace(/no/, "") ? ".ogg" : ".mp3",
        r = function() {
          if (n.isLocal) return null;
          var a = b.AudioContext || b.webkitAudioContext;
          if (!a) return null;
          if (b.anmAudioContext) return b.anmAudioContext;
          try {
            var c = new a;
            return b.anmAudioContext = c
          } catch (d) {
            return null
          }
        }();
      e.prototype.load =
        function(b, c) {
          var d = this;
          h.loadOrGet(b, d.url, function(b, c, e) {
            var f = n.checkMediaUrl(d.url);
            if (anm.conf.doNotLoadAudio) c("Loading audio is turned off");
            else if (r) {
              var h = {},
                p = function(a, g) {
                  try {
                    r.decodeAudioData(a.buf, function(a) {
                      b(a)
                    }, function(b) {
                      var c = new Uint8Array(a.buf);
                      c.indexOf = Array.prototype.indexOf;
                      for (b = a.sync;;) {
                        a.retry++;
                        b = c.indexOf(255, b);
                        if (-1 == b || c[b + 1] & 1) break;
                        b++
                      } - 1 != b ? (c = a.buf.slice(b), delete a.buf, a.buf = c, a.sync = b, b = !0) : b = !1;
                      b && p(a, g)
                    })
                  } catch (d) {
                    c("Unable to load audio " + g + ": " + d.message)
                  }
                };
              h.xhr = new XMLHttpRequest;
              h.xhr.open("GET", f, !0);
              h.xhr.responseType = "arraybuffer";
              h.xhr.addEventListener("load", function(a) {
                a = a.target;
                200 == a.status ? (h.buf = a.response, h.sync = 0, h.retry = 0, p(h)) : c("Unable to load audio " + f + ": " + a.statusText)
              }, !1);
              h.xhr.addEventListener("error", a(f, c), !1);
              h.xhr.send()
            } else {
              var m = n.createAudio();
              m.setAttribute("preload", "auto");
              var g = function(a) {
                  a = m.buffered;
                  1 == a.length ? 4 === m.readyState || 3 === m.readyState ? (n.unsubscribeElementEvents(m, {
                      progress: y,
                      loadedmetadata: q,
                      canplay: t
                    }),
                    b(m), e(1)) : d.canPlay && window.chrome && (m.volume = 0, m.currentTime = a.end(0), m.play(), m.pause()) : d.canPlay && 1 != a.length && (n.unsubscribeElementEvents(m, {
                    progress: y,
                    loadedmetadata: q,
                    canplay: t
                  }), b(m), e(1))
                },
                q = function(a) {
                  a = [];
                  for (var b = 0; b < m.buffered.length; b++) a.push([m.buffered.start(b), m.buffered.end(b)]);
                  for (progress = b = 0; b < m.buffered.length; b++) progress += 1 / m.duration * (a[b][1] - a[b][0]);
                  e(progress)
                },
                y = function(a) {
                  g(a);
                  q(a)
                },
                t = function(a) {
                  d.canPlay = !0;
                  g(a)
                };
              n.subscribeElementEvents(m, {
                progress: y,
                loadedmetadata: q,
                canplay: t,
                error: a(f, c)
              });
              var I = function(a, b, g) {
                var d = n.createSource();
                d.addEventListener("error", c, !1);
                d.type = g;
                d.src = b;
                a.appendChild(d)
              };
              try {
                var w = d.url.substring(d.url.lastIndexOf(".") + 1);
                I(m, f, "ogg" === w ? "audio/ogg" : "audio/mp3");
                n.appendToBody(m)
              } catch (z) {
                c(z)
              }
            }
          }, function(a) {
            d.audio = a;
            d.ready = !0;
            d.shouldPlayWhenReady && (d.play(d.shouldPlayParams.ltime, d.shouldPlayParams.duration), d.shouldPlayWhenReady = !1);
            c.muted && d.mute()
          }, function(a) {
            f.error(a ? a.message || a : "Unknown error")
          })
        };
      e.prototype.play =
        function(a, b) {
          if (this.playing) return !1;
          if (this.ready) {
            this.playing = !0;
            var c = this.offset + a;
            r ? c > this.audio.duration ? this._audio_is_playing = !1 : (this._source = r.createBufferSource(), this._source.buffer = this.audio, this._gain = r.createGain(), this._source.connect(this._gain), this._gain.connect(r.destination), this._gain.gain.value = this.volume, this._source.play ? this._source.play(0, c) : this._source.start ? this._source.start(0, c, this._source.buffer.duration - c) : this._source.noteGrainOn(0, c, this._source.buffer.duration -
              c)) : (this.audio.currentTime = c, this.audio.volume = this.volume, this.audio.play())
          } else this.shouldPlayWhenReady = !0, this.shouldPlayParams = {
            ltime: a,
            duration: b
          }
        };
      e.prototype.stop = function() {
        if (this.playing) {
          try {
            r ? (this._source.stop ? this._source.stop(0) : this._source.noteOff(0), this._source = null) : (this.audio.pause(), this.audio.volume = 0)
          } catch (a) {}
          this.playing = !1
        }
      };
      e.prototype.stopIfNotMaster = function() {
        this.master || this.stop()
      };
      e.prototype.setVolume = function(a) {
        if (this.muted) this.unmuteVolume = a;
        else return this.volume =
          a, this._gain ? this._gain.gain.value = a : this.audio && (this.audio.volume = a), this
      };
      e.prototype.mute = function() {
        this.muted || (this.unmuteVolume = this.volume, this.setVolume(0), this.muted = !0)
      };
      e.prototype.unmute = function() {
        this.muted && (this.muted = !1, this.setVolume(this.unmuteVolume))
      };
      e.prototype.toggleMute = function() {
        this.muted ? this.unmute() : this.mute()
      };
      e.prototype.connect = function(a, b) {
        var c = this;
        a.on(d.X_START, function() {
          c.play.apply(c, arguments)
        });
        a.on(d.X_STOP, function() {
          c.stopIfNotMaster()
        });
        var e = function() {
          c.stop()
        };
        b.on(d.A_STOP, e);
        b.on(d.A_PAUSE, e)
      };
      e.prototype.clone = function() {
        var a = new e("");
        a.url = this.url;
        a.offset = this.offset;
        return a
      };
      v.exports = e
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
  }, {
    "../conf.js": 11,
    "../constants.js": 12,
    "../errors.js": 13,
    "../log.js": 28,
    "../resource_manager.js": 35,
    "../utils.js": 39,
    engine: 40
  }],
  30: [function(c, v, k) {
    function b(a, b, c) {
      this.url = a;
      this.formats = b;
      this.size = c;
      this.playing = this.ready = !1
    }

    function e(a,
      b) {
      return function(c) {
        b(Error("Failed to load video file from " + a + " with error code: " + (c && c.currentTarget && c.currentTarget.error) ? c.currentTarget.error.code : "Unknown"))
      }
    }
    c("../conf.js");
    var a = c("../log.js"),
      f = c("../constants.js");
    c("../errors.js");
    var d = c("engine"),
      n = c("../resource_manager.js"),
      h = c("../graphics/bounds.js");
    b.prototype.connect = function(a, b) {
      var c = this;
      a.on(f.X_START, function() {
        c.play.apply(c, arguments)
      });
      var d = function() {
        c.stop()
      };
      a.on(f.X_STOP, d);
      b.on(f.A_STOP, d);
      b.on(f.A_PAUSE,
        d)
    };
    b.prototype.load = function(b, c) {
      var f = this;
      n.loadOrGet(b, f.url, function(a, b, c) {
        var h = d.checkMediaUrl(f.url),
          u = f.formats,
          n = d.createVideo(f.size[0], f.size[1]);
        n.setAttribute("preload", "auto");
        n.style.display = "none";
        var t = function(b) {
            1 == n.buffered.length && 4 === n.readyState && (d.unsubscribeElementEvents(n, {
              progress: p,
              loadedmetadata: w,
              canplay: m
            }), a(n), c(1))
          },
          w = function(a) {
            a = [];
            for (var b = 0; b < n.buffered.length; b++) a.push([n.buffered.start(b), n.buffered.end(b)]);
            for (var g = b = 0; b < n.buffered.length; b++) g +=
              1 / n.duration * (a[b][1] - a[b][0]);
            c(g)
          },
          p = function(a) {
            t(a);
            w(a)
          },
          m = function(a) {
            f.canPlay = !0;
            t(a)
          };
        d.subscribeElementEvents(n, {
          progress: p,
          loadedmetadata: w,
          canplay: m,
          error: e(h, b)
        });
        var g = function(a, c, g) {
          var e = d.createSource();
          e.addEventListener("error", b, !1);
          e.type = g;
          e.src = c;
          a.appendChild(e)
        };
        try {
          u ? u.length && u.forEach(function(a) {
            g(n, d.checkMediaUrl(a[0]), a[1])
          }) : g(n, h, "video/mp4"), d.appendToBody(n)
        } catch (q) {
          b(q)
        }
      }, function(a) {
        f.video = a;
        f.ready = !0;
        f.size || (f.size = [a.width, a.height])
      }, function(b) {
        a.error(b ?
          b.message || b : "Unknown error")
      })
    };
    b.prototype.apply = function(a) {
      this.video && a.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, 0, 0, this.size[0], this.size[1])
    };
    b.prototype.bounds = function() {
      return this.$bounds ? this.$bounds : this.video ? this.$bounds = new h(0, 0, this.video.width, this.video.height) : h.NONE
    };
    b.prototype.inside = function(a) {
      return !0
    };
    b.prototype.play = function(a, b) {
      if (!this.ready || this.playing) return !1;
      this.playing = !0;
      this.video.currentTime = (this.offset || 0) + a;
      this.video.play()
    };
    b.prototype.stop = function() {
      this.playing && (this.video.pause(), this.playing = !1)
    };
    b.prototype.invalidate = function() {
      this.$bounds = null
    };
    b.prototype.dispose = function() {};
    b.prototype.clone = function() {
      var a = new b(this.url);
      a.offset = this.offset;
      return a
    };
    v.exports = b
  }, {
    "../conf.js": 11,
    "../constants.js": 12,
    "../errors.js": 13,
    "../graphics/bounds.js": 16,
    "../log.js": 28,
    "../resource_manager.js": 35,
    engine: 40
  }],
  31: [function(c, v, k) {
    var b = c("./errors.js"),
      e = {
        register: function(a, c) {
          if (e[a]) throw b.system("Module " +
            a + " is already registered!");
          e[a] = c
        },
        get: function(a) {
          return e[a]
        },
        isAccessible: function(a) {
          return "undefined" !== typeof e[a]
        }
      };
    v.exports = e
  }, {
    "./errors.js": 13
  }],
  32: [function(c, v, k) {
    function b() {
      this.id = "";
      this.controls = this.ctx = this.canvas = this.anim = this.state = null;
      this.__canvasPrepared = !1;
      this.__instanceNum = ++b.__instances;
      this.muted = !1
    }
    var e = c("./constants.js"),
      a = c("./utils.js"),
      f = a.is,
      d = c("./global_opts.js");
    c("./conf.js");
    var n = c("./log.js");
    k = c("./events.js").provideEvents;
    var h = c("./loc.js"),
      t =
      h.Strings,
      w = h.Errors,
      r = c("./errors.js"),
      z = c("engine"),
      y = c("./resource_manager.js"),
      x = c("./player_manager.js"),
      A = c("./loader.js"),
      u = c("./ui/controls.js"),
      B = c("./animation/animation.js"),
      D = c("./animation/element.js"),
      F = c("./render.js"),
      p = c("./graphics/sheet.js");
    b.__instances = 0;
    b.PREVIEW_POS = 0;
    b.PEFF = 0;
    b.NO_TIME = -1;
    b.DEFAULT_CONFIGURATION = {
      debug: !1,
      repeat: void 0,
      autoPlay: !1,
      mode: e.M_VIDEO,
      zoom: 1,
      speed: 1,
      width: void 0,
      height: void 0,
      infiniteDuration: void 0,
      drawStill: void 0,
      audioEnabled: !0,
      volume: 1,
      imagesEnabled: !0,
      videoEnabled: !0,
      shadowsEnabled: !0,
      handleEvents: void 0,
      controlsEnabled: void 0,
      controlsInvisible: void 0,
      infoEnabled: void 0,
      loadingMode: e.LM_DEFAULT,
      thumbnail: void 0,
      bgColor: void 0,
      ribbonsColor: void 0,
      forceAnimationSize: !1,
      stretchToCanvas: !1,
      muteErrors: !1
    };
    b.EMPTY_BG = "rgba(0,0,0,.05)";
    b.prototype.init = function(c, d) {
      this.viewId = a.getObjectId();
      z.isDocReady() || n.warn(w.P.DOM_NOT_READY);
      this._initHandlers();
      this.on(e.S_ERROR, this.__onerror());
      if (this.canvas || this.wrapper) throw r.player(w.P.INIT_TWICE, this);
      if (this.anim) throw r.player(w.P.INIT_AFTER_LOAD, this);
      this._prepare(c);
      this._addOpts(b.DEFAULT_CONFIGURATION);
      this._addOpts(z.extractUserOptions(this.canvas));
      this._addOpts(z.extractUserOptions(this.wrapper));
      try {
        window && window.frameElement && this._addOpts(z.extractUserOptions(window.frameElement))
      } catch (m) {}
      this._addOpts(d || {});
      this._postInit();
      this._checkOpts();
      x.fire(e.S_NEW_PLAYER, this);
      return this
    };
    b.prototype.load = function(b, c, d, m) {
      var p = this,
        u = p.state;
      if (u.happens === e.PLAYING || u.happens === e.PAUSED) throw r.player(w.P.COULD_NOT_LOAD_WHILE_PLAYING,
        p);
      var h, t, x;
      if (b && b.id && p.anim && p.anim.id == b.id) n.info("Animation with ID=" + b.id + " is already loaded in player, skipping the call");
      else {
        var k = !1;
        if (c && c.IMPORTER_ID || d && d.IMPORTER_ID) throw r.player(w.P.IMPORTER_CONSTRUCTOR_PASSED, p);
        f.fun(c) ? x = c : f.num(c) || !c ? (f.num(c) && (h = c, k = !0), f.obj(d) ? (t = d, x = m) : f.fun(d) && (x = d)) : f.obj(c) && (t = c, x = d);
        if (p.loadingMode != e.LM_ONPLAY || p._playLock) {
          if (!b) throw p.anim = null, p._reset(), p.stop(), r.player(w.P.NO_ANIMATION_PASSED, p);
          if (!p.__canvasPrepared) throw r.player(w.P.CANVAS_NOT_PREPARED,
            p);
          p._reset();
          u.happens = e.LOADING;
          p.fire(e.S_CHANGE_STATE, e.LOADING);
          c = function(b) {
            var c = p.anim;
            p.__subscribePlayingEvents(c);
            p.handleEvents && p.__subscribeDynamicEvents(c);
            var g = c._collectRemoteResources(p);
            g.length ? (u.happens = e.RES_LOADING, p.fire(e.S_CHANGE_STATE, e.RES_LOADING), p.fire(e.S_RES_LOAD, g), y.subscribe(p.id, g, [function(c, g) {
              p.anim === b && a.postpone(function() {
                p.state.happens = e.LOADING;
                p.fire(e.S_CHANGE_STATE, e.LOADING);
                p.fire(e.S_LOAD, b);
                p._updateMediaVolumes();
                p.handleEvents || p.stop();
                p._callPostpones();
                x && x.call(p, b);
                p._applyTimeOptionsIfSet()
              })
            }], function(a, b, c, g) {
              p.fire(e.S_LOADING_PROGRESS, b);
              p.controlsEnabled && p.controls && (p.controls.loadingProgress = c, p.controls.loadingErrors = g)
            }), c._loadRemoteResources(p)) : (p.fire(e.S_LOAD, b), p.handleEvents || p.stop(), x && x.call(p, b), p._applyTimeOptionsIfSet())
          };
          p.anim && (p.__unsubscribePlayingEvents(p.anim), p.__unsubscribeDynamicEvents(p.anim), p.anim.traverse(function(a) {
            a.removeMaskCanvases()
          }));
          b ? b instanceof B ? (p._loadTarget = e.LT_ANIMATION, A.loadAnimation(p,
            b, c)) : f.arr(b) || b instanceof D ? (p._loadTarget = e.LT_ELEMENTS, A.loadElements(p, b, c)) : f.str(b) ? (p._loadTarget = e.LT_URL, p._loadSrc = b, A.loadFromUrl(p, b, t, c)) : (p._loadTarget = e.LT_IMPORT, A.loadFromObj(p, b, t, c)) : (p._loadTarget = e.LT_ANIMATION, p.anim = new B, c(p.anim));
          k && (p.anim.duration = h);
          return p
        }
        if (p._postponedLoad) throw r.player(w.P.LOAD_WAS_ALREADY_POSTPONED, p);
        p._lastReceivedAnimationId = null;
        p._postponedLoad = [b, h, t, x];
        p.stop()
      }
    };
    z.getRequestFrameFunc();
    var m = z.getCancelFrameFunc();
    b.prototype.play = function(a,
      c, d) {
      var m = this;
      m._ensureHasState();
      var p = m.state;
      if (p.happens !== e.PLAYING || !m.infiniteDuration)
        if (m.loadingMode !== e.LM_ONPLAY || m._lastReceivedAnimationId)
          if (m.loadingMode === e.LM_ONREQUEST && p.happens === e.RES_LOADING) m._postpone("play", arguments);
          else {
            m._ensureHasAnim();
            var f = m.anim;
            p.happens === e.STOPPED && f.reset();
            p.__lastPlayConf = [a, c, d];
            p.from = a || 0;
            p.time = b.NO_TIME;
            p.speed = (c || 1) * (m.speed || 1) * (f.speed || 1);
            p.stop = "undefined" !== typeof d ? d : p.stop;
            p.duration = m.infiniteDuration ? Infinity : f.duration ||
              (f.isEmpty() ? 0 : B.DEFAULT_DURATION);
            if (void 0 === p.duration) throw r.player(w.P.DURATION_IS_NOT_KNOWN, m);
            p.__startTime = Date.now();
            p.__redraws = 0;
            p.__rsec = 0;
            p.__prevt = 0;
            p.happens !== e.STOPPED || m.repeating || m.fire(e.S_REPORT_STATS);
            z.getAnmProps(m.ctx).factor = this.factor();
            p.happens = e.PLAYING;
            p.__lastReq = F.loop(m.ctx, m, f, m.__beforeFrame(f), m.__afterFrame(f), m.__userBeforeRender, m.__userAfterRender);
            m.fire(e.S_CHANGE_STATE, e.PLAYING);
            m.fire(e.S_PLAY, p.from);
            return m
          }
      else if (!m._playLock) {
        m._playLock = !0;
        var p =
          m._postponedLoad,
          u = arguments;
        if (!p) throw r.player(w.P.NO_LOAD_CALL_BEFORE_PLAY, m);
        var h = p[3];
        p[3] = function() {
          h && h.apply(m, arguments);
          m._postponedLoad = null;
          m._playLock = !1;
          m._lastReceivedAnimationId = m.anim.id;
          b.prototype.play.apply(m, u)
        };
        b.prototype.load.apply(m, p)
      }
    };
    b.prototype.stop = function() {
      this._ensureHasState();
      var a = this.state;
      if (a.happens === e.RES_LOADING && this.loadingMode === e.LM_ONREQUEST) this._postpone("stop", arguments);
      else {
        a.happens !== e.PLAYING && a.happens !== e.PAUSED || m(a.__lastReq);
        a.time =
          b.NO_TIME;
        a.from = 0;
        a.stop = b.NO_TIME;
        var c = this.anim;
        c || this.loadingMode == e.LM_ONPLAY && this._postponedLoad ? (a.happens = e.STOPPED, this._drawStill(), this.fire(e.S_CHANGE_STATE, e.STOPPED)) : a.happens !== e.ERROR && (a.happens = e.NOTHING, this.controls || this._drawSplash(), this.fire(e.S_CHANGE_STATE, e.NOTHING));
        this.fire(e.S_STOP);
        c && c.reset();
        return this
      }
    };
    b.prototype.pause = function() {
      if (this.state.happens === e.RES_LOADING && this.loadingMode === e.LM_ONREQUEST) return this._postpone("pause", arguments), this;
      this._ensureHasState();
      this._ensureHasAnim();
      var a = this.state;
      if (a.happens === e.STOPPED) return this.anim.reset(), this;
      a.happens === e.PLAYING && (m(a.__lastReq), this.anim.handlePause());
      a.time > a.duration && (a.time = a.duration);
      a.from = a.time;
      a.happens = e.PAUSED;
      a.time !== b.NO_TIME && this.drawAt(a.time);
      this.fire(e.S_CHANGE_STATE, e.PAUSED);
      this.fire(e.S_PAUSE, a.time);
      return this
    };
    b.prototype.seek = function(a) {
      return this.state.happens === e.PAUSED ? this.play(a).pause() : this.pause().play(a)
    };
    b.prototype.onerror = function(a) {
      this.__err_handler =
        a;
      return this
    };
    k(b, [e.S_IMPORT, e.S_CHANGE_STATE, e.S_LOAD, e.S_RES_LOAD, e.S_PLAY, e.S_PAUSE, e.S_STOP, e.S_COMPLETE, e.S_REPEAT, e.S_ERROR, e.S_LOADING_PROGRESS, e.S_TIME_UPDATE, e.S_INTERACTIVITY, e.S_REPORT_STATS]);
    b.prototype._prepare = function(c) {
      if (!c) throw r.player(w.P.NO_WRAPPER_PASSED, this);
      var d;
      if (f.str(c)) {
        if (d = z.getElementById(c), !c) throw r.player(a.strf(w.P.NO_WRAPPER_WITH_ID, [c]), this);
      } else c.id || (c.id = "anm-player-" + b.__instances), d = c;
      c = z.assignPlayerToWrapper(d, this, "anm-player-" + b.__instances);
      this.id = c.id;
      this.wrapper = c.wrapper;
      this.canvas = c.canvas;
      if (!z.checkPlayerCanvas(this.canvas)) throw r.player(w.P.CANVAS_NOT_VERIFIED, this);
      this.ctx = z.getContext(this.canvas, "2d");
      this.state = b.createState(this);
      this.fire(e.S_CHANGE_STATE, e.NOTHING);
      this.subscribeEvents(this.canvas);
      this.__canvasPrepared = !0
    };
    b.prototype._addOpts = function(a) {
      this.debug = f.defined(a.debug) ? a.debug : this.debug;
      this.repeat = f.defined(a.repeat) ? a.repeat : this.repeat;
      this.autoPlay = f.defined(a.autoPlay) ? a.autoPlay : this.autoPlay;
      this.startFrom = f.defined(a.startFrom) ? a.startFrom : this.startFrom;
      this.stopAt = f.defined(a.stopAt) ? a.stopAt : this.stopAt;
      this.zoom = a.zoom || this.zoom;
      this.speed = a.speed || this.speed;
      this.bgColor = a.bgColor || this.bgColor;
      this.width = a.width || this.width;
      this.height = a.height || this.height;
      this.ribbonsColor = a.ribbonsColor || this.ribbonsColor;
      this.thumbnailSrc = a.thumbnail || this.thumbnailSrc;
      this.loadingMode = f.defined(a.loadingMode) ? a.loadingMode : this.loadingMode;
      this.audioEnabled = f.defined(a.audioEnabled) ? a.audioEnabled :
        this.audioEnabled;
      this.globalVolume = f.defined(a.volume) ? a.volume : this.globalVolume;
      this.imagesEnabled = f.defined(a.imagesEnabled) ? a.imagesEnabled : this.imagesEnabled;
      this.videoEnabled = f.defined(a.videoEnabled) ? a.videoEnabled : this.videoEnabled;
      this.shadowsEnabled = f.defined(a.shadowsEnabled) ? a.shadowsEnabled : this.shadowsEnabled;
      this.controlsEnabled = f.defined(a.controlsEnabled) ? a.controlsEnabled : this.controlsEnabled;
      this.controlsInvisible = f.defined(a.controlsInvisible) ? a.controlsInvisible : this.controlsInvisible;
      this.infoEnabled = f.defined(a.infoEnabled) ? a.infoEnabled : this.infoEnabled;
      this.handleEvents = f.defined(a.handleEvents) ? a.handleEvents : this.handleEvents;
      this.drawStill = f.defined(a.drawStill) ? a.drawStill : this.drawStill;
      this.infiniteDuration = f.defined(a.infiniteDuration) ? a.infiniteDuration : this.infiniteDuration;
      this.forceAnimationSize = f.defined(a.forceAnimationSize) ? a.forceAnimationSize : this.forceAnimationSize;
      this.stretchToCanvas = f.defined(a.stretchToCanvas) ? a.stretchToCanvas : this.stretchToCanvas;
      this.muteErrors =
        f.defined(a.muteErrors) ? a.muteErrors : this.muteErrors;
      f.defined(a.mode) && this.mode(a.mode)
    };
    b.prototype._checkOpts = function() {
      if (this.canvas) {
        if (!this.width || !this.height) {
          var a = z.getCanvasSize(this.canvas);
          this.width = a[0];
          this.height = a[1]
        }
        this._resize(this.width, this.height);
        this.bgColor && z.setCanvasBackground(this.canvas, this.bgColor);
        this.anim && this.handleEvents && this.__subscribeDynamicEvents(this.anim);
        this.controlsEnabled && !this.controls ? (this._enableControls(), this.infoEnabled ? this._enableInfo() :
          this._disableInfo()) : !this.controlsEnabled && this.controls && (this._disableInfo(), this._disableControls());
        this.ctx && (z.getAnmProps(this.ctx).skip_shadows = !this.shadowsEnabled);
        this.thumbnailSrc && this.thumbnail(this.thumbnailSrc)
      }
    };
    b.prototype._postInit = function() {
      this.stop();
      var a = z.hasUrlToLoad(this.wrapper);
      a.url || (a = z.hasUrlToLoad(this.canvas));
      if (a.url) {
        var b = null;
        a.importer_id && anm.importers.isAccessible(a.importer_id) && (b = anm.importers.create(a.importer_id));
        this.load(a.url, b)
      }
    };
    b.prototype.mode =
      function(a) {
        this.infiniteDuration = a & e.M_INFINITE_DURATION || void 0;
        this.handleEvents = a & e.M_HANDLE_EVENTS || void 0;
        this.controlsEnabled = a & e.M_CONTROLS_ENABLED || void 0;
        this.infoEnabled = a & e.M_INFO_ENABLED || void 0;
        this.drawStill = a & e.M_DRAW_STILL || void 0;
        return this
      };
    b.prototype.rect = function(a) {
      if (!a) return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
      this.x = a.x;
      this.y = a.y;
      this.width = a.width;
      this.height = a.height;
      this._moveTo(a.x, a.y);
      this._resize(a.width, a.height);
      return this
    };
    b.prototype.forceRedraw =
      function() {
        switch (this.state.happens) {
          case e.STOPPED:
            this.stop();
            break;
          case e.PAUSED:
            this.anim && this.drawAt(this.state.time);
            break;
          case e.PLAYING:
            this.anim && this._stopAndContinue();
            break;
          case e.NOTHING:
            this.controls || this._drawSplash()
        }
      };
    b.prototype.drawAt = function(c) {
      if (c === b.NO_TIME) throw r.player(w.P.PASSED_TIME_VALUE_IS_NO_TIME, this);
      if (this.state.happens === e.RES_LOADING && this.loadingMode === e.LM_ONREQUEST) this._postpone("drawAt", arguments);
      else {
        if (0 > c || !this.infiniteDuration && c > this.anim.duration) throw r.player(a.strf(w.P.PASSED_TIME_NOT_IN_RANGE, [c]), this);
        var d = this.anim,
          m = this.__userBeforeRender,
          p = this.__userAfterRender;
        z.getAnmProps(this.ctx).factor = this.factor();
        d.__informEnabled = !1;
        F.at(c, 0, this.ctx, this.anim, this.width, this.height, this.zoom, this.ribbonsColor, this.stretchToCanvas, m, function(a, b) {
          p && p(a, b);
          d.reset();
          d.__informEnabled = !0
        });
        return this
      }
    };
    b.prototype.size = function(a, b) {
      if (!f.defined(a)) return [this.width, this.height];
      this.__userSize = [a, b];
      this._resize();
      return this
    };
    b.prototype.factor = function() {
      return this.anim ? this.anim.width ===
        this.width && this.anim.height === this.height ? 1 : Math.min(this.width / this.anim.width, this.height / this.anim.height) : void 0
    };
    b.prototype.factorData = function() {
      if (this.anim) {
        var b = a.fit_rects(this.width, this.height, this.anim.width, this.anim.height);
        return {
          factor: b[0],
          anim_rect: b[1],
          ribbon_one: b[2] || null,
          ribbon_two: b[3] || null
        }
      }
    };
    b.prototype.thumbnail = function(b, c, d) {
      if (!b) return this.thumbnailSrc;
      var m = this;
      if (!(m.__thumbLoading || m.__thumb && m.__thumb.src == b)) {
        if (m.ctx) {
          var f = z.PX_RATIO,
            u = m.ctx;
          u.save();
          u.clearRect(0,
            0, m.width * f, m.height * f);
          u.restore()
        }
        var h = new p(b);
        m.__thumbLoading = !0;
        h.load(a.guid(), m, function() {
          m.__thumbLoading = !1;
          m.__thumb = h;
          if (c || d) m.__thumbSize = [c, d];
          m.state.happens !== e.PLAYING && m.state.happens !== e.PAUSED && m._drawStill()
        }, function() {
          return !0
        })
      }
    };
    b.prototype.detach = function() {
      z.playerAttachedTo(this.wrapper, this) && (x.fire(e.S_PLAYER_DETACH, this), this.stop(), this.controls && this.controls.detach(this.wrapper), z.detachPlayer(this), this.ctx && z.clearAnmProps(this.ctx), this._reset(), y.cancel(this.id))
    };
    b.prototype.attachedTo = function(a) {
      return z.playerAttachedTo(a, this)
    };
    b.prototype.isAttached = function() {
      return z.playerAttachedTo(this.wrapper, this)
    };
    b.attachedTo = function(a, b) {
      return z.playerAttachedTo(a, b)
    };
    b.prototype.invalidate = function() {
      this.controls && this.controls.update(this.canvas)
    };
    b.__invalidate = function(a) {
      return function(b) {
        a.invalidate()
      }
    };
    b.prototype.beforeFrame = function(a) {
      if (this.state.happens === e.PLAYING) throw r.player(w.P.BEFOREFRAME_BEFORE_PLAY, this);
      this.__userBeforeFrame = a
    };
    b.prototype.afterFrame = function(a) {
      if (this.state.happens === e.PLAYING) throw r.player(w.P.AFTERFRAME_BEFORE_PLAY, this);
      this.__userAfterFrame = a
    };
    b.prototype.beforeRender = function(a) {
      if (this.state.happens === e.PLAYING) throw r.player(w.P.BEFORENDER_BEFORE_PLAY, this);
      this.__userBeforeRender = a
    };
    b.prototype.afterRender = function(a) {
      if (this.state.happens === e.PLAYING) throw r.player(w.P.AFTERRENDER_BEFORE_PLAY, this);
      this.__userAfterRender = a
    };
    b.prototype.subscribeEvents = function(a) {
      var c = b.__invalidate(this);
      z.subscribeWindowEvents({
        load: c
      });
      z.subscribeCanvasEvents(a, {
        mouseover: function(a) {
          return function(b) {
            d.autoFocus && a.handleEvents && a.canvas && a.canvas.focus();
            return !0
          }
        }(this),
        mouseout: function(a) {
          return function(b) {
            d.autoFocus && a.handleEvents && a.canvas && a.canvas.blur();
            return !0
          }
        }(this)
      })
    };
    b.prototype.mute = function() {
      this.muted || this.toggleMute()
    };
    b.prototype.unmute = function() {
      this.muted && this.toggleMute()
    };
    b.prototype.toggleMute = function() {
      this.muted = !this.muted;
      this.anim && this.anim.traverse(function(a) {
        a.$audio && a.$audio.toggleMute()
      })
    };
    b.prototype.volume = function(a) {
      if ("undefined" === typeof a) return this.globalVolume;
      this.globalVolume = a;
      this._updateMediaVolumes()
    };
    b.prototype._updateMediaVolumes = function() {
      var a = this;
      a.anim && a.anim.traverse(function(b) {
        b.$audio && b.$audio.setVolume(a.globalVolume)
      })
    };
    b.prototype._drawEmpty = function() {
      var a = this.ctx,
        c = this.width,
        d = this.height;
      a.save();
      var m = z.PX_RATIO;
      a.fillStyle = b.EMPTY_BG;
      a.fillRect(0, 0, c * m, d * m);
      a.restore()
    };
    b.prototype._drawStill = function() {
      var a = this.state,
        c = this.anim;
      this.drawStill ?
        this.__thumb ? this._drawThumbnail() : c && (!this.infiniteDuration && f.finite(c.duration) ? this.drawAt(c.duration * b.PREVIEW_POS) : this.drawAt(a.from)) : this._drawEmpty()
    };
    b.prototype._drawThumbnail = function() {
      var b = this.__thumbSize || this.__thumb.bounds(),
        c = b.width,
        d = b.height,
        m = this.width,
        e = this.height,
        p = z.PX_RATIO,
        b = this.ctx;
      b.save();
      1 != p && b.scale(p, p);
      if (c != m || d != e) {
        e = a.fit_rects(m, e, c, d);
        c = e[0];
        d = e[1];
        m = e[2];
        e = e[3];
        if (m || e) b.fillStyle = this.ribbonsColor || "#000", m && b.fillRect(m[0], m[1], m[2], m[3]), e && b.fillRect(e[0],
          e[1], e[2], e[3]);
        d && (b.beginPath(), b.rect(d[0], d[1], d[2], d[3]), b.clip(), b.translate(d[0], d[1]));
        1 != c && b.scale(c, c)
      }
      this.__thumb.apply(b);
      b.restore()
    };
    b.prototype._drawSplash = function() {
      this.controls || this.__thumbLoading || this.__thumb && this.drawStill && this._drawThumbnail()
    };
    b.prototype._drawLoadingSplash = function(a) {
      if (!this.controls) {
        this._drawSplash();
        var b = this.ctx;
        b.save();
        b.setTransform(1, 0, 0, 1, 0, 0);
        b.fillStyle = "#006";
        b.font = "12px sans-serif";
        b.fillText(a || t.LOADING, 20, 25);
        b.restore()
      }
    };
    b.prototype._drawErrorSplash =
      function(a) {
        if (this.canvas && this.ctx && !this.controls) {
          this._drawSplash();
          var b = this.ctx;
          b.save();
          b.setTransform(1, 0, 0, 1, 0, 0);
          b.fillStyle = "#006";
          b.font = "14px sans-serif";
          b.fillText(t.ERROR + (a ? ": " + (a.message || typeof Error) : "") + ".", 20, 25);
          b.restore()
        }
      };
    b.prototype.toString = function() {
      return "[ Player '" + this.id + "' ]"
    };
    b.prototype._reset = function() {
      var a = this.state;
      this.loadingMode === e.LM_ONREQUEST && a.happens === e.RES_LOADING && (this._clearPostpones(), y.cancel(this.id));
      a.happens = e.NOTHING;
      a.from = 0;
      a.time =
        b.NO_TIME;
      a.duration = void 0;
      this.fire(e.S_CHANGE_STATE, e.NOTHING);
      this.controls && this.controls.reset();
      this.ctx.clearRect(0, 0, this.width * z.PX_RATIO, this.height * z.PX_RATIO)
    };
    b.prototype._stopAndContinue = function() {
      var a = this.state,
        b = a.__lastPlayConf,
        a = a.time;
      this.stop();
      this.play(a, b[1], b[2])
    };
    b.prototype._moveTo = function(a, b) {
      z.setCanvasPosition(this.canvas, a, b)
    };
    b.prototype._resize = function(a, b) {
      var c = this.canvas,
        d = this.__userSize || [a, b],
        m = z.getCanvasParameters(c);
      if (!m || m[0] !== d[0] || m[1] !== d[1]) return d[0] &&
        d[1] || (d = m), z.setWrapperSize(this.wrapper, d[0], d[1]), z.setCanvasSize(c, d[0], d[1]), this.width = d[0], this.height = d[1], z.updateCanvasOverlays(c), this.ctx && (z.getAnmProps(this.ctx).factor = this.factor()), this.controls && this.controls.handleAreaChange(), this.forceRedraw(), d
    };
    b.prototype._restyle = function(a) {
      z.setCanvasBackground(this.canvas, a);
      this.forceRedraw()
    };
    b.prototype._enableControls = function() {
      this.controls || (this.controls = new u(this));
      this.controls.enable()
    };
    b.prototype._disableControls = function() {
      this.controls &&
        (this.controls.disable(), this.controls = null)
    };
    b.prototype._enableInfo = function() {
      this.controls && this.controls.enableInfo()
    };
    b.prototype._disableInfo = function() {
      this.controls && this.controls.disableInfo()
    };
    b.prototype.__subscribePlayingEvents = function(a) {
      if (!this.__anim_handlers || !this.__anim_handlers[a.id]) {
        var b = {};
        b[e.A_START] = this.on(e.S_PLAY, function() {
          a.fire(e.A_START)
        });
        b[e.A_PAUSE] = this.on(e.S_PAUSE, function() {
          a.fire(e.A_PAUSE)
        });
        b[e.A_STOP] = this.on(e.S_STOP, function() {
          a.fire(e.A_STOP)
        });
        this.__anim_handlers ||
          (this.__anim_handlers = {});
        this.__anim_handlers[a.id] = b
      }
    };
    b.prototype.__unsubscribePlayingEvents = function(a) {
      if (this.__anim_handlers) {
        var b = this.__anim_handlers[a.id];
        b && (this.unbind(e.S_PLAY, b[e.A_START]), this.unbind(e.S_PAUSE, b[e.A_PAUSE]), this.unbind(e.S_STOP, b[e.STOP]), this.__anim_handlers[a.id] = null)
      }
    };
    b.prototype.__subscribeDynamicEvents = function(a) {
      d.setTabindex && z.setTabIndex(this.canvas, this.__instanceNum);
      if (a) {
        var b = !1;
        if (this.__boundTo)
          for (var c = 0, m = this.__boundTo, p = m.length; c < p; c++) a.id ===
            m[c][0] && this.canvas === m[c][1] && (b = !0);
        else this.__boundTo = [];
        b || (this.__boundTo.push([a.id, this.canvas]), a.on(e.X_ERROR, this.__onerror()), a.subscribeEvents(this.canvas))
      }
    };
    b.prototype.__unsubscribeDynamicEvents = function(a) {
      d.setTabindex && z.setTabIndex(this.canvas, void 0);
      if (a && this.__boundTo) {
        for (var b = -1, c = 0, m = this.__boundTo, e = m.length; c < e; c++) a.id === m[c][0] && (b = c, a.unsubscribeEvents(m[c][1]));
        0 <= b && this.__boundTo.splice(b, 1)
      }
    };
    b.prototype._ensureHasState = function() {
      if (!this.state) throw r.player(w.P.NO_STATE,
        this);
    };
    b.prototype._ensureHasAnim = function() {
      if (!this.anim) throw r.player(w.P.NO_ANIMATION, this);
    };
    b.prototype.__beforeFrame = function(a) {
      return function(a, c, d, g) {
        return function(m) {
          d.clearAllLaters();
          if (c.happens !== e.PLAYING) return !1;
          if (c.stop !== b.NO_TIME && m >= c.from + c.stop || f.finite(c.duration) && m > c.duration + b.PEFF) return a.fire(e.S_COMPLETE), c.time = 0, a.stop(), a.repeat || !f.defined(a.repeat) && d.repeat ? (a.repeating = !0, a.play(), a.fire(e.S_REPEAT)) : !a.infiniteDuration && f.finite(c.duration) && a.drawAt(c.duration), !1;
          g && g(m, a.ctx);
          return !0
        }
      }(this, this.state, a, this.__userBeforeFrame)
    };
    b.prototype.__afterFrame = function(a) {
      return function(a, b, c, d) {
        return function(a) {
          d && d(a);
          c.invokeAllLaters();
          return !0
        }
      }(this, this.state, a, this.__userAfterFrame)
    };
    b.prototype.__onerror = function() {
      var a = this;
      return function(b) {
        return a.__onerror_f(b)
      }
    };
    b.prototype.__onerror_f = function(a) {
      var b = this.muteErrors,
        b = b && !(a instanceof r.SystemError);
      try {
        this.state && (this.state.happens = e.ERROR), this.__lastError = a, this.fire(e.S_CHANGE_STATE,
          e.ERROR), this.anim = null
      } catch (c) {
        throw c;
      }
      try {
        !this.state || this.state.happens == e.NOTHING && this.state.happens == e.STOPPED || this.__unsafe_stop()
      } catch (c) {}
      b = this.__err_handler && this.__err_handler(a) || b;
      if (!b) {
        try {
          this._drawErrorSplash(a)
        } catch (c) {}
        throw a;
      }
    };
    b.prototype._clearPostpones = function() {
      this._queue = []
    };
    b.prototype._postpone = function(a, b) {
      this._queue || (this._queue = []);
      this._queue.push([a, b])
    };
    b.prototype._callPostpones = function() {
      if (this._queue && this._queue.length)
        for (var a = this._queue, b, c =
            0, d = a.length; c < d; c++) b = a[c], this[b[0]].apply(this, b[1]);
      this._queue = []
    };
    b.createState = function(a) {
      return {
        happens: e.NOTHING,
        time: b.NO_TIME,
        from: 0,
        stop: b.NO_TIME,
        afps: 0,
        speed: 1,
        duration: void 0,
        __startTime: -1,
        __redraws: 0,
        __rsec: 0
      }
    };
    b.forSnapshot = function(a, c, d, m, e) {
      var p = new b;
      p.init(a, e);
      p.load(c, d, m);
      return p
    };
    b.prototype._applyUrlParamsToAnimation = function(a) {
      f.defined(a.t) ? (this.state.happens === e.PLAYING && this.stop(), this.play(a.t / 100)) : f.defined(a.from) ? (this.state.happens === e.PLAYING && this.stop(),
        this.play(a.from / 100)) : f.defined(a.p) ? (this.state.happens === e.PLAYING && this.stop(), this.play(a.p / 100).pause()) : f.defined(a.at) && (this.state.happens === e.PLAYING && this.stop(), this.play(a.at / 100).pause())
    };
    b.prototype._applyTimeOptionsIfSet = function() {
      this.autoPlay ? (this.state.happens === e.PLAYING && this.stop(), this.play(this.startFrom || this.state.from || 0)) : this.startFrom ? (this.state.happens === e.PLAYING && this.stop(), this.play(this.startFrom)) : this.stopAt && this.pause(this.stopAt)
    };
    v.exports = b
  }, {
    "./animation/animation.js": 3,
    "./animation/element.js": 6,
    "./conf.js": 11,
    "./constants.js": 12,
    "./errors.js": 13,
    "./events.js": 14,
    "./global_opts.js": 15,
    "./graphics/sheet.js": 22,
    "./loader.js": 26,
    "./loc.js": 27,
    "./log.js": 28,
    "./player_manager.js": 33,
    "./render.js": 34,
    "./resource_manager.js": 35,
    "./ui/controls.js": 36,
    "./utils.js": 39,
    engine: 40
  }],
  33: [function(c, v, k) {
    function b() {
      this.hash = {};
      this.instances = [];
      this._initHandlers()
    }
    k = c("./events.js");
    var e = c("./constants.js");
    c = c("engine");
    k.provideEvents(b, [e.S_NEW_PLAYER, e.S_PLAYER_DETACH]);
    b.prototype.filterEvent = function(a, b) {
      a == e.S_NEW_PLAYER && (this.hash[b.id] = b, this.instances.push(b));
      return !0
    };
    b.prototype.getPlayer = function(a) {
      return this.hash[a]
    };
    b.prototype.handleDocumentHiddenChange = function(a) {
      var b, c;
      for (b = 0; b < this.instances.length; b++) c = this.instances[b], a && c.state.happens === e.PLAYING ? (c._pausedViaHidden = !0, c.pause()) : !a && c._pausedViaHidden && (c._pausedViaHidden = !1, c.play(c.state.from))
    };
    var a = new b;
    c.onDocumentHiddenChange(function(b) {
      a.handleDocumentHiddenChange(b)
    });
    v.exports =
      a
  }, {
    "./constants.js": 12,
    "./events.js": 14,
    engine: 40
  }],
  34: [function(c, v, k) {
    function b(a, c, h, u, n, r, t) {
      "undefined" === typeof z[c.id] && (z[c.id] = 0);
      var p = c.state;
      if (p.happens === d.PLAYING) {
        var m = Date.now() - p.__startTime,
          g = m / 1E3 * p.speed + p.from,
          q = g - p.__prevt;
        p.time = g;
        p.__dt = q;
        p.__prevt = g;
        if (!u || u(g))
          if (0 === p.__rsec && (p.__rsec = m), 1E3 <= m - p.__rsec && (p.afps = p.__redraws, p.__rsec = m, p.__redraws = 0), p.__redraws++, e(g, q, a, h, c.width, c.height, c.zoom, c.ribbonsColor, c.stretchToCanvas, r, t), c.debug && f(a, p.afps, g), !n || n(g)) return z[c.id] +=
            q, 1 <= z[c.id] && (c.fire(d.S_TIME_UPDATE, g), z[c.id] = 0), p.__lastReq = w(function() {
              b(a, c, h, u, n, r, t)
            })
      }
    }

    function e(b, c, d, e, f, h, n, p, m, g, q) {
      d.save();
      var r = t.PX_RATIO;
      1 !== r && d.scale(r, r);
      f |= 0;
      h |= 0;
      r = f != e.width || h != e.height;
      e.factor = 1 * (n || 1) * (e.zoom || 1);
      var w = m ? f / e.width * n : n,
        k = m ? h / e.height * n : n;
      !r || m ? (d.clearRect(0, 0, e.width, e.height), g && g(b, d), 1 == w && 1 == k || d.scale(w, k), e.render(d, b, c), q && q(b, d), d.restore()) : a(d, e, f, h, e.width, e.height, p, function(a) {
        d.clearRect(0, 0, e.width, e.height);
        g && g(b, d);
        1 == w && 1 == k || d.scale(w,
          k);
        e.render(d, b, c);
        q && q(b, d);
        d.restore()
      })
    }

    function a(a, b, c, d, e, f, h, p) {
      f = r(c, d, e, f);
      c = f[0];
      d = f[1];
      e = f[2];
      f = f[3];
      a.save();
      if (e || f) a.save(), a.fillStyle = h || "#000", e && (a.clearRect(e[0], e[1], e[2], e[3]), a.fillRect(e[0], e[1], e[2], e[3])), f && (a.clearRect(f[0], f[1], f[2], f[3]), a.fillRect(f[0], f[1], f[2], f[3])), a.restore();
      d && (a.beginPath(), t.isIE10 && (d[0] = Math.floor(d[0]), d[1] = Math.floor(d[1]), d[2] = Math.ceil(d[2]), d[3] = Math.ceil(d[3])), a.rect(d[0], d[1], d[2], d[3]), a.clip(), a.translate(d[0], d[1]));
      b.factor *= c;
      1 != c && a.scale(c, c);
      p(c);
      a.restore()
    }

    function f(a, b, c) {
      a.fillStyle = "#999";
      a.font = "20px sans-serif";
      a.fillText(Math.floor(b), 8, 20);
      a.font = "10px sans-serif";
      a.fillText(Math.floor(1E3 * c) / 1E3, 8, 35)
    }
    var d = c("./constants.js");
    k = c("./animation/painter.js");
    var n = c("./animation/modifier.js"),
      h = c("./graphics/brush.js"),
      t = c("engine"),
      w = t.getRequestFrameFunc(),
      r = c("./utils.js").fit_rects;
    c = {};
    var z = {};
    c.loop = b;
    c.at = e;
    c.drawFPS = f;
    c.p_drawVisuals = new k(function(a) {
      this.applyVisuals(a)
    }, d.PNT_SYSTEM);
    c.p_applyAComp =
      new k(function(a) {
        this.applyAComp(a)
      }, d.PNT_SYSTEM);
    c.p_drawBounds = new k(function(a, b) {
      var c = this.myBounds();
      if (c && !this.isEmpty()) {
        var d = this.isEmpty() ? "#f00" : "#600",
          e = c.width,
          c = c.height;
        a.save();
        a.beginPath();
        a.lineWidth = 1;
        a.strokeStyle = d;
        a.moveTo(0, 0);
        a.lineTo(e, 0);
        a.lineTo(e, c);
        a.lineTo(0, c);
        a.lineTo(0, 0);
        a.closePath();
        a.stroke();
        a.restore()
      }
    }, d.PNT_DEBUG);
    c.p_drawPivot = new k(function(a, b) {
      if (b = b || this.$pivot) {
        var c = this.myBounds(),
          d = this.isEmpty() ? "#600" : "#f00";
        a.save();
        c && a.translate(b[0] * c.width,
          b[1] * c.height);
        a.beginPath();
        a.lineWidth = 1;
        a.strokeStyle = d;
        a.moveTo(0, -10);
        a.lineTo(0, 0);
        a.moveTo(3, 0);
        a.arc(0, 0, 3, 0, 2 * Math.PI, !0);
        a.closePath();
        a.stroke();
        a.restore()
      }
    }, d.PNT_DEBUG);
    c.p_drawReg = new k(function(a, b) {
      if (b = b || this.$reg) a.save(), a.lineWidth = 1, a.strokeStyle = "#00f", a.fillStyle = "rgba(0,0,255,.3)", a.translate(b[0], b[1]), a.beginPath(), a.moveTo(-4, -4), a.lineTo(4, -4), a.lineTo(4, 4), a.lineTo(-4, 4), a.lineTo(-4, -4), a.closePath(), a.stroke(), a.beginPath(), a.moveTo(0, -10), a.lineTo(0, 0), a.moveTo(3,
        0), a.closePath(), a.stroke(), a.restore()
    }, d.PNT_DEBUG);
    c.p_drawName = new k(function(a, b) {
      if (b = b || this.name) a.save(), a.fillStyle = "#666", a.font = "12px sans-serif", a.fillText(b, 0, 10), a.restore()
    }, d.PNT_DEBUG);
    c.p_drawMPath = new k(function(a, b) {
      if (b = b || this.$mpath) a.save(), h.qstroke(a, "#600", 2), a.beginPath(), b.apply(a), a.closePath(), a.stroke(), a.restore()
    }, d.PNT_DEBUG);
    c.m_checkBand = new n(function(a, b, c) {
      if (c[0] > b * a || c[1] < b * a) return !1
    }, d.MOD_SYSTEM);
    v.exports = c
  }, {
    "./animation/modifier.js": 7,
    "./animation/painter.js": 8,
    "./constants.js": 12,
    "./graphics/brush.js": 17,
    "./utils.js": 39,
    engine: 40
  }],
  35: [function(c, v, k) {
    function b(b) {
      a.logResMan && f.debug(b)
    }

    function e() {
      this._cache = {};
      this._errors = {};
      this._waiting = {};
      this._subscriptions = {};
      this._onprogress = {};
      this._url_to_subjects = {}
    }
    var a = c("./conf.js"),
      f = c("./log.js"),
      d = c("./utils.js").is,
      n = c("./errors.js");
    e.prototype.subscribe = function(a, c, e, f) {
      if (!a) throw n.system("Subject ID is empty");
      if (this._subscriptions[a]) throw n.system("This subject ('" + a + "') is already subscribed to a bunch of resources, please group them in one.");
      var k = [];
      b("subscribing " + e.length + " to " + c.length + " urls: " + c);
      for (var y = {}, x = 0; x < c.length; x++) c[x] && !y[c[x]] && (y[c[x]] = !0, k.push(c[x]), this._url_to_subjects[c[x]] || (this._url_to_subjects[c[x]] = []), this._url_to_subjects[c[x]].push(a));
      b("filtered from " + c.length + " to " + k.length);
      this._subscriptions[a] = [k, d.arr(e) ? e : [e]];
      f && (this._onprogress[a] = function(a) {
        var b = {},
          c = 1 / a.length,
          d = 0,
          e = 0;
        return function(a, m) {
          var g = b[a] || 0; - 1 !== m ? (d += (m - g) * c, b[a] = m) : (d -= g, e += g);
          f(a, m, d, e)
        }
      }(k))
    };
    e.prototype.loadOrGet =
      function(a, c, d, e, f) {
        var k = this;
        if (!a) throw n.system("Subject ID is empty");
        if (!c) throw n.system("Given URL is empty");
        var x = k._onprogress[a];
        b("request to load " + c);
        k._cache[c] ? (b("> already received, trigerring success"), a = k._cache[c], e && e(a), k.trigger(c, a), x && x(c, 1)) : k._errors[c] ? (b("> failed to load before, notifying with error"), f && f(k._errors[c]), x && x(c, -1)) : k._waiting[a] && k._waiting[a] && k._waiting[a][c] ? (b("> someone is already waiting for it, subscribing"), d = a, k._subscriptions[a] && k._onprogress[a] &&
          (d = a + "-" + Math.floor((new Date).getTime() + 1E3 * Math.random()), k._onprogress[d] = k._onprogress[a]), k.subscribe(d, [c], function(a) {
            a[0] ? (e(a[0]), x && x(c, 1)) : (f(a[0]), x && x(c, -1))
          })) : (b("> not cached, requesting"), k._waiting[a] || (k._waiting[a] = {}), k._waiting[a][c] = d, d(function(a) {
          a = a || !0;
          b("file at " + c + " succeeded to load, triggering success");
          k.trigger(c, a);
          e && e(a);
          x && x(c, 1);
          k.check()
        }, function(a) {
          b("file at " + c + " failed to load, triggering error");
          k.error(c, a);
          f && f(a);
          x && x(c, -1);
          k.check()
        }, x ? function(a) {
          x(c,
            a)
        } : function() {}))
      };
    e.prototype.trigger = function(a, c) {
      if (this._cache[a] || this._errors[a]) this.check();
      else {
        b("triggering success for url " + a);
        var d = this._url_to_subjects[a];
        if (d)
          for (var e = 0, f = d.length; e < f; e++) this._waiting[d[e]] && delete this._waiting[d[e]][a];
        this._cache[a] = c
      }
    };
    e.prototype.error = function(a, c) {
      if (this._cache[a] || this._errors[a]) this.check();
      else {
        b("triggering error for url " + a);
        var d = this._url_to_subjects[a];
        if (d)
          for (var e = 0, f = d.length; e < f; e++) this._waiting[d[e]] && delete this._waiting[d[e]][a];
        this._errors[a] = c
      }
    };
    e.prototype.has = function(a) {
      return "undefined" !== typeof this._cache[a]
    };
    e.prototype.check = function() {
      b("checking subscriptions");
      var a = this._subscriptions,
        c = this._cache,
        d = this._errors,
        e = null,
        f;
      for (f in a) {
        b("subscription group '" + f + "'");
        var n = a[f][0],
          k = a[f][1],
          v = 0,
          u = 0,
          B;
        B = 0;
        for (ul = n.length; B < ul; B++) d[n[B]] && v++, c[n[B]] && u++;
        b("success: " + u + ", errors: " + v + ", ready: " + (u + v === n.length));
        if (u + v === n.length) {
          u = [];
          B = 0;
          for (ul = n.length; B < ul; B++) u.push(c[n[B]] || d[n[B]]);
          b("notifying subscribers that " +
            n + " are all ready");
          n = 0;
          for (B = k.length; n < B; n++) k[n](u, v);
          e || (e = []);
          e.push(f)
        }
      }
      if (e)
        for (c = 0, d = e.length; c < d; c++) b("removing notified subscribers for subject '" + e[c] + "' from queue"), delete a[e[c]]
    };
    e.prototype.cancel = function(a) {
      if (!a) throw n.system("Subject ID is empty");
      if (this._waiting[a]) {
        var b = this._subscriptions[a][0];
        if (b)
          for (var c = 0, d = b.length; c < d; c++) delete this._waiting[a][b[c]]
      }
      delete this._subscriptions[a]
    };
    e.prototype.clear = function() {
      this._cache = {};
      this._errors = {};
      this._waiting = {};
      this._loaders = {};
      this._subscriptions = {}
    };
    v.exports = new e
  }, {
    "./conf.js": 11,
    "./errors.js": 13,
    "./log.js": 28,
    "./utils.js": 39
  }],
  36: [function(c, v, k) {
    function b(b) {
      this.player = b;
      this.ctx = this.canvas = null;
      this.bounds = [];
      this.info = this.theme = null;
      this.invisible = b.controlsInvisible;
      this.state = {
        happens: a.NOTHING,
        mpos: {
          x: 0,
          y: 0
        },
        alpha: 1,
        click: !1,
        changed: !0,
        time: 0,
        gtime: 0,
        fadeTimer: 0,
        fadeMode: 0,
        mouseInteractedAt: 0
      }
    }
    var e = c("../utils.js"),
      a = c("../constants.js");
    c("../loc.js");
    var f = c("engine");
    c("./infoblock.js");
    var d = b.DEFAULT_THEME =
      c("./controls_theme.json");
    b.THEME = b.DEFAULT_THEME;
    b.LAST_ID = 0;
    b.prototype.update = function(a) {
      var c = this.canvas;
      c ? f.updateOverlay(a, c) : (c = f.addCanvasOverlay("ctrls-" + b.LAST_ID, a, [0, 0, 1, 1], function(b) {
        f.registerAsControlsElement(b, a)
      }), b.LAST_ID++, this.id = c.id, this.canvas = c, this.ctx = f.getContext(c, "2d"), this.subscribeEvents(c), this.changeTheme(b.THEME), this.setupRenderLoop());
      this.handleAreaChange();
      this.info && this.info.update(a)
    };
    b.prototype.subscribeEvents = function() {
      var b = this;
      b.player.on(a.S_CHANGE_STATE,
        function(a) {
          b.state.happens = a;
          b.state.changed = !0
        });
      f.subscribeCanvasEvents(b.canvas, {
        mouseenter: function(a) {
          b.handleMouseEnter(a)
        },
        mousemove: function(a) {
          b.handleMouseMove(a)
        },
        mouseleave: function(a) {
          b.handleMouseLeave()
        },
        mousedown: function(a) {
          b.handleClick();
          f.preventDefault(a)
        },
        click: f.preventDefault,
        dblclick: f.preventDefault
      })
    };
    b.prototype.checkMouseTimeout = function(c) {
      this.state.mouseInteracted ? (this.state.mouseInteractedAt = c, this.state.mouseInteracted = !1, this.state.autoHidden = !1, this.show()) : this.state.autoHidden ||
        !(c - this.state.mouseInteractedAt > this.theme.fadeTimes.idle) || this.state.happens !== a.PLAYING && this.state.happens !== a.PAUSED || b.isInProgressArea(this.state.mpos, this.bounds[2], this.bounds[3]) || (this.hide(), this.state.autoHidden = !0)
    };
    b.prototype.checkFade = function(a) {
      var b = this.state,
        c = b.fadeMode,
        e = !1;
      0 !== c && (e = !0, b.fadeTimer -= a, a = 1 === c ? Math.min(1, 1 - b.fadeTimer / d.fadeTimes.fadein) : Math.max(0, b.fadeTimer / d.fadeTimes.fadeout), b.alpha = a, 0 >= b.fadeTimer && (b.fadeTimer = 0, b.fadeMode = 0));
      return e
    };
    b.prototype.render =
      function(b) {
        this.checkMouseTimeout(b);
        var c = b - this.state.gtime;
        this.state.gtime = b;
        this.state.time = this.player.state.time;
        if (!this.invisible && this.bounds && this.state.changed) {
          this.rendering = !0;
          b = this.checkFade(c);
          var c = this.state,
            h = this.player,
            n = c.happens,
            p = c.mpos,
            m = c.time,
            g = this.ctx,
            q = this.theme,
            k = this.player.state.duration,
            t = m / (0 !== k ? k : 1),
            v = this.bounds[2],
            E = this.bounds[3],
            G = f.PX_RATIO;
          g.save();
          g.setTransform(1, 0, 0, 1, 0, 0);
          1 != G && g.scale(G, G);
          g.clearRect(0, 0, v, E);
          g.globalAlpha = c.alpha;
          if (n === a.PLAYING) k &&
            (r(g, q, v, E, t), g.save(), G = E - d.bottomControls.height, g.fillStyle = d.button.color, g.fillRect(9, G + 3, 3, 9), g.fillRect(15, G + 3, 3, 9), g.restore(), x(g, q, v, E, m, k, t, p), y(g, v, E, h.muted));
          else if (n === a.STOPPED) w(g, q, v, E), z(g, q, v, E, this.focused), c.changed = !1;
          else if (n === a.PAUSED) k && (r(g, q, v, E, t), g.save(), G = E - d.bottomControls.height, g.strokeStyle = "transparent", g.fillStyle = d.button.color, g.beginPath(), g.moveTo(9, G + 3), g.lineTo(18, G + 7), g.lineTo(9, G + 11), g.lineTo(9, G + 3), g.closePath(), g.fill(), g.restore(), x(g, q, v, E, m, k,
            t, p), y(g, v, E, h.muted)), w(g, q, v, E), z(g, q, v, E, this.focused), c.changed = !1;
          else if (n === a.NOTHING) c.changed = !1;
          else if (n === a.LOADING || n === a.RES_LOADING) {
            if (q = this.loadingProgress, h = this.loadingErrors, q || h) g.translate(0, E - d.loading.factorLineWidth), g.strokeStyle = d.loading.factorBackColor, g.lineWidth = d.loading.factorLineWidth, g.beginPath(), g.moveTo(0, 0), g.lineTo(v, 0), g.stroke(), g.strokeStyle = d.loading.factorDoneColor, g.beginPath(), g.moveTo(0, 0), g.lineTo(v * q, 0), g.stroke(), h && (g.strokeStyle = d.loading.factorErrorColor,
              g.moveTo(v * q, 0), g.lineTo(v * h, 0), g.stroke())
          } else n === a.ERROR && (w(g, q, v, E), h = h.__lastError, g.save(), g.translate(v / 2, E / 2), g.rotate(Math.PI / 4), g.strokeStyle = "transparent", g.fillStyle = q.button.color, g.fillRect(-25, -3, 50, 6), g.fillRect(-3, -25, 6, 50), g.restore(), A(g, q, v / 2, E / 2 * (1 + q.circle.radius), 1.2 * q.font.statussize, h && h.message ? e.ell_text(h.message, q.error.statuslimit) : h, q.error.color), c.changed = !1);
          g.restore();
          this.info && (n !== a.NOTHING ? (this._infoShown = !0, this.info.render()) : this._infoShown = !1);
          c.changed |=
            b;
          this.rendering = !1
        }
      };
    b.prototype.react = function() {
      if (!this.hidden) {
        var c = this.player,
          f = this.state.happens,
          h = d.progress.buttonWidth;
        if (f !== a.NOTHING && f !== a.LOADING && f !== a.ERROR) {
          var n = this.state.mpos,
            p = this.bounds[2],
            m = this.bounds[3];
          if (!this.invisible && b.isInProgressArea(n, p, m)) {
            if (n.x > h && n.x < p - h) {
              time = e.roundTo(c.state.duration * (n.x - h) / (p - 2 * h), 1);
              time > c.anim.duration && (time = c.anim.duration);
              c.seek(time);
              this.state.time = time;
              return
            }
            if (n.x > p - h) {
              c.toggleMute();
              return
            }
          }
          f === a.STOPPED ? c.play(0) : f === a.PAUSED ?
            c.play(this.state.time) : f === a.PLAYING && c.pause()
        }
      }
    };
    b.prototype.handleAreaChange = function() {
      this.player && this.player.canvas && (this.bounds = f.getCanvasBounds(this.canvas))
    };
    b.prototype.handleMouseMove = function(c) {
      this.state.mouseInteracted = !0;
      c = f.getEventPosition(c, this.canvas);
      this.state.mpos.x = c.x;
      this.state.mpos.y = c.y;
      if (this.state.happens === a.PLAYING || this.state.happens === a.PAUSED) b.isInProgressArea(this.state.mpos, this.bounds[2], this.bounds[3]) ? (this.state.changed = !0, this.state.mouseInProgressArea = !0) : (this.state.mouseInProgressArea && (this.state.changed = !0), this.state.mouseInProgressArea = !1)
    };
    b.prototype.handleClick = function() {
      this.state.changed = !0;
      this.state.mouseInteracted = !0;
      this.show();
      this.react()
    };
    b.prototype.handleMouseEnter = function() {
      this.show();
      this.forceNextRedraw()
    };
    b.prototype.handleMouseLeave = function() {
      this.state.happens !== a.PLAYING && this.state.happens !== a.PAUSED || this.hide()
    };
    b.prototype.hide = function() {
      0 !== this.state.alpha && 2 !== this.state.fadeMode && (this.state.fadeMode = 2, this.state.fadeTimer =
        d.fadeTimes.fadeout - this.state.fadeTimer, this.state.changed = !0)
    };
    b.prototype.show = function() {
      1 !== this.state.alpha && 1 !== this.state.fadeMode && (this.state.fadeMode = 1, this.state.fadeTimer = d.fadeTimes.fadein - this.state.fadeTimer, this.state.changed = !0)
    };
    b.prototype.reset = function() {
      this.info && this.info.reset()
    };
    b.prototype.detach = function(a) {
      this.stopRenderLoop();
      f.detachElement(a, this.canvas);
      this.info && this.info.detach(a);
      this.ctx && f.clearAnmProps(this.ctx)
    };
    b.prototype.changeTheme = function(a) {
      this.theme =
        a;
      this.state.changed = !0
    };
    b.prototype.forceNextRedraw = function() {
      this.state.changed = !0
    };
    b.prototype.enable = function() {
      this.update(this.player.canvas)
    };
    b.prototype.disable = function() {
      this.hide();
      this.detach(this.player.wrapper)
    };
    b.prototype.enableInfo = function() {};
    b.prototype.disableInfo = function() {};
    var n = f.getRequestFrameFunc(),
      h = f.getCancelFrameFunc(),
      t = null;
    b.prototype.setupRenderLoop = function() {
      var a = this,
        b = function(c) {
          a.render.call(a, c);
          t = n(b)
        };
      t = n(b)
    };
    b.prototype.stopRenderLoop = function() {
      t &&
        h(t)
    };
    b.isInProgressArea = function(a, b, c) {
      return a.y <= c && a.y >= c - d.bottomControls.height
    };
    var w = function(a, b, c, d, e) {
        a.save();
        c /= 2;
        d /= 2;
        a.beginPath();
        a.fillStyle = b.circle.color;
        a.arc(c, d, b.circle.radius, 0, 2 * Math.PI);
        a.fill();
        a.restore()
      },
      r = function(a, b, c, d, e) {
        a.save();
        var m = b.progress.buttonWidth,
          g = b.bottomControls.height;
        a.fillStyle = b.progress.backColor;
        a.fillRect(0, d - g, c, g);
        a.fillStyle = b.progress.inactiveColor;
        a.fillRect(m, d - 10, c - 2 * m, 5);
        c = Math.round(e * (c - 2 * m));
        a.fillStyle = b.progress.activeColor;
        a.fillRect(m,
          d - 10, c, 5);
        a.restore()
      },
      z = function(a, b, c, d, e) {
        a.save();
        c /= 2;
        d /= 2;
        a.strokeStyle = "transparent";
        a.fillStyle = b.button.color;
        a.beginPath();
        a.moveTo(c - 12, d - 20);
        a.lineTo(c - 12, d + 20);
        a.lineTo(c + 18, d);
        a.lineTo(c - 12, d - 20);
        a.closePath();
        a.fill();
        a.restore()
      },
      y = function(a, b, c, e) {
        a.save();
        b -= d.progress.buttonWidth;
        c -= d.bottomControls.height;
        a.strokeStyle = "transparent";
        a.lineWidth = 1;
        a.fillStyle = d.button.color;
        a.beginPath();
        a.translate(b, c);
        a.moveTo(3, 6);
        a.lineTo(6, 6);
        a.lineTo(12, 3);
        a.lineTo(12, 12);
        a.lineTo(6, 9);
        a.lineTo(3, 9);
        a.lineTo(3, 6);
        a.closePath();
        a.fill();
        a.lineWidth = 1;
        a.strokeStyle = d.button.color;
        a.beginPath();
        if (e) a.moveTo(15, 5), a.lineTo(21, 10), a.moveTo(15, 10), a.lineTo(21, 5), a.stroke();
        else
          for (e = 0; 3 > e; e++) a.beginPath(), a.moveTo(15 + 3 * e, 3), a.bezierCurveTo(18 + 3 * e, 7, 18 + 3 * e, 8, 15 + 3 * e, 12), a.stroke();
        a.restore()
      },
      x = function(a, c, d, f, p, m, g, q) {
        var h = c.progress.buttonWidth;
        b.isInProgressArea(q, d, f) && q.x > h && q.x < d - h && (g = (q.x - h) / (d - 2 * h), p = Math.round(m * g));
        m = h + Math.round(g * (d - 2 * h));
        a.beginPath();
        a.fillStyle = c.progress.backColor;
        a.strokeStyle = "transparent";
        a.clearRect(0, f - 40, d, 20);
        d = Math.min(Math.max(1, m - 17), d - 35);
        m = f - 40;
        g = d + 34;
        q = m + 20;
        a.moveTo(d + 3, m);
        a.lineTo(g - 3, m);
        a.quadraticCurveTo(g, m, g, m + 3);
        a.lineTo(g, m + 20 - 3);
        a.quadraticCurveTo(g, q, g - 3, q);
        a.lineTo(d + 3, q);
        a.quadraticCurveTo(d, q, d, q - 3);
        a.lineTo(d, m + 3);
        a.quadraticCurveTo(d, m, d + 3, m);
        a.moveTo(d + 17 - 3, m + 20);
        a.lineTo(d + 17, m + 20 + 3);
        a.lineTo(d + 17 + 3, m + 20);
        a.closePath();
        a.fill();
        A(a, c, d + 17, f - 30, 8, e.fmt_time(p))
      },
      A = function(a, b, c, d, e, m, g, f) {
        a.save();
        a.font = b.font.weight + " " + Math.floor(e ||
          15) + "pt " + b.font.face;
        a.textAlign = f || "center";
        a.textBaseline = "middle";
        a.fillStyle = g || b.font.color;
        a.fillText(m, c, d);
        a.restore()
      };
    v.exports = b
  }, {
    "../constants.js": 12,
    "../loc.js": 27,
    "../utils.js": 39,
    "./controls_theme.json": 37,
    "./infoblock.js": 38,
    engine: 40
  }],
  37: [function(c, v, k) {
    v.exports = {
      font: {
        face: "Arial, sans-serif",
        weight: "bold",
        timesize: 13.5,
        statussize: 8.5,
        infosize_a: 10,
        infosize_b: 8,
        color: "white"
      },
      circle: {
        radius: 40,
        color: "rgba(0,0,0,0.7)"
      },
      bottomControls: {
        height: 15
      },
      progress: {
        backColor: "rgba(0,0,0,0.7)",
        activeColor: "white",
        inactiveColor: "rgba(255,255,255,0.5)",
        buttonWidth: 27
      },
      button: {
        color: "white"
      },
      loading: {
        factorBackColor: "rgba(0,0,0,0.7)",
        factorDoneColor: "rgba(255,255,255,0.8)",
        factorErrorColor: "rgba(255,0,0,0.8)",
        factorLineWidth: 14
      },
      fadeTimes: {
        fadein: 300,
        fadeout: 300,
        idle: 2500
      },
      error: {
        statusLimit: 40,
        color: "darkred"
      }
    }
  }, {}],
  38: [function(c, v, k) {
    v.exports = function(b, c) {}
  }, {}],
  39: [function(c, v, k) {
    (function(b) {
      function e() {}
      c("./constants.js");
      c("./errors.js");
      var a = {
        defined: function(a) {
          return !("undefined" ===
            typeof a || null === a || void 0 === a)
        }
      };
      a.finite = b.isFinite;
      a.nan = b.isNaN;
      a.arr = Array.isArray;
      a.integer = function(b) {
        return a.num(b) && Math.floor(b) == b
      };
      a.num = function(c) {
        c = b.parseFloat(c);
        return !a.nan(c) && a.finite(c)
      };
      a.fun = function(a) {
        return "function" === typeof a
      };
      a.obj = function(a) {
        return "object" === typeof a
      };
      a.str = function(a) {
        return "string" === typeof a
      };
      a.not_empty = function(a) {
        return Object.keys ? 0 < Object.keys(a).length : 0 < Object.getOwnPropertyNames(a).length
      };
      a.modifier = function(a) {
        return a instanceof anm.Modifier
      };
      a.painter = function(a) {
        return a instanceof anm.Painter
      };
      a.tween = function(b) {
        return a.modifier(b) && b.is_tween
      };
      a.equal = function(b, c) {
        if (b === c) return !0;
        if (!(b instanceof Object && c instanceof Object) || b.constructor !== c.constructor) return !1;
        for (var e in b)
          if (b.hasOwnProperty(e) && (!c.hasOwnProperty(e) || b[e] !== c[e] && ("object" !== typeof b[e] || !a.equal(b[e], c[e])))) return !1;
        for (e in c)
          if (c.hasOwnProperty(e) && !b.hasOwnProperty(e)) return !1;
        return !0
      };
      v.exports = {
        fmt_time: function(b) {
          if (!a.finite(b)) return "\u221e";
          var c = Math.abs(b),
            e = Math.floor(c / 3600),
            h = Math.floor((c - 3600 * e) / 60),
            c = Math.floor(c - 3600 * e - 60 * h);
          return (0 > b ? "-" : "") + (0 < e ? (10 > e ? "0" + e : e) + ":" : "") + (10 > h ? "0" + h : h) + ":" + (10 > c ? "0" + c : c)
        },
        ell_text: function(a, b) {
          if (!a) return "";
          var c = a.length;
          if (c <= b) return a;
          var e = Math.floor(c / 2) - 2;
          return a.slice(0, e) + "..." + a.slice(c - e)
        },
        compareFloat: function(a, b, c) {
          0 !== c && (c = c || 2);
          c = Math.pow(10, c);
          return Math.round(a * c) == Math.round(b * c)
        },
        roundTo: function(a, b) {
          if (!b) return Math.round(a);
          var c = Math.pow(10, b);
          return Math.round(a *
            c) / c
        },
        interpolateFloat: function(a, b, c) {
          return a * (1 - c) + b * c
        },
        paramsToObj: function(a) {
          var b = {};
          a = a.split("&");
          for (var c = a.length, e; c--;) e = a[c].split("="), b[e[0]] = e[1];
          return b
        },
        obj_clone: function(a) {
          var b = {},
            c;
          for (c in a) b[c] = a[c];
          return b
        },
        mrg_obj: function(b, c, e) {
          if (!c) return b;
          e = e || {};
          for (var h in c) e[h] = a.defined(b[h]) ? b[h] : c[h];
          return e
        },
        strf: function(b, c) {
          return b.replace(/{(\d+)}/g, function(b, e) {
            return a.defined(c[e]) ? c[e] : b
          })
        },
        guid: function() {
          return Math.random().toString(36).substring(2, 10) +
            Math.random().toString(36).substring(2, 10)
        },
        fit_rects: function(a, b, c, e) {
          var k = a / c,
            w = b / e,
            r = Math.min(k, w);
          a = (a - c * r) / 2;
          var v = (b - e * r) / 2,
            y = c * r,
            x = e * r;
          return 1 != k || 1 != w ? (e = [a, v, y, x], 0 !== a ? [r, e, [0, 0, a, b],
            [a + y, 0, a, b]
          ] : 0 !== v ? [r, e, [0, 0, c, v],
            [0, v + x, c, v]
          ] : [r, e]) : [1, [0, 0, c, e]]
        },
        is: a,
        iter: function(a) {
          if (a.__iter) return a.__iter.reset(), a.__iter;
          var b = 0,
            c = a.length;
          return a.__iter = {
            next: function() {
              if (b < c) return a[b++];
              b = 0;
              throw new e;
            },
            hasNext: function() {
              return b < c
            },
            remove: function() {
              c--;
              return a.splice(--b, 1)
            },
            reset: function() {
              b =
                0;
              c = a.length
            },
            get: function() {
              return a[b]
            },
            each: function(a, b) {
              for (this.reset(); this.hasNext();) !1 === a(this.next()) && (b ? b(this.remove()) : this.remove())
            }
          }
        },
        keys: function(a, b) {
          if (Object.keys)
            for (var c = Object.keys(a), e = 0; e < c.length && !1 !== b(c[e], a[c[e]]); e++);
          else
            for (c in a)
              if (!1 === b(c, a[c])) break
        },
        removeElement: function(b, c) {
          if (a.arr(b)) {
            var e = b.indexOf(c); - 1 < e && b.splice(e, 1)
          } else b[c] = null
        },
        postpone: function(a) {
          setTimeout(a, 0)
        },
        makeApiUrl: function(a, b, c) {
          var e = "//" + a + ".animatron.com" + b;
          a = "//" + a + ".animatron-test.com" +
            b;
          var k = b = !1;
          "string" === typeof c ? (b = -1 !== c.indexOf("animatron-test.com"), k = -1 !== c.indexOf("animatron.com")) : window && window.location && (c = window.location.hostname, b = -1 !== c.indexOf("animatron-test.com"), k = -1 !== c.indexOf("animatron.com"));
          if (b) return a;
          if (k) return e
        },
        getObjectId: function() {
          return ((new Date).getTime() / 1E3 | 0).toString(16) + "xxxxxxxxxxxxxxxx".replace(/[x]/g, function() {
            return (16 * Math.random() | 0).toString(16)
          }).toLowerCase()
        }
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ?
      self : "undefined" !== typeof window ? window : {})
  }, {
    "./constants.js": 12,
    "./errors.js": 13
  }],
  40: [function(c, v, k) {
    (function(b) {
      for (var e = "undefined" !== typeof window ? window : {}, a = "undefined" !== typeof window ? window.document : {}, f = "undefined" !== typeof b ? b : {}, d = {}, k = f.requestAnimationFrame, h = f.cancelAnimationFrame, t = 0, w = ["ms", "moz", "webkit", "o"], r = 0; r < w.length && !f.requestAnimationFrame; ++r) k = f[w[r] + "RequestAnimationFrame"], h = f[w[r] + "CancelAnimationFrame"] || f[w[r] + "CancelRequestAnimationFrame"];
      k || (k = function(a,
        b) {
        var c = (new Date).getTime(),
          d = Math.max(0, 16 - (c - t)),
          f = e.setTimeout(function() {
            a(c + d)
          }, d);
        t = c + d;
        return f
      });
      h || (h = function(a) {
        clearTimeout(a)
      });
      d.getRequestFrameFunc = function() {
        return k
      };
      d.getCancelFrameFunc = function() {
        return h
      };
      d.PX_RATIO = e.devicePixelRatio || 1;
      d.ajax = function(a, b, c, f, h, k, r) {
        var n;
        r = "boolean" === typeof r ? r : !0;
        n = d.isIE9 ? new e.XDomainRequest : new e.XMLHttpRequest;
        if (!n) throw Error("Failed to create XMLHttp instance");
        n.onreadystatechange = function() {
          if (4 == n.readyState)
            if (200 == n.status) b &&
              b(n);
            else {
              var d = Error("AJAX request for " + a + " returned " + n.status + " instead of 200");
              if (c) c(d, n);
              else throw d;
            }
        };
        d.isIE9 && (n.onload = function() {
          b(n)
        }, n.onerror = function() {
          c && c(Error("XDomainRequest Error"), n)
        });
        n.open(f || "GET", a, r);
        if (h && !d.isIE9)
          for (var u in h) n.setRequestHeader(u, h[u]);
        n.send(k)
      };
      d.getCookie = function(b) {
        var c = a.cookie,
          d;
        if (c)
          for (d = 0, c = c.split("; "); d < c.length; d++)
            if (c[d] = c[d].split("=", 2), unescape(c[d][0]) == b) return unescape(c[d][1]);
        return null
      };
      d.onDocReady = function(b) {
        if (d.isDocReady()) b();
        else {
          var c;
          a.addEventListener ? c = a.addEventListener("DOMContentLoaded", function() {
            a.removeEventListener("DOMContentLoaded", c, !1);
            b()
          }, !1) : a.attachEvent && (c = function() {
            "complete" === a.readyState && (a.detachEvent("onreadystatechange", c), b())
          }, a.attachEvent("onreadystatechange", c))
        }
      };
      d.isDocReady = function() {
        return "complete" === a.readyState || "interactive" === a.readyState
      };
      d.__stylesTag = null;
      d.WRAPPER_CLASS = "anm-wrapper";
      d.WRAPPER_INSTANCE_CLASS_PREFIX = "anm-wrapper-";
      d.PLAYER_CLASS = "anm-player";
      d.PLAYER_INSTANCE_CLASS_PREFIX =
        "anm-player-";
      d.CONTROLS_CLASS = "anm-controls";
      d.CONTROLS_INSTANCE_CLASS_PREFIX = "anm-controls-";
      d.INFO_CLASS = "anm-controls";
      d.INFO_INSTANCE_CLASS_PREFIX = "anm-controls-";
      d.ensureGlobalStylesInjected = function() {
        if (!d.__stylesTag) {
          var b = a.getElementById("anm-player-styles");
          if (!b) {
            b = a.createElement("style");
            b.id = "anm-player-styles";
            var e = c("../../res/player.css");
            b.innerHTML = e;
            a.head.appendChild(b)
          }
          d.__stylesTag = b
        }
      };
      d.injectElementStyles = function(a, b, c) {
        a.classList ? (a.classList.add(b), a.classList.add(c)) :
          a.className = a.className ? a.className + (b + " " + c) : b + " " + c;
        a = d.getAnmProps(a);
        a.gen_class = b;
        a.inst_class = c
      };
      d.__textBuf = a.getElementById("anm-text-measurer");
      d.createTextMeasurer = function() {
        var b = d.__textBuf;
        if (!b) d.onDocReady(function() {
          var c = a.createElement("div"),
            e = a.createElement("span");
          e.id = "anm-text-measurer";
          c.id = "anm-text-measurer-container";
          c.appendChild(e);
          a.body.appendChild(c);
          d.__textBuf = e;
          b = d.__textBuf
        });
        return function(a, c) {
          var d = "undefined" !== typeof c ? c : a.lines;
          b.style.font = a.$font;
          b.style.whiteSpace =
            "pre";
          if (anm.utils.is.arr(d)) {
            for (var e = 0, f = 0, h = 0, k = d.length; h < k; h++) b.textContent = d[h] || " ", e = Math.max(b.offsetWidth, e), f += b.offsetHeight;
            return [e, f]
          }
          b.textContent = d.toString() || "";
          return [b.offsetWidth, b.offsetHeight]
        }
      };
      d.getElementById = function(b) {
        return a.getElementById(b)
      };
      d.findElementPosition = function(a) {
        if (a.getBoundingClientRect) return a = a.getBoundingClientRect(), [a.left, a.top];
        var b = 0,
          c = 0;
        do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
        return [b, c]
      };
      d.findScrollAwarePosition = function(b) {
        var c =
          0,
          d = 0;
        if (b.getBoundingClientRect) {
          var e = b.getBoundingClientRect();
          do c += b !== a.body ? b.scrollLeft : a.documentElement.scrollLeft, d += b !== a.body ? b.scrollTop : a.documentElement.scrollTop; while (b = b.offsetParent);
          return [e.left - c, e.top - d]
        }
        do c += b.offsetLeft - (b !== a.body ? b.scrollLeft : a.documentElement.scrollLeft), d += b.offsetTop - (b !== a.body ? b.scrollTop : a.documentElement.scrollTop); while (b = b.offsetParent);
        return [c, d]
      };
      d.moveElementTo = function(a, b, c) {
        var e = d.hasAnmProps(a);
        (e && e.inst_rule || a).style.left = 0 === b ? "0" :
          b + "px";
        (e && e.inst_rule || a).style.top = 0 === c ? "0" : c + "px"
      };
      d.__trashBin = null;
      d.disposeElement = function(b) {
        var c = d.__trashBin;
        c || (c = a.createElement("div"), c.id = "trash-bin", c.style.display = "none", a.body.appendChild(c), d.__trashBin = c);
        c.appendChild(b);
        c.innerHTML = ""
      };
      d.detachElement = function(a, b) {
        (a || b.parentNode).removeChild(b)
      };
      d.showElement = function(a) {
        a.style.visibility = "visible"
      };
      d.hideElement = function(a) {
        a.style.visibility = "hidden"
      };
      d.clearChildren = function(a) {
        for (; a.firstChild;) a.removeChild(a.firstChild)
      };
      d.newCanvas = function() {
        var b = a.createElement("canvas");
        b.style.outline = "none";
        return b
      };
      d.createCanvas = function(a, b, c, e) {
        var f = d.newCanvas();
        d.setCanvasSize(f, a, b, e);
        c && d.setCanvasBackground(f, c);
        return f
      };
      d.assignPlayerToWrapper = function(b, c, g) {
        if (!b) throw Error("Element passed to anm.Player initializer does not exist.");
        anm.utils.is.str(b) && (b = a.getElementById(b));
        var f = "canvas" == b.tagName || "CANVAS" == b.tagName;
        f && e.console && console.warn("NB: A <canvas> tag was passed to the anm.Player as an element to attach to. This is not a recommended way since version 1.2; this <canvas> will be moved inside a <div>-wrapper because of it, so it may break document flow and/or CSS styles. Please pass any container such as <div> to a Player instead of <canvas> to fix it.");
        var h = b.cloneNode(!1);
        g = f ? b : d.newCanvas();
        b = f ? a.createElement("div") : b;
        if (b.getAttribute("anm-player")) throw Error("Player is already attached to element '" + (b.id || g.id) + "'.");
        b.setAttribute("anm-player", !0);
        b.hasAttribute("anm-player-target") && b.removeAttribute("anm-player-target");
        g.hasAttribute("anm-player-target") && g.removeAttribute("anm-player-target");
        var k = g.id;
        g.id = "";
        b.id || (b.id = k);
        g.id = b.id + "-cvs";
        k = d.getAnmProps(g);
        k.wrapper = b;
        k.was_before = h;
        h = b.id;
        k.id = h;
        if (f)
          if (f = g.parentNode || a.body) f.replaceChild(b,
            g), b.appendChild(g);
          else throw Error("Provided canvas tag has no parent");
        else b.appendChild(g);
        d.ensureGlobalStylesInjected();
        d.injectElementStyles(b, d.WRAPPER_CLASS, d.WRAPPER_INSTANCE_CLASS_PREFIX + (h || "no-id"));
        d.injectElementStyles(g, d.PLAYER_CLASS, d.PLAYER_INSTANCE_CLASS_PREFIX + (h || "no-id"));
        d.subscribeWrapperToStateChanges(b, c);
        return {
          wrapper: b,
          canvas: g,
          id: h
        }
      };
      d.playerAttachedTo = function(a, b) {
        if (d.hasAnmProps(a)) {
          var c = d.getAnmProps(a);
          if (c.wrapper) return c.wrapper.hasAttribute("anm-player")
        }
        return a.hasAttribute("anm-player")
      };
      d.findPotentialPlayers = function() {
        return a.querySelectorAll("[anm-player-target]")
      };
      d.hasAnmProps = function(a) {
        return a.__anm
      };
      d.getAnmProps = function(a) {
        a.__anm || (a.__anm = {});
        return a.__anm
      };
      d.clearAnmProps = function(a) {
        a && a.__anm && delete a.__anm
      };
      d.detachPlayer = function(b) {
        var c = b.canvas,
          e = b.wrapper;
        e && e.removeAttribute("anm-player");
        var f = e.parentNode || a.body,
          h = e.nextSibling,
          k = d.getAnmProps(c);
        d.clearChildren(e);
        k.was_before && (f.removeChild(e), f.insertBefore(k.was_before, h));
        d.clearAnmProps(e);
        d.clearAnmProps(c);
        b.controls && (d.clearAnmProps(b.controls.canvas), b.controls.info && d.clearAnmProps(b.controls.info.canvas));
        b.statImg && d.detachElement(null, b.statImg)
      };
      d.getContext = function(a, b) {
        return a.getContext(b)
      };
      d.extractUserOptions = function(a) {
        function b(a) {
          if ("undefined" !== typeof a) {
            if (null === a) return null;
            if ("0" == a) return !1;
            if ("1" == a) return !0;
            if ("false" == a) return !1;
            if ("true" == a) return !0;
            if ("off" == a) return !1;
            if ("on" == a) return !0;
            if ("no" == a) return !1;
            if ("yes" == a) return !0
          }
        }

        function c(a) {
          return "undefined" === typeof a ?
            void 0 : null === a ? null : a ? Number.parseFloat(a) / 100 : 0
        }
        var e = d.PX_RATIO,
          f = a.getAttribute("anm-width");
        f || (f = a.hasAttribute("width") ? a.getAttribute("width") / e : void 0);
        var h = a.getAttribute("anm-height");
        h || (h = a.hasAttribute("height") ? a.getAttribute("height") / e : void 0);
        return {
          debug: b(a.getAttribute("anm-debug")),
          mode: a.getAttribute("anm-mode"),
          repeat: b(a.getAttribute("anm-repeat")),
          zoom: a.getAttribute("anm-zoom"),
          speed: a.getAttribute("anm-speed"),
          width: f,
          height: h,
          autoPlay: b(a.getAttribute("anm-autoplay") ||
            a.getAttribute("anm-auto-play")),
          startFrom: c(a.getAttribute("anm-start-from")),
          stopAt: c(a.getAttribute("anm-stop-at")),
          bgColor: a.getAttribute("anm-bgcolor") || a.getAttribute("anm-bg-color"),
          ribbonsColor: a.getAttribute("anm-ribbons") || a.getAttribute("anm-ribcolor") || a.getAttribute("anm-rib-color"),
          drawStill: b(a.getAttribute("anm-draw-still") || a.getAttribute("anm-draw-thumbnail") || a.getAttribute("anm-draw-thumb")),
          imagesEnabled: b(a.getAttribute("anm-images") || a.getAttribute("anm-images-enabled")),
          shadowsEnabled: b(a.getAttribute("anm-shadows") ||
            a.getAttribute("anm-shadows-enabled")),
          audioEnabled: b(a.getAttribute("anm-audio") || a.getAttribute("anm-audio-enabled")),
          controlsEnabled: b(a.getAttribute("anm-controls") || a.getAttribute("anm-controls-enabled")),
          infoEnabled: b(a.getAttribute("anm-info") || a.getAttribute("anm-info-enabled")),
          handleEvents: b(a.getAttribute("anm-events") || a.getAttribute("anm-handle-events")),
          infiniteDuration: b(a.getAttribute("anm-infinite") || a.getAttribute("anm-infinite-duration")),
          forceSceneSize: b(a.getAttribute("anm-scene-size") ||
            a.getAttribute("anm-force-scene-size")),
          inParent: void 0,
          muteErrors: b(a.getAttribute("anm-mute-errors")),
          loadingMode: a.getAttribute("anm-loading-mode"),
          thumbnail: a.getAttribute("anm-thumbnail")
        }
      };
      d.checkPlayerCanvas = function(a) {
        return !0
      };
      d.hasUrlToLoad = function(a) {
        return {
          url: a.getAttribute("anm-url") || a.getAttribute("anm-src"),
          importer_id: a.getAttribute("anm-importer")
        }
      };
      d.setTabIndex = function(a, b) {
        a.setAttribute("tabindex", b)
      };
      d.getCanvasParameters = function(a) {
        if (!d.hasAnmProps(a)) return null;
        a = d.getAnmProps(a);
        return a.width && a.height ? [a.width, a.height, d.PX_RATIO] : null
      };
      d.getCanvasSize = function(a) {
        return a.getBoundingClientRect ? (a = a.getBoundingClientRect(), [a.width, a.height]) : [a.getAttribute("clientWidth") || a.clientWidth, a.getAttribute("clientHeight") || a.clientHeight]
      };
      d.getCanvasPosition = function(a) {
        return d.findScrollAwarePosition(a)
      };
      d.getCanvasBounds = function(a) {
        var b = d.getCanvasParameters(a);
        if (!b) return null;
        a = d.getCanvasPosition(a);
        return [a[0], a[1], b[0], b[1], b[2]]
      };
      d.setCanvasSize = function(a, b, c,
        e) {
        e = e || d.PX_RATIO;
        b |= 0;
        c |= 0;
        var f = d.getAnmProps(a);
        f.ratio = e;
        f.width = b;
        f.height = c;
        a.style.width = b + "px";
        a.style.height = c + "px";
        a.setAttribute("width", b * (e || 1));
        a.setAttribute("height", c * (e || 1));
        d._saveCanvasPos(a);
        return [b, c]
      };
      d.setCanvasPosition = function(a, b, c) {
        var e = d.getAnmProps(a);
        e.usr_x = b;
        e.usr_y = c;
        d._saveCanvasPos(a)
      };
      d.setCanvasBackground = function(a, b) {
        a.style.backgroundColor = b
      };
      d._saveCanvasPos = function(b) {
        var c = a.defaultView && a.defaultView.getComputedStyle,
          e = c ? parseInt(c(b, null).paddingLeft,
            10) || 0 : 0,
          f = c ? parseInt(c(b, null).paddingTop, 10) || 0 : 0,
          h = c ? parseInt(c(b, null).borderLeftWidth, 10) || 0 : 0,
          c = c ? parseInt(c(b, null).borderTopWidth, 10) || 0 : 0,
          k = a.body.parentNode,
          n = k.offsetLeft,
          r = k.offsetTop,
          u = b,
          k = e + h + n,
          w = f + c + r;
        if (void 0 !== u.offsetParent) {
          do k += u.offsetLeft, w += u.offsetTop; while (u = u.offsetParent)
        }
        k += e + h + n;
        w += f + c + r;
        b = d.getAnmProps(b);
        b.offset_left = k || b.usr_x;
        b.offset_top = w || b.usr_y
      };
      d.setWrapperSize = function(a, b, c) {
        b |= 0;
        c |= 0;
        var e = d.getAnmProps(a);
        e.width = b;
        e.height = c;
        a.style.width = b + "px";
        a.style.height =
          c + "px";
        return [b, c]
      };
      d.addCanvasOverlay = function(b, c, g, f) {
        var h = d.getAnmProps(c),
          k = h.wrapper || c.parentNode || a.body,
          n = g[0],
          r = g[1],
          u = g[2],
          w = g[3];
        g = d.getCanvasSize(c);
        var v = g[0],
          t = g[1],
          x = e.getComputedStyle ? e.getComputedStyle(c) : c.currentStyle;
        g = parseFloat(x.getPropertyValue("border-left-width"));
        x = parseFloat(x.getPropertyValue("border-top-width"));
        u *= v;
        w *= t;
        v = d.newCanvas();
        v.id = h.id ? "__" + h.id + "_" + b : "__anm_" + b;
        b = d.getAnmProps(v);
        f && f(v, c);
        d.setCanvasSize(v, u, w);
        d.moveElementTo(v, n * u + g, r * w - x);
        (k || a.body).insertBefore(v,
          c.nextSibling);
        b.ref_canvas = c;
        h.overlays || (h.overlays = []);
        h.overlays.push(v);
        return v
      };
      d.updateCanvasOverlays = function(a) {
        var b = d.getAnmProps(a),
          c = b.overlays;
        if (c)
          for (var e = 0, f = c.length; e < f; e++) d.updateOverlay(a, c[e], b)
      };
      d.updateOverlay = function(a, b, c) {
        c = c || d.getAnmProps(a);
        d.setCanvasSize(b, c.width, c.height)
      };
      d.registerAsControlsElement = function(a, b) {
        d.injectElementStyles(a, d.CONTROLS_CLASS, d.CONTROLS_INSTANCE_CLASS_PREFIX + (b.id || "no-id"))
      };
      d.registerAsInfoElement = function(a, b) {
        d.injectElementStyles(a,
          d.INFO_CLASS, d.INFO_INSTANCE_CLASS_PREFIX + (b.id || "no-id"))
      };
      d.getEventPosition = function(a, b) {
        if (b) {
          var c = d.findElementPosition(b);
          return {
            x: a.clientX - c[0],
            y: a.clientY - c[1]
          }
        }
        return {
          x: a.x,
          y: a.y
        }
      };
      d.subscribeElementEvents = function(a, b) {
        for (var c in b) a.addEventListener(c, b[c], !1)
      };
      d.unsubscribeElementEvents = function(a, b) {
        for (var c in b) a.removeEventListener(c, b[c], !1)
      };
      d.subscribeWindowEvents = function(a) {
        d.subscribeElementEvents(e, a)
      };
      d.subscribeCanvasEvents = d.subscribeElementEvents;
      d.unsubscribeCanvasEvents =
        d.unsubscribeElementEvents;
      d.keyEvent = function(a) {
        return {
          key: null !== a.keyCode ? a.keyCode : a.which,
          ch: a.charCode
        }
      };
      d.mouseEvent = function(a, b) {
        return {
          pos: d.getEventPosition(a, b)
        }
      };
      d.preventDefault = function(a) {
        a.stopPropagation();
        a.preventDefault()
      };
      var z = d.keyEvent,
        y = d.mouseEvent;
      d.subscribeAnimationToEvents = function(a, b, c) {
        if (!a.__anm.subscribed || !a.__anm.subscribed[b.id]) {
          a.__anm.handlers || (a.__anm.handlers = {});
          a.__anm.subscribed || (a.__anm.subscribed = {});
          var e = a.__anm.subscribed[b.id] || {
            click: function(d) {
              b.fire(c.click,
                y(d, a))
            },
            dblclick: function(d) {
              b.fire(c.dblclick, y(d, a))
            },
            mouseup: function(d) {
              b.fire(c.mouseup, y(d, a))
            },
            mousedown: function(d) {
              b.fire(c.mousedown, y(d, a))
            },
            mousemove: function(d) {
              b.fire(c.mousemove, y(d, a))
            },
            keypress: function(a) {
              b.fire(c.keypress, z(a))
            },
            keyup: function(a) {
              b.fire(c.keyup, z(a))
            },
            keydown: function(a) {
              b.fire(c.keydown, z(a))
            }
          };
          a.__anm.handlers[b.id] = e;
          a.__anm.subscribed[b.id] = !0;
          d.subscribeCanvasEvents(a, e)
        }
      };
      d.unsubscribeAnimationFromEvents = function(a, b) {
        if (a.__anm.handlers && a.__anm.subscribed &&
          a.__anm.subscribed[b.id]) {
          var c = a.__anm.handlers[b.id];
          c && d.unsubscribeCanvasEvents(a, c)
        }
      };
      d.subscribeWrapperToStateChanges = function(a, b) {
        if (a.classList) {
          var c = anm.constants;
          b.on(c.S_CHANGE_STATE, function(d) {
            var e = [];
            switch (d) {
              case c.NOTHING:
                e = ["anm-state-nothing"];
                break;
              case c.STOPPED:
                e = ["anm-state-stopped"];
                break;
              case c.PLAYING:
                e = ["anm-state-playing"];
                break;
              case c.PAUSED:
                e = ["anm-state-paused"];
                break;
              case c.LOADING:
                e = ["anm-state-loading"];
                break;
              case c.RES_LOADING:
                e = ["anm-state-loading", "anm-state-resources-loading"];
                break;
              case c.ERROR:
                e = ["anm-state-error"]
            }
            if (e.length) {
              d = a.classList;
              var f, h;
              if (b.__prev_classes && b.__prev_classes.length) {
                var k = b.__prev_classes;
                f = 0;
                for (h = k.length; f < h; f++) d.remove(k[f])
              } else d.contains("anm-state-nothing") && d.remove("anm-state-nothing");
              f = 0;
              for (h = e.length; f < h; f++) d.add(e[f]);
              b.__prev_classes = e
            }
          })
        }
      };
      d.createStatImg = function() {
        var b = a.createElement("img");
        b.style.position = "absolute";
        b.style.top = "-9999px";
        b.style.left = "-9999px";
        b.style.visibility = "hidden";
        a.body.appendChild(b);
        return b
      };
      d.getWebfontStyleObject = function() {
        var b = document.getElementById("anm-webfonts");
        if (b) return b;
        b = a.createElement("style");
        b.type = "text/css";
        b.id = "anm-webfonts";
        b.innerHTML = "";
        document.body.appendChild(b);
        return b
      };
      d.createAudio = function() {
        return a.createElement("audio")
      };
      d.createVideo = function(b, c) {
        var d = a.createElement("video");
        d.width = b;
        d.height = c;
        return d
      };
      d.createSource = function() {
        return a.createElement("source")
      };
      d.appendToBody = function(b) {
        a.body.appendChild(b)
      };
      w = a.createElement ? d.newCanvas() : {};
      d.canvasSupported = !(!w.getContext || !w.getContext("2d"));
      d.isHttps = e.location && "https:" === e.location.protocol;
      var x = e.location && "file:" === e.location.protocol;
      d.isLocal = x;
      d.checkMediaUrl = function(a) {
        return x && "//" === a.substring(0, 2) ? (d.isHttps ? "https:" : "http:") + a : d.isHttps ? a.replace("http:", "https:") : a
      };
      w = (new Function("/*@cc_on return @_jscript_version; @*/"))();
      d.isIE9 = 9 == w;
      d.isIE10 = 10 == w;
      d.isIEorEdge = !!window.StyleMedia;
      var A, u;
      "undefined" !== typeof a.hidden ? (A = "hidden", u = "visibilitychange") : "undefined" !==
        typeof a.mozHidden ? (A = "mozHidden", u = "mozvisibilitychange") : "undefined" !== typeof a.msHidden ? (A = "msHidden", u = "msvisibilitychange") : "undefined" !== typeof a.webkitHidden && (A = "webkitHidden", u = "webkitvisibilitychange");
      "undefined" === typeof a[A] && "undefined" === typeof a.addEventListener || a.addEventListener(u, function() {
        B && B(a[A])
      }, !1);
      var B = null;
      d.onDocumentHiddenChange = function(a) {
        B = a
      };
      d.Path2D = f.Path2D;
      d.isInIframe = function() {
        return f.self !== f.top
      };
      var D = d.isInIframe() ? b : null,
        F = D ? D.document.referrer.split("/",
          3).join("/") : "*";
      d.getIframeOrigin = function() {
        return F
      };
      d.getIframeSrc = function() {
        return D ? D.location.href : null
      };
      d.addMessageListener = function(a) {
        f.addEventListener && f.addEventListener("message", a, !1)
      };
      d.postToContentWindow = function(a) {
        D && D.top.postMessage(JSON.stringify(a), F || "*")
      };
      return v.exports = d
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
  }, {
    "../../res/player.css": 2
  }],
  41: [function(c, v, k) {
    (function(b) {
      var e = c("./anm/constants.js"),
        a = c("engine"),
        f = c("./anm/player.js");
      a.onDocReady(function() {
        for (var b = a.findPotentialPlayers(), c = 0, d = b.length; c < d; c++) t.createPlayer(b[c])
      });
      var d = c("./anm/animation/element.js"),
        k = c("./anm/graphics/sheet.js"),
        h = c("./anm/graphics/segments.js"),
        t = {
          global: b,
          constants: e,
          C: e,
          loc: c("./anm/loc.js"),
          errors: c("./anm/errors.js"),
          utils: c("./anm/utils.js"),
          conf: c("./anm/conf.js"),
          log: c("./anm/log.js"),
          modules: c("./anm/modules.js"),
          importers: c("./anm/importers.js"),
          engine: a,
          events: c("./anm/events.js"),
          resource_manager: c("./anm/resource_manager.js"),
          player_manager: c("./anm/player_manager.js"),
          Player: f,
          Animation: c("./anm/animation/animation.js"),
          Element: d,
          Clip: d,
          Modifier: c("./anm/animation/modifier.js"),
          Tween: c("./anm/animation/tween.js"),
          Painter: c("./anm/animation/painter.js"),
          Brush: c("./anm/graphics/brush.js"),
          Color: c("./anm/graphics/color.js"),
          Path: c("./anm/graphics/path.js"),
          MSeg: h.MSeg,
          LSeg: h.LSeg,
          CSeg: h.CSeg,
          Text: c("./anm/graphics/text.js"),
          Sheet: k,
          Image: k,
          shapes: c("./anm/graphics/shapes.js"),
          Audio: c("./anm/media/audio.js"),
          Video: c("./anm/media/video.js"),
          interop: {
            playerjs: c("./anm/interop/playerjs-io.js")
          },
          createPlayer: function(b, c) {
            if (!a.canvasSupported) return document.getElementById(b).innerHTML = t.loc.Errors.S.SAD_SMILEY_HTML, null;
            var d = new f;
            d.init(b, c);
            return d
          },
          createImporter: function(a) {
            window.console && console.warn("anm.createImporter is deprecated and will be removed soon. Please use anm.importers.create instead");
            return t.importers.create(a)
          }
        };
      b.anm = t;
      v.exports = t
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self :
      "undefined" !== typeof window ? window : {})
  }, {
    "./anm/animation/animation.js": 3,
    "./anm/animation/element.js": 6,
    "./anm/animation/modifier.js": 7,
    "./anm/animation/painter.js": 8,
    "./anm/animation/tween.js": 10,
    "./anm/conf.js": 11,
    "./anm/constants.js": 12,
    "./anm/errors.js": 13,
    "./anm/events.js": 14,
    "./anm/graphics/brush.js": 17,
    "./anm/graphics/color.js": 18,
    "./anm/graphics/path.js": 19,
    "./anm/graphics/segments.js": 20,
    "./anm/graphics/shapes.js": 21,
    "./anm/graphics/sheet.js": 22,
    "./anm/graphics/text.js": 23,
    "./anm/importers.js": 24,
    "./anm/interop/playerjs-io.js": 25,
    "./anm/loc.js": 27,
    "./anm/log.js": 28,
    "./anm/media/audio.js": 29,
    "./anm/media/video.js": 30,
    "./anm/modules.js": 31,
    "./anm/player.js": 32,
    "./anm/player_manager.js": 33,
    "./anm/resource_manager.js": 35,
    "./anm/utils.js": 39,
    engine: 40
  }],
  42: [function(c, v, k) {
    "undefined" !== typeof v && (v.exports = function() {
      var b = ["monospace", "sans-serif", "serif"],
        c = document.getElementsByTagName("body")[0],
        a = document.createElement("span");
      a.style.fontSize = "72px";
      a.style.position = "absolute";
      a.style.top =
        "-9999px";
      a.style.left = "-9999px";
      a.innerHTML = "mmmmmmmmmmlli";
      var f = {},
        d = {},
        k;
      for (k in b) a.style.fontFamily = b[k], c.appendChild(a), f[b[k]] = a.offsetWidth, d[b[k]] = a.offsetHeight, c.removeChild(a);
      this.detect = function(h) {
        var k = !1,
          n;
        for (n in b) {
          a.style.fontFamily = h.face + "," + b[n];
          a.style.fontStyle = h.style;
          a.style.fontWeight = h.weight;
          c.appendChild(a);
          var r = a.offsetWidth != f[b[n]] || a.offsetHeight != d[b[n]];
          c.removeChild(a);
          k = k || r
        }
        return k
      }
    })
  }, {}],
  43: [function(c, v, k) {
    function b() {
      this.m = [1, 0, 0, 1, 0, 0]
    }
    b.prototype.reset =
      function() {
        this.m = [1, 0, 0, 1, 0, 0]
      };
    b.prototype.multiply = function(b) {
      var a = this.m[1] * b.m[0] + this.m[3] * b.m[1],
        c = this.m[0] * b.m[2] + this.m[2] * b.m[3],
        d = this.m[1] * b.m[2] + this.m[3] * b.m[3],
        k = this.m[0] * b.m[4] + this.m[2] * b.m[5] + this.m[4],
        h = this.m[1] * b.m[4] + this.m[3] * b.m[5] + this.m[5];
      this.m[0] = this.m[0] * b.m[0] + this.m[2] * b.m[1];
      this.m[1] = a;
      this.m[2] = c;
      this.m[3] = d;
      this.m[4] = k;
      this.m[5] = h
    };
    b.prototype.invert = function() {
      var b = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
        a = -this.m[1] * b,
        c = -this.m[2] * b,
        d = this.m[0] * b,
        k =
        b * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
        h = b * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
      this.m[0] = this.m[3] * b;
      this.m[1] = a;
      this.m[2] = c;
      this.m[3] = d;
      this.m[4] = k;
      this.m[5] = h
    };
    b.prototype.rotate = function(b) {
      var a = Math.cos(b);
      b = Math.sin(b);
      var c = this.m[1] * a + this.m[3] * b,
        d = this.m[0] * -b + this.m[2] * a,
        k = this.m[1] * -b + this.m[3] * a;
      this.m[0] = this.m[0] * a + this.m[2] * b;
      this.m[1] = c;
      this.m[2] = d;
      this.m[3] = k
    };
    b.prototype.rotateDegrees = function(b) {
      var a = b * Math.PI / 180;
      b = Math.cos(a);
      var a = Math.sin(a),
        c = this.m[1] * b + this.m[3] *
        a,
        d = this.m[0] * -a + this.m[2] * b,
        k = this.m[1] * -a + this.m[3] * b;
      this.m[0] = this.m[0] * b + this.m[2] * a;
      this.m[1] = c;
      this.m[2] = d;
      this.m[3] = k
    };
    b.prototype.translate = function(b, a) {
      this.m[4] += this.m[0] * b + this.m[2] * a;
      this.m[5] += this.m[1] * b + this.m[3] * a
    };
    b.prototype.scale = function(b, a) {
      this.m[0] *= b;
      this.m[1] *= b;
      this.m[2] *= a;
      this.m[3] *= a
    };
    b.prototype.transformPoint = function(b, a) {
      return {
        x: b * this.m[0] + a * this.m[2] + this.m[4],
        y: b * this.m[1] + a * this.m[3] + this.m[5]
      }
    };
    b.prototype.transformPointInverse = function(b, a) {
      this.invert();
      var c = this.transformPoint(b, a);
      this.invert();
      return c
    };
    b.prototype.shear = function(b, a) {
      var c = this.m[1] + this.m[3] * a,
        d = this.m[0] * b + this.m[2],
        k = this.m[1] * b + this.m[3];
      this.m[0] += this.m[2] * a;
      this.m[1] = c;
      this.m[2] = d;
      this.m[3] = k
    };
    b.prototype.apply = function(b) {
      var a = this.m;
      b.transform(a[0], a[1], a[2], a[3], a[4], a[5])
    };
    b.prototype.clone = function() {
      var c = new b;
      c.m[0] = this.m[0];
      c.m[1] = this.m[1];
      c.m[2] = this.m[2];
      c.m[3] = this.m[3];
      c.m[4] = this.m[4];
      c.m[5] = this.m[5];
      return c
    };
    b.prototype.inverted = function() {
      var b =
        this.clone();
      b.invert();
      return b
    };
    "undefined" !== typeof v && (v.exports = b)
  }, {}]
}, {}, [41]);
var AnimatronImporter = function() {
  function c(a) {
    A.error(a)
  }

  function v(a) {
    this.buf = a;
    this.bitsBuf = this.bitPos = this.pos = 0
  }

  function k() {}

  function b() {
    this.hash2val = {}
  }

  function e() {}
  var a = anm.constants,
    f = anm.Animation,
    d = anm.Element,
    n = anm.Path,
    h = anm.Text,
    t = anm.Brush,
    w = anm.Tween,
    r = anm.Audio,
    z = anm.Video,
    y = anm.utils.is,
    x = anm.utils.roundTo,
    A = anm.log,
    u = {},
    B;
  u._find = function(a, b) {
    b[a] || c("Element with index " + a + " was not found" + (b ? " among " + b.length + " elements." : "."));
    return b[a]
  };
  u._type = function(a) {
    return a[0]
  };
  u.project = function(a) {
    anm.conf.logImport && A.debug(a);
    B = anm.utils.guid();
    anm.lastImportedProject = a;
    anm.lastImportId = B;
    var d = a.anim.scenes;
    d.length || c("No scenes found in given project");
    var e = new f,
      h = a.anim.elements,
      k = [0, 0];
    e.__import_id = B;
    e.meta = u.meta(a);
    e.fonts = u.fonts(a);
    u.root = e;
    u._paths = a.anim.paths || [];
    u._path_cache = new b;
    u.anim(a, e);
    a.meta.duration && (e.duration = a.meta.duration);
    var n;
    a = function(a) {
      var b = a.gband;
      a.gband = [k[1] + b[0], k[1] + b[1]]
    };
    for (var p = 0, r = d.length; p < r; p++) {
      n = u._find(d[p], h);
      u._type(n) != D && c("Given Scene ID " + d[p] + " points to something else");
      n = u.node(n, null, h, null, e);
      if (0 < p) {
        var w = n.gband;
        n.gband = [k[1] + w[0], k[1] + w[1]];
        n.lband = n.gband;
        n.traverse(a)
      }
      k = n.gband;
      e.add(n)
    }
    0 < d.length && (n.gband = [k[0], Infinity], n.lband = n.gband);
    u._paths = void 0;
    u._path_cache = void 0;
    return e
  };
  u.meta = function(a) {
    a = a.meta;
    return {
      title: a.name,
      author: a.author,
      copyright: a.copyright,
      version: a.version,
      description: a.description,
      duration: a.duration,
      created: a.created,
      modified: a.modified,
      _anm_id: a.id
    }
  };
  u.fonts =
    function(a) {
      return a.anim.fonts
    };
  u.anim = function(a, b) {
    var c = a.anim;
    b.fps = c.framerate;
    b.width = c.dimension ? Math.floor(c.dimension[0]) : void 0;
    b.height = c.dimension ? Math.floor(c.dimension[1]) : void 0;
    b.bgfill = c.background ? u.fill(c.background) : void 0;
    b.zoom = c.zoom || 1;
    b.speed = c.speed || 1;
    !c.loop || !0 !== c.loop && "true" !== c.loop || (b.repeat = !0);
    a.anim.script && (b.actions = a.anim.script)
  };
  var D = 2;
  u.node = function(a, b, c, d, e) {
    var f = u._type(a),
      h = null;
    1 == f || f == D || 9 == f || 28 == f || 29 == f ? h = u.branch(f, a, b, c, e) : 0 != f && (h = u.leaf(f,
      a, b, d, e));
    h && (h._anm_type = f, u.callCustom(h, a, f));
    return h
  };
  L_VISIBLE = 4;
  u.branch = function(b, e, f, h, k) {
    var n = new d;
    n.name = e[1];
    var p = b == D ? e[3] : e[2],
      r = [];
    b === D ? (n.gband = [0, e[2]], n.lband = [0, e[2]]) : (n.gband = [0, Infinity], n.lband = [0, Infinity]);
    for (e = p.length; e--;) {
      var v = p[e],
        t = u._find(v[0], h);
      if (t && (t = u.node(t, v, h, n, k))) {
        t.name = v[1];
        var x = v[6];
        t.disabled = !(x & L_VISIBLE);
        var y = 9 === b && f && f[2] ? f[2] : [0, 0],
          z = u.band(v[2]);
        t.lband = [z[0] - y[0], z[1] - y[0]];
        t.gband = z;
        t.$pivot = [0, 0];
        t.$reg = v[4] || [0, 0];
        if (v[7]) {
          for (var y =
              0, z = Infinity, A = 0, B = v[7], F = 0, J = B.length; F < J; F++) {
            var H = u.tween(B[F]);
            H && (x & 1 && H.tween_type === a.T_ROTATE && (z = Math.min(z, H.$band[0]), A = Math.max(A, H.$band[1]), y++), t.tween(H))
          }
          x & 1 && (y ? (0 < z && Infinity > z && t.tween(w.rotate().start(0).stop(z).from(0).to(0)), 0 < A && Infinity > A && t.tween(w.rotate().start(A).stop(t.lband[1] - t.lband[0]).from(0).to(0))) : t.tween(w.rotate().start(0).stop(Infinity).from(0).to(0)), t.tween(w.rotatetopath().start(0).stop(Infinity)))
        }
        v[5] ? (t.mode = u.mode(v[5][0]), 1 < v[5].length && (t.nrep = v[5][1] ||
          Infinity)) : t.mode = u.mode(null);
        1 === t._anm_type && t.mode !== a.R_ONCE && (t.asClip([0, t.lband[1] - t.lband[0]], t.mode, t.nrep), t.lband = [t.lband[0], Infinity], t.gband = [t.gband[0], Infinity], t.mode = a.R_STAY, t.nrep = Infinity);
        if (v[3])
          for (x = t, y = v[3], z = r.length, y > z && (c("No layers collected to apply mask, expected " + y + ", got " + z), y = z); y;) r[z - y].mask(x), y--;
        else n.add(t), r.push(t);
        u.callCustom(t, v, 255);
        t.$audio && t.$audio.master && (t.lband = [t.lband[0], Infinity], t.gband = [t.gband[0], Infinity], n.remove(t), k.add(t))
      }
    }
    if (28 ===
      b)
      for (n.layer2Bone = Array(p.length), b = n.children.length, f = n.children[b - 1], e = f.children.length; e--;) f.children[e].$from = b - f.children[e].$from - 1, f.children[e].$to = b - f.children[e].$to - 1, n.layer2Bone[f.children[e].$to] = f.children[e];
    return n
  };
  u.leaf = function(b, c, e, f, h) {
    e = new d;
    if (!c[1] && (8 === b || 14 === b || 26 === b)) return null;
    8 == b ? e.$image = u.sheet(c) : 4 == b ? e.$text = u.text(c) : 14 == b ? (e.type = a.ET_AUDIO, e.$audio = u.audio(c), e.$audio.connect(e, h)) : 26 == b ? (e.type = a.ET_VIDEO, e.$video = u.video(c), e.$video.connect(e, h)) :
      30 == b ? (e.$from = c[1], e.$to = c[2]) : e.$path = u.path(c);
    if (e.$path || e.$text) e.$fill = u.fill(c[1]), e.$stroke = u.stroke(c[2]), e.$shadow = u.shadow(c[3]);
    return e
  };
  u.callCustom = function(a, b, c) {
    if (d._customImporters && d._customImporters.length)
      for (var e = d._customImporters, f = 0, h = e.length; f < h; f++) e[f].call(a, b, c, "ANM", B)
  };
  u.band = function(a) {
    if (!a || !a.length) return [0, Infinity];
    if (1 == a.length) return [a[0], Infinity];
    if (2 == a.length) return a;
    c("Unknown format of band: " + a)
  };
  u.path = function(a) {
    if (a = u._pathDecode(a[4])) return new n(a)
  };
  u._pathDecode = function(a) {
    if (y.str(a)) return a;
    if (!y.num(a) || -1 == a) return null;
    a = u._paths[a];
    if (!a) return null;
    var b = u._path_cache.get(a);
    if (!b) {
      b = u._decodeBinaryPath(a);
      if (!b) return null;
      u._path_cache.put(a, b)
    }
    return b
  };
  u._decodeBinaryPath = function(a) {
    var b = "";
    if (a) {
      a = a.replace(/\s/g, "");
      try {
        var d = k.decode(a),
          e = new v(d),
          d = [0, 0];
        if (e)
          for (var f = !0; f;) {
            var h;
            switch (e.readBits(2)) {
              case 0:
                d = h = u._pathReadPoint(e, d);
                b += " M " + h.join(",");
                break;
              case 1:
                d = h = u._pathReadPoint(e, d);
                b += " L " + h.join(",");
                break;
              case 2:
                var n = " C";
                h = d;
                for (var p = 0; 3 > p; p++) h = u._pathReadPoint(e, h), n += " " + h.join(",");
                d = h;
                b += n;
                break;
              default:
                f = !1
            }
          } else return c('Unable to decode Path "' + a + '"'), null
      } catch (r) {
        return c('Unable to decode Path "' + a + '"'), null
      }
    }
    return b
  };
  u._pathReadPoint = function(a, b) {
    b = b || [0, 0];
    var c = a.readBits(5);
    if (0 >= c) throw Error("Failed to decode path, wrong length (<= 0)");
    var d = a.readSBits(c),
      c = a.readSBits(c);
    return [x(b[0] + d / 1E3, 2), x(b[1] + c / 1E3, 2)]
  };
  u.text = function(a) {
    var b = y.arr(a[6]) ? a : a[6].split("\n");
    return new h(1 <
      b.length ? b : b[0], a[4], a[5], a[7] & 2 ? "middle" : "bottom", a[7] & 1 ? !0 : !1)
  };
  u.sheet = function(a) {
    var b = new anm.Sheet(a[1]);
    a[2] && (b._dimen = a[2]);
    return b
  };
  u.tween = function(a) {
    var b = u.tweentype(a[0]);
    if (!b) return null;
    b = w[b](u.tweendata(b, a[3])).band(u.band(a[1]));
    (a = u.easing(a[2])) && b.easing(a);
    return b
  };
  u.tweentype = function(b) {
    if (0 === b) return a.T_ALPHA;
    if (1 === b) return a.T_ROTATE;
    if (2 === b) return a.T_SCALE;
    if (3 === b) return a.T_SHEAR;
    if (4 === b) return a.T_TRANSLATE;
    if (7 === b) return a.T_VOLUME;
    if (9 === b) return a.T_FILL;
    if (10 === b) return a.T_STROKE;
    if (11 === b) return a.T_SHADOW;
    if (12 === b) return a.T_SWITCH;
    if (13 === b) return a.T_BONE_ROTATE;
    if (14 === b) return a.T_BONE_LENGTH
  };
  u.tweendata = function(b, c) {
    if (null === c) return null;
    if (b === a.T_TRANSLATE) return u.pathval(c);
    if (b === a.T_ROTATE || b === a.T_ALPHA || b === a.T_BONE_ROTATE || b === a.T_BONE_LENGTH) {
      if (2 == c.length) return c;
      if (1 == c.length) return [c[0], c[0]]
    }
    if (b === a.T_SCALE || b === a.T_SHEAR) {
      if (4 == c.length) return [
        [c[0], c[1]],
        [c[2], c[3]]
      ];
      if (2 == c.length) return [
        [c[0], c[1]],
        [c[0], c[1]]
      ];
      if (1 == c.length) return [
        [c[0], c[0]],
        [c[0], c[0]]
      ]
    }
    if (b === a.T_FILL) return [u.fill(c[0]), u.fill(c[1])];
    if (b === a.T_STROKE) return [u.stroke(c[0]), u.stroke(c[1])];
    if (b === a.T_SHADOW) return [u.shadow(c[0]), u.shadow(c[1])];
    if (b === a.T_VOLUME) {
      if (2 == c.length) return c;
      if (1 == c.length) return [c[0], c[0]]
    }
    if (b === a.T_SWITCH) return c
  };
  u.easing = function(b) {
    if (!b) return null;
    if (y.str(b)) return {
      type: a.E_PATH,
      data: u.pathval("M0 0 " + b + " Z")
    };
    if (y.num(b)) return {
      type: a.E_STDF,
      data: b
    }
  };
  u.mode = function(b) {
    if (!b || 0 === b) return a.R_ONCE;
    if (1 === b) return a.R_LOOP;
    if (2 === b) return a.R_BOUNCE;
    if (3 === b) return a.R_STAY
  };
  u.fill = function(a) {
    if (!a) return t.fill("transparent");
    if (y.str(a)) return t.fill(a);
    if (y.arr(a)) return y.arr(a[0]) ? t.fill(u.grad(a)) : t.fill(u.pattern(a));
    c("Unknown type of brush")
  };
  u.stroke = function(b) {
    if (!b) return null;
    var c;
    y.str(b[1]) ? c = b[1] : y.arr(b[1]) && (c = y.arr(b[1][0]) ? u.grad(b[1]) : u.pattern(b[1]));
    return t.stroke(c, b[0], b[2] || a.PC_ROUND, b[3] || a.PC_ROUND, b[4])
  };
  u.shadow = function(a) {
    return a ? t.shadow(a[3], a[2], a[0],
      a[1]) : null
  };
  u.grad = function(a) {
    var b = a[0],
      d = a[1];
    a = a[2];
    d.length != a.length && c("Number of colors do not corresponds to number of offsets in gradient");
    for (var e = [], f = 0; f < a.length; f++) e.push([a[f], d[f]]);
    if (4 == b.length) return {
      dir: [
        [b[0], b[1]],
        [b[2], b[3]]
      ],
      stops: e
    };
    if (6 == b.length) return {
      r: [b[2], b[5]],
      dir: [
        [b[0], b[1]],
        [b[3], b[4]]
      ],
      stops: e
    };
    c("Unknown type of gradient with " + b.length + " points")
  };
  var F = ["no-repeat", "repeat", "repeat-x", "repeat-y"];
  u.pattern = function(a) {
    var b = anm.lastImportedProject.anim.elements[a[0]];
    if (b = u.leaf(u._type(b), b)) return b.alpha = a[5], b.disabled = !0, u.root.add(b), {
      elm: b,
      repeat: F[a[1]],
      w: a[2],
      h: a[3],
      bounds: a[4]
    }
  };
  u.pathval = function(a) {
    return new n(u._pathDecode(a))
  };
  u.audio = function(a) {
    var b = new r(a[1]);
    b.offset = a[2];
    b.master = a[3];
    return b
  };
  u.video = function(a) {
    var b = new z(a[1], a[3], a[4]);
    b.offset = a[2];
    return b
  };
  v.prototype.readBits = function(a) {
    for (var b = 0;;) {
      var c = a - this.bitPos;
      if (0 < c) b |= this.bitBuf << c, a -= this.bitPos, this.bitBuf = this.readUByte(), this.bitPos = 8;
      else return c = -c, b |= this.bitBuf >>
        c, this.bitPos = c, this.bitBuf &= (1 << c) - 1, b
    }
  };
  v.prototype.readUByte = function() {
    return this.buf[this.pos++] & 255
  };
  v.prototype.readSBits = function(a) {
    var b = this.readBits(a);
    0 !== (b & 1 << a - 1) && (b |= -1 << a);
    return b
  };
  k.decode = function(a) {
    return k.str2ab(k._decode(a))
  };
  var p = window.Int8Array || Array;
  k.str2ab = function(a) {
    for (var b = new p(a.length), c = 0, d = a.length; c < d; c++) b[c] = a.charCodeAt(c);
    return b
  };
  k._decode = function(a) {
    if (window.atob) return atob(a);
    var b, c, d, e, f, h = 0,
      k = 0,
      n = [];
    if (!a) return a;
    a += "";
    do b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)),
      c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)), d = b << 18 | c << 12 | e << 6 | f, b = d >> 16 & 255, c = d >> 8 & 255, d &= 255, 64 == e ? n[k++] = String.fromCharCode(b) : 64 == f ? n[k++] = String.fromCharCode(b, c) : n[k++] = String.fromCharCode(b, c, d); while (h < a.length);
    return n.join("")
  };
  b.prototype.put = function(a,
    b) {
    this.hash2val[this.hash(a)] = b
  };
  b.prototype.get = function(a) {
    return this.hash2val[this.hash(a)]
  };
  b.prototype.hash = function(a) {
    var b = 0,
      c, d;
    if (0 === a.length) return b;
    c = 0;
    for (l = a.length; c < l; c++) d = a.charCodeAt(c), b = (b << 5) - b + d, b |= 0;
    return b
  };
  e.prototype.load = u.project;
  e.Import = u;
  e.IMPORTER_ID = "ANM";
  return e
}();
anm.importers.register("animatron", AnimatronImporter);
