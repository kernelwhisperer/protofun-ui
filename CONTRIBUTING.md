# Contributing

## Deployment

After commit & push:

1. Bump

  ```sh
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
