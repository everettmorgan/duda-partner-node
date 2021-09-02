import { Duda } from '../base';
import { Resource } from './resource';

class Page extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen/site/{site_name}/pages';
    this.pathVars = ['site_name'];
    
    this.actions = {
      'list': {
        path: '',
        method: 'GET',
        pathVars: []
      },

      'get': {
        path: '/{page_name}',
        method: 'GET',
        pathVars: ['page_name']
      },

      'update': {
        path: '/{page_name}/update',
        method: 'POST',
        pathVars: ['page_name'],
        overrideBody: (args) => (delete args.page_name && args)
      },

      'duplicate': {
        path: '/{page_name}/duplicate',
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
        path: '/{page_name}/delete',
        method: 'DELETE',
        pathVars: ['page_name']
      },
    }
    
    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Page as default, Page };