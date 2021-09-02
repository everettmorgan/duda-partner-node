import * as Site from './Site';
import * as Page from './Page';
import * as Other from './Other';
import * as Account from './Account';
import * as Content from './Content';
import * as Template from './Template';
import * as Reporting from './Reporting';
import * as Collection from './Collection';

export * as Types from './types';

export interface CallbackFn<T> {
  (error: string, response: T): any;
}

export class Duda {
  sites: {
    /**
     * Get a Duda site by name.
     */
    get(
      opts: Site.GetSiteByNamePayload
    ): Promise<Site.GetSiteResponse>;

    get(
      opts: Site.GetSiteByNamePayload,
      cb?: CallbackFn<Site.GetSiteResponse>
    ): void;

    /**
     * Get a Duda site by external ID.
     */
    getByExternalID(
      opts: Site.GetSiteByExtIDPayload
    ): Promise<Site.GetSiteResponse>;

    getByExternalID(
      opts: Site.GetSiteByNamePayload,
      cb?: CallbackFn<Site.GetSiteResponse>
    ): void;

    /**
     * Create a new Duda site.
     */
    create(
      opts: Site.CreateSitePayload
    ): Promise<Site.CreateSiteResponse>;

    create(
      opts: Site.UpdateSitePayload,
      cb?: CallbackFn<Site.CreateSiteResponse>
    ): void;

    /**
     * Update a Duda site by name.
     */
    update(
      opts: Site.UpdateSitePayload
    ): Promise<Site.UpdateSiteResponse>;

    update(
      opts: Site.UpdateSitePayload,
      cb?: CallbackFn<Site.UpdateSiteResponse>
    ): void;

    /**
     * Duplicate a Duda site by name.
     */
    duplicate(
      opts: Site.DuplicateSitePayload
    ): Promise<Site.DuplicateSiteResponse>;

    duplicate(
      opts: Site.DuplicateSitePayload,
      cb?: CallbackFn<Site.DuplicateSiteResponse>
    ): void;

    /**
     * Publish a Duda site.
     */
    publish(
      opts: Site.PublishSitePayload
    ): Promise<Site.PublishSiteResponse>;

    publish(
      opts: Site.PublishSitePayload,
      cb?: CallbackFn<Site.PublishSiteResponse>
    ): void;

    /**
     * Unpublish a Duda site.
     */
    unpublish(
      opts: Site.UnPublishSitePayload
    ): Promise<Site.UnPublishSiteResponse>;

    unpublish(
      opts: Site.UnPublishSitePayload,
      cb?: CallbackFn<Site.UnPublishSiteResponse>
    ): void;

    /**
     * Reset a Duda site.
     */
    reset(
      opts: Site.ResetSitePayload
    ): Promise<Site.ResetSiteResponse>;

    reset(
      opts: Site.ResetSitePayload,
      cb?: CallbackFn<Site.ResetSiteResponse>
    ): void;

    /**
     * Switch the template of a Duda site.
     */
    switchTemplate(
      opts: Site.SwitchTemplatePayload
    ): Promise<Site.SwitchTemplateResponse>;

    switchTemplate(
      opts: Site.SwitchTemplatePayload,
      cb?: CallbackFn<Site.SwitchTemplateResponse>
    ): void;

    /**
     * Delete a Duda site by name.
     */
    delete(
      opts: Site.DeleteSitePayload
    ): Promise<Site.DeleteSiteResponse>;

    delete(
      opts: Site.DeleteSitePayload,
      cb?: CallbackFn<Site.DeleteSiteResponse>
    ): void;
  }

