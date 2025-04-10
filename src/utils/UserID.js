// const userID = null

// if (localStorage.getItem('id')) {
// 	userID = localStorage.getItem('id')
// } else {
// 	const id =  Date.now()
// 	localStorage.setItem('id', id)
// 	userID = id
// }

// v2
const userID = localStorage.getItem('id') ? localStorage.getItem('id') : Date.now()
if(!userID) localStorage.setItem('id', userID)

export default userID;