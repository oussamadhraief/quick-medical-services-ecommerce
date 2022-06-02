import { useEffect } from 'react'

export default function Search () {
  useEffect(() => {
    location.href = '/products?page=0'
  })

  return null
}
