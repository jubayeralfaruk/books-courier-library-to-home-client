import React from 'react';
import HeroBanner from './HeroBanner';
import LatestBooks from './LatestBooks';
import Statistics from './Statistics';
import Categories from './Categories';
import Coverage from './Coverage';
import WhyChoose from './WhyChoose';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div className="bg-theme-primary space-y-16">
            <HeroBanner />
            <LatestBooks />
            <Statistics />
            <Categories />
            <Coverage />
            <WhyChoose />
            <HowItWorks />
            <Testimonials />
            <Newsletter />
            <FAQ />
        </div>
    );
};

export default Home;