import { t as e } from "./context-store-Bls38xDt.js";
import { r as t, t as n } from "./dex-client-D9KjXfbW.js";
import { useQuery as r } from "@tanstack/react-query";
//#region src/api/context.api.ts
async function i(e) {
	let { data: r } = await t().get(n("/dex/context"), { params: {
		trackId: e.trackId || void 0,
		releaseId: e.releaseId || void 0,
		artistProfileId: e.artistProfileId || void 0,
		userId: e.userId || void 0
	} });
	return r.data;
}
async function a(e) {
	let { data: r } = await t().get(n(`/music/tracks/${e}`));
	return r.data;
}
async function o(e) {
	let { data: r } = await t().get(n(`/releases/${e}`));
	return r.data;
}
async function s(e) {
	let { data: r } = await t().get(n(`/explore/discography/${e}`));
	return r.data;
}
async function c(e) {
	let { data: r } = await t().get(n(`/music/releases/${e}/analytics`));
	return r.data;
}
async function l(e) {
	try {
		return await i(e);
	} catch {
		return u(e);
	}
}
async function u(e) {
	let r = e.releaseId, i = e.artistProfileId, l = e.userId, u = null, d = null;
	e.trackId && !r && (r = (await a(e.trackId)).releaseId), r && (u = await o(r), i ||= u.artistProfileId, e.trackId && u.tracks && (d = u.tracks.find((t) => t.id === e.trackId) ?? null));
	let f = l ? await s(l) : {
		artist: null,
		latestRelease: null,
		popular: [],
		tracks: [],
		artistPick: null,
		albumsAndEps: [],
		singles: [],
		musicVideos: []
	};
	if (!l && i && f.artist?.userId && (l = f.artist.userId), l && !f.artist) {
		let e = await s(l);
		Object.assign(f, e);
	} else if (!l && u) {
		let e = ((await t().get(n("/explore/artists"), { params: { filter: "all" } })).data?.data)?.find((e) => e.id === i);
		if (e) {
			l = e.userId;
			let t = await s(l);
			Object.assign(f, t);
		}
	}
	let p = null;
	if (r) try {
		p = await c(r);
	} catch {
		p = null;
	}
	let m = d && "lyrics" in d && typeof d.lyrics == "string" && d.lyrics.trim() ? d.lyrics.trim() : null;
	return {
		artist: f.artist,
		track: d,
		release: u,
		discography: f,
		analytics: p,
		lyrics: m,
		collaborators: [],
		capabilities: {
			lyrics: !!m,
			collaborators: !1
		}
	};
}
//#endregion
//#region src/hooks/use-dex-context-query.ts
function d() {
	let t = e((e) => e.trackId), n = e((e) => e.releaseId), i = e((e) => e.artistProfileId), a = e((e) => e.userId);
	return r({
		queryKey: [
			"dex",
			"context",
			t,
			n,
			i,
			a
		],
		queryFn: () => l({
			trackId: t,
			releaseId: n,
			artistProfileId: i,
			userId: a
		}),
		enabled: !!(t || n || i || a),
		staleTime: 3e4,
		refetchInterval: 45e3,
		refetchOnWindowFocus: !0
	});
}
//#endregion
export { d as t };
