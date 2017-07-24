var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = Schema(
  {
	first_name: {type: String, required: true, max: 100},
	family_name: {type: String, required: true, max: 100},
	date_of_birth: {type: Date},
	date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
	.virtual('name')
	.get(function () {
		return this.family_name + ', ' + this.first_name;
	});

// Virtual for lifespan
AuthorSchema
	.virtual('lifespan')
	.get(function() {
		var lifetime_string = '';
		if(this.date_of_birth) {
			lifetime_string+=moment(this.date_of_birth).format('MMMM DD, YYYY');
		}

		lifetime_string+=' - ';

		if(this.date_of_death) {
			lifetime_string+=moment(this.date_of_death).format('MMMM DD, YYYY');
		}

		if(lifetime_string == ' - ') {
			lifetime_string = 'Unknown';
		}

		return lifetime_string;

	});

// Virtual for author DOB
AuthorSchema
	.virtual('date_of_birth_formatted')
	.get(function(){
		return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
	});

// Virtual for author DOD
AuthorSchema
	.virtual('date_of_death_formatted')
	.get(function(){
		return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
	});

// Virtual for author's URL
AuthorSchema
	.virtual('url')
	.get(function () {
		return '/catalog/author/' + this._id;
	});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);