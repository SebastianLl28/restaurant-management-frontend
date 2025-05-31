import { useEffect, useState } from 'react'

interface Props {
  max: number
}

const useProductCounter = ({ max }: Props) => {
  const [count, setCount] = useState(1)

  useEffect(() => {
    if (!max) {
      setCount(0)
      return
    }
    setCount(1)
  }, [max])

  const handleIncrement = () => {
    if (count < max) {
      setCount(count + 1)
    }
  }

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  return { count, setCount, handleDecrement, handleIncrement }
}

export default useProductCounter
