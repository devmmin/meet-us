import { RefreshToken, Role, User } from '@prisma/client';

export enum AuthorizationGrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  IMPLICIT = 'implicit',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_CREDENTIALS = 'client_credentials',
  PASSWORD = 'password',
  JWT_BEARER = 'urn:ietf:params:oauth:grant-type:jwt-bearer',
}

export type Roles = Array<Role>;

/**
 * principal - identifies the user. When authenticating with a username/password this is often an instance of UserDetails.
 * credentials - often a password. In many cases this will be cleared after the user is authenticated to ensure it is not leaked.
 * authorities - the GrantedAuthoritys are high level permissions the user is granted. A few examples are roles or scopes.
 */

export class OAuth2Pricipal {
  constructor(
    private _userId: string,
    private _userName: string,
    private _userEmail: string,
    private _createdAt: Date,
  ) {}
  public get userId() {
    return this._userId;
  }
  public get userName() {
    return this._userName;
  }
  public get userEmail() {
    return this._userEmail;
  }
  public get createdAt() {
    return this._createdAt;
  }
}

export class JwtCredential {
  private _authorizationGrantType: AuthorizationGrantType =
    AuthorizationGrantType.JWT_BEARER;
  constructor(private _accessToken: string, private _refreshToken: string) {}

  public get authorizationGrantType() {
    return this._authorizationGrantType;
  }

  public get accessToken() {
    return this._accessToken;
  }

  public get refreshToken() {
    return this._refreshToken;
  }
}

export class Authority {
  constructor(private _roles: Roles) {}
  public get roles() {
    return this._roles;
  }
  public hasRole(roles: Role[]) {
    let hasRole = false;
    for (const role of roles) {
      if (this.roles.includes(role)) {
        hasRole = true;
        break;
      }
    }
    return hasRole;
  }
}

export class Authentication {
  constructor(
    private _principal: OAuth2Pricipal,
    private _credential: JwtCredential,
    private _authority: Authority,
  ) {}

  public get principal(): OAuth2Pricipal {
    return this._principal;
  }
  public get credential(): JwtCredential {
    return this._credential;
  }
  public get authority(): Authority {
    return this._authority;
  }
}

export class SecurityContext {
  constructor(private _authentication: Authentication) {}
  get authentication() {
    return this._authentication;
  }
  get principal() {
    return this._authentication.principal;
  }

  get credential() {
    return this._authentication.credential;
  }

  get authority() {
    return this._authentication.authority;
  }
}

export function createSecurityContextFactory(
  user: User & { token: RefreshToken },
  accessToken: string,
) {
  // 보안 정보 적재
  const { id, userEmail, userName, createdAt, role, token } = user;
  const { token: refreshToken } = token;
  const principal = new OAuth2Pricipal(id, userName, userEmail, createdAt);
  const credential = new JwtCredential(accessToken, refreshToken);
  const authority = new Authority([role]);
  const authentication = new Authentication(principal, credential, authority);
  const ctx = new SecurityContext(authentication);
  return ctx;
}
