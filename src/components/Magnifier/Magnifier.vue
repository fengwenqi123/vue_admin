<template>
  <div class="big clearfix">
    <transition name="bounce">
      <div class="img" v-show="flag">
        <img class="green_monster" :src="src_big"
             :class="i===0 ? 'class-a' : i===1 ? 'class-b':i===2 ? 'class-c':'class-d'"
             :data-big="src_big"/>
      </div>
    </transition>
    <img :src="src" width="100%" height="100%" @click="flag=!flag" alt="">
    <div class="fade" v-if="flag" @click="fade1">
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef,quotes,keyword-spacing,semi,space-before-function-paren,one-var,object-curly-spacing,no-unused-vars,indent */
  (function (d) {
    var e = [], a = 0;
    var b = {
      init: function (f) {
        this.each(function () {
          var k = {
            lensShape: "square",
            lensSize: 100,
            borderSize: 4,
            borderColor: "#888",
            borderRadius: 0,
            imgSrc: "",
            lensCss: ""
          }, n = d(this), j = n.data("mlens"), h = d(), g = d(), i = d(), l = d();
          h = d.extend(k, f);
          if (h.imgSrc === "") {
            h.imgSrc = n.attr("src")
          }
          var m = "background-position: 0px 0px;width: " + String(h.lensSize) + "px;height: " + String(h.lensSize) + "px;float: left;display: none;border: " + String(h.borderSize) + "px solid " + h.borderColor + ";background-repeat: no-repeat;position: absolute;";
          switch (h.lensShape) {
            case"square":
            case"":
            default:
              m = m + "border-radius:" + String(h.borderRadius) + "px;";
              break;
            case"circle":
              m = m + "border-radius: " + String(h.lensSize / 2 + h.borderSize) + "px;";
              break
          }
          n.wrap("<div id='mlens_wrapper_" + a + "' />");
          i = n.parent();
          i.css({width: n.width()});
          g = d("<div style='" + m + "' class='" + h.lensCss + "'>&nbsp;</div>").appendTo(i);
          l = d("<img style='display:none;' src='" + h.imgSrc + "' />").appendTo(i);
          g.css({backgroundImage: "url('" + h.imgSrc + "')", cursor: "none"});
          n.attr("data-id", "mlens_" + a);
          n.data("mlens", {lens: n, options: h, target: g, imageTag: l, parentDiv: i, instance: a});
          j = n.data("mlens");
          e[a] = j;
          g.mousemove(function (o) {
            d.fn.mlens("move", n.attr("data-id"), o)
          });
          n.mousemove(function (o) {
            d.fn.mlens("move", n.attr("data-id"), o)
          });
          n.hover(function () {
            g.show()
          }, function () {
            g.hide()
          });
          g.hover(function () {
            g.show()
          }, function () {
            g.hide()
          });
          a++;
          return e
        })
      }, move: function (g, n) {
        g = c(g);
        var l = e[g], f = l.lens, h = l.target, j = l.imageTag, k = f.offset(), i = parseInt(n.pageX - k.left),
          m = parseInt(n.pageY - k.top), p = j.width() / f.width(), o = j.height() / f.height();
        if (i > 0 && m > 0 && i < f.width() && m < f.height()) {
          i = String(-((n.pageX - k.left) * p - h.width() / 2));
          m = String(-((n.pageY - k.top) * o - h.height() / 2));
          h.css({backgroundPosition: i + "px " + m + "px"});
          i = String(n.pageX - k.left - h.width() / 2);
          m = String(n.pageY - k.top - h.height() / 2);
          h.css({left: i + "px", top: m + "px"})
        }
        l.target = h;
        e[g] = l;
        return e
      }, update: function (m, h) {
        m = c(m);
        var i = e[m], l = i.lens, g = i.target, j = i.imageTag, f = d.extend(i.options, h);
        if (f.imgSrc === "") {
          f.imgSrc = l.attr("src")
        }
        var k = "background-position: 0px 0px;width: " + String(f.lensSize) + "px;height: " + String(f.lensSize) + "px;float: left;display: none;border: " + String(f.borderSize) + "px solid " + f.borderColor + ";background-repeat: no-repeat;position: absolute;";
        switch (f.lensShape) {
          case"square":
          case"":
          default:
            k = k + "border-radius:" + String(f.borderRadius) + "px;";
            break;
          case"circle":
            k = k + "border-radius: " + String(f.lensSize / 2 + f.borderSize) + "px;";
            break
        }
        g.attr("style", k);
        j.attr("src", f.imgSrc);
        g.css({backgroundImage: "url('" + f.imgSrc + "')", cursor: "none"});
        i.lens = l;
        i.target = g;
        i.options = f;
        i.imageTag = j;
        e[m] = i;
        return e
      }, destroy: function () {
        return this.each(function () {
          var g = d(this), f = g.data("mlens");
          d(window).unbind(".mlens");
          g.removeData("mlens");
          a = 0
        })
      }
    };

    function c(g) {
      if (typeof (g) === "string") {
        var f = g.indexOf("_");
        if (f !== -1) {
          g = g.substr(f + 1)
        }
      }
      return g
    }

    d.fn.mlens = function (f) {
      if (b[f]) {
        return b[f].apply(this, Array.prototype.slice.call(arguments, 1))
      } else {
        if (typeof f === "object" || !f) {
          return b.init.apply(this, arguments)
        } else {
          d.error("Method " + f + " does not exist on jQuery.mlens")
        }
      }
    }
  })(jQuery);
  export default {
    data() {
      return {
        flag: false,
        green: 'green_monster'
      }
    },
    props: ['src', 'src_big', 'i'],
    mounted() {
      this.bigs()
    },
    methods: {
      bigs() {
        var _this = this
        $('.class-a').mlens(
          {
            imgSrc: $(this).attr('data-big'),	// path of the hi-res version of the image

            lensShape: 'circle',				// shape of the lens (circle or square)

            lensSize: 280,					// size of the lens (in px)

            borderSize: 4,					// size of the lens border (in px)

            borderColor: '#fff',				// color of the lens border (#hex)

            borderRadius: 0					// border radius (optional, only if the shape is square)
          })
        $('.class-b').mlens(
          {
            imgSrc: $(this).attr('data-big'),	// path of the hi-res version of the image

            lensShape: 'circle',				// shape of the lens (circle or square)

            lensSize: 280,					// size of the lens (in px)

            borderSize: 4,					// size of the lens border (in px)

            borderColor: '#fff',				// color of the lens border (#hex)

            borderRadius: 0					// border radius (optional, only if the shape is square)
          })
        $('.class-c').mlens(
          {
            imgSrc: $(this).attr('data-big'),	// path of the hi-res version of the image

            lensShape: 'circle',				// shape of the lens (circle or square)

            lensSize: 280,					// size of the lens (in px)

            borderSize: 4,					// size of the lens border (in px)

            borderColor: '#fff',				// color of the lens border (#hex)

            borderRadius: 0					// border radius (optional, only if the shape is square)
          })
        $('.class-d').mlens(
          {
            imgSrc: $(this).attr('data-big'),	// path of the hi-res version of the image

            lensShape: 'circle',				// shape of the lens (circle or square)

            lensSize: 280,					// size of the lens (in px)

            borderSize: 4,					// size of the lens border (in px)

            borderColor: '#fff',				// color of the lens border (#hex)

            borderRadius: 0					// border radius (optional, only if the shape is square)
          })
      },
      fade1() {
        this.flag = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .big {
    width: auto;
    height: 100%;
    #green_wrapper {
      position: relative;

      width: 640px;

      height: auto;

      margin: 0 auto;

      border: 12px solid #fff;

      border-radius: 10px;

      /*box-shadow: 1px 1px 5px rgba(50, 50, 50 0.5);*/

      float: left;
    }
    .img {
      position: fixed;
      top: 58px;
      left: 50%;
      z-index: 2999;
      margin-left: -700px;
      width: 1340px;
      #mlens_wrapper_0 {
        width: 100%;
      }
      .green_monster {
        width: 1340px;
      }
    }
    position: relative;
    .bounce-enter-active {
      animation: bounce-in .3s;
    }

    .bounce-leave-active {
      animation: bounce-in .3s reverse;
    }

    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    .fade {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      z-index: 2998;
    }
  }

</style>
