import mysql from 'mysql';
import ErrorHandler from './error/ErrorHandler';

const withDB = async (operations, res) => {
  const errorHandler = new ErrorHandler();

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
    errorHandler.handleErrors(error, res);
  }
};

export default withDB;
