CREATE DATABASE CompanyTalk;
USE CompanyTalk;

CREATE TABLE Departamento (
	id INT NOT NULL IDENTITY(1,1),
	nome NVARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE Funcao (
	id INT NOT NULL IDENTITY(1,1),
	nome NVARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE Pessoa (
    id INT NOT NULL IDENTITY(1,1),
	cpf NVARCHAR(15),
	nome NVARCHAR(100),
    sexo NVARCHAR(10),
    dataNascimento NVARCHAR(30),
	telefone NVARCHAR(15),
	email NVARCHAR(100),
	funcaoId INT,
    departamentoId INT,
    senha NVARCHAR(200),
    salt NVARCHAR(200),
    ativo BIT DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (funcaoId) REFERENCES Funcao (id),
    FOREIGN KEY (departamentoId) REFERENCES Departamento (id)
);

CREATE TABLE Feed (
	id INT NOT NULL IDENTITY(1,1),
	titulo NVARCHAR(100),
    corpoFeed NVARCHAR(1000),
    linkImagem NVARCHAR(1000),
    dataPublicacao NVARCHAR(30),
    pessoaId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (pessoaId) REFERENCES Pessoa (id)
);

CREATE TABLE Reuniao (
	id INT NOT NULL IDENTITY(1,1),
	assunto NVARCHAR(100),
    corpoReunioes NVARCHAR(1000),
    dataReuniao NVARCHAR(30),
    horarioReuniaoInicio NVARCHAR(30),
    horarioReuniaoFinal NVARCHAR(30),
    pessoaId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (pessoaId) REFERENCES Pessoa (id)
);

CREATE TABLE LogEntrada (
    id INT NOT NULL IDENTITY(1,1),
	pessoaId INT,
    dataLog NVARCHAR(30),
    horaLog NVARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (pessoaId) REFERENCES Pessoa (id)
);

INSERT INTO Departamento (nome) VALUES ('TI'), ('Marketing'), ('Financeiro'), ('Secretaria');
INSERT INTO Funcao (nome) VALUES ('Desenvolvedor'), ('Redatora'), ('Contador'), ('Secretária');

INSERT INTO Pessoa (cpf, nome, sexo, dataNascimento, telefone, email, funcaoId, departamentoId, senha, salt, ativo) VALUES
('40989012859', 'Leonardo Moura', 'Masculino', '04/04/1999', '19984106699', 'leonardomartins1999@hotmail.com', 1, 1, 'senha1', 'AidhdouHDAdghsaD78SAgdas97', 1),
('36985214789', 'Estefani Martins', 'Feminino', '10/10/1989', '19984895623', 'estefani.martins@gmail.com', 2, 2, 'senha2', 'AidhdouHDAdghsaD78SAgdas97', 1),
('78945612336', 'Matheus Bonotto', 'Masculino', '20/02/2000', '19988745623', 'matheus.bonotto@gmail.com', 3, 3, 'senha3', 'AidhdouHDAdghsaD78SAgdas97', 1),
('15978923645', 'Gabrielle Moura', 'Feminino', '22/08/2001', '19982369587', 'gabrielle.moura@gmail.com', 4, 4, 'senha4', 'AidhdouHDAdghsaD78SAgdas97', 1);

INSERT INTO Feed (titulo, corpoFeed, linkImagem, dataPublicacao, pessoaId) VALUES
('Novos integrantes na empresa!', 'Dêem os parabéns para os novos colaboradores da empresa! Sejam muito bem-vindos: Nathália Mydori e Leonardo Moura.', 'welcome', '18/05/2021', 2),
('Reestruturação de departamentos.', 'A reestruturação dos departamentos acontecerá no próximo mês. As informações mais importantes serão descritas neste post, pois então fiquem espertos nos detalhes!', 
'people_united', '18/05/2021', 2),
('Aniversários do mês!', 'Aqui vem os próximos aniversários que haverá neste mês:
Yugo Harago - 11/04
Jessica Oliveira - 18/04
Letícia Silveira - 22/04', 'birthday', '18/05/2021', 2);

INSERT INTO Reuniao (assunto, corpoReunioes, dataReuniao, horarioReuniaoInicio, horarioReuniaoFinal, pessoaId) VALUES
('Reestruturação do banco', 'Esta reunião servirá para discutirmos sobre a reestruturação do banco', '18/05/2021', '10:30:00', '11:30:00', 1),
('Festa de aniversário surpresa pra Letícia Silveira', 'Festa!!', '18/05/2021', '17:00:00', '17:30:00', 2),
('Tutorial Web', 'Workshop de programação avançada em linguagens Web', '18/05/2021', '10:30:00', '11:30:00', 3),
('Verticais', 'Apresentação sobre as novas verticais da empresa.', '18/05/2021', '13:30:00', '14:30:00', 4);

INSERT INTO LogEntrada (pessoaId, dataLog, horaLog) VALUES (1, '05/04/2020', '17:00:00'), (2, '05/04/2020', '15:00:00'), (3, '01/05/2020', '10:30:00');

SELECT * FROM Departamento;
SELECT * FROM Funcao;
SELECT * FROM Pessoa;
SELECT * FROM Feed;
SELECT * FROM Reuniao;
SELECT * FROM LogEntrada;

-- DELETE FROM LogEntrada;
-- DELETE FROM Reuniao;
-- DELETE FROM Feed;
-- DELETE FROM Pessoa;
-- DELETE FROM Funcao;
-- DELETE FROM Departamento;

-- DROP TABLE LogEntrada;
-- DROP TABLE Reuniao;
-- DROP TABLE Feed;
-- DROP TABLE Pessoa;
-- DROP TABLE Funcao;
-- DROP TABLE Departamento;

UPDATE Pessoa
SET departamentoId = 2, funcaoId = 2
WHERE Id = 2