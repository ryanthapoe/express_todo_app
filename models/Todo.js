const db = require('../config/db');
const { isEmpty } = require('../lib/helper');

module.exports = {
    get : (id) => {
        if(id === undefined) {
            return db.select('id','title', 'description', 'done_status').from('todo').orderBy(['done_status', {column : 'id', order: 'desc'}]);
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
    updateStatus: async(id) => {
        if(id === undefined) {
            return {code : 1, msg : "ID not provided"}
        } else {
            const updated = await db('todo').where('id', id).update({done_status: true}, ['id']);
            return {code : 0, msg: "Data berhasil di approve", id: updated[0].id}
        }
    },
    update: async (payload) => {
        const error = {};
        if(payload.title === '') {
            error.title = "Isi judul dari todo";
        }

        if(payload.id === undefined){
            error.id = "Id tidak disediakan";
        }

        if(!isEmpty(error)){
            return {code : 1, error} 
        }

        const { id, title, description } = payload;

        const updated = await db('todo').where('id', id).update({title, description}, ['id']);
        if(updated){
            return {code : 0, msg: "Data berhasil di hapus", id: updated[0].id}
        } else {
            return {code : 2, msg: "Data gagal di hapus"}
        }
    },
    delete : async (id) => {
        if(id === undefined) {
            return {code : 1, error: "Tidak ada id disediakan"}
        } else {
            if(await db('todo').where('id', id).del()){
                return {code : 0, msg: "Data berhasil di hapus"}
            } else {
                return {code : 2, msg: "Data gagal di hapus"}
            }
        }
    }

};