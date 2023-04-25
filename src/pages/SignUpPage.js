import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"
import { RotateLoader } from "react-spinners"

export default function SignUpPage() {

  const navigate = useNavigate()

  //estados
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  function passwordIsEquals(pass1, pass2) {

    if (pass1 !== pass2) return false
    else return true

  }

  async function register(e) {
    e.preventDefault()

    if (!passwordIsEquals(senha, confirmSenha)) return alert("as senhas não coincidem")
    setIsLoading(true)
    await axios.post("https://my-whallet-api.onrender.com/cadastro", { name: nome, email: email, password: senha })
      .then((answer) => {
        if (answer.data.status === 201) {
          navigate("/")
        }
      })
      .catch((error) => { alert(error.response.statusText) })
    setIsLoading(false)
  }

  return (
    <SingUpContainer>

      <form onSubmit={register}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          min={3}
          autoComplete="new-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          min={3}
          autoComplete="new-password"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
        />
        <SubmitBtn>
          {isLoading ?
            <RotateLoader color="white" />
            :
            "cadastrar"
          }</SubmitBtn>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SubmitBtn = styled.button`
  max-height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  
`
