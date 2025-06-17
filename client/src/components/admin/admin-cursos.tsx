import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, BookOpen, Users, DollarSign, Eye, Settings, Save, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Curso, Modulo, InsertCurso, InsertModulo } from "../../../../shared/schema";

// Editor rico para conteúdo
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Configuração do editor
const editorModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean']
  ],
};

// Componente para criar/editar curso
const CourseForm = ({ curso, onSuccess, onCancel }: {
  curso?: Curso;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<InsertCurso>>({
    nome: curso?.nome || '',
    slug: curso?.slug || '',
    descricao: curso?.descricao || '',
    imagem_url: curso?.imagem_url || '',
    nivel: curso?.nivel || 'iniciante',
    preco: curso?.preco || '',
    is_paid: curso?.is_paid || false,
    is_active: curso?.is_active ?? true,
    ordem_exibicao: curso?.ordem_exibicao || 0,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Partial<InsertCurso>) => {
      const url = curso ? `/api/admin/cursos/${curso.id}` : '/api/admin/cursos';
      const method = curso ? 'PUT' : 'POST';
      
      return apiRequest(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      toast({
        title: curso ? "Curso atualizado" : "Curso criado",
        description: "Operação realizada com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cursos'] });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro na operação",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.slug || !formData.descricao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, slug e descrição",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate(formData);
  };

  const generateSlug = (nome: string) => {
    return nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome do Curso</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => {
              const nome = e.target.value;
              setFormData(prev => ({
                ...prev,
                nome,
                slug: !curso ? generateSlug(nome) : prev.slug
              }));
            }}
            placeholder="Ex: LUXFERAT — A Chama da Iniciação"
            className="bg-black/20 border-amber-500/50 text-amber-100"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="Ex: luxferat"
            className="bg-black/20 border-amber-500/50 text-amber-100"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
          placeholder="Descrição detalhada do curso..."
          rows={4}
          className="bg-black/20 border-amber-500/50 text-amber-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="nivel">Nível</Label>
          <Select value={formData.nivel} onValueChange={(value) => setFormData(prev => ({ ...prev, nivel: value }))}>
            <SelectTrigger className="bg-black/20 border-amber-500/50 text-amber-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iniciante">Iniciante</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="preco">Preço (R$)</Label>
          <Input
            id="preco"
            type="number"
            step="0.01"
            value={formData.preco || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, preco: e.target.value }))}
            placeholder="99.99"
            className="bg-black/20 border-amber-500/50 text-amber-100"
          />
        </div>

        <div>
          <Label htmlFor="ordem">Ordem de Exibição</Label>
          <Input
            id="ordem"
            type="number"
            value={formData.ordem_exibicao}
            onChange={(e) => setFormData(prev => ({ ...prev, ordem_exibicao: parseInt(e.target.value) || 0 }))}
            className="bg-black/20 border-amber-500/50 text-amber-100"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="imagem_url">URL da Imagem</Label>
        <Input
          id="imagem_url"
          value={formData.imagem_url || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, imagem_url: e.target.value }))}
          placeholder="https://exemplo.com/imagem.jpg"
          className="bg-black/20 border-amber-500/50 text-amber-100"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_paid"
            checked={formData.is_paid}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_paid: checked }))}
          />
          <Label htmlFor="is_paid">Curso Pago</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
          />
          <Label htmlFor="is_active">Ativo</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-amber-500/50 text-amber-500 hover:bg-amber-500/20"
        >
          <X size={16} className="mr-2" />
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-amber-600 hover:bg-amber-700 text-black"
        >
          {mutation.isPending ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              {curso ? 'Atualizar' : 'Criar'} Curso
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

// Componente para criar/editar módulo
const ModuleForm = ({ cursoId, modulo, onSuccess, onCancel }: {
  cursoId: number;
  modulo?: Modulo;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<InsertModulo>>({
    titulo: modulo?.titulo || '',
    conteudo: modulo?.conteudo || '',
    pratica: modulo?.pratica || '',
    desafio: modulo?.desafio || '',
    ordem: modulo?.ordem || 1,
    is_active: modulo?.is_active ?? true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Partial<InsertModulo>) => {
      const url = modulo ? `/api/admin/modulos/${modulo.id}` : `/api/admin/cursos/${cursoId}/modulos`;
      const method = modulo ? 'PUT' : 'POST';
      
      return apiRequest(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      toast({
        title: modulo ? "Módulo atualizado" : "Módulo criado",
        description: "Operação realizada com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/cursos/${cursoId}/modulos`] });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro na operação",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.conteudo || !formData.desafio) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha título, conteúdo e desafio",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="titulo">Título do Módulo</Label>
          <Input
            id="titulo"
            value={formData.titulo}
            onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
            placeholder="Ex: A Semente do Fogo Oculto"
            className="bg-black/20 border-amber-500/50 text-amber-100"
          />
        </div>

        <div>
          <Label htmlFor="ordem">Ordem</Label>
          <Input
            id="ordem"
            type="number"
            value={formData.ordem}
            onChange={(e) => setFormData(prev => ({ ...prev, ordem: parseInt(e.target.value) || 1 }))}
            className="bg-black/20 border-amber-500/50 text-amber-100"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="conteudo">Conteúdo Teórico</Label>
        <div className="mt-2">
          <ReactQuill
            value={formData.conteudo}
            onChange={(content) => setFormData(prev => ({ ...prev, conteudo: content }))}
            modules={editorModules}
            theme="snow"
            placeholder="Conteúdo teórico do módulo..."
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(245,158,11,0.5)',
              borderRadius: '6px',
              color: '#F3E8FF'
            }}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="pratica">Prática Ritual (Opcional)</Label>
        <div className="mt-2">
          <ReactQuill
            value={formData.pratica}
            onChange={(pratica) => setFormData(prev => ({ ...prev, pratica }))}
            modules={editorModules}
            theme="snow"
            placeholder="Práticas e exercícios do módulo..."
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(245,158,11,0.5)',
              borderRadius: '6px'
            }}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="desafio">Desafio/Atividade</Label>
        <Textarea
          id="desafio"
          value={formData.desafio}
          onChange={(e) => setFormData(prev => ({ ...prev, desafio: e.target.value }))}
          placeholder="Desafio ou atividade para o estudante..."
          rows={4}
          className="bg-black/20 border-amber-500/50 text-amber-100"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
        />
        <Label htmlFor="is_active">Módulo Ativo</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-amber-500/50 text-amber-500 hover:bg-amber-500/20"
        >
          <X size={16} className="mr-2" />
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-amber-600 hover:bg-amber-700 text-black"
        >
          {mutation.isPending ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              {modulo ? 'Atualizar' : 'Criar'} Módulo
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default function AdminCursos() {
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Curso | undefined>();
  const [editingModule, setEditingModule] = useState<Modulo | undefined>();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar cursos
  const { data: cursos, isLoading: cursosLoading } = useQuery<Curso[]>({
    queryKey: ['/api/cursos'],
  });

  // Buscar módulos do curso selecionado
  const { data: modulos, isLoading: modulosLoading } = useQuery<Modulo[]>({
    queryKey: [`/api/cursos/${selectedCurso?.id}/modulos`],
    enabled: !!selectedCurso?.id,
  });

  // Mutação para deletar curso
  const deleteCursoMutation = useMutation({
    mutationFn: async (cursoId: number) => {
      return apiRequest(`/api/admin/cursos/${cursoId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      toast({
        title: "Curso deletado",
        description: "Curso removido com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cursos'] });
      setSelectedCurso(null);
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao deletar curso",
        variant: "destructive",
      });
    },
  });

  // Mutação para deletar módulo
  const deleteModuloMutation = useMutation({
    mutationFn: async (moduloId: number) => {
      return apiRequest(`/api/admin/modulos/${moduloId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      toast({
        title: "Módulo deletado",
        description: "Módulo removido com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/cursos/${selectedCurso?.id}/modulos`] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao deletar módulo",
        variant: "destructive",
      });
    },
  });

  if (cursosLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Cinzel Decorative' }}>
            🔥 Gerenciar Cursos
          </h2>
          <p className="text-amber-200/70">Criar, editar e gerenciar cursos da academia</p>
        </div>
        
        <Button
          onClick={() => {
            setEditingCourse(undefined);
            setShowCourseForm(true);
          }}
          className="bg-amber-600 hover:bg-amber-700 text-black"
        >
          <Plus size={16} className="mr-2" />
          Novo Curso
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de cursos */}
        <div className="lg:col-span-1">
          <Card className="bg-black/40 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center gap-2">
                <BookOpen size={20} />
                Cursos ({cursos?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!cursos || cursos.length === 0 ? (
                <p className="text-amber-200/70 text-center py-4">Nenhum curso criado</p>
              ) : (
                cursos.map((curso) => (
                  <div
                    key={curso.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedCurso?.id === curso.id
                        ? 'border-amber-500 bg-amber-500/20'
                        : 'border-amber-500/30 hover:border-amber-500/50'
                    }`}
                    onClick={() => setSelectedCurso(curso)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-amber-100 font-semibold text-sm leading-tight">
                        {curso.nome}
                      </h4>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCourse(curso);
                            setShowCourseForm(true);
                          }}
                          className="h-6 w-6 p-0 text-amber-500 hover:text-amber-400"
                        >
                          <Edit size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Tem certeza que deseja deletar este curso?')) {
                              deleteCursoMutation.mutate(curso.id);
                            }
                          }}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-400"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500">
                        {curso.nivel}
                      </Badge>
                      {curso.is_paid && (
                        <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">
                          R$ {parseFloat(curso.preco || '0').toFixed(2)}
                        </Badge>
                      )}
                      {!curso.is_active && (
                        <Badge variant="outline" className="text-xs border-red-500/50 text-red-400">
                          Inativo
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detalhes do curso selecionado */}
        <div className="lg:col-span-2">
          {!selectedCurso ? (
            <Card className="bg-black/40 border-amber-500/30">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <BookOpen size={48} className="text-amber-500/50 mx-auto mb-4" />
                  <p className="text-amber-200/70">Selecione um curso para ver os detalhes</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black/40 border-amber-500/30">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-amber-100">{selectedCurso.nome}</CardTitle>
                    <CardDescription className="text-amber-200/70 mt-2">
                      {selectedCurso.descricao}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setEditingModule(undefined);
                      setShowModuleForm(true);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-black"
                  >
                    <Plus size={16} className="mr-2" />
                    Novo Módulo
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {modulosLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : !modulos || modulos.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-amber-200/70 mb-4">Nenhum módulo criado para este curso</p>
                    <Button
                      onClick={() => {
                        setEditingModule(undefined);
                        setShowModuleForm(true);
                      }}
                      variant="outline"
                      className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
                    >
                      <Plus size={16} className="mr-2" />
                      Criar Primeiro Módulo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {modulos.map((modulo, index) => (
                      <div
                        key={modulo.id}
                        className="p-4 border border-amber-500/30 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-600 text-black rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-amber-100 font-semibold">{modulo.titulo}</h4>
                              <p className="text-amber-200/70 text-sm">
                                Ordem: {modulo.ordem} • {modulo.is_active ? 'Ativo' : 'Inativo'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingModule(modulo);
                                setShowModuleForm(true);
                              }}
                              className="border-amber-500/50 text-amber-500 hover:bg-amber-500/20"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (confirm('Tem certeza que deseja deletar este módulo?')) {
                                  deleteModuloMutation.mutate(modulo.id);
                                }
                              }}
                              className="border-red-500/50 text-red-500 hover:bg-red-500/20"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>

                        <div className="text-amber-200/80 text-sm">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-amber-500 font-semibold">Conteúdo</div>
                              <div>{modulo.conteudo ? '✓' : '✗'}</div>
                            </div>
                            <div>
                              <div className="text-amber-500 font-semibold">Prática</div>
                              <div>{modulo.pratica ? '✓' : '✗'}</div>
                            </div>
                            <div>
                              <div className="text-amber-500 font-semibold">Desafio</div>
                              <div>{modulo.desafio ? '✓' : '✗'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Dialog para formulário de curso */}
      <Dialog open={showCourseForm} onOpenChange={setShowCourseForm}>
        <DialogContent className="max-w-2xl bg-black/90 border-amber-500/50">
          <DialogHeader>
            <DialogTitle className="text-amber-100">
              {editingCourse ? 'Editar Curso' : 'Criar Novo Curso'}
            </DialogTitle>
            <DialogDescription className="text-amber-200/70">
              {editingCourse ? 'Atualize as informações do curso' : 'Preencha os dados do novo curso'}
            </DialogDescription>
          </DialogHeader>
          
          <CourseForm
            curso={editingCourse}
            onSuccess={() => setShowCourseForm(false)}
            onCancel={() => setShowCourseForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog para formulário de módulo */}
      <Dialog open={showModuleForm} onOpenChange={setShowModuleForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/90 border-amber-500/50">
          <DialogHeader>
            <DialogTitle className="text-amber-100">
              {editingModule ? 'Editar Módulo' : 'Criar Novo Módulo'}
            </DialogTitle>
            <DialogDescription className="text-amber-200/70">
              {editingModule ? 'Atualize o conteúdo do módulo' : 'Adicione um novo módulo ao curso'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCurso && (
            <ModuleForm
              cursoId={selectedCurso.id}
              modulo={editingModule}
              onSuccess={() => setShowModuleForm(false)}
              onCancel={() => setShowModuleForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}