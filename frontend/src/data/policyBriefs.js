// Policy brief content now lives in the backend database (policy_briefs
// table), managed via the admin app. This file only keeps the shared theme
// taxonomy re-exported from research.js.
import { RESEARCH_THEMES } from "./research"

export { RESEARCH_THEMES as BRIEF_THEMES }
