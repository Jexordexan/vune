import { DevtoolsPluginApi } from '@vue/devtools-api';
import { getCurrentActions } from '../globals';
interface Logger {
  devtools: null | DevtoolsPluginApi;
  log: (...args: any[]) => void;
}

const logger: Logger = {
  devtools: null,
  log(data: any) {
    if (process.env.NODE_ENV === 'development' && this.devtools) {
      const actions = Array.from(getCurrentActions().values()).map((a) => a.path);
      const groupId = actions?.[0];
      this.devtools.addTimelineEvent({
        layerId: 'vune-store',
        event: {
          time: Date.now(),
          title: data.type,
          subtitle: data.path,
          groupId,
          data,
          meta: null,
        },
      });
    }
  },
};

export default logger;
