# gatsby-transformer-docutils

Parses docutils files. It also supports attributes


## How to use

for now 
- run npm install
- npm run-script build
- copy the content of the folder to the node_modules of you gastby site 

```javascript
// In your gatsby-config.js, if the docutils files are on the data folder
module.exports = {
    ...,
    plugins: [
        `gatsby-transformer-docutils`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `docs`,
                path: `${__dirname}/src/data`,
            },
        },
    ]
}
```

## How to query

You'd be able to query your books like:

```graphql
query MyQuery {
  allDocutils {
    edges {
      node {
        id
        attributes {
          source
        }
      }
    }
  }
}
```

Which would return:

```json
{
    "data": {
        "allDocutils": {
            "edges": [
                {
                    "node": {
                        "id": "af57adc3-43ab-5d74-bd65-f48589104cf6",
                        "attributes": {
                            "source": ".../source/example-integrations.md"
                        }
                    }
                },
                {
                    "node": {
                        "id": "7a173c7b-58e6-59a0-a0f0-8c7e46bc79c4",
                        "attributes": {
                            "source": ".../source/overview.md"
                        }
                    }
                },
                {
                    "node": {
                        "id": "8c271266-4455-5879-a401-1ff2a4c97744",
                        "attributes": {
                            "source": ".../source/third-party-integrations.md"
                        }
                    }
                },
                {
                    "node": {
                        "id": "0b5508b3-e846-5205-ac3e-a7016b7e774b",
                        "attributes": {
                            "source": ".../source/features/access-logger.md"
                        }
                    }
                }
            ]
        }
    }
}
        
```
