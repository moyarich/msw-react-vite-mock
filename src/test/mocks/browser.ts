/**
 * @see https://mswjs.io/docs/api/setup-worker/start/
 * @see https://github.com/iodigital-com/vite-plugin-msw/tree/main/examples/with-vite-browser/mocks
 */

import { setupWorker } from "msw/browser";
import { graphqlHandlers } from "./mockGraphQL";
import { restHandlers } from "./mockRest";

export const worker = setupWorker(...restHandlers, ...graphqlHandlers);

export const enableMocking = async () => {
  if (process.env.NODE_ENV !== "development") {
    console.warn("MSW - service worker stated in non-development environment");
  }
  await worker.start();
  return worker;
};
