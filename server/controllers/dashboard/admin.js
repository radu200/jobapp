///check users and
const { dbPromise } = require("./../../config/database.js");


module.exports.getAllUsers = async  (req,res) => {
     const limit = 12
     const offset = req.query.offset

     try {
          const db = await dbPromise
          const [users] = await db.execute(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`)
          res.json(users)

     } catch(err){
       res.json({msg:err})
     }
}

module.exports.getCheckUsers = async (req,res) => {
     const limit = 12
     const offset = req.query.offset
     try{
          const db = await dbPromise
          const [users] = await db.execute(`SELECT * FROM users WHERE checked   = ? OR checked = ?  LIMIT ${limit} OFFSET ${offset} `,['no', null])
          res.json(users)
     } catch(err){
          res.json({msg:err})
      }
}
module.exports.getAllReportedUsers = async  (req,res) => {
     const limit = 12
     const offset = req.query.offset
     try{
          const db = await dbPromise
          const [users] = await db.execute(`SELECT reports.*, users.email, users.type, users.first_name, users.last_name FROM reports LEFT JOIN users ON reports.reported_user_id = users.id where reports.blacklist = ?  LIMIT ${limit} OFFSET ${offset} `,['no'])
          res.json(users)

     }catch(err){
       res.json({msg:err})
     }
}

module.exports.getAllBlackListedUsers = async  (req,res) => {
     const limit = 12
     const offset = req.query.offset
     try{
          const db = await dbPromise
          const [users] = await db.execute(` SELECT * FROM users WHERE blacklist = ?  LIMIT ${limit} OFFSET ${offset}`,['yes'])
          res.json(users)

     } catch(err){
          res.json({msg:err})
     }
}

module.exports.postBlackListeddUsers = async  (req,res) => {
     const userId  = req.body.data.id
     const reported =  req.body.data.reported
     try{
          const db = await dbPromise
          const [users] = await db.query('UPDATE users SET blacklist = ? WHERE id = ? ',['yes', userId])
         
          if(reported === 'reported'){
            const [reports] =  await db.query('UPDATE reports SET blacklist = ? WHERE reported_user_id = ? ',['yes', userId])
     
            console.log(reports)
          }
          res.json({msg:'Success'})

     } catch(err){
        res.json({msg:err})
     }
}



module.exports.unblockBlackListeddUsers = async  (req,res) => {
     const userId  = req.body.data.id
     const reported =  req.body.data.reported
     try{
          const db = await dbPromise
          await db.query('UPDATE users SET blacklist = ? WHERE id = ? ',['no', userId])
          res.json({msg:'Success'})

     } catch(err){
        res.json({msg:err})
     }
}


