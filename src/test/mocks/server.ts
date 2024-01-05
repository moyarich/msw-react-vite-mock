import { setupServer } from "msw/node";
import { graphqlHandlers } from "./mockGraphQL";
import { restHandlers } from "./mockRest";

export const server = setupServer(...restHandlers, ...graphqlHandlers);
