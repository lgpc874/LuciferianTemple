import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Clock } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

interface Chapter {
  id: number;
  grimoireId: number;
  title: string;
  content: string;
  chapterOrder: number;
  estimatedReadingTime: number;
  unlockCriteria: string;
}

interface Grimoire {
  id: number;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
}

export default function GrimoireReader() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { token } = useAuth();
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const { data: grimoire, isLoading: grimoireLoading } = useQuery({
    queryKey: ['/api/grimoires', id],
    enabled: !!id && !!token
  });

  const { data: chapters = [], isLoading: chaptersLoading } = useQuery({
    queryKey: ['/api/grimoires', id, 'chapters'],
    enabled: !!id && !!token
  });

  const currentChapter = (chapters as Chapter[]).find((ch: Chapter) => ch.chapterOrder === selectedChapter);

  if (grimoireLoading || chaptersLoading) {
    return (
      <PageTransition className="min-h-screen bg-abyss-black">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-golden-amber border-t-transparent rounded-full"
          />
        </div>
      </PageTransition>
    );
  }

  if (!grimoire || !chapters) {
    return (
      <PageTransition className="min-h-screen bg-abyss-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-cinzel text-xl text-golden-amber mb-4">Grimório não encontrado</h2>
          <button
            onClick={() => setLocation('/biblioteca')}
            className="veil-button bg-gradient-to-r from-golden-amber/10 to-golden-amber/5 hover:from-golden-amber/20 hover:to-golden-amber/10 text-golden-amber font-cinzel py-2 px-6 rounded-md transition-all duration-300 border border-golden-amber/50"
          >
            Retornar à Biblioteca
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-abyss-black">
      {/* Header fixo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-abyss-black/95 backdrop-blur-sm border-b border-golden-amber/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation('/biblioteca')}
            className="flex items-center space-x-2 text-golden-amber hover:text-golden-amber/80 transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="font-cinzel text-sm">BIBLIOTECA</span>
          </motion.button>

          <div className="text-center">
            <h1 className="font-cinzel text-lg text-golden-amber">{(grimoire as Grimoire)?.title || 'Grimório'}</h1>
            <p className="text-xs text-burned-amber">{currentChapter?.title || ''}</p>
          </div>

          <div className="flex items-center space-x-2 text-burned-amber text-sm">
            <Clock size={16} />
            <span>{currentChapter?.estimatedReadingTime || 0} min</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Navegação de capítulos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {(chapters as Chapter[]).map((chapter: Chapter) => (
                <motion.button
                  key={chapter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedChapter(chapter.chapterOrder)}
                  className={`px-4 py-2 rounded-md font-cinzel text-sm transition-all duration-300 ${
                    selectedChapter === chapter.chapterOrder
                      ? 'bg-golden-amber text-abyss-black shadow-lg'
                      : 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30 hover:bg-golden-amber/20'
                  }`}
                >
                  Cap. {chapter.chapterOrder}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Conteúdo do capítulo */}
          <motion.div
            key={selectedChapter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="content-section border border-golden-amber/30 rounded-lg p-8"
          >
            <div className="text-center mb-8">
              <h2 className="font-cinzel text-2xl text-golden-amber mb-4">
                {currentChapter?.title}
              </h2>
              <div className="flex items-center justify-center space-x-4 text-burned-amber text-sm">
                <div className="flex items-center space-x-1">
                  <BookOpen size={16} />
                  <span>Capítulo {selectedChapter}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{currentChapter?.estimatedReadingTime} min de leitura</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="font-garamond text-ritualistic-beige leading-relaxed grimoire-content"
                dangerouslySetInnerHTML={{ __html: currentChapter?.content || '' }}
              />
            </div>
          </motion.div>

          {/* Navegação entre capítulos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedChapter(Math.max(1, selectedChapter - 1))}
              disabled={selectedChapter === 1}
              className={`flex items-center space-x-2 font-cinzel py-3 px-6 rounded-md transition-all duration-300 ${
                selectedChapter === 1
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30 hover:bg-golden-amber/20'
              }`}
            >
              <ChevronLeft size={16} />
              <span>Anterior</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedChapter(Math.min((chapters as Chapter[]).length, selectedChapter + 1))}
              disabled={selectedChapter === (chapters as Chapter[]).length}
              className={`flex items-center space-x-2 font-cinzel py-3 px-6 rounded-md transition-all duration-300 ${
                selectedChapter === (chapters as Chapter[]).length
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30 hover:bg-golden-amber/20'
              }`}
            >
              <span>Próximo</span>
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}