import EmailVerifyArea from "@/components/email-verify/email-verify-area";

export const metadata = {
  title: "HD design Fashion Hub - Email Verification",
};

export default async function EmailVerifyPage({ params }) {
  const { token } = await params;
  return (
    <>
      <EmailVerifyArea token={token} />
    </>
  );
}
