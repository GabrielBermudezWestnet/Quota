const axios = require('axios')
let Node = require('../models/NodeModel')

exports.action_nodes = (req, res, next) => {
	axios.post(process.env.URL_AUTH_TOKEN, {
		username: process.env.USERNAME_API,
		password: process.env.PASSWORD_API,
		client_id: process.env.CLIENT_ID_API,
		client_secret: process.env.CLIENT_SECRET_API,
		grant_type: process.env.GRANT_TYPE_API,
	})
		.then((response) => {
			const token = response.data.access_token
	        console.log(token)
			axios.post(process.env.URL_NODES, {}, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then((nodes) => {
				Node.RemoveAllNodes((err) => {
					nodes.data.data.forEach((node) => {
						let node_model = new Node({
							node_id: node.node_id,
							node_name: node.node_name,
							node_status: node.node_status,
							server_id: node.server_id,
							server_name: node.server_name,
							server_status: node.server_status,
							url: node.url,
							subnet: node.subnet,
							geocode: node.geocode,
							vlan: node.vlan
						})
						Node.AddNode(node_model, (err) => {
							if(err){
								return next(err)
							}
							console.log(`Node: ${node.node_id} - ${node.node_name}`)
						})
					})
				})
			})
		})
	return res.status(200).send({
		status:200,
		error:false,
		message: "Nodes Loaded Successfully"
	})
}

exports.action_search_nodes = (req, res, next) => {
	Node.FindAllNodes((error, nodes) => {
		return res.status(200).send({
			status:200,
			error:false,
			data: nodes,
		})
	})
}