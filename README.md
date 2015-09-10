# Cassandra additionally to a conventional MeteorJs setup

An example on how to implement cassandra over Meteor methods and the npm `cassandra-driver`.

## Steps I Did

* install meteor and cassandra
* `meteor create meteorCassandra`
* `cd meteorCassandra`
* `meteor add meteorhacks:npm`
* start `meteor` to install npm and its packages, it will quit itself after finishing
* in packages.json add: `"cassandra-driver": "2.2.0"`
* start `meteor` again

* `cassandra start` (or equivalent on your system/node)
* import dump `cqlsh localhost -f mySchema.cdl`
(* for export use `echo -e "use ks1;\nDESCRIBE KEYSPACE;\n" | cqlshc localhost > mySchema.cdl`)

## Why not use Cassandra as primary DB?

I'd like to refer to the answer on [SO](http://stackoverflow.com/a/21683204/5215440).