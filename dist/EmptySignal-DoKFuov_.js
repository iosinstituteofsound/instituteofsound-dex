import { memo as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/EmptySignal.tsx
var r = e(function({ title: e, message: r, code: i = "NO_SIGNAL" }) {
	return /* @__PURE__ */ n("div", {
		className: "dex-empty flex flex-col items-center justify-center gap-2 p-5 text-center",
		style: {
			color: "var(--dex-muted)",
			minHeight: 120
		},
		children: [
			/* @__PURE__ */ t("div", {
				className: "text-[10px] tracking-[0.18em] uppercase",
				style: { color: "rgba(0, 220, 255, 0.45)" },
				children: i
			}),
			/* @__PURE__ */ t("div", {
				className: "text-xs font-medium",
				style: { color: "var(--dex-white)" },
				children: e
			}),
			/* @__PURE__ */ t("p", {
				className: "max-w-[260px] text-[11px] leading-relaxed",
				children: r
			})
		]
	});
});
//#endregion
export { r as t };
