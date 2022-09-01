# Pagination standard

## Limit offset base pagination
Many example about this standard due to this is a part of SQL syntax. Very little of business logic required
There are some pros  & cons of this kind of pagination:

### Benefits:
- Easiest to implement, almost passing into the SQL syntax.
- Stateless on the server -> data would depend on the server side changes.
- Work consistency with any kind of sorting.

### Downsides:
- Performance issues for large offset values. Let's say that we have to get 10 data from the offset of 10000000. So the database need to scan over 10000000, starting with 0 and throw over 10000000 records (this is such a wasting).
- Not consistency when record changes - inserted or deleted. Especially when we sorting to get the latest item first. For example, we sort decreasingly by ID:
+ First, the database contains 20 records, we **GET /items?limit=20&offset=0&sort=-id** and retrieve 20 items.
+ Next, 10 records inserted into the database.
+ And finally, we do **GET /items?limit=20&offset=20&sort=-id**, because of insertion of 10 records, 20 records has been pushed back to 10 items. So now, we can get 10 records instead of 0 compare to the beginning.

<!-- TODO: Continue in investigate  -->
## Key set base pagination
There are some performance issue and also the consistency of data when using limit offset based pagination when we use this strategy in some system like timestamp or log system. 
So we come up with a new strategy to catch this up. Key set pagination use limit to get the size of data. The identify key help us to retrieve records much faster than scan over the whole offset size.

### Benefits:
- Consistency sorting even if new records inserted.
- No performance issue with large records.

### Downsides:
- Stick pagination and filter together

### Downsides:

## Seek pagination