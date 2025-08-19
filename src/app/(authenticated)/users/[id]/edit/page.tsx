import EditUserForm from '@/components/forms/UserForm/EditUserForm'

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function EditUserPage({ params }: PageProps) {
  // Aquí podrías hacer fetch de datos del usuario si lo necesitas
  const userData = await Promise.resolve({ id: params.id })
  
  return <EditUserForm userId={userData.id} />
}