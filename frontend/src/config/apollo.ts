import { ApolloClient, InMemoryCache, from, ApolloLink, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { logout } from "../util";

// ref : https://www.apollographql.com/docs/react/networking/advanced-http-networking
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("access-token") || null,
    }
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "https://meet-us-api.byeonggi.synology.me/graphql",
});

// ref: https://www.apollographql.com/docs/react/api/link/apollo-link-error
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if (graphQLErrors.length && graphQLErrors[0].message === "Unauthorized Exception") {
      logout("loginRequire=1");
    }
    // graphQLErrors.forEach(({ message, locations, path }) => {
    //   console.log(
    //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    //   );
    // });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// ref: https://www.apollographql.com/docs/react/api/link/introduction/
const client = new ApolloClient({
  link: from([authMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
