const db = require('./dbconfig');

const insertAPILog = (logData) => {
  return new Promise((resolve, reject) => {
    db.connection.query(
      'INSERT INTO tblAPILogs (reqTimestamp, reqMethod, reqPath, reqQueryParameters, reqRequestBody, reqResponseStatus, reqResponseBody, reqUserAgent, reqRemoteIP, reqUserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        new Date(), // req_timestamp
        logData.req_method || null,
        logData.req_path || null,
        logData.req_query_parameters || null,
        logData.req_request_body || null,
        logData.req_response_status || null,
        logData.req_response_body || null,
        logData.req_user_agent || null,
        logData.req_remote_ip || null,
        logData.req_user_id || null,
      ],
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

async  function  getBFamMembers(x) {
  try {
    const sql = "SELECT m.bfamMemberID, m.userID, m.bfamMemberRole, u.userFirstName, u.userLastName FROM tblBFamMembers AS m LEFT JOIN tblUsers AS u ON u.userID = m.userID WHERE m.bfamID = ?";
    const [rows] = await db.connection.execute(sql, [x]);
    return rows;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  getFeed(x) {
  try {
    
    const sqlPosts = "SELECT a.*, CONCAT(b.userFirstName , ' ' , b.userLastName) as userFullName, 'Post' as 'postType' FROM tblPosts as a LEFT JOIN tblUsers as b ON a.userID = b.userID WHERE bfamID = ? AND postStatus = 1 ORDER BY a.postCreated DESC LIMIT 30";
    const [rowsPosts] = await db.connection.execute(sqlPosts, [x]);

    const sqlEvents = "SELECT a.*, CONCAT(b.userFirstName , ' ' , b.userLastName) as userFullName, 'Event' as 'postType' FROM tblEvents as a LEFT JOIN tblUsers as b ON a.userID = b.userID WHERE bfamID = ? AND eventStatus = 1 AND eventSDate >= CURDATE() ORDER BY a.eventSDate ASC LIMIT 30";
    const [rowsEvents] = await db.connection.execute(sqlEvents, [x]);

    const combinedRows = { Posts: rowsPosts, Events: rowsEvents };
    // console.log(combinedRows);

    return combinedRows;
  }
  catch (error) {
    console.log(error);
  }
}

async  function getMyBFams(x) {
  try {
    const sql = "SELECT a.bfamID, b.bfamName FROM tblBFamMembers as a LEFT JOIN tblBFams as b ON a.bfamID = b.bfamID WHERE userID = ? ORDER BY b.bfamName ASC";
    const [rows] = await db.connection.execute(sql, [x]);
    return rows;
  }
  catch (error) {
    console.log(error);
  }
}

async  function getUserInfo(x) {
  try {
    const sql = "SELECT a.*,(SELECT bfamID FROM tblBFamMembers WHERE userID = a.userID AND isDefault = 1) AS 'bfamID' FROM tblUsers AS a WHERE a.userAuthID = ?;";
    const [rows] = await db.connection.execute(sql, [x]);

    const sqlPlatforms = "SELECT * FROM tblPlatforms WHERE userID = ?";
    const [rowsPlatforms] = await db.connection.execute(sqlPlatforms, [rows[0].userID]);

    rows[0].platforms = rowsPlatforms;

    return rows;
  }
  catch (error) {
    console.log(error);
  }
}

async  function getMemberInfo(x) {
  try {
    const sql = "SELECT a.*,(SELECT bfamID FROM tblBFamMembers WHERE userID = a.userID AND isDefault = 1) AS 'bfamID' FROM tblUsers AS a WHERE a.userID = ?;";
    const [rows] = await db.connection.execute(sql, [x]);

    const sqlPlatforms = "SELECT * FROM tblPlatforms WHERE userID = ?";
    const [rowsPlatforms] = await db.connection.execute(sqlPlatforms, [rows[0].userID]);

    rows[0].platforms = rowsPlatforms;

    return rows;
  }
  catch (error) {
    console.log(error);
  }
}

async function postNewBFam(userID, bfamName, isDefault) {
  try {
    const selectSql = 'SELECT bfamID FROM tblBFams WHERE bfamName = ? AND bfamOwner = ?';
    const [existingFamRows] = await db.connection.execute(selectSql, [bfamName, userID]);

    if (existingFamRows.length > 0) {
      return { error: 'A family with the same name and owner already exists' };
    }

    const insertSql = 'INSERT INTO tblBFams (bfamName, bfamOwner) VALUES (?, ?)';
    const [insertResult] = await db.connection.execute(insertSql, [bfamName, userID]);

    if (insertResult.affectedRows === 1) {
      const [newBFamRows] = await db.connection.execute(selectSql, [bfamName, userID]);
      const newBFamID = newBFamRows[0].bfamID;

      const sqlDefault = 'UPDATE tblBFamMembers SET isDefault = 0 WHERE userID = ?';
      const [defaultResult] = await db.connection.execute(sqlMember, [ userID ]);


      const sqlMember = 'INSERT INTO tblBFamMembers (bfamID, userID, isDefault) VALUES (?,?,?)';
      const [memberResult] = await db.connection.execute(sqlMember, [newBFamID, userID, isDefault]);

      return { lastInsertedId: newBFamID };
    } else {
      throw new Error('Failed to insert into tblBFams');
    }
  } catch (error) {
    console.error('Error in postNewBFam:', error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

module.exports = {
  insertAPILog: insertAPILog,
  getBFamMembers: getBFamMembers,
  getFeed: getFeed,
  getMyBFams: getMyBFams,
  getUserInfo: getUserInfo,
  getMemberInfo: getMemberInfo,
  //POSTS
  postNewBFam: postNewBFam,
}
