
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

const db = require('../lib/todolist');

describe('TodoList', () => {
  describe('#all', () => {
    it('should return results as an array', () => {
      assert.typeOf(db.all(), 'array');
    });

    it('should return all the available todo lists (default: 1)', () => {
      assert.equal(db.all().length, 1, `Length of all items starts at 1`);
    });
  });

  describe('#create', () => {
    it('should accept a string param as the todo text and return the todo object after creation', () => {
      const before_count = db.count();
      const new_todo = db.create('watch movie');
      new_todo.should.be.an('object');
      new_todo.should.have.property('text');
      assert.equal(before_count + 1, db.count());
    });

    it('should automatically add an `id` and `is_completed` (and `text` from the argument)', () => {
      const new_todo = db.create('watch movie 2');
      new_todo.should.have.property('id').and.is.a('string');
      new_todo.should.have.property('is_completed').and.is.equal(false);
      assert.equal(db.find(new_todo.id).is_completed, false, `An item's status is false by default.`);
    });
  });

  describe('#findByStatus', () => {
    it('should be able to find all elements having a certain status');
  });

  describe('#toggleStatusById', () => {
    it('should be able to toggle the status of a todo item using its id', () => {
      const new_todo = db.create('do laundry');
      db.toggleStatusById(new_todo.id);
      assert.equal(db.find(new_todo.id).is_completed, true, `The status of item.id = ${new_todo.id} hasn't changed.`);
    });
  });

  describe('#delete', () => {
    it('should be able to delete an item by its id', () => {
      const new_todo = db.create('do homework');
      const before_count = db.count();
      db.delete(new_todo.id);
      assert.equal(db.count(), before_count - 1, `The number of todo items hasn't changed after #delete.`);
    });

    it('should throw an `invalid id` error if the ID is not found', () => {
      (() => db.delete('abc')).should.Throw(Error, 'invalid id');
    });
  });

  describe('#find', () => {
    it('should be able to find an item by its id', () => {
      const new_todo = db.create('write mocha tests');
      const result = db.find(new_todo.id);
      assert.equal(new_todo, result);
    });

    it('should return -1 if the ID is not found', () => {
      assert.equal(db.find('abc'), -1);
    });
  });

  describe('#statusCounts', () => {
    it('should be able to return an object containing the counts of each status');
  });
});
