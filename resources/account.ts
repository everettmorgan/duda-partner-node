import { Duda } from '../base';
import { Resource } from './resource';

class Account extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/accounts';
    this.pathVars = [];
    
    this.actions = {
      'get': {
        path: '/{account_name}',
        method: 'GET',
        pathVars: ['account_name']
      },

      'create': {
        path: '/create',
        method: 'POST',
        pathVars: []
      },

      'update': {
        path: '/update/{account_name}',
        method: 'POST',
        pathVars: ['account_name']
      },

      'delete': {
        path: '/{account_name}',
        method: 'DELETE',
        pathVars: ['account_name']
      },
    }

    this.subactions = {
      permissions: {
        'list': {
          path: '/permissions/multiscreen',
          method: 'GET',
          pathVars: []
        },

        'listAccessibleSites': {
          path: '/grant-access/{account_name}/sites/multiscreen',
          method: 'GET',
          pathVars: ['account_name']
        },

        'get': {
          path: '/{account_name}/sites/{site_name}/permissions',
          method: 'GET',
          pathVars: ['account_name', 'site_name']
        },

        'grantSiteAccess': {
          path: '/{account_name}/sites/{site_name}/permissions',
          method: 'POST',
          pathVars: ['account_name', 'site_name'],
          overrideBody: (args) => (delete args.account_name && args)
        },

        'removeSiteAccess': {
          path: '/{account_name}/sites/{site_name}/permissions',
          method: 'DELETE',
          pathVars: ['account_name', 'site_name']
        },
      },

      authentication: {
        'getSSOLink': {
          path: '/sso/{account_name}/link',
          method: 'GET',
          pathVars: ['account_name'],
          params: {
            site_name: {
              required: false
            },
            target: {
              required: false
            }
          }
        },

        'getResetPasswordLink': {
          path: '/reset-password/{account_name}',
          method: 'POST',
          pathVars: ['account_name']
        },
      }
    }
    
    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Account as default, Account };