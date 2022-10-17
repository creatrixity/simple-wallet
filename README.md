# Simple-Wallet

Simple-Wallet is a sample code project displaying how to use [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) along with the Strategy pattern to build well-structured applications in Node.js.

## Setup

To setup this application, install the required packages via NPM:

```bash
npm install
```

This application has Redis and Memcached as service dependencies. Run Docker containers for `Redis` and `Memcached`:

```sh
# We need to create an isolated bridge network to allow us connect to our instances
docker create network simple-wallet-network --driver bridge
docker pull redis:alpine memcached:alpine
docker run --name simple-wallet-redis -d -p 6379:6379 redis:alpine
docker run --name simple-wallet-memcached -d -p 11211:11211 memcached:alpine
```
