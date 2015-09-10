create keyspace ks1 with replication = {'class':'SimpleStrategy', 'replication_factor': '2'};
use ks1;

CREATE TABLE counters (connection_id VARCHAR PRIMARY KEY, clicks INT);
