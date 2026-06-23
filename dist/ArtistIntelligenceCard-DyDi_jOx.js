import { n as e, t } from "./DexVerifiedBadge-CD-khm_g.js";
import { memo as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/ArtistIntelligenceCard.tsx
function o(e) {
	return e == null ? "—" : e.toLocaleString();
}
var s = n(function({ artist: n, discography: s, listenerStat: c, analytics: l, compact: u = !1 }) {
	let d = (s?.albumsAndEps.length ?? 0) + (s?.singles.length ?? 0) + (s?.tracks.length ?? 0), f = n.username ? `@${n.username}` : `@${n.slug}`;
	return /* @__PURE__ */ a("div", {
		className: "dex-panel dex-artist-intel",
		children: [
			/* @__PURE__ */ a("div", {
				className: "dex-artist-intel__header",
				children: [/* @__PURE__ */ i(e, {
					src: n.avatarUrl,
					alt: n.displayName,
					cacheSeed: `${n.id}:${n.avatarUrl ?? ""}`,
					className: `dex-avatar ${u ? "dex-avatar--lg" : "dex-avatar--xl"}`,
					fallback: /* @__PURE__ */ i("div", {
						className: `dex-avatar ${u ? "dex-avatar--lg" : "dex-avatar--xl"} dex-avatar-fallback`,
						style: { fontSize: u ? 18 : 20 },
						children: n.displayName.slice(0, 1)
					})
				}), /* @__PURE__ */ a("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ a("div", {
							className: "dex-artist-intel__name-row",
							children: [/* @__PURE__ */ i("span", {
								className: "dex-artist-intel__name",
								children: n.displayName
							}), n.isVerified ? /* @__PURE__ */ i(t, { size: u ? 14 : 16 }) : null]
						}),
						/* @__PURE__ */ i("div", {
							className: "dex-artist-intel__handle",
							children: f
						}),
						/* @__PURE__ */ i("div", {
							className: "dex-artist-intel__status",
							children: n.isVerified ? "STATUS: VERIFIED" : "STATUS: ANALYZED"
						}),
						/* @__PURE__ */ i("div", {
							className: "dex-artist-intel__meta",
							children: n.genres.join(" · ") || "Genre unclassified"
						}),
						n.labelName ? /* @__PURE__ */ a("div", {
							className: "dex-artist-intel__meta",
							children: ["Label: ", n.labelName]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ a("div", {
				className: "dex-artist-intel__network",
				children: [
					/* @__PURE__ */ a("div", {
						className: "dex-stat dex-stat--highlight",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "DB Rank"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: c?.rank ? `#${c.rank}` : "—"
						})]
					}),
					/* @__PURE__ */ a("div", {
						className: "dex-stat dex-stat--highlight",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "DB Score"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(c?.dbScore)
						})]
					}),
					/* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Total Plays"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(c?.totalPlays)
						})]
					}),
					/* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Listeners"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(l?.uniqueListeners)
						})]
					}),
					l ? /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Qualified Plays"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(l.qualifiedPlays)
						})]
					}), /* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Active Likes"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(l.activeLikes)
						})]
					})] }) : null
				]
			}),
			/* @__PURE__ */ a("div", {
				className: "dex-artist-intel__catalog",
				children: [
					/* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Releases"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(d)
						})]
					}),
					/* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Tracks"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(s?.tracks.length)
						})]
					}),
					/* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Popular"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(s?.popular.length)
						})]
					}),
					/* @__PURE__ */ a("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ i("div", {
							className: "dex-stat__label",
							children: "Videos"
						}), /* @__PURE__ */ i("div", {
							className: "dex-stat__value",
							children: o(s?.musicVideos.length)
						})]
					})
				]
			}),
			!u && n.bio ? /* @__PURE__ */ i("p", {
				className: "dex-artist-intel__bio",
				children: n.bio
			}) : null
		]
	});
});
//#endregion
export { s as t };
