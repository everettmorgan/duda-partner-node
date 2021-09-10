import { CallbackFn, Duda, ResponseHandler } from '../base';

const defaultOverride = (args: KeyValue<any>) => args;

type Method = "GET" | "PUT" | "POST" | "DELETE";

type Params = KeyValue<{
  alias?: string;
  required: boolean;
}>;

type Action = KeyValue<{
  path: string;
  method: Method;
  params?: Params;
  pathVars: string[];
  overrideBody?: OverrideFn;
}>;

type SubAction = KeyValue<Action | KeyValue<Action | any>>;

interface KeyValue<T> {
  [key: string]: T;
};

interface OverrideFn {
  (args: KeyValue<any>);
};

class Resource {
  protected path: string;
  protected actions: Action
  protected pathVars: string[];
  protected subactions?: SubAction;
  protected excludeFromBody: string[];

  protected duda: Duda;

  constructor(duda: Duda) {
    this.duda = duda;
  }

  protected init() {
    Reflect.ownKeys(this.actions).forEach((key: string) => {
      this[key] = this._bind(this.actions[key]);
    });

    if (this.subactions) {
      Reflect.ownKeys(this.subactions).forEach((key: string) => {
        this[key] = {};
        this._follow(this[key], this.subactions[key]);
      });
    }
  }

  private _bind(action) {
    return this.request.bind(this,
      action.method,
      action.params,
      this.path + action.path,
      [...this.pathVars, ...action.pathVars],
      action.overrideBody ?? defaultOverride
    )
  }

  private _follow(parent, objs) {
    Reflect.ownKeys(objs).forEach((obj: string) => {
      if (!isAction(objs[obj])) {
        parent[obj] = {};
        this._follow(parent[obj], objs[obj]);
      } else {
        parent[obj] = this._bind(objs[obj]);
      }
    })
  }

  protected request(
    method: Method,
    params: Params,
    path: string,
    vars: string[],
    override: OverrideFn,
    args: KeyValue<any>,
    cb?: CallbackFn
  ) {
    // enabled methods to be called without args: method(function() { ... }).
    if (typeof args === 'function' && !vars.length) {
      const _method = method.toLowerCase();
      return this.duda[_method](path).then(
        (res => ResponseHandler(res, args as CallbackFn))
      );
    }

    // ensure all required variables are present in args.
    vars.forEach((required) => {
      if (!Reflect.has(args, required)) {
        throw new Error(`'${required}' is required to call ${method} ${path}.`);
      }
    })

    // ensure all required parameters are present and concatenate.
    let _params = '?';

    if (params) {
      Reflect.ownKeys(params).forEach((param: string) => {
        if (params[param].required && !args[param]) {
          throw new Error(`${param} required to call ${method} ${path}.`);
        }
        if (args && Reflect.has(args as object, param)) {
          _params += `${params[param].alias ?? param}=${args[param]}&`;
        }
      });
    }

    // interpolate the path and append URL params
    const _path = interpolate(path, args) + _params;

    // remove unwanted keys from request body
    if (args) {
      this.excludeFromBody.forEach((exclude: string) => {
        if (Reflect.has(args as object, exclude)) {
          delete args[exclude];
        }
      });
    }

    // apply any request body overrides, otherwise, just use args.
    const body = override(args);

    // determine method and send off the request
    switch (method) {
      case 'GET':
        return this.duda.get(_path).then(
          (res) => ResponseHandler(res, cb)
        );
      case 'PUT':
        return this.duda.put(_path, body).then(
          (res) => ResponseHandler(res, cb)
        );
      case 'POST':
        return this.duda.post(_path, body).then(
          (res) => ResponseHandler(res, cb)
        );
      case 'DELETE':
        return this.duda.delete(_path, body).then(
          (res) => ResponseHandler(res, cb)
        );
    }
  }
}

function interpolate(str: string, vals: KeyValue<string>) {
  const exp = new RegExp('{[^}]+}', 'g');
  const matches = str.matchAll(exp);
  for (const match of matches) {
    const key = match[0].slice(1, match[0].length - 1);
    str = str.replace(match[0], vals[key]);
  }
  return str;
}

function isAction(a): a is Action {
  return 'path' in a && 'method' in a && 'pathVars' in a;
}

export { Resource };