import { a as e } from "./dex-client-D9KjXfbW.js";
import { t } from "./DexSkeleton-C8SxNkcP.js";
import { n, t as r } from "./DexVerifiedBadge-CD-khm_g.js";
import { t as i } from "./EmptySignal-DoKFuov_.js";
import { t as a } from "./use-dex-identity-query-DcNZblV1.js";
import { memo as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { motion as l } from "framer-motion";
//#region src/components/modules/identity/IdentityPanel.tsx
function u(e) {
	return e ? new Intl.DateTimeFormat(void 0, {
		month: "short",
		year: "numeric"
	}).format(new Date(e)) : "—";
}
function d(e, t) {
	return t <= 0 ? 0 : Math.min(100, Math.round(e / t * 100));
}
var f = o(function() {
	let { data: o, isLoading: f, isError: m } = a(), h = e((e) => e.setActiveModule), g = o?.profile;
	if (f) return /* @__PURE__ */ s(t, { lines: 10 });
	if (m || !g) return /* @__PURE__ */ s(i, {
		title: "Identity signal offline",
		message: "Sign in to sync your operator identity, DB rank, and network credentials.",
		code: "ID_NULL"
	});
	let _ = g.username ? `@${g.username}` : `@${g.userId.slice(-8)}`, v = d(g.xp.current, g.xp.target);
	return /* @__PURE__ */ c(l.div, {
		className: "dex-now-playing",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		children: [
			/* @__PURE__ */ s("button", {
				type: "button",
				className: "dex-interactive dex-btn-back",
				onClick: () => h(null),
				children: "← Modules"
			}),
			/* @__PURE__ */ s("div", {
				className: "dex-section-label",
				children: "Identity Matrix"
			}),
			/* @__PURE__ */ c("div", {
				className: "dex-panel dex-identity-hero",
				children: [
					/* @__PURE__ */ c("div", {
						className: "dex-identity-hero__avatar-shell",
						children: [/* @__PURE__ */ s("div", {
							className: "dex-identity-hero__ring",
							style: { "--dex-xp": `${v}%` },
							"aria-hidden": !0
						}), /* @__PURE__ */ s(n, {
							src: g.avatarUrl,
							alt: g.name,
							cacheSeed: `${g.userId}:${g.avatarUrl ?? ""}`,
							className: "dex-avatar dex-avatar--identity",
							fallback: /* @__PURE__ */ s("div", {
								className: "dex-avatar dex-avatar--identity dex-avatar-fallback",
								style: { fontSize: 36 },
								children: g.name.slice(0, 1)
							})
						})]
					}),
					/* @__PURE__ */ c("div", {
						className: "dex-identity-hero__name-row",
						children: [/* @__PURE__ */ s("span", {
							className: "dex-identity-hero__name",
							children: g.name
						}), g.isVerified ? /* @__PURE__ */ s(r, { size: 18 }) : null]
					}),
					/* @__PURE__ */ s("div", {
						className: "dex-artist-intel__handle",
						children: _
					}),
					/* @__PURE__ */ s("div", {
						className: "dex-artist-intel__status",
						children: g.isVerified ? "STATUS: VERIFIED" : "STATUS: ONLINE"
					}),
					/* @__PURE__ */ s("div", {
						className: "dex-identity-hero__role",
						children: g.role
					})
				]
			}),
			/* @__PURE__ */ c("div", {
				className: "dex-artist-intel__network",
				children: [
					/* @__PURE__ */ c("div", {
						className: "dex-stat dex-stat--highlight",
						children: [/* @__PURE__ */ s("div", {
							className: "dex-stat__label",
							children: "DB Rank"
						}), /* @__PURE__ */ s("div", {
							className: "dex-stat__value",
							children: g.rank
						})]
					}),
					/* @__PURE__ */ c("div", {
						className: "dex-stat dex-stat--highlight",
						children: [/* @__PURE__ */ s("div", {
							className: "dex-stat__label",
							children: "DB Score"
						}), /* @__PURE__ */ s("div", {
							className: "dex-stat__value",
							children: g.dbScore.toLocaleString()
						})]
					}),
					/* @__PURE__ */ c("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ s("div", {
							className: "dex-stat__label",
							children: "Level"
						}), /* @__PURE__ */ c("div", {
							className: "dex-stat__value",
							children: ["Lv ", g.level]
						})]
					}),
					/* @__PURE__ */ c("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ s("div", {
							className: "dex-stat__label",
							children: "Total Plays"
						}), /* @__PURE__ */ s("div", {
							className: "dex-stat__value",
							children: g.totalPlays.toLocaleString()
						})]
					}),
					/* @__PURE__ */ c("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ s("div", {
							className: "dex-stat__label",
							children: "Badges"
						}), /* @__PURE__ */ s("div", {
							className: "dex-stat__value",
							children: g.badgeCount
						})]
					}),
					/* @__PURE__ */ c("div", {
						className: "dex-stat",
						children: [/* @__PURE__ */ s("div", {
							className: "dex-stat__label",
							children: "Achievements"
						}), /* @__PURE__ */ s("div", {
							className: "dex-stat__value",
							children: g.achievementCount
						})]
					})
				]
			}),
			/* @__PURE__ */ c("div", {
				className: "dex-panel dex-identity-xp",
				children: [/* @__PURE__ */ c("div", {
					className: "dex-identity-xp__label",
					children: [/* @__PURE__ */ s("span", { children: "XP SYNC" }), /* @__PURE__ */ c("span", { children: [
						g.xp.current.toLocaleString(),
						" / ",
						g.xp.target.toLocaleString()
					] })]
				}), /* @__PURE__ */ s("div", {
					className: "dex-identity-xp__bar",
					children: /* @__PURE__ */ s("div", {
						className: "dex-identity-xp__fill",
						style: { width: `${v}%` }
					})
				})]
			}),
			/* @__PURE__ */ c("div", {
				className: "dex-panel dex-identity-fields",
				children: [
					/* @__PURE__ */ s(p, {
						label: "Email",
						value: g.email ?? "—"
					}),
					/* @__PURE__ */ s(p, {
						label: "Organization",
						value: g.orgLabel ?? "—"
					}),
					/* @__PURE__ */ s(p, {
						label: "Member Since",
						value: u(g.memberSince)
					}),
					g.bio ? /* @__PURE__ */ s(p, {
						label: "Bio",
						value: g.bio,
						multiline: !0
					}) : null,
					o.authorization.isSuperAdmin ? /* @__PURE__ */ s("div", {
						className: "dex-identity-admin",
						children: "ADMIN CLEARANCE · ACTIVE"
					}) : null
				]
			})
		]
	});
});
function p({ label: e, value: t, multiline: n }) {
	return /* @__PURE__ */ c("div", {
		className: "dex-identity-field",
		children: [/* @__PURE__ */ s("div", {
			className: "dex-identity-field__label",
			children: e
		}), /* @__PURE__ */ s("div", {
			className: n ? "dex-identity-field__value dex-identity-field__value--multiline" : "dex-identity-field__value",
			children: t
		})]
	});
}
//#endregion
export { f as IdentityPanel };
