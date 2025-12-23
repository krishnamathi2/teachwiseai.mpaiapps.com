/**
 * Annual plan workspace removed. Redirects visitors to dashboard.
 */
export const getServerSideProps = () => ({
  redirect: {
    destination: "/",
    permanent: false,
  },
});

export default function AnnualPlan() {
  return null;
}
