'use strict';

const DomainController = require('./domain-controller');
const Security = require('../security');
const DomainRouter = {
    register: (router) => {
        router
            .post('/domains', Security.requireLogin, DomainController.addDomain)
            .delete('/domains/:id', Security.requireLogin, DomainController.deleteDomain)
            .get('/domains/full', DomainController.getDomainsWithSkills)
            .get('/domains', DomainController.getDomains);
    }
};
module.exports = DomainRouter;