  accounts: {
    get(
      opts: Account.GetAccountPayload
    ): Promise<Account.GetAccountResponse>;

    get(
      opts: Account.GetAccountPayload,
      cb?: CallbackFn<Account.GetAccountResponse>
    ): void;

    create(
      opts: Account.CreateAccountPayload
    ): Promise<Account.CreateAccountResponse>;

    create(
      opts: Account.CreateAccountPayload,
      cb?: CallbackFn<Account.CreateAccountResponse>
    ): void;

    update(
      opts: Account.UpdateAccountPayload
    ): Promise<Account.UpdateAccountResponse>;

    update(
      opts: Account.UpdateAccountPayload,
      cb?: CallbackFn<Account.UpdateAccountResponse>
    ): void;

    delete(
      opts: Account.DeleteAccountPayload
    ): Promise<Account.DeleteAccountResponse>;

    delete(
      opts: Account.DeleteAccountPayload,
      cb?: CallbackFn<Account.DeleteAccountResponse>
    ): void;

    permissions: {
      list(): Promise<Account.GetPermissionsResponse>;

      list(
        cb?: CallbackFn<Account.GetPermissionsResponse>
      ): void;

      listAccessibleSites(
        opts: Account.ListAccessibleSitesPayload
      ): Promise<Account.ListAccessibleSitesResponse>;

      listAccessibleSites(
        opts: Account.ListAccessibleSitesPayload,
        cb?: CallbackFn<Account.ListAccessibleSitesResponse>
      ): void;

      get(
        opts: Account.GetPermissionsPayload
      ): Promise<Account.GetPermissionsResponse>;

      get(
        opts: Account.GetPermissionsPayload,
        cb?: CallbackFn<Account.GetPermissionsResponse>
      ): void;

      grantSiteAccess(
        opts: Account.GrantSiteAccessPayload
      ): Promise<Account.GrantSiteAccessResponse>;

      grantSiteAccess(
        opts: Account.GrantSiteAccessPayload,
        cb?: CallbackFn<Account.GrantSiteAccessResponse>
      ): void;

      removeSiteAccess(
        opts: Account.RemoveSiteAccessPayload
      ): Promise<Account.RemoveSiteAccessResponse>;

      removeSiteAccess(
        opts: Account.RemoveSiteAccessPayload,
        cb?: CallbackFn<Account.RemoveSiteAccessResponse>
      ): void;
    },

    authentication: {
      getSSOLink(
        opts: Account.GetSSOLinkPayload
      ): Promise<Account.GetSSOLinkResponse>;

      getSSOLink(
        opts: Account.GetSSOLinkPayload,
        cb?: CallbackFn<Account.GetSSOLinkResponse>
      ): void;

      getResetPasswordLink(
        opts: Account.GetResetPasswordLinkPayload
      ): Promise<Account.GetResetPasswordLinkResponse>;

      getResetPasswordLink(
        opts: Account.GetResetPasswordLinkPayload,
        cb?: CallbackFn<Account.GetResetPasswordLinkResponse>
      ): void;
    }
  }

