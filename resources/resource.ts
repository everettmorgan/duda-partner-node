import { CallbackFn, Duda, ResponseHandler } from '../base';

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

type SubAction = KeyValue<Action>;

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
    Reflect.ownKeys(this.actions).forEach((action: string) => {
      const _action = this.actions[action];

      this[action] = this.request.bind(this,
        _action.method,
        _action.params,
        this.path + _action.path,
        [...this.pathVars, ..._action.pathVars],
        _action.overrideBody ?? defaultOverride
      );
    });

    if (this.subactions) {
      Reflect.ownKeys(this.subactions).forEach((subaction: string) => {
        this[subaction] = {};

        Reflect.ownKeys(this.subactions[subaction]).forEach((action: string) => {
          const _action = this.subactions[subaction][action];

          this[subaction][action] = this.request.bind(this,
            _action.method,
            _action.params,
            this.path + _action.path,
            [...this.pathVars, ..._action.pathVars],
            _action.overrideBody ?? defaultOverride
          );
        });
      });
    }
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
    if (typeof args === 'function' && !vars.length) {
      const _method = method.toLowerCase();
      return this.duda[_method](path).then(
        (res => ResponseHandler(res, args as CallbackFn))
      );
    }

    vars.forEach((required) => {
      if (!Reflect.has(args, required)) {
        throw new Error(`'${required}' is required to call ${method} ${path}.`);
      }
    })

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

    const _path = interpolate(path, args) + _params;

    if (args) {
      this.excludeFromBody.forEach((exclude: string) => {
        if (Reflect.has(args as object, exclude)) {
          delete args[exclude];
        }
      });
    }

    const body = override(args);

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

const defaultOverride = (args: KeyValue<any>) => args;

function interpolate(str: string, vals: KeyValue<string>) {
  const exp = new RegExp('{[^}]+}', 'g');
  const matches = str.matchAll(exp);
  for (const match of matches) {
    const key = match[0].slice(1, match[0].length - 1);
    str = str.replace(match[0], vals[key]);
  }
  return str;
}

export { Resource };