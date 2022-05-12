import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'apiAppIonic',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    allowNavigation: ['10.0.0.104']
  }
};

export default config;
