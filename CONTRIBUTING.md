# Contributing

## Deployment

After commit & push:

1. Bump

  ```sh
  # Update sdk if needed
  #
  yarn version
  ```

2. Push a new container

  ```sh
  # Update NEXT_PUBLIC_PROTOFUN_SERVICE in .env.local
  #
  yarn docker:build
  yarn docker:run # to test
  yarn docker:tag
  yarn docker:push
  # or 
  yarn deploy
  ```

3. Update the server

  ```sh
  cd repos/protofun-indexer && docker pull danielconstantin/protofun-ui:latest && make start-graph-node
  ```

## Updating sdks

```sh
yarn add protofun-service@http://localhost:3030/protofun-service-0.0.5.tgz
yarn add protofun-service@https://service.protocol.fun/protofun-service-0.0.5.tgz
```
