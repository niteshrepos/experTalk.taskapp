var Task = Backbone.Model.extend({
	defaults: {
		title: "task"
	}
});

var TaskView = Backbone.View.extend({
	tagName: "li",

	events: {
		"click .edit": "editTask",
		"click .delete": "deleteTask"

	},

	deleteTask: function() {
		this.model.destroy();
	},

	initialize: function() {
		this.model.on("change", this.render, this);
		this.model.on("destroy", this.remove, this);
	},

	remove: function() {
		this.$el.remove();
	},

	editTask: function() {
		var result = prompt(this.model.get("title"));
		this.model.set("title", result);
	},

	template: _.template("<%= title %><button class='edit'>edit</button><button class='delete'>delete</button>"),

	render: function() {
		var html = this.template(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});

var TaskCollection = Backbone.Collection.extend({
	model: Task
});


var TaskCollectionView = Backbone.View.extend({

	tagName: "ul",

	initialize: function() {
		this.collection.on("add", function() {
			this.render();
		}, this);
	},

	render: function() {
		//loop  
		this.$el.html("");
		this.collection.each(function(task) {


			//init model view
			var taskView = new TaskView({
				model: task
			});

			//append modelView.el into taskView.el
			this.$el.append(taskView.render().el);

		}, this)

		return this;

	}

});

var AddTask = Backbone.View.extend({

	el: ".task",

	events: {
		"click .submit": "addTask"
	},

	initialize: function() {


	},
	addTask: function() {
		this.collection.add({
			title: $(".newTask").val()
		})
	}


});

var taskCollection = new TaskCollection([{
	title: "wakeup"
}, {
	title: "experTalk"
}, {
	title: "party"
}]);


var taskCollectionView = new TaskCollectionView({
	collection: taskCollection
});

var addTask = new AddTask({
	collection: taskCollection
});

$(".taskContainer").append(taskCollectionView.render().el);