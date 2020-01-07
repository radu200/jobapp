const { dbPromise } = require("./../../config/database.js");



module.exports.createRoom = async (req, res) => {
  try {
    const receiver_id = req.query.id
    const sender_id = req.user.id
    const user_role = req.user.type
    const db = await dbPromise;

    if (user_role === 'employer') {
      const [check] = await db.execute('SELECT * FROM chat_room WHERE jobseeker_id = ? AND  employer_id = ?', [receiver_id, sender_id])
      if (check.length > 0) {
        return res.status(409).json('Room already exist')
      }
      await db.query('INSERT INTO chat_room (jobseeker_id, employer_id) VALUES(?,?)', [receiver_id, sender_id])
      res.status(200).json('Success')

    } else if (user_role === 'jobseeker') {
      const [check] = await db.execute('SELECT * FROM chat_room WHERE jobseeker_id = ? AND  employer_id = ?', [sender_id, receiver_id])
      if (check.length > 0) {
       return  res.status(409).json('Room already exist')
      }
      await db.query('INSERT INTO chat_room (employer_id,jobseeker_id) VALUES(?,?)', [receiver_id, sender_id])
      res.status(200).json('Success')

    }
  } catch (err) {
    res.status(500).json('Server Error')
  }
}

module.exports.postMessage = async (req, res) => {

 
}

module.exports.getRooms = async (req, res) => {

  try {
    const user_id = req.user.id;
    const user_role = req.user.type
    const db = await dbPromise
    if (user_role === 'employer') {
      const [rooms] = await db.execute('SELECT chat_room.*, users.first_name, users.last_name FROM chat_room LEFT JOIN users ON  users.id = chat_room.jobseeker_id WHERE employer_id = ?', [user_id])
      const results = {}
      results.sender_id =  user_id
      results.rooms = rooms
      res.status(200).json(results)
    } else if (user_role === 'jobseeker') {
      const [rooms] = await db.execute('SELECT chat_room.*, users.first_name, users.last_name, users.company_name FROM chat_room LEFT JOIN users ON  users.id = chat_room.employer_id WHERE jobseeker_id = ?', [user_id])
      const results = {}
      results.sender_id =  user_id
      results.rooms = rooms
      res.status(200).json(results)
    }
  } catch (err) {
    res.status(500).json('Server Err')
  }
}

module.exports.getRoomDetails = async (req, res) => {

  try {
    const room_id = req.query.r_id;
    const jobseeker_id = req.query.j_id;
    const employer_id = req.query.e_id;
    const user_role = req.user.type
    const limit = 100;
    const db = await dbPromise
    const [jobseeker] = await db.execute(`SELECT * FROM chat_message WHERE message_user_id = ? AND room_id = ? LIMIT ${limit}`, [jobseeker_id, room_id])
    const [employer] = await db.execute(`SELECT * FROM chat_message WHERE message_user_id = ? AND room_id = ? LIMIT ${limit}`, [employer_id, room_id])

    if (user_role === 'employer') {
      const results = {
        sender: employer,
        receiver: jobseeker
      }

      res.status(200).json(results)
    } else if (user_role === 'jobseeker') {
      const results = {
        receiver: employer,
        sender: jobseeker
      }
      res.status(200).json(results)
    }

  } catch (err) {
    res.status(500).json('Server Err')
  }
}
