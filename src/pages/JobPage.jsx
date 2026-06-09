import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export default function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        console.log(data);
        setJob(data);
      } catch (error) {
        console.log("Error on data fetching", error);
      } finally {
        setLoading(false);
      }
    }
    getJob();
  }, []);

  return (
    <section>
      <div className="max-w-xl m-auto">
        {loading ? (
          <MoonLoader />
        ) : (
          <div>
            <h1>Job Title: {job.title}</h1>
            <p>Job Type : {job.type}</p>
            <p>Job Location : {job.location}</p>
            <p>Job Description : {job.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
