# App Info

## 👨‍💻 Used Stack

1. NextJs
2. Reactjs
3. TypeScript
4. Prettier
5. EsLint
6. css/scss

## 👶 Getting Started

Here you will find all the available npm commands.

### 👨‍💻 Develop

Use this command to develop local.

```
npm run dev
```

### 🏗 Build

This will create an optimized production build.

```
npm run build
```

### 🏃Run

Use this command to run your Application on the Server.

```
npm run start
```

### 🔎 Well structured code

You can run one of the following commands to lint your code.

```
npm run lint // JS & CSS
npm run lint:scss
npm run lint:js
```

### 🥷 Typescript

To verify your static typing run the following command.

```
npm run type:check
```

### .geetkeep

```
A GITKEEP file is an empty file that Git users create so that a Git repository preserves an otherwise empty project directory. By convention, empty directories that contain no files are not committed to Git repositories.
```

reportWebVitals
This function is fired when the final values for any of the metrics have finished calculating on the page. You can use to log any of the results to the console or send to a particular endpoint.

The metric object returned to the function consists of a number of properties:

id: Unique identifier for the metric in the context of the current page load
name: Metric name
startTime: First recorded timestamp of the performance entry in milliseconds (if applicable)
value: Value, or duration in milliseconds, of the performance entry
label: Type of metric (web-vital or custom)
There are two types of metrics that are tracked:

Web Vitals
Custom metrics

Time to First Byte (TTFB)
First Contentful Paint (FCP)
Largest Contentful Paint (LCP)
First Input Delay (FID)
Cumulative Layout Shift (CLS)

## use this to generate manifest file

<!-- https://www.simicart.com/manifest-generator.html/ -->

const reqBody = {
"req1": {//for first level category create
"category": {
"name": "Category Name"
},
"status": "CREATE",
"case": 1
},
"req2": {//for first level category update
"category": {
"id": 123,
"name": "Category Name"
},
"status": "UPDATE",
"case": 1
},
"req3": {//for second level category create
"category": 124,
"subCategory": {
"name": "Category Name"
},
"status": "CREATE",
"case": 2
},
"req4": {//for second level category update
"category": 124,
"subCategory": {
"id": 123,
"name": "Category Name"
},
"status": "UPDATE",
"case": 2
},
"req5": {//for third level category create
"category": 124,
"subCategory": 124,
"subSubCategory": {
"name": "Category Name"
},
"status": "CREATE",
"case": 3
},
"req6": {//for third level category update
"category": 124,
"subCategory": 124,
"subSubCategory": {
"id": 123,
"name": "Category Name"
},
"status": "UPDATE",
"case": 3
},
"req7": {//for first level category item create
"category": 124,
"item": {
"name": "Item Name"
},
"status": "CREATE",
"case": 4
},
"req8": {//for first level category item update
"category": 124,
"item": {
"id": 123,
"name": "Item Name"
},
"status": "UPDATE",
"case": 4
},
"req9": {//for second level category item create
"category": 124,
"subCategory": 124,
"item": {
"name": "Item Name"
},
"status": "CREATE",
"case": 5
},
"req10": {//for second level category item update
"category": 124,
"subCategory": 124,
"item": {
"id": 123,
"name": "Item Name"
},
"status": "UPDATE",
"case": 5
},
"req11": {//for third level category item create
"category": 124,
"subCategory": 124,
"subSubCategory": 124,
"item": {
"name": "Item Name"
},
"status": "CREATE",
"case": 6
},
"req12": {//for third level category item update
"category": 124,
"subCategory": 124,
"subSubCategory": 124,
"item": {
"id": 123,
"name": "Item Name"
},
"status": "UPDATE",
"case": 6
},
"req13": {//for first level category item variation create/update
"category": 124,
"item": {
"id": 12452,
"variations": [
{
"id": 123,
"name": "Variation Name",
"price": 121
},
{
"name": "Variation Name",
"price": 121
}
]
},
"status": "CREATE",
"case": 4
}
}
# admin-dashboard
# admin-dashboard
# admin-dashboard
