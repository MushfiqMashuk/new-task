const SignleUser = ({ user }) => {
  return <div>{user && user.first_name}</div>;
};

export default SignleUser;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { userId } = params;
  let data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_API}/${userId}`
    );
    if (response.ok) {
      data = await response.json();
    } else {
      throw Error("Internal Server Error!");
    }
  } catch (err) {
    console.log(err);
  }

  // If the data is not found, we are showing 404 page by returning notFound = true
  if (!data?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: data,
    },
    revalidate: 60,
  };
}
