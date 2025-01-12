import { config } from 'dotenv';

if (!process.env.GITHUB) {
  config({
    path: '.env.local',
  });
}

import('./actions').then((p) => {
  p.start();
});
