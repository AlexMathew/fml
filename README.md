# FANTASY MARBLELYMPICS

Hopefully, will be done before [ML2019](https://www.youtube.com/playlist?list=PLSmWeUDtr9fDKXL0UDaCEFxkb9fbQEOZH).

This + [this](https://github.com/AlexMathew/fml-ui) = [this](https://onedrive.live.com/?cid=f23d126a9f095242&id=F23D126A9F095242%212770&ithint=video,mp4&authkey=!AHMvhbkj8PZN6kc)

## GraphQL queries

- To create a new user

```javascript
mutation {
  createPlayer(input: {
    username: "johndoe",
    password: "password"
  }) {
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
