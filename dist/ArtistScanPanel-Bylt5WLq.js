import { a as e } from "./dex-client-D9KjXfbW.js";
import { t } from "./DexSkeleton-C8SxNkcP.js";
import { t as n } from "./use-dex-context-query-B3ucevSe.js";
import { t as r } from "./ArtistIntelligenceCard-DyDi_jOx.js";
import { t as i } from "./EmptySignal-DoKFuov_.js";
import { memo as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { motion as c } from "framer-motion";
//#region src/components/modules/artist-scan/ArtistScanPanel.tsx
var l = a(function() {
	let { data: a, isLoading: l, isError: d } = n(), f = e((e) => e.setActiveModule), p = a?.artist;
	return l ? /* @__PURE__ */ o(t, { lines: 8 }) : d || !p ? /* @__PURE__ */ o(i, {
		title: "No artist signal",
		message: "Play a track or open an artist profile to scan intelligence data.",
		code: "SCAN_NULL"
	}) : /* @__PURE__ */ s(c.div, {
		className: "flex h-full flex-col gap-3 overflow-y-auto p-1",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		style: { maxHeight: 420 },
		children: [
			/* @__PURE__ */ o("button", {
				type: "button",
				className: "dex-interactive dex-btn-back",
				onClick: () => f(null),
				children: "← Modules"
			}),
			/* @__PURE__ */ o("div", {
				className: "dex-section-label",
				children: "Artist Scan"
			}),
			/* @__PURE__ */ o(r, {
				artist: p,
				discography: a?.discography,
				listenerStat: a?.listenerStat,
				analytics: a?.analytics
			}),
			/* @__PURE__ */ o(u, {
				title: "Collaborators",
				children: /* @__PURE__ */ o("div", {
					className: "dex-panel",
					children: /* @__PURE__ */ o(i, {
						title: "No collaborator index",
						message: "Collaborator network data is not yet available in the signal archive.",
						code: "COLLAB_NULL"
					})
				})
			})
		]
	});
});
function u({ title: e, children: t }) {
	return /* @__PURE__ */ s("div", { children: [/* @__PURE__ */ o("div", {
		className: "dex-section-label mb-2",
		children: e
	}), t] });
}
//#endregion
export { l as ArtistScanPanel };
