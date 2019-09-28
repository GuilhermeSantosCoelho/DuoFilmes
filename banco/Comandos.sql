/* inserts */
insert into convite values(null,5,'Skazybad','Guilherme',0);
INSERT INTO usuarios VALUES('Claudia','123456');

insert into video values(null,'Transformers - A era da extinção','tf4');
insert into video values(null,'Harry Potter e a Ordem da Fênix','hp5');
insert into video values(null,'Harry Potter e o cálice de Fogo','hp4');
insert into video values(null,'Um amor pra recordar','uapr');

/* selects */
SELECT * FROM convite c, video v WHERE c.convidado = 'Skazybad' AND v.id = c.video_id;
SELECT * FROM convite c, video v WHERE c.convidado = 'Guilherme' AND v.id = c.video_id;
SELECT * FROM convite c INNER JOIN video v ON v.id = c.video_id and c.convidado = 'Guilherme';

select * from usuarios;
select * from video;
select * from convite;
select * from estado;

/* deletes */
DELETE FROM convite  WHERE id_convite = 5;
DELETE FROM video  WHERE id = 2;

/* drops */
drop table video;
drop table convite;
drop table estado;
drop table usuarios;

drop database Projeto;