import mysql from 'mysql';

const withDB = async (operations, res) => {
  try {
    const conn = mysql.createConnection({
      user             : 'root',
      password         : 'r^TaOUTB386k1GZu',
      host             : 'db',
      database         : 'my_blog',
      port             : 3306,
      connectionTimeout: 1000,
    });

    const db = await new Promise((resolve, reject) => {
      conn.connect(err => {
        if(err){
          console.log(err);
          reject(err);
        }
        else {
          resolve(conn);
        }
      });
    })

    await operations(db);
    
    conn.end();
  }
  catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error});
  }
};

export default withDB;