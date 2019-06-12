DROP TABLE IF EXISTS calc_history;
DROP TABLE IF EXISTS operator_string;

-- List allowed operator strings
CREATE TABLE operator_string (
    val VARCHAR(3) PRIMARY KEY
);

INSERT INTO 
    operator_string (val)
    VALUES ('ADD')
    , ('SUB')
    , ('MUL')
    , ('DIV');

-- History of expressions previously evaluated by the calculator
CREATE TABLE calc_history (
	id SERIAL PRIMARY KEY
	, arg1 NUMERIC NOT NULL
	, arg2 NUMERIC NOT NULL
    , operator_string VARCHAR(3) NOT NULL REFERENCES operator_string(val)
    , ans NUMERIC NOT NULL
    , submit_timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);
