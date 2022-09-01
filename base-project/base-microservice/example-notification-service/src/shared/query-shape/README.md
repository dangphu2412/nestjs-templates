# Pagination

## Problems
- From the client-side, we want to perform the same pagination action on each fetching API.
- Consistency pagination request and response format for easily building shared module. 
- Perform the same search key.
- Perform consistency format of sorting.
- Serving familiar filtering format

## Solutions
### Pagination
We provide the same format for pagination with Offset Pagination Strategy request:
```typescript
GET ?page=1%26size=10
```

We provide the same format for pagination with KeySet Pagination Strategy request:
**This would combine with filtering format for retrieving key pagination value**
```typescript
GET ?size=10%26created:lte:2021-01-20T00:00:00
```

And the same metadata for pagination response:
```typescript
{
  items: [],
  metadata: {
      currentPage: 1,
      currentSize: 10,
      totalRecords: 100,
      totalPages: 10
  }
}
```


### Searching
We provide the params search and we would use the value behind to search
```typescript
GET ?search=value
```

### Sorting
We provide multiple transform sort value
```typescript
GET ?sort=username,-id
```

### Filtering
We provide multiple transform filter value.
- For normal equally comparison:
```typescript
GET ?brand=value
```
- For in range transform filter value.
```typescript
GET ?saleDays=%5BfromDate,toDate%5D
```
- For greater or less than filter value.
```typescript
GET ?saleDays%3Cvalue
```
```typescript
GET ?saleDays%3Evalue
```