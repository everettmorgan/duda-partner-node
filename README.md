# Duda Partner API Node.js Library

The Duda Partner API Node.js library provides convenient access to the Duda Partner API from applications writting in server-side Javascript.

## Documentation

View the `duda-node` API docs for Node.js. (coming soon)

Check out some video demonstrations covering how to use the library. (coming soon)

## Requirements

Node 12 or higher.

## Installation

Install the package with:

```bash
npm install @dudadev/partner-api --save
# or
yarn add @dudadev/partner-api
```

## Usage

The package needs to be configured with your API credentials:

> **NOTE**: There are two ways to set API credentials: via environment variables or values passed into the constructor. Values passed into the constructor take precendence over environment variables.

```javascript
const { Duda } = require('@dudadev/partner-api');

// uses DUDA_API_USER and DUDA_API_PASS from the environment
const duda = new Duda();

// uses the provided `user` and `pass`
const duda = new Duda({
    username: "username",
    password: "password",
});

// then() / catch()
duda.sites.get({
  site_name: "a-site-name",
})
  .then((site) => console.log(site))
  .catch((error) => console.error(error));
```

Or using ES modules and `async`/`await`:
```javascript
// async / await
import { Duda } from '@dudadev/partner-api';

const duda = new Duda();

(async function() {
  try {
    const site = await duda.sites.get({ site_name: "a-site-name" });
    console.log(site);
  } catch(error) {
    // handle error
  }
})();
```

## Usage with TypeScript

Import Duda as the default import (not `* as Duda`) and instantiate as `new Duda()`.

```typescript
import { Duda, Types } from '@dudadev/partner-api';

const duda = new Duda();

const switchTemplate = async (site : string, template: number) => {
  try {
    const opts: Types.GetSiteByNamePayload = { site_name: "a-site-name" };

    const site: Types.GetSiteByNameResponse = await duda.sites.get(opts);

    console.log(site.site_name);
  } catch(error) {
    // handle error
  }
}
```

## Using Promises

Every method returns a chainable promise which can be used instead of a regular callback:

```javascript
// get a list of available templates
duda.templates.list()
  .then((templates) => {
    // create a new site from the first template in the returned array
    return duda.sites.create({
      template_id: templates[0].template_id;
    })
    .then((site) => {
      return duda.accounts.permissions.grantSiteAccess({
        account_name: "account-name",
        site_name: site.site_name,
        permissions: ["EDIT"]
      })
      .then(() => {
        return duda.accounts.authentication.getSSOLink({
          account_name: "account-name",
          site_name: site.site_name,
          target: "EDITOR"
        })
      })
    })
  })
  .catch((err) => {
    // handle error
  })
```