  collections: {
    list(
      opts: Collection.ListCollectionsPayload
    ): Promise<Collection.ListCollectionsResponse>;

    list(
      opts: Collection.ListCollectionsPayload,
      cb?: CallbackFn<Collection.ListCollectionsResponse>
    ): void;

    get(
      opts: Collection.GetCollectionPayload
    ): Promise<Collection.GetCollectionResponse>;

    get(
      opts: Collection.GetCollectionPayload,
      cb?: CallbackFn<Collection.GetCollectionResponse>
    ): void;

    create(
      opts: Collection.CreateCollectionPayload
    ): Promise<Collection.CreateCollectionResponse>;

    create(
      opts: Collection.CreateCollectionPayload,
      cb?: CallbackFn<Collection.CreateCollectionResponse>
    ): void;

    update(
      opts: Collection.UpdateCollectionPayload
    ): Promise<Collection.UpdateCollectionResponse>;

    update(
      opts: Collection.UpdateCollectionPayload,
      cb?: CallbackFn<Collection.UpdateCollectionResponse>
    ): void;

    delete(
      opts: Collection.DeleteCollectionPayload
    ): Promise<Collection.DeleteCollectionResponse>;

    delete(
      opts: Collection.DeleteCollectionPayload,
      cb?: CallbackFn<Collection.DeleteCollectionResponse>
    ): void;

    clearCache(
      opts: Collection.ClearCachePayload
    ): Promise<Collection.ClearCacheResponse>;

    clearCache(
      opts: Collection.ClearCachePayload,
      cb?: CallbackFn<Collection.ClearCacheResponse>
    ): void;

    clearCacheByExtId(
      opts: Collection.ClearCacheByExtIdPayload
    ): Promise<Collection.ClearCacheByExtIdResponse>;

    clearCacheByExtId(
      opts: Collection.ClearCacheByExtIdPayload,
      cb?: CallbackFn<Collection.ClearCacheByExtIdResponse>
    ): void;

    rows: {
      create(
        opts: Collection.AddRowPayload
      ): Promise<Collection.AddRowResponse>;
  
      create(
        opts: Collection.AddRowPayload,
        cb?: CallbackFn<Collection.AddRowResponse>
      ): void;
  
      update(
        opts: Collection.UpdateRowPayload
      ): Promise<Collection.UpdateRowResponse>;
  
      update(
        opts: Collection.UpdateRowPayload,
        cb?: CallbackFn<Collection.UpdateRowResponse>
      ): void;

      delete(
        opts: Collection.DeleteRowPayload
      ): Promise<Collection.DeleteRowResponse>;
  
      delete(
        opts: Collection.DeleteRowPayload,
        cb?: CallbackFn<Collection.DeleteRowResponse>
      ): void;
    },

    fields: {
      create(
        opts: Collection.AddFieldPayload
      ): Promise<Collection.AddFieldResponse>;
  
      create(
        opts: Collection.AddFieldPayload,
        cb?: CallbackFn<Collection.AddFieldResponse>
      ): void;
  
      update(
        opts: Collection.UpdateFieldPayload
      ): Promise<Collection.UpdateFieldResponse>;
  
      update(
        opts: Collection.UpdateFieldPayload,
        cb?: CallbackFn<Collection.UpdateFieldResponse>
      ): void;

      delete(
        opts: Collection.DeleteFieldPayload
      ): Promise<Collection.DeleteFieldResponse>;
  
      delete(
        opts: Collection.DeleteFieldPayload,
        cb?: CallbackFn<Collection.DeleteFieldResponse>
      ): void;
    }
  }

  content: {
    get(
      opts: Content.GetContentPayload
    ): Promise<Content.ContentLibrary>;

    get(
      opts: Content.GetContentPayload,
      cb?: CallbackFn<Content.ContentLibrary>
    ): void;

    update(
      opts: Content.UpdateContentPayload
    ): Promise<Content.UpdateContentResponse>;

    update(
      opts: Content.UpdateContentPayload,
      cb?: CallbackFn<Content.UpdateContentResponse>
    ): void;

    publish(
      opts: Content.PublishContentPayload
    ): Promise<Content.PublishContentResponse>;

    publish(
      opts: Content.PublishContentPayload,
      cb?: CallbackFn<Content.PublishContentResponse>
    ): void;

    uploadResource(
      opts: Content.UploadResourcePayload
    ): Promise<Content.UploadResourceResponse>;

    uploadResource(
      opts: Content.UploadResourcePayload,
      cb?: CallbackFn<Content.UploadResourceResponse>
    ): void;

    multilocation: {
      get(
        opts: Content.GetLocationPayload
      ): Promise<Content.Location>;
  
      get(
        opts: Content.GetLocationPayload,
        cb?: CallbackFn<Content.Location>
      ): void;

      create(
        opts: Content.CreateLocationPayload
      ): Promise<Content.Location>;
  
      create(
        opts: Content.CreateLocationPayload,
        cb?: CallbackFn<Content.Location>
      ): void;

      update(
        opts: Content.UpdateLocationPayload
      ): Promise<Content.UpdateLocationResponse>;
  
      update(
        opts: Content.UpdateLocationPayload,
        cb?: CallbackFn<Content.UpdateLocationResponse>
      ): void;

      delete(
        opts: Content.DeleteLocationPayload
      ): Promise<Content.DeleteLocationResponse>;
  
      delete(
        opts: Content.DeleteLocationPayload,
        cb?: CallbackFn<Content.DeleteLocationResponse>
      ): void;
    },

    injectedContent: {
      get(
        opts: Content.GetInjectedContentPayload
      ): Promise<Content.GetInjectedContentResponse>;
  
      get(
        opts: Content.GetInjectedContentPayload,
        cb?: CallbackFn<Content.GetInjectedContentResponse>
      ): void;

      create(
        opts: Content.InjectContentPayload
      ): Promise<Content.InjectContentResponse>;
  
      create(
        opts: Content.InjectContentPayload,
        cb?: CallbackFn<Content.InjectContentResponse>
      ): void;

      createSPA(
        opts: Content.InjectContentSPAPayload
      ): Promise<Content.InjectContentResponse>;
  
      createSPA(
        opts: Content.InjectContentSPAPayload,
        cb?: CallbackFn<Content.InjectContentResponse>
      ): void;
    }
  }

