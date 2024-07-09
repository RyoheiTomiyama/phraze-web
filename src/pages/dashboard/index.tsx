import { AuthRequired } from '@/components/feature/auth'
import { Dashboard } from '@/components/template/dashboard'

export default function DashboardPage() {
  return (
    <AuthRequired>
      <Dashboard />
    </AuthRequired>
  )
}
