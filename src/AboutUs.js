import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className='about-us-container'>
            <h1>About Us</h1>

            <section>
                <h2>Project Overview</h2>
                <p>
                    Welcome to our Sentiment Analysis project focused on analyzing Amazon reviews in the electronics category. 
                    Our goal is to provide insightful data that helps businesses and consumers better understand product sentiment.
                </p>
            </section>
 
            <div className='about-section'>
                <h2>Team</h2>
                <p>Our project is driven by a passionate team of data enthusiasts:</p>
                <div className="team-container">
                    <div className="team-member"><strong>Prasad Pawar</strong> - Web Developer</div>
                    <div className="team-member"><strong>Hrushikesh Kulkarni</strong> - Data Analyst & Developer</div>
                    <div className="team-member"><strong>Tanvir Auti</strong> - Data Analyst</div>
                    <div className="team-member"><strong>Zafar Dakhani</strong> - Data Analyst & Web Developer</div>
                </div>
                <p>
                    We are guided by our mentor, <strong>Usha Joglekar</strong>, who has provided invaluable insights and support throughout the project.
                </p>
            </div>

            <div className='about-section'>
                <h2>Technology Stack</h2>
                <p>
                    Our sentiment analysis is powered by a range of tools and technologies:
                </p>
                <ul>
                    <li>Python, Pandas, NLTK for data analysis and sentiment modeling</li>
                    <li>React.js, HTML, CSS for web development</li>
                </ul>
            </div>

            <div className='about-section'>
                <h2>Project Goals</h2>
                <p><strong>Short-Term Goals:</strong> We are focused on enhancing our sentiment analysis model and adding more features to the website.</p>
                <p><strong>Long-Term Vision:</strong> We envision scaling our analysis to multiple product categories and integrating with other e-commerce platforms.</p>
            </div>

            <div className='about-section'>
                <h2>Impact and Value</h2>
                <p><strong>For Businesses:</strong> Our analysis helps businesses understand customer feedback, leading to better product development and customer satisfaction.</p>
                <p><strong>For Consumers:</strong> We provide insights that help consumers make informed purchasing decisions based on real customer sentiment.</p>
            </div>

            <div className='about-section'>
                <h2>Contact Us</h2>
                <p>If you have any questions or would like to get in touch, please contact us at <a href="mailto:tanvirauti2620@gmail.com">tanvirauti2620@gmail.com</a>.</p>
            </div>

            <div className='about-section'>
                <h2>Acknowledgments</h2>
                <p>We would like to thank our mentor, Usha Joglekar, for her continuous guidance, as well as the resources and communities that have supported us in our journey.</p>
            </div>
        </div>
    );
};

export default AboutUs;
