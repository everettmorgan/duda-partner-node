import { Duda } from '../base';
import { Resource } from './resource';

class Template extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen/templates';
    this.pathVars = [];

    this.actions = {
      'list': {
        path: '',
        method: 'GET',
        pathVars: [],
        params: {
          'lang': {
            required: false
          }
        }
      },

      'get': {
        path: '/{template_id}',
        method: 'GET',
        pathVars: ['template_id'],
        params: {
          'lang': {
            required: false
          }
        }
      },

      'update': {
        path: '/{template_id}',
        method: 'POST',
        pathVars: ['template_id'],
        overrideBody: (args) => (delete args.template_id && args)
      },

      'createFromSite': {
        path: '/fromsite',
        method: 'POST',
        pathVars: []
      },

      'createFromTemplate': {
        path: '/fromtemplate',
        method: 'POST',
        pathVars: []
      },

      'delete': {
        path: '/{template_id}',
        method: 'GET',
        pathVars: ['template_id']
      },
    }

    this.excludeFromBody = [];

    this.init();
  }
}

export { Template as default, Template };