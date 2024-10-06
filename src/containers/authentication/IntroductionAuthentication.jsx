import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import './introductionAuthentication.css';

import undraw02 from '../../assets/img/home/undraw02.png';
import undraw03 from '../../assets/img/home/undraw03.png';
import undraw04 from '../../assets/img/home/undraw04.png';
import undraw05 from '../../assets/img/home/undraw05.png';

import Loader from '../../components/loader/Loader.jsx';

const IntroductionAuthentication = () => {

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const [sectionLoginIsActive, setSectionLoginIsActive] = useState(true);
    const [sectionSignUpIsActive, setSectionSignUpIsActive] = useState(false);
    const [sectionForgotPasswordIsActive, setSectionForgotPasswordIsActive] = useState(false);
    const [sectionVerificationCodeIsActive, setSectionVerificationCodeIsActive] = useState(false);

    const btnLoginForSignUp = () => {
        setSectionLoginIsActive(!sectionLoginIsActive);
        setSectionSignUpIsActive(!sectionSignUpIsActive);
    };

    const btnLoginForForgotPassword = () => {
        setSectionLoginIsActive(!sectionLoginIsActive);
        setSectionForgotPasswordIsActive(!sectionForgotPasswordIsActive);
    };

    const btnSignUpForLogin = () => {
        setSectionSignUpIsActive(!sectionSignUpIsActive);
        setSectionLoginIsActive(!sectionLoginIsActive);
    };

    const btnForgotPasswordForLogin = () => {
        setSectionForgotPasswordIsActive(!sectionForgotPasswordIsActive);
        setSectionLoginIsActive(!sectionLoginIsActive);
    };

    const btnVerificationCodeForLogin = () => {
        setSectionVerificationCodeIsActive(!sectionVerificationCodeIsActive);
        setSectionLoginIsActive(!sectionLoginIsActive);
    };

    const [userUid, setUserUid] = useState('');

    const [errorMessageLogin, setErrorMessageLogin] = useState('');
    const [errorMessageSignUp, setErrorMessageSignUp] = useState('');
    const [errorMessageForgotPassword, setErrorMessageForgotPassword] = useState('');
    const [errorMessageVerificationCode, setErrorMessageVerificationCode] = useState('');

    const loginInputEmail = useRef();
    const loginInputPassword = useRef();

    const signUpInputName = useRef();
    const signUpInputEmail = useRef();
    const signUpInputPassword = useRef();

    const forgotPasswordInputEmail = useRef();

    const verificationCodeInputCode = useRef();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const startInput = () => {
            const userRecovered = JSON.parse(localStorage.getItem("user"));

            if (userRecovered) {
                loginInputEmail.current.value = userRecovered.email;
                loginInputPassword.current.value = userRecovered.password;
                handleCheckboxChange();
            }
        };

        startInput();
    }, []);

    const submitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputLoginEmail = loginInputEmail.current.value.trim();
        const inputLoginPassword = loginInputPassword.current.value.trim();

        if (inputLoginEmail === '' || inputLoginEmail === null || inputLoginPassword === '' || inputLoginPassword === null) {

            if (inputLoginEmail === '' || inputLoginEmail === null) {
                setErrorMessageLogin('Preencha o campo E-mail!');
                setLoading(false);
                return;
            }

            if (inputLoginPassword === '' || inputLoginPassword === null) {
                setErrorMessageLogin('Preencha o campo senha!');
                setLoading(false);
                return;
            }

        }

        const user = {
            email: inputLoginEmail,
            password: inputLoginPassword
        };

        try {
            const signInWithEmailAndPassword = await axios.put(`${apiUrl}user/signInWithEmailAndPassword`, user);

            if (signInWithEmailAndPassword.data.status === 'success') {
                setUserUid(signInWithEmailAndPassword.data.user.uid);

                if (isChecked) {
                    localStorage.setItem("user", JSON.stringify(user));
                } else {
                    localStorage.removeItem("user");
                }

                setSectionLoginIsActive(false);
                setSectionVerificationCodeIsActive(true);
            }

        } catch (err) {

            if (err.response && err.response.data) {

                if (err.response.data.code === 404) {
                    setErrorMessageLogin('E-mail ou senha incorretos!');
                }

            } else {
                setErrorMessageLogin('ERROR(signInWithEmailAndPassword): Por favor informe o desenvolvedor!');
            }

        } finally {
            setLoading(false);
        }
    };

    const submitSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputSignUpName = loginInputEmail.current.value.trim();
        const inputSignUpEmail = loginInputPassword.current.value.trim();
        const inputSignUpPassword = loginInputPassword.current.value.trim();

        if (inputSignUpName === '' || inputSignUpName === null || inputSignUpEmail === '' || inputSignUpEmail === null || inputSignUpPassword.length < 8 || inputSignUpPassword === '' || inputSignUpPassword === null) {

            if (inputSignUpName === '' || inputSignUpName === null) {
                setErrorMessageSignUp('Preencha o campo E-mail!');
                setLoading(false);
                return;
            }

            if (inputSignUpEmail === '' || inputSignUpEmail === null) {
                setErrorMessageSignUp('Preencha o campo senha!');
                setLoading(false);
                return;
            }

            if (inputSignUpPassword === '' || inputSignUpPassword === null) {
                setErrorMessageSignUp('Preencha o campo senha!');
                setLoading(false);
                return;
            }

            if (inputSignUpPassword.length < 8) {
                setErrorMessageSignUp('As senhas devem ter pelo menos 8 caracteres!');
                setLoading(false);
                return;
            }

        }

        const user = {
            displayName: inputSignUpName,
            email: signUpInputEmail.current.value,
            password: signUpInputPassword.current.value
        };

        try {
            const createUser = await axios.post(`${apiUrl}user/createUser`, user);

            if (createUser.data.status === 'success') {
                setUserUid(createUser.data.user.uid);
                setSectionSignUpIsActive(false);
                setSectionVerificationCodeIsActive(true);
            }

        } catch (err) {

            if (err.response.data.code === 409) {
                setErrorMessageSignUp('E-mail já existente ou inválido!');
            }

            if (err.response.data.code === 404) {
                setErrorMessageSignUp('Email inexistente ou inválido!');
            }

            if (err.response.data.status === undefined) {
                setErrorMessageSignUp('ERROR(createUser): Por favor informe o desenvolvedor !');
            }

        } finally {
            setLoading(false);
        }
    };

    const submitForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputForgotPasswordEmail = forgotPasswordInputEmail.current.value.trim();

        if (inputForgotPasswordEmail === '' || inputForgotPasswordEmail === null) {
            setErrorMessageForgotPassword('Preencha o campo E-mail');
            setLoading(false);
            return;
        }

        const user = {
            email: inputForgotPasswordEmail
        };

        try {
            const sendPasswordResetEmail = await axios.put(`${apiUrl}user/sendPasswordResetEmail`, user);

            if (sendPasswordResetEmail.data.status === 'success') {
                setUserUid(sendPasswordResetEmail.data.user.uid);
                setSectionForgotPasswordIsActive(false);
                setSectionVerificationCodeIsActive(true);
            }

        } catch (err) {

            if (err.response.data.code === 404) {
                setErrorMessageForgotPassword('E-mail inexistente ou inválido!');
            }

            if (err.response.data.status === undefined) {
                setErrorMessageForgotPassword('ERROR(sendPasswordResetEmail): Por favor informe o desenvolvedor!');
            }

        } finally {
            setLoading(false);
        }

    };

    const submitVerificationCode = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputVerificationCode = verificationCodeInputCode.current.value.trim();

        if (inputVerificationCode === '' || inputVerificationCode === null) {
            setErrorMessageVerificationCode('Preencha o campo para a verificar o código!');
            setLoading(false);
            return;
        }

        console.log(inputVerificationCode + ' verific')
        if (inputVerificationCode.length != 6) {
            setErrorMessageVerificationCode('O código deve ter 6 dígitos');
            setLoading(false);
            return;
        }

        const user = {
            uid: userUid,
            codeVerification: inputVerificationCode
        };

        try {
            const validateVerificationCode = await axios.put(`${apiUrl}user/validateVerificationCode`, user);

            if (validateVerificationCode.data.status === 'success') {
                localStorage.setItem("tokenUser", validateVerificationCode.data.token);
                navigate('/profile');
            }

        } catch (err) {

            if (err.response.data.code === 409) {
                setErrorMessageVerificationCode(`O "código: " ${inputVerificationCode} " expirou ou é inválido!`);
            }

            if (err.response.data.code === 404) {
                setErrorMessageVerificationCode('E-mail inexistente ou inválido!');
            }

            if (err.response.data.status === undefined) {
                setErrorMessageVerificationCode('ERROR(validateVerificationCode): Por favor informe o desenvolvedor!');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <Loader /> : null}

            <section className='introductionAuthentication' >
                <div className={`container login ${sectionLoginIsActive ? 'active' : ''}`} >

                    <div className='container-text'>
                        <h1> Login </h1>

                        <form className="container-form" onSubmit={submitLogin}>

                            <div className="inputBox">
                                <input type="text" name="LoginEmail" required="required" placeholder="" autoComplete="LoginEmail" ref={loginInputEmail} />
                                <span className="text"> Insira seu e-mail: </span>
                                <span className="line"></span>
                            </div>

                            <div className="inputBox">
                                <input type="password" name="LoginPassword" required="required" placeholder="" minLength="8" autoComplete="current-password" ref={loginInputPassword} />
                                <span className="text"> Insira sua senha: </span>
                                <span className="line"></span>
                            </div>

                            <p className='btn-forgot-password' onClick={btnLoginForForgotPassword} > Esqueceu sua senha ?</p>

                            <div className="container-checkbox" >
                                <input className="checkbox" id="inputCheckBox" type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                                <label htmlFor="inputCheckBox"> <p> Deseja salvar seus dados ? </p> </label>
                            </div>

                            <input className="btn-primary" type="submit" value="Entrar" />

                            <p className="textLine"> <span> ou </span> </p>
                            <p className='btn-second'> Não tenho uma conta? <span onClick={btnLoginForSignUp} > Inscreva-se </span> </p>
                            <p className="errorMessage"> {errorMessageLogin} </p>

                        </form>
                    </div>

                    <div className='container-img'>
                        <img src={undraw02} alt='img' />
                    </div>
                </div>


                <div className={`container signUp ${sectionSignUpIsActive ? 'active' : ''}`} >
                    <div className='container-img'>
                        <img src={undraw04} alt='img' />
                    </div>

                    <div className='container-text'>
                        <h1> Inscreva-se  </h1>

                        <form className="container-form" onSubmit={submitSignUp} >

                            <div className="inputBox">
                                <input type="text" name="SignUpName" required="required" placeholder="" autoComplete="SignUpName" ref={signUpInputName} />
                                <span className="text"> Insira seu nome: </span>
                                <span className="line"></span>
                            </div>

                            <div className="inputBox">
                                <input type="text" name="SignUpEmail" required="required" placeholder="" autoComplete="SignUpEmail" ref={signUpInputEmail} />
                                <span className="text"> Insira seu e-mail: </span>
                                <span className="line"></span>
                            </div>

                            <div className="inputBox">
                                <input type="password" name="SignUpPassword" required="required" placeholder="" autoComplete="current-password" ref={signUpInputPassword} />
                                <span className="text"> Insira sua senha: </span>
                                <span className="line"></span>
                            </div>

                            <input className="btn-primary" type="submit" value="Criar sua conta" />

                            <p className="textLine"> <span> ou </span> </p>
                            <p className='btn-second'> Já é membro? <span onClick={btnSignUpForLogin} > Acesse sua conta </span> </p>
                            <p className="errorMessage"> {errorMessageSignUp} </p>

                        </form>

                    </div>
                </div>


                <div className={`container forgotPassword ${sectionForgotPasswordIsActive ? 'active' : ''}`} >

                    <div className='container-img'>
                        <img src={undraw03} alt='img' />
                    </div>

                    <div className='container-text'>
                        <h1> Recupere a sua senha </h1>

                        <form className="container-form" onSubmit={submitForgotPassword}>

                            <div className="inputBox">
                                <input type="text" name="ForgotPassworEmail" required="required" placeholder="" autoComplete='ForgotPassworEmail' ref={forgotPasswordInputEmail} />
                                <span className="text"> Insira seu e-mail: </span>
                                <span className="line"></span>
                            </div>

                            <input className="btn-primary" type="submit" value=" Solicitar pedido" />

                            <p className="textLine"> <span> ou </span> </p>
                            <p className='btn-second'> Já é membro? <span onClick={btnForgotPasswordForLogin}> Acesse sua conta </span> </p>
                            <p className="errorMessage"> {errorMessageForgotPassword} </p>

                        </form>

                    </div>
                </div>


                <div className={`container verificationCode ${sectionVerificationCodeIsActive ? 'active' : ''}`} >

                    <div className='container-text'>
                        <h1> Codigo de verificacão </h1>

                        <p >Para avançar, por favor, verifique seu e-mail, onde enviamos um código de verificação de 6 dígitos. 
                            Digite o código no campo abaixo. Se você não encontrar o e-mail, verifique a pasta de spam ou 
                            lixo eletrônico. </p>

                        <form className="container-form" onSubmit={submitVerificationCode}>

                            <div className="inputBox">
                                <input type="number" name="CodeVerificationCode" required="required" placeholder="" autoComplete='CodeVerificationCode' ref={verificationCodeInputCode} />
                                <span className="text"> Insira seu código: </span>
                                <span className="line"></span>
                            </div>

                            <input className="btn-primary" type="submit" value=" Solicitar pedido" />

                            <p className="textLine"> <span> ou </span> </p>
                            <p className='btn-second'> <span onClick={btnVerificationCodeForLogin}> cancelar </span> </p>
                            <p className="errorMessage"> {errorMessageVerificationCode} </p>

                        </form>
                    </div>

                    <div className='container-img'>
                        <img src={undraw05} alt='img' />
                    </div>

                </div>
            </section>

        </>
    );
};

export default IntroductionAuthentication;