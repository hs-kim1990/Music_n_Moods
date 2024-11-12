import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Cake } from 'lucide-react';
import MusicRecommendations from './MusicRecommendations';

const Questionnaire: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
    age: '',
    gender: '',
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [moodState, setMoodState] = useState({
    finalMood: '',
    moodScores: { Happy: 0, Tired: 0, Sad: 0, Anxious: 0 }
  });
  // User data from localStorage (or context)
  const savedUser = localStorage.getItem('user');

  // State for the form inputs
  const [skippedAgeGender, setSkippedAgeGender] = useState(false);
  console.log(skippedAgeGender)
  useEffect(() => {
    // If user is logged in and data exists, prefill the form and skip questions
    console.log(savedUser)
    if (savedUser) {
      const userData = JSON.parse(savedUser)

      setAnswers({ ...answers, age:userData.age,  gender: userData.gender})
      setSkippedAgeGender(true);
    }
  }, [step]);

  const questionCount = savedUser ? 10 : 12; // 10 original questions + 2 for age and gender

  const questions = savedUser ? [
    {
      question: "What would you most like to do today?",
      options: [
        { position: "A", text: "Go for a walk and enjoy the fresh air", mood: "Happy", score: 5 },
        { position: "B", text: "Chat with friends and pass the time", mood: "Happy", score: 4 },
        { position: "C", text: "Lie on the couch watching a show or movie", mood: "Tired", score: 3 },
        { position: "D", text: "Find a quiet place and avoid seeing anyone", mood: "Sad", score: 4 },
        { position: "E", text: "Just want to lie down and do nothing", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "Imagine you're at a coffee shop. Which drink would you choose today?",
      options: [
        { position: "A", text: "Refreshing juice or a cold drink", mood: "Happy", score: 5 },
        { position: "B", text: "Hot coffee or hot chocolate for a warm feeling", mood: "Happy", score: 4 },
        { position: "C", text: "Tea, something to bring peace", mood: "Tired", score: 3 },
        { position: "D", text: "Orange juice or lemon water for a little boost", mood: "Tired", score: 2 },
        { position: "E", text: "Coffee, the stronger the better, need the energy", mood: "Anxious", score: 4 }
      ]
    },
    {
      question: "Did anything today make you want to roll your eyes?",
      options: [
        { position: "A", text: "Not at all, everything went smoothly", mood: "Happy", score: 5 },
        { position: "B", text: "A little bit, some minor annoyances", mood: "Anxious", score: 3 },
        { position: "C", text: "Yes, I couldn't help but roll my eyes once", mood: "Anxious", score: 4 },
        { position: "D", text: "Multiple times, it was really annoying", mood: "Anxious", score: 5 },
        { position: "E", text: "I kept rolling my eyes; today was just too much", mood: "Anxious", score: 6 }
      ]
    },
    {
      question: "If you were to choose a color to describe your mood today, what would it be?",
      options: [
        { position: "A", text: "Bright, sunny yellow", mood: "Happy", score: 5 },
        { position: "B", text: "Peaceful, calm blue", mood: "Happy", score: 4 },
        { position: "C", text: "Subtle, warm gray", mood: "Sad", score: 3 },
        { position: "D", text: "Deep purple or dark red", mood: "Sad", score: 4 },
        { position: "E", text: "Exhausted, lifeless black", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "How do you feel about talking with others today?",
      options: [
        { position: "A", text: "Very happy, I enjoy sharing with others", mood: "Happy", score: 5 },
        { position: "B", text: "Pretty good, a bit of chatting here and there", mood: "Happy", score: 4 },
        { position: "C", text: "Neutral, I can talk if needed", mood: "Sad", score: 3 },
        { position: "D", text: "A bit annoyed, not in the mood for talking", mood: "Sad", score: 4 },
        { position: "E", text: "I don't want to interact at all, feeling tired", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "You're looking at your wardrobe to pick an outfit today. What would you choose?",
      options: [
        { position: "A", text: "Something bright, I need a bit of energy", mood: "Happy", score: 5 },
        { position: "B", text: "Something comfortable, not focusing on color", mood: "Happy", score: 4 },
        { position: "C", text: "Subdued colors to keep things calm", mood: "Sad", score: 3 },
        { position: "D", text: "Dark or neutral colors that match my mood", mood: "Sad", score: 4 },
        { position: "E", text: "Anything random, not concerned with appearance", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "Do you feel like saying something to the world today?",
      options: [
        { position: "A", text: "Yes! I feel like I have so much to say", mood: "Happy", score: 5 },
        { position: "B", text: "Maybe a little, like posting a short status", mood: "Happy", score: 3 },
        { position: "C", text: "A bit, but not strongly", mood: "Sad", score: 3 },
        { position: "D", text: "Not really, I'd prefer silence today", mood: "Sad", score: 4 },
        { position: "E", text: "No desire at all, it feels pointless", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "If you were to choose a movie genre to watch today, what would it be?",
      options: [
        { position: "A", text: "Comedy, to have a good laugh", mood: "Happy", score: 5 },
        { position: "B", text: "Heartwarming drama, something comforting", mood: "Happy", score: 4 },
        { position: "C", text: "Action, something exciting", mood: "Happy", score: 3 },
        { position: "D", text: "Art film, with a slower pace", mood: "Sad", score: 4 },
        { position: "E", text: "Nothing, I'm not interested in watching anything", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "How does time feel for you today?",
      options: [
        { position: "A", text: "Time flies; there's so much fun", mood: "Happy", score: 5 },
        { position: "B", text: "Feels normal, time is moving as usual", mood: "Happy", score: 3 },
        { position: "C", text: "A bit slow, but manageable", mood: "Sad", score: 3 },
        { position: "D", text: "Time drags, it feels like ages", mood: "Anxious", score: 4 },
        { position: "E", text: "Don't even want to look at the time; just want today to end", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "If someone smiles at you while walking down the street, what would you do?",
      options: [
        { position: "A", text: "Smile back with a big grin, feeling better", mood: "Happy", score: 5 },
        { position: "B", text: "Give a gentle smile, feeling warm", mood: "Happy", score: 4 },
        { position: "C", text: "Feel a bit awkward and nod", mood: "Anxious", score: 3 },
        { position: "D", text: "Feel neutral, wouldn't respond much", mood: "Sad", score: 3 },
        { position: "E", text: "Feel uncomfortable, slightly annoyed", mood: "Anxious", score: 5 }
      ]
    }
  ] : [
    {
      question: "How old are you?",
      options: [],
      isInput: true,
    },
    {
      question: "What is your gender?",
      options: [
        { text: "Male", mood: "Happy", score: 0 },
        { text: "Female", mood: "Happy", score: 0 },
        { text: "Non-binary", mood: "Happy", score: 0 },
        { text: "Prefer not to say", mood: "Happy", score: 0 },
      ],
      isInput: false,
    },
    {
      question: "What would you most like to do today?",
      options: [
        { position: "A", text: "Go for a walk and enjoy the fresh air", mood: "Happy", score: 5 },
        { position: "B", text: "Chat with friends and pass the time", mood: "Happy", score: 4 },
        { position: "C", text: "Lie on the couch watching a show or movie", mood: "Tired", score: 3 },
        { position: "D", text: "Find a quiet place and avoid seeing anyone", mood: "Sad", score: 4 },
        { position: "E", text: "Just want to lie down and do nothing", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "Imagine you're at a coffee shop. Which drink would you choose today?",
      options: [
        { position: "A", text: "Refreshing juice or a cold drink", mood: "Happy", score: 5 },
        { position: "B", text: "Hot coffee or hot chocolate for a warm feeling", mood: "Happy", score: 4 },
        { position: "C", text: "Tea, something to bring peace", mood: "Tired", score: 3 },
        { position: "D", text: "Orange juice or lemon water for a little boost", mood: "Tired", score: 2 },
        { position: "E", text: "Coffee, the stronger the better, need the energy", mood: "Anxious", score: 4 }
      ]
    },
    {
      question: "Did anything today make you want to roll your eyes?",
      options: [
        { position: "A", text: "Not at all, everything went smoothly", mood: "Happy", score: 5 },
        { position: "B", text: "A little bit, some minor annoyances", mood: "Anxious", score: 3 },
        { position: "C", text: "Yes, I couldn't help but roll my eyes once", mood: "Anxious", score: 4 },
        { position: "D", text: "Multiple times, it was really annoying", mood: "Anxious", score: 5 },
        { position: "E", text: "I kept rolling my eyes; today was just too much", mood: "Anxious", score: 6 }
      ]
    },
    {
      question: "If you were to choose a color to describe your mood today, what would it be?",
      options: [
        { position: "A", text: "Bright, sunny yellow", mood: "Happy", score: 5 },
        { position: "B", text: "Peaceful, calm blue", mood: "Happy", score: 4 },
        { position: "C", text: "Subtle, warm gray", mood: "Sad", score: 3 },
        { position: "D", text: "Deep purple or dark red", mood: "Sad", score: 4 },
        { position: "E", text: "Exhausted, lifeless black", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "How do you feel about talking with others today?",
      options: [
        { position: "A", text: "Very happy, I enjoy sharing with others", mood: "Happy", score: 5 },
        { position: "B", text: "Pretty good, a bit of chatting here and there", mood: "Happy", score: 4 },
        { position: "C", text: "Neutral, I can talk if needed", mood: "Sad", score: 3 },
        { position: "D", text: "A bit annoyed, not in the mood for talking", mood: "Sad", score: 4 },
        { position: "E", text: "I don't want to interact at all, feeling tired", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "You're looking at your wardrobe to pick an outfit today. What would you choose?",
      options: [
        { position: "A", text: "Something bright, I need a bit of energy", mood: "Happy", score: 5 },
        { position: "B", text: "Something comfortable, not focusing on color", mood: "Happy", score: 4 },
        { position: "C", text: "Subdued colors to keep things calm", mood: "Sad", score: 3 },
        { position: "D", text: "Dark or neutral colors that match my mood", mood: "Sad", score: 4 },
        { position: "E", text: "Anything random, not concerned with appearance", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "Do you feel like saying something to the world today?",
      options: [
        { position: "A", text: "Yes! I feel like I have so much to say", mood: "Happy", score: 5 },
        { position: "B", text: "Maybe a little, like posting a short status", mood: "Happy", score: 3 },
        { position: "C", text: "A bit, but not strongly", mood: "Sad", score: 3 },
        { position: "D", text: "Not really, I'd prefer silence today", mood: "Sad", score: 4 },
        { position: "E", text: "No desire at all, it feels pointless", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "If you were to choose a movie genre to watch today, what would it be?",
      options: [
        { position: "A", text: "Comedy, to have a good laugh", mood: "Happy", score: 5 },
        { position: "B", text: "Heartwarming drama, something comforting", mood: "Happy", score: 4 },
        { position: "C", text: "Action, something exciting", mood: "Happy", score: 3 },
        { position: "D", text: "Art film, with a slower pace", mood: "Sad", score: 4 },
        { position: "E", text: "Nothing, I'm not interested in watching anything", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "How does time feel for you today?",
      options: [
        { position: "A", text: "Time flies; there's so much fun", mood: "Happy", score: 5 },
        { position: "B", text: "Feels normal, time is moving as usual", mood: "Happy", score: 3 },
        { position: "C", text: "A bit slow, but manageable", mood: "Sad", score: 3 },
        { position: "D", text: "Time drags, it feels like ages", mood: "Anxious", score: 4 },
        { position: "E", text: "Don't even want to look at the time; just want today to end", mood: "Tired", score: 5 }
      ]
    },
    {
      question: "If someone smiles at you while walking down the street, what would you do?",
      options: [
        { position: "A", text: "Smile back with a big grin, feeling better", mood: "Happy", score: 5 },
        { position: "B", text: "Give a gentle smile, feeling warm", mood: "Happy", score: 4 },
        { position: "C", text: "Feel a bit awkward and nod", mood: "Anxious", score: 3 },
        { position: "D", text: "Feel neutral, wouldn't respond much", mood: "Sad", score: 3 },
        { position: "E", text: "Feel uncomfortable, slightly annoyed", mood: "Anxious", score: 5 }
      ]
    }
  ];
  
  const handleNext = (answer: Partial<typeof answers> = {}) => {
    setAnswers((prev: any) => ({ ...prev, ...answer }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => (prev > 0 ? prev - 1 : prev));
  };

  const calculateMood = () => {
    const newMoodScores = { Happy: 0, Tired: 0, Sad: 0, Anxious: 0 };

    Object.keys(answers).forEach((questionKey) => {
      console.log(questionKey)
      if(questionKey !== 'age' && questionKey !== 'gender') {
        const answer = answers[questionKey as keyof typeof answers];
        if (answer) {
          const [mood, score] = answer.split('+');
          newMoodScores[mood as keyof typeof newMoodScores] += parseInt(score, 10);
        }
      }
    });

    const highestMood = Object.entries(newMoodScores).reduce(
      (prev, current) => (current[1] > prev[1] ? current : prev),
      ['Happy', 0]
    );

    setMoodState({
      finalMood: highestMood[0],
      moodScores: newMoodScores
    });
  };  

  useEffect(() => {
    if (step === questionCount) {
      calculateMood();
      setShowRecommendations(true);
    }
  }, [step]);

  const renderStep = () => {
    const currentQuestion = questions[step];

    if (!currentQuestion) return null;

    return (
      <div className="relative flex flex-grow flex-col items-center justify-center text-center space-y-6 h-full w-full">
        <div className="absolute w-full left-0 top-0 h-[4px] bg-gray-200/60">
          <div
            className="bg-yellow-500 h-full transition-all"
            style={{ width: `${(step / questionCount) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-2xl text-center font-semibold text-yellow-100">{currentQuestion.question}</h2>
        <p className="text-sm text-yellow-300">Question {step + 1} of {questionCount}</p>
    
        {/* Age Question */}
        {step === 0 && !skippedAgeGender && (
          <div className="relative w-full max-w-xs">
            <Cake className="absolute top-1/2 transform -translate-y-1/2 left-3 text-yellow-300" />
            <input
              type="text"
              value={answers.age || ''}
              placeholder="Enter your age"
              className="w-full pl-12 pr-4 py-3 bg-brown-800 text-white border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-white/40 transition"
              onChange={(e) => {
                // Allow only numeric input (prevent non-numeric characters)
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setAnswers({ ...answers, age: value });
                }
              }}
              maxLength={3} // Limit the length of the input to 3 digits (optional)
            />
          </div>
        )}
    
        {/* Gender Question */}
        {step === 1 && !skippedAgeGender && (
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((gender) => (
              <button
                key={gender}
                onClick={() => {
                  setAnswers({ ...answers, gender: gender.toLowerCase() })
                  handleNext()
                }}
                className={`p-4 bg-brown-800 text-white rounded-lg hover:bg-yellow-600 transition ${
                  answers.gender === gender.toLowerCase() ? 'ring-2 ring-yellow-500 bg-yellow-600' : ''
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        )}
    
        {/* Other Questions */}
        {(skippedAgeGender ? true : ![0, 1].includes(step)) && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {currentQuestion.options.map(({ text, mood, score }, index) => {
              const selectedAnswer = answers[`question${step + 1}`];
              const isSelected = selectedAnswer === `${mood}+${score}`;
              return (
                <button
                  key={index}
                  onClick={() => handleNext({ [`question${step + 1}`]: `${mood}+${score}` })}
                  className={`p-6 rounded-lg hover:bg-yellow-600 transition ease-in-out duration-300 shadow-md hover:shadow-xl ${isSelected ? 'bg-yellow-500 text-brown-900' : 'bg-brown-800 text-white'}`}
                >
                  <div className="flex items-center">
                    <p className="ml-2 text-md text-left"><span className="text-lg font-bold">{index + 1}.</span> {text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  if (showRecommendations) {
    return <MusicRecommendations userInfo={{ ...answers}} moodState={moodState}/>;
  }

  const isNextDisabled = step === 0 ? !answers.age : step === 1 ? !answers.gender : !answers[`question${step + 1}`];

  return (
    <div className="flex flex-col min-h-[80vh] mx-auto bg-gray-900/20 p-6 rounded-xl backdrop-blur-md shadow-lg justify-between">
      <div className="flex-grow flex flex-col justify-center items-center">
        {renderStep()}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`flex items-center px-4 py-2 bg-brown-800 text-yellow-300 rounded-lg font-semibold hover:bg-yellow-600 transition ${
            step === 0 && 'opacity-0 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="mr-2" /> Back
        </button>
        <button
          onClick={() => handleNext()}
          disabled={isNextDisabled}
          className="flex items-center px-4 py-2 bg-yellow-500 text-brown-900 rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
