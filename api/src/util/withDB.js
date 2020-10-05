import mysql from 'mysql';
import ErrorHandler from './error/ErrorHandler';

const withDB = async (operations, res) => {
  const errorHandler = new ErrorHandler();

  try {
    const conn = mysql.createConnection({
      user             : process.env.MYSQL_USER,
      password         : process.env.MSYQL_PASSWORD,
      host             : process.env.MYSQL_HOST,
      database         : process.env.MYSQL_DATABASE,
      port             : process.env.MYSQL_PORT,
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
