/**
 * An array of routes accessible to the public
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  // TODO: Add category names here too (fetch them from db)
];

/**
 * An array of routes used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
];

/**
 * The prefix to api auth routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/account";