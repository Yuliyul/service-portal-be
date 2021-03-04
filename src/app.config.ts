import { get } from 'env-var';

export function appConfig() {
  return {
    port: get('PORT').required().asPortNumber(),
    apiDocPath: get('API_DOC_PATH').default('api').asString(),
    mongodb: {
      uri: get('MONGO_URI').required().asString(),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  };
}
