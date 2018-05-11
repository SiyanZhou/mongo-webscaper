CREATE TABLE happiness (
    country VARCHAR (100) NOT NULL,
    code VARCHAR (3) NOT NULL,
    year INT NOT NULL,
    happiness_idx DECIMAL (60, 0) NOt NULL
);

CREATE TABLE gdp (
    country VARCHAR (100) NOT NULL,
    code VARCHAR (3) NOT NULL,
    year INT NOT NULL,
    real_gdp DECIMAL (60,0) NOT NULL
);

CREATE TABLE gini (
    country VARCHAR (100) NOT NULL,
    code VARCHAR (3) NOT NULL,
    year INT NOT NULL,
    gini_idx DECIMAL (60,0) NOT NULL
);

CREATE TABLE life (
    country VARCHAR (100) NOT NULL,
    code VARCHAR (3) NOT NULL,
    year INT NOT NULL,
    life_span DECIMAL (60,0) NOT NULL
);

CREATE TABLE internet (
    country VARCHAR (100) NOT NULL,
    code VARCHAR (3) NOT NULL,
    year INT NOT NULL,
    internet_use DECIMAL (60,0) NOT NULL
);