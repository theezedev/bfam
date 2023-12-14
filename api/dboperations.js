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

async  function  getFamilyMembers(x) {
  try {
    const sql = "SELECT m.bfamMemberID, m.userID, m.bfamMemberStatus, m.bfamMemberJoinedAt, m.bfamMemberRole, u.userFirstName, u.userLastName, u.userTitle, u.userProfPic FROM tblBFamMembers AS m LEFT JOIN tblUsers AS u ON u.userID = m.userID WHERE m.bfamID = ?";
    const [rows] = await db.connection.execute(sql, x);
    return rows;
  }
  catch (error) {
    console.log(error);
  }
}


module.exports = {
  insertAPILog: insertAPILog,
  getFamilyMembers:  getFamilyMembers,
}
