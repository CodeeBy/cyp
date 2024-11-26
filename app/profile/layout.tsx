import React from 'react'

const Profile = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <section>
        {children}
    </section>
  )
}

export default Profile