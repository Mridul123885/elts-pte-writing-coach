import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mridul.ieltsptewritingcoach",
  appName: "IELTS & PTE AI Writing Coach",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
