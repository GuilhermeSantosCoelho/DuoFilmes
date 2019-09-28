create database if not exists Projeto;
use Projeto;

create table if not exists usuarios(
	username varchar(20) primary key,
    senha varchar(20)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table if not exists video(
	id int primary key auto_increment,
	nome varchar(100),
    imagem varchar(100)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table if not exists estado(
	video_id int,
	estado varchar(10),
    instante varchar(20),
    foreign key(video_id) references video(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table if not exists convite(
	id_convite int primary key auto_increment,
	video_id int,
	convite varchar(20),
    convidado varchar(20),
    aceito int,
    FOREIGN KEY(video_id) REFERENCES video(id),
    FOREIGN KEY(convite) REFERENCES usuarios(username),
	FOREIGN KEY(convidado) REFERENCES usuarios(username)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
