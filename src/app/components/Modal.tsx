// import React, { useState } from "react";
// function Modal() {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault;
//   };
//   const handleTitle = (e: React.FormEvent<HTMLFormElement>) => {
//     setTitle(e.currentTarget.value);
//   };
//   const handleDescription = (e: React.FormEvent<HTMLFormElement>) => {
//     setDescription(e.currentTarget.value);
//   };
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center align-items-start">
//       <span className="m-5" role="button">
//         X
//       </span>
//       <div className="container mx-auto my-auto">
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-md bg-gray-300 mx-auto px-3 py-6"
//         >
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Taskname
//             </label>
//             <input
//               type="text-area"
//               onChange={handleTitle}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter your Task"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Task Description
//             </label>
//             <input
//               type="text-area"
//               onChange={handleDescription}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter Description"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Add Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Modal;
