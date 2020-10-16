import { DevtoolsPluginApi } from '@vue/devtools-api';
interface Logger {
  devtools: null | DevtoolsPluginApi;
  log: (...args: any[]) => void;
}

const logger: Logger = {
  devtools: null,
  log(...args) {
    if (process.env.NODE_ENV === 'development' && this.devtools) {
      this.devtools.addTimelineEvent({
        layerId: 'vune-store',
        event: {
          time: Date.now(),
          data: {
            text: args.map((arg) => JSON.stringify(arg)).join(' '),
          },
          meta: null,
        },
      });
    }
    console.log(...args);
  },
};

export default logger;
