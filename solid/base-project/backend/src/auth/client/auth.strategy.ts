export interface Authenticator<Req = any, Res = any> {
  doAuth(request: Req): Res | Promise<Res>;
}
