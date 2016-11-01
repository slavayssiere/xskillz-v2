'use strict';

const assert = require('assert');
const Database = require('../../src/database');
const API = require('./api');

describe('API', function () {
    before(() => {
        require('../../src/index');
    });
    beforeEach(() => Database.clear());
    it('should show You know, for skills :)', (done) => {
        API
            .getRoot()
            .then((res) => {
                assert.equal(res.text, 'You know, for skills :)');
            })
            .then(done)
            .catch(done);
    });

    it('get all domains', (done) => {
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addDomain('MyDomain', res.body.token))
            // When
            .then(() => API.getDomains())
            // Then
            .then((res) => {
                const domain = res.body[0];
                delete domain.id;
                assert.deepEqual(res.body, [{name: 'MyDomain', color: '#CCCCCC'}]);
            })
            .then(done)
            .catch(done);
    });

    it('should delete a domain', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => user = res.body)
            .then(() => API.addDomain('MyDomain', user.token))
            .then(() => API.getDomains())
            // When
            .then((res) => API.deleteDomain(res.body[0].id, user.token))
            // Then
            .then((res) => {
                assert.deepEqual(res.body,
                    {
                        "deleted": true
                    });
            })
            .then(done)
            .catch(done);
    });

    it('should get all skills', (done) => {
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addSkill('Skill', 2, true, res.body.token))
            // When
            .then(() => API.getSkills())
            // Then
            .then((res) => {
                const skill = res.body;
                delete skill[0].id;
                assert.deepEqual(res.body,
                    [
                        {
                            domain: {
                                color: null,
                                id: null,
                                name: null
                            },
                            name: 'Skill',
                            numAllies: 1
                        }
                    ]);
                done();
            })
            .catch((err) => done(err));
    });

    it('should add a skill on two different users', (done) => {
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addSkill('Skill', 2, true, res.body.token))
            .then(() => API.createUser('Benjamin', 'blacroix@xebia.fr'))
            .then(() => API.signin('blacroix@xebia.fr'))
            .then((res) => API.addSkill('Skill', 1, false, res.body.token))
            .then(() => API.getSkills())
            .then((res) => {
                delete res.body[0].id;
                assert.deepEqual(res.body, [
                    {
                        "domain": {
                            color: null,
                            "id": null,
                            "name": null
                        },
                        "name": "Skill",
                        "numAllies": 2
                    }
                ]);
            })
            .then(done)
            .catch((err) => done(err));
    });

    it('should merge two skills', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => {
                user = res.body;
                return API.addSkill('Skill1', 2, true, user.token);
            })
            .then(() => API.addSkill('Skill2', 1, false, user.token))
            .then(() => API.getSkills())
            // When
            .then((res) => {
                const skillId1 = res.body[0].id;
                const skillId2 = res.body[1].id;
                return API.mergeSkills(skillId1, skillId2, user.token);
            })
            // Then
            .then((res) => {
                assert.deepEqual(res.body, {merged: true});
            })
            .then(done)
            .catch((err) => done(err));
    });

    it('should get all users', (done) => {
        let domain;
        let user;
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addDomain('MyDomain', res.body.token))
            .then((res) => {
                domain = res.body;
            })
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => {
                user = res.body;
                return API.addSkill('Skill', 2, true, user.token);
            })
            .then((res) => API.addSkillToDomain(res.body.skill_id, domain.id, user.token))
            // When
            .then(() => API.getUsers(user.token))
            // Then
            .then((res) => {
                const users = res.body;
                delete users[0].id;
                delete users[0].domains[0].id;

                assert.deepEqual(users,
                    [
                        {
                            "domains": [
                                {color: "#CCCCCC", score: 2, name: "MyDomain"}
                            ],
                            "experienceCounter": 0,
                            "gravatarUrl": "//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc",
                            "name": "Julien",
                            score: 2
                        }
                    ]);
            })
            .then(done)
            .catch(done);
    });

    it('should get all updates', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja2@xebia.fr')
            .then(() => API.signin('jsmadja2@xebia.fr'))
            .then((res) => {
                user = res.body;
                return API.addSkill('Skill3', 2, true, user.token);
            })
            .then(() => API.addSkill('Skill4', 1, false, user.token))
            .then(() => API.getUpdates(user.token))
            .then((res) => {
                assert.deepEqual(res.body[0].updates.map((update)=>update.skill.name).sort(), ["Skill3", "Skill4"]);
            })
            .then(done)
            .catch((err) => done(err));
    });
});