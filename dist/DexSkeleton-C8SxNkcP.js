import { memo as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/DexSkeleton.tsx
var n = e(function({ lines: e = 4 }) {
	return /* @__PURE__ */ t("div", {
		className: "dex-skeleton flex flex-col gap-2 p-3",
		children: Array.from({ length: e }).map((e, n) => /* @__PURE__ */ t("div", {
			className: "h-3 rounded-sm",
			style: {
				width: `${70 + n * 17 % 30}%`,
				background: "linear-gradient(90deg, rgba(0,180,255,0.08), rgba(0,220,255,0.2), rgba(0,180,255,0.08))",
				animation: "dex-pulse 1.6s ease-in-out infinite",
				animationDelay: `${n * .12}s`
			}
		}, n))
	});
});
//#endregion
export { n as t };
