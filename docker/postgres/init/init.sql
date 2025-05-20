CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(155),
    is_checked BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS colaboradores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(155),
    cargo VARCHAR(155),
    pode_desenvolver BOOLEAN DEFAULT FALSE
);