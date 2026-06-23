import { memo as e, useEffect as t, useMemo as n, useState as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/DexRemoteImage.tsx
function s(e) {
	if (e) return e.startsWith("http://") || e.startsWith("https://") || e.startsWith("data:") || e.startsWith("/") ? e : `/${e}`;
}
function c(e, t) {
	let n = s(e) ?? e, r = encodeURIComponent(t.slice(0, 64));
	if (n.startsWith("http://") || n.startsWith("https://")) try {
		let e = new URL(n);
		return e.searchParams.set("dexv", t.slice(0, 64)), e.toString();
	} catch {
		return n;
	}
	return `${n}${n.includes("?") ? "&" : "?"}dexv=${r}`;
}
var l = e(function({ src: e, alt: o, cacheSeed: s, className: l, fallback: u }) {
	let [d, f] = r(!1), p = n(() => !e || d ? null : c(e, s), [
		e,
		s,
		d
	]);
	return t(() => {
		f(!1);
	}, [e, s]), p ? /* @__PURE__ */ a("img", {
		src: p,
		alt: o,
		className: l,
		loading: "eager",
		decoding: "async",
		referrerPolicy: "no-referrer",
		onError: () => f(!0)
	}, p) : /* @__PURE__ */ a(i, { children: u });
}), u = "M115.887 14.475L114.618 12l1.267-2.474a1.02 1.02 0 0 0-.355-1.326l-2.334-1.51-.14-2.775a1.018 1.018 0 0 0-.97-.971l-2.778-.14-1.51-2.336a1.02 1.02 0 0 0-1.324-.354L104 1.38 101.526.114a1.02 1.02 0 0 0-1.326.354l-1.509 2.336-2.777.14a1.017 1.017 0 0 0-.97.97l-.14 2.777L92.468 8.2a1.02 1.02 0 0 0-.354 1.325L93.382 12l-1.268 2.474a1.02 1.02 0 0 0 .355 1.326l2.335 1.509.14 2.776c.025.528.443.945.97.971l2.777.14 1.51 2.336a1.02 1.02 0 0 0 1.324.354L104 22.62l2.474 1.267c.469.242 1.039.09 1.326-.355l1.51-2.335 2.776-.14c.527-.026.945-.443.97-.97l.14-2.777 2.336-1.51c.443-.286.595-.856.354-1.324Z", d = "M109.207 9.707l-6.5 6.5a.996.996 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L102 14.086l5.793-5.793a1 1 0 1 1 1.414 1.414Z", f = e(function({ size: e = 16, title: t = "Verified account" }) {
	return /* @__PURE__ */ o("svg", {
		"aria-label": t,
		role: "img",
		width: e,
		height: e,
		viewBox: "92 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: "dex-verified-badge",
		children: [
			/* @__PURE__ */ a("title", { children: t }),
			/* @__PURE__ */ a("path", {
				d: u,
				fill: "#1877F2"
			}),
			/* @__PURE__ */ a("path", {
				d,
				fill: "#fff"
			})
		]
	});
});
//#endregion
export { l as n, f as t };
