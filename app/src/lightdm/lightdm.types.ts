export interface LightDMUser {
  name: string;
  display_name: string;
  image?: string;
}

export interface LightDMSession {
  key: string;
  name: string;
}

export interface LightDM {
  users: LightDMUser[];
  sessions: LightDMSession[];
  authentication_user?: string;
  authenticate: (user: string) => void;
  cancel_authentication: () => void;
}
