import * as Sentry from 'sentry-expo';

if (__DEV__) {
  window.Sentry = {
      captureException: args => console.log('captureException - dev - ', args)
  };
} else {
  Sentry.init({
    dsn: "https://fc040fe4bb6243ea958f9deef17affd7@o938047.ingest.sentry.io/5888190",
  });
  window.Sentry = Sentry.Native;
}