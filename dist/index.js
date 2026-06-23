import { t as e } from "./context-store-Bls38xDt.js";
import { a as t, n } from "./dex-client-D9KjXfbW.js";
import { t as r } from "./DexSkeleton-C8SxNkcP.js";
import { Suspense as i, lazy as a, memo as o, useCallback as s, useEffect as c, useRef as l, useState as u } from "react";
import { createPortal as d } from "react-dom";
import { create as f } from "zustand";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
import { AnimatePresence as g, motion as _ } from "framer-motion";
import { Canvas as v, useFrame as y } from "@react-three/fiber";
import { Bloom as b, EffectComposer as x } from "@react-three/postprocessing";
//#region node_modules/zustand/esm/middleware.mjs
function S(e, t) {
	let n;
	try {
		n = e();
	} catch {
		return;
	}
	return {
		getItem: (e) => {
			let r = (e) => e === null ? null : JSON.parse(e, t?.reviver), i = n.getItem(e) ?? null;
			return i instanceof Promise ? i.then(r) : r(i);
		},
		setItem: (e, r) => n.setItem(e, JSON.stringify(r, t?.replacer)),
		removeItem: (e) => n.removeItem(e)
	};
}
var C = (e) => (t) => {
	try {
		let n = e(t);
		return n instanceof Promise ? n : {
			then(e) {
				return C(e)(n);
			},
			catch(e) {
				return this;
			}
		};
	} catch (e) {
		return {
			then(e) {
				return this;
			},
			catch(t) {
				return C(t)(e);
			}
		};
	}
}, w = (e, t) => (n, r, i) => {
	let a = {
		storage: S(() => window.localStorage),
		partialize: (e) => e,
		version: 0,
		merge: (e, t) => ({
			...t,
			...e
		}),
		...t
	}, o = !1, s = 0, c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), u = a.storage;
	if (!u) return e((...e) => {
		console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`), n(...e);
	}, r, i);
	let d = () => {
		let e = a.partialize({ ...r() });
		return u.setItem(a.name, {
			state: e,
			version: a.version
		});
	}, f = i.setState;
	i.setState = (e, t) => (f(e, t), d());
	let p = e((...e) => (n(...e), d()), r, i);
	i.getInitialState = () => p;
	let m, h = () => {
		if (!u) return;
		let e = ++s;
		o = !1, c.forEach((e) => e(r() ?? p));
		let t = a.onRehydrateStorage?.call(a, r() ?? p) || void 0;
		return C(u.getItem.bind(u))(a.name).then((e) => {
			if (e) if (typeof e.version == "number" && e.version !== a.version) {
				if (a.migrate) {
					let t = a.migrate(e.state, e.version);
					return t instanceof Promise ? t.then((e) => [!0, e]) : [!0, t];
				}
				console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
			} else return [!1, e.state];
			return [!1, void 0];
		}).then((t) => {
			if (e !== s) return;
			let [i, o] = t;
			if (m = a.merge(o, r() ?? p), n(m, !0), i) return d();
		}).then(() => {
			e === s && (t?.(r(), void 0), m = r(), o = !0, l.forEach((e) => e(m)));
		}).catch((n) => {
			e === s && t?.(void 0, n);
		});
	};
	return i.persist = {
		setOptions: (e) => {
			a = {
				...a,
				...e
			}, e.storage && (u = e.storage);
		},
		clearStorage: () => {
			u?.removeItem(a.name);
		},
		getOptions: () => a,
		rehydrate: () => h(),
		hasHydrated: () => o,
		onHydrate: (e) => (c.add(e), () => {
			c.delete(e);
		}),
		onFinishHydration: (e) => (l.add(e), () => {
			l.delete(e);
		})
	}, a.skipHydration || h(), m || p;
}, T = "ios:dex:icon-anchor-v2", E = 56, D = 16;
function O() {
	return {
		right: 24,
		bottom: 140
	};
}
function k(e, t) {
	if (typeof window > "u") return {
		right: e,
		bottom: t
	};
	let n = Math.max(D, window.innerWidth - E - D), r = Math.max(D, window.innerHeight - E - D);
	return {
		right: Math.max(D, Math.min(e, n)),
		bottom: Math.max(D, Math.min(t, r))
	};
}
var A = f()(w((e) => ({
	...O(),
	setAnchor: (t, n) => e(k(t, n)),
	resetAnchor: () => e(O())
}), {
	name: T,
	partialize: (e) => ({
		right: e.right,
		bottom: e.bottom
	}),
	onRehydrateStorage: () => (e) => {
		if (!e) return;
		let t = k(e.right, e.bottom);
		e.right = t.right, e.bottom = t.bottom;
	}
})), j = 56, M = o(function() {
	let e = t((e) => e.toggle), n = t((e) => e.contextPulse), r = A((e) => e.right), i = A((e) => e.bottom), a = A((e) => e.setAnchor), o = l(!1), d = l(!1), f = l({
		x: 0,
		y: 0,
		right: 0,
		bottom: 0
	}), [p, g] = u(!1);
	c(() => {
		if (n <= 0) return;
		g(!0);
		let e = window.setTimeout(() => g(!1), 600);
		return () => window.clearTimeout(e);
	}, [n]);
	let _ = s((e) => {
		o.current = !1, d.current = !0, f.current = {
			x: e.clientX,
			y: e.clientY,
			right: r,
			bottom: i
		}, e.currentTarget.setPointerCapture(e.pointerId);
	}, [r, i]), v = s((e) => {
		if (!d.current) return;
		let t = e.clientX - f.current.x, n = e.clientY - f.current.y;
		(Math.abs(t) > 4 || Math.abs(n) > 4) && (o.current = !0), o.current && a(f.current.right - t, f.current.bottom - n);
	}, [a]), y = s((e) => {
		d.current = !1, e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId);
	}, []), b = s((t) => {
		let n = o.current;
		y(t), n || e(), o.current = !1;
	}, [y, e]), x = s((e) => {
		y(e), o.current = !1;
	}, [y]);
	return /* @__PURE__ */ h("button", {
		type: "button",
		"aria-label": "Open DEX intelligence device",
		className: `dex-interactive dex-floating-icon dex-pulse${p ? " dex-floating-icon--pulse" : ""}`,
		style: {
			right: r,
			bottom: i,
			width: j,
			height: j
		},
		onPointerDown: _,
		onPointerMove: v,
		onPointerUp: b,
		onPointerCancel: x,
		children: [
			/* @__PURE__ */ m("span", { className: "dex-icon-ring dex-icon-ring--inner" }),
			/* @__PURE__ */ m("span", { className: "dex-icon-ring dex-icon-ring--outer" }),
			/* @__PURE__ */ m("span", {
				className: "dex-icon-core",
				children: /* @__PURE__ */ m("span", {
					className: "dex-neon-text",
					style: {
						fontSize: 10,
						fontWeight: 700,
						letterSpacing: "0.2em"
					},
					children: "DEX"
				})
			})
		]
	});
}), ee = o(function() {
	let [e, t] = u(0), [n, r] = u("");
	c(() => {
		let e = window.setInterval(() => {
			t((e) => e + 1), r((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			}));
		}, 1e3);
		return () => window.clearInterval(e);
	}, []);
	let i = 92 + e % 7;
	return /* @__PURE__ */ h("div", {
		className: "dex-live-hud pointer-events-none absolute inset-0 z-[3]",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ m("div", { className: "dex-live-hud__corner dex-live-hud__corner--tl" }),
			/* @__PURE__ */ m("div", { className: "dex-live-hud__corner dex-live-hud__corner--tr" }),
			/* @__PURE__ */ m("div", { className: "dex-live-hud__corner dex-live-hud__corner--bl" }),
			/* @__PURE__ */ m("div", { className: "dex-live-hud__corner dex-live-hud__corner--br" }),
			/* @__PURE__ */ m("div", { className: "dex-live-hud__scanline" }),
			/* @__PURE__ */ h("div", {
				className: "dex-live-hud__status",
				children: [
					/* @__PURE__ */ m("span", { className: "dex-live-hud__led" }),
					/* @__PURE__ */ m("span", { children: "SYS ONLINE" }),
					/* @__PURE__ */ m("span", {
						className: "dex-live-hud__sep",
						children: "·"
					}),
					/* @__PURE__ */ m("span", { children: n }),
					/* @__PURE__ */ m("span", {
						className: "dex-live-hud__sep",
						children: "·"
					}),
					/* @__PURE__ */ h("span", { children: [
						"SIG ",
						i,
						"%"
					] })
				]
			})
		]
	});
}), N = "polygon(12% 0%, 88% 0%, 100% 8%, 100% 92%, 88% 100%, 12% 100%, 0% 92%, 0% 8%)", P = o(function({ children: e }) {
	return /* @__PURE__ */ h(_.div, {
		className: "dex-device-frame dex-glass dex-interactive relative overflow-hidden",
		style: {
			width: 380,
			maxWidth: "calc(100vw - 32px)",
			clipPath: N
		},
		initial: {
			opacity: 0,
			scale: .88,
			rotateX: 8
		},
		animate: {
			opacity: 1,
			scale: 1,
			rotateX: 0
		},
		exit: {
			opacity: 0,
			scale: .92
		},
		transition: {
			duration: .4,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children: [
			/* @__PURE__ */ m("div", {
				className: "dex-device-backdrop",
				style: { clipPath: N },
				"aria-hidden": !0
			}),
			/* @__PURE__ */ m(ee, {}),
			/* @__PURE__ */ m("div", {
				className: "pointer-events-none absolute inset-0 z-[1]",
				style: { background: "linear-gradient(135deg, rgba(0,220,255,0.08) 0%, transparent 40%, rgba(0,136,255,0.06) 100%)" }
			}),
			/* @__PURE__ */ m("div", {
				className: "pointer-events-none absolute inset-[2px] z-[1]",
				style: {
					clipPath: N,
					border: "1px solid rgba(0, 220, 255, 0.12)"
				}
			}),
			/* @__PURE__ */ m("div", {
				className: "relative z-[2]",
				children: e
			})
		]
	});
}), F = o(function() {
	let e = t((e) => e.bootPhase), n = t((e) => e.setBootPhase), r = t((e) => e.initialize);
	return c(() => {
		let e = [
			setTimeout(() => n("energy"), 400),
			setTimeout(() => n("assemble"), 1e3),
			setTimeout(() => n("boot"), 1500)
		];
		return () => e.forEach(clearTimeout);
	}, [n]), /* @__PURE__ */ h("div", {
		className: "flex h-full min-h-[420px] flex-col items-center justify-center gap-5 p-6 text-center",
		children: [
			/* @__PURE__ */ m(_.div, {
				className: "dex-neon-text text-lg font-bold tracking-[0.15em]",
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .2 },
				children: "DEX v3.0"
			}),
			/* @__PURE__ */ m(_.div, {
				className: "text-[10px] tracking-[0.25em] uppercase",
				style: { color: "var(--dex-muted)" },
				initial: { opacity: 0 },
				animate: { opacity: e === "materialize" ? 0 : 1 },
				children: "Institute Of Sound Intelligence System"
			}),
			/* @__PURE__ */ m(_.div, {
				className: "text-xs",
				style: { color: "var(--dex-success)" },
				initial: { opacity: 0 },
				animate: { opacity: +(e === "boot" || e === "ready") },
				children: "STATUS: ONLINE"
			}),
			/* @__PURE__ */ h(_.div, {
				className: "max-w-[280px] text-xs leading-relaxed",
				style: { color: "var(--dex-white)" },
				initial: { opacity: 0 },
				animate: { opacity: +(e === "boot") },
				children: [/* @__PURE__ */ m("p", {
					className: "mb-2",
					children: "Welcome, Explorer."
				}), /* @__PURE__ */ m("p", {
					style: { color: "var(--dex-muted)" },
					children: "This device contains artist intelligence, discography records, lyric archives, network metadata and signal analysis."
				})]
			}),
			e === "boot" && /* @__PURE__ */ m(_.button, {
				type: "button",
				className: "dex-interactive mt-2 rounded border px-6 py-2 text-xs tracking-[0.2em] uppercase",
				style: {
					borderColor: "var(--dex-cyan)",
					color: "var(--dex-cyan)",
					background: "rgba(0, 220, 255, 0.08)"
				},
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				whileHover: { boxShadow: "0 0 20px rgba(0,220,255,0.35)" },
				onClick: r,
				children: "Initialize DEX"
			})
		]
	});
}), I = [
	{
		id: "identity",
		label: "Identity",
		icon: "◉",
		desc: "Your operator profile"
	},
	{
		id: "dex-chat",
		label: "Dex Chat",
		icon: "▸",
		desc: "Intelligence uplink"
	},
	{
		id: "artist-scan",
		label: "Artist Scan",
		icon: "◎",
		desc: "Profile intelligence"
	},
	{
		id: "signal-archive",
		label: "Signal Archive",
		icon: "▣",
		desc: "Discography records"
	},
	{
		id: "lyrics-database",
		label: "Lyrics DB",
		icon: "≡",
		desc: "Lyric archives"
	},
	{
		id: "network-intel",
		label: "Network Intel",
		icon: "◈",
		desc: "Signal analysis"
	}
], L = o(function({ icon: e, label: t, desc: n, onClick: r }) {
	return /* @__PURE__ */ h(_.button, {
		type: "button",
		className: "dex-interactive dex-module-tile",
		whileHover: { scale: 1.02 },
		whileTap: { scale: .98 },
		onClick: r,
		children: [
			/* @__PURE__ */ m("span", {
				className: "dex-module-tile__icon dex-neon-text",
				children: e
			}),
			/* @__PURE__ */ m("span", {
				className: "dex-module-tile__label",
				children: t
			}),
			/* @__PURE__ */ m("span", {
				className: "dex-module-tile__desc",
				children: n
			})
		]
	});
}), R = o(function() {
	let e = t((e) => e.setActiveModule);
	return /* @__PURE__ */ h("div", {
		className: "dex-module-grid",
		children: [/* @__PURE__ */ h("div", {
			className: "text-center",
			children: [/* @__PURE__ */ m("div", {
				className: "dex-neon-text text-xs tracking-[0.2em]",
				children: "MODULE SELECT"
			}), /* @__PURE__ */ m("div", {
				className: "mt-1 text-[10px]",
				style: { color: "var(--dex-muted)" },
				children: "Choose intelligence channel"
			})]
		}), /* @__PURE__ */ m("div", {
			className: "dex-module-grid__tiles",
			children: I.map((t) => /* @__PURE__ */ m(L, {
				icon: t.icon,
				label: t.label,
				desc: t.desc,
				onClick: () => e(t.id)
			}, t.id))
		})]
	});
}), z = o(function({ subtle: e = !1 }) {
	return /* @__PURE__ */ m("div", {
		className: `pointer-events-none absolute inset-0 ${e ? "dex-hologram-subtle" : "opacity-[0.03]"}`,
		style: { backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,220,255,0.35) 3px, rgba(0,220,255,0.35) 4px)" },
		"aria-hidden": !0
	});
}), B = a(() => import("./NowPlayingPanel-CLqyXCWh.js").then((e) => ({ default: e.NowPlayingPanel }))), V = a(() => import("./ArtistScanPanel-Bylt5WLq.js").then((e) => ({ default: e.ArtistScanPanel }))), H = a(() => import("./SignalArchivePanel-BO69Tysg.js").then((e) => ({ default: e.SignalArchivePanel }))), U = a(() => import("./LyricsDatabasePanel-B8kuiKY-.js").then((e) => ({ default: e.LyricsDatabasePanel }))), W = a(() => import("./NetworkIntelPanel-DFj7Rfzn.js").then((e) => ({ default: e.NetworkIntelPanel }))), G = {
	"now-playing": B,
	identity: a(() => import("./IdentityPanel-BwrViKoS.js").then((e) => ({ default: e.IdentityPanel }))),
	"dex-chat": a(() => import("./DexChatPanel-JLnC_1C3.js").then((e) => ({ default: e.DexChatPanel }))),
	"artist-scan": V,
	"signal-archive": H,
	"lyrics-database": U,
	"network-intel": W
}, K = o(function() {
	let e = t((e) => e.initialized), n = t((e) => e.activeModule);
	if (!e) return /* @__PURE__ */ m(F, {});
	if (n) {
		let e = G[n];
		return /* @__PURE__ */ h("div", {
			className: "relative flex h-full min-h-[420px] flex-col",
			children: [/* @__PURE__ */ m(z, { subtle: !0 }), /* @__PURE__ */ m(i, {
				fallback: /* @__PURE__ */ m(r, { lines: 6 }),
				children: /* @__PURE__ */ m(e, {})
			})]
		});
	}
	return /* @__PURE__ */ h("div", {
		className: "relative flex h-full min-h-[420px] flex-col",
		children: [/* @__PURE__ */ m(z, { subtle: !0 }), /* @__PURE__ */ m(R, {})]
	});
}), q = o(function({ active: e }) {
	return e ? /* @__PURE__ */ h("svg", {
		className: "pointer-events-none absolute inset-0 h-full w-full",
		viewBox: "0 0 380 520",
		fill: "none",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ m(_.path, {
				d: "M40 80 L190 20 L340 80",
				stroke: "var(--dex-cyan)",
				strokeWidth: "1.5",
				strokeOpacity: "0.6",
				initial: { pathLength: 0 },
				animate: { pathLength: 1 },
				transition: {
					duration: .6,
					ease: "easeOut"
				}
			}),
			/* @__PURE__ */ m(_.path, {
				d: "M30 480 L190 500 L350 480",
				stroke: "var(--dex-blue)",
				strokeWidth: "1",
				strokeOpacity: "0.4",
				initial: { pathLength: 0 },
				animate: { pathLength: 1 },
				transition: {
					duration: .5,
					delay: .2,
					ease: "easeOut"
				}
			}),
			/* @__PURE__ */ m(_.line, {
				x1: "0",
				y1: "260",
				x2: "380",
				y2: "260",
				stroke: "var(--dex-cyan)",
				strokeWidth: "0.5",
				strokeOpacity: "0.15",
				initial: { pathLength: 0 },
				animate: { pathLength: 1 },
				transition: {
					duration: .4,
					delay: .35
				}
			})
		]
	}) : null;
});
//#endregion
//#region src/three/ParticleLayer.tsx
function J() {
	let e = l(null);
	return y((t, n) => {
		e.current && (e.current.rotation.z += n * .4);
	}), /* @__PURE__ */ h("mesh", {
		ref: e,
		children: [/* @__PURE__ */ m("torusGeometry", { args: [
			1.2,
			.02,
			8,
			64
		] }), /* @__PURE__ */ m("meshBasicMaterial", {
			color: "#00dcff",
			transparent: !0,
			opacity: .35
		})]
	});
}
function Y({ count: e = 60 }) {
	let t = l(null);
	y((e) => {
		t.current && (t.current.rotation.y = e.clock.elapsedTime * .15, t.current.rotation.x = Math.sin(e.clock.elapsedTime * .2) * .1);
	});
	let n = new Float32Array(e * 3);
	for (let t = 0; t < e; t++) n[t * 3] = (Math.random() - .5) * 3, n[t * 3 + 1] = (Math.random() - .5) * 2, n[t * 3 + 2] = (Math.random() - .5) * 1.5;
	return /* @__PURE__ */ h("points", {
		ref: t,
		children: [/* @__PURE__ */ m("bufferGeometry", { children: /* @__PURE__ */ m("bufferAttribute", {
			attach: "attributes-position",
			args: [n, 3]
		}) }), /* @__PURE__ */ m("pointsMaterial", {
			size: .04,
			color: "#00dcff",
			transparent: !0,
			opacity: .6,
			sizeAttenuation: !0
		})]
	});
}
function X() {
	return /* @__PURE__ */ h(p, { children: [
		/* @__PURE__ */ m("ambientLight", { intensity: .3 }),
		/* @__PURE__ */ m(J, {}),
		/* @__PURE__ */ m(Y, {}),
		/* @__PURE__ */ m(x, { children: /* @__PURE__ */ m(b, {
			intensity: .4,
			luminanceThreshold: .2,
			luminanceSmoothing: .9
		}) })
	] });
}
var Z = o(function({ active: e }) {
	return e ? typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? /* @__PURE__ */ m("div", {
		className: "pointer-events-none absolute inset-0 opacity-30",
		style: { background: "radial-gradient(circle at 50% 40%, rgba(0,220,255,0.15), transparent 60%)" }
	}) : /* @__PURE__ */ m("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden opacity-40",
		children: /* @__PURE__ */ m(v, {
			frameloop: "always",
			dpr: [1, 1.5],
			camera: {
				position: [
					0,
					0,
					4
				],
				fov: 50
			},
			style: {
				width: "100%",
				height: "100%"
			},
			gl: {
				alpha: !0,
				antialias: !1
			},
			children: /* @__PURE__ */ m(X, {})
		})
	}) : null;
}), Q = o(function() {
	let e = t((e) => e.isOpen), n = t((e) => e.bootPhase), r = t((e) => e.initialized), i = A((e) => e.right), a = A((e) => e.bottom), o = e && !r;
	c(() => {
		if (!e) return;
		let n = (e) => {
			e.key === "Escape" && t.getState().close();
		};
		return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
	}, [e]);
	let s = typeof window < "u" ? window.innerWidth : 400, l = Math.max(16, s - i - 380);
	return /* @__PURE__ */ m(g, { children: e && /* @__PURE__ */ m("div", {
		className: "dex-interactive dex-device-anchor",
		style: {
			position: "fixed",
			left: l,
			bottom: a + 72,
			zIndex: 99998
		},
		children: /* @__PURE__ */ h(P, { children: [
			/* @__PURE__ */ m(q, { active: o && n !== "idle" }),
			/* @__PURE__ */ m(Z, { active: o }),
			/* @__PURE__ */ m("div", {
				className: "dex-content-scrim",
				"aria-hidden": !0
			}),
			/* @__PURE__ */ m("div", {
				style: {
					position: "relative",
					zIndex: 10,
					padding: 16
				},
				children: /* @__PURE__ */ m(K, {})
			})
		] })
	}) });
});
//#endregion
//#region src/providers/DexProvider.tsx
function $({ children: e, config: t }) {
	return c(() => {
		t && n(t);
	}, [t]), e;
}
//#endregion
//#region src/components/shell/DexShell.tsx
function te({ context: n }) {
	let r = e((e) => e.setContext), i = t((e) => e.pulseContext), a = l({});
	return c(() => {
		if (!n) return;
		let e = a.current;
		(n.trackId !== e.trackId || n.releaseId !== e.releaseId || n.artistProfileId !== e.artistProfileId || n.userId !== e.userId) && (r(n), i(), a.current = n);
	}, [
		n,
		r,
		i
	]), null;
}
function ne({ context: e, className: t }) {
	let n = /* @__PURE__ */ h("div", {
		className: `dex-root ${t ?? ""}`,
		children: [
			/* @__PURE__ */ m(te, { context: e }),
			/* @__PURE__ */ m(M, {}),
			/* @__PURE__ */ m(Q, {})
		]
	});
	return typeof document > "u" ? n : d(n, document.body);
}
var re = o(function({ apiBaseUrl: e, getAccessToken: t, context: n, className: r }) {
	return /* @__PURE__ */ m($, {
		config: {
			apiBaseUrl: e,
			getAccessToken: t
		},
		children: /* @__PURE__ */ m(ne, {
			context: n,
			className: r
		})
	});
});
//#endregion
//#region src/actions/open-dex-for-playback.ts
function ie(e = "now-playing") {
	t.getState().openForPlayback(e);
}
//#endregion
export { $ as DexProvider, re as DexShell, ie as openDexForPlayback };
