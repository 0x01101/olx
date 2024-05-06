/**
 * An array of routes accessible to the public
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/session/new-verification",
  // TODO: Add category names here too (fetch them from db)
];

/**
 * An array of routes used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/session/login",
  "/session/register",
  "/session/error",
  "/session/reset",
  "/session/new-password"
];

/**
 * The prefix to api session routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/session";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/account";