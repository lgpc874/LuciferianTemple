import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Edit, 
  Eye, 
  Plus,
  Save,
  Upload,
  Download
} from 'lucide-react';

export default function AdminContent() {
  const [editingPage, setEditingPage] = useState<string | null>(null);

  const pages = [
    { id: 'home', name: 'Página Inicial', status: 'ativo', lastModified: '2025-06-13' },
    { id: 'auth', name: 'Autenticação', status: 'ativo', lastModified: '2025-06-13' },
    { id: 'biblioteca', name: 'Biblioteca', status: 'ativo', lastModified: '2025-06-13' },
    { id: 'bibliotheca-arcana', name: 'Bibliotheca Arcana', status: 'ativo', lastModified: '2025-06-13' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-golden-amber flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Gerenciamento de Conteúdo
              </CardTitle>
              <CardDescription>
                Gerencie o conteúdo de todas as páginas do site
              </CardDescription>
            </div>
            <Button className="bg-golden-amber hover:bg-golden-amber/90 text-background">
              <Plus className="w-4 h-4 mr-2" />
              Nova Página
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4">
            {pages.map((page) => (
              <div key={page.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{page.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Última modificação: {new Date(page.lastModified).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-700">
                      {page.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingPage(page.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {editingPage && (
        <Card>
          <CardHeader>
            <CardTitle>Editando: {pages.find(p => p.id === editingPage)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título da Página</label>
              <Input placeholder="Título da página" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Conteúdo</label>
              <Textarea 
                placeholder="Conteúdo da página..." 
                rows={10}
              />
            </div>
            <div className="flex gap-2">
              <Button className="bg-golden-amber hover:bg-golden-amber/90 text-background">
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={() => setEditingPage(null)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}