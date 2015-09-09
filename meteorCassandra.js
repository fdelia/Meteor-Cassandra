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

      });
    },
    'click button#get': function() {
      Meteor.call('getNumber', function(error, result) {
        if (err)
          console.error(err);
        else
          Session.set('counter', result);
      });
    }
  });
}

if (Meteor.isServer) {
  var client;

  Meteor.startup(function() {
    // code to run on server at startup

    var cassandra = Meteor.npmRequire('cassandra-driver');
    // add your addresses here
    client = new cassandra.Client({
      contactPoints: ['127.0.0.1'],
      keyspace: 'ks1'
    });


  });

  Meteor.methods({
    'increment': function() {
      console.log(this.connection);

    },
    'getNumber': function() {
      var query = 'SELECT * FROM counters WHERE connection_id=?';

      client.execute(query, [this.connection.id], function(error, result) {
        if (error) {
          throw new Meteor.Error('query-error', error);
        }
        console.log(result.rows);
      });
    }
  });
}