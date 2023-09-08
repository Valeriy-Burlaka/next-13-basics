import styles from "./Notes.module.css";

const NOTES_API = `${process.env.BACKEND_API_URL}/collections/notes/records?page=1&perPage=30`;

async function getNotes() {
  console.log("LOG:: Fetching notes from URL:", NOTES_API);
  const response = await fetch(NOTES_API, { cache: "no-cache" });
  console.log("LOG:: Fetch response:", response);
  const data = await response.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  console.log("LOG:: Fetched notes:", notes);

  return (
    <div>
      <h1>Notes Page</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}

function Note({ note }: { note: any }) {
  const { id, title, content, created } = note || {};

  return (
    <div className={styles.note}>
      <h2>{title}</h2>
      <h5>{content}</h5>
      <p>{created}</p>
    </div>
  );
}
