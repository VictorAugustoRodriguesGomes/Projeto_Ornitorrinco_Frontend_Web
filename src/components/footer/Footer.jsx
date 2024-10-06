import './footer.css';

const Footer = () => {
    return (
        <>

            <footer id="footer" className="footer" >
                <div className="footer-container">
                    <div className="footer-container-about">
                        <h1> Sobre o Projeto </h1>

                        <p> Olá! Meu nome é Victor Augusto e sou responsável por desenvolver esse projeto nomeado com Projeto Ornitorrinco (utilizei esse nome genérico para organização pessoal).</p>

                        <p> O objetivo deste projeto é demonstrar minhas habilidades como desenvolvedor. </p>

                        <p> Neste projeto, desenvolvi uma arquitetura full stack que inclui um backend e dois frontends, todos integrados a um único banco de dados. A comunicação entre os componentes é
                            realizada por meio de uma API RESTful, garantindo a eficiência na troca de dados. </p>

                        <p> Primeiramente, criei uma API REST que permite aos usuários realizar funções para criar contas, recuperar senhas, fazer login, visualizar e atualizar suas informações,
                            além de alterar a foto de perfil. A API também inclui um sistema de autenticação em dois fatores (2FA) via e-mail.</p>

                        <p> A api foi desenvolvido com Node.js, TypeScript e MySQL.</p>

                        <p> Algumas das bibliotecas utilizadas nesta API são: Express, Jsonwebtoken, Bcrypt, Nodemailer, Multer e Dotenv. </p>

                        <p> O site do projeto Ornitorrinco oferece uma interface front-end do projeto, permitindo que os usuários acessem todas as
                            funcionalidades do backend. Com integração à API mencionada anteriormente, o site oferece acesso completo a todas as
                            funcionalidades e dados, assegurando uma navegação fluida e intuitiva. Dessa forma, independentemente do
                            dispositivo utilizado, todos podem aproveitar ao máximo os serviços oferecidos pelo backend. </p>

                        <p> O site foi desenvolvido utilizando React, incorporando HTML, CSS e JavaScript. A biblioteca Axios também foi utilizada para otimizar a comunicação com a API. </p>

                        <p> O projeto Ornitorrinco também apresenta um aplicativo para dispositivos móveis Android, que se integra à API
                            descrita anteriormente. Esse aplicativo funciona como uma das interfaces front-end do projeto, proporcionando
                            aos usuários de dispositivos móveis Android as mesmas funções e compartilhando os mesmos dados, garantindo
                            assim a melhor experiência e aproveitamento das funcionalidades do backend.</p>

                        <p> O aplicativo foi desenvolvido no Android Studio, utilizando a linguagem de programação Java e a biblioteca
                            Retrofit para otimizar a comunicação com a API.</p>

                        <p> Então o que você achou desse projeto? </p>

                        <p> Mande a sua mensagem para esse e-mail:
                            <a href="mailto:victor.augusto.desenvolvedor@gmail.com" target="_blank" rel="noopener noreferrer">
                                victor.augusto.desenvolvedor@gmail.com. </a>
                        </p>

                        <p> E se você quiser ver mais dos meus projetos, confiram o
                            <a href=" https://www.linkedin.com/in/victor-augusto-desenvolvedor/ " target="_blank"
                                rel="noopener noreferrer"> meu LinkedIn </a> ou o
                            <a href=" https://github.com/VictorAugustoRodriguesGomes " target="_blank"
                                rel="noopener noreferrer"> meu GitHub. </a>
                        </p>

                        <p> Para mais informações de contatos e afins, o
                            <a href="https://github.com/VictorAugustoRodriguesGomes/VictorAugustoRodriguesGomes/blob/main/src/doc/Victor%20Augusto%20Rodrigues%20Gomes%20-%20curr%C3%ADculo.pdf"
                                target="_blank" rel="noopener noreferrer"> meu currículo </a>
                            se encontra a sua disposição logo a baixo.
                        </p>

                        <p> Prepare-se para ser inspirado. Este é apenas o começo! </p>
                    </div>

                </div>

                <div className="footer-container-btn">
                    
                    <a href="https://github.com/VictorAugustoRodriguesGomes/VictorAugustoRodriguesGomes/blob/main/src/doc/Victor%20Augusto%20Rodrigues%20Gomes%20-%20curr%C3%ADculo.pdf"
                        target="_blank" rel="noopener noreferrer" className="btn-primary">Baixar Currículo</a>

                    <a href="https://victor-augusto-dev.firebaseapp.com/" target="_blank" rel="noopener noreferrer"
                        className="btn-primary"> Meu Portfólio </a>

                    <a href="https://www.linkedin.com/in/victor-augusto-desenvolvedor/" target="_blank"
                        rel="noopener noreferrer" className="btn-primary"> Meu LinkedIn </a>

                    <a href="https://github.com/VictorAugustoRodriguesGomes" target="_blank" rel="noopener noreferrer"
                        className="btn-primary"> Meu GitHub </a>
                </div>
            </footer>

            <div className="copyrightText">
                <p>Copyright © 2024-Atual. Victor Augusto. Todos os direitos reservados.</p>
            </div>

        </>
    );
};

export default Footer;