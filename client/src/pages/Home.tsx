import DealsSection from '@/components/ui/DealsSection';
import FeaturedCategories from '@/components/ui/FeaturedCategories';
import Hero from '@/components/ui/Hero';
import TrendingProducts from '@/components/ui/TrendingProducts';

function Home() {
  return (
    <>
    <Hero/>
    <FeaturedCategories/>
    <TrendingProducts/>
    <DealsSection/>
    </>
  )
}

export default Home;
