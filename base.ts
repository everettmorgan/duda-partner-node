import * as https from 'https';

import { Collection } from './resources/collection';
import { Reporting } from './resources/reporting';
import { Template } from './resources/template';
import { Account } from './resources/account';
import { URLRule } from './resources/urlrules';
import { Content } from './resources/content';
import { Other } from './resources/other';
import { Page } from './resources/page';
import { Site } from './resources/site';

interface CallbackFn {
  (error: string, response: any): any;
}

enum APIEnvironments {
  Direct = 'api.duda.co',
  Sandbox = 'api-sandbox.duda.co',
  EU = 'eu-sandbox.duda.co',
}

interface AppStoreConstructor {
  environment: APIEnvironments;
  username?: string;
  password?: string;
}

interface Response {
  status: number;
  response: any;
}

class Duda {
  private environment: APIEnvironments;
  private username: string;
  private password: string;
  private basePath: string;

  readonly sites: Site;
  readonly pages: Page;
  readonly content: Content;
  readonly accounts: Account;
  readonly templates: Template;
  readonly urlRules: URLRule;
  readonly collections: Collection;
  readonly reporting: Reporting;
  readonly other: Other;

  constructor(opts: AppStoreConstructor) {
    this.environment = (opts && opts.environment) ?? APIEnvironments.Direct;
    this.username = (opts && opts.username) ?? process.env.DUDA_API_USER;
    this.password = (opts && opts.password) ?? process.env.DUDA_API_PASS;
    
    this.basePath = '/api';
    
    this.sites = new Site(this);
    this.pages = new Page(this);
    this.other = new Other(this);
    this.content = new Content(this);
    this.urlRules = new URLRule(this);
    this.accounts = new Account(this);
    this.templates = new Template(this);
    this.reporting = new Reporting(this);
    this.collections = new Collection(this);
  }

  private async request(
    method: string, 
    path: string, 
    body?: any
  ): Promise<Response> {
    const _body = body ? JSON.stringify(body) : null;

    return new Promise((resolve, reject) => {
      const req = https.request({
        method: method,
        host: this.environment,
        path: this.basePath + path,
        auth: this.username + ':' + this.password,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(_body && { 'Content-Length': _body.length })
        }
      }, function (res) {
        let data = '';

        res.on('data', function (d) {
          data += d;
        });

        res.on('error', function(e) {
          console.log(e);
          reject(e);
        });

        res.on('end', function () {
          resolve({
            status: res.statusCode,
            response: parseResponse(data)
          })
        });
      })
      
      if (_body) {
        req.write(_body);
      }

      req.end();
    })
  }

  async get(path: string) {
    return this.request('GET', path);
  }

  async post(path: string, body: any) {
    return this.request('POST', path, body);
  }

  async put(path: string, body: any) {
    return this.request('PUT', path, body);
  }

  async delete(path: string, body: any) {
    return this.request('DELETE', path, body);
  }
}

function ResponseHandler(res: Response, cb?: CallbackFn) {
  if (Ok(res)) {
    if (!cb) {
      return res.response;
    }
    cb(null, res.response);
  } else {
    if (!cb) {
      throw res.response;
    }
    cb(res.response, null);
  }
}

function Ok(res: Response) {
  return (res.status >= 200 && res.status < 400);
}

function parseResponse(data: string) {
  try {
    return JSON.parse(data);
  } catch(err) {
    return data;
  }
}

export { Duda as default, Duda, APIEnvironments as Envs, CallbackFn, ResponseHandler };