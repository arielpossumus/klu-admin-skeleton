/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT?: string;
  readonly VITE_BASE_URL?: string;
  readonly VITE_TOKENER_BASE_URL?: string;
  readonly VITE_TOKENER_API_URL_LOGOUT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "mfe_pos_health/RemoteApp" {
  import type { FC } from "react";
  const RemoteApp: FC;
  export default RemoteApp;
}

declare module "mfe_entity/RemoteApp" {
  import type { FC } from "react";
  const RemoteApp: FC;
  export default RemoteApp;
}

declare module "mfe_login/RemoteApp" {
  import type { FC } from "react";
  const RemoteApp: FC;
  export default RemoteApp;
}

declare module "mfe_login/LoginStyles" {}

declare module "mfe_dashboard/RemoteApp" {
  import type { FC } from "react";
  const RemoteApp: FC;
  export default RemoteApp;
}
