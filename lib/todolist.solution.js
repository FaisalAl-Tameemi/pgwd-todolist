'use strict';

const _ = require('lodash');
const uuid = require('uuid/v4');

const todolist = {
  _items: [{
    id: uuid(),
    text: 'Example todo item',
    is_completed: false
  }],
  all: function(){
    return this._items;
  },
  count: function(){
    return this._items.length;
  },
  find: function(id){
    const todo = _.find(this._items, {id: id});
    if(!todo){
      return -1;
    }
    return todo;
  },
  findByStatus: function(status){
    return this._items.filter(item => item.is_completed === status);
  },
  statusCounts: function(){
    const counts = _.countBy(this._items, 'is_completed');
    return {
      completed: counts['true'] ? counts['true'] : 0,
      not_completed: counts['false'] ? counts['false'] : 0
    };
  },
  create: function(text){
    if(!text){ throw 'A text value is required for adding a todo item.' }
    // add the new todo to the list
    const new_item = {
      id: uuid(),
      text: text,
      is_completed: false
    };
    this._items.push(new_item);
    return new_item;
  },
  delete: function(item_id){
    const index = _.findIndex(this._items, { 'id': item_id });
    if(index > -1){
      return this._items.splice(index, 1);
    }
    throw new Error('invalid id');
  },
  toggleStatusById: function(item_id){
    const index = _.findIndex(this._items, { 'id': item_id });
    if(index > -1){
      return this._items[index].is_completed = !this._items[index].is_completed;
    }
    throw 'invalid id';
  }
};

module.exports = todolist;
