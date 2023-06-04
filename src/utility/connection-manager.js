let connection;

module.exports = {
  setConnection:(newConnection) => {
    //console.log("Setting connection", newConnection);
    connection = newConnection;2
  },
  getConnection:() => {
    //console.log("Getting connection", connection);
    return connection;
  }
};