  pages: {
    list(
      opts: Page.ListPagesPayload,
    ): Promise<Page.ListPagesResponse>;

    list(
      opts: Page.ListPagesPayload,
      cb?: CallbackFn<Page.ListPagesResponse>
    ): void;

    get(
      opts: Page.GetPagePayload,
    ): Promise<Page.GetPageResponse>;

    get(
      opts: Page.GetPagePayload,
      cb?: CallbackFn<Page.GetPageResponse>
    ): void;

    update(
      opts: Page.UpdatePagePayload,
    ): Promise<Page.UpdatePageResponse>;

    update(
      opts: Page.UpdatePagePayload,
      cb?: CallbackFn<Page.UpdatePageResponse>
    ): void;

    duplicate(
      opts: Page.DuplicatePagePayload,
    ): Promise<Page.DuplicatePageResponse>;

    duplicate(
      opts: Page.DuplicatePagePayload,
      cb?: CallbackFn<Page.DuplicatePageResponse>
    ): void;

    delete(
      opts: Page.DeletePagePayload,
    ): Promise<Page.DeletePageResponse>;

    delete(
      opts: Page.DeletePagePayload,
      cb?: CallbackFn<Page.DeletePageResponse>
    ): void;
  }

  templates: {
    list(
      opts: Template.ListTemplatesResponse,
    ): Promise<Template.ListTemplatesResponse>;

    list(
      opts: Template.ListTemplatesResponse,
      cb?: CallbackFn<Template.ListTemplatesResponse>
    ): void;

    get(
      opts: Template.GetTemplatePayload,
    ): Promise<Template.GetTemplateResponse>;

    get(
      opts: Template.GetTemplatePayload,
      cb?: CallbackFn<Template.GetTemplateResponse>
    ): void;

    update(
      opts: Template.UpdateTemplatePayload,
    ): Promise<Template.UpdateTemplateResponse>;

    update(
      opts: Template.UpdateTemplatePayload,
      cb?: CallbackFn<Template.UpdateTemplateResponse>
    ): void;

    delete(
      opts: Template.DeleteTemplatePayload,
    ): Promise<Template.DeleteTemplateResponse>;

    delete(
      opts: Template.DeleteTemplatePayload,
      cb?: CallbackFn<Template.DeleteTemplateResponse>
    ): void;

    createFromSite(
      opts: Template.CreateFromSitePayload,
    ): Promise<Template.CreateFromResponse>;

    createFromSite(
      opts: Template.CreateFromSitePayload,
      cb?: CallbackFn<Template.CreateFromResponse>
    ): void;

    createFromTemplate(
      opts: Template.CreateFromTemplatePayload,
    ): Promise<Template.CreateFromResponse>;

    createFromTemplate(
      opts: Template.CreateFromTemplatePayload,
      cb?: CallbackFn<Template.CreateFromResponse>
    ): void;
  }

