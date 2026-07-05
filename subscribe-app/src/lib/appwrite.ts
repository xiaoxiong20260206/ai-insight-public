import { Client, Account, Databases, OAuthProvider, Permission, Role, ID, Query } from '@codeflicker/appwrite';
import { handleOAuth2Token } from '@codeflicker/appwrite';

const DATABASE_ID = 'subscribers';
const TABLE_ID = 'daily_subscribers';
const PROJECT_ID = 'aidailyinsight';

export const client = new Client()
  .setEndpoint(location.origin + '/v1')
  .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export { DATABASE_ID, TABLE_ID, Permission, Role, ID, Query, OAuthProvider, handleOAuth2Token };
