import { useState } from "react";
import { trpc } from "../utils/trpc";

const Dashboard = () => {
  const { data: projects, isLoading } = trpc.useQuery(["projects.getAll"]);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {projects?.map((proj) => {
          return (
            <div key={proj.id}>
              <p>
                <>
                  {proj.name} has logged {proj.hours} hours.
                </>
              </p>
            </div>
          );
        })}
      </div>
      <ProjForm />
    </>
  );
};

const ProjForm = () => {
  const utils = trpc.useContext();
  const post = trpc.useMutation("projects.postProject", {
    onSuccess: () => {
      utils.invalidateQueries(["projects.getAll"]);
    },
  });
  const [hours, setHours] = useState(0.0);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  return (
    <div className="pt-6">
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();

          post.mutate({
            hours,
            name,
            note,
          });
        }}
      >
        <input
          type="text"
          value={name}
          placeholder="Project name..."
          maxLength={100}
          onChange={(event) => setName(event.target.value)}
          className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-neutral-900 focus:outline-none"
        />
        <input
          type="number"
          value={hours}
          placeholder="hours..."
          maxLength={100}
          onChange={(event) => setHours(parseFloat(event.target.value))}
          className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-neutral-900 focus:outline-none"
        />
        <input
          type="text"
          value={note}
          placeholder="note..."
          maxLength={100}
          onChange={(event) => setNote(event.target.value)}
          className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-neutral-900 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 rounded-md border-2 border-zinc-800 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
