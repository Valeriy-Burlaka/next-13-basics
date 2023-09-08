import styles from "../Notes.module.css";

async function getNote(noteId: string) {
  return fetch(`${process.env.DATA_API_URL}/notes/records/${noteId}`, {
    next: {
      // Enables incremental static regeneration (ISR) behavior
      revalidate: 10,
    },
  }).then((res) => res.json());
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}
