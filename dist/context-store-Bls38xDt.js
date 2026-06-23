import { create as e } from "zustand";
//#region src/stores/context-store.ts
var t = {}, n = e((e) => ({
	...t,
	setContext: (n) => e({
		...t,
		...n
	}),
	clearContext: () => e({ ...t })
}));
//#endregion
export { n as t };
