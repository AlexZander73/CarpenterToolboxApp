import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const Redirect = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const path = params.get("path") || "/"
    const cleaned = path.replace(/^\/#?/, "/")
    navigate(cleaned, { replace: true })
  }, [navigate, params])

  return null
}

export default Redirect
