import { Duda } from '../base';
import { Resource } from './resource';

class Reporting extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '';
    this.pathVars = [];
    this.actions = {};

    this.subactions = {
      sites: {
        'created': {
          path: '/sites/multiscreen/created',
          method: 'GET',
          pathVars: []
        },
  
        'published': {
          path: '/sites/multiscreen/published',
          method: 'GET',
          pathVars: []
        },
  
        'unpublished': {
          path: '/sites/multiscreen/unpublished',
          method: 'GET',
          pathVars: []
        },
      },

      forms: {
        'submissions': {
          path: '/sites/multiscreen/get-forms/{site_name}',
          method: 'GET',
          pathVars: ['site_name']
        },
      },

      activities: {
        'get': {
          path: '/sites/multiscreen/{site_name}/activities',
          method: 'GET',
          pathVars: ['site_name']
        }
      },

      analytics: {
        'get': {
          path: '/analytics/site/{site_name}',
          method: 'GET',
          pathVars: ['site_name']
        }
      },

      emailSettings: {
        'get': {
          path: '/accounts/{account_name}/sites/{site_name}/stats-email',
          method: 'GET',
          pathVars: ['account_name', 'site_name']
        },

        'subscribe': {
          path: '/accounts/{account_name}/sites/{site_name}/stats-email',
          method: 'POST',
          pathVars: ['account_name', 'site_name'],
          overrideBody: (args) => (delete args.account_name && args)
        },

        'unsubscribe': {
          path: '/accounts/{account_name}/sites/{site_name}/stats-email',
          method: 'DELETE',
          pathVars: ['account_name', 'site_name']
        },
      },
    }
    
    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Reporting as default, Reporting };