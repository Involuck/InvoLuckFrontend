import EditUserForm from '@/components/forms/UserForm/EditUserForm'

type PageProps = {
  params: {
    id: string
  }
  searchParams: Record<string, string | string[] | undefined>
}

export default function EditUserPage({ params }: PageProps) {
  return <EditUserForm userId={params.id} />
}