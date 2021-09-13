# Contributing

## Overview

This package was designed to enable future developers to clearly, and consicely, extend the available resources and methods without worrying about the underlying technologies. At it's core, the package consists of two main classes: `Duda` and `Resource`, and two helpful objects: `Envs` and `Types`.

### Envs

An object that contains all of Duda's API environment and their respective base URLs.

### Types

An object that contains all of the Types defined for this package.

### Duda

The `Duda` class is both the default and a named export of the package. It houses all of the defined API resources and their associated methods. 

### Resource

The `Resource` class is private and used to define new API resources to house under the `Duda` class. A `Resource` is comprised of several values that are used to inform it of it's core actions and sub-actions, base path and path variables, and what to exclude from the request body. 

#### `path`

The base path of a Resource.

e.g. 
```javascript
{
  path: '/templates'
}
```

#### `pathVars`

An array of variables that are expected in the path.

e.g.
```javascript
{
  path: '/templates/{template_id}',
  pathVars: ['template_id']
}
```

#### `actions`

An object that contains all of the Resource's methods and the underlying configuration for each. It has several values that are available to define the method.

- `actions[key]`: the name of the method that's accessed by developers
- `actions[key].method`: the REST method used
- `actions[key].path`: the path of the method, relative to the Resource's own base path
- `actions[key].pathVars`: an array of the expected path variables
- `actions[key].params`: an object containing the available URL parameters
- `actions[key].overrideBody`: a function to form the request body before send

e.g.
```javascript
{
  path: '/templates',
  pathVars: [],

  actions: {
    'get': {
      method: 'GET',
      path: '/{template_id}',
      pathVars: ['template_id']
      params: {
        lang: {
          required: false;
        }
      },
      overrideBody: () => { /* not applicable */ }
    }
  }
}

// result: duda.templates.get({ template_id: 123456, lang: 'en' });
```

#### `subactions`

An object that contians all of the Resource's sub-resources and methods. For example, the Account resource has two sub-resources under it: permissions and authentication.  

A sub-action has an identical structure to an `action`.

e.g.
```javascript
{
  path: '/templates',
  pathVars: [],

  actions: {
    'get': {
      method: 'GET',
      path: '/{template_id}',
      pathVars: ['template_id']
      params: {
        lang: {
          required: false;
        }
      },
      overrideBody: () => { /* not applicable */ }
    }
  }

  subactions: {
    parent: {
      child: {
        'list': {
          method: 'GET',
          path: '/',
          pathVars: []
          params: {
            lang: {
              required: false;
            }
          },
        }
      },
      'list': {
        method: 'GET',
        path: '/',
        pathVars: []
        params: {
          lang: {
            required: false;
          }
        },
      }
    }
  }
}

// result: duda.templates.parent.child.list(), duda.templates.parent.list()
```

#### `excludeFromBody`

An array of keys to exclude from the request body for all request made from the Resource. Typically used to remove path variables.

e.g.
```javascript
{
  path: '/{site_name}',
  pathVars: ['site_name']

  // ...

  excludeFromBody: ['site_name'];
}

// result: duda.templates.parent.child.list(), duda.templates.parent.list()
```

## Extension Workflow

There are four tasks that are required to successfully extend the library: write tests, implement the resource, write types, and add the new resource.

### 1. Write tests

Tests are **required** for all Resources. This ensures the underlying generator is interpreting the Resource correctly. It's highly recommended to follow the TDD framework.

### 2. Implement the resource

Please see the example section for more details.

### 3. Write types

Types are **required** for all Resources. This provides end users of the package with a rich (and frankly, usable) experience via IDE intellisense. This is non-negotiable and PRs without types included will be rejected upon submission.

### 4. Add the new resource

The `Duda` class still needs to know about your new Resource, so you'll need to manually add it to it's constructor. It's as simple as copy an existing line and replacing the noun. 

For example, say we're adding a new Plan resource, we'd import our resource to `base.ts`, copy `this.sites = new Site(this);` from the `Duda` constructor, paste it on a new line, and refactor it to `this.plans = new Plan(this);`

> TODO: I assume we'd want to move to dependency injection to remove this manual step — honestly, not sure.

## Example

> NOTE: you can follow along with the example — it's highly encouraged!

In this section, we're going to add a new Resource with a few methods and attach it to the Duda object.

### 1. Write tests

`test/test_duda_example.js`

```typescript
require('dotenv').config();

const { Duda, Envs } = require('../dist/base');
const { GetTestSite, DeleteTestSite } = require('./helpers');
const { v4: uuidv4 } = require('uuid');

let duda;

// *- only required if you need a test site
let test_site;
before ('create a new site to test against', async function() {
  this.timeout(10000);
  test_site = await GetTestSite();
})
// -*

beforeEach ('instantiate a new Duda instance', function() {
  duda = new Duda({ environment: Envs.Sandbox });
})

describe('Duda.example', function() {
  it('can get a list of examples', function() {
    return duda.example.child.list();
  });

  it('can get an example by id', function() {
    return duda.example.get('example id');
  });

  it('can update an example by id', function() {
    return duda.example.update('example id');
  });
})
```

> Now, create a new file under `/resources` (e.g. `resources/example.ts`)

### 2. Import both `Resource` and `Duda`, and derive a new class from `Resource`

```typescript
import { Resource } from './resource';
import { Duda } from '../base';

class Example extends Resource {
  constructor(duda: Duda) {
    super(duda);
  }
}

```

### 3. Set the Resource's base path and path variables

```typescript
import { Resource } from './resource';
import { Duda } from '../base';

class Example extends Resource {
  constructor(duda: Duda) {
    super(duda);
    
    this.path = '/example';
    this.pathVars = [];
  }
}
```

