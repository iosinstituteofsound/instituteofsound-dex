import { i as e, r as t, t as n } from "./dex-client-D9KjXfbW.js";
import { useQuery as r } from "@tanstack/react-query";
//#region src/api/identity.api.ts
async function i() {
	let { data: e } = await t().get(n("/dex/profile"));
	return e.data;
}
//#endregion
//#region src/hooks/use-dex-identity-query.ts
function a() {
	return r({
		queryKey: ["dex", "identity-profile"],
		queryFn: i,
		enabled: !!e().getAccessToken?.(),
		staleTime: 3e4,
		refetchInterval: 45e3,
		retry: 1
	});
}
//#endregion
export { a as t };
