require('dotenv').config();

const { Duda, Envs } = require('../dist/base')
const duda = new Duda({ 
    environment: Envs.Sandbox,
    maxNetworkRetries: 5
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