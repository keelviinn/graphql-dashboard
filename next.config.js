module.exports = {
  env: {
    NEXT_APP_API_URL: NEXT_APP_API_URL === 'DEV' ? 'http://localhost:8080' : 'https://graphql-api-products.herokuapp.com/' ,
    NEXT_WS_API_URL: NEXT_APP_API_URL === 'DEV' ? 'ws://localhost:8080' : 'wss://graphql-api-products.herokuapp.com/'
  },
}