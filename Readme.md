Installation
To install the dependencies, run:

npm install
Configuration
Create a .env file in the root directory and set the following environment variables:

PORT=3000 # port to run the server on
GNEWS_API_KEY=your-api-key # GNews API key
CACHE_TTL=3600 # cache time-to-live in seconds
Usage
To start the server, run:

npm start
By default, the server will start on port 3000.

Endpoints
GET /news
Returns a list of news articles. You can pass the following query parameters:

q - search query (optional)
lang - language (optional)
country - country (optional)
category - category (optional)
pageSize - number of articles to return (optional, default is 10)
Example:

GET /news?q=technology&lang=en&pageSize=20
GET /news/:id
Returns a news article with the specified ID.

Example:

GET /news/123456
GET /news/search
Searches for news articles. You can pass the following query parameters:

q - search query (required)
Example:

sql
GET /news/search?q=apple