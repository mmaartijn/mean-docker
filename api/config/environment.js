let uri = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@`;
uri += process.env.MONGO_DB_HOST;

if (process.env.MONGO_DB_PORT) {
  uri += `:${process.env.MONGO_DB_PORT}`;
}

uri += `/${process.env.MONGO_DB_DATABASE}${process.env.MONGO_DB_PARAMETERS}`;

module.exports = {
  mongodb: { uri },
  secret: process.env.SECRET
};
