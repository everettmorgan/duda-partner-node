require('dotenv').config();

const { Duda } = require('../dist/base');

const duda = new Duda({ 
    maxNetworkRetries: 2, 
    env: Duda.Environments.Sandbox 
});

let test_site_name;

module.exports.GetTestSite = async function() {
    if (!test_site_name) {
        test_site_name = await duda.sites.create({ template_id: 1030623 }).then((resp) => resp.site_name);
    }
    return test_site_name;
}

module.exports.DeleteTestSite = async function() {
    if (test_site_name) {
        await duda.sites.delete({ site_name: test_site_name });
    }
    test_site_name = null;
}