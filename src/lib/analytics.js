import Config from 'config'; // eslint-disable-line
import Debug from 'debug';

const debug = Debug('all-lunches:lib:analytics');

export const trackEvent = (event, properties) => {
  if (!Config.isAnalyticsEnabled) return;
  try {
    window.analytics.track(event, properties);
  } catch (e) {
    debug('Error received', e);
  }
};
