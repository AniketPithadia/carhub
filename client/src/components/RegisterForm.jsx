// "use client";
// import { register } from "@/utils/action";
// import { useFormState } from "react-dom";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const RegisterForm = () => {
//   const [state, formAction] = useFormState(register, undefined);
//   const router = useRouter();

//   useEffect(() => {
//     state?.success && router.push("/login");
//   }, [state?.success, router]);

//   return (
//     <form
//       className="flex flex-col items-center justify-center text-center gap-10 w-96 h-96"
//       onSubmit={formAction}
//     >
//       <input
//         className="px-8 py-4 border-1 rounded-lg"
//         type="text"
//         placeholder="username"
//         name="username"
//       />
//       <input
//         className="px-8 py-4  border-1  rounded-lg"
//         type="email"
//         placeholder="email"
//         name="email"
//       />
//       <input
//         className="px-8 py-4  border-1  rounded-lg"
//         type="password"
//         placeholder="password"
//         name="password"
//       />
//       <button
//         className="px-8 py-4 cursor-pointer border-2 font-bold rounded-lg"
//         type="submit"
//       >
//         Register
//       </button>
//       {state?.error}
//       <Link href="/login">
//         <span>Have an account? </span>
//         <b>Login</b>
//       </Link>
//     </form>
//   );
// };

// export default RegisterForm;
