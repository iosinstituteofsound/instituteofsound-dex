import { a as e } from "./dex-client-D9KjXfbW.js";
import { t } from "./DexSkeleton-C8SxNkcP.js";
import { t as n } from "./use-dex-context-query-B3ucevSe.js";
import { t as r } from "./EmptySignal-DoKFuov_.js";
import { memo as i, useMemo as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { motion as c } from "framer-motion";
//#region src/components/shared/HudChart.tsx
var l = i(function({ values: e, labels: t, height: n = 80 }) {
	let r = Math.max(...e, 1), i = a(() => {
		let t = 280 / Math.max(e.length - 1, 1);
		return e.map((e, i) => `${i * t},${n - e / r * (n - 8)}`).join(" ");
	}, [
		e,
		r,
		n
	]);
	return /* @__PURE__ */ s("svg", {
		viewBox: `0 0 280 ${n}`,
		className: "w-full",
		style: { overflow: "visible" },
		children: [
			/* @__PURE__ */ s("defs", { children: [/* @__PURE__ */ s("filter", {
				id: "dex-glow",
				children: [/* @__PURE__ */ o("feGaussianBlur", {
					stdDeviation: "2",
					result: "blur"
				}), /* @__PURE__ */ s("feMerge", { children: [/* @__PURE__ */ o("feMergeNode", { in: "blur" }), /* @__PURE__ */ o("feMergeNode", { in: "SourceGraphic" })] })]
			}), /* @__PURE__ */ s("linearGradient", {
				id: "dex-line-grad",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "0",
				children: [/* @__PURE__ */ o("stop", {
					offset: "0%",
					stopColor: "var(--dex-blue)"
				}), /* @__PURE__ */ o("stop", {
					offset: "100%",
					stopColor: "var(--dex-cyan)"
				})]
			})] }),
			/* @__PURE__ */ o("polyline", {
				fill: "none",
				stroke: "url(#dex-line-grad)",
				strokeWidth: "2",
				points: i,
				filter: "url(#dex-glow)",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			t?.map((e, r) => /* @__PURE__ */ o("text", {
				x: 280 / Math.max(t.length - 1, 1) * r,
				y: n + 14,
				fill: "var(--dex-muted)",
				fontSize: "8",
				textAnchor: "middle",
				children: e
			}, e))
		]
	});
}), u = i(function() {
	let { data: i, isLoading: u, isError: f } = n(), p = e((e) => e.setActiveModule), m = i?.analytics, h = a(() => m?.peakListenHours.map((e) => e.sessions) ?? [], [m]), g = a(() => m?.peakListenHours.map((e) => `${e.hour}h`) ?? [], [m]);
	return u ? /* @__PURE__ */ o(t, { lines: 8 }) : f || !m ? /* @__PURE__ */ o(r, {
		title: "No network telemetry",
		message: "Listener statistics require a release with analytics data in the current context.",
		code: "NET_NULL"
	}) : /* @__PURE__ */ s(c.div, {
		className: "flex flex-col gap-3 overflow-y-auto",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		style: { maxHeight: 420 },
		children: [
			/* @__PURE__ */ o("button", {
				type: "button",
				className: "dex-interactive self-start text-[10px] tracking-wider uppercase",
				style: { color: "var(--dex-muted)" },
				onClick: () => p(null),
				children: "← Modules"
			}),
			/* @__PURE__ */ o("div", {
				className: "dex-neon-text text-[10px] tracking-[0.2em]",
				children: "NETWORK INTEL · LIVE"
			}),
			/* @__PURE__ */ s("div", {
				className: "grid grid-cols-2 gap-2 text-[10px]",
				children: [
					/* @__PURE__ */ o(d, {
						label: "Qualified Plays",
						value: m.qualifiedPlays
					}),
					/* @__PURE__ */ o(d, {
						label: "Listeners",
						value: m.uniqueListeners
					}),
					/* @__PURE__ */ o(d, {
						label: "Locations",
						value: m.uniqueLocations
					}),
					/* @__PURE__ */ o(d, {
						label: "Likes",
						value: m.activeLikes
					}),
					/* @__PURE__ */ o(d, {
						label: "7d Plays",
						value: m.trendsPreview.last7d.plays
					}),
					/* @__PURE__ */ o(d, {
						label: "30d Plays",
						value: m.trendsPreview.last30d.plays
					})
				]
			}),
			h.length > 0 && /* @__PURE__ */ s("div", {
				className: "rounded border p-2",
				style: { borderColor: "rgba(0,220,255,0.15)" },
				children: [/* @__PURE__ */ o("div", {
					className: "mb-2 text-[9px] tracking-wider uppercase",
					style: { color: "var(--dex-muted)" },
					children: "Peak Signal Hours"
				}), /* @__PURE__ */ o(l, {
					values: h,
					labels: g
				})]
			}),
			m.locations.length > 0 && /* @__PURE__ */ s("div", { children: [/* @__PURE__ */ o("div", {
				className: "mb-2 text-[9px] tracking-wider uppercase",
				style: { color: "var(--dex-muted)" },
				children: "Top Regions"
			}), m.locations.slice(0, 5).map((e) => /* @__PURE__ */ s("div", {
				className: "flex justify-between border-b py-1 text-[10px]",
				style: {
					borderColor: "rgba(0,220,255,0.08)",
					color: "var(--dex-white)"
				},
				children: [/* @__PURE__ */ o("span", { children: e.city || e.countryName || e.countryCode || "Unknown" }), /* @__PURE__ */ s("span", {
					style: { color: "var(--dex-cyan)" },
					children: [e.sessions, " sessions"]
				})]
			}, `${e.countryCode}-${e.city}`))] }),
			i?.listenerStat && /* @__PURE__ */ s("div", {
				className: "rounded border p-2 text-[10px]",
				style: { borderColor: "rgba(0,220,255,0.15)" },
				children: [/* @__PURE__ */ o("div", {
					style: { color: "var(--dex-muted)" },
					children: "Artist DB Score"
				}), /* @__PURE__ */ o("div", {
					className: "dex-neon-text text-lg font-bold",
					children: i.listenerStat.dbScore
				})]
			})
		]
	});
});
function d({ label: e, value: t }) {
	return /* @__PURE__ */ s("div", {
		className: "rounded border p-2",
		style: { borderColor: "rgba(0,220,255,0.12)" },
		children: [/* @__PURE__ */ o("div", {
			style: { color: "var(--dex-muted)" },
			children: e
		}), /* @__PURE__ */ o("div", {
			className: "dex-neon-text text-sm font-bold",
			children: t.toLocaleString()
		})]
	});
}
//#endregion
export { u as NetworkIntelPanel };
