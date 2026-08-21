import { createRemoteJWKSet, jwtVerify } from 'jose';

const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];
const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

/**
 * Verify a Google ID token and confirm it belongs to the allowed Workspace domain.
 *
 * Returns `{ email }` on success, or `{ error, status }` on failure. The token
 * signature is checked against Google's published keys, so a caller cannot forge
 * an identity by editing the JWT payload.
 */
export async function authorize(req) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN;

  if (!clientId || !allowedDomain) {
    return { error: 'Server auth is not configured.', status: 500 };
  }

  const header = req.headers.authorization || req.headers.Authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) {
    return { error: 'Missing credential.', status: 401 };
  }

  let payload;
  try {
    ({ payload } = await jwtVerify(token, JWKS, {
      issuer: GOOGLE_ISSUERS,
      audience: clientId,
    }));
  } catch {
    return { error: 'Invalid or expired credential.', status: 401 };
  }

  // `hd` is the Workspace domain Google itself asserts for the account. Checking
  // the verified email as well means a personal account that merely happens to
  // spell the domain in its address cannot get through.
  const email = typeof payload.email === 'string' ? payload.email.toLowerCase() : '';
  const domainMatches = email.endsWith(`@${allowedDomain.toLowerCase()}`);

  if (!payload.email_verified || !domainMatches || payload.hd !== allowedDomain) {
    return { error: `This app is limited to @${allowedDomain} accounts.`, status: 403 };
  }

  return { email };
}
