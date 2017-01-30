const _ = require('lodash');
const shortid = require('shortid');

const todolist = {
  _items: [{
    id: shortid.generate(),
    text: 'Example todo item',
    is_completed: false
  }],
  all: function(){
    return this._items;
  },
  // returns the count of all the items
  count: function(){
    // TODO: implement
  },
  // returns the item with a matching id
  // should return -1 of no item found
  find: function(id){
    // TODO: implement
  },
  findByStatus: function(status){
    // TODO: implement
  },
  create: function(text){
    // TODO: implement
  },
  delete: function(item_id){
    // TODO: implement
  },
  toggleStatusById: function(item_id){
    // TODO: implement
  }
};

module.exports = todolist;
