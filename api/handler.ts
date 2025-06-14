// Vercel serverless handler – wraps Express app
// Import the Express app without a file extension so TypeScript
// does not require `allowImportingTsExtensions` in the config.
import app from '../server';
export default app; 