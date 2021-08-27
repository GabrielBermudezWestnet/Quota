let mongoose = require('mongoose')
let Schema = mongoose.Schema

let nodeSchema = new Schema({
	node_id: Number,
	node_name: String,
	node_status: String,
	server_id: Number,
	server_name: String,
	server_status: String,
	url: String,
	subnet: Number,
	geocode: String,
	vlan: Number,
})

nodeSchema.statics.AddNode = function(node, callback){
	return this.create(node,callback)
}

nodeSchema.statics.RemoveAllNodes = function(callback){
	return this.deleteMany({},callback)
}

nodeSchema.statics.FindAllNodes = function(callback){
	return this.find({}, callback)
}

module.exports = mongoose.model('nodes', nodeSchema)