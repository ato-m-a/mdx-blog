import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const applyPathResolve = (config, options) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '.');
  config.resolve.alias['@trpc.server'] = path.resolve(__dirname, '../../common/trpc/server.ts');
  config.resolve.alias['@trpc.client'] = path.resolve(__dirname, '../../common/trpc/client.ts');
  config.resolve.alias['@trpc.lib'] = path.resolve(__dirname, '../../common/trpc/lib/index.ts');

  return config;
};

export default applyPathResolve;