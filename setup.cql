create keyspace ks1 with replication = {'class':'SimpleStrategy', 'replication_factor': '2'};
use ks1;

create table counters (counter_id int PRIMARY KEY, connection_id VARCHAR, clicks int);
create index connection_id on counters (connection_id);




