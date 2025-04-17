import { useState } from 'react';
// import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import axios from 'axios'; 



export default function FAQ() {
  const [question, setQuestion] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/faq', { question }, {
        headers: token ? { 'x-auth-token': token } : {}
      });

      alert(res.data.msg);  // or setMsg() to show inline
      setQuestion('');
    } catch (err) {
      alert(err.response?.data?.msg || 'Submission failed');
    }
  };


  const faqData = [
    {
      question: "What are your opening hours?",
      answer: "We are open from 8 AM to 10 PM every day."
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes, we offer home delivery through our website."
    },
    {
      question: "Can I customize my coffee order?",
      answer: [
        "Yes! You can select your preferred milk, sugar, and other add-ons while placing an order.",
        "Or you can make your own custom coffee by simply DIYing it on our website!"
      ]
    },
    {
      question: "Do you serve decaf coffee?",
      answer: "No! unfortunately we don't at the moment. But hopefully soon"
    },
    {
      question: "What is the strongest coffee you have?",
      answer: "Espresso is our strongest coffee without any additives ; milk or any syrups."
    },
    {
      question: "What is the difference between a latte and a cappuccino?",
      answer: "A latte has more steamed milk, making it creamier, while a cappuccino has equal parts espresso, steamed milk, and foam, giving it a stronger coffee taste."
    },
    {
      question: "What is your best selling-coffee?",
      answer: "Our freshly brewed Teddy Graham Latte is a customer favourite! The rich coffee, combined with hints of hazelnut and caramel, creates a divine combination. It's a perfect choice for a sweet treat"
    },
    {
      question: "What is your best-selling non-caffeinated drink?",
      answer: [
        "If you're a fan of matcha, you have to try our Strawberry Matcha Latte! It's a delicious blend of creamy matcha, sweet strawberry syrup, and velvety milk, creating a refreshing yet comforting drink.",
        "Not into matcha? Then our Gingerbread Hot Cocoa is the perfect choice! This cozy treat features rich, velvety hot chocolate infused with warm gingerbread spices, topped with mini marshmallows and a gingerbread cookie. It's like a warm hug in a cup!"
      ]
    }
  ];

  return (
    <div className="faq-page">
      {/* <Header /> */}
      <Navigation />

      
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqData.map((faq, index) => (
          <details key={index}>
            <summary>{faq.question}</summary>
            {Array.isArray(faq.answer) ? (
              faq.answer.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <p>{faq.answer}</p>
            )}
          </details>
        ))}
      </div>

      <h3>Didn't find your question?</h3>
      <p>Submit your question below, and we'll get back to you!</p>

      <form id="faq-form" onSubmit={handleSubmit}>
        <label htmlFor="question">Your Question:</label>
        <textarea
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        
        <button type="submit">Submit</button>
      </form>

      <Footer />
    </div>
  );
}