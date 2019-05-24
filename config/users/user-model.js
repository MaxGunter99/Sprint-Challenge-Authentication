
//IMPORTS ⬇︎
const db = require( '../../database/dbConfig' );

//EXPORTS ⬇︎
module.exports = {
    add,
    find,
    findBy,
}

function find() {
    return db('users').select('id', 'username')
};

//LOGIN FUNCTIONS
function findBy( filter ) {
    return db( 'users' ).where( filter );
};

//REGISTER FUNCTIONS
async function add( user ) {
    const [ id ] = await db( 'users' ).insert( user );
    return ( findById( id ));
};