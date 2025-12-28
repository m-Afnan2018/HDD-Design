import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import OrderArea from "@/components/order/order-area";

export const metadata = {
  title: "HD design Fashion Hub - Order Details",
};

export default async function OrderPage({ params }) {
  const { id } = await params;

  return (
    <Wrapper>
      <HeaderTwo style_2={true} />
      <OrderArea orderId={id} />
      <Footer primary_style={true} />
    </Wrapper>
  );
}