  reporting: {
    sites: {
      created(
        opts: Reporting.GetSitesCreatedPayload,
      ): Promise<Reporting.GetSitesCreatedResponse>;
  
      created(
        opts: Reporting.GetSitesCreatedPayload,
        cb?: CallbackFn<Reporting.GetSitesCreatedResponse>
      ): void;

      published(
        opts: Reporting.GetPublishedPayload,
      ): Promise<Reporting.GetPublishedResponse>;
  
      published(
        opts: Reporting.GetPublishedPayload,
        cb?: CallbackFn<Reporting.GetPublishedResponse>
      ): void;

      unpublished(
        opts: Reporting.GetUnpublishedPayload,
      ): Promise<Reporting.GetUnpublishedResponse>;
  
      unpublished(
        opts: Reporting.GetUnpublishedPayload,
        cb?: CallbackFn<Reporting.GetUnpublishedResponse>
      ): void;
    },
    
    forms: {
      submissions(
        opts: Reporting.GetFormSubmissionsPayload,
      ): Promise<Reporting.GetFormSubmissionsResponse>;
  
      submissions(
        opts: Reporting.GetFormSubmissionsPayload,
        cb?: CallbackFn<Reporting.GetFormSubmissionsResponse>
      ): void;
    },
    
    activities: {
      get(
        opts: Reporting.GetActivityLogPayload,
      ): Promise<Reporting.GetActivityLogResponse>;
  
      get(
        opts: Reporting.GetActivityLogPayload,
        cb?: CallbackFn<Reporting.GetActivityLogResponse>
      ): void;
    },
    
    analytics: {
      get(
        opts: Reporting.GetAnalyticsHistoryPayload,
      ): Promise<Reporting.GetAnalyticsHistoryResponse>;
  
      get(
        opts: Reporting.GetAnalyticsHistoryPayload,
        cb?: CallbackFn<Reporting.GetAnalyticsHistoryResponse>
      ): void;
    },
    
    emailSettings: {
      get(
        opts: Reporting.GetEmailSettingsPayload,
      ): Promise<Reporting.GetEmailSettingsResponse>;
  
      get(
        opts: Reporting.GetEmailSettingsPayload,
        cb?: CallbackFn<Reporting.GetEmailSettingsResponse>
      ): void;

      subscribe(
        opts: Reporting.SubscribeCustomerPayload,
      ): Promise<Reporting.SubscribeCustomerResponse>;
  
      subscribe(
        opts: Reporting.SubscribeCustomerPayload,
        cb?: CallbackFn<Reporting.SubscribeCustomerResponse>
      ): void;

      unsubscribe(
        opts: Reporting.UnsubscribeCustomerPayload,
      ): Promise<Reporting.SubscribeCustomerResponse>;
  
      unsubscribe(
        opts: Reporting.UnsubscribeCustomerPayload,
        cb?: CallbackFn<Reporting.SubscribeCustomerResponse>
      ): void;
    }
  }

  other: {
    backups: {
      list(
        opts: Other.ListSiteBackupsPayload,
      ): Promise<Other.ListSiteBackupsResponse>;
  
      list(
        opts: Other.ListSiteBackupsPayload,
        cb?: CallbackFn<Other.ListSiteBackupsResponse>
      ): void;

      create(
        opts: Other.CreateSiteBackupPayload,
      ): Promise<Other.CreateSiteBackupResponse>;
  
      create(
        opts: Other.CreateSiteBackupPayload,
        cb?: CallbackFn<Other.CreateSiteBackupResponse>
      ): void;

      restore(
        opts: Other.RestoreSiteBackupPayload,
      ): Promise<Other.RestoreSiteBackupResponse>;
  
      restore(
        opts: Other.RestoreSiteBackupPayload,
        cb?: CallbackFn<Other.RestoreSiteBackupResponse>
      ): void;

      delete(
        opts: Other.DeleteSiteBackupPayload,
      ): Promise<Other.DeleteSiteBackupResponse>;
  
      delete(
        opts: Other.DeleteSiteBackupPayload,
        cb?: CallbackFn<Other.DeleteSiteBackupResponse>
      ): void;
    },

    ssl: {
      create(
        opts: Other.GenerateSSLPayload,
      ): Promise<Other.GenerateSSLResponse>;
  
      create(
        opts: Other.GenerateSSLPayload,
        cb?: CallbackFn<Other.GenerateSSLResponse>
      ): void;

      renew(
        opts: Other.RenewSSLPayload,
      ): Promise<Other.RenewSSLResponse>;
  
      renew(
        opts: Other.RenewSSLPayload,
        cb?: CallbackFn<Other.RenewSSLResponse>
      ): void;

      delete(
        opts: Other.DeleteSSLPayload,
      ): Promise<Other.DeleteSSLResponse>;
  
      delete(
        opts: Other.DeleteSSLPayload,
        cb?: CallbackFn<Other.DeleteSSLResponse>
      ): void;
    }
  }
}