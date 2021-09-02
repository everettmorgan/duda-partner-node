import { Duda } from '../base';
import { Resource } from './resource';

class Collection extends Resource {
  constructor(duda: Duda) {
    super(duda);

    this.path = '/sites/multiscreen';
    this.pathVars = [];
    
    this.actions = {
      'list': {
        path: '/{site_name}/collection',
        method: 'GET',
        pathVars: []
      },

      'get': {
        path: '/{site_name}/collection/{collection_name}',
        method: 'GET',
        pathVars: ['site_name', 'collection_name']
      },

      'create': {
        path: '/{site_name}/collection',
        method: 'POST',
        pathVars: ['site_name']
      },

      'update': {
        path: '/{site_name}/collection/{current_collection_name}',
        method: 'PUT',
        pathVars: ['site_name', 'current_collection_name']
      },

      'clearCache': {
        path: '/{site_name}/collection/{collection_name}/revalidate',
        method: 'POST',
        pathVars: ['site_name', 'collection_name']
      },

      'clearCacheByExtID': {
        path: '/collections/revalidate/{external_id}',
        method: 'POST',
        pathVars: ['external_id']
      },

      'delete': {
        path: '/{site_name}/collection/{collection_name}',
        method: 'GET',
        pathVars: ['site_name', 'collection_name']
      },
    }

    this.subactions = {
      rows: {
        'create': {
          path: '/{site_name}/collection/{collection_name}/row',
          method: 'POST',
          pathVars: ['site_name', 'collection_name'],
          overrideBody: (args) => args.raw_body
        },

        'update': {
          path: '/{site_name}/collection/{collection_name}/row',
          method: 'PUT',
          pathVars: ['site_name', 'collection_name'],
          overrideBody: (args) => args.raw_body
        },

        'delete': {
          path: '/{site_name}/collection/{collection_name}/row',
          method: 'DELETE',
          pathVars: ['site_name', 'collection_name'],
          overrideBody: (args) => args.raw_body
        },
      },

      fields: {
        'create': {
          path: '/{site_name}/collection/{collection_name}/field',
          method: 'POST',
          pathVars: ['site_name', 'collection_name'],
          overrideBody: (args) => args.raw_body
        },

        'update': {
          path: '/{site_name}/collection/{collection_name}/field/{field_name}',
          method: 'PUT',
          pathVars: ['site_name', 'collection_name', 'field_name'],
          overrideBody: (args) => (delete args.collection_name && args)
        },

        'delete': {
          path: '/{site_name}/collection/{collection_name}/field/{field_name}',
          method: 'DELETE',
          pathVars: ['site_name', 'collection_name', 'field_name'],
          overrideBody: (args) => (delete args.collection_name && args)
        },
      }
    }
    
    this.excludeFromBody = ['site_name'];

    this.init();
  }
}

export { Collection as default, Collection };