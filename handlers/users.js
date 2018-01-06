const Chance = require('chance');

const chance = new Chance();

module.exports = {

    get: (request, reply) => {

        const user = () => ({
            first: chance.first(),
            last: chance.last(),
            userId: chance.hash({
                casing: 'upper'
            })
        });

        const seedUser = chance.unique(user, 100, { // eslint-disable-line no-magic-numbers
            comparator(arr, val) {

                return arr.reduce((acc, item) => acc || (item.userId === val.userId), false);

            }
        });

        reply(seedUser);

    }
};
