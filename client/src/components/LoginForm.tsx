// // LoginForm.js
// "use client";
// import { login } from "@/utils/action";
// import { useFormState } from "react-dom";
// import Link from "next/link";

// const LoginForm = () => {
//   const [state, formAction] = useFormState(login, undefined);

//   return (
//     <form
//       className="flex flex-col items-center justify-center text-center gap-10"
//       onSubmit={login}
//     >
//       <input
//         className="px-8 py-4 border border-1 rounded-lg"
//         type="text"
//         placeholder="username"
//         name="username"
//       />
//       <input
//         className="px-8 py-4 border border-1  rounded-lg"
//         type="password"
//         placeholder="password"
//         name="password"
//       />
//       <button
//         className="px-8 py-4 border-2 border-solid cursor-pointer font-bold rounded-lg"
//         type="submit"
//       >
//         Login
//       </button>
//       {state?.error}
//       <Link href="/register">
//         <span>{"Don't have an account?"} </span>
//         <b>Register</b>
//       </Link>
//     </form>
//   );
// };

// export default LoginForm;
