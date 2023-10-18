var Wa = Object.defineProperty;
var Ha = (e, t, n) => t in e ? Wa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ot = (e, t, n) => (Ha(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as Pa from "react";
import { useState as pe, useCallback as ae, useMemo as Se, useEffect as se, useContext as $a, useDebugValue as Aa, createElement as kn, Component as La, useRef as Sr, Fragment as Ra } from "react";
import { jsx as h, jsxs as X, Fragment as un } from "react/jsx-runtime";
import { createPortal as Ia } from "react-dom";
const sn = Pa.createContext(null);
process.env.NODE_ENV !== "production" && (sn.displayName = "TimelineThemeContext");
const qa = ({
  theme: e,
  children: t
}) => /* @__PURE__ */ h(sn.Provider, {
  value: e,
  children: t
});
function Cr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ln(e) {
  let t = e, n = e;
  e.length === 1 && (t = (i, u) => e(i) - u, n = za(e));
  function r(i, u, l, s) {
    for (l == null && (l = 0), s == null && (s = i.length); l < s; ) {
      const c = l + s >>> 1;
      n(i[c], u) < 0 ? l = c + 1 : s = c;
    }
    return l;
  }
  function a(i, u, l, s) {
    for (l == null && (l = 0), s == null && (s = i.length); l < s; ) {
      const c = l + s >>> 1;
      n(i[c], u) > 0 ? s = c : l = c + 1;
    }
    return l;
  }
  function o(i, u, l, s) {
    l == null && (l = 0), s == null && (s = i.length);
    const c = r(i, u, l, s - 1);
    return c > l && t(i[c - 1], u) > -t(i[c], u) ? c - 1 : c;
  }
  return { left: r, center: o, right: a };
}
function za(e) {
  return (t, n) => Cr(e(t), n);
}
function Ba(e) {
  return e === null ? NaN : +e;
}
const Xa = ln(Cr), ja = Xa.right;
ln(Ba).center;
const Va = ja;
function Ga(e, t) {
  let n, r;
  if (t === void 0)
    for (const a of e)
      a != null && (n === void 0 ? a >= a && (n = r = a) : (n > a && (n = a), r < a && (r = a)));
  else {
    let a = -1;
    for (let o of e)
      (o = t(o, ++a, e)) != null && (n === void 0 ? o >= o && (n = r = o) : (n > o && (n = o), r < o && (r = o)));
  }
  return [n, r];
}
class Za extends Map {
  constructor(t, n = Ka) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), t != null)
      for (const [r, a] of t)
        this.set(r, a);
  }
  get(t) {
    return super.get(En(this, t));
  }
  has(t) {
    return super.has(En(this, t));
  }
  set(t, n) {
    return super.set(Qa(this, t), n);
  }
  delete(t) {
    return super.delete(Ja(this, t));
  }
}
function En({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : n;
}
function Qa({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function Ja({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) && (n = e.get(n), e.delete(r)), n;
}
function Ka(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function eo(e) {
  return e;
}
function to(e, ...t) {
  return no(e, Array.from, eo, t);
}
function no(e, t, n, r) {
  return function a(o, i) {
    if (i >= r.length)
      return n(o);
    const u = new Za(), l = r[i++];
    let s = -1;
    for (const c of o) {
      const f = l(c, ++s, o), d = u.get(f);
      d ? d.push(c) : u.set(f, [c]);
    }
    for (const [c, f] of u)
      u.set(c, a(f, i));
    return t(u);
  }(e, 0);
}
var Bt = Math.sqrt(50), Xt = Math.sqrt(10), jt = Math.sqrt(2);
function ro(e, t, n) {
  var r, a = -1, o, i, u;
  if (t = +t, e = +e, n = +n, e === t && n > 0)
    return [e];
  if ((r = t < e) && (o = e, e = t, t = o), (u = Dr(e, t, n)) === 0 || !isFinite(u))
    return [];
  if (u > 0) {
    let l = Math.round(e / u), s = Math.round(t / u);
    for (l * u < e && ++l, s * u > t && --s, i = new Array(o = s - l + 1); ++a < o; )
      i[a] = (l + a) * u;
  } else {
    u = -u;
    let l = Math.round(e * u), s = Math.round(t * u);
    for (l / u < e && ++l, s / u > t && --s, i = new Array(o = s - l + 1); ++a < o; )
      i[a] = (l + a) / u;
  }
  return r && i.reverse(), i;
}
function Dr(e, t, n) {
  var r = (t - e) / Math.max(0, n), a = Math.floor(Math.log(r) / Math.LN10), o = r / Math.pow(10, a);
  return a >= 0 ? (o >= Bt ? 10 : o >= Xt ? 5 : o >= jt ? 2 : 1) * Math.pow(10, a) : -Math.pow(10, -a) / (o >= Bt ? 10 : o >= Xt ? 5 : o >= jt ? 2 : 1);
}
function Vt(e, t, n) {
  var r = Math.abs(t - e) / Math.max(0, n), a = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), o = r / a;
  return o >= Bt ? a *= 10 : o >= Xt ? a *= 5 : o >= jt && (a *= 2), t < e ? -a : a;
}
function ao(e, t) {
  let n;
  if (t === void 0)
    for (const r of e)
      r != null && (n < r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let a of e)
      (a = t(a, ++r, e)) != null && (n < a || n === void 0 && a >= a) && (n = a);
  }
  return n;
}
function oo(e, t) {
  let n;
  if (t === void 0)
    for (const r of e)
      r != null && (n > r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let a of e)
      (a = t(a, ++r, e)) != null && (n > a || n === void 0 && a >= a) && (n = a);
  }
  return n;
}
function io(e, t, n) {
  e = +e, t = +t, n = (a = arguments.length) < 2 ? (t = e, e = 0, 1) : a < 3 ? 1 : +n;
  for (var r = -1, a = Math.max(0, Math.ceil((t - e) / n)) | 0, o = new Array(a); ++r < a; )
    o[r] = e + r * n;
  return o;
}
function ue(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function z(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function dt(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? dt = function(n) {
    return typeof n;
  } : dt = function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, dt(e);
}
function Z(e) {
  z(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || dt(e) === "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), new Date(NaN));
}
function uo(e, t) {
  z(2, arguments);
  var n = Z(e), r = ue(t);
  return isNaN(r) ? new Date(NaN) : (r && n.setDate(n.getDate() + r), n);
}
function so(e, t) {
  z(2, arguments);
  var n = Z(e), r = ue(t);
  if (isNaN(r))
    return new Date(NaN);
  if (!r)
    return n;
  var a = n.getDate(), o = new Date(n.getTime());
  o.setMonth(n.getMonth() + r + 1, 0);
  var i = o.getDate();
  return a >= i ? o : (n.setFullYear(o.getFullYear(), o.getMonth(), a), n);
}
function lo(e, t) {
  z(2, arguments);
  var n = Z(e).getTime(), r = ue(t);
  return new Date(n + r);
}
var co = {};
function Le() {
  return co;
}
function fo(e, t) {
  var n, r, a, o, i, u, l, s;
  z(1, arguments);
  var c = Le(), f = ue((n = (r = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : c.weekStartsOn) !== null && r !== void 0 ? r : (l = c.locale) === null || l === void 0 || (s = l.options) === null || s === void 0 ? void 0 : s.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(f >= 0 && f <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var d = Z(e), g = d.getDay(), y = (g < f ? 7 : 0) + g - f;
  return d.setDate(d.getDate() - y), d.setHours(0, 0, 0, 0), d;
}
function ho(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
function Un(e, t) {
  z(2, arguments);
  var n = ue(t), r = n * 7;
  return uo(e, r);
}
function ht(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ht = function(n) {
    return typeof n;
  } : ht = function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, ht(e);
}
function mo(e) {
  return z(1, arguments), e instanceof Date || ht(e) === "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function go(e) {
  if (z(1, arguments), !mo(e) && typeof e != "number")
    return !1;
  var t = Z(e);
  return !isNaN(Number(t));
}
function yo(e) {
  z(1, arguments);
  var t = Z(e), n = t.getMonth();
  return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function vo(e, t) {
  var n, r, a, o, i, u, l, s;
  z(1, arguments);
  var c = Le(), f = ue((n = (r = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : c.weekStartsOn) !== null && r !== void 0 ? r : (l = c.locale) === null || l === void 0 || (s = l.options) === null || s === void 0 ? void 0 : s.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(f >= 0 && f <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var d = Z(e), g = d.getDay(), y = (g < f ? -7 : 0) + 6 - (g - f);
  return d.setDate(d.getDate() + y), d.setHours(23, 59, 59, 999), d;
}
function po(e, t) {
  z(2, arguments);
  var n = ue(t);
  return lo(e, -n);
}
var wo = 864e5;
function xo(e) {
  z(1, arguments);
  var t = Z(e), n = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var r = t.getTime(), a = n - r;
  return Math.floor(a / wo) + 1;
}
function mt(e) {
  z(1, arguments);
  var t = 1, n = Z(e), r = n.getUTCDay(), a = (r < t ? 7 : 0) + r - t;
  return n.setUTCDate(n.getUTCDate() - a), n.setUTCHours(0, 0, 0, 0), n;
}
function Or(e) {
  z(1, arguments);
  var t = Z(e), n = t.getUTCFullYear(), r = new Date(0);
  r.setUTCFullYear(n + 1, 0, 4), r.setUTCHours(0, 0, 0, 0);
  var a = mt(r), o = new Date(0);
  o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0);
  var i = mt(o);
  return t.getTime() >= a.getTime() ? n + 1 : t.getTime() >= i.getTime() ? n : n - 1;
}
function bo(e) {
  z(1, arguments);
  var t = Or(e), n = new Date(0);
  n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0);
  var r = mt(n);
  return r;
}
var Mo = 6048e5;
function To(e) {
  z(1, arguments);
  var t = Z(e), n = mt(t).getTime() - bo(t).getTime();
  return Math.round(n / Mo) + 1;
}
function gt(e, t) {
  var n, r, a, o, i, u, l, s;
  z(1, arguments);
  var c = Le(), f = ue((n = (r = (a = (o = t == null ? void 0 : t.weekStartsOn) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : c.weekStartsOn) !== null && r !== void 0 ? r : (l = c.locale) === null || l === void 0 || (s = l.options) === null || s === void 0 ? void 0 : s.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(f >= 0 && f <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var d = Z(e), g = d.getUTCDay(), y = (g < f ? 7 : 0) + g - f;
  return d.setUTCDate(d.getUTCDate() - y), d.setUTCHours(0, 0, 0, 0), d;
}
function kr(e, t) {
  var n, r, a, o, i, u, l, s;
  z(1, arguments);
  var c = Z(e), f = c.getUTCFullYear(), d = Le(), g = ue((n = (r = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : d.firstWeekContainsDate) !== null && r !== void 0 ? r : (l = d.locale) === null || l === void 0 || (s = l.options) === null || s === void 0 ? void 0 : s.firstWeekContainsDate) !== null && n !== void 0 ? n : 1);
  if (!(g >= 1 && g <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var y = new Date(0);
  y.setUTCFullYear(f + 1, 0, g), y.setUTCHours(0, 0, 0, 0);
  var b = gt(y, t), v = new Date(0);
  v.setUTCFullYear(f, 0, g), v.setUTCHours(0, 0, 0, 0);
  var T = gt(v, t);
  return c.getTime() >= b.getTime() ? f + 1 : c.getTime() >= T.getTime() ? f : f - 1;
}
function So(e, t) {
  var n, r, a, o, i, u, l, s;
  z(1, arguments);
  var c = Le(), f = ue((n = (r = (a = (o = t == null ? void 0 : t.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (i = t.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : c.firstWeekContainsDate) !== null && r !== void 0 ? r : (l = c.locale) === null || l === void 0 || (s = l.options) === null || s === void 0 ? void 0 : s.firstWeekContainsDate) !== null && n !== void 0 ? n : 1), d = kr(e, t), g = new Date(0);
  g.setUTCFullYear(d, 0, f), g.setUTCHours(0, 0, 0, 0);
  var y = gt(g, t);
  return y;
}
var Co = 6048e5;
function Do(e, t) {
  z(1, arguments);
  var n = Z(e), r = gt(n, t).getTime() - So(n, t).getTime();
  return Math.round(r / Co) + 1;
}
function L(e, t) {
  for (var n = e < 0 ? "-" : "", r = Math.abs(e).toString(); r.length < t; )
    r = "0" + r;
  return n + r;
}
var Oo = {
  y: function(t, n) {
    var r = t.getUTCFullYear(), a = r > 0 ? r : 1 - r;
    return L(n === "yy" ? a % 100 : a, n.length);
  },
  M: function(t, n) {
    var r = t.getUTCMonth();
    return n === "M" ? String(r + 1) : L(r + 1, 2);
  },
  d: function(t, n) {
    return L(t.getUTCDate(), n.length);
  },
  a: function(t, n) {
    var r = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (n) {
      case "a":
      case "aa":
        return r.toUpperCase();
      case "aaa":
        return r;
      case "aaaaa":
        return r[0];
      case "aaaa":
      default:
        return r === "am" ? "a.m." : "p.m.";
    }
  },
  h: function(t, n) {
    return L(t.getUTCHours() % 12 || 12, n.length);
  },
  H: function(t, n) {
    return L(t.getUTCHours(), n.length);
  },
  m: function(t, n) {
    return L(t.getUTCMinutes(), n.length);
  },
  s: function(t, n) {
    return L(t.getUTCSeconds(), n.length);
  },
  S: function(t, n) {
    var r = n.length, a = t.getUTCMilliseconds(), o = Math.floor(a * Math.pow(10, r - 3));
    return L(o, n.length);
  }
};
const ve = Oo;
var _e = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, ko = {
  G: function(t, n, r) {
    var a = t.getUTCFullYear() > 0 ? 1 : 0;
    switch (n) {
      case "G":
      case "GG":
      case "GGG":
        return r.era(a, {
          width: "abbreviated"
        });
      case "GGGGG":
        return r.era(a, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return r.era(a, {
          width: "wide"
        });
    }
  },
  y: function(t, n, r) {
    if (n === "yo") {
      var a = t.getUTCFullYear(), o = a > 0 ? a : 1 - a;
      return r.ordinalNumber(o, {
        unit: "year"
      });
    }
    return ve.y(t, n);
  },
  Y: function(t, n, r, a) {
    var o = kr(t, a), i = o > 0 ? o : 1 - o;
    if (n === "YY") {
      var u = i % 100;
      return L(u, 2);
    }
    return n === "Yo" ? r.ordinalNumber(i, {
      unit: "year"
    }) : L(i, n.length);
  },
  R: function(t, n) {
    var r = Or(t);
    return L(r, n.length);
  },
  u: function(t, n) {
    var r = t.getUTCFullYear();
    return L(r, n.length);
  },
  Q: function(t, n, r) {
    var a = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (n) {
      case "Q":
        return String(a);
      case "QQ":
        return L(a, 2);
      case "Qo":
        return r.ordinalNumber(a, {
          unit: "quarter"
        });
      case "QQQ":
        return r.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return r.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return r.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  q: function(t, n, r) {
    var a = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (n) {
      case "q":
        return String(a);
      case "qq":
        return L(a, 2);
      case "qo":
        return r.ordinalNumber(a, {
          unit: "quarter"
        });
      case "qqq":
        return r.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return r.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return r.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  M: function(t, n, r) {
    var a = t.getUTCMonth();
    switch (n) {
      case "M":
      case "MM":
        return ve.M(t, n);
      case "Mo":
        return r.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "MMM":
        return r.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return r.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return r.month(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  L: function(t, n, r) {
    var a = t.getUTCMonth();
    switch (n) {
      case "L":
        return String(a + 1);
      case "LL":
        return L(a + 1, 2);
      case "Lo":
        return r.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "LLL":
        return r.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return r.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return r.month(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  w: function(t, n, r, a) {
    var o = Do(t, a);
    return n === "wo" ? r.ordinalNumber(o, {
      unit: "week"
    }) : L(o, n.length);
  },
  I: function(t, n, r) {
    var a = To(t);
    return n === "Io" ? r.ordinalNumber(a, {
      unit: "week"
    }) : L(a, n.length);
  },
  d: function(t, n, r) {
    return n === "do" ? r.ordinalNumber(t.getUTCDate(), {
      unit: "date"
    }) : ve.d(t, n);
  },
  D: function(t, n, r) {
    var a = xo(t);
    return n === "Do" ? r.ordinalNumber(a, {
      unit: "dayOfYear"
    }) : L(a, n.length);
  },
  E: function(t, n, r) {
    var a = t.getUTCDay();
    switch (n) {
      case "E":
      case "EE":
      case "EEE":
        return r.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return r.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return r.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return r.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  e: function(t, n, r, a) {
    var o = t.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (n) {
      case "e":
        return String(i);
      case "ee":
        return L(i, 2);
      case "eo":
        return r.ordinalNumber(i, {
          unit: "day"
        });
      case "eee":
        return r.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return r.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return r.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return r.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  c: function(t, n, r, a) {
    var o = t.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (n) {
      case "c":
        return String(i);
      case "cc":
        return L(i, n.length);
      case "co":
        return r.ordinalNumber(i, {
          unit: "day"
        });
      case "ccc":
        return r.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return r.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return r.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return r.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  i: function(t, n, r) {
    var a = t.getUTCDay(), o = a === 0 ? 7 : a;
    switch (n) {
      case "i":
        return String(o);
      case "ii":
        return L(o, n.length);
      case "io":
        return r.ordinalNumber(o, {
          unit: "day"
        });
      case "iii":
        return r.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return r.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return r.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return r.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  a: function(t, n, r) {
    var a = t.getUTCHours(), o = a / 12 >= 1 ? "pm" : "am";
    switch (n) {
      case "a":
      case "aa":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return r.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  b: function(t, n, r) {
    var a = t.getUTCHours(), o;
    switch (a === 12 ? o = _e.noon : a === 0 ? o = _e.midnight : o = a / 12 >= 1 ? "pm" : "am", n) {
      case "b":
      case "bb":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return r.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  B: function(t, n, r) {
    var a = t.getUTCHours(), o;
    switch (a >= 17 ? o = _e.evening : a >= 12 ? o = _e.afternoon : a >= 4 ? o = _e.morning : o = _e.night, n) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  h: function(t, n, r) {
    if (n === "ho") {
      var a = t.getUTCHours() % 12;
      return a === 0 && (a = 12), r.ordinalNumber(a, {
        unit: "hour"
      });
    }
    return ve.h(t, n);
  },
  H: function(t, n, r) {
    return n === "Ho" ? r.ordinalNumber(t.getUTCHours(), {
      unit: "hour"
    }) : ve.H(t, n);
  },
  K: function(t, n, r) {
    var a = t.getUTCHours() % 12;
    return n === "Ko" ? r.ordinalNumber(a, {
      unit: "hour"
    }) : L(a, n.length);
  },
  k: function(t, n, r) {
    var a = t.getUTCHours();
    return a === 0 && (a = 24), n === "ko" ? r.ordinalNumber(a, {
      unit: "hour"
    }) : L(a, n.length);
  },
  m: function(t, n, r) {
    return n === "mo" ? r.ordinalNumber(t.getUTCMinutes(), {
      unit: "minute"
    }) : ve.m(t, n);
  },
  s: function(t, n, r) {
    return n === "so" ? r.ordinalNumber(t.getUTCSeconds(), {
      unit: "second"
    }) : ve.s(t, n);
  },
  S: function(t, n) {
    return ve.S(t, n);
  },
  X: function(t, n, r, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    if (i === 0)
      return "Z";
    switch (n) {
      case "X":
        return _n(i);
      case "XXXX":
      case "XX":
        return Te(i);
      case "XXXXX":
      case "XXX":
      default:
        return Te(i, ":");
    }
  },
  x: function(t, n, r, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (n) {
      case "x":
        return _n(i);
      case "xxxx":
      case "xx":
        return Te(i);
      case "xxxxx":
      case "xxx":
      default:
        return Te(i, ":");
    }
  },
  O: function(t, n, r, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (n) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Nn(i, ":");
      case "OOOO":
      default:
        return "GMT" + Te(i, ":");
    }
  },
  z: function(t, n, r, a) {
    var o = a._originalDate || t, i = o.getTimezoneOffset();
    switch (n) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Nn(i, ":");
      case "zzzz":
      default:
        return "GMT" + Te(i, ":");
    }
  },
  t: function(t, n, r, a) {
    var o = a._originalDate || t, i = Math.floor(o.getTime() / 1e3);
    return L(i, n.length);
  },
  T: function(t, n, r, a) {
    var o = a._originalDate || t, i = o.getTime();
    return L(i, n.length);
  }
};
function Nn(e, t) {
  var n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.floor(r / 60), o = r % 60;
  if (o === 0)
    return n + String(a);
  var i = t || "";
  return n + String(a) + i + L(o, 2);
}
function _n(e, t) {
  if (e % 60 === 0) {
    var n = e > 0 ? "-" : "+";
    return n + L(Math.abs(e) / 60, 2);
  }
  return Te(e, t);
}
function Te(e, t) {
  var n = t || "", r = e > 0 ? "-" : "+", a = Math.abs(e), o = L(Math.floor(a / 60), 2), i = L(a % 60, 2);
  return r + o + n + i;
}
const Eo = ko;
var Yn = function(t, n) {
  switch (t) {
    case "P":
      return n.date({
        width: "short"
      });
    case "PP":
      return n.date({
        width: "medium"
      });
    case "PPP":
      return n.date({
        width: "long"
      });
    case "PPPP":
    default:
      return n.date({
        width: "full"
      });
  }
}, Er = function(t, n) {
  switch (t) {
    case "p":
      return n.time({
        width: "short"
      });
    case "pp":
      return n.time({
        width: "medium"
      });
    case "ppp":
      return n.time({
        width: "long"
      });
    case "pppp":
    default:
      return n.time({
        width: "full"
      });
  }
}, Uo = function(t, n) {
  var r = t.match(/(P+)(p+)?/) || [], a = r[1], o = r[2];
  if (!o)
    return Yn(t, n);
  var i;
  switch (a) {
    case "P":
      i = n.dateTime({
        width: "short"
      });
      break;
    case "PP":
      i = n.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      i = n.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      i = n.dateTime({
        width: "full"
      });
      break;
  }
  return i.replace("{{date}}", Yn(a, n)).replace("{{time}}", Er(o, n));
}, No = {
  p: Er,
  P: Uo
};
const _o = No;
var Yo = ["D", "DD"], Fo = ["YY", "YYYY"];
function Wo(e) {
  return Yo.indexOf(e) !== -1;
}
function Ho(e) {
  return Fo.indexOf(e) !== -1;
}
function Fn(e, t, n) {
  if (e === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t, "`) for formatting years to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(t, "`) for formatting years to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(t, "`) for formatting days of the month to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(t, "`) for formatting days of the month to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var Po = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, $o = function(t, n, r) {
  var a, o = Po[t];
  return typeof o == "string" ? a = o : n === 1 ? a = o.one : a = o.other.replace("{{count}}", n.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + a : a + " ago" : a;
};
const Ao = $o;
function kt(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.width ? String(t.width) : e.defaultWidth, r = e.formats[n] || e.formats[e.defaultWidth];
    return r;
  };
}
var Lo = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Ro = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Io = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, qo = {
  date: kt({
    formats: Lo,
    defaultWidth: "full"
  }),
  time: kt({
    formats: Ro,
    defaultWidth: "full"
  }),
  dateTime: kt({
    formats: Io,
    defaultWidth: "full"
  })
};
const zo = qo;
var Bo = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Xo = function(t, n, r, a) {
  return Bo[t];
};
const jo = Xo;
function Ie(e) {
  return function(t, n) {
    var r = n != null && n.context ? String(n.context) : "standalone", a;
    if (r === "formatting" && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth, i = n != null && n.width ? String(n.width) : o;
      a = e.formattingValues[i] || e.formattingValues[o];
    } else {
      var u = e.defaultWidth, l = n != null && n.width ? String(n.width) : e.defaultWidth;
      a = e.values[l] || e.values[u];
    }
    var s = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[s];
  };
}
var Vo = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Go = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Zo = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, Qo = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, Jo = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Ko = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, ei = function(t, n) {
  var r = Number(t), a = r % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return r + "st";
      case 2:
        return r + "nd";
      case 3:
        return r + "rd";
    }
  return r + "th";
}, ti = {
  ordinalNumber: ei,
  era: Ie({
    values: Vo,
    defaultWidth: "wide"
  }),
  quarter: Ie({
    values: Go,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: Ie({
    values: Zo,
    defaultWidth: "wide"
  }),
  day: Ie({
    values: Qo,
    defaultWidth: "wide"
  }),
  dayPeriod: Ie({
    values: Jo,
    defaultWidth: "wide",
    formattingValues: Ko,
    defaultFormattingWidth: "wide"
  })
};
const ni = ti;
function qe(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(a);
    if (!o)
      return null;
    var i = o[0], u = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(u) ? ai(u, function(f) {
      return f.test(i);
    }) : ri(u, function(f) {
      return f.test(i);
    }), s;
    s = e.valueCallback ? e.valueCallback(l) : l, s = n.valueCallback ? n.valueCallback(s) : s;
    var c = t.slice(i.length);
    return {
      value: s,
      rest: c
    };
  };
}
function ri(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n) && t(e[n]))
      return n;
}
function ai(e, t) {
  for (var n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function oi(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.match(e.matchPattern);
    if (!r)
      return null;
    var a = r[0], o = t.match(e.parsePattern);
    if (!o)
      return null;
    var i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    var u = t.slice(a.length);
    return {
      value: i,
      rest: u
    };
  };
}
var ii = /^(\d+)(th|st|nd|rd)?/i, ui = /\d+/i, si = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, li = {
  any: [/^b/i, /^(a|c)/i]
}, ci = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, fi = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, di = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, hi = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, mi = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, gi = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, yi = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, vi = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, pi = {
  ordinalNumber: oi({
    matchPattern: ii,
    parsePattern: ui,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: qe({
    matchPatterns: si,
    defaultMatchWidth: "wide",
    parsePatterns: li,
    defaultParseWidth: "any"
  }),
  quarter: qe({
    matchPatterns: ci,
    defaultMatchWidth: "wide",
    parsePatterns: fi,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: qe({
    matchPatterns: di,
    defaultMatchWidth: "wide",
    parsePatterns: hi,
    defaultParseWidth: "any"
  }),
  day: qe({
    matchPatterns: mi,
    defaultMatchWidth: "wide",
    parsePatterns: gi,
    defaultParseWidth: "any"
  }),
  dayPeriod: qe({
    matchPatterns: yi,
    defaultMatchWidth: "any",
    parsePatterns: vi,
    defaultParseWidth: "any"
  })
};
const wi = pi;
var xi = {
  code: "en-US",
  formatDistance: Ao,
  formatLong: zo,
  formatRelative: jo,
  localize: ni,
  match: wi,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const bi = xi;
var Mi = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ti = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Si = /^'([^]*?)'?$/, Ci = /''/g, Di = /[a-zA-Z]/;
function Wn(e, t, n) {
  var r, a, o, i, u, l, s, c, f, d, g, y, b, v, T, O, k, w;
  z(2, arguments);
  var E = String(t), x = Le(), D = (r = (a = n == null ? void 0 : n.locale) !== null && a !== void 0 ? a : x.locale) !== null && r !== void 0 ? r : bi, F = ue((o = (i = (u = (l = n == null ? void 0 : n.firstWeekContainsDate) !== null && l !== void 0 ? l : n == null || (s = n.locale) === null || s === void 0 || (c = s.options) === null || c === void 0 ? void 0 : c.firstWeekContainsDate) !== null && u !== void 0 ? u : x.firstWeekContainsDate) !== null && i !== void 0 ? i : (f = x.locale) === null || f === void 0 || (d = f.options) === null || d === void 0 ? void 0 : d.firstWeekContainsDate) !== null && o !== void 0 ? o : 1);
  if (!(F >= 1 && F <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var _ = ue((g = (y = (b = (v = n == null ? void 0 : n.weekStartsOn) !== null && v !== void 0 ? v : n == null || (T = n.locale) === null || T === void 0 || (O = T.options) === null || O === void 0 ? void 0 : O.weekStartsOn) !== null && b !== void 0 ? b : x.weekStartsOn) !== null && y !== void 0 ? y : (k = x.locale) === null || k === void 0 || (w = k.options) === null || w === void 0 ? void 0 : w.weekStartsOn) !== null && g !== void 0 ? g : 0);
  if (!(_ >= 0 && _ <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!D.localize)
    throw new RangeError("locale must contain localize property");
  if (!D.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var M = Z(e);
  if (!go(M))
    throw new RangeError("Invalid time value");
  var S = ho(M), Y = po(M, S), R = {
    firstWeekContainsDate: F,
    weekStartsOn: _,
    locale: D,
    _originalDate: M
  }, G = E.match(Ti).map(function(A) {
    var j = A[0];
    if (j === "p" || j === "P") {
      var V = _o[j];
      return V(A, D.formatLong);
    }
    return A;
  }).join("").match(Mi).map(function(A) {
    if (A === "''")
      return "'";
    var j = A[0];
    if (j === "'")
      return Oi(A);
    var V = Eo[j];
    if (V)
      return !(n != null && n.useAdditionalWeekYearTokens) && Ho(A) && Fn(A, t, String(e)), !(n != null && n.useAdditionalDayOfYearTokens) && Wo(A) && Fn(A, t, String(e)), V(Y, A, D.localize, R);
    if (j.match(Di))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + j + "`");
    return A;
  }).join("");
  return G;
}
function Oi(e) {
  var t = e.match(Si);
  return t ? t[1].replace(Ci, "'") : e;
}
function ki(e, t) {
  z(2, arguments);
  var n = Z(e), r = Z(t);
  return n.getTime() < r.getTime();
}
function Ei(e, t) {
  z(2, arguments);
  var n = Z(e), r = Z(t);
  return n.getTime() === r.getTime();
}
const Fe = () => {
}, Ur = (e, t) => new Array(t - e).fill(void 0).map((n, r) => r + e), Hn = (e, t, n) => Math.min(Math.max(e, t), n), cn = (e, t) => Math.abs(Math.max(e, t) - Math.min(e, t)), je = 1e3, Re = 60 * je, Ui = 5 * Re, Ni = 10 * Re, _i = 15 * Re, Yi = 30 * Re, et = 60 * Re, Fi = 3 * et, Wi = 6 * et, Hi = 12 * et, St = 24 * et, Nr = 7 * St, _r = 30 * St, Gt = 365 * St;
var B = /* @__PURE__ */ ((e) => (e.MIN = "minimum", e.TEN_MS = "10 ms", e.HUNDRED_MS = "100 ms", e.FIVEHUNDRED_MS = "500 ms", e.ONE_SEC = "1 sec", e.FIVE_SECS = "5 secs", e.TEN_SECS = "10 secs", e.THIRTY_SECS = "30 secs", e.ONE_MIN = "1 min", e.FIVE_MINS = "5 mins", e.TEN_MINS = "10 mins", e.FIFTEEN_MINS = "15 mins", e.THIRTY_MINS = "30 mins", e.ONE_HOUR = "1 hour", e.THREE_HOURS = "3 hours", e.SIX_HOURS = "6 hours", e.TWELVE_HOURS = "12 hours", e.ONE_DAY = "1 day", e.ONE_WEEK = "1 week", e.ONE_MONTH = "1 month", e.ONE_YEAR = "1 year", e.TEN_YEARS = "10 years", e.MAX = "maximum", e))(B || {});
const Pi = [
  "10 years",
  "1 year",
  "1 month",
  "1 week",
  "1 day",
  "12 hours",
  "6 hours",
  "3 hours",
  "1 hour",
  "30 mins",
  "15 mins",
  "10 mins",
  "5 mins",
  "1 min"
], ge = (e) => {
  switch (e) {
    case "maximum":
      return Number.MAX_SAFE_INTEGER;
    case "10 years":
      return 10 * Gt;
    case "1 year":
      return Gt;
    case "1 month":
      return _r;
    case "1 week":
      return Nr;
    case "1 day":
      return St;
    case "12 hours":
      return Hi;
    case "6 hours":
      return Wi;
    case "3 hours":
      return Fi;
    case "1 hour":
      return et;
    case "30 mins":
      return Yi;
    case "15 mins":
      return _i;
    case "10 mins":
      return Ni;
    case "5 mins":
      return Ui;
    case "1 min":
      return Re;
    case "30 secs":
      return 30 * je;
    case "10 secs":
      return 10 * je;
    case "5 secs":
      return 5 * je;
    case "1 sec":
      return je;
    case "500 ms":
      return 500;
    case "100 ms":
      return 100;
    case "10 ms":
      return 10;
    case "minimum":
      return 0;
    default:
      return 0;
  }
}, $i = (e, t) => {
  const n = cn(e[1], e[0]);
  return n > ge(t[0]) ? "maximum" : n <= ge("minimum") ? "minimum" : [...t].reverse().find((r) => n <= ge(r)) || "maximum";
}, Ai = (e, t) => {
  const n = cn(e[1], e[0]) / 2;
  return t.find((r) => ge(r) <= n) || "minimum";
}, Li = (e, t) => {
  const n = cn(e[1], e[0]) * 2;
  return [...t].reverse().find((r) => ge(r) > n) || "maximum";
}, Yr = (e, t, n, r) => [
  Math.max(e, n - r / 2),
  Math.min(t, n + r / 2)
];
function Pn(e) {
  switch (e) {
    case B.MAX:
      return "yyyy";
    case B.TEN_YEARS:
      return "yyyy-MM";
    case B.ONE_YEAR:
      return "yyyy-MM-ww";
    case B.ONE_MONTH:
      return "yyyy-MM-ww-dd";
    case B.ONE_WEEK:
      return "yyyy-MM-ww-dd-aaa";
    case B.ONE_DAY:
      return "yyyy-MM-ww-dd-HH";
    case B.MIN:
      return "T";
    default:
      return "T";
  }
}
const $n = "isPinnedOrSelected", Ri = (e, t, n, r, a, o, i) => {
  const [u, l] = pe(!1), s = ae(
    (y) => {
      l(!0), o(y);
    },
    [l, o]
  ), c = ae(
    (y) => {
      l(!1), i(y);
    },
    [l, i]
  ), [f, d, g] = Se(() => {
    const y = e.filter((v) => {
      const T = v.startTimeMillis >= t[0] && v.startTimeMillis <= t[1], O = v.endTimeMillis && v.endTimeMillis >= t[0] && v.endTimeMillis <= t[1], k = v.endTimeMillis && v.startTimeMillis < t[0] && v.endTimeMillis > t[1];
      return T || O || k;
    }), b = y.some((v) => v.isSelected) === !1;
    return !a || n === B.ONE_DAY ? [y, [], b] : to(
      y,
      (v) => v.isPinned || v.isSelected ? $n : `${r ? `${v.laneId}-` : ""}${Wn(v.startTimeMillis, Pn(n))}${v.endTimeMillis ? `-${Wn(v.endTimeMillis, Pn(n))}` : ""}`
    ).reduce(
      (v, T) => T[0] === $n || T[1].length <= 1 ? [[...v[0], ...T[1]], [...v[1]], b] : [
        [...v[0]],
        [
          ...v[1],
          {
            timeMillis: T[1].reduce(
              (O, k) => {
                var w;
                return O + (k.startTimeMillis + ((w = k.endTimeMillis) != null ? w : k.startTimeMillis)) / 2;
              },
              0
            ) / T[1].length,
            laneId: T[1][0].laneId,
            size: T[1].length
          }
        ],
        b
      ],
      [[], [], b]
    );
  }, [e, t, n, r, a]);
  return {
    eventsInsideDomain: f,
    eventClustersInsideDomain: d,
    isNoEventSelected: g,
    isMouseOverEvent: u,
    onEventHoverDecorated: s,
    onEventUnhoverDecorated: c
  };
};
function Fr(e, t) {
  const n = [...t].sort((r, a) => ge(a) - ge(r));
  return {
    currentZoomScale: $i(e, n),
    nextSmallerZoomScale: Ai(e, n),
    nextBiggerZoomScale: Li(e, n)
  };
}
function tt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
const An = Symbol("implicit");
function Wr() {
  var e = /* @__PURE__ */ new Map(), t = [], n = [], r = An;
  function a(o) {
    var i = o + "", u = e.get(i);
    if (!u) {
      if (r !== An)
        return r;
      e.set(i, u = t.push(o));
    }
    return n[(u - 1) % n.length];
  }
  return a.domain = function(o) {
    if (!arguments.length)
      return t.slice();
    t = [], e = /* @__PURE__ */ new Map();
    for (const i of o) {
      const u = i + "";
      e.has(u) || e.set(u, t.push(i));
    }
    return a;
  }, a.range = function(o) {
    return arguments.length ? (n = Array.from(o), a) : n.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (r = o, a) : r;
  }, a.copy = function() {
    return Wr(t, n).unknown(r);
  }, tt.apply(a, arguments), a;
}
function Hr() {
  var e = Wr().unknown(void 0), t = e.domain, n = e.range, r = 0, a = 1, o, i, u = !1, l = 0, s = 0, c = 0.5;
  delete e.unknown;
  function f() {
    var d = t().length, g = a < r, y = g ? a : r, b = g ? r : a;
    o = (b - y) / Math.max(1, d - l + s * 2), u && (o = Math.floor(o)), y += (b - y - o * (d - l)) * c, i = o * (1 - l), u && (y = Math.round(y), i = Math.round(i));
    var v = io(d).map(function(T) {
      return y + o * T;
    });
    return n(g ? v.reverse() : v);
  }
  return e.domain = function(d) {
    return arguments.length ? (t(d), f()) : t();
  }, e.range = function(d) {
    return arguments.length ? ([r, a] = d, r = +r, a = +a, f()) : [r, a];
  }, e.rangeRound = function(d) {
    return [r, a] = d, r = +r, a = +a, u = !0, f();
  }, e.bandwidth = function() {
    return i;
  }, e.step = function() {
    return o;
  }, e.round = function(d) {
    return arguments.length ? (u = !!d, f()) : u;
  }, e.padding = function(d) {
    return arguments.length ? (l = Math.min(1, s = +d), f()) : l;
  }, e.paddingInner = function(d) {
    return arguments.length ? (l = Math.min(1, d), f()) : l;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (s = +d, f()) : s;
  }, e.align = function(d) {
    return arguments.length ? (c = Math.max(0, Math.min(1, d)), f()) : c;
  }, e.copy = function() {
    return Hr(t(), [r, a]).round(u).paddingInner(l).paddingOuter(s).align(c);
  }, tt.apply(f(), arguments);
}
function fn(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Pr(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t)
    n[r] = t[r];
  return n;
}
function nt() {
}
var Ge = 0.7, yt = 1 / Ge, We = "\\s*([+-]?\\d+)\\s*", Ze = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", de = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ii = /^#([0-9a-f]{3,8})$/, qi = new RegExp("^rgb\\(" + [We, We, We] + "\\)$"), zi = new RegExp("^rgb\\(" + [de, de, de] + "\\)$"), Bi = new RegExp("^rgba\\(" + [We, We, We, Ze] + "\\)$"), Xi = new RegExp("^rgba\\(" + [de, de, de, Ze] + "\\)$"), ji = new RegExp("^hsl\\(" + [Ze, de, de] + "\\)$"), Vi = new RegExp("^hsla\\(" + [Ze, de, de, Ze] + "\\)$"), Ln = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
fn(nt, Qe, {
  copy: function(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: Rn,
  formatHex: Rn,
  formatHsl: Gi,
  formatRgb: In,
  toString: In
});
function Rn() {
  return this.rgb().formatHex();
}
function Gi() {
  return $r(this).formatHsl();
}
function In() {
  return this.rgb().formatRgb();
}
function Qe(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Ii.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? qn(t) : n === 3 ? new oe(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? it(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? it(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = qi.exec(e)) ? new oe(t[1], t[2], t[3], 1) : (t = zi.exec(e)) ? new oe(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Bi.exec(e)) ? it(t[1], t[2], t[3], t[4]) : (t = Xi.exec(e)) ? it(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ji.exec(e)) ? Xn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Vi.exec(e)) ? Xn(t[1], t[2] / 100, t[3] / 100, t[4]) : Ln.hasOwnProperty(e) ? qn(Ln[e]) : e === "transparent" ? new oe(NaN, NaN, NaN, 0) : null;
}
function qn(e) {
  return new oe(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function it(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new oe(e, t, n, r);
}
function Zi(e) {
  return e instanceof nt || (e = Qe(e)), e ? (e = e.rgb(), new oe(e.r, e.g, e.b, e.opacity)) : new oe();
}
function Zt(e, t, n, r) {
  return arguments.length === 1 ? Zi(e) : new oe(e, t, n, r == null ? 1 : r);
}
function oe(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
fn(oe, Zt, Pr(nt, {
  brighter: function(e) {
    return e = e == null ? yt : Math.pow(yt, e), new oe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker: function(e) {
    return e = e == null ? Ge : Math.pow(Ge, e), new oe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: zn,
  formatHex: zn,
  formatRgb: Bn,
  toString: Bn
}));
function zn() {
  return "#" + Et(this.r) + Et(this.g) + Et(this.b);
}
function Bn() {
  var e = this.opacity;
  return e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e)), (e === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (e === 1 ? ")" : ", " + e + ")");
}
function Et(e) {
  return e = Math.max(0, Math.min(255, Math.round(e) || 0)), (e < 16 ? "0" : "") + e.toString(16);
}
function Xn(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ce(e, t, n, r);
}
function $r(e) {
  if (e instanceof ce)
    return new ce(e.h, e.s, e.l, e.opacity);
  if (e instanceof nt || (e = Qe(e)), !e)
    return new ce();
  if (e instanceof ce)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, a = Math.min(t, n, r), o = Math.max(t, n, r), i = NaN, u = o - a, l = (o + a) / 2;
  return u ? (t === o ? i = (n - r) / u + (n < r) * 6 : n === o ? i = (r - t) / u + 2 : i = (t - n) / u + 4, u /= l < 0.5 ? o + a : 2 - o - a, i *= 60) : u = l > 0 && l < 1 ? 0 : i, new ce(i, u, l, e.opacity);
}
function Qi(e, t, n, r) {
  return arguments.length === 1 ? $r(e) : new ce(e, t, n, r == null ? 1 : r);
}
function ce(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
fn(ce, Qi, Pr(nt, {
  brighter: function(e) {
    return e = e == null ? yt : Math.pow(yt, e), new ce(this.h, this.s, this.l * e, this.opacity);
  },
  darker: function(e) {
    return e = e == null ? Ge : Math.pow(Ge, e), new ce(this.h, this.s, this.l * e, this.opacity);
  },
  rgb: function() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, a = 2 * n - r;
    return new oe(
      Ut(e >= 240 ? e - 240 : e + 120, a, r),
      Ut(e, a, r),
      Ut(e < 120 ? e + 240 : e - 120, a, r),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function() {
    var e = this.opacity;
    return e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e)), (e === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (e === 1 ? ")" : ", " + e + ")");
  }
}));
function Ut(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const dn = (e) => () => e;
function Ji(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Ki(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function eu(e) {
  return (e = +e) == 1 ? Ar : function(t, n) {
    return n - t ? Ki(t, n, e) : dn(isNaN(t) ? n : t);
  };
}
function Ar(e, t) {
  var n = t - e;
  return n ? Ji(e, n) : dn(isNaN(e) ? t : e);
}
const jn = function e(t) {
  var n = eu(t);
  function r(a, o) {
    var i = n((a = Zt(a)).r, (o = Zt(o)).r), u = n(a.g, o.g), l = n(a.b, o.b), s = Ar(a.opacity, o.opacity);
    return function(c) {
      return a.r = i(c), a.g = u(c), a.b = l(c), a.opacity = s(c), a + "";
    };
  }
  return r.gamma = e, r;
}(1);
function tu(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), a;
  return function(o) {
    for (a = 0; a < n; ++a)
      r[a] = e[a] * (1 - o) + t[a] * o;
    return r;
  };
}
function nu(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ru(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, a = new Array(r), o = new Array(n), i;
  for (i = 0; i < r; ++i)
    a[i] = hn(e[i], t[i]);
  for (; i < n; ++i)
    o[i] = t[i];
  return function(u) {
    for (i = 0; i < r; ++i)
      o[i] = a[i](u);
    return o;
  };
}
function au(e, t) {
  var n = new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function vt(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function ou(e, t) {
  var n = {}, r = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? n[a] = hn(e[a], t[a]) : r[a] = t[a];
  return function(o) {
    for (a in n)
      r[a] = n[a](o);
    return r;
  };
}
var Qt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Nt = new RegExp(Qt.source, "g");
function iu(e) {
  return function() {
    return e;
  };
}
function uu(e) {
  return function(t) {
    return e(t) + "";
  };
}
function su(e, t) {
  var n = Qt.lastIndex = Nt.lastIndex = 0, r, a, o, i = -1, u = [], l = [];
  for (e = e + "", t = t + ""; (r = Qt.exec(e)) && (a = Nt.exec(t)); )
    (o = a.index) > n && (o = t.slice(n, o), u[i] ? u[i] += o : u[++i] = o), (r = r[0]) === (a = a[0]) ? u[i] ? u[i] += a : u[++i] = a : (u[++i] = null, l.push({ i, x: vt(r, a) })), n = Nt.lastIndex;
  return n < t.length && (o = t.slice(n), u[i] ? u[i] += o : u[++i] = o), u.length < 2 ? l[0] ? uu(l[0].x) : iu(t) : (t = l.length, function(s) {
    for (var c = 0, f; c < t; ++c)
      u[(f = l[c]).i] = f.x(s);
    return u.join("");
  });
}
function hn(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? dn(t) : (n === "number" ? vt : n === "string" ? (r = Qe(t)) ? (t = r, jn) : su : t instanceof Qe ? jn : t instanceof Date ? au : nu(t) ? tu : Array.isArray(t) ? ru : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? ou : vt)(e, t);
}
function lu(e, t) {
  return e = +e, t = +t, function(n) {
    return Math.round(e * (1 - n) + t * n);
  };
}
function cu(e) {
  return function() {
    return e;
  };
}
function fu(e) {
  return +e;
}
var Vn = [0, 1];
function fe(e) {
  return e;
}
function Jt(e, t) {
  return (t -= e = +e) ? function(n) {
    return (n - e) / t;
  } : cu(isNaN(t) ? NaN : 0.5);
}
function du(e, t) {
  var n;
  return e > t && (n = e, e = t, t = n), function(r) {
    return Math.max(e, Math.min(t, r));
  };
}
function hu(e, t, n) {
  var r = e[0], a = e[1], o = t[0], i = t[1];
  return a < r ? (r = Jt(a, r), o = n(i, o)) : (r = Jt(r, a), o = n(o, i)), function(u) {
    return o(r(u));
  };
}
function mu(e, t, n) {
  var r = Math.min(e.length, t.length) - 1, a = new Array(r), o = new Array(r), i = -1;
  for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++i < r; )
    a[i] = Jt(e[i], e[i + 1]), o[i] = n(t[i], t[i + 1]);
  return function(u) {
    var l = Va(e, u, 1, r) - 1;
    return o[l](a[l](u));
  };
}
function mn(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Lr() {
  var e = Vn, t = Vn, n = hn, r, a, o, i = fe, u, l, s;
  function c() {
    var d = Math.min(e.length, t.length);
    return i !== fe && (i = du(e[0], e[d - 1])), u = d > 2 ? mu : hu, l = s = null, f;
  }
  function f(d) {
    return d == null || isNaN(d = +d) ? o : (l || (l = u(e.map(r), t, n)))(r(i(d)));
  }
  return f.invert = function(d) {
    return i(a((s || (s = u(t, e.map(r), vt)))(d)));
  }, f.domain = function(d) {
    return arguments.length ? (e = Array.from(d, fu), c()) : e.slice();
  }, f.range = function(d) {
    return arguments.length ? (t = Array.from(d), c()) : t.slice();
  }, f.rangeRound = function(d) {
    return t = Array.from(d), n = lu, c();
  }, f.clamp = function(d) {
    return arguments.length ? (i = d ? !0 : fe, c()) : i !== fe;
  }, f.interpolate = function(d) {
    return arguments.length ? (n = d, c()) : n;
  }, f.unknown = function(d) {
    return arguments.length ? (o = d, f) : o;
  }, function(d, g) {
    return r = d, a = g, c();
  };
}
function Rr() {
  return Lr()(fe, fe);
}
function gu(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function pt(e, t) {
  if ((n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0)
    return null;
  var n, r = e.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +e.slice(n + 1)
  ];
}
function He(e) {
  return e = pt(Math.abs(e)), e ? e[1] : NaN;
}
function yu(e, t) {
  return function(n, r) {
    for (var a = n.length, o = [], i = 0, u = e[0], l = 0; a > 0 && u > 0 && (l + u + 1 > r && (u = Math.max(1, r - l)), o.push(n.substring(a -= u, a + u)), !((l += u + 1) > r)); )
      u = e[i = (i + 1) % e.length];
    return o.reverse().join(t);
  };
}
function vu(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(n) {
      return e[+n];
    });
  };
}
var pu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function wt(e) {
  if (!(t = pu.exec(e)))
    throw new Error("invalid format: " + e);
  var t;
  return new gn({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
wt.prototype = gn.prototype;
function gn(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
gn.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function wu(e) {
  e:
    for (var t = e.length, n = 1, r = -1, a; n < t; ++n)
      switch (e[n]) {
        case ".":
          r = a = n;
          break;
        case "0":
          r === 0 && (r = n), a = n;
          break;
        default:
          if (!+e[n])
            break e;
          r > 0 && (r = 0);
          break;
      }
  return r > 0 ? e.slice(0, r) + e.slice(a + 1) : e;
}
var Ir;
function xu(e, t) {
  var n = pt(e, t);
  if (!n)
    return e + "";
  var r = n[0], a = n[1], o = a - (Ir = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, i = r.length;
  return o === i ? r : o > i ? r + new Array(o - i + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + pt(e, Math.max(0, t + o - 1))[0];
}
function Gn(e, t) {
  var n = pt(e, t);
  if (!n)
    return e + "";
  var r = n[0], a = n[1];
  return a < 0 ? "0." + new Array(-a).join("0") + r : r.length > a + 1 ? r.slice(0, a + 1) + "." + r.slice(a + 1) : r + new Array(a - r.length + 2).join("0");
}
const Zn = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: gu,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Gn(e * 100, t),
  r: Gn,
  s: xu,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Qn(e) {
  return e;
}
var Jn = Array.prototype.map, Kn = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function bu(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Qn : yu(Jn.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", o = e.numerals === void 0 ? Qn : vu(Jn.call(e.numerals, String)), i = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "\u2212" : e.minus + "", l = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(f) {
    f = wt(f);
    var d = f.fill, g = f.align, y = f.sign, b = f.symbol, v = f.zero, T = f.width, O = f.comma, k = f.precision, w = f.trim, E = f.type;
    E === "n" ? (O = !0, E = "g") : Zn[E] || (k === void 0 && (k = 12), w = !0, E = "g"), (v || d === "0" && g === "=") && (v = !0, d = "0", g = "=");
    var x = b === "$" ? n : b === "#" && /[boxX]/.test(E) ? "0" + E.toLowerCase() : "", D = b === "$" ? r : /[%p]/.test(E) ? i : "", F = Zn[E], _ = /[defgprs%]/.test(E);
    k = k === void 0 ? 6 : /[gprs]/.test(E) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k));
    function M(S) {
      var Y = x, R = D, G, A, j;
      if (E === "c")
        R = F(S) + R, S = "";
      else {
        S = +S;
        var V = S < 0 || 1 / S < 0;
        if (S = isNaN(S) ? l : F(Math.abs(S), k), w && (S = wu(S)), V && +S == 0 && y !== "+" && (V = !1), Y = (V ? y === "(" ? y : u : y === "-" || y === "(" ? "" : y) + Y, R = (E === "s" ? Kn[8 + Ir / 3] : "") + R + (V && y === "(" ? ")" : ""), _) {
          for (G = -1, A = S.length; ++G < A; )
            if (j = S.charCodeAt(G), 48 > j || j > 57) {
              R = (j === 46 ? a + S.slice(G + 1) : S.slice(G)) + R, S = S.slice(0, G);
              break;
            }
        }
      }
      O && !v && (S = t(S, 1 / 0));
      var K = Y.length + S.length + R.length, q = K < T ? new Array(T - K + 1).join(d) : "";
      switch (O && v && (S = t(q + S, q.length ? T - R.length : 1 / 0), q = ""), g) {
        case "<":
          S = Y + S + R + q;
          break;
        case "=":
          S = Y + q + S + R;
          break;
        case "^":
          S = q.slice(0, K = q.length >> 1) + Y + S + R + q.slice(K);
          break;
        default:
          S = q + Y + S + R;
          break;
      }
      return o(S);
    }
    return M.toString = function() {
      return f + "";
    }, M;
  }
  function c(f, d) {
    var g = s((f = wt(f), f.type = "f", f)), y = Math.max(-8, Math.min(8, Math.floor(He(d) / 3))) * 3, b = Math.pow(10, -y), v = Kn[8 + y / 3];
    return function(T) {
      return g(b * T) + v;
    };
  }
  return {
    format: s,
    formatPrefix: c
  };
}
var ut, qr, zr;
Mu({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Mu(e) {
  return ut = bu(e), qr = ut.format, zr = ut.formatPrefix, ut;
}
function Tu(e) {
  return Math.max(0, -He(Math.abs(e)));
}
function Su(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(He(t) / 3))) * 3 - He(Math.abs(e)));
}
function Cu(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, He(t) - He(e)) + 1;
}
function Du(e, t, n, r) {
  var a = Vt(e, t, n), o;
  switch (r = wt(r == null ? ",f" : r), r.type) {
    case "s": {
      var i = Math.max(Math.abs(e), Math.abs(t));
      return r.precision == null && !isNaN(o = Su(a, i)) && (r.precision = o), zr(r, i);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = Cu(a, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = Tu(a)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return qr(r);
}
function Br(e) {
  var t = e.domain;
  return e.ticks = function(n) {
    var r = t();
    return ro(r[0], r[r.length - 1], n == null ? 10 : n);
  }, e.tickFormat = function(n, r) {
    var a = t();
    return Du(a[0], a[a.length - 1], n == null ? 10 : n, r);
  }, e.nice = function(n) {
    n == null && (n = 10);
    var r = t(), a = 0, o = r.length - 1, i = r[a], u = r[o], l, s, c = 10;
    for (u < i && (s = i, i = u, u = s, s = a, a = o, o = s); c-- > 0; ) {
      if (s = Dr(i, u, n), s === l)
        return r[a] = i, r[o] = u, t(r);
      if (s > 0)
        i = Math.floor(i / s) * s, u = Math.ceil(u / s) * s;
      else if (s < 0)
        i = Math.ceil(i * s) / s, u = Math.floor(u * s) / s;
      else
        break;
      l = s;
    }
    return e;
  }, e;
}
function yn() {
  var e = Rr();
  return e.copy = function() {
    return mn(e, yn());
  }, tt.apply(e, arguments), Br(e);
}
function Ou(e, t) {
  e = e.slice();
  var n = 0, r = e.length - 1, a = e[n], o = e[r], i;
  return o < a && (i = n, n = r, r = i, i = a, a = o, o = i), e[n] = t.floor(a), e[r] = t.ceil(o), e;
}
function er(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function ku(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function Eu(e) {
  return e < 0 ? -e * e : e * e;
}
function Uu(e) {
  var t = e(fe, fe), n = 1;
  function r() {
    return n === 1 ? e(fe, fe) : n === 0.5 ? e(ku, Eu) : e(er(n), er(1 / n));
  }
  return t.exponent = function(a) {
    return arguments.length ? (n = +a, r()) : n;
  }, Br(t);
}
function Xr() {
  var e = Uu(Lr());
  return e.copy = function() {
    return mn(e, Xr()).exponent(e.exponent());
  }, tt.apply(e, arguments), e;
}
function Nu() {
  return Xr.apply(null, arguments).exponent(0.5);
}
var _t = new Date(), Yt = new Date();
function Q(e, t, n, r) {
  function a(o) {
    return e(o = arguments.length === 0 ? new Date() : new Date(+o)), o;
  }
  return a.floor = function(o) {
    return e(o = new Date(+o)), o;
  }, a.ceil = function(o) {
    return e(o = new Date(o - 1)), t(o, 1), e(o), o;
  }, a.round = function(o) {
    var i = a(o), u = a.ceil(o);
    return o - i < u - o ? i : u;
  }, a.offset = function(o, i) {
    return t(o = new Date(+o), i == null ? 1 : Math.floor(i)), o;
  }, a.range = function(o, i, u) {
    var l = [], s;
    if (o = a.ceil(o), u = u == null ? 1 : Math.floor(u), !(o < i) || !(u > 0))
      return l;
    do
      l.push(s = new Date(+o)), t(o, u), e(o);
    while (s < o && o < i);
    return l;
  }, a.filter = function(o) {
    return Q(function(i) {
      if (i >= i)
        for (; e(i), !o(i); )
          i.setTime(i - 1);
    }, function(i, u) {
      if (i >= i)
        if (u < 0)
          for (; ++u <= 0; )
            for (; t(i, -1), !o(i); )
              ;
        else
          for (; --u >= 0; )
            for (; t(i, 1), !o(i); )
              ;
    });
  }, n && (a.count = function(o, i) {
    return _t.setTime(+o), Yt.setTime(+i), e(_t), e(Yt), Math.floor(n(_t, Yt));
  }, a.every = function(o) {
    return o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? a.filter(r ? function(i) {
      return r(i) % o === 0;
    } : function(i) {
      return a.count(0, i) % o === 0;
    }) : a;
  }), a;
}
var xt = Q(function() {
}, function(e, t) {
  e.setTime(+e + t);
}, function(e, t) {
  return t - e;
});
xt.every = function(e) {
  return e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Q(function(t) {
    t.setTime(Math.floor(t / e) * e);
  }, function(t, n) {
    t.setTime(+t + n * e);
  }, function(t, n) {
    return (n - t) / e;
  }) : xt;
};
const _u = xt;
xt.range;
const he = 1e3, ie = he * 60, me = ie * 60, Ce = me * 24, vn = Ce * 7, tr = Ce * 30, Ft = Ce * 365;
var jr = Q(function(e) {
  e.setTime(e - e.getMilliseconds());
}, function(e, t) {
  e.setTime(+e + t * he);
}, function(e, t) {
  return (t - e) / he;
}, function(e) {
  return e.getUTCSeconds();
});
const Ve = jr;
jr.range;
var Vr = Q(function(e) {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * he);
}, function(e, t) {
  e.setTime(+e + t * ie);
}, function(e, t) {
  return (t - e) / ie;
}, function(e) {
  return e.getMinutes();
});
const Gr = Vr;
Vr.range;
var Zr = Q(function(e) {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * he - e.getMinutes() * ie);
}, function(e, t) {
  e.setTime(+e + t * me);
}, function(e, t) {
  return (t - e) / me;
}, function(e) {
  return e.getHours();
});
const Qr = Zr;
Zr.range;
var Jr = Q(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * ie) / Ce,
  (e) => e.getDate() - 1
);
const Kr = Jr;
Jr.range;
function De(e) {
  return Q(function(t) {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setDate(t.getDate() + n * 7);
  }, function(t, n) {
    return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * ie) / vn;
  });
}
var pn = De(0), Yu = De(1), Fu = De(2), Wu = De(3), Hu = De(4), Pu = De(5), $u = De(6);
pn.range;
Yu.range;
Fu.range;
Wu.range;
Hu.range;
Pu.range;
$u.range;
var ea = Q(function(e) {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, function(e, t) {
  e.setMonth(e.getMonth() + t);
}, function(e, t) {
  return t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12;
}, function(e) {
  return e.getMonth();
});
const ta = ea;
ea.range;
var wn = Q(function(e) {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, function(e, t) {
  e.setFullYear(e.getFullYear() + t);
}, function(e, t) {
  return t.getFullYear() - e.getFullYear();
}, function(e) {
  return e.getFullYear();
});
wn.every = function(e) {
  return !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Q(function(t) {
    t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setFullYear(t.getFullYear() + n * e);
  });
};
const na = wn;
wn.range;
var ra = Q(function(e) {
  e.setUTCSeconds(0, 0);
}, function(e, t) {
  e.setTime(+e + t * ie);
}, function(e, t) {
  return (t - e) / ie;
}, function(e) {
  return e.getUTCMinutes();
});
const Au = ra;
ra.range;
var aa = Q(function(e) {
  e.setUTCMinutes(0, 0, 0);
}, function(e, t) {
  e.setTime(+e + t * me);
}, function(e, t) {
  return (t - e) / me;
}, function(e) {
  return e.getUTCHours();
});
const Lu = aa;
aa.range;
var oa = Q(function(e) {
  e.setUTCHours(0, 0, 0, 0);
}, function(e, t) {
  e.setUTCDate(e.getUTCDate() + t);
}, function(e, t) {
  return (t - e) / Ce;
}, function(e) {
  return e.getUTCDate() - 1;
});
const Ru = oa;
oa.range;
function Oe(e) {
  return Q(function(t) {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setUTCDate(t.getUTCDate() + n * 7);
  }, function(t, n) {
    return (n - t) / vn;
  });
}
var ia = Oe(0), Iu = Oe(1), qu = Oe(2), zu = Oe(3), Bu = Oe(4), Xu = Oe(5), ju = Oe(6);
ia.range;
Iu.range;
qu.range;
zu.range;
Bu.range;
Xu.range;
ju.range;
var ua = Q(function(e) {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, function(e, t) {
  e.setUTCMonth(e.getUTCMonth() + t);
}, function(e, t) {
  return t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12;
}, function(e) {
  return e.getUTCMonth();
});
const Vu = ua;
ua.range;
var xn = Q(function(e) {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, function(e, t) {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, function(e, t) {
  return t.getUTCFullYear() - e.getUTCFullYear();
}, function(e) {
  return e.getUTCFullYear();
});
xn.every = function(e) {
  return !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Q(function(t) {
    t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setUTCFullYear(t.getUTCFullYear() + n * e);
  });
};
const Gu = xn;
xn.range;
function sa(e, t, n, r, a, o) {
  const i = [
    [Ve, 1, he],
    [Ve, 5, 5 * he],
    [Ve, 15, 15 * he],
    [Ve, 30, 30 * he],
    [o, 1, ie],
    [o, 5, 5 * ie],
    [o, 15, 15 * ie],
    [o, 30, 30 * ie],
    [a, 1, me],
    [a, 3, 3 * me],
    [a, 6, 6 * me],
    [a, 12, 12 * me],
    [r, 1, Ce],
    [r, 2, 2 * Ce],
    [n, 1, vn],
    [t, 1, tr],
    [t, 3, 3 * tr],
    [e, 1, Ft]
  ];
  function u(s, c, f) {
    const d = c < s;
    d && ([s, c] = [c, s]);
    const g = f && typeof f.range == "function" ? f : l(s, c, f), y = g ? g.range(s, +c + 1) : [];
    return d ? y.reverse() : y;
  }
  function l(s, c, f) {
    const d = Math.abs(c - s) / f, g = ln(([, , v]) => v).right(i, d);
    if (g === i.length)
      return e.every(Vt(s / Ft, c / Ft, f));
    if (g === 0)
      return _u.every(Math.max(Vt(s, c, f), 1));
    const [y, b] = i[d / i[g - 1][2] < i[g][2] / d ? g - 1 : g];
    return y.every(b);
  }
  return [u, l];
}
sa(Gu, Vu, ia, Ru, Lu, Au);
const [Zu, Qu] = sa(na, ta, pn, Kr, Qr, Gr);
var Wt = new Date(), Ht = new Date();
function ye(e, t, n, r) {
  function a(o) {
    return e(o = arguments.length === 0 ? new Date() : new Date(+o)), o;
  }
  return a.floor = function(o) {
    return e(o = new Date(+o)), o;
  }, a.ceil = function(o) {
    return e(o = new Date(o - 1)), t(o, 1), e(o), o;
  }, a.round = function(o) {
    var i = a(o), u = a.ceil(o);
    return o - i < u - o ? i : u;
  }, a.offset = function(o, i) {
    return t(o = new Date(+o), i == null ? 1 : Math.floor(i)), o;
  }, a.range = function(o, i, u) {
    var l = [], s;
    if (o = a.ceil(o), u = u == null ? 1 : Math.floor(u), !(o < i) || !(u > 0))
      return l;
    do
      l.push(s = new Date(+o)), t(o, u), e(o);
    while (s < o && o < i);
    return l;
  }, a.filter = function(o) {
    return ye(function(i) {
      if (i >= i)
        for (; e(i), !o(i); )
          i.setTime(i - 1);
    }, function(i, u) {
      if (i >= i)
        if (u < 0)
          for (; ++u <= 0; )
            for (; t(i, -1), !o(i); )
              ;
        else
          for (; --u >= 0; )
            for (; t(i, 1), !o(i); )
              ;
    });
  }, n && (a.count = function(o, i) {
    return Wt.setTime(+o), Ht.setTime(+i), e(Wt), e(Ht), Math.floor(n(Wt, Ht));
  }, a.every = function(o) {
    return o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? a.filter(r ? function(i) {
      return r(i) % o === 0;
    } : function(i) {
      return a.count(0, i) % o === 0;
    }) : a;
  }), a;
}
const Ju = 1e3, bn = Ju * 60, Ku = bn * 60, Mn = Ku * 24, la = Mn * 7;
var ca = ye(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * bn) / Mn,
  (e) => e.getDate() - 1
);
const fa = ca;
ca.range;
function ke(e) {
  return ye(function(t) {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setDate(t.getDate() + n * 7);
  }, function(t, n) {
    return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * bn) / la;
  });
}
var da = ke(0), bt = ke(1), es = ke(2), ts = ke(3), Pe = ke(4), ns = ke(5), rs = ke(6);
da.range;
bt.range;
es.range;
ts.range;
Pe.range;
ns.range;
rs.range;
var Tn = ye(function(e) {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, function(e, t) {
  e.setFullYear(e.getFullYear() + t);
}, function(e, t) {
  return t.getFullYear() - e.getFullYear();
}, function(e) {
  return e.getFullYear();
});
Tn.every = function(e) {
  return !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ye(function(t) {
    t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setFullYear(t.getFullYear() + n * e);
  });
};
const Je = Tn;
Tn.range;
var ha = ye(function(e) {
  e.setUTCHours(0, 0, 0, 0);
}, function(e, t) {
  e.setUTCDate(e.getUTCDate() + t);
}, function(e, t) {
  return (t - e) / Mn;
}, function(e) {
  return e.getUTCDate() - 1;
});
const ma = ha;
ha.range;
function Ee(e) {
  return ye(function(t) {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setUTCDate(t.getUTCDate() + n * 7);
  }, function(t, n) {
    return (n - t) / la;
  });
}
var ga = Ee(0), Mt = Ee(1), as = Ee(2), os = Ee(3), $e = Ee(4), is = Ee(5), us = Ee(6);
ga.range;
Mt.range;
as.range;
os.range;
$e.range;
is.range;
us.range;
var Sn = ye(function(e) {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, function(e, t) {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, function(e, t) {
  return t.getUTCFullYear() - e.getUTCFullYear();
}, function(e) {
  return e.getUTCFullYear();
});
Sn.every = function(e) {
  return !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ye(function(t) {
    t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  }, function(t, n) {
    t.setUTCFullYear(t.getUTCFullYear() + n * e);
  });
};
const Ke = Sn;
Sn.range;
function Pt(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function $t(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function ze(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function ss(e) {
  var t = e.dateTime, n = e.date, r = e.time, a = e.periods, o = e.days, i = e.shortDays, u = e.months, l = e.shortMonths, s = Be(a), c = Xe(a), f = Be(o), d = Xe(o), g = Be(i), y = Xe(i), b = Be(u), v = Xe(u), T = Be(l), O = Xe(l), k = {
    a: V,
    A: K,
    b: q,
    B: W,
    c: null,
    d: ur,
    e: ur,
    f: Ns,
    g: Rs,
    G: qs,
    H: ks,
    I: Es,
    j: Us,
    L: ya,
    m: _s,
    M: Ys,
    p: H,
    q: te,
    Q: cr,
    s: fr,
    S: Fs,
    u: Ws,
    U: Hs,
    V: Ps,
    w: $s,
    W: As,
    x: null,
    X: null,
    y: Ls,
    Y: Is,
    Z: zs,
    "%": lr
  }, w = {
    a: xe,
    A: Ue,
    b: Ne,
    B: at,
    c: null,
    d: sr,
    e: sr,
    f: Vs,
    g: al,
    G: il,
    H: Bs,
    I: Xs,
    j: js,
    L: pa,
    m: Gs,
    M: Zs,
    p: ot,
    q: Dt,
    Q: cr,
    s: fr,
    S: Qs,
    u: Js,
    U: Ks,
    V: el,
    w: tl,
    W: nl,
    x: null,
    X: null,
    y: rl,
    Y: ol,
    Z: ul,
    "%": lr
  }, E = {
    a: M,
    A: S,
    b: Y,
    B: R,
    c: G,
    d: or,
    e: or,
    f: Ss,
    g: ar,
    G: rr,
    H: ir,
    I: ir,
    j: xs,
    L: Ts,
    m: ws,
    M: bs,
    p: _,
    q: ps,
    Q: Ds,
    s: Os,
    S: Ms,
    u: hs,
    U: ms,
    V: gs,
    w: ds,
    W: ys,
    x: A,
    X: j,
    y: ar,
    Y: rr,
    Z: vs,
    "%": Cs
  };
  k.x = x(n, k), k.X = x(r, k), k.c = x(t, k), w.x = x(n, w), w.X = x(r, w), w.c = x(t, w);
  function x(p, N) {
    return function(U) {
      var m = [], ee = -1, I = 0, ne = p.length, re, be, On;
      for (U instanceof Date || (U = new Date(+U)); ++ee < ne; )
        p.charCodeAt(ee) === 37 && (m.push(p.slice(I, ee)), (be = nr[re = p.charAt(++ee)]) != null ? re = p.charAt(++ee) : be = re === "e" ? " " : "0", (On = N[re]) && (re = On(U, be)), m.push(re), I = ee + 1);
      return m.push(p.slice(I, ee)), m.join("");
    };
  }
  function D(p, N) {
    return function(U) {
      var m = ze(1900, void 0, 1), ee = F(m, p, U += "", 0), I, ne;
      if (ee != U.length)
        return null;
      if ("Q" in m)
        return new Date(m.Q);
      if ("s" in m)
        return new Date(m.s * 1e3 + ("L" in m ? m.L : 0));
      if (N && !("Z" in m) && (m.Z = 0), "p" in m && (m.H = m.H % 12 + m.p * 12), m.m === void 0 && (m.m = "q" in m ? m.q : 0), "V" in m) {
        if (m.V < 1 || m.V > 53)
          return null;
        "w" in m || (m.w = 1), "Z" in m ? (I = $t(ze(m.y, 0, 1)), ne = I.getUTCDay(), I = ne > 4 || ne === 0 ? Mt.ceil(I) : Mt(I), I = ma.offset(I, (m.V - 1) * 7), m.y = I.getUTCFullYear(), m.m = I.getUTCMonth(), m.d = I.getUTCDate() + (m.w + 6) % 7) : (I = Pt(ze(m.y, 0, 1)), ne = I.getDay(), I = ne > 4 || ne === 0 ? bt.ceil(I) : bt(I), I = fa.offset(I, (m.V - 1) * 7), m.y = I.getFullYear(), m.m = I.getMonth(), m.d = I.getDate() + (m.w + 6) % 7);
      } else
        ("W" in m || "U" in m) && ("w" in m || (m.w = "u" in m ? m.u % 7 : "W" in m ? 1 : 0), ne = "Z" in m ? $t(ze(m.y, 0, 1)).getUTCDay() : Pt(ze(m.y, 0, 1)).getDay(), m.m = 0, m.d = "W" in m ? (m.w + 6) % 7 + m.W * 7 - (ne + 5) % 7 : m.w + m.U * 7 - (ne + 6) % 7);
      return "Z" in m ? (m.H += m.Z / 100 | 0, m.M += m.Z % 100, $t(m)) : Pt(m);
    };
  }
  function F(p, N, U, m) {
    for (var ee = 0, I = N.length, ne = U.length, re, be; ee < I; ) {
      if (m >= ne)
        return -1;
      if (re = N.charCodeAt(ee++), re === 37) {
        if (re = N.charAt(ee++), be = E[re in nr ? N.charAt(ee++) : re], !be || (m = be(p, U, m)) < 0)
          return -1;
      } else if (re != U.charCodeAt(m++))
        return -1;
    }
    return m;
  }
  function _(p, N, U) {
    var m = s.exec(N.slice(U));
    return m ? (p.p = c.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function M(p, N, U) {
    var m = g.exec(N.slice(U));
    return m ? (p.w = y.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function S(p, N, U) {
    var m = f.exec(N.slice(U));
    return m ? (p.w = d.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function Y(p, N, U) {
    var m = T.exec(N.slice(U));
    return m ? (p.m = O.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function R(p, N, U) {
    var m = b.exec(N.slice(U));
    return m ? (p.m = v.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function G(p, N, U) {
    return F(p, t, N, U);
  }
  function A(p, N, U) {
    return F(p, n, N, U);
  }
  function j(p, N, U) {
    return F(p, r, N, U);
  }
  function V(p) {
    return i[p.getDay()];
  }
  function K(p) {
    return o[p.getDay()];
  }
  function q(p) {
    return l[p.getMonth()];
  }
  function W(p) {
    return u[p.getMonth()];
  }
  function H(p) {
    return a[+(p.getHours() >= 12)];
  }
  function te(p) {
    return 1 + ~~(p.getMonth() / 3);
  }
  function xe(p) {
    return i[p.getUTCDay()];
  }
  function Ue(p) {
    return o[p.getUTCDay()];
  }
  function Ne(p) {
    return l[p.getUTCMonth()];
  }
  function at(p) {
    return u[p.getUTCMonth()];
  }
  function ot(p) {
    return a[+(p.getUTCHours() >= 12)];
  }
  function Dt(p) {
    return 1 + ~~(p.getUTCMonth() / 3);
  }
  return {
    format: function(p) {
      var N = x(p += "", k);
      return N.toString = function() {
        return p;
      }, N;
    },
    parse: function(p) {
      var N = D(p += "", !1);
      return N.toString = function() {
        return p;
      }, N;
    },
    utcFormat: function(p) {
      var N = x(p += "", w);
      return N.toString = function() {
        return p;
      }, N;
    },
    utcParse: function(p) {
      var N = D(p += "", !0);
      return N.toString = function() {
        return p;
      }, N;
    }
  };
}
var nr = { "-": "", _: " ", 0: "0" }, J = /^\s*\d+/, ls = /^%/, cs = /[\\^$*+?|[\]().{}]/g;
function P(e, t, n) {
  var r = e < 0 ? "-" : "", a = (r ? -e : e) + "", o = a.length;
  return r + (o < n ? new Array(n - o + 1).join(t) + a : a);
}
function fs(e) {
  return e.replace(cs, "\\$&");
}
function Be(e) {
  return new RegExp("^(?:" + e.map(fs).join("|") + ")", "i");
}
function Xe(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function ds(e, t, n) {
  var r = J.exec(t.slice(n, n + 1));
  return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function hs(e, t, n) {
  var r = J.exec(t.slice(n, n + 1));
  return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function ms(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function gs(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function ys(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function rr(e, t, n) {
  var r = J.exec(t.slice(n, n + 4));
  return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function ar(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function vs(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function ps(e, t, n) {
  var r = J.exec(t.slice(n, n + 1));
  return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function ws(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function or(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function xs(e, t, n) {
  var r = J.exec(t.slice(n, n + 3));
  return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function ir(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function bs(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function Ms(e, t, n) {
  var r = J.exec(t.slice(n, n + 2));
  return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function Ts(e, t, n) {
  var r = J.exec(t.slice(n, n + 3));
  return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function Ss(e, t, n) {
  var r = J.exec(t.slice(n, n + 6));
  return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Cs(e, t, n) {
  var r = ls.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function Ds(e, t, n) {
  var r = J.exec(t.slice(n));
  return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function Os(e, t, n) {
  var r = J.exec(t.slice(n));
  return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function ur(e, t) {
  return P(e.getDate(), t, 2);
}
function ks(e, t) {
  return P(e.getHours(), t, 2);
}
function Es(e, t) {
  return P(e.getHours() % 12 || 12, t, 2);
}
function Us(e, t) {
  return P(1 + fa.count(Je(e), e), t, 3);
}
function ya(e, t) {
  return P(e.getMilliseconds(), t, 3);
}
function Ns(e, t) {
  return ya(e, t) + "000";
}
function _s(e, t) {
  return P(e.getMonth() + 1, t, 2);
}
function Ys(e, t) {
  return P(e.getMinutes(), t, 2);
}
function Fs(e, t) {
  return P(e.getSeconds(), t, 2);
}
function Ws(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function Hs(e, t) {
  return P(da.count(Je(e) - 1, e), t, 2);
}
function va(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Pe(e) : Pe.ceil(e);
}
function Ps(e, t) {
  return e = va(e), P(Pe.count(Je(e), e) + (Je(e).getDay() === 4), t, 2);
}
function $s(e) {
  return e.getDay();
}
function As(e, t) {
  return P(bt.count(Je(e) - 1, e), t, 2);
}
function Ls(e, t) {
  return P(e.getFullYear() % 100, t, 2);
}
function Rs(e, t) {
  return e = va(e), P(e.getFullYear() % 100, t, 2);
}
function Is(e, t) {
  return P(e.getFullYear() % 1e4, t, 4);
}
function qs(e, t) {
  var n = e.getDay();
  return e = n >= 4 || n === 0 ? Pe(e) : Pe.ceil(e), P(e.getFullYear() % 1e4, t, 4);
}
function zs(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + P(t / 60 | 0, "0", 2) + P(t % 60, "0", 2);
}
function sr(e, t) {
  return P(e.getUTCDate(), t, 2);
}
function Bs(e, t) {
  return P(e.getUTCHours(), t, 2);
}
function Xs(e, t) {
  return P(e.getUTCHours() % 12 || 12, t, 2);
}
function js(e, t) {
  return P(1 + ma.count(Ke(e), e), t, 3);
}
function pa(e, t) {
  return P(e.getUTCMilliseconds(), t, 3);
}
function Vs(e, t) {
  return pa(e, t) + "000";
}
function Gs(e, t) {
  return P(e.getUTCMonth() + 1, t, 2);
}
function Zs(e, t) {
  return P(e.getUTCMinutes(), t, 2);
}
function Qs(e, t) {
  return P(e.getUTCSeconds(), t, 2);
}
function Js(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function Ks(e, t) {
  return P(ga.count(Ke(e) - 1, e), t, 2);
}
function wa(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? $e(e) : $e.ceil(e);
}
function el(e, t) {
  return e = wa(e), P($e.count(Ke(e), e) + (Ke(e).getUTCDay() === 4), t, 2);
}
function tl(e) {
  return e.getUTCDay();
}
function nl(e, t) {
  return P(Mt.count(Ke(e) - 1, e), t, 2);
}
function rl(e, t) {
  return P(e.getUTCFullYear() % 100, t, 2);
}
function al(e, t) {
  return e = wa(e), P(e.getUTCFullYear() % 100, t, 2);
}
function ol(e, t) {
  return P(e.getUTCFullYear() % 1e4, t, 4);
}
function il(e, t) {
  var n = e.getUTCDay();
  return e = n >= 4 || n === 0 ? $e(e) : $e.ceil(e), P(e.getUTCFullYear() % 1e4, t, 4);
}
function ul() {
  return "+0000";
}
function lr() {
  return "%";
}
function cr(e) {
  return +e;
}
function fr(e) {
  return Math.floor(+e / 1e3);
}
var Ye, xa;
sl({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function sl(e) {
  return Ye = ss(e), xa = Ye.format, Ye.parse, Ye.utcFormat, Ye.utcParse, Ye;
}
function ll(e) {
  return new Date(e);
}
function cl(e) {
  return e instanceof Date ? +e : +new Date(+e);
}
function ba(e, t, n, r, a, o, i, u, l, s) {
  var c = Rr(), f = c.invert, d = c.domain, g = s(".%L"), y = s(":%S"), b = s("%I:%M"), v = s("%I %p"), T = s("%a %d"), O = s("%b %d"), k = s("%B"), w = s("%Y");
  function E(x) {
    return (l(x) < x ? g : u(x) < x ? y : i(x) < x ? b : o(x) < x ? v : r(x) < x ? a(x) < x ? T : O : n(x) < x ? k : w)(x);
  }
  return c.invert = function(x) {
    return new Date(f(x));
  }, c.domain = function(x) {
    return arguments.length ? d(Array.from(x, cl)) : d().map(ll);
  }, c.ticks = function(x) {
    var D = d();
    return e(D[0], D[D.length - 1], x == null ? 10 : x);
  }, c.tickFormat = function(x, D) {
    return D == null ? E : s(D);
  }, c.nice = function(x) {
    var D = d();
    return (!x || typeof x.range != "function") && (x = t(D[0], D[D.length - 1], x == null ? 10 : x)), x ? d(Ou(D, x)) : c;
  }, c.copy = function() {
    return mn(c, ba(e, t, n, r, a, o, i, u, l, s));
  }, c;
}
function fl() {
  return tt.apply(ba(Zu, Qu, na, ta, pn, Kr, Qr, Gr, Ve, xa).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
const dl = (e) => {
  const t = oo(e, (r) => r.startTimeMillis), n = ao(e, (r) => r.endTimeMillis === void 0 ? r.startTimeMillis : r.endTimeMillis);
  return [t != null ? t : NaN, n != null ? n : NaN];
}, hl = ({
  width: e,
  height: t,
  events: n,
  lanes: r,
  customRange: a,
  zoomLevels: o,
  onZoomRangeChange: i
}) => {
  const u = Se(() => a != null ? a : dl(n), [n, a]), l = u[0], s = u[1], [c, f] = pe(u), { currentZoomScale: d, nextSmallerZoomScale: g } = Fr(c, o);
  se(() => {
    f([l, s]);
  }, [l, s]), se(() => {
    i && i(...c);
  }, [c, i]);
  const y = 50, b = Se(
    () => yn().domain(c).range([y, e - y]),
    [c, e]
  ), v = Se(
    () => Hr().domain(r.map((T) => T.laneId)).range([0, t]).paddingInner(0.3).paddingOuter(0.8),
    [r, t]
  );
  return {
    domain: c,
    setDomain: f,
    maxDomain: u,
    maxDomainStart: l,
    maxDomainEnd: s,
    currentZoomScale: d,
    nextSmallerZoomScale: g,
    timeScale: b,
    yScale: v
  };
}, ml = ({
  setDomain: e,
  maxDomainStart: t,
  maxDomainEnd: n,
  animationDuration: r
}) => {
  const [a, o] = pe("none"), i = Date.now();
  return se(() => {
    o("none");
  }, [t, n]), se(() => {
    if (a !== "none") {
      const l = i - a.startMs;
      if (l < r) {
        const s = l / r, c = s * (a.toDomain[0] - a.fromDomain[0]), f = s * (a.toDomain[1] - a.fromDomain[1]), d = [a.fromDomain[0] + c, a.fromDomain[1] + f];
        requestAnimationFrame(() => {
          e(d), d[0] === a.toDomain[0] && d[1] === a.toDomain[1] && o("none");
        });
      } else
        e(a.toDomain), o("none");
    }
  }, [a, i, e, r]), { isAnimationInProgress: a !== "none", setAnimation: o, animation: a };
};
var At = new Date(), Lt = new Date();
function Ma(e, t, n, r) {
  function a(o) {
    return e(o = arguments.length === 0 ? new Date() : new Date(+o)), o;
  }
  return a.floor = function(o) {
    return e(o = new Date(+o)), o;
  }, a.ceil = function(o) {
    return e(o = new Date(o - 1)), t(o, 1), e(o), o;
  }, a.round = function(o) {
    var i = a(o), u = a.ceil(o);
    return o - i < u - o ? i : u;
  }, a.offset = function(o, i) {
    return t(o = new Date(+o), i == null ? 1 : Math.floor(i)), o;
  }, a.range = function(o, i, u) {
    var l = [], s;
    if (o = a.ceil(o), u = u == null ? 1 : Math.floor(u), !(o < i) || !(u > 0))
      return l;
    do
      l.push(s = new Date(+o)), t(o, u), e(o);
    while (s < o && o < i);
    return l;
  }, a.filter = function(o) {
    return Ma(function(i) {
      if (i >= i)
        for (; e(i), !o(i); )
          i.setTime(i - 1);
    }, function(i, u) {
      if (i >= i)
        if (u < 0)
          for (; ++u <= 0; )
            for (; t(i, -1), !o(i); )
              ;
        else
          for (; --u >= 0; )
            for (; t(i, 1), !o(i); )
              ;
    });
  }, n && (a.count = function(o, i) {
    return At.setTime(+o), Lt.setTime(+i), e(At), e(Lt), Math.floor(n(At, Lt));
  }, a.every = function(o) {
    return o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? a.filter(r ? function(i) {
      return r(i) % o === 0;
    } : function(i) {
      return a.count(0, i) % o === 0;
    }) : a;
  }), a;
}
var Ta = Ma(function(e) {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, function(e, t) {
  e.setMonth(e.getMonth() + t);
}, function(e, t) {
  return t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12;
}, function(e) {
  return e.getMonth();
});
const gl = Ta;
Ta.range;
const $ = () => {
  const e = $a(sn);
  return process.env.NODE_ENV !== "production" && Aa(e), e;
}, dr = ({
  height: e,
  domain: t,
  smallerZoomScale: n,
  timeScale: r,
  weekStripes: a
}) => {
  switch (n) {
    case B.TEN_YEARS:
      return /* @__PURE__ */ h(Tt, {
        height: e,
        domain: t,
        timeScale: r,
        showDecadesOnly: !0
      });
    case B.ONE_YEAR:
      return /* @__PURE__ */ h(Tt, {
        height: e,
        domain: t,
        timeScale: r
      });
    case B.ONE_MONTH:
      return /* @__PURE__ */ h(tn, {
        height: e,
        domain: t,
        timeScale: r,
        showWeekStripes: a === void 0 ? !0 : a
      });
    case B.ONE_WEEK:
      return /* @__PURE__ */ h(Rt, {
        height: e,
        domain: t,
        timeScale: r,
        triples: !0,
        doubles: !1,
        ones: !1,
        halves: !1,
        quarters: !1,
        eights: !1
      });
    case B.ONE_DAY:
      return /* @__PURE__ */ h(Rt, {
        height: e,
        domain: t,
        timeScale: r,
        triples: !0,
        doubles: !0,
        ones: !0,
        halves: !1,
        quarters: !1,
        eights: !1
      });
    case B.TWELVE_HOURS:
      return /* @__PURE__ */ h(Rt, {
        height: e,
        domain: t,
        timeScale: r,
        triples: !0,
        doubles: !0,
        ones: !0,
        halves: !0,
        quarters: !0,
        eights: !0
      });
    case B.SIX_HOURS:
      return /* @__PURE__ */ h(st, {
        height: e,
        domain: t,
        timeScale: r,
        ones: !1,
        halves: !1,
        quarters: !1
      });
    case B.THREE_HOURS:
      return /* @__PURE__ */ h(st, {
        height: e,
        domain: t,
        timeScale: r,
        ones: !0,
        halves: !1,
        quarters: !1
      });
    case B.ONE_HOUR:
      return /* @__PURE__ */ h(st, {
        height: e,
        domain: t,
        timeScale: r,
        ones: !0,
        halves: !0,
        quarters: !1
      });
    case B.THIRTY_MINS:
      return /* @__PURE__ */ h(st, {
        height: e,
        domain: t,
        timeScale: r,
        ones: !0,
        halves: !0,
        quarters: !0
      });
    default:
      return /* @__PURE__ */ h(xl, {
        height: e,
        domain: t,
        timeScale: r
      });
  }
}, yl = ({
  xPosition: e
}) => {
  const t = $(), n = rt(t);
  return /* @__PURE__ */ h("line", {
    style: n.line,
    x1: e,
    y1: 0,
    x2: e,
    y2: "95%",
    strokeWidth: 0.5
  });
}, le = (e, t, n, r) => e.map((a) => {
  const o = t(a);
  return /* @__PURE__ */ X("g", {
    children: [/* @__PURE__ */ h(yl, {
      xPosition: o
    }), /* @__PURE__ */ h("text", {
      style: n,
      x: o,
      y: r,
      children: new Date(a).toLocaleTimeString()
    })]
  }, a);
}), Ct = 24 * 60 * 60 * 1e3, vl = 2 * Ct, pl = 3 * Ct, Sa = Ct / 2, Cn = Sa / 2, hr = Cn / 2, Ca = Cn / 3, Da = Ca / 2, Oa = Da / 2, mr = Oa / 2, Rt = ({
  height: e,
  domain: t,
  timeScale: n,
  triples: r,
  doubles: a,
  ones: o,
  halves: i,
  quarters: u,
  eights: l
}) => {
  const s = $(), c = rt(s), f = t[0] - t[0] % hr, d = t[1];
  let g = [], y = [], b = [], v = [], T = [], O = [];
  for (let _ = f; _ < d; _ += hr)
    _ % pl === 0 ? g.push(_) : _ % vl === 0 ? y.push(_) : _ % Ct === 0 ? b.push(_) : _ % Sa === 0 ? v.push(_) : _ % Cn === 0 ? T.push(_) : O.push(_);
  const k = r ? le(g, n, c.label, e) : [], w = a ? le(y, n, c.label, e) : [], E = o ? le(b, n, c.label, e) : [], x = i ? le(v, n, c.label, e) : [], D = u ? le(T, n, c.label, e) : [], F = l ? le(O, n, c.label, e) : [];
  return /* @__PURE__ */ h("g", {
    children: [...k, ...w, ...E, ...x, ...D, ...F]
  });
}, st = ({
  height: e,
  domain: t,
  timeScale: n,
  ones: r,
  halves: a,
  quarters: o
}) => {
  const i = $(), u = rt(i), l = t[0] - t[0] % mr, s = t[1];
  let c = [], f = [], d = [], g = [];
  for (let O = l; O < s; O += mr)
    O % Ca === 0 ? c.push(O) : O % Da === 0 ? f.push(O) : O % Oa === 0 ? d.push(O) : g.push(O);
  const y = r ? le(c, n, u.label, e) : [], b = le(f, n, u.label, e), v = a ? le(d, n, u.label, e) : [], T = o ? le(g, n, u.label, e) : [];
  return /* @__PURE__ */ h("g", {
    children: [...y, ...b, ...v, ...T]
  });
}, gr = ({
  xPosition: e,
  height: t
}) => {
  const n = $(), r = rt(n);
  return /* @__PURE__ */ h("line", {
    style: r.line,
    x1: e,
    y1: 0,
    x2: e,
    y2: t || "90%",
    strokeWidth: 1
  });
}, lt = 1e4, Kt = 10, wl = () => ({
  line: {
    stroke: "#9e9e9e"
  }
}), rt = (e) => ({
  ...wl(),
  label: {
    fill: e.xAxis.labelColor,
    opacity: 0.5,
    fontFamily: e.base.fontFamily,
    fontSize: e.xAxis.hourLabelFontSize ? e.xAxis.hourLabelFontSize : Kt,
    fontWeight: e.xAxis.hourLabelFontWeight ? e.xAxis.hourLabelFontWeight : "bold",
    textAnchor: "middle",
    cursor: "default"
  }
}), yr = (e) => {
  const t = e.toLocaleTimeString(), n = e.getMonth() + 1, r = e.getDate();
  return `${n}/${r} ${t}`;
}, xl = ({
  height: e,
  domain: t,
  timeScale: n
}) => {
  const r = $(), a = rt(r);
  let o = t[0] + lt, i = t[1] - lt;
  t[0] === t[1] && (o -= lt * 10, i += lt * 10);
  const u = yr(new Date(o)), l = yr(new Date(i)), s = n(o), c = n(i), f = [/* @__PURE__ */ X("g", {
    children: [/* @__PURE__ */ h(gr, {
      xPosition: s
    }), /* @__PURE__ */ h("text", {
      style: a.label,
      x: s,
      y: e - 2 * Kt,
      children: u
    })]
  }, 1), /* @__PURE__ */ X("g", {
    children: [/* @__PURE__ */ h(gr, {
      xPosition: c
    }), /* @__PURE__ */ h("text", {
      style: a.label,
      x: c,
      y: e - 2 * Kt,
      children: l
    })]
  }, 2)];
  return /* @__PURE__ */ h("g", {
    children: f
  });
}, ka = () => ({
  stroke: $().grid.lineColor
}), bl = ({
  height: e,
  domain: t,
  smallerZoomScale: n,
  timeScale: r,
  ...a
}) => {
  if (dr)
    return dr({
      height: e,
      domain: t,
      smallerZoomScale: n,
      timeScale: r,
      ...a
    });
  switch (n) {
    case B.TEN_YEARS:
      return /* @__PURE__ */ h(Tt, {
        height: e,
        domain: t,
        timeScale: r,
        showDecadesOnly: !0
      });
    case B.ONE_YEAR:
      return /* @__PURE__ */ h(Tt, {
        height: e,
        domain: t,
        timeScale: r
      });
    case B.ONE_MONTH:
      return /* @__PURE__ */ h(tn, {
        height: e,
        domain: t,
        timeScale: r
      });
    default:
      return /* @__PURE__ */ h(tn, {
        height: e,
        domain: t,
        timeScale: r,
        showWeekStripes: !0
      });
  }
}, Ml = () => {
  var t, n;
  const e = $();
  return {
    fill: e.xAxis.labelColor,
    opacity: 0.5,
    fontFamily: e.base.fontFamilyCaption,
    fontWeight: (n = (t = e == null ? void 0 : e.xAxis) == null ? void 0 : t.yearLabelFontWeight) != null ? n : "bold",
    textAnchor: "middle",
    cursor: "default"
  };
}, Tt = ({
  height: e,
  domain: t,
  timeScale: n,
  showDecadesOnly: r = !1
}) => {
  const a = $().xAxis, o = Ml(), i = ka(), u = Gt, l = new Date(t[0]).getFullYear(), s = new Date(t[1]).getFullYear(), c = Ur(l - 1, s + 2).map((f) => {
    const d = new Date(f, 0, 1).valueOf(), g = n(d), y = n(d + u / 2), b = 2 * (y - g), v = a.yearLabelFontSize ? a.yearLabelFontSize : Math.max(b * 0.1, 14), T = f % 10 === 0;
    return /* @__PURE__ */ X("g", {
      children: [/* @__PURE__ */ h("line", {
        style: i,
        x1: g,
        y1: 0,
        x2: g,
        y2: e
      }), /* @__PURE__ */ h("text", {
        style: o,
        x: y,
        y: "90%",
        fontSize: v,
        writingMode: r ? "vertical-lr" : "horizontal-tb",
        children: r ? T ? f : "" : f
      })]
    }, f);
  });
  return /* @__PURE__ */ h("g", {
    children: c
  });
}, Tl = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], en = 18, Sl = () => {
  const e = $();
  return {
    fill: e.xAxis.labelColor,
    opacity: 0.5,
    fontFamily: e.base.fontFamilyCaption,
    fontSize: e.xAxis.monthLabelFontSize ? e.xAxis.monthLabelFontSize : en,
    fontWeight: "bold",
    textAnchor: "middle",
    cursor: "default"
  };
}, tn = ({
  height: e,
  domain: t,
  timeScale: n,
  showWeekStripes: r = !1
}) => {
  const a = Sl(), o = _r, u = fl().domain([new Date(t[0]), new Date(t[1])]).ticks(gl.every(1)), l = u.map((s, c) => {
    const f = s.valueOf(), d = s.getMonth(), g = s.getFullYear(), y = n(f), b = n(f + o / 2), v = n(so(f, 1)), T = c === u.length - 1;
    return /* @__PURE__ */ X("g", {
      children: [r && /* @__PURE__ */ h(Cl, {
        monthStart: f,
        timeScale: n
      }), /* @__PURE__ */ h(vr, {
        x: y,
        month: d
      }), /* @__PURE__ */ h("text", {
        style: a,
        x: b,
        y: e - 1.5 * en,
        children: Tl[d]
      }), /* @__PURE__ */ h("text", {
        style: a,
        x: b,
        y: e - 0.5 * en,
        children: g
      }), T && /* @__PURE__ */ h(vr, {
        x: v,
        month: d
      })]
    }, f);
  });
  return /* @__PURE__ */ h("g", {
    children: l
  });
}, vr = ({
  x: e,
  month: t
}) => {
  const n = ka();
  return /* @__PURE__ */ h("line", {
    style: n,
    x1: e,
    y1: 0,
    x2: e,
    y2: "100%",
    strokeWidth: t === 0 ? 2 : 1
  });
}, Cl = ({
  monthStart: e,
  timeScale: t
}) => {
  const n = $().grid, r = yo(e), a = Ur(1, 6).map((o) => {
    const i = fo(Un(e, o)), u = o;
    if (Ei(i, r) || ki(i, r)) {
      const l = t(i.valueOf()), s = vo(Un(e, o)), c = t(s.valueOf()) - l, d = Math.floor(i.valueOf() / Nr) % 2 === 0 ? n.weekStripesColor : "transparent", g = n.weekStripesOpacity;
      return /* @__PURE__ */ h("rect", {
        fill: d,
        opacity: g,
        x: l,
        y: 0,
        width: c,
        height: "100%"
      }, u);
    } else
      return /* @__PURE__ */ h("g", {}, u);
  });
  return /* @__PURE__ */ h("g", {
    children: a
  });
};
class Dl {
  constructor() {
    Ot(this, "canvas");
    Ot(this, "canvasContext");
    this.canvas = document.createElement("canvas"), this.canvasContext = this.canvas.getContext("2d");
  }
  getTextWidth(t, n, r = "Helvetica") {
    return this.canvasContext ? (this.canvasContext.font = `${n}px ${r}`, Math.floor(this.canvasContext.measureText(t).width)) : (console.error("Error calculating text string width. Canvas context not created."), 0);
  }
}
const pr = new Dl();
function Ol(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function wr(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function kl(e, t, n) {
  return t && wr(e.prototype, t), n && wr(e, n), e;
}
function El(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  });
}
function nn(e) {
  return nn = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, nn(e);
}
function Ul(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Nl(e, t) {
  return t && (typeof t == "object" || typeof t == "function") ? t : Ul(e);
}
var _l = function(t, n) {
  if (t.createSVGPoint) {
    var r = t.createSVGPoint();
    return r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
  }
  var a = t.getBoundingClientRect();
  return [n.clientX - a.left - t.clientLeft, n.clientY - a.top - t.clientTop];
}, Yl = /* @__PURE__ */ function(e) {
  El(t, e);
  function t() {
    var n;
    return Ol(this, t), n = Nl(this, nn(t).apply(this, arguments)), n.state = {
      type: "TooltipHidden"
    }, n.updateTooltip = function(r) {
      if (n.props) {
        var a = n.props.containerRef ? n.props.containerRef.current : n.safeMouseTrigger ? n.safeMouseTrigger.ownerSVGElement : void 0;
        if (a) {
          var o = _l(a, r);
          n.setState({
            type: "TooltipVisible",
            svgSvgElement: a,
            x: o[0],
            y: o[1]
          });
        }
      }
    }, n.hideTooltip = function() {
      n.setState({
        type: "TooltipHidden"
      });
    }, n;
  }
  return kl(t, [{
    key: "componentDidMount",
    value: function() {
      var r = this.props.triggerRef.current;
      r && r.addEventListener && (this.safeMouseTrigger = r, r.addEventListener("mouseover", this.updateTooltip), r.addEventListener("mousemove", this.updateTooltip), r.addEventListener("mouseleave", this.hideTooltip));
    }
  }, {
    key: "render",
    value: function() {
      if (this.state.type === "TooltipHidden")
        return kn("g", null);
      var r = this.state.x, a = this.state.y, o = kn("g", {
        className: "Tooltip",
        transform: "translate(".concat(r, ", ").concat(a, ")"),
        pointerEvents: "none"
      }, this.props.children instanceof Function ? this.props.children(r, a) : this.props.children);
      return Ia(o, this.state.svgSvgElement);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.safeMouseTrigger && this.safeMouseTrigger.removeEventListener && (this.safeMouseTrigger.removeEventListener("mouseover", this.updateTooltip), this.safeMouseTrigger.removeEventListener("mousemove", this.updateTooltip), this.safeMouseTrigger.removeEventListener("mouseleave", this.hideTooltip));
    }
  }]), t;
}(La);
const Fl = () => ({
  textAlign: "left"
}), Wl = () => {
  const e = $().tooltip;
  return {
    fill: e.backgroundColor,
    strokeWidth: 0,
    rx: e.rx ? e.rx : 3,
    ry: e.ry ? e.ry : 3
  };
}, Hl = () => {
  const e = $().tooltip;
  return {
    fill: "white",
    dominantBaseline: "middle",
    textAnchor: "middle",
    fontFamily: e.fontFamily,
    fontSize: e.fontSize
  };
}, Pl = {
  transform: "rotate(180deg)",
  transformOrigin: "50% 50%"
}, $l = ({
  type: e,
  y: t,
  parentWidth: n,
  text: r,
  triggerRef: a,
  tooltipArrow: o
}) => {
  const i = Fl(), u = Wl(), l = Hl(), s = $().tooltip.fontSize, {
    textLines: c,
    tooltipWidth: f,
    tooltipHeight: d,
    baseHeight: g
  } = Ll(r, s);
  return /* @__PURE__ */ h(Yl, {
    triggerRef: a,
    children: (y, b) => {
      const v = e === "period" ? 0 : e.singleEventX - y, T = 12, O = t - b - d - T, k = t - b - g - T, w = 15, E = yn().domain([0, n]).range([w, f - w]), x = 20, D = 10, F = d + x / 2 + D > t, _ = v - E(y), M = F ? O + d + g : O - x / 2, S = k + (F ? g : 0), Y = F ? {
        ...u,
        ...Pl
      } : u;
      return /* @__PURE__ */ X("g", {
        children: [/* @__PURE__ */ X("svg", {
          style: i,
          x: _,
          y: M,
          width: f,
          height: d,
          children: [/* @__PURE__ */ h("rect", {
            style: u,
            width: "100%",
            height: "100%"
          }), /* @__PURE__ */ h(Rl, {
            style: l,
            textLines: c,
            tooltipHeight: d,
            tooltipWidth: f
          })]
        }), o && /* @__PURE__ */ h(Al, {
          style: Y,
          tipX: v,
          baseY: S,
          dimension: x
        })]
      });
    }
  });
}, Al = ({
  tipX: e,
  baseY: t,
  dimension: n,
  style: r
}) => /* @__PURE__ */ h("svg", {
  x: e - n / 2,
  y: t + n / 2 + 5,
  viewBox: "0 0 10 10",
  width: n,
  height: n,
  children: /* @__PURE__ */ h("path", {
    style: r,
    d: "M0 2.5 l 5 5 5-5z"
  })
}), Ll = (e, t) => {
  const n = e || "", r = n.split(`
`), a = r.length, o = a > 1, i = 15, u = 5;
  let l;
  if (o) {
    let f = 0;
    r.forEach((d) => {
      const g = pr.getTextWidth(d, t);
      f = Math.max(g, f);
    }), l = f + i * 2;
  } else
    l = pr.getTextWidth(n, t) + i * 2;
  const s = 30, c = (o ? 20 * a : s) + u;
  return {
    textLines: r,
    tooltipWidth: l,
    tooltipHeight: c,
    baseHeight: s
  };
}, Rl = ({
  textLines: e,
  style: t,
  tooltipWidth: n,
  tooltipHeight: r
}) => /* @__PURE__ */ h("text", {
  style: t,
  width: n,
  height: r,
  children: e.map((a, o) => /* @__PURE__ */ h("tspan", {
    dy: "1.2em",
    x: "10",
    textAnchor: "start",
    children: a
  }, o))
}), Il = () => {
  const e = $().base;
  return {
    strokeWidth: 0,
    fill: e.backgroundColor
  };
}, ql = () => ({
  stroke: $().base.backgroundColor,
  strokeWidth: 2,
  fillOpacity: 0.5
}), zl = () => ({
  stroke: $().base.backgroundColor,
  strokeWidth: 2,
  fillOpacity: 0.5
}), Bl = () => {
  const e = $().event;
  return {
    stroke: e.markSelectedLineColor,
    strokeWidth: 2,
    fill: e.markSelectedFillColor
  };
}, Ea = (e) => {
  const t = $(), {
    events: n,
    height: r
  } = e, a = Il(), o = zl(), i = ql(), u = Bl(), {
    eventComponent: l,
    timeScale: s,
    y: c
  } = e, f = {
    ...e,
    eventMarkHeight: t.event.markHeight
  }, d = (w) => -(w.endTimeMillis ? w.endTimeMillis - w.startTimeMillis : 0), y = l || ((w, E) => E === "background" ? /* @__PURE__ */ h(ct, {
    e: w,
    style: a,
    ...f
  }) : w.isSelected ? /* @__PURE__ */ h(ct, {
    e: w,
    style: u,
    ...f
  }) : w.endTimeMillis ? /* @__PURE__ */ h(ct, {
    e: w,
    style: o,
    ...f
  }) : /* @__PURE__ */ h(ct, {
    e: w,
    style: i,
    ...f
  })), b = JSON.stringify({
    domain: s.domain(),
    range: s.range()
  }), v = JSON.stringify(n, (w, E) => {
    if (!(w === "isSelected" || w === "isPinned"))
      return E;
  }), T = Se(
    () => n.map((w) => /* @__PURE__ */ h(It, {
      event: w,
      ...e,
      children: y(w, "background", s, c)
    }, w.eventId)),
    [v, b, r, t]
  ), O = Se(
    () => n.filter((w) => !0).sort(d).map((w) => /* @__PURE__ */ h(It, {
      event: w,
      ...e,
      children: y(w, "foreground", s, c)
    }, w.eventId)),
    [v, b, r, t]
  ), k = Se(
    () => n.filter((w) => w.isSelected || w.isPinned).sort(d).map((w) => /* @__PURE__ */ h(It, {
      event: w,
      ...e,
      children: y(w, "foreground", s, c)
    }, w.eventId)),
    [n, b, r, t]
  );
  return /* @__PURE__ */ X("g", {
    children: [T, O, k]
  });
}, It = ({
  event: e,
  y: t,
  timeScale: n,
  onEventClick: r = Fe,
  onEventHover: a = Fe,
  onEventUnhover: o = Fe,
  children: i,
  tooltipArrow: u
}) => {
  const l = e.eventId, s = () => a(l), c = () => o(l), f = () => r(l), d = n(e.startTimeMillis), g = n.range()[1], y = e.endTimeMillis ? "period" : {
    singleEventX: d
  }, b = Sr(null);
  return /* @__PURE__ */ X("g", {
    pointerEvents: "bounding-box",
    cursor: e.URLlink ? "pointer" : "default",
    onMouseEnter: s,
    onMouseLeave: c,
    onClick: f,
    children: [e.URLlink ? /* @__PURE__ */ h("a", {
      href: e.URLlink,
      target: "_blank",
      rel: "noreferrer noopener",
      children: /* @__PURE__ */ h("g", {
        ref: b,
        children: i
      })
    }) : /* @__PURE__ */ h("g", {
      ref: b,
      children: i
    }), e.tooltip ? /* @__PURE__ */ h($l, {
      type: y,
      y: t,
      parentWidth: g,
      triggerRef: b,
      text: e.tooltip,
      tooltipArrow: u
    }) : /* @__PURE__ */ h("g", {})]
  });
}, ct = ({
  e,
  eventMarkHeight: t,
  style: n,
  y: r,
  timeScale: a
}) => {
  var l, s;
  const o = $(), i = a(e.startTimeMillis), u = e.isPinned ? {
    stroke: o.event.markPinnedLineColor
  } : {};
  if (e.endTimeMillis === void 0)
    return /* @__PURE__ */ h("circle", {
      style: {
        ...n,
        ...u
      },
      cx: i,
      cy: r,
      r: t / 2,
      fill: (l = e.color) != null ? l : o.event.markFillColor
    });
  {
    const f = a(e.endTimeMillis) - i;
    return /* @__PURE__ */ h("rect", {
      style: {
        ...n,
        ...u
      },
      x: i,
      y: r - t / 2,
      width: f,
      height: t,
      fill: (s = e.color) != null ? s : o.event.markFillColor
    }, e.eventId);
  }
}, Xl = ({
  height: e,
  events: t,
  lanes: n,
  timeScale: r,
  yScale: a,
  eventComponent: o,
  onEventHover: i,
  onEventUnhover: u,
  onEventClick: l,
  tooltipArrow: s
}) => {
  const c = n.map((f) => {
    const d = t.filter((g) => g.laneId === f.laneId);
    return /* @__PURE__ */ h("g", {
      children: /* @__PURE__ */ h(Ea, {
        height: e,
        events: d,
        timeScale: r,
        y: a(f.laneId),
        eventComponent: o,
        onEventHover: i,
        onEventUnhover: u,
        onEventClick: l,
        tooltipArrow: s
      })
    }, `marks-${f.laneId}`);
  });
  return /* @__PURE__ */ h("g", {
    children: c
  });
}, qt = {
  x: NaN,
  y: NaN
}, jl = ({
  width: e,
  height: t,
  children: n
}) => {
  const r = Sr(null), [a, o] = pe(qt), i = (s) => {
    const c = r.current.getScreenCTM();
    return c ? {
      x: (s.clientX - c.e) / c.a,
      y: (s.clientY - c.f) / c.d
    } : qt;
  }, u = (s) => o(i(s)), l = () => o(qt);
  return /* @__PURE__ */ X("svg", {
    viewBox: `0 0 ${e} ${t}`,
    width: e,
    height: t,
    ref: r,
    style: {
      overflow: "visible",
      outline: "none"
    },
    onMouseEnter: u,
    onMouseMove: u,
    onMouseLeave: l,
    children: [/* @__PURE__ */ h("rect", {
      width: e,
      height: t,
      pointerEvents: "all",
      fill: "transparent",
      style: {
        outline: "none"
      }
    }), n(a)]
  });
}, Vl = (e) => {
  const t = $();
  return {
    fill: e != null ? e : t.mouseCursor.labelColor,
    textAnchor: "middle",
    dominantBaseline: "middle",
    fontFamily: t.base.fontFamilyCaption,
    cursor: "default"
  };
}, Ua = ({
  x: e,
  y: t,
  overline: n,
  label: r,
  cursor: a,
  fill: o
}) => {
  const i = Vl(o);
  return /* @__PURE__ */ X("text", {
    style: i,
    x: e,
    y: t,
    cursor: a,
    children: [/* @__PURE__ */ h("tspan", {
      x: e,
      cursor: a,
      children: n
    }), /* @__PURE__ */ h("tspan", {
      x: e,
      dy: 18,
      cursor: a,
      children: r
    })]
  });
};
var C = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.AnimationInProgress = 1] = "AnimationInProgress", e[e.Hover = 2] = "Hover", e[e.Zoom = 3] = "Zoom", e[e.Grab = 4] = "Grab", e[e.Pan = 5] = "Pan", e[e.RubberBand = 6] = "RubberBand", e[e.Trim = 7] = "Trim", e))(C || {});
const xr = { type: 0 }, ft = { type: 2 }, Gl = {
  type: 1
}, Zl = [
  2,
  3,
  5,
  6,
  7
], Dn = () => {
  const e = $().mouseCursor;
  return {
    stroke: e.lineColor,
    strokeWidth: e.lineWidth
  };
}, Na = () => {
  const e = $().mouseCursor;
  return {
    fill: e.zoomRangeColor,
    opacity: e.zoomRangeOpacity
  };
}, Ql = ({
  mousePosition: e,
  cursorLabel: t,
  cursor: n,
  interactionMode: r,
  zoomRangeStart: a,
  zoomRangeEnd: o,
  zoomScale: i,
  isZoomInPossible: u,
  enabledInteractions: l
}) => isNaN(e) ? /* @__PURE__ */ h("g", {}) : /* @__PURE__ */ X("g", {
  children: [/* @__PURE__ */ h("rect", {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%",
    fill: "transparent"
  }), (() => {
    switch (r.type) {
      case C.None:
      case C.AnimationInProgress:
        return /* @__PURE__ */ h("g", {});
      case C.Pan:
        return /* @__PURE__ */ h(Kl, {
          mousePosition: e
        });
      case C.RubberBand: {
        const [c, f] = r.variant === "anchored" ? [r.anchorX, void 0] : [r.anchorX, r.currentX];
        return /* @__PURE__ */ h(ec, {
          start: c,
          end: f
        });
      }
      default:
        return /* @__PURE__ */ h(Jl, {
          mousePosition: e,
          cursor: n,
          cursorLabel: t,
          zoomScale: i,
          isZoomInPossible: u && l.includes(C.Zoom),
          zoomRangeStart: a,
          zoomRangeEnd: o
        });
    }
  })()]
}), Jl = ({
  mousePosition: e,
  cursor: t,
  cursorLabel: n,
  zoomScale: r,
  isZoomInPossible: a,
  zoomRangeStart: o,
  zoomRangeEnd: i
}) => {
  const u = Dn(), l = Na();
  return /* @__PURE__ */ X("g", {
    children: [/* @__PURE__ */ h("rect", {
      visibility: a ? "visible" : "hidden",
      style: l,
      x: o,
      y: 0,
      width: i - o,
      height: "100%",
      cursor: t
    }), /* @__PURE__ */ h("line", {
      style: u,
      x1: e,
      y1: "0%",
      x2: e,
      y2: "5%",
      cursor: t
    }), /* @__PURE__ */ h(Ua, {
      x: e,
      y: a ? "11%" : "15%",
      cursor: t,
      overline: n,
      label: a ? r : ""
    }), /* @__PURE__ */ h("line", {
      style: u,
      x1: e,
      y1: "23%",
      x2: e,
      y2: "100%",
      cursor: t
    })]
  });
}, Kl = ({
  mousePosition: e
}) => {
  const t = Dn();
  return /* @__PURE__ */ h("g", {
    children: /* @__PURE__ */ h("line", {
      style: t,
      x1: e,
      y1: "0%",
      x2: e,
      y2: "100%",
      cursor: "grab"
    })
  });
}, ec = ({
  start: e,
  end: t
}) => {
  const n = Dn(), r = Na(), [a, o] = ["0%", "100%"];
  return /* @__PURE__ */ X("g", {
    children: [/* @__PURE__ */ h("line", {
      style: n,
      x1: e,
      y1: a,
      x2: e,
      y2: o
    }), t && /* @__PURE__ */ X("g", {
      children: [/* @__PURE__ */ h("line", {
        style: n,
        x1: t,
        y1: a,
        x2: t,
        y2: o
      }), /* @__PURE__ */ h("rect", {
        style: r,
        x: Math.min(e, t),
        y: a,
        width: Math.abs(t - e),
        height: o
      })]
    })]
  });
}, tc = ({
  domain: e,
  maxDomainStart: t,
  maxDomainEnd: n,
  zoomLevels: r,
  isDomainChangePossible: a,
  timeScale: o,
  onDomainChange: i,
  onCursorMove: u
}) => {
  const { currentZoomScale: l, nextSmallerZoomScale: s, nextBiggerZoomScale: c } = Fr(e, r), f = ge(s), d = e[1] - e[0], g = n - t, y = s !== "minimum", b = d < g, v = ae((D) => i(D, !0), [i]), T = ae(
    (D) => (F) => {
      if (a) {
        const _ = ge(D);
        v(
          Yr(t, n, F != null ? F : (e[0] + e[1]) / 2, _)
        );
      }
    },
    [a, t, n, v, e]
  ), O = ae(
    (D) => T(s)(D),
    [s, T]
  ), k = ae(
    (D) => T(c)(D),
    [c, T]
  ), w = ae(
    (D, F) => {
      if (a) {
        const _ = o.invert(D), M = o.invert(F);
        v([_, M]);
      }
    },
    [a, v, o]
  ), E = ae(
    (D, F) => {
      if (a && u) {
        const _ = o.invert(D), M = o.invert(F);
        u(M, _, M);
      }
    },
    [a, u, o]
  ), x = ae(() => {
    a && v([t, n]);
  }, [a, v, t, n]);
  return {
    currentZoomScale: l,
    zoomWidth: f,
    nextSmallerZoomScale: s,
    nextBiggerZoomScale: c,
    isZoomInPossible: y,
    isZoomOutPossible: b,
    onZoomIn: O,
    onZoomOut: k,
    onZoomReset: x,
    onZoomInCustom: w,
    onZoomInCustomInProgress: E
  };
}, nc = ({
  width: e,
  height: t,
  mousePosition: n,
  enabledInteractions: r = [C.Hover, C.Zoom, C.Pan, C.RubberBand, C.Trim],
  isAnimationInProgress: a,
  isZoomInPossible: o,
  isZoomOutPossible: i,
  isTrimming: u,
  onHover: l,
  onZoomIn: s,
  onZoomOut: c,
  onZoomInCustom: f,
  onZoomInCustomInProgress: d,
  onZoomReset: g,
  onTrimStart: y,
  onTrimEnd: b,
  onPan: v,
  onInteractionModeChange: T,
  onInteractionEnd: O,
  children: k
}) => {
  const [w, E] = pe("default"), [x, D] = pe(!1), [F, _] = pe(!1), [M, S] = pe(xr), Y = ae((W) => {
    S((H) => {
      let te = typeof W != "function" ? W : W(H);
      return Zl.includes(te.type) ? r.includes(te.type) ? te : H : te.type === C.Grab && !r.includes(C.Zoom) && !r.includes(C.Pan) ? H : te;
    });
  }, [r, S]);
  se(() => {
    if (a)
      return Y(Gl), () => {
        Y(ft);
      };
  }, [Y, a]), se(() => {
    const W = (H) => {
      D(H.altKey), _(H.shiftKey), H.key === "Escape" && g();
    };
    return window.addEventListener("keydown", W), window.addEventListener("keyup", W), () => {
      window.removeEventListener("keydown", W), window.removeEventListener("keyup", W);
    };
  }, [D, _, g]), se(() => {
    if (u && !a)
      return Y({
        type: C.Trim,
        variant: "none"
      }), () => {
        Y(ft);
      };
  }, [u, a, Y]), se(() => {
    M.type === C.AnimationInProgress ? E("default") : F && r.includes(C.RubberBand) || M.type === C.RubberBand ? E("ew-resize") : M.type === C.Pan ? E("grab") : M.type === C.Trim ? M.variant !== "none" ? E("ew-resize") : E("default") : r.includes(C.Zoom) ? E(x ? (() => i ? "zoom-out" : "default")() : (() => o ? "zoom-in" : "default")()) : E("default");
  }, [x, F, o, i, M, r]), se(() => {
    T && T(M);
  }, [T, M]), se(() => {
    M.type === C.None && O && O();
  }, [O, M]);
  const R = (W, H) => [Math.min(W, H), Math.max(W, H)];
  return /* @__PURE__ */ X(un, {
    children: [/* @__PURE__ */ h("defs", {
      children: /* @__PURE__ */ h("clipPath", {
        id: "clipPath",
        children: /* @__PURE__ */ h("rect", {
          x: "0",
          y: "0",
          width: e,
          height: t
        })
      })
    }), /* @__PURE__ */ h("g", {
      clipPath: "url(#clipPath)",
      pointerEvents: "bounding-box",
      cursor: w,
      onMouseDown: () => {
        const W = {
          variant: "anchored",
          anchorX: n.x
        };
        M.type === C.Trim ? F ? (y(n.x), Y({
          type: C.Trim,
          variant: "trim pan end"
        })) : M.variant === "trim hover start" ? Y({
          type: C.Trim,
          variant: "trim start"
        }) : M.variant === "trim hover end" && Y({
          type: C.Trim,
          variant: "trim end"
        }) : F && r.includes(C.RubberBand) ? (Y({
          type: C.RubberBand,
          ...W
        }), d(...R(W.anchorX, W.anchorX))) : Y({
          type: C.Grab,
          ...W
        });
      },
      onMouseMove: (W) => {
        if (M.type === C.Grab && Math.abs(M.anchorX - n.x) > 2 && Y((H) => ({
          ...H,
          type: C.Pan
        })), M.type === C.Pan && v(-W.movementX), M.type === C.RubberBand) {
          const H = {
            ...M,
            variant: "in progress",
            currentX: n.x
          };
          Y(H), d(...R(H.anchorX, H.currentX));
        }
        M.type === C.Trim && (M.variant === "trim start" ? y(n.x) : (M.variant === "trim end" || M.variant === "trim pan end") && b(n.x)), M.type === C.Hover && l(n.x);
      },
      onMouseUp: (W) => {
        const H = W.button === 0 && M.type === C.Grab;
        M.type === C.RubberBand ? f(...R(M.anchorX, n.x)) : H && r.includes(C.Zoom) && (W.altKey ? c() : o ? s() : Fe()), M.type === C.Trim ? Y({
          type: C.Trim,
          variant: "none"
        }) : Y(ft);
      },
      onMouseEnter: () => {
        M.type === C.None && Y(ft);
      },
      onMouseLeave: () => {
        (M.type === C.Hover || M.type === C.Pan) && Y(xr);
      },
      children: k(w, M, r, (W) => Y((H) => H.type === C.Trim && H.variant !== "trim start" && H.variant !== "trim end" && H.variant !== "trim pan end" ? {
        type: C.Trim,
        ...W
      } : H))
    })]
  });
};
function rc(e, t, n, r) {
  const a = ae((i) => {
    n && n(t.invert(i), r ? r[1] : e[1]);
  }, [r, e, n, t]), o = ae((i) => {
    n && n(r ? r[0] : e[0], t.invert(i));
  }, [r, e, n, t]);
  return se(() => {
    if (n && r) {
      const [i, u] = [Hn(r[0], e[0], r[1]), Hn(r[1], r[0], e[1])];
      (i !== r[0] || u !== r[1]) && n(i, u);
    }
  }, [e, r, n]), [a, o];
}
const ac = () => {
  const e = $().trimmer;
  return {
    fill: e.trimRangeOutsideColor,
    opacity: e.trimRangeOutsideOpacity
  };
};
function oc({
  startX: e,
  endX: t,
  height: n,
  width: r
}) {
  const a = ac(), [o, i] = [0, n];
  return /* @__PURE__ */ X("g", {
    children: [e > 0 && /* @__PURE__ */ h("rect", {
      style: a,
      x: 0,
      y: o,
      width: e,
      height: i
    }), r - t > 0 && /* @__PURE__ */ h("rect", {
      style: a,
      x: t,
      y: o,
      width: r - t,
      height: i
    })]
  });
}
const ic = () => {
  const e = $().trimmer;
  return {
    stroke: e.trimHandleColor,
    strokeWidth: e.trimHandleWidth
  };
};
function br({
  x: e,
  label: t,
  dateString: n,
  height: r,
  onMouseEnter: a,
  onMouseLeave: o
}) {
  const i = $().trimmer, u = ic();
  return /* @__PURE__ */ X(un, {
    children: [/* @__PURE__ */ h("line", {
      style: u,
      pointerEvents: "visibleStroke",
      x1: e,
      y1: 0,
      x2: e,
      y2: "5%",
      onMouseEnter: a,
      onMouseLeave: o
    }), /* @__PURE__ */ h(Ua, {
      x: e,
      y: "11%",
      cursor: "default",
      overline: t,
      label: n,
      fill: i.trimHandleLabelColor
    }), /* @__PURE__ */ h("line", {
      style: u,
      x1: e,
      y1: "23%",
      x2: e,
      y2: r,
      onMouseEnter: a,
      onMouseLeave: o,
      pointerEvents: "visibleStroke"
    })]
  });
}
var rn = /* @__PURE__ */ ((e) => (e[e.Up = 0] = "Up", e[e.Down = 1] = "Down", e[e.Left = 2] = "Left", e[e.Right = 3] = "Right", e))(rn || {});
function Mr({
  style: e,
  x: t,
  y: n,
  dimension: r,
  direction: a
}) {
  let o;
  switch (a) {
    case 2:
      o = "M7.5 0 l -5 5 5 5z";
      break;
    case 3:
      o = "M2.5 0 l 5 5 -5 5z";
      break;
    case 0:
      o = "M0 7.5 l 5 -5 5 5z";
      break;
    case 1:
    default:
      o = "M0 2.5 l 5 5 5-5z";
  }
  return /* @__PURE__ */ h("svg", {
    x: t - r / 2,
    y: n - r / 2,
    viewBox: "0 0 10 10",
    width: r,
    height: r,
    children: /* @__PURE__ */ h("path", {
      style: e,
      d: o
    })
  });
}
const uc = () => {
  const e = $().trimmer;
  return {
    fill: e.trimRangeInsideColor,
    opacity: e.trimRangeInsideOpacity
  };
}, sc = () => {
  const e = $().trimmer;
  return {
    fill: e.trimRangeInsideHighlightColor,
    opacity: e.trimRangeInsideHighlightOpacity
  };
}, lc = () => ({
  fill: $().trimmer.trimTriangleColor
});
function cc({
  startX: e,
  endX: t,
  timeScale: n,
  height: r,
  width: a,
  highlightActiveArea: o,
  setTrimMode: i,
  dateFormat: u
}) {
  const l = uc(), s = sc(), c = lc(), [f, d] = [0, r], [g, y] = [n(e), n(t)];
  return /* @__PURE__ */ X("g", {
    children: [/* @__PURE__ */ h("rect", {
      style: o ? s : l,
      x: Math.min(g, y),
      y: f,
      width: Math.abs(y - g),
      height: d
    }), g > 0 ? /* @__PURE__ */ h(br, {
      x: g,
      dateString: u(e),
      label: "Date from",
      height: r,
      onMouseEnter: () => i({
        variant: "trim hover start"
      }),
      onMouseLeave: () => i({
        variant: "none"
      })
    }) : /* @__PURE__ */ h(Mr, {
      style: c,
      x: 25,
      y: r / 2,
      dimension: 50,
      direction: rn.Left
    }), a - y > 0 ? /* @__PURE__ */ h(br, {
      x: y,
      dateString: u(t),
      label: "Date to",
      height: r,
      onMouseEnter: () => i({
        variant: "trim hover end"
      }),
      onMouseLeave: () => i({
        variant: "none"
      })
    }) : /* @__PURE__ */ h(Mr, {
      style: c,
      x: a - 25,
      y: r / 2,
      dimension: 50,
      direction: rn.Right
    })]
  });
}
const fc = ({
  width: e,
  height: t,
  domain: n,
  maxDomain: r,
  maxDomainStart: a,
  maxDomainEnd: o,
  isDomainChangePossible: i,
  timeScale: u,
  zoomLevels: l,
  isTrimming: s,
  trimRange: c,
  isAnimationInProgress: f,
  isNoEventSelected: d,
  enabledInteractions: g,
  onDomainChange: y,
  dateFormat: b,
  onCursorMove: v,
  onTrimRangeChange: T,
  onInteractionEnd: O
}) => {
  const {
    zoomWidth: k,
    nextSmallerZoomScale: w,
    isZoomInPossible: E,
    isZoomOutPossible: x,
    onZoomIn: D,
    onZoomOut: F,
    onZoomReset: _,
    onZoomInCustom: M,
    onZoomInCustomInProgress: S
  } = tc({
    domain: n,
    maxDomainStart: a,
    maxDomainEnd: o,
    zoomLevels: l,
    isDomainChangePossible: i,
    timeScale: u,
    onDomainChange: y,
    onCursorMove: v
  }), [Y, R] = rc(r, u, T, c);
  return /* @__PURE__ */ h(jl, {
    width: e,
    height: t,
    children: (G) => {
      const A = u.invert(G.x);
      return /* @__PURE__ */ h(nc, {
        width: e,
        height: t,
        mousePosition: G,
        enabledInteractions: g,
        isAnimationInProgress: f,
        isZoomInPossible: E,
        isZoomOutPossible: x,
        isTrimming: s,
        onHover: () => {
          v && v(A, ...Yr(a, o, A, k));
        },
        onZoomIn: () => {
          D(A);
        },
        onZoomOut: () => {
          F(A);
        },
        onZoomInCustom: M,
        onZoomInCustomInProgress: S,
        onZoomReset: _,
        onPan: (K) => {
          if (i) {
            const [q, W] = n, [H, te] = u.range(), xe = K / (te - H) * (W - q), [Ue, Ne] = [q + xe, W + xe];
            Ue > a && Ne < o && y([Ue, Ne], !1);
          }
        },
        onTrimStart: Y,
        onTrimEnd: R,
        onInteractionEnd: O,
        children: (K, q, W, H) => /* @__PURE__ */ X("g", {
          children: [d && q.type !== C.Trim ? /* @__PURE__ */ h(Ql, {
            mousePosition: G.x,
            cursorLabel: b(A),
            cursor: K,
            interactionMode: q,
            zoomRangeStart: u(A - k / 2),
            zoomRangeEnd: u(A + k / 2),
            zoomScale: w,
            isZoomInPossible: E,
            enabledInteractions: W
          }) : /* @__PURE__ */ h("g", {}), c && /* @__PURE__ */ h(oc, {
            startX: u(c[0]),
            endX: u(c[1]),
            height: t,
            width: e
          }), q.type === C.Trim && u && /* @__PURE__ */ h(cc, {
            startX: c ? c[0] : r[0],
            endX: c ? c[1] : r[1],
            height: t,
            width: e,
            timeScale: u,
            setTrimMode: H,
            dateFormat: b,
            highlightActiveArea: q.variant === "trim pan end"
          })]
        })
      });
    }
  });
}, dc = ({
  height: e,
  events: t,
  timeScale: n,
  eventComponent: r,
  onEventHover: a,
  onEventUnhover: o,
  onEventClick: i,
  tooltipArrow: u
}) => {
  const l = e / 2;
  return /* @__PURE__ */ h("g", {
    children: /* @__PURE__ */ h(Ea, {
      height: e,
      events: t,
      timeScale: n,
      y: l,
      eventComponent: r,
      onEventHover: a,
      onEventUnhover: o,
      onEventClick: i,
      tooltipArrow: u
    })
  });
}, hc = () => ({
  stroke: $().base.backgroundColor,
  strokeWidth: 2,
  fillOpacity: 0.5
}), mc = ({
  eventClusters: e,
  timeScale: t,
  yScale: n,
  expanded: r,
  height: a
}) => {
  const o = $(), i = hc(), [u, l] = Ga(e.map((d) => d.size)), s = o.event.markHeight / 2, c = r ? n.bandwidth() / 1.2 : Math.min(a / 2, 2 * o.event.markHeight), f = Nu().domain([u != null ? u : 0, l != null ? l : 0]).range([s, c]);
  return /* @__PURE__ */ h("g", {
    children: e.map((d) => /* @__PURE__ */ h("g", {
      children: /* @__PURE__ */ h("circle", {
        style: i,
        cx: t(d.timeMillis),
        cy: r ? n(d.laneId) : a / 2,
        r: f(d.size),
        fill: d.color || o.event.clusterFillColor
      })
    }, `eventCluster-${d.laneId}-${d.timeMillis}`))
  });
}, _a = ({
  y: e
}) => {
  const t = $();
  return /* @__PURE__ */ h("line", {
    x1: 0,
    y1: e,
    x2: "100%",
    y2: e,
    style: {
      stroke: t.lane.middleLineColor,
      strokeWidth: t.lane.middleLineWidth
    }
  });
}, gc = ({
  lanes: e,
  yScale: t
}) => {
  const n = $(), r = 0.8 * t.bandwidth();
  return /* @__PURE__ */ h(un, {
    children: e.map((a) => {
      const i = -0.5 * t.bandwidth(), u = t(a.laneId);
      return /* @__PURE__ */ X("g", {
        children: [/* @__PURE__ */ h(_a, {
          y: u
        }), /* @__PURE__ */ h("text", {
          style: {
            fontSize: n.lane.labelFontSize,
            fontFamily: n.base.fontFamily,
            fontWeight: 600,
            opacity: 0.4
          },
          fontSize: r,
          x: 10,
          y: u + i,
          fill: a.color || n.lane.labelColor,
          children: a.label
        })]
      }, `axis-${a.laneId}`);
    })
  });
};
var Ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ya = {}, an = Ae && Ae.__assign || function() {
  return an = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, an.apply(this, arguments);
}, yc = Ae && Ae.__read || function(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n)
    return e;
  var r = n.call(e), a, o = [], i;
  try {
    for (; (t === void 0 || t-- > 0) && !(a = r.next()).done; )
      o.push(a.value);
  } catch (u) {
    i = { error: u };
  } finally {
    try {
      a && !a.done && (n = r.return) && n.call(r);
    } finally {
      if (i)
        throw i.error;
    }
  }
  return o;
}, vc = Ae && Ae.__spreadArray || function(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, a = t.length, o; r < a; r++)
      (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return e.concat(o || Array.prototype.slice.call(t));
};
Object.defineProperty(Ya, "__esModule", { value: !0 });
var Tr = function(e) {
  if (typeof e == "object" && e !== null) {
    if (typeof Object.getPrototypeOf == "function") {
      var t = Object.getPrototypeOf(e);
      return t === Object.prototype || t === null;
    }
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  return !1;
}, we = function() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return e.reduce(function(n, r) {
    if (Array.isArray(r))
      throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
    return Object.keys(r).forEach(function(a) {
      ["__proto__", "constructor", "prototype"].includes(a) || (Array.isArray(n[a]) && Array.isArray(r[a]) ? n[a] = we.options.mergeArrays ? Array.from(new Set(n[a].concat(r[a]))) : r[a] : Tr(n[a]) && Tr(r[a]) ? n[a] = we(n[a], r[a]) : n[a] = r[a]);
    }), n;
  }, {});
}, Fa = {
  mergeArrays: !0
};
we.options = Fa;
we.withOptions = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  we.options = an({ mergeArrays: !0 }, e);
  var r = we.apply(void 0, vc([], yc(t), !1));
  return we.options = Fa, r;
};
var pc = Ya.default = we;
const Me = "#ffab40", wc = "#aaaaaa", on = "#9e9e9e", xc = "#eeeeee", zt = 0.1, bc = {
  palette: {
    primary: {
      main: "#1976d2"
    },
    background: {
      paper: "#fff"
    },
    text: {
      secondary: on
    }
  },
  typography: {
    fontFamily: "sans-serif",
    caption: {}
  }
}, Mc = (e) => Tc("light", bc, e), Tc = (e, t, n) => {
  const r = {
    base: {
      backgroundColor: t.palette.background.paper,
      fontFamily: t.typography.fontFamily,
      fontFamilyCaption: t.typography.caption.fontFamily
    },
    event: {
      markHeight: 20,
      markFillColor: t.palette.primary.main,
      markSelectedLineColor: "#ffff8d",
      markSelectedFillColor: "rgba(255, 255, 141, 0.5)",
      markPinnedLineColor: e === "dark" ? "white" : "black",
      clusterFillColor: t.palette.primary.main
    },
    xAxis: {
      labelColor: t.palette.text.secondary
    },
    grid: {
      lineColor: on,
      weekStripesColor: xc,
      weekStripesOpacity: e === "light" ? 1 : 0.1
    },
    lane: {
      labelFontSize: 16,
      labelColor: t.palette.primary.main,
      middleLineColor: on,
      middleLineWidth: 1
    },
    tooltip: {
      backgroundColor: t.palette.text.secondary,
      fontSize: 14,
      fontFamily: t.typography.caption.fontFamily
    },
    trimmer: {
      trimHandleColor: Me,
      trimHandleLabelColor: Me,
      trimHandleWidth: 10,
      trimTriangleColor: Me,
      trimRangeInsideColor: "transparent",
      trimRangeInsideOpacity: 0,
      trimRangeInsideHighlightColor: Me,
      trimRangeInsideHighlightOpacity: zt,
      trimRangeOutsideColor: wc,
      trimRangeOutsideOpacity: zt
    },
    mouseCursor: {
      lineColor: Me,
      lineWidth: 2,
      zoomRangeColor: Me,
      zoomRangeOpacity: zt,
      labelColor: Me
    }
  };
  return n ? pc(r, n) : r;
}, kc = ({
  width: e,
  height: t,
  events: n,
  lanes: r,
  dateFormat: a,
  eventComponent: o,
  laneDisplayMode: i = "expanded",
  suppressMarkAnimation: u = !1,
  enableEventClustering: l = !1,
  customRange: s,
  zoomLevels: c = Pi,
  isTrimming: f = !1,
  trimRange: d,
  layers: g = ["grid", "axes", "interaction", "marks"],
  theme: y = Mc(),
  enabledInteractions: b,
  onEventHover: v = Fe,
  onEventUnhover: T = Fe,
  onEventClick: O,
  onZoomRangeChange: k,
  onCursorMove: w,
  onTrimRangeChange: E,
  onInteractionEnd: x,
  weekStripes: D,
  animationDuration: F = 1e3,
  tooltipArrow: _ = !0
}) => {
  const {
    domain: M,
    setDomain: S,
    maxDomain: Y,
    maxDomainStart: R,
    maxDomainEnd: G,
    currentZoomScale: A,
    nextSmallerZoomScale: j,
    timeScale: V,
    yScale: K
  } = hl({
    width: e,
    height: t,
    events: n,
    lanes: r,
    zoomLevels: c,
    customRange: s,
    onZoomRangeChange: k
  }), {
    isAnimationInProgress: q,
    setAnimation: W,
    animation: H
  } = ml({
    maxDomainStart: R,
    maxDomainEnd: G,
    setDomain: S,
    animationDuration: F
  }), {
    eventsInsideDomain: te,
    eventClustersInsideDomain: xe,
    isNoEventSelected: Ue,
    isMouseOverEvent: Ne,
    onEventHoverDecorated: at,
    onEventUnhoverDecorated: ot
  } = Ri(n, H !== "none" ? H.fromDomain : M, A, i === "expanded", l, v, T), Dt = u ? !q : !0, p = ae((U, m) => {
    m ? W({
      startMs: Date.now(),
      fromDomain: M,
      toDomain: U
    }) : S(U);
  }, [M, W, S]), N = {
    grid: /* @__PURE__ */ h(bl, {
      height: t,
      domain: M,
      smallerZoomScale: j,
      timeScale: V,
      weekStripes: D
    }, "grid"),
    axes: i === "expanded" ? /* @__PURE__ */ h(gc, {
      lanes: r,
      yScale: K
    }, "axes") : /* @__PURE__ */ h(_a, {
      y: t / 2
    }, "axis"),
    interaction: /* @__PURE__ */ h(fc, {
      width: e,
      height: t,
      domain: M,
      maxDomain: Y,
      maxDomainStart: R,
      maxDomainEnd: G,
      isDomainChangePossible: !q && !Ne,
      timeScale: V,
      zoomLevels: c,
      isTrimming: f,
      trimRange: d,
      isAnimationInProgress: q,
      isNoEventSelected: Ue,
      enabledInteractions: b,
      onDomainChange: p,
      dateFormat: a,
      onCursorMove: w,
      onInteractionEnd: x,
      onTrimRangeChange: E
    }, "interaction"),
    marks: Dt && /* @__PURE__ */ X("g", {
      children: [/* @__PURE__ */ h(mc, {
        height: t,
        eventClusters: xe,
        timeScale: V,
        yScale: K,
        expanded: i === "expanded"
      }), i === "expanded" ? /* @__PURE__ */ h(Xl, {
        events: te,
        lanes: r,
        timeScale: V,
        yScale: K,
        height: t,
        eventComponent: o,
        onEventHover: at,
        onEventUnhover: ot,
        onEventClick: O,
        tooltipArrow: _
      }) : /* @__PURE__ */ h(dc, {
        events: te,
        timeScale: V,
        height: t,
        eventComponent: o,
        onEventHover: at,
        onEventUnhover: ot,
        onEventClick: O,
        tooltipArrow: _
      })]
    }, "marks")
  };
  return /* @__PURE__ */ h(qa, {
    theme: y,
    children: /* @__PURE__ */ h("svg", {
      viewBox: `0 0 ${e} ${t}`,
      width: e,
      height: t,
      children: g.map((U, m) => typeof U != "function" ? N[U] : /* @__PURE__ */ h(Ra, {
        children: U({
          width: e,
          height: t,
          domain: M,
          maxDomain: Y,
          maxDomainStart: R,
          maxDomainEnd: G,
          currentZoomScale: A,
          nextSmallerZoomScale: j,
          xScale: V,
          yScale: K,
          events: te,
          eventClusters: xe,
          lanes: r,
          laneDisplayMode: i,
          isAnimationInProgress: q
        })
      }, m))
    })
  });
};
export {
  Zl as AllUserInteractions,
  fc as Interaction,
  C as InteractionModeType,
  Ea as Marks,
  kc as Timeline,
  B as ZoomLevels,
  Mc as createTimelineTheme,
  $i as currentZoomScale,
  St as dayDuration,
  Pi as defaultOrderedZoomLevels,
  Tc as deriveTimelineTheme,
  _i as fifteenMins,
  Ui as fiveMins,
  Yr as getDomainSpan,
  Yi as halfHour,
  Gl as interactionModeAnimationInProgress,
  ft as interactionModeHover,
  xr as interactionModeNone,
  _r as monthDuration,
  Li as nextBiggerZoomScale,
  Ai as nextSmallerZoomScale,
  et as oneHour,
  Re as oneMin,
  je as oneSec,
  Wi as sixHours,
  Ni as tenMins,
  Fi as threeHours,
  Hi as twelveHours,
  $ as useTimelineTheme,
  Nr as weekDuration,
  Gt as yearDuration,
  ge as zoomScaleWidth
};
