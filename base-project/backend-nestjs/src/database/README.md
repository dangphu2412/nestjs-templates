-- https://www.postgresql.org/docs/current/sql-altertable.html#SQL-ALTERTABLE-ADD-CONSTRAINT

explain analyze select * from users
where username = 'test39444'

-- SELECT indexname FROM pg_indexes WHERE tablename = 'my_table';
- No indexing
```
"Seq Scan on users  (cost=0.00..1586.01 rows=1 width=129) (actual time=5.427..8.888 rows=1 loops=1)"
"  Filter: ((username)::text = 'test39444'::text)"
"  Rows Removed by Filter: 50000"
"Planning Time: 0.490 ms"
"Execution Time: 8.907 ms"
```

- B-tree Index Scan, Overlap on unique index using "IDX_users_username_key" on users  (cost=0.00..8.02 rows=1 width=129)
```
"Index Scan using ""IDX_users_username_key"" on users  (cost=0.41..8.43 rows=1 width=136) (actual time=0.195..0.196 rows=1 loops=1)"
"  Index Cond: ((username)::text = 'test39444'::text)"
"Planning Time: 1.110 ms"
"Execution Time: 0.232 ms"
```

- B-tree without unique index
```
"Index Scan using ""IDX_users_username_key"" on users  (cost=0.41..8.43 rows=1 width=129) (actual time=0.134..0.135 rows=1 loops=1)"
"  Index Cond: ((username)::text = 'test39444'::text)"
"Planning Time: 0.784 ms"
"Execution Time: 0.176 ms"
```

- B-tree Indexing using unique key index
```
"Index Scan using ""UQ_users_username_key"" on users  (cost=0.41..8.43 rows=1 width=129) (actual time=0.146..0.148 rows=1 loops=1)"
"  Index Cond: ((username)::text = 'test39444'::text)"
"Planning Time: 0.088 ms"
"Execution Time: 0.195 ms"
```

- Indexing using hash index
```
"Bitmap Heap Scan on users  (cost=9.82..558.26 rows=235 width=136) (actual time=0.112..0.114 rows=1 loops=1)"
"  Recheck Cond: ((username)::text = 'test39444'::text)"
"  Heap Blocks: exact=1"
"  ->  Bitmap Index Scan on ""IDX_users_username_key""  (cost=0.00..9.76 rows=235 width=0) (actual time=0.053..0.053 rows=1 loops=1)"
"        Index Cond: ((username)::text = 'test39444'::text)"
"Planning Time: 0.728 ms"
"Execution Time: 0.160 ms"
```
