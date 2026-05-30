import { useCallback } from "react"
import { useGetDataQuery } from "#/store"

export const useAdmin = () => { 
  const onGetAdmin = useCallback(() => { 
    ;
  }, [])

  return {
    onGetAdmin
  }
}