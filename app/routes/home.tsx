import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeAi" },
    { name: "description", content: "Smart Feedback for your Dream Job!" },
  ];
}

export default function Home() {
  const { auth, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loadingResumes, setloadingResumes] = useState(false)
  
  
  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])
  
  useEffect(() => {
    const loadResumes = async () => {
      setloadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))
      console.log('Resumes:', parsedResumes);

      setResumes(parsedResumes || []);
      setloadingResumes(false);
    }
    loadResumes();
  }, [])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover ">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16" >
        <h1>
          Track Your Application & Resume Ratings 
        </h1>
        {!loadingResumes && resumes.length === 0 ? (
          <h2 className="text-gray-500">
            No resumes found. Upload your first resume to get feedback!
          </h2>
        ): (
          <h2>
            Review your submissions and check AI-powered feedback.
          </h2>
        )}
      </div>
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" />
        </div>
      )}
  {!loadingResumes && resumes.length > 0 && (
  <div className="resumes-section">
    {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
  )}

  {!loadingResumes && resumes.length > 0 && (
    <div className="flex flex-col items-center justify-center mt-10 gap-4" >
      <Link to="/upload" className="button-primary w-fit text-xl font-semibold"> Upload Resume </Link>
    </div>
  )}
  </section>
  </main>
}
