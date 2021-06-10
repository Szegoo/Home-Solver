import SignIn from '../preact-components/signin';
import Layout from '../components/Layout';
import SignupMutation from '../mutations/Signup';
import { useState } from 'react';

export default function getStarted() {
    const [isProfessional, setIsProfessional] = useState(false);
    const [isDecided, setIsDecided] = useState(false);
    return (
        <div>
            <Layout />
            <SignupMutation>
                {isDecided ? (
                    <SignIn isProffessional={isProfessional} />
                ) : (
                    <div className="plan-container">
                        <h2>Choose a plan</h2>
                        <div className="flex-box">
                            <div className="white-space"></div>
                            <div className="plan">
                                <h3>User</h3>
                                <p>Become a user and be able to ask for
                                questions. You are able to ask unlimited number
                                of questions from any topic.
                            </p>
                                <span>14.99$</span>
                                <button onClick={() => setIsDecided(true)}>Purchase</button>
                            </div>
                            <div className="plan">
                                <h3>Professional</h3>
                                <p>Becom a professional user of homesolver. Make money
                                by solving problems that user ask for. You need to choose
                                a topic that you are able to work in.
                                </p>
                                <button onClick={() => { setIsDecided(true); setIsProfessional(true) }} id="professional-btn">Create Account</button>
                            </div>
                            <div className="white-space"></div>
                        </div>
                    </div>
                )}
            </SignupMutation>
        </div>
    )
}