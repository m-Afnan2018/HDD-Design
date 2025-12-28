import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import FashionBanner from '@/components/banner/fashion-banner';
import PopularProducts from '@/components/products/fashion/popular-products';
import ProductArea from '@/components/products/fashion/product-area';
import WeeksFeatured from '@/components/products/fashion/weeks-featured';
import TrendingProducts from '@/components/products/fashion/trending-products';
import BestSellerProducts from '@/components/products/fashion/best-seller-products';
import FeatureAreaTwo from '@/components/features/feature-area-2';
import InstagramAreaTwo from '@/components/instagram/instagram-area-2';
import Footer from '@/layout/footers/footer';


export default function HomePage() {
  return (
    <Wrapper>
      <Header/>
      <FashionBanner/>
      <PopularProducts/>
      <ProductArea/>
      <WeeksFeatured/>
      <TrendingProducts/>
      <BestSellerProducts/>
      <FeatureAreaTwo/>
      <InstagramAreaTwo/>
      <Footer style_2={true} />
    </Wrapper>
  )
}
