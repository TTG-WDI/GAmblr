const db = require('../db/config');

module.exports = {

  //return every card in the database
  createUser(user) {
    return db.one(`INSERT INTO users (user_name, password, pic, bg, blog_name, blog_desc)
                    VALUES ($[user_name], $[password], $[pic], $[bg], $[blog_name], $[blog_desc]) RETURNING *`, user);
  },
  authenticate(user){
    return db.one(`SELECT * FROM users WHERE user_name = $[user_name] AND password = $[password]`, user)
  },

  listFollowing() {
    return db.many('SELECT user_name, blog_name, pic FROM followers INNER JOIN users ON following_id = users.id WHERE follower_id = 1')
  },

  followUser(user) {
    return db.one('INSERT INTO followers (follower_id, following_id) VALUES(`1`, $[following_id]) RETURNING *', user)
  },

  unfollowUser(user) {
    return db.none('DELETE FROM followers WHERE follower_id=$[follower_id] and following_id=$[following_id]', user)
  }

}