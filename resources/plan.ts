import { Duda } from '../base';
import { Resource } from './resource';

class Plan extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen';
    this.pathVars = [];
    
    this.actions = {
      'list': {
        path: '/plans',
        method: 'GET',
        pathVars: []
      },

      'get': {
        path: '/{site_name}/plan',
        method: 'GET',
        pathVars: ['site_name']
      },

      'update': {
        path: '/{site_name}/plan/{plan_id}',
        method: 'POST',
        pathVars: ['site_name','plan_id']
      }
    }
    
    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Plan as default, Plan };