function q() {
}
function Q(t, e) {
  for (const n in e)
    t[n] = e[n];
  return (
    /** @type {T & S} */
    t
  );
}
function Ye(t) {
  return t();
}
function Ze() {
  return /* @__PURE__ */ Object.create(null);
}
function ae(t) {
  t.forEach(Ye);
}
function $e(t) {
  return typeof t == "function";
}
function ee(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let Ee;
function qe(t, e) {
  return t === e ? !0 : (Ee || (Ee = document.createElement("a")), Ee.href = e, t === Ee.href);
}
function lt(t) {
  return Object.keys(t).length === 0;
}
function st(t, e, n, l) {
  if (t) {
    const s = xe(t, e, n, l);
    return t[0](s);
  }
}
function xe(t, e, n, l) {
  return t[1] && l ? Q(n.ctx.slice(), t[1](l(e))) : n.ctx;
}
function it(t, e, n, l) {
  if (t[2] && l) {
    const s = t[2](l(n));
    if (e.dirty === void 0)
      return s;
    if (typeof s == "object") {
      const a = [], i = Math.max(e.dirty.length, s.length);
      for (let r = 0; r < i; r += 1)
        a[r] = e.dirty[r] | s[r];
      return a;
    }
    return e.dirty | s;
  }
  return e.dirty;
}
function at(t, e, n, l, s, a) {
  if (s) {
    const i = xe(e, n, l, a);
    t.p(i, s);
  }
}
function rt(t) {
  if (t.ctx.length > 32) {
    const e = [], n = t.ctx.length / 32;
    for (let l = 0; l < n; l++)
      e[l] = -1;
    return e;
  }
  return -1;
}
function ce(t) {
  const e = {};
  for (const n in t)
    n[0] !== "$" && (e[n] = t[n]);
  return e;
}
function je(t) {
  return t ?? "";
}
function c(t, e) {
  t.appendChild(e);
}
function T(t, e, n) {
  t.insertBefore(e, n || null);
}
function C(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function et(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function m(t) {
  return document.createElement(t);
}
function Me(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function M(t) {
  return document.createTextNode(t);
}
function k() {
  return M(" ");
}
function ot() {
  return M("");
}
function F(t, e, n, l) {
  return t.addEventListener(e, n, l), () => t.removeEventListener(e, n, l);
}
function _(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function de(t, e) {
  for (const n in e)
    _(t, n, e[n]);
}
function ut(t) {
  return Array.from(t.childNodes);
}
function $(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function re(t, e) {
  t.value = e ?? "";
}
function ft(t, e, { bubbles: n = !1, cancelable: l = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: l });
}
let ye;
function we(t) {
  ye = t;
}
function Ne() {
  if (!ye)
    throw new Error("Function called outside component initialization");
  return ye;
}
function tt(t) {
  Ne().$$.on_mount.push(t);
}
function ct(t) {
  Ne().$$.on_destroy.push(t);
}
function dt() {
  const t = Ne();
  return (e, n, { cancelable: l = !1 } = {}) => {
    const s = t.$$.callbacks[e];
    if (s) {
      const a = ft(
        /** @type {string} */
        e,
        n,
        { cancelable: l }
      );
      return s.slice().forEach((i) => {
        i.call(t, a);
      }), !a.defaultPrevented;
    }
    return !0;
  };
}
function _t(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((l) => l.call(this, e));
}
const me = [], z = [];
let pe = [];
const Ie = [], gt = /* @__PURE__ */ Promise.resolve();
let Fe = !1;
function ht() {
  Fe || (Fe = !0, gt.then(nt));
}
function Ae(t) {
  pe.push(t);
}
function oe(t) {
  Ie.push(t);
}
const He = /* @__PURE__ */ new Set();
let he = 0;
function nt() {
  if (he !== 0)
    return;
  const t = ye;
  do {
    try {
      for (; he < me.length; ) {
        const e = me[he];
        he++, we(e), mt(e.$$);
      }
    } catch (e) {
      throw me.length = 0, he = 0, e;
    }
    for (we(null), me.length = 0, he = 0; z.length; )
      z.pop()();
    for (let e = 0; e < pe.length; e += 1) {
      const n = pe[e];
      He.has(n) || (He.add(n), n());
    }
    pe.length = 0;
  } while (me.length);
  for (; Ie.length; )
    Ie.pop()();
  Fe = !1, He.clear(), we(t);
}
function mt(t) {
  if (t.fragment !== null) {
    t.update(), ae(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Ae);
  }
}
function pt(t) {
  const e = [], n = [];
  pe.forEach((l) => t.indexOf(l) === -1 ? e.push(l) : n.push(l)), n.forEach((l) => l()), pe = e;
}
const Pe = /* @__PURE__ */ new Set();
let ge;
function Re() {
  ge = {
    r: 0,
    c: [],
    p: ge
    // parent group
  };
}
function Be() {
  ge.r || ae(ge.c), ge = ge.p;
}
function S(t, e) {
  t && t.i && (Pe.delete(t), t.i(e));
}
function N(t, e, n, l) {
  if (t && t.o) {
    if (Pe.has(t))
      return;
    Pe.add(t), ge.c.push(() => {
      Pe.delete(t), l && (n && t.d(1), l());
    }), t.o(e);
  } else
    l && l();
}
function Ce(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function Te(t, e) {
  const n = {}, l = {}, s = { $$scope: 1 };
  let a = t.length;
  for (; a--; ) {
    const i = t[a], r = e[a];
    if (r) {
      for (const o in i)
        o in r || (l[o] = 1);
      for (const o in r)
        s[o] || (n[o] = r[o], s[o] = 1);
      t[a] = r;
    } else
      for (const o in i)
        s[o] = 1;
  }
  for (const i in l)
    i in n || (n[i] = void 0);
  return n;
}
function ue(t, e, n) {
  const l = t.$$.props[e];
  l !== void 0 && (t.$$.bound[l] = n, n(t.$$.ctx[l]));
}
function x(t) {
  t && t.c();
}
function W(t, e, n) {
  const { fragment: l, after_update: s } = t.$$;
  l && l.m(e, n), Ae(() => {
    const a = t.$$.on_mount.map(Ye).filter($e);
    t.$$.on_destroy ? t.$$.on_destroy.push(...a) : ae(a), t.$$.on_mount = [];
  }), s.forEach(Ae);
}
function X(t, e) {
  const n = t.$$;
  n.fragment !== null && (pt(n.after_update), ae(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function bt(t, e) {
  t.$$.dirty[0] === -1 && (me.push(t), ht(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function te(t, e, n, l, s, a, i = null, r = [-1]) {
  const o = ye;
  we(t);
  const d = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: a,
    update: q,
    not_equal: s,
    bound: Ze(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (o ? o.$$.context : [])),
    // everything else
    callbacks: Ze(),
    dirty: r,
    skip_bound: !1,
    root: e.target || o.$$.root
  };
  i && i(d.root);
  let f = !1;
  if (d.ctx = n ? n(t, e.props || {}, (u, g, ...h) => {
    const p = h.length ? h[0] : g;
    return d.ctx && s(d.ctx[u], d.ctx[u] = p) && (!d.skip_bound && d.bound[u] && d.bound[u](p), f && bt(t, u)), g;
  }) : [], d.update(), f = !0, ae(d.before_update), d.fragment = l ? l(d.ctx) : !1, e.target) {
    if (e.hydrate) {
      const u = ut(e.target);
      d.fragment && d.fragment.l(u), u.forEach(C);
    } else
      d.fragment && d.fragment.c();
    e.intro && S(t.$$.fragment), W(t, e.target, e.anchor), nt();
  }
  we(o);
}
class ne {
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$ = void 0;
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$set = void 0;
  /** @returns {void} */
  $destroy() {
    X(this, 1), this.$destroy = q;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!$e(n))
      return q;
    const l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return l.push(n), () => {
      const s = l.indexOf(n);
      s !== -1 && l.splice(s, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !lt(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const vt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(vt);
function wt(t) {
  let e, n, l, s;
  const a = (
    /*#slots*/
    t[2].default
  ), i = st(
    a,
    t,
    /*$$scope*/
    t[1],
    null
  );
  return {
    c() {
      e = m("div"), n = m("div"), i && i.c(), _(n, "class", "modal-inner svelte-1uslx8o"), _(e, "class", l = je(`modal ${/*hidden*/
      t[0] ? "hidden" : ""}`) + " svelte-1uslx8o");
    },
    m(r, o) {
      T(r, e, o), c(e, n), i && i.m(n, null), s = !0;
    },
    p(r, [o]) {
      i && i.p && (!s || o & /*$$scope*/
      2) && at(
        i,
        a,
        r,
        /*$$scope*/
        r[1],
        s ? it(
          a,
          /*$$scope*/
          r[1],
          o,
          null
        ) : rt(
          /*$$scope*/
          r[1]
        ),
        null
      ), (!s || o & /*hidden*/
      1 && l !== (l = je(`modal ${/*hidden*/
      r[0] ? "hidden" : ""}`) + " svelte-1uslx8o")) && _(e, "class", l);
    },
    i(r) {
      s || (S(i, r), s = !0);
    },
    o(r) {
      N(i, r), s = !1;
    },
    d(r) {
      r && C(e), i && i.d(r);
    }
  };
}
function yt(t, e, n) {
  let { $$slots: l = {}, $$scope: s } = e, { hidden: a } = e;
  return t.$$set = (i) => {
    "hidden" in i && n(0, a = i.hidden), "$$scope" in i && n(1, s = i.$$scope);
  }, [a, s, l];
}
class kt extends ne {
  constructor(e) {
    super(), te(this, e, yt, wt, ee, { hidden: 0 });
  }
}
const Et = async (t, e, n, l) => {
  let s = [];
  typeof t.tags == "string" ? s = t.tags.split(",").map((r) => ({ name: r.trim() })) : Array.isArray(t.tags) ? s = t.tags.map((r) => ({ name: r.trim() })) : s = t.tags;
  let a = {
    ...t,
    tags: s
  };
  e && (a.image_data = e.split(",")[1], a.img = n);
  const i = await fetch("/pm5n/expansions", {
    method: "PATCH",
    body: JSON.stringify(a)
  });
  await l(await i.json());
}, Lt = async (t, e) => {
  const n = await fetch(`/pm5n/expansions/${t.id}`, {
    method: "DELETE"
  });
  await e(await n.json());
}, Pt = async (t, e = 5, n = 1, l = "ASC") => {
  const s = JSON.stringify({ search_term: t, limit: e, offset: n, sort: l });
  return await (await fetch("/pm5n/expansions/search", { method: "POST", body: s })).json();
};
function jt(t) {
  let e, n, l, s, a, i, r, o, d;
  return {
    c() {
      e = m("label"), e.textContent = "Current Image:", n = k(), l = m("input"), s = k(), a = m("button"), i = m("input"), r = M(`\r
	Upload File`), _(e, "for", "current-image"), _(e, "class", "svelte-1auyfr1"), _(l, "name", "current-image"), _(l, "class", "current-img svelte-1auyfr1"), _(l, "type", "text"), l.readOnly = !0, l.disabled = !0, _(i, "class", "uploaded-img svelte-1auyfr1"), _(i, "type", "file"), _(
        i,
        "accept",
        /*allowedImageTypes*/
        t[3]
      ), _(a, "class", "btn btn-default");
    },
    m(f, u) {
      T(f, e, u), T(f, n, u), T(f, l, u), re(
        l,
        /*displayFilename*/
        t[0]
      ), T(f, s, u), T(f, a, u), c(a, i), t[7](i), c(a, r), o || (d = [
        F(
          l,
          "input",
          /*input0_input_handler*/
          t[6]
        ),
        F(
          i,
          "change",
          /*input1_change_handler*/
          t[8]
        ),
        F(
          i,
          "change",
          /*change_handler*/
          t[5]
        ),
        F(
          a,
          "click",
          /*triggerUpload*/
          t[4]
        )
      ], o = !0);
    },
    p(f, [u]) {
      u & /*displayFilename*/
      1 && l.value !== /*displayFilename*/
      f[0] && re(
        l,
        /*displayFilename*/
        f[0]
      ), u & /*allowedImageTypes*/
      8 && _(
        i,
        "accept",
        /*allowedImageTypes*/
        f[3]
      );
    },
    i: q,
    o: q,
    d(f) {
      f && (C(e), C(n), C(l), C(s), C(a)), t[7](null), o = !1, ae(d);
    }
  };
}
function Ct(t, e, n) {
  let { allowedImageTypes: l = ".jpg, .jpeg, .png, .webp" } = e, { displayFilename: s } = e, { fileInput: a = void 0 } = e, { files: i = void 0 } = e;
  const r = () => a.click();
  function o(g) {
    _t.call(this, t, g);
  }
  function d() {
    s = this.value, n(0, s);
  }
  function f(g) {
    z[g ? "unshift" : "push"](() => {
      a = g, n(1, a);
    });
  }
  function u() {
    i = this.files, n(2, i);
  }
  return t.$$set = (g) => {
    "allowedImageTypes" in g && n(3, l = g.allowedImageTypes), "displayFilename" in g && n(0, s = g.displayFilename), "fileInput" in g && n(1, a = g.fileInput), "files" in g && n(2, i = g.files);
  }, [
    s,
    a,
    i,
    l,
    r,
    o,
    d,
    f,
    u
  ];
}
class Mt extends ne {
  constructor(e) {
    super(), te(this, e, Ct, jt, ee, {
      allowedImageTypes: 3,
      displayFilename: 0,
      fileInput: 1,
      files: 2
    });
  }
}
const Le = "extensions/pm5n/uploads/";
function Tt(t) {
  let e, n, l, s = (
    /*selected*/
    t[0].trigger && /*selected*/
    t[0].id ? "Edit " : "Create "
  ), a, i, r = (
    /*selected*/
    t[0].trigger ? `"${/*selected*/
    t[0].trigger}"` : ""
  ), o, d, f, u, g, h, p, H, Z, L, D, b, A, R, B, E, Y, le, J, G = (
    /*selected*/
    t[0].trigger ? "Save Expansion" : "Enter Name.."
  ), y, I, v, j, V, se, O, _e, ie, be, ke;
  function De(P) {
    t[11](P);
  }
  let fe = {
    displayFilename: (
      /*displayFilename*/
      t[5]
    )
  };
  return (
    /*fileList*/
    t[3] !== void 0 && (fe.files = /*fileList*/
    t[3]), E = new Mt({ props: fe }), z.push(() => ue(E, "files", De)), E.$on(
      "change",
      /*processImgData*/
      t[7]
    ), {
      c() {
        e = m("div"), n = m("div"), l = m("h2"), a = M(s), i = M(" Expansion: "), o = M(r), d = k(), f = m("div"), u = m("label"), u.textContent = "Name:", g = k(), h = m("input"), p = k(), H = m("label"), H.textContent = "Expansion:", Z = k(), L = m("textarea"), D = k(), b = m("label"), b.textContent = "Tags:", A = k(), R = m("textarea"), B = k(), x(E.$$.fragment), le = k(), J = m("button"), y = M(G), v = k(), j = m("button"), j.textContent = "Reset Form", V = k(), se = m("div"), O = m("img"), _(n, "class", "Data-Title text-center svelte-1bg3n7t"), _(u, "for", "name"), _(u, "class", "svelte-1bg3n7t"), _(h, "class", "svelte-1bg3n7t"), _(H, "for", "expansion"), _(H, "class", "svelte-1bg3n7t"), _(L, "class", "svelte-1bg3n7t"), _(b, "for", "tags"), _(b, "class", "svelte-1bg3n7t"), _(R, "class", "svelte-1bg3n7t"), _(J, "class", "btn btn-ok save-expansion"), J.disabled = I = /*selected*/
        !t[0].trigger, _(j, "class", "btn btn-warn"), _(f, "class", "Data-Details svelte-1bg3n7t"), _(O, "class", "preview-img svelte-1bg3n7t"), _(O, "alt", "Expansion Preview"), qe(O.src, _e = /*selected*/
        t[0] ? `${Le}${/*selected*/
        t[0].img}` : `${Le}${/*selectedDefault*/
        t[1].img}`) || _(O, "src", _e), _(se, "class", "Data-Image svelte-1bg3n7t"), _(e, "class", "Data svelte-1bg3n7t");
      },
      m(P, U) {
        T(P, e, U), c(e, n), c(n, l), c(l, a), c(l, i), c(l, o), c(e, d), c(e, f), c(f, u), c(f, g), c(f, h), re(
          h,
          /*selected*/
          t[0].trigger
        ), c(f, p), c(f, H), c(f, Z), c(f, L), re(
          L,
          /*selected*/
          t[0].expansion
        ), c(f, D), c(f, b), c(f, A), c(f, R), re(
          R,
          /*selected*/
          t[0].tags
        ), c(f, B), W(E, f, null), c(f, le), c(f, J), c(J, y), c(f, v), c(f, j), c(e, V), c(e, se), c(se, O), ie = !0, be || (ke = [
          F(
            h,
            "input",
            /*input_input_handler*/
            t[8]
          ),
          F(
            L,
            "input",
            /*textarea0_input_handler*/
            t[9]
          ),
          F(
            R,
            "input",
            /*textarea1_input_handler*/
            t[10]
          ),
          F(
            J,
            "click",
            /*click_handler*/
            t[12]
          ),
          F(
            j,
            "click",
            /*click_handler_1*/
            t[13]
          )
        ], be = !0);
      },
      p(P, [U]) {
        (!ie || U & /*selected*/
        1) && s !== (s = /*selected*/
        P[0].trigger && /*selected*/
        P[0].id ? "Edit " : "Create ") && $(a, s), (!ie || U & /*selected*/
        1) && r !== (r = /*selected*/
        P[0].trigger ? `"${/*selected*/
        P[0].trigger}"` : "") && $(o, r), U & /*selected*/
        1 && h.value !== /*selected*/
        P[0].trigger && re(
          h,
          /*selected*/
          P[0].trigger
        ), U & /*selected*/
        1 && re(
          L,
          /*selected*/
          P[0].expansion
        ), U & /*selected*/
        1 && re(
          R,
          /*selected*/
          P[0].tags
        );
        const w = {};
        U & /*displayFilename*/
        32 && (w.displayFilename = /*displayFilename*/
        P[5]), !Y && U & /*fileList*/
        8 && (Y = !0, w.files = /*fileList*/
        P[3], oe(() => Y = !1)), E.$set(w), (!ie || U & /*selected*/
        1) && G !== (G = /*selected*/
        P[0].trigger ? "Save Expansion" : "Enter Name..") && $(y, G), (!ie || U & /*selected*/
        1 && I !== (I = /*selected*/
        !P[0].trigger)) && (J.disabled = I), (!ie || U & /*selected, selectedDefault*/
        3 && !qe(O.src, _e = /*selected*/
        P[0] ? `${Le}${/*selected*/
        P[0].img}` : `${Le}${/*selectedDefault*/
        P[1].img}`)) && _(O, "src", _e);
      },
      i(P) {
        ie || (S(E.$$.fragment, P), ie = !0);
      },
      o(P) {
        N(E.$$.fragment, P), ie = !1;
      },
      d(P) {
        P && C(e), X(E), be = !1, ae(ke);
      }
    }
  );
}
function Dt(t, e, n) {
  let l, { selected: s } = e, { selectedDefault: a } = e, { apiResponse: i } = e, r, o;
  const d = dt(), f = async () => d("refresh"), u = async (D) => {
    const b = D.target;
    if (b.files && b.files[0]) {
      const A = b.files[0], R = new FileReader();
      R.onload = async (B) => n(4, o = B.target.result), await R.readAsDataURL(A), n(5, l = A.name);
    }
  };
  function g() {
    s.trigger = this.value, n(0, s);
  }
  function h() {
    s.expansion = this.value, n(0, s);
  }
  function p() {
    s.tags = this.value, n(0, s);
  }
  function H(D) {
    r = D, n(3, r);
  }
  const Z = async () => {
    await Et(s, o, l, i), await f();
  }, L = () => n(0, s = { ...a });
  return t.$$set = (D) => {
    "selected" in D && n(0, s = D.selected), "selectedDefault" in D && n(1, a = D.selectedDefault), "apiResponse" in D && n(2, i = D.apiResponse);
  }, t.$$.update = () => {
    t.$$.dirty & /*selected*/
    1 && n(5, l = s.img);
  }, [
    s,
    a,
    i,
    r,
    o,
    l,
    f,
    u,
    g,
    h,
    p,
    H,
    Z,
    L
  ];
}
class St extends ne {
  constructor(e) {
    super(), te(this, e, Dt, Tt, ee, {
      selected: 0,
      selectedDefault: 1,
      apiResponse: 2
    });
  }
}
function Ht(t) {
  let e, n = '<path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>', l = [
    { viewBox: "0 0 24 24" },
    { width: "1.2em" },
    { height: "1.2em" },
    /*$$props*/
    t[0]
  ], s = {};
  for (let a = 0; a < l.length; a += 1)
    s = Q(s, l[a]);
  return {
    c() {
      e = Me("svg"), de(e, s);
    },
    m(a, i) {
      T(a, e, i), e.innerHTML = n;
    },
    p(a, [i]) {
      de(e, s = Te(l, [
        { viewBox: "0 0 24 24" },
        { width: "1.2em" },
        { height: "1.2em" },
        i & /*$$props*/
        1 && /*$$props*/
        a[0]
      ]));
    },
    i: q,
    o: q,
    d(a) {
      a && C(e);
    }
  };
}
function It(t, e, n) {
  return t.$$set = (l) => {
    n(0, e = Q(Q({}, e), ce(l)));
  }, e = ce(e), [e];
}
class Ft extends ne {
  constructor(e) {
    super(), te(this, e, It, Ht, ee, {});
  }
}
function At(t) {
  let e, n = '<path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575V19Zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM19 6.4L17.6 5L19 6.4Zm-3.525 2.125l-.7-.725L16.2 9.225l-.725-.7Z"/>', l = [
    { viewBox: "0 0 24 24" },
    { width: "1.2em" },
    { height: "1.2em" },
    /*$$props*/
    t[0]
  ], s = {};
  for (let a = 0; a < l.length; a += 1)
    s = Q(s, l[a]);
  return {
    c() {
      e = Me("svg"), de(e, s);
    },
    m(a, i) {
      T(a, e, i), e.innerHTML = n;
    },
    p(a, [i]) {
      de(e, s = Te(l, [
        { viewBox: "0 0 24 24" },
        { width: "1.2em" },
        { height: "1.2em" },
        i & /*$$props*/
        1 && /*$$props*/
        a[0]
      ]));
    },
    i: q,
    o: q,
    d(a) {
      a && C(e);
    }
  };
}
function Nt(t, e, n) {
  return t.$$set = (l) => {
    n(0, e = Q(Q({}, e), ce(l)));
  }, e = ce(e), [e];
}
class Rt extends ne {
  constructor(e) {
    super(), te(this, e, Nt, At, ee, {});
  }
}
function Bt(t) {
  let e, n = '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 184l144 144l144-144"/>', l = [
    { viewBox: "0 0 512 512" },
    { width: "1.2em" },
    { height: "1.2em" },
    /*$$props*/
    t[0]
  ], s = {};
  for (let a = 0; a < l.length; a += 1)
    s = Q(s, l[a]);
  return {
    c() {
      e = Me("svg"), de(e, s);
    },
    m(a, i) {
      T(a, e, i), e.innerHTML = n;
    },
    p(a, [i]) {
      de(e, s = Te(l, [
        { viewBox: "0 0 512 512" },
        { width: "1.2em" },
        { height: "1.2em" },
        i & /*$$props*/
        1 && /*$$props*/
        a[0]
      ]));
    },
    i: q,
    o: q,
    d(a) {
      a && C(e);
    }
  };
}
function Ot(t, e, n) {
  return t.$$set = (l) => {
    n(0, e = Q(Q({}, e), ce(l)));
  }, e = ce(e), [e];
}
class Zt extends ne {
  constructor(e) {
    super(), te(this, e, Ot, Bt, ee, {});
  }
}
function Ve(t, e, n) {
  const l = t.slice();
  return l[10] = e[n], l;
}
function Ue(t) {
  let e, n = Ce(
    /*options*/
    t[1]
  ), l = [];
  for (let s = 0; s < n.length; s += 1)
    l[s] = Je(Ve(t, n, s));
  return {
    c() {
      e = m("ul");
      for (let s = 0; s < l.length; s += 1)
        l[s].c();
      _(e, "class", "select-options svelte-i1jr30");
    },
    m(s, a) {
      T(s, e, a);
      for (let i = 0; i < l.length; i += 1)
        l[i] && l[i].m(e, null);
    },
    p(s, a) {
      if (a & /*setOption, options*/
      18) {
        n = Ce(
          /*options*/
          s[1]
        );
        let i;
        for (i = 0; i < n.length; i += 1) {
          const r = Ve(s, n, i);
          l[i] ? l[i].p(r, a) : (l[i] = Je(r), l[i].c(), l[i].m(e, null));
        }
        for (; i < l.length; i += 1)
          l[i].d(1);
        l.length = n.length;
      }
    },
    d(s) {
      s && C(e), et(l, s);
    }
  };
}
function Je(t) {
  let e, n = (
    /*option*/
    t[10] + ""
  ), l, s, a, i;
  function r() {
    return (
      /*click_handler*/
      t[6](
        /*option*/
        t[10]
      )
    );
  }
  return {
    c() {
      e = m("li"), l = M(n), s = k(), _(e, "class", "select-option svelte-i1jr30");
    },
    m(o, d) {
      T(o, e, d), c(e, l), c(e, s), a || (i = F(e, "click", r), a = !0);
    },
    p(o, d) {
      t = o, d & /*options*/
      2 && n !== (n = /*option*/
      t[10] + "") && $(l, n);
    },
    d(o) {
      o && C(e), a = !1, i();
    }
  };
}
function qt(t) {
  let e, n, l, s, a, i, r, o, d;
  a = new Zt({});
  let f = (
    /*open*/
    t[3] && Ue(t)
  );
  return {
    c() {
      e = m("button"), n = m("span"), l = M(
        /*selected*/
        t[0]
      ), s = k(), x(a.$$.fragment), i = k(), f && f.c(), _(n, "class", "selected"), _(e, "class", "wrapper svg-middle btn btn-default svelte-i1jr30");
    },
    m(u, g) {
      T(u, e, g), c(e, n), c(n, l), c(e, s), W(a, e, null), c(e, i), f && f.m(e, null), t[7](e), r = !0, o || (d = F(
        e,
        "click",
        /*click_handler_1*/
        t[8]
      ), o = !0);
    },
    p(u, [g]) {
      (!r || g & /*selected*/
      1) && $(
        l,
        /*selected*/
        u[0]
      ), /*open*/
      u[3] ? f ? f.p(u, g) : (f = Ue(u), f.c(), f.m(e, null)) : f && (f.d(1), f = null);
    },
    i(u) {
      r || (S(a.$$.fragment, u), r = !0);
    },
    o(u) {
      N(a.$$.fragment, u), r = !1;
    },
    d(u) {
      u && C(e), X(a), f && f.d(), t[7](null), o = !1, d();
    }
  };
}
function Vt(t, e, n) {
  let { options: l } = e, { selected: s = l[0] } = e, { change: a } = e, i, r = !1;
  const o = (h) => {
    n(0, s = h), n(3, r = !1), a(s);
  }, d = (h) => {
    i && !i.contains(h.target) && n(3, r = !1);
  };
  tt(() => {
    window.addEventListener("click", d);
  }), ct(() => {
    window.removeEventListener("click", d);
  });
  const f = (h) => o(h);
  function u(h) {
    z[h ? "unshift" : "push"](() => {
      i = h, n(2, i);
    });
  }
  const g = () => n(3, r = !r);
  return t.$$set = (h) => {
    "options" in h && n(1, l = h.options), "selected" in h && n(0, s = h.selected), "change" in h && n(5, a = h.change);
  }, [
    s,
    l,
    i,
    r,
    o,
    a,
    f,
    u,
    g
  ];
}
class ze extends ne {
  constructor(e) {
    super(), te(this, e, Vt, qt, ee, { options: 1, selected: 0, change: 5 });
  }
}
function Ut(t) {
  let e, n, l, s, a, i, r, o, d, f, u, g, h, p, H, Z, L, D, b, A, R, B, E, Y, le;
  function J(v) {
    t[6](v);
  }
  let G = {
    change: (
      /*func*/
      t[5]
    ),
    options: [5, 10, 20]
  };
  /*limit*/
  t[1] !== void 0 && (G.selected = /*limit*/
  t[1]), n = new ze({ props: G }), z.push(() => ue(n, "selected", J));
  function y(v) {
    t[8](v);
  }
  let I = {
    change: (
      /*func_1*/
      t[7]
    ),
    options: ["ASC", "DSC"]
  };
  return (
    /*sort*/
    t[2] !== void 0 && (I.selected = /*sort*/
    t[2]), a = new ze({ props: I }), z.push(() => ue(a, "selected", y)), {
      c() {
        e = m("div"), x(n.$$.fragment), s = k(), x(a.$$.fragment), r = k(), o = m("button"), d = M("Prev "), f = M(
          /*limit*/
          t[1]
        ), g = k(), h = m("span"), p = M("Page "), H = M(
          /*currentPage*/
          t[0]
        ), Z = M(" of "), L = M(
          /*totalPages*/
          t[3]
        ), D = k(), b = m("button"), A = M("Next "), R = M(
          /*limit*/
          t[1]
        ), _(o, "class", "btn btn-default"), o.disabled = u = /*currentPage*/
        !(t[0] > 1), _(b, "class", "btn btn-default"), b.disabled = B = /*currentPage*/
        !(t[0] < /*totalPages*/
        t[3]), _(e, "class", "pagination svelte-xvi9q");
      },
      m(v, j) {
        T(v, e, j), W(n, e, null), c(e, s), W(a, e, null), c(e, r), c(e, o), c(o, d), c(o, f), c(e, g), c(e, h), c(h, p), c(h, H), c(h, Z), c(h, L), c(e, D), c(e, b), c(b, A), c(b, R), E = !0, Y || (le = [
          F(
            o,
            "click",
            /*click_handler*/
            t[9]
          ),
          F(
            b,
            "click",
            /*click_handler_1*/
            t[10]
          )
        ], Y = !0);
      },
      p(v, [j]) {
        const V = {};
        j & /*updateExpansionList, limit, sort*/
        22 && (V.change = /*func*/
        v[5]), !l && j & /*limit*/
        2 && (l = !0, V.selected = /*limit*/
        v[1], oe(() => l = !1)), n.$set(V);
        const se = {};
        j & /*updateExpansionList, limit, sort*/
        22 && (se.change = /*func_1*/
        v[7]), !i && j & /*sort*/
        4 && (i = !0, se.selected = /*sort*/
        v[2], oe(() => i = !1)), a.$set(se), (!E || j & /*limit*/
        2) && $(
          f,
          /*limit*/
          v[1]
        ), (!E || j & /*currentPage*/
        1 && u !== (u = /*currentPage*/
        !(v[0] > 1))) && (o.disabled = u), (!E || j & /*currentPage*/
        1) && $(
          H,
          /*currentPage*/
          v[0]
        ), (!E || j & /*totalPages*/
        8) && $(
          L,
          /*totalPages*/
          v[3]
        ), (!E || j & /*limit*/
        2) && $(
          R,
          /*limit*/
          v[1]
        ), (!E || j & /*currentPage, totalPages*/
        9 && B !== (B = /*currentPage*/
        !(v[0] < /*totalPages*/
        v[3]))) && (b.disabled = B);
      },
      i(v) {
        E || (S(n.$$.fragment, v), S(a.$$.fragment, v), E = !0);
      },
      o(v) {
        N(n.$$.fragment, v), N(a.$$.fragment, v), E = !1;
      },
      d(v) {
        v && C(e), X(n), X(a), Y = !1, ae(le);
      }
    }
  );
}
function Jt(t, e, n) {
  let { currentPage: l } = e, { totalPages: s } = e, { limit: a } = e, { sort: i } = e, { updateExpansionList: r } = e;
  const o = async () => await r("", a, 1, i);
  function d(p) {
    a = p, n(1, a);
  }
  const f = async () => await r("", a, 1, i);
  function u(p) {
    i = p, n(2, i);
  }
  const g = async () => await r("", a, n(0, l -= 1), i), h = async () => await r("", a, n(0, l += 1), i);
  return t.$$set = (p) => {
    "currentPage" in p && n(0, l = p.currentPage), "totalPages" in p && n(3, s = p.totalPages), "limit" in p && n(1, a = p.limit), "sort" in p && n(2, i = p.sort), "updateExpansionList" in p && n(4, r = p.updateExpansionList);
  }, [
    l,
    a,
    i,
    s,
    r,
    o,
    d,
    f,
    u,
    g,
    h
  ];
}
class zt extends ne {
  constructor(e) {
    super(), te(this, e, Jt, Ut, ee, {
      currentPage: 0,
      totalPages: 3,
      limit: 1,
      sort: 2,
      updateExpansionList: 4
    });
  }
}
function Ge(t, e, n) {
  const l = t.slice();
  return l[25] = e[n], l;
}
function Gt(t) {
  let e, n, l = Ce(
    /*data*/
    t[1]
  ), s = [];
  for (let i = 0; i < l.length; i += 1)
    s[i] = Ke(Ge(t, l, i));
  const a = (i) => N(s[i], 1, 1, () => {
    s[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < s.length; i += 1)
        s[i].c();
      e = ot();
    },
    m(i, r) {
      for (let o = 0; o < s.length; o += 1)
        s[o] && s[o].m(i, r);
      T(i, e, r), n = !0;
    },
    p(i, r) {
      if (r & /*data, apiResponse, updateExpansionList, selected, selectedDefault, highlightText, searchTerms*/
      15554) {
        l = Ce(
          /*data*/
          i[1]
        );
        let o;
        for (o = 0; o < l.length; o += 1) {
          const d = Ge(i, l, o);
          s[o] ? (s[o].p(d, r), S(s[o], 1)) : (s[o] = Ke(d), s[o].c(), S(s[o], 1), s[o].m(e.parentNode, e));
        }
        for (Re(), o = l.length; o < s.length; o += 1)
          a(o);
        Be();
      }
    },
    i(i) {
      if (!n) {
        for (let r = 0; r < l.length; r += 1)
          S(s[r]);
        n = !0;
      }
    },
    o(i) {
      s = s.filter(Boolean);
      for (let r = 0; r < s.length; r += 1)
        N(s[r]);
      n = !1;
    },
    d(i) {
      i && C(e), et(s, i);
    }
  };
}
function Kt(t) {
  let e, n, l, s;
  return {
    c() {
      e = m("li"), n = M('No expansions found matching your search term - "'), l = M(
        /*searchTerms*/
        t[7]
      ), s = M('"..');
    },
    m(a, i) {
      T(a, e, i), c(e, n), c(e, l), c(e, s);
    },
    p(a, i) {
      i & /*searchTerms*/
      128 && $(
        l,
        /*searchTerms*/
        a[7]
      );
    },
    i: q,
    o: q,
    d(a) {
      a && C(e);
    }
  };
}
function Ke(t) {
  let e, n, l = (
    /*highlightText*/
    t[12](
      /*searchTerms*/
      t[7],
      /*expansion*/
      t[25].trigger
    ) + ""
  ), s, a, i = (
    /*highlightText*/
    t[12](
      /*searchTerms*/
      t[7],
      /*expansion*/
      t[25].tags.join(", ")
    ) + ""
  ), r, o, d, f, u, g, h, p, H, Z;
  d = new Rt({});
  function L() {
    return (
      /*click_handler*/
      t[14](
        /*expansion*/
        t[25]
      )
    );
  }
  g = new Ft({});
  function D() {
    return (
      /*click_handler_1*/
      t[15](
        /*expansion*/
        t[25]
      )
    );
  }
  return {
    c() {
      e = m("li"), n = m("span"), s = k(), a = m("span"), r = k(), o = m("button"), x(d.$$.fragment), f = k(), u = m("button"), x(g.$$.fragment), h = k(), _(n, "class", "expansion-name svelte-9ej264"), _(a, "class", "expansion-tags svelte-9ej264"), _(o, "class", "expansion-btn svelte-9ej264"), _(u, "class", "expansion-btn svelte-9ej264"), _(e, "class", "expansion svelte-9ej264");
    },
    m(b, A) {
      T(b, e, A), c(e, n), n.innerHTML = l, c(e, s), c(e, a), a.innerHTML = i, c(e, r), c(e, o), W(d, o, null), c(e, f), c(e, u), W(g, u, null), c(e, h), p = !0, H || (Z = [
        F(o, "click", L),
        F(u, "click", D)
      ], H = !0);
    },
    p(b, A) {
      t = b, (!p || A & /*searchTerms, data*/
      130) && l !== (l = /*highlightText*/
      t[12](
        /*searchTerms*/
        t[7],
        /*expansion*/
        t[25].trigger
      ) + "") && (n.innerHTML = l), (!p || A & /*searchTerms, data*/
      130) && i !== (i = /*highlightText*/
      t[12](
        /*searchTerms*/
        t[7],
        /*expansion*/
        t[25].tags.join(", ")
      ) + "") && (a.innerHTML = i);
    },
    i(b) {
      p || (S(d.$$.fragment, b), S(g.$$.fragment, b), p = !0);
    },
    o(b) {
      N(d.$$.fragment, b), N(g.$$.fragment, b), p = !1;
    },
    d(b) {
      b && C(e), X(d), X(g), H = !1, ae(Z);
    }
  };
}
function Qt(t) {
  let e, n, l, s, a, i, r, o, d, f, u, g, h, p, H, Z, L, D, b, A, R, B, E, Y, le, J, G, y, I, v, j, V;
  const se = [Kt, Gt], O = [];
  function _e(w, K) {
    return (
      /*data*/
      w[1].length === 0 ? 0 : 1
    );
  }
  r = _e(t), o = O[r] = se[r](t);
  function ie(w) {
    t[16](w);
  }
  function be(w) {
    t[17](w);
  }
  function ke(w) {
    t[18](w);
  }
  function De(w) {
    t[19](w);
  }
  let fe = {
    updateExpansionList: (
      /*updateExpansionList*/
      t[11]
    )
  };
  /*limit*/
  t[2] !== void 0 && (fe.limit = /*limit*/
  t[2]), /*currentPage*/
  t[3] !== void 0 && (fe.currentPage = /*currentPage*/
  t[3]), /*totalPages*/
  t[4] !== void 0 && (fe.totalPages = /*totalPages*/
  t[4]), /*sort*/
  t[5] !== void 0 && (fe.sort = /*sort*/
  t[5]), u = new zt({ props: fe }), z.push(() => ue(u, "limit", ie)), z.push(() => ue(u, "currentPage", be)), z.push(() => ue(u, "totalPages", ke)), z.push(() => ue(u, "sort", De));
  function P(w) {
    t[22](w);
  }
  let U = {
    apiResponse: (
      /*apiResponse*/
      t[13]
    ),
    selectedDefault: (
      /*selectedDefault*/
      t[10]
    )
  };
  return (
    /*selected*/
    t[6] !== void 0 && (U.selected = /*selected*/
    t[6]), b = new St({ props: U }), z.push(() => ue(b, "selected", P)), b.$on(
      "refresh",
      /*refresh_handler*/
      t[23]
    ), {
      c() {
        e = m("div"), n = m("div"), l = m("div"), l.innerHTML = "<h2>Available Expansions:</h2>", s = k(), a = m("div"), i = m("ul"), o.c(), d = k(), f = m("div"), x(u.$$.fragment), Z = k(), L = m("input"), D = k(), x(b.$$.fragment), R = k(), B = m("div"), E = m("span"), Y = M("["), le = M(
          /*stats*/
          t[9]
        ), J = M("] - "), G = M(
          /*apiResponseData*/
          t[8]
        ), y = k(), I = m("button"), I.textContent = "Close", _(l, "class", "Browser-Title text-center svelte-9ej264"), _(i, "class", "svelte-9ej264"), _(a, "class", "Expansion-List svelte-9ej264"), _(L, "class", "input search-expansions svelte-9ej264"), _(L, "type", "text"), _(L, "placeholder", "Type to search.."), _(f, "class", "Search-Tools text-center svelte-9ej264"), _(n, "class", "Browser svelte-9ej264"), _(E, "class", "footer-info svelte-9ej264"), _(I, "class", "btn btn-default"), _(B, "class", "Footer svelte-9ej264"), _(e, "class", "container svelte-9ej264");
      },
      m(w, K) {
        T(w, e, K), c(e, n), c(n, l), c(n, s), c(n, a), c(a, i), O[r].m(i, null), c(n, d), c(n, f), W(u, f, null), c(f, Z), c(f, L), re(
          L,
          /*searchTerms*/
          t[7]
        ), c(e, D), W(b, e, null), c(e, R), c(e, B), c(B, E), c(E, Y), c(E, le), c(E, J), c(E, G), c(B, y), c(B, I), v = !0, j || (V = [
          F(
            L,
            "input",
            /*input_input_handler*/
            t[20]
          ),
          F(
            L,
            "keyup",
            /*keyup_handler*/
            t[21]
          ),
          F(
            I,
            "click",
            /*click_handler_2*/
            t[24]
          )
        ], j = !0);
      },
      p(w, K) {
        let Se = r;
        r = _e(w), r === Se ? O[r].p(w, K) : (Re(), N(O[Se], 1, 1, () => {
          O[Se] = null;
        }), Be(), o = O[r], o ? o.p(w, K) : (o = O[r] = se[r](w), o.c()), S(o, 1), o.m(i, null));
        const ve = {};
        !g && K & /*limit*/
        4 && (g = !0, ve.limit = /*limit*/
        w[2], oe(() => g = !1)), !h && K & /*currentPage*/
        8 && (h = !0, ve.currentPage = /*currentPage*/
        w[3], oe(() => h = !1)), !p && K & /*totalPages*/
        16 && (p = !0, ve.totalPages = /*totalPages*/
        w[4], oe(() => p = !1)), !H && K & /*sort*/
        32 && (H = !0, ve.sort = /*sort*/
        w[5], oe(() => H = !1)), u.$set(ve), K & /*searchTerms*/
        128 && L.value !== /*searchTerms*/
        w[7] && re(
          L,
          /*searchTerms*/
          w[7]
        );
        const Oe = {};
        !A && K & /*selected*/
        64 && (A = !0, Oe.selected = /*selected*/
        w[6], oe(() => A = !1)), b.$set(Oe), (!v || K & /*stats*/
        512) && $(
          le,
          /*stats*/
          w[9]
        ), (!v || K & /*apiResponseData*/
        256) && $(
          G,
          /*apiResponseData*/
          w[8]
        );
      },
      i(w) {
        v || (S(o), S(u.$$.fragment, w), S(b.$$.fragment, w), v = !0);
      },
      o(w) {
        N(o), N(u.$$.fragment, w), N(b.$$.fragment, w), v = !1;
      },
      d(w) {
        w && C(e), O[r].d(), X(u), X(b), j = !1, ae(V);
      }
    }
  );
}
function Wt(t) {
  let e, n;
  return e = new kt({
    props: {
      hidden: (
        /*hidden*/
        t[0]
      ),
      $$slots: { default: [Qt] },
      $$scope: { ctx: t }
    }
  }), {
    c() {
      x(e.$$.fragment);
    },
    m(l, s) {
      W(e, l, s), n = !0;
    },
    p(l, [s]) {
      const a = {};
      s & /*hidden*/
      1 && (a.hidden = /*hidden*/
      l[0]), s & /*$$scope, hidden, apiResponseData, stats, selected, searchTerms, limit, sort, currentPage, totalPages, data*/
      268436479 && (a.$$scope = { dirty: s, ctx: l }), e.$set(a);
    },
    i(l) {
      n || (S(e.$$.fragment, l), n = !0);
    },
    o(l) {
      N(e.$$.fragment, l), n = !1;
    },
    d(l) {
      X(e, l);
    }
  };
}
let Qe = "(API info will appear here..)";
function Xt(t, e, n) {
  let { hidden: l } = e, s = [], a = "5", i = 1, r, o = "ASC", d = {
    trigger: "",
    expansion: "",
    tags: [],
    img: "placeholder.png"
  }, f = { ...d }, u, g = Qe, h = "[Statistics will appear here..]";
  const p = async (y, I, v, j) => {
    const V = await Pt(y, I ? parseInt(I) : 5, v, j);
    n(4, r = V.total_pages), r === 0 && n(4, r = 1), (r === 1 || i > r) && n(3, i = 1), n(1, s = V.expansions), n(9, h = `Expansions: ${V.total_found} of ${V.total_expansions}, Tags: ${V.total_tags}`);
  }, H = (y, I) => {
    if (!y)
      return I;
    const v = new RegExp(y, "gi");
    return I.replace(v, (j) => `<span class="highlight">${j}</span>`);
  }, Z = async (y) => {
    const I = y.message, v = y?.error;
    n(8, g = v || I), setTimeout(() => n(8, g = Qe), 3e3);
  };
  tt(async () => {
    await p(u);
  });
  const L = (y) => n(6, f = { ...y }), D = async (y) => {
    await Lt(y, Z), await p(), n(6, f = { ...d });
  };
  function b(y) {
    a = y, n(2, a);
  }
  function A(y) {
    i = y, n(3, i);
  }
  function R(y) {
    r = y, n(4, r);
  }
  function B(y) {
    o = y, n(5, o);
  }
  function E() {
    u = this.value, n(7, u);
  }
  const Y = async () => await p(u, a, 0, o);
  function le(y) {
    f = y, n(6, f);
  }
  const J = async () => await p(u), G = () => n(0, l = !0);
  return t.$$set = (y) => {
    "hidden" in y && n(0, l = y.hidden);
  }, [
    l,
    s,
    a,
    i,
    r,
    o,
    f,
    u,
    g,
    h,
    d,
    p,
    H,
    Z,
    L,
    D,
    b,
    A,
    R,
    B,
    E,
    Y,
    le,
    J,
    G
  ];
}
class Yt extends ne {
  constructor(e) {
    super(), te(this, e, Xt, Wt, ee, { hidden: 0 });
  }
}
function $t(t) {
  let e, n = '<path fill="currentColor" fill-rule="evenodd" d="M12.428 2c-1.114 0-2.129.6-4.157 1.802l-.686.406C5.555 5.41 4.542 6.011 3.985 7c-.557.99-.557 2.19-.557 4.594v.812c0 2.403 0 3.605.557 4.594c.557.99 1.57 1.59 3.6 2.791l.686.407C10.299 21.399 11.314 22 12.428 22c1.114 0 2.128-.6 4.157-1.802l.686-.407c2.028-1.2 3.043-1.802 3.6-2.791c.557-.99.557-2.19.557-4.594v-.812c0-2.403 0-3.605-.557-4.594c-.557-.99-1.572-1.59-3.6-2.792l-.686-.406C14.555 2.601 13.542 2 12.428 2Zm-3.75 10a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0Z" clip-rule="evenodd"/>', l = [
    { viewBox: "0 0 24 24" },
    { width: "1.2em" },
    { height: "1.2em" },
    /*$$props*/
    t[0]
  ], s = {};
  for (let a = 0; a < l.length; a += 1)
    s = Q(s, l[a]);
  return {
    c() {
      e = Me("svg"), de(e, s);
    },
    m(a, i) {
      T(a, e, i), e.innerHTML = n;
    },
    p(a, [i]) {
      de(e, s = Te(l, [
        { viewBox: "0 0 24 24" },
        { width: "1.2em" },
        { height: "1.2em" },
        i & /*$$props*/
        1 && /*$$props*/
        a[0]
      ]));
    },
    i: q,
    o: q,
    d(a) {
      a && C(e);
    }
  };
}
function xt(t, e, n) {
  return t.$$set = (l) => {
    n(0, e = Q(Q({}, e), ce(l)));
  }, e = ce(e), [e];
}
class en extends ne {
  constructor(e) {
    super(), te(this, e, xt, $t, ee, {});
  }
}
function We(t) {
  let e, n;
  return e = new en({ props: { class: "drawer-icon" } }), {
    c() {
      x(e.$$.fragment);
    },
    m(l, s) {
      W(e, l, s), n = !0;
    },
    i(l) {
      n || (S(e.$$.fragment, l), n = !0);
    },
    o(l) {
      N(e.$$.fragment, l), n = !1;
    },
    d(l) {
      X(e, l);
    }
  };
}
function Xe(t) {
  let e, n, l, s, a, i;
  return {
    c() {
      e = m("span"), e.textContent = "PM5N Menu", n = k(), l = m("div"), s = m("button"), s.textContent = "Expansion Manager", _(e, "class", "drawer-title svelte-bsmneo"), _(s, "class", "drawer-button svelte-bsmneo"), _(l, "class", "drawer-content");
    },
    m(r, o) {
      T(r, e, o), T(r, n, o), T(r, l, o), c(l, s), a || (i = F(
        s,
        "click",
        /*click_handler*/
        t[2]
      ), a = !0);
    },
    p: q,
    d(r) {
      r && (C(e), C(n), C(l)), a = !1, i();
    }
  };
}
function tn(t) {
  let e, n, l, s, a, i, r = (
    /*drawer_hidden*/
    t[1] && We()
  ), o = !/*drawer_hidden*/
  t[1] && Xe(t);
  return {
    c() {
      e = m("div"), r && r.c(), n = k(), o && o.c(), _(e, "role", "button"), _(e, "tabindex", "0"), _(e, "class", l = je(`drawer ${/*drawer_hidden*/
      t[1] ? "hidden" : ""}`) + " svelte-bsmneo");
    },
    m(d, f) {
      T(d, e, f), r && r.m(e, null), c(e, n), o && o.m(e, null), s = !0, a || (i = [
        F(
          e,
          "mouseleave",
          /*mouseleave_handler*/
          t[3]
        ),
        F(
          e,
          "mouseenter",
          /*mouseenter_handler*/
          t[4]
        )
      ], a = !0);
    },
    p(d, [f]) {
      /*drawer_hidden*/
      d[1] ? r ? f & /*drawer_hidden*/
      2 && S(r, 1) : (r = We(), r.c(), S(r, 1), r.m(e, n)) : r && (Re(), N(r, 1, 1, () => {
        r = null;
      }), Be()), /*drawer_hidden*/
      d[1] ? o && (o.d(1), o = null) : o ? o.p(d, f) : (o = Xe(d), o.c(), o.m(e, null)), (!s || f & /*drawer_hidden*/
      2 && l !== (l = je(`drawer ${/*drawer_hidden*/
      d[1] ? "hidden" : ""}`) + " svelte-bsmneo")) && _(e, "class", l);
    },
    i(d) {
      s || (S(r), s = !0);
    },
    o(d) {
      N(r), s = !1;
    },
    d(d) {
      d && C(e), r && r.d(), o && o.d(), a = !1, ae(i);
    }
  };
}
function nn(t, e, n) {
  let { exp_man_hidden: l } = e, s = !0;
  const a = () => n(0, l = !1), i = () => n(1, s = !0), r = () => n(1, s = !1);
  return t.$$set = (o) => {
    "exp_man_hidden" in o && n(0, l = o.exp_man_hidden);
  }, [
    l,
    s,
    a,
    i,
    r
  ];
}
class ln extends ne {
  constructor(e) {
    super(), te(this, e, nn, tn, ee, { exp_man_hidden: 0 });
  }
}
function sn(t) {
  let e, n, l, s, a, i;
  function r(u) {
    t[1](u);
  }
  let o = {};
  /*expansionManagerHidden*/
  t[0] !== void 0 && (o.exp_man_hidden = /*expansionManagerHidden*/
  t[0]), e = new ln({ props: o }), z.push(() => ue(e, "exp_man_hidden", r));
  function d(u) {
    t[2](u);
  }
  let f = {};
  return (
    /*expansionManagerHidden*/
    t[0] !== void 0 && (f.hidden = /*expansionManagerHidden*/
    t[0]), s = new Yt({ props: f }), z.push(() => ue(s, "hidden", d)), {
      c() {
        x(e.$$.fragment), l = k(), x(s.$$.fragment);
      },
      m(u, g) {
        W(e, u, g), T(u, l, g), W(s, u, g), i = !0;
      },
      p(u, [g]) {
        const h = {};
        !n && g & /*expansionManagerHidden*/
        1 && (n = !0, h.exp_man_hidden = /*expansionManagerHidden*/
        u[0], oe(() => n = !1)), e.$set(h);
        const p = {};
        !a && g & /*expansionManagerHidden*/
        1 && (a = !0, p.hidden = /*expansionManagerHidden*/
        u[0], oe(() => a = !1)), s.$set(p);
      },
      i(u) {
        i || (S(e.$$.fragment, u), S(s.$$.fragment, u), i = !0);
      },
      o(u) {
        N(e.$$.fragment, u), N(s.$$.fragment, u), i = !1;
      },
      d(u) {
        u && C(l), X(e, u), X(s, u);
      }
    }
  );
}
function an(t, e, n) {
  let l = !0;
  function s(i) {
    l = i, n(0, l);
  }
  function a(i) {
    l = i, n(0, l);
  }
  return [
    l,
    s,
    a
  ];
}
class rn extends ne {
  constructor(e) {
    super(), te(this, e, an, sn, ee, {});
  }
}
export {
  rn as default
};
