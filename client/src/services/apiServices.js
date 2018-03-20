//Lillian
import axios from 'axios'
const services = {}

//user manipulation
services.getUser = (username) => {
	return axios.get()
}

services.createUser = (things) => {
	return axios({
		method: 'POST',
		url: 'api/users',
		data: {
			user_name: things.user_name,
			password: things.password
		}
	})
}

services.updateUserInfo = (things,username) => {
	return axios({
		method: 'PUT',
		url: `api/users/${username}`,
		data: {
			password: things.password
		}
	})
}

services.deleteUser = (username) => {
	return axios.delete(`api/users/${username}`)
}

//post manipulation

services.getAllPosts = () => {
	return axios.get('/api/posts/feed')
}
services.createOnePost = (thing) => {
	return axios({
		method: 'POST',
		url: '/api/post',
		data: {
			content: thing.content,

		}
	})
}

export default services