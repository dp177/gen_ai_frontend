import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../Axios/axios";
import papi from "../Axios/paxios";
import useAuthStore from "../context/AuthContext";
import NotebookPage from "./NotebookPage";
import Button from '../components/ui/Button';
import IngestionLoader from '../components/home/IngestionLoader';
import NewDossierCard from '../components/home/NewDossierCard';
import LegalDeskCard from '../components/home/LegalDeskCard';
import AddDossierModal from '../components/home/AddDossierModal';
import RoleSelectionModal from '../components/home/RoleSelectionModal';
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: null, photo: "", id: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [ingestionStatus, setIngestionStatus] = useState([]);
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const initialFeature = qs.get("feature") || "home";
  const [selectedFeature, setSelectedFeature] = useState(initialFeature);
  const [openNotebookId, setOpenNotebookId] = useState(null);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchChats();
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const f = q.get("feature") || "home";
    setSelectedFeature(f);
  }, [location.search]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      if (res.data && res.data.user) {
        setUserProfile({
          id: res.data.user._id,
          name: res.data.user.name,
          photo: res.data.user.picture || `https://avatar.vercel.sh/${res.data.user.id}.png`,
        });
      }
    } catch (err) {
      setUserProfile({ name: "Guest User", photo: "https://avatar.vercel.sh/guest.png" });
    }
  };

  const fetchChats = async () => {
    try {
      const res = await api.get("/api/getallchats");
      setChats(res.data.chats || []);
    } catch (err) { }
  };

  const handleOpen = (id) => {
    setOpenNotebookId(id);
  };

  const handleAddlegaldesk = async () => {
    if (!file || !title.trim()) {
      alert("Please provide both a title and a file.");
      return;
    }

    setUploading(true);

    try {
      const res1 = await api.post("/api/uploaddoc", { title });
      if (!res1.data?.chat) throw new Error("Failed to create legal desk entry.");

      const newChat = res1.data.chat;
      setChats(prev => [newChat, ...prev]);
      setAdding(false);
      setIsLoading(true);

      const steps = [
        { id: 1, text: "Uploading secure document...", status: 'pending' },
        { id: 2, text: "Parsing and segmenting clauses...", status: 'pending' },
        { id: 3, text: "Generating legal knowledge embeddings...", status: 'pending' },
        { id: 4, text: "Encrypting with attorney-grade security...", status: 'pending' },
        { id: 5, text: "Indexing for rapid legal search...", status: 'pending' },
        { id: 6, text: "Finalizing your Legal Dossier...", status: 'pending' }
      ];
      setIngestionStatus(steps);

      const updateProgress = async () => {
        for (let i = 0; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setIngestionStatus(prev => prev.map((step, index) => ({
            ...step,
            status: index < i ? 'completed' : index === i ? 'in-progress' : 'pending'
          })));
        }
      };

      const formData = new FormData();
      formData.append("user_id", userProfile.id || "");
      formData.append("thread_id", newChat._id);
      formData.append("title", title);
      formData.append("file", file);

      const ingestPromise = papi.post("/api/ingest", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await Promise.all([ingestPromise, updateProgress()]);

      setIngestionStatus(prev => prev.map(step => ({ ...step, status: 'completed' })));
      await new Promise(resolve => setTimeout(resolve, 500));

      setOpenNotebookId(newChat._id);

    } catch (err) {
      alert("Error creating legal desk. Please try again.");
      setChats(prev => prev.filter(c => c.title !== title));
    } finally {
      setUploading(false);
      setIsLoading(false);
      setTitle("");
      setFile(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/delete/${id}`);
      setChats(chats.filter((chat) => chat._id !== id));
    } catch (err) { }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) setFile(files[0]);
  };

  const filteredAndSortedChats = chats
    .filter((chat) => chat.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div>
      <AnimatePresence>
        {isLoading && <IngestionLoader steps={ingestionStatus} />}
      </AnimatePresence>

      {selectedFeature === "home" && (
        <Card>
          <div className="text-center">
            <motion.h1
              className="text-4xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to Legal SahAI 👋
            </motion.h1>
            <motion.p
              className="text-secondary text-lg mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your secure, confidential, and expert legal workspace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="primary"
                onClick={() => {
                  const search = new URLSearchParams(location.search);
                  search.set('feature', 'chatpdf');
                  navigate({ pathname: '/home', search: search.toString() });
                }}
                className="px-8 py-3 text-lg"
              >
                Go to Legal Desks
              </Button>
            </motion.div>
          </div>
        </Card>
      )}

      {selectedFeature === "chatpdf" && (
        <div>
          {!openNotebookId && (
            <div className="flex justify-between items-center mb-8">
              <Input
                type="text"
                placeholder="Search Legal Dossiers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-1/2"
              />
              <select
                id="sort"
                className="px-4 py-3 border rounded-md bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          )}

          {openNotebookId ? (
            <Card className="h-[85vh] p-0 overflow-hidden">
              <NotebookPage id={openNotebookId} onClose={() => setOpenNotebookId(null)} inline />
            </Card>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {authUser && !authUser.role && <RoleSelectionModal />}
              <NewDossierCard onClick={() => setAdding(true)} />
              {filteredAndSortedChats.map((chat) => (
                <motion.div key={chat._id} variants={itemVariants}>
                  <LegalDeskCard
                    chat={chat}
                    onOpen={handleOpen}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
          <AddDossierModal
            adding={adding}
            setAdding={setAdding}
            title={title}
            setTitle={setTitle}
            file={file}
            setFile={setFile}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleAddlegaldesk={handleAddlegaldesk}
            uploading={uploading}
          />
        </div>
      )}
    </div>
  );
};

export default Home;