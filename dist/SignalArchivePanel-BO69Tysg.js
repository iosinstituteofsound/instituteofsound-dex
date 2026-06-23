import { a as e } from "./dex-client-D9KjXfbW.js";
import { t } from "./DexSkeleton-C8SxNkcP.js";
import { t as n } from "./use-dex-context-query-B3ucevSe.js";
import { t as r } from "./EmptySignal-DoKFuov_.js";
import { memo as i, useMemo as a, useRef as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { motion as l } from "framer-motion";
import { useVirtualizer as u } from "@tanstack/react-virtual";
//#region src/components/modules/signal-archive/SignalArchivePanel.tsx
var d = i(function() {
	let { data: i, isLoading: d, isError: f } = n(), p = e((e) => e.setActiveModule), m = o(null), h = a(() => {
		if (!i?.discography) return [];
		let e = (e) => ({
			id: e.id,
			title: e.title,
			type: e.type.toUpperCase(),
			date: e.releaseDate,
			playCount: e.playCount
		});
		return [
			...i.discography.albumsAndEps.map(e),
			...i.discography.singles.map(e),
			...i.discography.popular.map((e) => ({
				id: e.id,
				title: e.title,
				type: (e.type ?? "TRACK").toUpperCase(),
				date: e.releaseDate,
				playCount: e.playCount
			}))
		];
	}, [i]), g = u({
		count: h.length,
		getScrollElement: () => m.current,
		estimateSize: () => 52,
		overscan: 6
	});
	return d ? /* @__PURE__ */ s(t, { lines: 8 }) : f || h.length === 0 ? /* @__PURE__ */ s(r, {
		title: "Archive empty",
		message: "No discography records found for the current signal context.",
		code: "ARCHIVE_NULL"
	}) : /* @__PURE__ */ c(l.div, {
		className: "flex h-full flex-col gap-2",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		children: [
			/* @__PURE__ */ s("button", {
				type: "button",
				className: "dex-interactive self-start text-[10px] tracking-wider uppercase",
				style: { color: "var(--dex-muted)" },
				onClick: () => p(null),
				children: "← Modules"
			}),
			/* @__PURE__ */ c("div", {
				className: "dex-neon-text text-[10px] tracking-[0.2em]",
				children: [
					"SIGNAL ARCHIVE · ",
					h.length,
					" RECORDS"
				]
			}),
			/* @__PURE__ */ s("div", {
				ref: m,
				className: "flex-1 overflow-y-auto",
				style: { maxHeight: 360 },
				children: /* @__PURE__ */ s("div", {
					style: {
						height: g.getTotalSize(),
						position: "relative"
					},
					children: g.getVirtualItems().map((e) => {
						let t = h[e.index];
						return /* @__PURE__ */ c("div", {
							className: "absolute left-0 right-0 flex items-center gap-2 border-b px-2 py-2",
							style: {
								height: e.size,
								transform: `translateY(${e.start}px)`,
								borderColor: "rgba(0,220,255,0.08)"
							},
							children: [
								/* @__PURE__ */ s("span", {
									className: "text-[9px] tracking-wider",
									style: {
										color: "var(--dex-cyan)",
										width: 48
									},
									children: t.type
								}),
								/* @__PURE__ */ s("span", {
									className: "min-w-0 flex-1 truncate text-xs",
									style: { color: "var(--dex-white)" },
									children: t.title
								}),
								t.playCount != null && /* @__PURE__ */ c("span", {
									className: "text-[9px]",
									style: { color: "var(--dex-muted)" },
									children: [t.playCount, " plays"]
								})
							]
						}, t.id);
					})
				})
			})
		]
	});
});
//#endregion
export { d as SignalArchivePanel };
