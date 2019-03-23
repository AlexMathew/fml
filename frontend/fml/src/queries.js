import gql from "graphql-tag";

export const LOGIN_QUERY = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const ME_QUERY = gql`
  query {
    me {
      id
      user {
        id
        username
      }
      createdAt
      marblelympicsParticipated(marblelympics_Active: true) {
        edges {
          node {
            id
            points
            rank
            marblelympics {
              id
              year
              playerCount
              host {
                id
                name
              }
              teams {
                edges {
                  node {
                    id
                    name
                    cdnImage
                  }
                }
              }
              events {
                edges {
                  node {
                    id
                    ml {
                      year
                    }
                    number
                    name
                    entryCount
                    status
                  }
                }
              }
            }
            eventEntries {
              edges {
                node {
                  id
                  player {
                    id
                  }
                  event {
                    id
                    ml {
                      year
                    }
                    number
                    name
                  }
                  points
                  rank
                  selections {
                    position
                    team {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
