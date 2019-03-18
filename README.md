# FANTASY MARBLELYMPICS

Hopefully, will be done before ML2019.

## GraphQL queries

- To create a new user

```javascript
mutation {
  createPlayer(input: {
    username: "johndoe",
    email: "johndoe@gmail.com",
    password: "password"
  }) {
    player {
      id
      createdAt
      user {
        id
        username
        email
      }
    }
  }
}
```

- To get token for authentication

```javascript
mutation {
  tokenAuth(
    username: "johndoe",
    password: "password"
  ) {
    token
  }
}
```

- To create an entry for an event

```javascript
mutation {
  upsertPlayerEntry(
    input: {
      eventNumber: 3,
      team1: "Savage Speeders",
      team2: "Orangers",
      team3: "Midnight Wisps"
    }
  ) {
    entry {
      id
      event {
        ml {
          year
        }
        number
        name
      }
      player {
        player {
          user {
            username
          }
        }
      }
      selections {
        position
        team {
          name
        }
      }
      points
      rank
    }
  }
}
```

- To get all data for authenticated user

```javascript
query {
  me {
    id
    user {
      id
      username
      email
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
            host {
              id
              name
            }
            teams {
              edges {
                node {
                  id
                  name
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
```
