import { DevtoolsPluginApi } from '@vue/devtools-api';
interface Logger {
  devtools: null | DevtoolsPluginApi;
  log: (...args: any[]) => void;
}

const logger: Logger = {
  devtools: null,
  log(data: any) {
    if (process.env.NODE_ENV === 'development' && this.devtools) {
      this.devtools.addTimelineEvent({
        layerId: 'vune-store',
        event: {
          time: Date.now(),
          data,
          meta: null,
        },
      });
    }
  },
};

export default logger;
