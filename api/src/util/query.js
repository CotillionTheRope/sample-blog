const query = async (db, sql, params) => {
  if (!params) {
    params = [];
  }

  return await new Promise((resolve, reject) => {
    db.query(sql, params, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        //console.log(res);
        resolve(res);
      }
    });
  });
}

export default query;
