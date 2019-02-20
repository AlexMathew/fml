# FANTASY MARBLELYMPICS

Hopefully, will be done before ML2019.

-----

GraphQL query to get all data for authenticated user:

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
          player {
            id
            user {
              id
              username
            }
          }
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
                  player {
                    id
                    user {
                      id
                      username
                    }
                  }
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
              }
            }
          }
        }
      }
    }
  }
}
```
