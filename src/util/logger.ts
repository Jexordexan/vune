import { DevtoolsPluginApi } from '@vue/devtools-api';
interface Logger {
  devtools: null | DevtoolsPluginApi;
  log: (...args: any[]) => void;
}

const logger: Logger = {
  devtools: null,
  log(...args) {
    if (this.devtools) {
      this.devtools.addTimelineEvent({
        all: true,
        layerId: 'vune-store',
        event: {
          time: Date.now(),
          data: [...args],
          meta: null,
        },
      });
    }
    console.log(...args);
  },
};

export default logger;
