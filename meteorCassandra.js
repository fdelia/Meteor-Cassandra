if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function() {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button#increase': function() {
      // increment the counter when button is clicked
      // Session.set('counter', Session.get('counter') + 1);
      Meteor.call('increase', function(error, result){

      });
    },
    'click button#get': function() {
      Meteor.call('getNumber', function(error, result){

      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup

    var cassandra = Meteor.npmRequire('cassandra-driver');
    // add your addresses here
    var client = new cassandra.Client({
      contactPoints: ['127.0.0.1'],
      keyspace: 'ks1'
    });



    // var query = 'SELECT email, last_name FROM user_profiles WHERE key=?';
    // client.execute(query, ['guy'], function(err, result) {
    //   if (err){
    //     throw new Meteor.Error('query-error', err);
    //   }
    //   console.log('got user profile with email ' + result.rows[0].email);
    // });


  });

  Meteor.methods({
    'increase': function() {
      console.log(this.connection);

    },
    'getNumber': function() {

    }
  });
}