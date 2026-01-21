# Basic SQL Commands

This document summarizes the most commonly used SQL commands with brief explanations and examples. It is suitable for beginners and quick revision.

---

## 1. Data Definition Language (DDL)

### CREATE

Used to create database objects such as databases and tables.

```sql
CREATE DATABASE company;

CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary DECIMAL(10,2)
);
```

### ALTER

Used to modify an existing table structure.

```sql
ALTER TABLE employees ADD email VARCHAR(100);
```

### DROP

Used to delete database objects permanently.

```sql
DROP TABLE employees;
```

### TRUNCATE

Used to remove all records from a table (faster than DELETE).

```sql
TRUNCATE TABLE employees;
```

---

## 2. Data Manipulation Language (DML)

### INSERT

Used to add new records to a table.

```sql
INSERT INTO employees (id, name, department, salary)
VALUES (1, 'Sijan', 'IT', 50000);
```

### SELECT

Used to retrieve data from a table.

```sql
SELECT * FROM employees;
SELECT name, salary FROM employees;
```

### UPDATE

Used to modify existing records.

```sql
UPDATE employees
SET salary = 55000
WHERE id = 1;
```

### DELETE

Used to remove records from a table.

```sql
DELETE FROM employees WHERE id = 1;
```

---

## 3. Constraints

Used to enforce rules on table columns.

```sql
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
CHECK
DEFAULT
```

Example:

```sql
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  age INT CHECK (age >= 18)
);
```

---

## 4. Filtering and Sorting

### WHERE

Filters records.

```sql
SELECT * FROM employees WHERE department = 'IT';
```

### ORDER BY

Sorts results.

```sql
SELECT * FROM employees ORDER BY salary DESC;
```

### LIMIT

Limits number of rows returned.

```sql
SELECT * FROM employees LIMIT 5;
```

---

## 5. Aggregate Functions

Used to perform calculations on multiple rows.

```sql
COUNT()
SUM()
AVG()
MIN()
MAX()
```

Example:

```sql
SELECT COUNT(*) FROM employees;
SELECT AVG(salary) FROM employees;
```

---

## 6. GROUP BY and HAVING

### GROUP BY

Groups rows with the same values.

```sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
```

### HAVING

Filters grouped results.

```sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 40000;
```

---

## 7. Joins

Used to combine rows from multiple tables.

### INNER JOIN

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d
ON e.department = d.department_id;
```

### LEFT JOIN

```sql
SELECT *
FROM employees
LEFT JOIN departments
ON employees.department = departments.department_id;
```

---

## 8. Subqueries

A query inside another query.

```sql
SELECT name
FROM employees
WHERE salary > (
  SELECT AVG(salary) FROM employees
);
```

---

## 9. Indexes

Used to improve query performance.

```sql
CREATE INDEX idx_salary ON employees(salary);
```

---

## 10. Basic Transaction Control

```sql
BEGIN;
COMMIT;
ROLLBACK;
```

Used to manage database transactions safely.

---

**End of File**
