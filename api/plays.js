import { authorize } from './_auth.js';
import { PLAYS } from './_data/plays.js';

/**
 * The script library. Served only to verified Workspace accounts — the play text
 * is deliberately not part of the client bundle, so an unauthenticated visitor
 * cannot read it out of the served JavaScript.
 */
export default async function handler(req, res) {
  const auth = await authorize(req);
  if (auth.error) {
    res.status(auth.status).json({ error: auth.error });
    return;
  }

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ plays: PLAYS, email: auth.email });
}