### 4. Define the Resources actions and sub-actions (methods)

```typescript
import { Resource } from './resource';
import { Duda } from '../base';

class Example extends Resource {
  constructor(duda: Duda) {
    super(duda);
    
    this.path = '/example';
    this.pathVars = [];

    this.actions = {
      'get': {
        method: 'GET',
        path: '/{id}',
        pathVars: ['id'],
        params: {
          filter: {
            required: false
          }
        }
      },
      'update': {
        method: 'PUT',
        path: '/{id}',
        pathVars: ['id'],
        overrideBody: (args) => (delete args.id && args)
      }
    }

    this.subactions = {
      child: {
        'list': {
          method: 'GET',
          path: '',
          pathVars: [],
        }
      }
    }
  }
}
```

### 5. Add any variables to exclude from all of the Resource's request bodies

```typescript
import { Resource } from './resource';
import { Duda } from '../base';

class Example extends Resource {
  constructor(duda: Duda) {
    super(duda);
    
    this.path = '/example';
    this.pathVars = [];

    this.actions = {
      'get': {
        method: 'GET',
        path: '/{id}',
        pathVars: ['id'],
        params: {
          filter: {
            required: false
          }
        }
      },
      'update': {
        method: 'PUT',
        path: '/{id}',
        pathVars: ['id'],
        overrideBody: (args) => (delete args.id && args)
      }
    }

    this.subactions = {
      child: {
        'list': {
          method: 'GET',
          path: '',
          pathVars: [],
        }
      }
    }

    this.excludeFromBody = [];
  }
}
```

### 6. Export the new Resource as both the `default` and a named export, and call `init`

```typescript
import { Resource } from './resource';
import { Duda } from '../base';

class Example extends Resource {
  constructor(duda: Duda) {
    super(duda);
    
    this.path = '/example';
    this.pathVars = [];

    this.actions = {
      'get': {
        method: 'GET',
        path: '/{id}',
        pathVars: ['id'],
        params: {
          filter: {
            required: false
          }
        }
      },
      'update': {
        method: 'PUT',
        path: '/{id}',
        pathVars: ['id'],
        overrideBody: (args) => (delete args.id && args)
      }
    }

    this.subactions = {
      child: {
        'list': {
          method: 'GET',
          path: '',
          pathVars: [],
        }
      }
    }

    this.excludeFromBody = [];

    this.init();
  }
}

export { Example as default, Example };
```

### 7. Write out both `payload` and `response` types for each method

> NOTE: Now, create a new file under `/types` (e.g `/types/Example.d.ts`)

```typescript
type ListExamplesResponse = Array<GetExampleResponse>;

export interface GetExamplePayload {
  id: string;
}

export interface GetExampleResponse {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface UpdateExamplePayload {
  id: string;
  changeset: {
    name: string;
    age: number;
    birthday: string;
  }
}

export interface UpdateExamplesResponse {
  id: string;
  updates: {
    name: string;
    age: string;
    birthday: string;
  }
}
```


### 8. Add new types to the `Types` namespace

> NOTE: Now, open the file `/types/types.d.ts`

```typescript
export * from './Site';
export * from './Page';
export * from './Other';
export * from './Account';
export * from './Content';
export * from './Template';
export * from './Reporting';
export * from './Collection';
export * from './URLRule';

// export all from the types file we just created
export * from './Example';

export as namespace Types;
```

### 9. Add the new Resource to `Duda`

> NOTE: Now, open the file `/base.ts`

```typescript
import { Example } from './resources/Example';

// ...

  constructor(opts?: AppStoreConstructor) {
    // ...
    this.sites = new Site(this);
    this.pages = new Page(this);
    this.other = new Other(this);
    this.content = new Content(this);
    this.urlRules = new URLRule(this);
    this.accounts = new Account(this);
    this.templates = new Template(this);
    this.reporting = new Reporting(this);
    this.collections = new Collection(this);
    // append the new Resource in Duda's constructor
    this.examples = new Example(this);
  }

// ...
```

### 10. Add the method definitions to `/types/index.d.ts`

```typescript
import * as Site from './Site';
import * as Page from './Page';
import * as Other from './Other';
import * as URLRule from './URLRule';
import * as Account from './Account';
import * as Content from './Content';
import * as Template from './Template';
import * as Reporting from './Reporting';
import * as Collection from './Collection';

// import types from your Resource
import * as Example from './Example';

// ...

export class Duda {
  example: {
    // add both the promise and callback version of a method
    get(
      opts: Example.GetExamplePayload
    ): Promise<Example.GetExampleResponse>;

    get(
      opts: Example.GetExamplePayload, 
      cb?: CallbackFn<Example.GetExampleResponse>
    ): void;

    update(
      opts: Example.UpdateExamplePayload
    ): Promise<Example.UpdateExamplePayload>;

    update(
      opts: Example.UpdateExamplePayload
      cb?: CallbackFn<Example.UpdateExampleResponse>
    ): void; 

    child: {
      list(): Promise<Example.ListExamplesResponse>;

      list(cb?: CallbackFn<ListExampleResponse>): void;
    }
  }

  sites: {
    /**
     * Get a Duda site by name.
     */
    get(
      opts: Site.GetSiteByNamePayload
    ): Promise<Site.GetSiteResponse>;

    get(
      opts: Site.GetSiteByNamePayload,
      cb?: CallbackFn<Site.GetSiteResponse>
    ): void;

  // ...
```

### 11. Validate all tests pass

```bash
npm run test
```

### 12. Crack a beer, you're done!

---

## Testing

```bash
$ npm install
$ npm run test
```