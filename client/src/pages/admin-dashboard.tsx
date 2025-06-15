import { useAuth } from '@/hooks/use-auth';
import { PageTransition } from '@/components/page-transition';
import { useRoute } from 'wouter';
import AdminOverview from '@/components/admin/admin-overview';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [match, params] = useRoute('/admin-dashboard/:tab?');
  
  // Get current tab from URL parameter
  const activeTab = params?.tab || 'overview';

  // Acesso sempre permitido no ambiente Replit

  const renderContent = () => {
    switch (activeTab) {
      default:
        return <AdminOverview />;
    }
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </div>
    </PageTransition>
  );
}