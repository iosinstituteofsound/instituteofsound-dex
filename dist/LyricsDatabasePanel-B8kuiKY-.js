import { a as e } from "./dex-client-D9KjXfbW.js";
import { t } from "./use-dex-context-query-B3ucevSe.js";
import { t as n } from "./EmptySignal-DoKFuov_.js";
import { memo as r, useEffect as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { motion as c } from "framer-motion";
//#region src/components/modules/lyrics-database/LyricsDatabasePanel.tsx
var l = r(function() {
	let { data: r } = t(), l = e((e) => e.setActiveModule), [u, d] = a(""), [f, p] = a(""), m = r?.track ?? r?.release?.tracks?.[0];
	i(() => {
		let e = `> LOOKUP "${m?.title ?? "UNKNOWN"}" ...`, t = 0, n = window.setInterval(() => {
			t += 1, p(e.slice(0, t)), t >= e.length && clearInterval(n);
		}, 28);
		return () => clearInterval(n);
	}, [m?.title]);
	let h = r?.capabilities.lyrics && r?.lyrics;
	return /* @__PURE__ */ s(c.div, {
		className: "flex h-full flex-col gap-3",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		children: [
			/* @__PURE__ */ o("button", {
				type: "button",
				className: "dex-interactive self-start text-[10px] tracking-wider uppercase",
				style: { color: "var(--dex-muted)" },
				onClick: () => l(null),
				children: "← Modules"
			}),
			/* @__PURE__ */ o("div", {
				className: "rounded border p-3 font-mono text-[10px]",
				style: {
					borderColor: "rgba(0,220,255,0.2)",
					background: "rgba(0,10,20,0.6)",
					color: "var(--dex-cyan)"
				},
				children: /* @__PURE__ */ o("div", {
					className: "dex-terminal-cursor",
					children: f
				})
			}),
			/* @__PURE__ */ o("input", {
				type: "search",
				value: u,
				onChange: (e) => d(e.target.value),
				placeholder: "Search lyric archive...",
				className: "dex-interactive rounded border bg-transparent px-3 py-2 text-xs outline-none",
				style: {
					borderColor: "rgba(0,220,255,0.25)",
					color: "var(--dex-white)"
				}
			}),
			h ? /* @__PURE__ */ o("pre", {
				className: "whitespace-pre-wrap rounded border p-3 font-mono text-[11px] leading-relaxed",
				style: {
					borderColor: "rgba(0,220,255,0.2)",
					background: "rgba(0,10,20,0.6)",
					color: "var(--dex-white)"
				},
				children: r?.lyrics
			}) : /* @__PURE__ */ o(n, {
				title: "Lyric archive not indexed",
				message: m ? `No lyrics indexed for "${m.title}". The lyric database will populate when API archives are online.` : "Select a track to query the lyric database.",
				code: "LYRIC_NULL"
			})
		]
	});
});
//#endregion
export { l as LyricsDatabasePanel };
