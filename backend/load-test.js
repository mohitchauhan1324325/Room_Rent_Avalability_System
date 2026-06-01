// import http from "k6/http";
// import { check } from "k6";

// export const options = {
//   vus: 10,
//   duration: "30s",
// };

// export default function () {
//   const payload = JSON.stringify({
//     email: "mohit@123",
//     password: "chauhan",
//   });

//   const res = http.post(
//     "http://localhost:5000/api/login", 
//     payload,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   check(res, {
//     "status is 200": (r) => r.status === 200,
//   });
// }


import http from "k6/http";

export const options = {
  vus: 1000,
  duration: "10s",
};

export default function () {
  http.get("http://localhost:5000/api/rooms");
}