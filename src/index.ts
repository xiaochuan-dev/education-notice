import { config } from 'dotenv';
config({
  path: '.env.local',
});

import('./actions').then(p => {
  p.start();
});
