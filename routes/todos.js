var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://uma:uma@ds121222.mlab.com:21222/meantodosapp", ["todos"])

//Get All Todos
router.get("/todos", function(req, res){
	db.todos.find(function(err, data){
		if(err){
			res.send(err);
		} else {
			res.json(data);
		}
	});
})

//Get Single Todo

router.get("/todos/:id", function(req, res){
	db.todos.findOne({
		_id : mongojs.ObjectId(req.params.id)
	}, function(err, data){
		if(err){
			res.send(err)
		} else {
			res.json(data);
		}
	})
})

//Save todo

router.post('/todo', function(req, res){
	var todo = req.body;

	if(todo && todo.text){
		db.todos.save(todo, function(err, result){
			if(err){
				res.send(err)
			} else {
				res.send(result);
			}
		})		
	} else {
		res.status(400);
		res.json({
			"error" : "Invalid Data"
		})
	}

})

//Update todo
router.put('/todo/:id', function(req, res){
		var todo = req.body;
		console.log(todo)
		var updateObj = {};

		updateObj.text = todo.text ? todo.text : ''
		updateObj.isCompleted = todo.isCompleted ? todo.isCompleted : ''
		
	if(todo && todo.text){
		db.todos.update({
				_id : mongojs.ObjectId(req.params.id
			)}, updateObj, {}, function(err, result){
			if(err){
				res.send(err)
			} else {
				res.send(result);
			}
		})

	} else {		
		res.status(400);
		res.json({
			"error" : "Invalid Data"
		})
	}
})

// Delete todo
router.delete("/todo/:id", function(req, res){
	db.todos.remove({
		_id : mongojs.ObjectId(req.params.id)
	}, function(err, result){
		if(err){
			res.send(err);
		} else {
			res.json(result);
		}

	})
})

module.exports = router;