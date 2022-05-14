/* eslint-disable no-unused-expressions */
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Config from 'config'; // eslint-disable-line

const SENTRY_DSN_URL = 'https://818aea15606b4ae0943251c4b773efb7@o237669.ingest.sentry.io/6403060';

Config.isAnalyticsEnabled &&
  Sentry.init({
    dsn: SENTRY_DSN_URL,
    environment: Config.environment,
    integrations: [
      new Integrations.CaptureConsole({
        levels: ['error'],
      }),
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  });

export default Sentry;
