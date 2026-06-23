import { a as e } from "./dex-client-D9KjXfbW.js";
import { t } from "./use-dex-context-query-B3ucevSe.js";
import { t as n } from "./use-dex-identity-query-DcNZblV1.js";
import { memo as r, useCallback as i, useEffect as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { motion as u } from "framer-motion";
//#region src/components/modules/dex-chat/DexChatPanel.tsx
function d(e, t, n) {
	let r = e.trim().toLowerCase(), i = t?.artist?.displayName, a = t?.track?.title ?? t?.release?.tracks?.[0]?.title, o = n?.profile.rank, s = n?.profile.dbScore;
	return !r || r === "help" ? "Channels: artist, track, rank, score, lyrics, identity, modules. Query the intelligence archive." : r.includes("rank") ? o ? `Your DB rank is ${o}. Network resonance active.` : "Rank data unavailable. Play tracks to build signal." : r.includes("score") || r.includes("db") ? typeof s == "number" ? `DB score: ${s.toLocaleString()} units.` : "DB score offline." : r.includes("artist") && i ? `Artist scan: ${i}. Open Artist Scan for full intelligence.` : r.includes("track") && a ? `Now playing signal: "${a}".` : r.includes("lyric") ? t?.lyrics ? "Lyric archive indexed for current track." : "Lyric archive not indexed for this track yet." : r.includes("identity") || r.includes("who am") ? `Identity confirmed: ${n?.profile.name ?? "Operator"}${n?.profile.isVerified ? " · VERIFIED" : ""}.` : r.includes("hello") || r.includes("hi") ? "DEX online. Intelligence channels ready." : "Signal received. Try: artist, track, rank, lyrics, identity.";
}
var f = r(function() {
	let { data: r } = t(), { data: f } = n(), p = e((e) => e.setActiveModule), [m, h] = s([{
		id: "boot",
		role: "dex",
		text: "DEX CHAT uplink established. Ask about artist, track, rank, or lyrics."
	}]), [g, _] = s(""), v = o(null);
	a(() => {
		v.current?.scrollTo({
			top: v.current.scrollHeight,
			behavior: "smooth"
		});
	}, [m]);
	let y = i(() => {
		let e = g.trim();
		if (!e) return;
		let t = {
			id: `u-${Date.now()}`,
			role: "user",
			text: e
		}, n = {
			id: `d-${Date.now()}`,
			role: "dex",
			text: d(e, r, f)
		};
		h((e) => [
			...e,
			t,
			n
		]), _("");
	}, [
		g,
		r,
		f
	]);
	return /* @__PURE__ */ l(u.div, {
		className: "dex-chat flex h-full min-h-[380px] flex-col gap-2",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		children: [
			/* @__PURE__ */ c("button", {
				type: "button",
				className: "dex-interactive dex-btn-back",
				onClick: () => p(null),
				children: "← Modules"
			}),
			/* @__PURE__ */ c("div", {
				className: "dex-section-label",
				children: "Dex Chat"
			}),
			/* @__PURE__ */ c("div", {
				ref: v,
				className: "dex-chat__log dex-panel flex-1 overflow-y-auto p-3",
				children: m.map((e) => /* @__PURE__ */ l("div", {
					className: `dex-chat__line dex-chat__line--${e.role}`,
					children: [/* @__PURE__ */ c("span", {
						className: "dex-chat__prefix",
						children: e.role === "dex" ? "DEX>" : "YOU>"
					}), /* @__PURE__ */ c("span", { children: e.text })]
				}, e.id))
			}),
			/* @__PURE__ */ l("form", {
				className: "dex-chat__composer",
				onSubmit: (e) => {
					e.preventDefault(), y();
				},
				children: [/* @__PURE__ */ c("input", {
					type: "text",
					value: g,
					onChange: (e) => _(e.target.value),
					placeholder: "Transmit query...",
					className: "dex-interactive dex-chat__input"
				}), /* @__PURE__ */ c("button", {
					type: "submit",
					className: "dex-interactive dex-chat__send",
					children: "SEND"
				})]
			})
		]
	});
});
//#endregion
export { f as DexChatPanel };
