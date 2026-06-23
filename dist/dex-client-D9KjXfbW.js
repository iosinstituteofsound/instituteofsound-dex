import { create as e } from "zustand";
import t from "axios";
//#region src/stores/device-store.ts
var n = e((e, t) => ({
	isOpen: !1,
	bootPhase: "idle",
	activeModule: null,
	initialized: !1,
	audioEnabled: !1,
	contextPulse: 0,
	open: () => e({
		isOpen: !0,
		bootPhase: "materialize",
		initialized: !1,
		activeModule: null
	}),
	openForPlayback: (t = "now-playing") => e({
		isOpen: !0,
		bootPhase: "ready",
		initialized: !0,
		activeModule: t
	}),
	close: () => e({
		isOpen: !1,
		bootPhase: "idle",
		activeModule: null
	}),
	toggle: () => {
		let { isOpen: e } = t();
		e ? t().close() : t().open();
	},
	setBootPhase: (t) => e({ bootPhase: t }),
	setActiveModule: (t) => e({ activeModule: t }),
	initialize: () => e({
		initialized: !0,
		bootPhase: "ready",
		activeModule: null
	}),
	resetBoot: () => e({
		initialized: !1,
		bootPhase: "materialize",
		activeModule: null
	}),
	pulseContext: () => e((e) => ({ contextPulse: e.contextPulse + 1 })),
	setAudioEnabled: (t) => e({ audioEnabled: t })
})), r = "/api/v1", i = null, a = {};
function o(e) {
	a = e, i = t.create({
		baseURL: a.apiBaseUrl || void 0,
		headers: { "Content-Type": "application/json" },
		withCredentials: !1
	}), i.interceptors.request.use((e) => {
		let t = a.getAccessToken?.();
		return t && (e.headers.Authorization = `Bearer ${t}`), e;
	});
}
function s() {
	return i || o(a), i;
}
function c(e) {
	return `${r}${e.startsWith("/") ? e : `/${e}`}`;
}
function l() {
	return a;
}
//#endregion
export { n as a, l as i, o as n, s as r, c as t };
