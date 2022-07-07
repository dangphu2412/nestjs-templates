import React from 'react'
import Head from 'next/head'
import { LoginForm } from '../modules/auth/components/Form/LoginForm/LoginForm'
import { FullLoader } from '../modules/shared/components/Loader/Full/FullLoader'
import { useLoginMutation } from '../modules/auth/hooks/useLoginMutation'

export default function LoginPage(): React.ReactElement {
  const { isLoading, mutate: doLogin } = useLoginMutation()

  return (
    <>
      <Head>
        <title>Login page example</title>
      </Head>

      <FullLoader isLoading={isLoading} />

      <LoginForm doLogin={doLogin} />
    </>
  )
}
