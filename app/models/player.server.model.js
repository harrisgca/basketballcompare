'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
	firstName: {
			type: String,
			default: '',
			required: 'Please fill Player name',
			trim: true
		},
	lastName: String,
	seasons:[],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Player', PlayerSchema);