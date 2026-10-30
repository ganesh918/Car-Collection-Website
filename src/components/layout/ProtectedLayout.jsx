import RequireAuth from '../auth/RequireAuth'
import Layout from './Layout'

export default function ProtectedLayout() {
  return (
    <RequireAuth>
      <Layout />
    </RequireAuth>
  )
}
