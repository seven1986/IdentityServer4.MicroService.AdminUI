import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {

  manager: UserManager = new UserManager({
    authority: environment.IdentityServer.authority,
    client_id: environment.IdentityServer.client_id,
    redirect_uri: location.protocol + "//" + location.host + '/auth-callback',
    post_logout_redirect_uri: location.protocol + "//" + location.host + '/logout-callback',
    response_type: "id_token token",
    scope: "openid profile campaign.core.apis.all campaign.core.identity.all offline_access",
    filterProtocolClaims: true,
    loadUserInfo: true
  });

    userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();

    user: User;

    loggedIn = false;

    authHeaders: Headers;

    constructor(private http: Http) {
       this.manager.getUser().then((user) => {
                if (user) {
                    this.loggedIn = true;
                    this.user = user;
                    this.userLoadededEvent.emit(user);
                }
                else {
                    this.loggedIn = false;
                }
            })
            .catch((err) => {
                this.loggedIn = false;
            });

        this.manager.events.addUserLoaded((user) => {
            this.user = user;
            this.loggedIn = !(user === undefined);
            
        });

        this.manager.events.addUserUnloaded((e) => {
            this.loggedIn = false;
        });

        this.manager.events.addAccessTokenExpiring(function () {
          console.log("token expiring...");
        });
    }

    isLoggedInObs(): Observable<boolean> {
        return Observable.fromPromise(this.manager.getUser()).map<User, boolean>((user) => {
            if (user) {
                return true;
            } else {
                return false;
            }
        });
    }

    clearState() {
        this.manager.clearStaleState().then(function () {
            console.log('clearStateState success');
        }).catch(function (e) {
            console.log('clearStateState error', e.message);
        });
    }

    getUser() {
        this.manager.getUser().then((user) => {
            this.user = user;
            console.log('got user', user);
            this.userLoadededEvent.emit(user);
        }).catch(function (err) {
            console.log(err);
        });
    }

    removeUser() {
        this.manager.removeUser().then(() => {
            this.userLoadededEvent.emit(null);
            console.log('user removed');
        }).catch(function (err) {
            console.log(err);
        });
    }

    startSigninMainWindow() {
        this.manager.signinRedirect({ data: 'some data' }).then(function () {
            console.log('signinRedirect done');
        }).catch(function (err) {
            console.log(err);
        });
    }

    endSigninMainWindow() {
        return this.manager.signinRedirectCallback();
    }

    startSignoutMainWindow() {
        this.manager.getUser().then(user => {
            return this.manager.signoutRedirect({ id_token_hint: user.id_token }).then(resp => {
                console.log('signed out', resp);
                setTimeout(5000, () => {
                    console.log('testing to see if fired...');
                });
            }).catch(function (err) {
                console.log(err);
            });
        });
    };

    endSignoutMainWindow() {
        return this.manager.signoutRedirectCallback();
    };

    /**
     * Example of how you can make auth request using angulars http methods.
     * @param options if options are not supplied the default content type is application/json
     */
    AuthGet(url: string, options?: RequestOptions): Observable<Response> {

        if (options) {
            options = this._setRequestOptions(options);
        }
        else {
            options = this._setRequestOptions();
        }
        return this.http.get(url, options);
    }
    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

        let body = JSON.stringify(data);

        if (options) {
            options = this._setRequestOptions(options);
        }
        else {
            options = this._setRequestOptions();
        }
        return this.http.put(url, body, options);
    }
    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

        if (options) {
            options = this._setRequestOptions(options);
        }
        else {
            options = this._setRequestOptions();
        }
        return this.http.delete(url, options);
    }
    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

        let body = JSON.stringify(data);

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.post(url, body, options);
    }

    private _setAuthHeaders(user: any): void {
        this.authHeaders = new Headers();
        this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
        if (this.authHeaders.get('Content-Type')) {

        } else {
            this.authHeaders.append('Content-Type', 'application/json');
        }
    }

    private _setRequestOptions(options?: RequestOptions) {
        if (this.loggedIn) {
            this._setAuthHeaders(this.user);
        }
        if (options) {
            options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
        } else {
            options = new RequestOptions({ headers: this.authHeaders });
        }

        return options;
    }
}
