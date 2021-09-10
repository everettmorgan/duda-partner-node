import { Duda } from '../base';
import { Resource } from './resource';

class URLRule extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen/site/{site_name}/urlrules';
    this.pathVars = ['site_name'];
    
    this.actions = {
      'getAll': {
        path: '',
        method: 'GET',
        pathVars: []
      },

      'get': {
        path: '/{id}',
        method: 'GET',
        pathVars: ['id']
      },

      'create': {
        path: '',
        method: 'POST',
        pathVars: []
      },

      'update': {
        path: '/{id}',
        method: 'PUT',
        pathVars: ['id']
      },

      'delete': {
        path: '/{id}',
        method: 'DELETE',
        pathVars: ['id']
      },
    }
    
    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { URLRule as default, URLRule };