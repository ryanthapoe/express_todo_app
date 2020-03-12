const db = require('../config/db');

const Todo = () => {
    const todo = {
        get : (id) => {
            if(id === undefined) {
                return db.select('id','title', 'description', 'done_status').from('todo');
            } else {
                return db.select('id','title','description','done_status').where({id}).from('todo');
            }
        },

    }

    return todo;
}

module.exports = Todo;