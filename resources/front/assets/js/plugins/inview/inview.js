!(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? (module.exports = e(require("jquery"))) : e(jQuery);
})(function (c) {
    var h,
        s,
        i,
        u = [],
        p = document,
        g = window,
        v = p.documentElement;
    function t() {
        if (u.length) {
            var e,
                t,
                n,
                i = 0,
                o = c.map(u, function (e) {
                    var t = e.data.selector,
                        n = e.$element;
                    return t ? n.find(t) : n;
                });
            for (
                h = h || ((n = { height: g.innerHeight, width: g.innerWidth }).height || (!(e = p.compatMode) && c.support.boxModel) || (n = { height: (t = "CSS1Compat" === e ? v : p.body).clientHeight, width: t.clientWidth }), n),
                    s = s || { top: g.pageYOffset || v.scrollTop || p.body.scrollTop, left: g.pageXOffset || v.scrollLeft || p.body.scrollLeft };
                i < u.length;
                i++
            )
                if (c.contains(v, o[i][0])) {
                    var l = c(o[i]),
                        r = l[0].offsetHeight,
                        f = l[0].offsetWidth,
                        a = l.offset(),
                        d = l.data("inview");
                    if (!s || !h) return;
                    a.top + r > s.top && a.top < s.top + h.height && a.left + f > s.left && a.left < s.left + h.width ? d || l.data("inview", !0).trigger("inview", [!0]) : d && l.data("inview", !1).trigger("inview", [!1]);
                }
        }
    }
    (c.event.special.inview = {
        add: function (e) {
            u.push({ data: e, $element: c(this), element: this }), !i && u.length && (i = setInterval(t, 250));
        },
        remove: function (e) {
            for (var t = 0; t < u.length; t++) {
                var n = u[t];
                if (n.element === this && n.data.guid === e.guid) {
                    u.splice(t, 1);
                    break;
                }
            }
            u.length || (clearInterval(i), (i = null));
        },
    }),
        c(g).on("scroll resize scrollstop", function () {
            h = s = null;
        }),
    !v.addEventListener &&
    v.attachEvent &&
    v.attachEvent("onfocusin", function () {
        s = null;
    });
});
