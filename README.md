# Peplink Front-End developer task

Install packages and run the application:
```
npm i
npm run dev
```

### 1st page:
- List of users (name, occupation, gender, age)
- Locally saved data in LocalStorage
- Add/Remove users
- Extra: sorting by name (A-Z, Z-A), Gender (female-first, male-first), Age (Ascending, Descending)

### 2nd page:
- Data fetching and listing from public API
- 15 second refetch interval
- Date and time since last successful fetch
- Extra: loading bar

### Additional libs:
Tanstack router - page routing (https://tanstack.com/router/latest/docs/framework/react/overview)
tailwindcss - inline style classes for faster development (https://tailwindcss.com/)

### screenshots:
![1st page - Users](/assets/page1.png)
![2nd page - Users](/assets/page2.png)