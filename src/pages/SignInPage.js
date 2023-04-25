import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { RotateLoader } from "react-spinners"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function SignInPage() {

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios.get(`${process.env.REACT_APP_API_URL}/operations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(answer => {
        navigate("/home")
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, []);

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function login(e) {
    e.preventDefault()
    setIsLoading(true)
    await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email: email, password: senha })
      .then((answer) => {
        localStorage.setItem("token", answer.data.token)
        navigate("/home")
      })
      .catch((error) => {
        alert(error)
      })
    setIsLoading(false)
  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <SubmitBtn>
          {isLoading ? <RotateLoader color="white" /> : "entrar"}
        </SubmitBtn>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
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
