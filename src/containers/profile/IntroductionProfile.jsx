import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import './introductionProfile.css';

import undraw06 from '../../assets/img/home/undraw06.png';

import Loader from '../../components/loader/Loader.jsx';
import DeleterUser from '../../components/deleterUser/DeleterUser.jsx';

const IntroductionProfile = () => {

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const [isDeleterUser, setIsDeleterUser] = useState(false);

    const [loading, setLoading] = useState(false);

    const [isUseEffect, setIsUseEffect] = useState(0);

    const [sectionProfileIsActive, setSectionProfileIsActive] = useState(true);
    const [sectionChangeNameIsActive, setSectionChangeNameIsActive] = useState(false);
    const [sectionChangePasswordIsActive, setSectionChangePasswordIsActive] = useState(false);
    const [sectionChangePhotoIsActive, setSectionChangePhotoIsActive] = useState(false);

    const btnProfileForName = () => {
        setSectionProfileIsActive(!sectionProfileIsActive);
        setSectionChangeNameIsActive(!sectionChangeNameIsActive);
    };

    const btnProfileForPhoto = () => {
        setSectionProfileIsActive(!sectionProfileIsActive);
        setSectionChangePhotoIsActive(!sectionChangePhotoIsActive);
    };

    const btnProfileForPassword = () => {
        setSectionProfileIsActive(!sectionProfileIsActive);
        setSectionChangePasswordIsActive(!sectionChangePasswordIsActive);
    };

    const btnNameForProfile = () => {
        setSectionChangeNameIsActive(!sectionChangeNameIsActive);
        setSectionProfileIsActive(true);
    };

    const btnPhotoForProfile = () => {
        setSectionChangePhotoIsActive(!sectionChangePhotoIsActive);
        setSectionProfileIsActive(true);
    };

    const btnPasswordForProfile = () => {
        setSectionChangePasswordIsActive(!sectionChangePasswordIsActive);
        setSectionProfileIsActive(true);
    };

    const [errorMessageChangeName, setErrorChangeName] = useState('');
    const [errorMessageChangePassword, setErrorChangePassword] = useState('');
    const [errorMessageChangePhoto, setErrorMessageChangePhoto] = useState('');

    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [updateUsersPhoto, setUpdateUsersPhoto] = useState('');
    const [profileChangePhoto, setProfileChangePhoto] = useState('');

    const changeNameInputName = useRef();

    const changePasswordInputPassword = useRef();
    const changePasswordInputPasswordAgain = useRef();

    useEffect(() => {
        const startProfile = async () => {

            setLoading(true);

            const tokenUserSuper = localStorage.getItem("tokenUser");

            if (tokenUserSuper === null) {
                navigate('/authentication');
            }

            try {
                const profile = await axios.get(`${apiUrl}user/profile`, {
                    headers: {
                        'Authorization': `Bearer ${tokenUserSuper}`
                    }
                });

                if (profile.data.status === 'success') {

                    changeNameInputName.current.value = profile.data.user.displayName;

                    setProfileName(profile.data.user.displayName);
                    setProfileEmail(profile.data.user.email);
                    setProfilePhoto('http://localhost:3333' + profile.data.user.photo);
                    setProfileChangePhoto('http://localhost:3333' + profile.data.user.photo);
                    setIsDeleterUser(false);

                }

            } catch (err) {
                console.log(err);
                navigate('/authentication');
            } finally {
                setLoading(false);
            }
        };

        startProfile();
    }, [isUseEffect]);

    const submitChangeName = async (e) => {
        e.preventDefault();
        setLoading(true);

        const tokenUserSuper = localStorage.getItem("tokenUser");

        if (tokenUserSuper === null) {
            navigate('/authentication');
        }

        const inputName = changeNameInputName.current.value.trim();

        if (inputName === '' || inputName === null) {

            setErrorChangeName('Preencha o campo E-mail!');
            setLoading(false);
            return;

        }

        const user = {
            displayName: inputName,
        };

        try {
            const updateUsersDisplayName = await axios.patch(`${apiUrl}user/profile/updateUsersDisplayName`, user, {
                headers: {
                    'Authorization': `Bearer ${tokenUserSuper}`
                }
            });

            if (updateUsersDisplayName.data.status === 'success') {

                setIsUseEffect(isUseEffect + 1);
                setSectionChangeNameIsActive(!sectionChangeNameIsActive);
                setSectionProfileIsActive(true);
            }

        } catch (err) {

            if (err.response && err.response.data) {

                if (err.response.data.code === 404 || err.response.data.code === 401) {
                    setErrorChangeName('Email inexistente ou inválido!');
                }

            } else {
                setErrorChangeName('ERROR(updateUsersDisplayName): Por favor informe o desenvolvedor !');
            }

        } finally {
            setLoading(false);
        }
    };

    const submitChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const tokenUserSuper = localStorage.getItem("tokenUser");

        if (tokenUserSuper === null) {
            navigate('/authentication');
        }

        const inputPassword = changePasswordInputPassword.current.value.trim();
        const inputPasswordAgain = changePasswordInputPasswordAgain.current.value.trim();

        if (inputPassword === '' || inputPasswordAgain === '' || inputPassword === null || inputPasswordAgain === null || inputPassword.length < 8 || inputPasswordAgain.length < 8 || inputPassword != inputPasswordAgain) {

            if (inputPassword === '' || inputPasswordAgain === '' || inputPassword === null || inputPasswordAgain === null) {
                setErrorChangePassword('Preencha os campos de senha!');
                setLoading(false);
                return;
            }
            if (inputPassword.length < 8 || inputPasswordAgain.length < 8) {
                setErrorChangePassword('As senhas devem ter pelo menos 8 caracteres!');
                setLoading(false);
                return;
            }
            if (inputPassword != inputPasswordAgain) {
                setErrorChangePassword('As senhas devem ser iguais!');
                setLoading(false);
                return;
            }

        }

        const user = {
            password: changePasswordInputPassword.current.value.trim(),
        };

        try {
            const updateUsersPassword = await axios.patch(`${apiUrl}user/profile/updateUsersPassword`, user, {
                headers: {
                    'Authorization': `Bearer ${tokenUserSuper}`
                }
            });
            if (updateUsersPassword.data.status === 'success') {
                setIsUseEffect(isUseEffect + 1);
                btnPasswordForProfile()
            }

        } catch (err) {
            if (err.response && err.response.data) {

                if (err.response.data.code === 404 || err.response.data.code === 401) {
                    setErrorChangePassword('Email inexistente ou inválido!');
                }

            } else {
                setErrorChangePassword('ERROR(updateUsersDisplayName): Por favor informe o desenvolvedor !');
            }
        } finally {
            setLoading(false);
        }
    };

    const submitChangePhoto = async (e) => {
        e.preventDefault();
        setLoading(true);

        const tokenUserSuper = localStorage.getItem("tokenUser");

        if (tokenUserSuper === null) {
            navigate('/authentication');
        }

        const formData = new FormData();

        if (updateUsersPhoto === '') {
            setErrorMessageChangePhoto('Nenhuma imagem selecionada!');
            setLoading(false);
            return;
        }

        formData.append('image', updateUsersPhoto);

        try {
            const updateUsersPhoto = await axios.patch(`${apiUrl}user/profile/updateUsersPhoto`, formData, {
                headers: {
                    'Authorization': `Bearer ${tokenUserSuper}`
                }
            });

            if (updateUsersPhoto.data.status === 'success') {
                window.location.reload();
            }

        } catch (err) {
            if (err.response && err.response.data) {

                if (err.response.data.code === 401) {
                    setErrorMessageChangePhoto('O token expirou ou é inválido!');
                }

                if (err.response.data.code === 400) {
                    setErrorMessageChangePhoto('Image upload failed!');
                }

                if (err.response.data.code === 500) {
                    setErrorMessageChangePhoto('Imagens deve ter e máximo 1 Megabytes!');
                }

            } else {
                setErrorChangePassword('ERROR(updateUsersPhoto): Por favor informe o desenvolvedor !');
            }

        } finally {
            setLoading(false);
        }
    };


    const submitLogOut = async (e) => {
        e.preventDefault();

        localStorage.removeItem('tokenUser');

        const tokenUserSuper = localStorage.getItem("tokenUser");

        if (tokenUserSuper === null) {
            navigate('/authentication');
        }
        
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            uploadImage(files[0]);
            setUpdateUsersPhoto(files[0]);
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            uploadImage(files[0]);
            setUpdateUsersPhoto(files[0]);
        }
    };

    const uploadImage = (file) => {
        const newImgLink = URL.createObjectURL(file);
        setProfileChangePhoto(newImgLink);
    };

    return (
        <>

            {loading ? <Loader /> : null}

            {isDeleterUser ? <DeleterUser isDeleterUser={isDeleterUser} setIsDeleterUser={setIsDeleterUser} /> : <DeleterUser isDeleterUser={isDeleterUser} setIsDeleterUser={setIsDeleterUser} />}

            <section className='introductionProfile profile'>

                <div className={`container profile ${sectionProfileIsActive ? 'active' : ''}`} >

                    <div className='container-img'>
                        <img src={profilePhoto} alt='img' />
                    </div>

                    <div className='container-text'>
                        <h1> {profileName} </h1>
                        <h2> {profileEmail} </h2>
                    </div>

                    <div className='container-button'>
                        <a className="btn-primary" onClick={btnProfileForName} > Alterar seu Nome </a>
                        <a className="btn-primary" onClick={btnProfileForPhoto} > Alterar sua Foto </a>
                        <a className="btn-primary fullWidth" onClick={btnProfileForPassword} > Alterar sua Senha </a>
                        <a className="btn-primary" onClick={() => setIsDeleterUser(true)} > Apagar sua Conta </a>
                        <a className="btn-primary" onClick={submitLogOut} > Sair da Conta </a>
                    </div>

                </div>

                <div className={`container name ${sectionChangeNameIsActive ? 'active' : ''}`} >

                    <div className='container-img'>
                        <img src={undraw06} alt='img' />
                    </div>

                    <div className='container-text'>
                        <h1> Altere seu nome </h1>

                        <form className="container-form" onSubmit={submitChangeName}>

                            <div className="inputBox">

                                <input type="text" name="changeNameInputName" required="required" placeholder="" autoComplete='changeNameInputName' ref={changeNameInputName} />
                                <span className="text"> Insira seu nome: </span>
                                <span className="line"></span>

                            </div>

                            <input className="btn-primary" type="submit" value=" Atualizar seu nome " />

                            <p className="textLine"> <span> ou </span> </p>
                            <p className='btn-second' onClick={btnNameForProfile} > <span > Cancelar </span> </p>
                            <p className="errorMessage"> {errorMessageChangeName} </p>

                        </form>
                    </div>
                </div>

                <div className={`container password ${sectionChangePasswordIsActive ? 'active' : ''}`} >

                    <div className='container-img'>
                        <img src={undraw06} alt='img' />
                    </div>

                    <div className='container-text'>
                        <h1> Altere sua senha </h1>

                        <form className="container-form" onSubmit={submitChangePassword}>

                            <div className="inputBox">
                                <input type="password" name="changePasswordInputPassword" required="required" placeholder="" autoComplete='changePasswordInputPassword' ref={changePasswordInputPassword} />
                                <span className="text"> Insira sua nova senha: </span>
                                <span className="line"></span>
                            </div>

                            <div className="inputBox">
                                <input type="password" name="changePasswordInputPasswordAgain" required="required" placeholder="" autoComplete='changePasswordInputPasswordAgain' ref={changePasswordInputPasswordAgain} />
                                <span className="text"> Insira novamente: </span>
                                <span className="line"></span>
                            </div>

                            <input className="btn-primary" type="submit" value=" Atualizar sua senha " />

                            <p className="textLine"> <span> ou </span> </p>
                            <p className='btn-second' onClick={btnPasswordForProfile} > <span > Cancelar </span> </p>
                            <p className="errorMessage"> {errorMessageChangePassword} </p>

                        </form>
                    </div>
                </div>

                <div className={`container photo ${sectionChangePhotoIsActive ? 'active' : ''}`} >

                    <div className='container-img'>
                        <img src={undraw06} alt='img' />
                    </div>

                    <div className='container-text'>
                        <h1> Altere sua senha </h1>

                        <form className="container-form" onSubmit={submitChangePhoto} >

                            <div className='container-img-profile'>
                                <img src={profileChangePhoto} alt='img' />
                            </div>

                            <div className="boxInputFile" onDragOver={handleDragOver} onDrop={handleDrop}>
                                <label htmlFor="inputFile" className="inputFile" hidden onChange={handleFileChange}>
                                    <input type="file" accept="image/*" id="inputFile" hidden />
                                    <div className="changePhotoProfile">
                                        <p> Realize o upload da imagem arrastando e soltando aqui, <br />
                                            ou clique neste local. </p>
                                    </div>
                                </label>
                            </div>

                            <input className="btn-primary" type="submit" value=" Confirmar alteração " />

                            <p className="textLine"> <span> ou </span> </p>
                            <p className='btn-second' onClick={btnPhotoForProfile}> <span > Cancelar </span> </p>
                            <p className="errorMessage"> {errorMessageChangePhoto} </p>

                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default IntroductionProfile;