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
        add : async (payload) => {
            const error = {};
            if(payload.title === '') {
                error.title = "Isi judul dari todo";
                return {code : 1, error}
            }
            const id = await db.insert(payload, ['id']).into('todo');
            return {code : 0, id : id[0].id}
        },
        delete : async (id) => {
            if(id === undefined) {
                return {code : 1, error: "Tidak ada id disediakan"}
            } else {
                const status = false;
                if(await db('todo').where('id', id).del()){
                    return {code : 0, msg: "Data berhasil di hapus"}
                } else {
                    return {code : 2, msg: "Data gagal di hapus"}
                }
            }
        }

    }

    return todo;
}

module.exports = Todo;