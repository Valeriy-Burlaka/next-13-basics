"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const router = useRouter();

  const createNote = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_DATA_API_URL}/notes/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");

    // Property `refresh` does not exist on type `Router` :thinking:
    // And it actually doesn't seem necessary anymore - I see a new card on the /notes page when creating a new card.
    // router.refresh();
  };

  return (
    <form onSubmit={createNote}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create note</button>
    </form>
  );
}
