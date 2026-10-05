import { REGION_VISUAL_IDENTITIES } from "../../data/vaeloria/index.js";

export function regionVisualIdentityFor(c){const r=String(c?.birthRegion||'').trim();return REGION_VISUAL_IDENTITIES[r]?REGION_VISUAL_IDENTITIES[r].slice():[]}
