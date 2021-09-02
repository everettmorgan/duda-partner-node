import { Duda } from '../base';
import { Resource } from './resource';

class Content extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen';
    this.pathVars = [];
    
    this.actions = {
      'get': {
        path: '/{site_name}/content',
        method: 'GET',
        pathVars: ['site_name']
      },

      'update': {
        path: '/{site_name}/content',
        method: 'POST',
        pathVars: ['site_name']
      },

      'publish': {
        path: '/{site_name}/content/publish',
        method: 'POST',
        pathVars: ['site_name']
      },

      'uploadResource': {
        path: '/resources/{site_name}/upload',
        method: 'POST',
        pathVars: ['site_name'],
        overrideBody: (args) => args.raw_body
      },
    }
    
    this.subactions = {
      multilocation: {
        'get': {
          path: '/{site_name}/content/location/{location_id}',
          method: 'GET',
          pathVars: ['site_name', 'location_id']
        },

        'create': {
          path: '/{site_name}/content/location',
          method: 'POST',
          pathVars: ['site_name']
        },
  
        'update': {
          path: '/{site_name}/content/location/{location_id}',
          method: 'POST',
          pathVars: ['site_name', 'location_id']
        },
  
        'delete': {
          path: '/{site_name}/content/location/{location_id}',
          method: 'DELETE',
          pathVars: ['site_name', 'location_id']
        },
      },

      injectedContent: {
        'get': {
          path: '/inject-content/{site_name}',
          method: 'GET',
          pathVars: ['site_name'],
          params: {
            'key': {
              required: false
            },
            'type': {
              required: false
            },
            'ref': {
              required: false
            }
          },
          overrideBody: (args) => args.raw_body
        },

        'create': {
          path: '/inject-content/{site_name}',
          method: 'POST',
          pathVars: ['site_name'],
          overrideBody: (args) => args.raw_body
        },

        'createSPA': {
          path: '/inject-content/{site_name}/pages/{page_name}',
          method: 'POST',
          pathVars: ['site_name', 'page_name'],
          overrideBody: (args) => args.raw_body
        },
      }
    }

    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Content as default, Content };