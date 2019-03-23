import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $password: String!) {
    createPlayer(input: { username: $username, password: $password }) {
      player {
        id
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

export const EVENT_ENTRY_MUTATION = gql`
  mutation EventEntryMutation(
    $eventNumber: Int!
    $team1: String!
    $team2: String!
    $team3: String!
  ) {
    upsertPlayerEntry(
      input: {
        eventNumber: $eventNumber
        team1: $team1
        team2: $team2
        team3: $team3
      }
    ) {
      entry {
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
