import { DevEnvironment } from "./enviroment.dev";
import { ProdEnvironment } from "./enviroment.prod";

export interface Environment {
  db_uri: string;
}
export function GetEnvironmentVariables(): Environment {
  switch (process.env.NODE_ENV) {
    case "production":
      return ProdEnvironment;
    case "development":
      return DevEnvironment;
    default:
      return DevEnvironment;
  }
}
