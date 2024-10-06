import './introductionAPK.css';
import apk from '../../../assets/img/home/apk.png';

const introductionAPK = () => {
    return (
        <>
            <section className='introductionAPK' id='introductionAPK' >

                <div className='container'>

                    <div className='container-img'>
                        <img src={apk} alt='img' />
                    </div>

                    <div className='container-text'>
                        <h2>APP do projeto, </h2>
                        <h1> <span> Também em seu dispositivo móvel </span> </h1>

                        <p>O projeto Ornitorrinco também apresenta um aplicativo para dispositivos móveis Android, que se integra à API
                            descrita anteriormente. Esse aplicativo funciona como uma das interfaces front-end do projeto, proporcionando
                            aos usuários de dispositivos móveis Android as mesmas funções e compartilhando os mesmos dados, garantindo
                            assim a melhor experiência e aproveitamento das funcionalidades do backend.</p>

                        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-primary"> Download do APK </a>

                    </div>

                </div>

            </section>
        </>
    );
};

export default introductionAPK;