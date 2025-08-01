import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const ADMIN_PASSWORD = "maaz123";

const WipeApp = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading && auth.isAuthenticated) {
      const password = prompt("Enter admin password:");
      if (password === ADMIN_PASSWORD) {
        setIsAuthorized(true);
      } else {
        alert("Unauthorized");
        navigate("/");
      }
    }
  }, [isLoading]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };
  useEffect(() => {
    if (isAuthorized) loadFiles();
  }, [isAuthorized]);

  const handleDelete = async () => {
    if (confirm("This will delete everything. Continue?")) {
      for (const file of files) {
        await fs.delete(file.path);
      }
      await kv.flush();
      loadFiles();
    }
  };

  if (!isAuthorized) return null;

  return (
    <div>
      <p>Authenticated as: {auth.user?.username}</p>
      <div>Existing files:</div>
      <div className="flex flex-col gap-4">
        {files.map((file) => (
          <div key={file.id}>
            <p>{file.name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleDelete} className="bg-red-600 text-white rounded-full px-4 py-2 cursor-pointer">Wipe App Data</button>
    </div>
  );
};

export default WipeApp;