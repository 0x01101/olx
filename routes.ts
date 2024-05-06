/**
 * An array of routes accessible to the public
 * @type {string[]}
 */
export const privateRoutes: string[] = [
  "/server",
  "/account",
];

/**
 * An array of routes used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix to api session routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/account";