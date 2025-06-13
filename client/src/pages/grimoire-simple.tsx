import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

export default function GrimoireSimple() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { token } = useAuth();
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const { data: grimoire } = useQuery({
    queryKey: ['/api/grimoires', id],
    enabled: !!id && !!token
  });

  const { data: chapters } = useQuery({
    queryKey: ['/api/grimoires', id, 'chapters'],
    enabled: !!id && !!token
  });

  const currentChapter = Array.isArray(chapters) ? 
    chapters.find((ch: any) => ch.chapterOrder === selectedChapter) : 
    null;

  if (!grimoire || !chapters) {
    return (
      <div className="min-h-screen bg-abyss-black text-white flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => setLocation('/biblioteca')}
            className="text-golden-amber hover:text-white mb-4"
          >
            ← Voltar à Biblioteca
          </button>
          <h1 className="text-2xl text-golden-amber mb-2">
            {(grimoire as any)?.title}
          </h1>
          <h2 className="text-lg text-burned-amber">
            {currentChapter?.title}
          </h2>
        </div>

        {/* Chapter Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {Array.isArray(chapters) && chapters.map((chapter: any) => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter.chapterOrder)}
                className={`px-3 py-1 rounded ${
                  selectedChapter === chapter.chapterOrder
                    ? 'bg-golden-amber text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Cap. {chapter.chapterOrder}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {currentChapter?.content ? (
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentChapter.content }}
            />
          ) : (
            <div>Conteúdo não encontrado</div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setSelectedChapter(Math.max(1, selectedChapter - 1))}
            disabled={selectedChapter === 1}
            className="bg-golden-amber text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setSelectedChapter(Math.min(Array.isArray(chapters) ? chapters.length : 0, selectedChapter + 1))}
            disabled={selectedChapter === (Array.isArray(chapters) ? chapters.length : 0)}
            className="bg-golden-amber text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}