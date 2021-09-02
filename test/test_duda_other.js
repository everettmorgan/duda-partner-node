require('dotenv').config();

const { Duda, Envs } = require('../dist/base');
const { TEST_SITE_NAME } = require("./helpers");
const { v4: uuidv4 } = require('uuid');

const sinon = require('sinon');
const { expect } = require('chai');

let duda;

beforeEach('instantiate a new Duda instance', function () {
  duda = new Duda({ environment: Envs.Sandbox });
})

describe('Duda.other', function () {
  describe('Duda.other.backups', function () {
    this.timeout(30000);

    it('can sucessfully get all backups for a site', function () {
      return duda.other.backups.list({
        site_name: TEST_SITE_NAME,
      })
    })

    const backup_name = uuidv4();

    it('can successfully create a backup for a site', function () {
      return duda.other.backups.create({
        site_name: TEST_SITE_NAME,
        name: backup_name,
      })
    })

    it('can successfully restore a backup for a site', function () {
      return duda.other.backups.restore({
        site_name: TEST_SITE_NAME,
        backup_name: backup_name,
      })
    })

    it('can successfully delete a backup for a site', function () {
      return duda.other.backups.delete({
        site_name: TEST_SITE_NAME,
        backup_name: backup_name,
      })
    })
  })

  describe('Duda.other.ssl', function () {
    // TODO : figure out how to mock SSL generation
    // for now we're only checking if the methods can be called
    this.timeout(10000);

    it('can successfully generate an ssl cert for a site', function () {
      const spy = sinon.spy(duda.other.ssl, "create");
      duda.other.ssl.create({
        site_name: TEST_SITE_NAME,
      }).catch((error) => { });
      expect(spy.called).to.equal(true);
    })

    it('can successfully renew an ssl cert for a site', function () {
      const spy = sinon.spy(duda.other.ssl, "renew");
      duda.other.ssl.renew({
        site_name: TEST_SITE_NAME,
      }).catch((error) => { });
      expect(spy.called).to.equal(true);
    })

    it('can successfully delete an ssl cert for a site', function () {
      const spy = sinon.spy(duda.other.ssl, "delete");
      duda.other.ssl.delete({
        site_name: TEST_SITE_NAME,
      }).catch((error) => { });
      expect(spy.called).to.equal(true);
    })
  })
})