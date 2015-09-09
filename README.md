# Cassandra additionally to a conventional MeteorJs setup

An example on how to implement cassandra via the npm `cassandra-driver`.

## Steps I Did

* install meteor and cassandra
* `cassandra start` (or equivalent on your system/node)
* `meteor create meteorCassandra`
* `cd meteorCassandra`
* `meteor add meteorhacks:npm`
* start `meteor` to install npm and its packages, it will quit itself after finishing
* in packages.json add: `"cassandra-driver": "2.2.0"`
* start `meteor` again

* import dump `cqlsh  CassandraNEWhost -f mySchema.cdl`
(* export dump `echo -e "use ks1;\nDESCRIBE KEYSPACE;\n" | cqlsh  CassandraHost > mySchema.cdl`)