import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './information.css';

import Loader from '../../../components/loader/Loader.jsx';

import wave from '../../../assets/img/home/wave.png';
import undraw01 from '../../../assets/img/home/undraw01.png';


const Information = () => {

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);


    const submitHomeForAuthentication = async () => {
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
                navigate('/Profile');
            }

        } catch (err) {
            console.log(err);
            navigate('/authentication');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            {loading ? <Loader /> : null}

            <section id='information' className='information' >
                <div className='container'>

                    <div className='container-text'>
                        <h2> Olá, </h2>
                        <h1> <span> Seja Bem-Vindo! </span> </h1>

                        <p> Meu nome é Victor Augusto e sou o responsável pelo desenvolvimento deste
                            site, que integra o projeto Ornitorrinco. Neste contexto, desenvolvi uma aplicação backend,
                            com este site funcionando como uma das interfaces front-end do projeto.</p>

                        <p> Aqui no site, os usuários podem criar contas, recuperar senhas, fazer login, visualizar e atualizar
                            suas informações, além de alterar a foto de perfil. Também implementamos um sistema de autenticação
                            em dois fatores (2FA) via e-mail.</p>

                        <a className="btn-primary" onClick={submitHomeForAuthentication} > Vamos lá </a>

                    </div>

                    <div className='container-img'>
                        <img src={undraw01} alt='img' />
                    </div>

                </div>

                <div className='container-img-wave'>

                    <img className='img-wave' src={wave} alt='wave' />
                    <img className='img-wave' src={wave} alt='wave' />
                    <img className='img-wave' src={wave} alt='wave' />
                    <img className='img-wave' src={wave} alt='wave' />
                    
                </div>

            </section>

        </>
    );
};

export default Information;