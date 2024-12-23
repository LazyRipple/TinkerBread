export default async function handleSignin({ username, email, thxmessage, GGBType }) {
  try {
    const payload = {
      username,
      email,
      thanks_message: thxmessage,
      GGB_type: GGBType,
    }

    const res = await (
      await fetch(`api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: window.location.origin,
        },
        body: JSON.stringify({
          username,
          email,
          thanks_message: thxmessage,
          GGB_type: GGBType,
        }),
      })
    ).json()

    if (res.message == 'failed') {
      throw new Error(res.error)
    }

    signIn('google')
  } catch (error) {
    toast.error(error.message)
  }
}
