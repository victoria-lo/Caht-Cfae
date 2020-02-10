# Caht Cfae 💬
**FireBase chat messaging app with a strange twist**
> 100DaysOfCode: Day 6-8

📝 [DEVLOG #1](https://medium.com/@victoria2666/100-days-of-code-day-6-of-100-d1c2ee038aca)

📝 [DEVLOG #2](https://medium.com/@victoria2666/100-days-of-code-day-7-of-100-aa59e57d8721)

📝 [DEVLOG #3](https://medium.com/@victoria2666/100-days-of-code-day-8-of-100-f8799cb97f3a)

👀 [VIEW PROJECT](https://caht-viclo.firebaseapp.com/)

## The Project
- Built with JavaScript, HTML, Bootstrap and CSS.
- Used FireBase Log-In Authentication. See documentation [here.](https://firebase.google.com/docs/auth/web/start?authuser=0)
- Deployed with FireBase hosting

## FireBase Hosting
1. `npm install -g firebase-tools`
2. `firebase init`
3. `firebase deploy`

## FireBase Database
1. Set up real-time database on Firebase console
2. Initialize database `const db = firebase.database();`
3. Initialize directory name `const msgRef = db.ref("/msgs");`
4. Object template 
`const msg = {
        id,
        name,
        text: text
 };`
 5. Push to database `msgRef.push(msg);`
