import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import { MoonLoader } from "react-spinners";

export default function JobListings({ isHome = false }) {
  // const jobsList = isHome ? jobs.slice(0, 3) : jobs;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(isHome ? data.slice(0, 3) : data);
      } catch (error) {
        console.log("Error in fetching data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, []);

  const spinnerStyle = {
    display: "block",
    margin: "200px auto",
  };
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <MoonLoader
            color="#002aff"
            cssOverride={spinnerStyle}
            loading
            size={60}
            speedMultiplier={1}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
