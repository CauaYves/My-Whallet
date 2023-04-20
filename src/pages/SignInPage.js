import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { RotateLoader } from "react-spinners"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function SignInPage() {

  useEffect(() => {

    const token = localStorage.getItem("token")
    console.log(token)

    axios.get("https://my-whallet-api.onrender.com/autologin", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
      console.log(1)

  }, [])

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function login(e) {
    e.preventDefault()
    setIsLoading(true)
    await axios.post("https://my-whallet-api.onrender.com/login", { email: email, password: senha })
      .then((answer) => {
        localStorage.setItem("token", answer.data)
        navigate("/home")
      })
      .catch((error) => {
        alert(error.response.message)
      })
    setIsLoading(false)
  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <SubmitBtn>
          {isLoading ?
            <RotateLoader color="white" />
            :
            "entrar"
          }</SubmitBtn>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
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
