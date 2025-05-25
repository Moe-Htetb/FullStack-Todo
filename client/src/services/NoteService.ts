import type { NoteType } from "../type/note";
import axios from "axios";

let Api_URL = "";
if (import.meta.env.VITE_MODE === "development") {
  Api_URL = import.meta.env.VITE_LOCAL_API_URL;
}
if (import.meta.env.VITE_MODE === "production") {
  Api_URL = import.meta.env.VITE_API_URL;
}

// export const createNoteService = async (title: string) => {
//   await fetch(`${Api_URL}/create`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ title }),
//   });
// };
export const createNoteService = async (title: string) => {
  await axios.post(`${Api_URL}/create`, { title });
};

// export const getNotes = async (): Promise<NoteType[]> => {
//   const response = await fetch(`${Api_URL}/todos`);
//   const data = await response.json();
//   //   console.log("getnotes" + data);
//   return data.todos;
// };
export const getNotes = async (): Promise<NoteType[]> => {
  const { data } = await axios.get(`${Api_URL}/todos`);
  //   console.log("getnotes" + data);
  return data.todos;
};

// export const updateNoteService = async (id: string, title: string) => {
//   await fetch(`${Api_URL}/todos/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ title }),
//   });
// };
export const updateNoteService = async (id: string, title: string) => {
  await axios.put(`${Api_URL}/todos/${id}`, { title });
};

export const deleteNoteService = async (id: string) => {
  await axios.delete(`${Api_URL}/todos/${id}`);
};
