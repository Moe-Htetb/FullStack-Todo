import { createRoot } from "react-dom/client";
import "./index.css";

import NoteList from "./components/NoteList";

createRoot(document.getElementById("root")!).render(<NoteList />);
