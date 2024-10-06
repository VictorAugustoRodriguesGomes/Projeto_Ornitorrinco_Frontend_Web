import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './deleterUser.css';

import Loader from '../../components/loader/Loader.jsx';

const DeleterUser = ({ isDeleterUser, setIsDeleterUser }) => {

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);

    const submitDeleterUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        const tokenUserSuper = localStorage.getItem("tokenUser");

        if (tokenUserSuper === null) {
            navigate('/authentication');
        }

        try {
            const deleteUsers = await axios.delete(`${apiUrl}user/profile/deleteUsers`, {
                headers: {
                    'Authorization': `Bearer ${tokenUserSuper}`
                }
            });

            if (deleteUsers.data.status === 'success') {
                localStorage.removeItem('tokenUser');
                navigate('/authentication');
            }

        } catch (err) {

            if (err.response && err.response.data) {

                if (err.response.data.code === 404 || err.response.data.code === 401) {
                    console.log('Email inexistente ou inválido!');
                    navigate('/authentication');
                }

            } else {
                console.log('ERROR(updateUsersDisplayName): Por favor informe o desenvolvedor !');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            {loading ? <Loader /> : null}

            <section className={`introductionDeleterUser ${isDeleterUser ? 'active' : ''}`} >

                <div className='container'>

                    <h1> Deseja realmente deletar sua conta ? </h1>

                    <div className='container-button'>
                        <a className="btn-primary" onClick={() => setIsDeleterUser(false)}>  Cancelar </a>
                        <a className="btn-primary" onClick={submitDeleterUser}> Deletar sua conta </a>
                    </div>
                </div>

            </section>

        </>
    );
};

export default DeleterUser;