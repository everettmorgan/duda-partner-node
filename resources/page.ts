import { Duda } from '../base';
import { Resource } from './resource';

class Page extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen';
    this.pathVars = ['site_name'];
    
    this.actions = {
      'list': {
        path: '/site/{site_name}/pages',
        method: 'GET',
        pathVars: []
      },

      'get': {
        path: '/site/{site_name}/pages/{page_name}',
        method: 'GET',
        pathVars: ['page_name']
      },

      'update': {
        path: '/site/{site_name}/pages/{page_name}/update',
        method: 'POST',
        pathVars: ['page_name'],
        overrideBody: (args) => (delete args.page_name && args)
      },

      'duplicate': {
        path: '/site/{site_name}/pages/{page_name}/duplicate',
        method: 'POST',
        pathVars: ['page_name'],
        params: {
          page_title: {
            alias: 'pageTitle',
            required: true
          }
        },
        overrideBody: () => {}
      },

      'delete': {
        path: '/site/{site_name}/pages/{page_name}/delete',
        method: 'DELETE',
        pathVars: ['page_name']
      },
    }

    this.subactions = {
      v2: {
        'list': {
          path: '/{site_name}/pages',
          method: 'GET',
          pathVars: []
        },
  
        'get': {
          path: '/{site_name}/pages/{page_uuid}',
          method: 'GET',
          pathVars: ['page_uuid']
        },
  
        'update': {
          path: '/{site_name}/pages/{page_uuid}',
          method: 'PUT',
          pathVars: ['page_uuid']
        },
  
        'duplicate': {
          path: '/{site_name}/pages/{page_uuid}/duplicate',
          method: 'POST',
          pathVars: ['page_uuid']
        },
  
        'delete': {
          path: '/{site_name}/pages/{page_uuid}',
          method: 'DELETE',
          pathVars: ['page_uuid']
        },
      }
    }
    
    this.excludeFromBody = ['site_name', 'page_uuid'];

    this.init();
  }
}

export { Page as default, Page };