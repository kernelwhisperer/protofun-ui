# Contributing

## Deployment

After commit & push:

1. Push a new container

  ```sh
  yarn docker:build
  yarn docker:run # to test
  yarn docker:tag
  yarn docker:push
  ```

2. Update the server

  ```sh
  make start-graph-node
  ```
