if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function() {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button#increment': function() {
      // increment the counter in the db
      Meteor.call('increment', function(error, result) {
        if (error)
          console.error(error);
      });
    },
    'click button#get': function() {
      Meteor.call('getNumber', function(error, result) {
        if (error)
          console.error(error);
        else
          Session.set('counter', result);
      });
    }
  });
}

if (Meteor.isServer) {
  var client;

  Meteor.startup(function() {
    var cassandra = Meteor.npmRequire('cassandra-driver');

    client = new cassandra.Client({
      // add your nodes here
      contactPoints: ['127.0.0.1'],
      //
      keyspace: 'ks1'
    });
  });


  function getRow(connectionId) {
    var query = "SELECT * FROM counters WHERE connection_id=?";
    var params = [connectionId];

    // make async look sync
    var clientSync = Meteor.wrapAsync(client.execute, client);
    try {

      var res = clientSync(query, params);

      if (res.rows.length > 0) return res.rows[0];
      else return undefined;

    } catch (error) {
      console.log(error);
      // not sure how to get the message in error
      throw new Meteor.Error('select-query', error);
    }
  }

  Meteor.methods({
    'increment': function() {
      if (!this.connection.id) throw new Meteor.Error('no-connection-id', 'strange');
      var row = getRow(this.connection.id);

      // create or update
      if (!row) {
        var query = "INSERT INTO counters (connection_id, clicks) VALUES (?,?)";
        var params = [this.connection.id, 1];
      } else {
        var query = "UPDATE counters SET clicks=? WHERE connection_id=?";
        var params = [row['clicks'] + 1, this.connection.id];
      }

      var clientSync = Meteor.wrapAsync(client.execute, client);
      try {
        // prepare: true is bc the db reads javascript-numbers as double, not int
        return clientSync(query, params, {
          prepare: true
        });

      } catch (error) {
        console.log(error);
        throw new Meteor.Error('update-query', error);
      }
    },

    'getNumber': function() {
      var row = getRow(this.connection.id);
      return row && row['clicks'];
    }
  });
}