/**
 * https://raw.githubusercontent.com/mswjs/mswjs.io/a6b016d67677b77b0400f22c33c659449d6114a6/src/content/docs/network-behavior/graphql.mdx
 * https://github.com/vitest-dev/vitest/blob/c946b1c841c04f27f026c2b10b7b8f16ac12ceab/docs/guide/mocking.md?plain=1#L372
 */

import { HttpResponse, http } from "msw";

const posts = [
  {
    userId: 1,
    id: 1,
    title: "first post title",
    body: "first post body",
  },
  {
    userId: 2,
    id: 2,
    title: "second post title",
    body: "second post body",
  },
  {
    userId: 3,
    id: 3,
    title: "third post title",
    body: "third post body",
  },
  {
    userId: 4,
    id: 4,
    title: "fourth post title",
    body: "fourth post body",
  },
  {
    userId: 5,
    id: 5,
    title: "fifth post title",
    body: "fifth post body",
  },
  {
    userId: 6,
    id: 6,
    title: "sixth post title",
    body: "sixth post body",
  },
  // ... (you can continue adding more entries as needed)
];

export const restHandlers = [
  http.get("/fake-api/posts", () => {
    // Response resolver allows you to react to captured requests,
    // respond with mock responses or passthrough requests entirely.
    // let's just print a message to the console.
    console.log('Captured a "GET /posts" request');

    // Construct a JSON response with the list of all posts
    // as the response body.
    return HttpResponse.json(posts);
  }),
  http.get("fake-api/user", () => {
    return HttpResponse.json({
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];
