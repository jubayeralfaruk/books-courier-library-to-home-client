import React from 'react';
import HeroBanner from './HeroBanner';
import LatestBooks from './LatestBooks';
import Coverage from './Coverage';
import WhyChoose from './WhyChoose';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <LatestBooks></LatestBooks>
            <Coverage></Coverage>
            <WhyChoose></WhyChoose>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;