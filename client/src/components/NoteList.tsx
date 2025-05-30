import React, { useEffect, useState } from "react";
import type { NoteType } from "../type/note";
import {
  getNotes,
  createNoteService,
  deleteNoteService,
  updateNoteService,
} from "../services/NoteService";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link } from "react-router";

function NoteList() {
  const [Notes, setNotes] = useState<NoteType[]>([]);
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [refresh]);

  const makeRefresh = () => setRefresh(!refresh);

  const createNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) return;
    try {
      await createNoteService(msg);
      setMsg("");
      makeRefresh();
    } catch (error) {
      console.error("Failed to create note.");
    }
  };
  const onDeleteHandler = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "black",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteNoteService(id);
        makeRefresh();

        await Swal.fire({
          title: "Deleted!",
          text: "Your note has been deleted.",
          icon: "success",
          confirmButtonColor: "black",
        });
      }
    } catch (error) {
      console.error("Delete failed");
    }
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const saveEdit = async (id: string) => {
    if (!(editingTitle.trim().length === 0)) {
      await updateNoteService(id, editingTitle);
      setEditingId(null);
      setEditingTitle("");
      makeRefresh();
    }
  };

  return (
    <div className=" flex items-center justify-center  bg-gray-100 px-4 mt-40 md:mt-30">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-md border border-black">
        <h1 className="text-3xl font-bold mb-4">Note Lists</h1>

        <>
          {userInfo ? (
            <form
              onSubmit={createNote}
              className="flex mb-6 border border-black"
            >
              <input
                type="text"
                className="flex-1 p-2 outline-none text-black"
                placeholder="Add new Note"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button
                type="submit"
                className="w-12 bg-black text-white text-xl flex items-center justify-center"
              >
                +
              </button>
            </form>
          ) : (
            <div className="flex mb-6 justify-center items-center">
              <p className=" text-red-500 font-semibold mb-6  text-2xl">
                <Link to="/login" className="underline cursor-pointer mr-1">
                  Login
                </Link>
                to note
              </p>
            </div>
          )}
        </>

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Your List</h2>
          <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
            {Notes.length}
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ul className="space-y-2">
            {Notes.map(({ title, _id, userId }) => (
              <li
                key={_id}
                className="flex items-center justify-between border border-black p-3 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {editingId === _id ? (
                    <input
                      className="border border-black focus:outline-0 px-2 py-1 text-black rounded"
                      value={editingTitle}
                      autoFocus
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => saveEdit(_id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          saveEdit(_id);
                        }
                      }}
                    />
                  ) : (
                    <span className="text-md text-black">{title}</span>
                  )}
                </div>
                {userId === userInfo?._id && (
                  <div className="flex gap-2">
                    <button
                      className="border border-black p-2 rounded cursor-pointer"
                      onClick={() => handleEdit(_id, title)}
                    >
                      <Pencil size={16} className="text-black" />
                    </button>
                    <button
                      className="border border-black p-2 rounded cursor-pointer"
                      onClick={() => onDeleteHandler(_id)}
                    >
                      <Trash2 size={16} className="text-black" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NoteList;
