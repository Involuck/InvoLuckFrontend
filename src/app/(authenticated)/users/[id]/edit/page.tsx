import EditUserForm from '@/components/forms/UserForm/EditUserForm'

type Props = {
  params: {
    id: string
  }
}

export default function EditUserPage({ params }: Props) {
  return <EditUserForm userId={params.id} />
}