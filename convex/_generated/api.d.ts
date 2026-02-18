/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as agentActivity from "../agentActivity.js";
import type * as blogs from "../blogs.js";
import type * as briefs from "../briefs.js";
import type * as http from "../http.js";
import type * as pitchBookings from "../pitchBookings.js";
import type * as questions from "../questions.js";
import type * as toolOpportunities from "../toolOpportunities.js";
import type * as topicClusters from "../topicClusters.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  agentActivity: typeof agentActivity;
  blogs: typeof blogs;
  briefs: typeof briefs;
  http: typeof http;
  pitchBookings: typeof pitchBookings;
  questions: typeof questions;
  toolOpportunities: typeof toolOpportunities;
  topicClusters: typeof topicClusters;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
