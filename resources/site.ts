import { Duda } from '../base';
import { Resource } from './resource';

class Site extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen';
    this.pathVars = [];

    this.actions = {
      'get': {
        path: '/{site_name}',
        method: 'GET',
        pathVars: ['site_name']
      },

      'getByExternalID': {
        path: '/byexternalid/{external_uid}',
        method: 'GET',
        pathVars: ['external_uid']
      },

      'create': {
        path: '/create',
        method: 'POST',
        pathVars: []
      },

      'update': {
        path: '/update/{site_name}',
        method: 'POST',
        pathVars: ['site_name']
      },

      'duplicate': {
        path: '/duplicate/{site_name}',
        method: 'POST',
        pathVars: ['site_name']
      },

      'publish': {
        path: '/publish/{site_name}',
        method: 'POST',
        pathVars: ['site_name']
      },

      'unpublish': {
        path: '/unpublish/{site_name}',
        method: 'POST',
        pathVars: ['site_name']
      },

      'reset': {
        path: '/reset/{site_name}',
        method: 'POST',
        pathVars: ['site_name'],
        overrideBody: (args) => ({ 
          ...({ template_id: args.template_id }),
          ...({ site_data: { 
                  removeBizInfos: args.site_data.remove_biz_infos 
                } 
              }),
        })
      },

      'switchTemplate': {
        path: '/switchTemplate/{site_name}',
        method: 'POST',
        pathVars: ['site_name']
      },

      'delete': {
        path: '/{site_name}',
        method: 'DELETE',
        pathVars: ['site_name']
      },
    }

    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Site as default, Site };