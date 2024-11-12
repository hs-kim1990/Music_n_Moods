import { useEffect } from 'react';
import { Music } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

function AboutUs() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-900 via-brown-800 to-yellow-900 text-yellow-100 flex flex-col items-center px-4 py-12">
      
      {/* Header Section */}
      <motion.header 
        className="text-center max-w-3xl mb-12"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <div className="flex justify-center items-center mb-4">
          <Music className="w-10 h-10 text-yellow-400" />
          <h1 className="text-4xl font-extrabold text-yellow-300 ml-2">Discover the Perfect Soundtrack for Your Mood</h1>
        </div>
        <p className="text-lg text-yellow-200 leading-relaxed">
          Music n Moods is here to make every moment count. Whether you're unwinding, seeking energy, or finding focus, we’re committed to providing music that feels like it’s just for you.
        </p>
      </motion.header>

      {/* Benefits Section */}
      <motion.section 
        className="bg-yellow-800/30 rounded-lg p-8 max-w-4xl mb-12 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-yellow-300 mb-6 text-center">Why Listen to Music Based on Your Mood?</h2>
        <ul className="space-y-5 text-yellow-100">
          {[
            { title: 'Reduced Stress and Anxiety', description: 'Calm tunes help ease tension, perfect for finding moments of calm.' },
            { title: 'Boosted Happiness and Energy', description: 'Upbeat songs release feel-good chemicals, boosting joy and motivation.' },
            { title: 'Enhanced Focus and Productivity', description: 'Create a positive atmosphere, ideal for productivity and focus.' },
            { title: 'Improved Mental Health and Emotional Awareness', description: 'Connect with and process emotions, fostering emotional well-being.' },
          ].map((benefit, index) => (
            <motion.li 
              key={index} 
              className="flex items-start space-x-4 bg-yellow-700/30 p-4 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-yellow-400 font-bold text-lg">•</div>
              <div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-yellow-200">{benefit.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="bg-yellow-800/30 rounded-lg p-8 max-w-4xl mb-12 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-yellow-300 mb-6 text-center">How It Works</h2>
        <p className="text-yellow-200 leading-relaxed mb-6">
          Our platform leverages advanced mood-detection algorithms to craft playlists that perfectly match your emotional state. Just tell us how you’re feeling, or let us pick up on subtle cues, and we’ll create a custom playlist for you.
        </p>
        <p className="text-yellow-200 leading-relaxed">
          Experience a new way to connect with your feelings. Let the music move you, mood by mood.
        </p>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="rounded-lg p-2 max-w-4xl mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-yellow-300 mb-6 text-center">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: 'Hyeongseok Kim', role: 'CEO & Founder', imgSrc: './src/assets/images/1.png' },
            { name: 'Miki Mizuki', role: 'Chief Technical Officer', imgSrc: './src/assets/images/2.png' },
            { name: 'Zhuhao Mei', role: 'Head of Product Design', imgSrc: './src/assets/images/3.png' },
            { name: 'Qingyue Pang', role: 'Lead Developer', imgSrc: './src/assets/images/4.png' },
          ].map((member, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col text-center items-center p-4 bg-yellow-700/30 rounded-lg hover:shadow-md transition-all duration-200 max-w-[150px]"
              whileHover={{ scale: 1.05 }}
            >
              <img src={member.imgSrc} alt={member.name} className="w-24 h-24 rounded-full mb-2 border-2 border-yellow-300/60" />
              <h3 className="text-lg font-semibold text-yellow-300">{member.name}</h3>
              {/* <p className="text-yellow-200 text-xs">{member.role}</p> */}
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* About Us Section */}
      <motion.section 
        className="bg-yellow-800/30 rounded-lg p-8 max-w-4xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-yellow-300 mb-6 text-center">About Us</h2>
        <p className="text-yellow-200 leading-relaxed mb-4">
          Music n Moods is a healthcare venture based in Switzerland, fueled by the goal of making impactful healthcare solutions accessible through technology. Our small, dedicated team is driven by creativity, passion, and a vision to bring emotional wellness to the forefront.
        </p>
        <p className="text-yellow-200 leading-relaxed">
          Join us in creating a future where music and mood come together to improve mental well-being.
        </p>
      </motion.section>
    </div>
  );
}

export default AboutUs;
