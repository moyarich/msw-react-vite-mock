import { graphql as executeGraphQL, buildSchema, GraphQLSchema } from "graphql";
import { graphql as mswGraphql, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Define the GraphQL schema
const schema: GraphQLSchema = buildSchema(`
  type Post {
    id: ID!
    title: String!
  }

  type Query {
    posts: [Post!]
  }

  type Mutation {
    createPost(post: PostInput!): Post!
    deletePost(postId: ID!): Post!
  }

  input PostInput {
    id: ID!
    title: String!
  }
`);

// Represent the list of all posts in a Map.
const allPosts = new Map([
  [
    "e82f332c-a4e7-4463-b440-59bc91792634",
    {
      id: "e82f332c-a4e7-4463-b440-59bc91792634",
      title: "Introducing a new JavaScript runtime",
    },
  ],
  [
    "64734573-ce54-435b-8528-106ac03a0e11",
    {
      id: "64734573-ce54-435b-8528-106ac03a0e11",
      title: "Common software engineering patterns",
    },
  ],
]);

export const graphqlHandlers = [
  mswGraphql.query("ListPosts", async ({ query, variables }) => {
    const { errors, data } = await executeGraphQL({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        posts: Array.from(allPosts.values()),
      },
    });

    return HttpResponse.json({ errors, data });
  }),

  mswGraphql.mutation("CreatePost", async ({ variables }) => {
    const { post } = variables;
    const { errors, data } = await executeGraphQL({
      schema,
      source: `
        mutation ($post: PostInput!) {
          createPost(post: $post) {
            id
            title
          }
        }
      `,
      variableValues: { post },
      rootValue: {
        createPost: (post) => {
          allPosts.set(post.id, post);
          return post;
        },
      },
    });

    return HttpResponse.json({ errors, data });
  }),

  mswGraphql.mutation("DeletePost", async ({ variables }) => {
    const { postId } = variables;
    const { errors, data } = await executeGraphQL({
      schema,
      source: `
        mutation ($postId: ID!) {
          deletePost(postId: $postId) {
            id
            title
          }
        }
      `,
      variableValues: { postId },
      rootValue: {
        deletePost: (id) => {
          const deletedPost = allPosts.get(id);

          if (!deletedPost) {
            throw new Error(`Cannot find post with ID "${id}"`);
          }

          allPosts.delete(id);
          return deletedPost;
        },
      },
    });

    return HttpResponse.json({ errors, data });
  }),
  mswGraphql.query("ListMovies", () => {
    return HttpResponse.json({
      data: {
        movies: [
          {
            title: "The Lord of The Rings",
          },
          {
            title: "The Matrix",
          },
          {
            title: "Star Wars: The Empire Strikes Back",
          },
        ],
      },
    });
  }),
];
