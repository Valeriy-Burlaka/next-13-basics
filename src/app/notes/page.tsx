import Link from "next/link";

import styles from "./Notes.module.css";

// We could use Pocketbase SDK instead of `fetch`, like this:
// ```
// import { PocketBase } from "pocketbase";
//
// const db = new PocketBase('http://127.0.0.1:8090');
// const result = await db.records.getList('notes');
// ```
//
// , but in this case we would need to set the cache behavior using Next variables:
//
// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'
async function getNotes() {
  const response = await fetch(
    `${process.env.DATA_API_URL}/notes/records?page=1&perPage=30`,
    { cache: "no-store" }
  );
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
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
