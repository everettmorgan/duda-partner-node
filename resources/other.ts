import { Duda } from '../base';
import { Resource } from './resource';

class Other extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen';
    this.pathVars = [];
    
    this.actions = {};

    this.subactions = {
      backups: {
        'list': {
          path: '/backups/{site_name}',
          method: 'GET',
          pathVars: ['site_name']
        },

        'create': {
          path: '/backups/{site_name}/create',
          method: 'POST',
          pathVars: ['site_name']
        },

        'restore': {
          path: '/backups/{site_name}/restore/{backup_name}',
          method: 'POST',
          pathVars: ['site_name', 'backup_name']
        },

        'delete': {
          path: '/backups/{site_name}/{backup_name}',
          method: 'DELETE',
          pathVars: ['site_name', 'backup_name']
        },
      },

      ssl: {
        'create': {
          path: '/{site_name}/certificate',
          method: 'POST',
          pathVars: ['site_name']
        },

        'renew': {
          path: '/{site_name}/certificate/renew',
          method: 'POST',
          pathVars: ['site_name']
        },

        'delete': {
          path: '/{site_name}/certificate',
          method: 'DELETE',
          pathVars: ['site_name']
        },
      }
    }
    
    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Other as default, Other };