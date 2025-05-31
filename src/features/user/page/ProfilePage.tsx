import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileForm from '../component/forms/profile-form/ProfileForm'
import PasswordForm from '../component/forms/password-form/PasswordForm'
import { useGetProfileById } from '../hook/customers.hook'

const ProfilePage = () => {
  const { data: profile, isSuccess } = useGetProfileById()
  return (
    <div className='flex justify-center'>
      <Tabs defaultValue='account'>
        <TabsList className='w-full'>
          <TabsTrigger value='account' className='w-full'>
            Account
          </TabsTrigger>
          <TabsTrigger value='password' className='w-full'>
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          {isSuccess && <ProfileForm profile={profile} />}
        </TabsContent>
        <TabsContent value='password'>
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfilePage
