import { Store } from "./StoreType";

export type User = {
  username: string;
  email: string;
  store: Store;
  access_token: string;
};
