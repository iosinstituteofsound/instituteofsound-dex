import { a as e } from "./dex-client-D9KjXfbW.js";
import { t } from "./DexSkeleton-C8SxNkcP.js";
import { t as n } from "./use-dex-context-query-B3ucevSe.js";
import { n as r } from "./DexVerifiedBadge-CD-khm_g.js";
import { t as i } from "./ArtistIntelligenceCard-DyDi_jOx.js";
import { t as a } from "./EmptySignal-DoKFuov_.js";
import { memo as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { motion as l } from "framer-motion";
//#region src/components/modules/now-playing/NowPlayingPanel.tsx
function u(e) {
	if (!e || e <= 0) return "--:--";
	let t = Math.floor(e / 60), n = Math.floor(e % 60);
	return `${t}:${String(n).padStart(2, "0")}`;
}
function d(e, t, n, r) {
	return e || t || n || r;
}
var f = o(function() {
	let { data: o, isLoading: f, isError: h } = n(), g = e((e) => e.setActiveModule), _ = o?.artist, v = o?.track ?? o?.release?.tracks?.[0], y = o?.release, b = o?.discography, x = o?.lyrics, S = !!(o?.capabilities.lyrics && x);
	if (f) return /* @__PURE__ */ s(t, { lines: 10 });
	if (h || !_ && !v) return /* @__PURE__ */ s(a, {
		title: "No playback signal",
		message: "Play a track on the site to load artist intelligence and lyric archives.",
		code: "PLAYBACK_NULL"
	});
	let C = v?.id ? b?.tracks.find((e) => e.id === v.id) : void 0, w = d(y?.coverUrl, C?.coverUrl, _?.coverUrl, _?.avatarUrl), T = _?.displayName ?? y?.artistName ?? "Unknown artist", E = `${y?.id ?? "release"}:${w ?? ""}`;
	return /* @__PURE__ */ c(l.div, {
		className: "dex-now-playing",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		children: [
			/* @__PURE__ */ c("div", {
				className: "dex-panel-header",
				children: [/* @__PURE__ */ s("button", {
					type: "button",
					className: "dex-interactive dex-btn-back",
					onClick: () => g(null),
					children: "← Modules"
				}), /* @__PURE__ */ s("span", {
					className: "dex-section-label",
					children: "Now Playing"
				})]
			}),
			/* @__PURE__ */ c("div", {
				className: "dex-panel dex-panel--flush",
				children: [/* @__PURE__ */ s("div", {
					className: "dex-hero-art-frame",
					children: w ? /* @__PURE__ */ s(r, {
						src: w,
						alt: v?.title ?? "Album artwork",
						cacheSeed: E,
						className: "dex-hero-art",
						fallback: /* @__PURE__ */ s("div", {
							className: "dex-hero-art dex-avatar-fallback",
							style: { fontSize: 48 },
							children: "♪"
						})
					}) : /* @__PURE__ */ s("div", {
						className: "dex-hero-art dex-avatar-fallback",
						style: { fontSize: 48 },
						children: "♪"
					})
				}), /* @__PURE__ */ c("div", {
					className: "dex-now-playing-meta",
					children: [
						/* @__PURE__ */ s("div", {
							className: "dex-track-title",
							children: v?.title ?? "Unknown track"
						}),
						/* @__PURE__ */ s("div", {
							className: "dex-track-artist",
							children: T
						}),
						y && /* @__PURE__ */ c("div", {
							className: "dex-track-sub",
							children: [
								y.title,
								" · ",
								y.type.toUpperCase(),
								v?.durationSec ? ` · ${u(v.durationSec)}` : ""
							]
						})
					]
				})]
			}),
			_ && /* @__PURE__ */ s(p, {
				title: "Artist Intelligence",
				children: /* @__PURE__ */ s(i, {
					artist: _,
					discography: b,
					listenerStat: o?.listenerStat,
					analytics: o?.analytics,
					compact: !0
				})
			}),
			/* @__PURE__ */ s(p, {
				title: "Lyric Archive",
				children: S ? /* @__PURE__ */ s("pre", {
					className: "dex-panel whitespace-pre-wrap p-3 font-mono text-[11px] leading-relaxed",
					style: { color: "var(--dex-white)" },
					children: x
				}) : /* @__PURE__ */ s("div", {
					className: "dex-panel",
					children: /* @__PURE__ */ s(a, {
						title: "Lyric archive not indexed",
						message: v ? `No lyrics indexed for "${v.title}". Lyrics will appear here when available in the archive.` : "Play a track to query the lyric database.",
						code: "LYRIC_NULL"
					})
				})
			}),
			/* @__PURE__ */ s(p, {
				title: "Deep Scan",
				children: /* @__PURE__ */ c("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ s(m, {
						id: "signal-archive",
						label: "Discography",
						onSelect: g
					}), /* @__PURE__ */ s(m, {
						id: "network-intel",
						label: "Analytics",
						onSelect: g
					})]
				})
			})
		]
	});
});
function p({ title: e, children: t }) {
	return /* @__PURE__ */ c("div", { children: [/* @__PURE__ */ s("div", {
		className: "dex-section-label mb-2",
		children: e
	}), t] });
}
function m({ id: e, label: t, onSelect: n }) {
	return /* @__PURE__ */ s("button", {
		type: "button",
		className: "dex-interactive dex-module-link",
		onClick: () => n(e),
		children: t
	});
}
//#endregion
export { f as NowPlayingPanel };
